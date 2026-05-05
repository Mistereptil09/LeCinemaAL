import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { api, body, createTransaction, createUser } from './helpers/controller_test_helpers.js'

test.group('Transactions controller', (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().truncate())

  test('mine and store work for authenticated users', async ({ client, assert }) => {
    const user = await createUser('client')

    const storeResponse = await client.post(api('/transactions')).loginAs(user).json({
      type: 'deposit',
      amount: '25.00',
      description: 'wallet top-up',
    })
    storeResponse.assertStatus(201)
    assert.equal(body<{ userId: number }>(storeResponse).userId, user.id)

    const mineResponse = await client.get(api('/transactions/me')).loginAs(user)
    mineResponse.assertStatus(200)
    assert.lengthOf(body<unknown[]>(mineResponse), 1)
  })

  test('index/show/update/patch/destroy work for admin', async ({ client, assert }) => {
    const admin = await createUser('admin')
    const clientUser = await createUser('client')
    const transaction = await createTransaction(clientUser.id)

    const indexResponse = await client.get(api('/transactions')).loginAs(admin)
    indexResponse.assertStatus(200)
    assert.isAtLeast(body<{ meta: { total: number } }>(indexResponse).meta.total, 1)

    const showResponse = await client.get(api(`/transactions/${transaction.id}`)).loginAs(admin)
    showResponse.assertStatus(200)
    assert.equal(body<{ id: number }>(showResponse).id, transaction.id)

    const updateResponse = await client
      .put(api(`/transactions/${transaction.id}`))
      .loginAs(admin)
      .json({ type: 'purchase', amount: '12.50', description: 'ticket purchase' })
    updateResponse.assertStatus(200)
    assert.equal(body<{ type: string }>(updateResponse).type, 'purchase')

    const patchResponse = await client
      .patch(api(`/transactions/${transaction.id}`))
      .loginAs(admin)
      .json({ description: 'patched description' })
    patchResponse.assertStatus(200)
    assert.equal(body<{ description: string }>(patchResponse).description, 'patched description')

    const deleteResponse = await client
      .delete(api(`/transactions/${transaction.id}`))
      .loginAs(admin)
    deleteResponse.assertStatus(204)
  })

  test('admin routes are forbidden for client role', async ({ client }) => {
    const user = await createUser('client')

    const response = await client.get(api('/transactions')).loginAs(user)

    response.assertStatus(403)
  })
})
