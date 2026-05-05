import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import {
  api,
  body,
  createTicket,
  createTransaction,
  createUser,
} from './helpers/controller_test_helpers.js'

test.group('Users controller', (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().truncate())

  test('me returns current authenticated user', async ({ client, assert }) => {
    const admin = await createUser('admin')

    const response = await client.get(api('/users/me')).loginAs(admin)

    response.assertStatus(200)
    assert.equal(body<{ id: number }>(response).id, admin.id)
  })

  test('index is forbidden for client role', async ({ client }) => {
    const user = await createUser('client')

    const response = await client.get(api('/users')).loginAs(user)

    response.assertStatus(403)
  })

  test('index/show work for admin, show includes relations', async ({ client, assert }) => {
    const admin = await createUser('admin')
    const target = await createUser('client')
    await createTicket(target.id)
    await createTransaction(target.id)

    const indexResponse = await client.get(api('/users')).loginAs(admin)
    indexResponse.assertStatus(200)
    assert.isAtLeast(body<{ meta: { total: number } }>(indexResponse).meta.total, 2)

    const showResponse = await client.get(api(`/users/${target.id}`)).loginAs(admin)
    showResponse.assertStatus(200)
    const payload = body<{ id: number; tickets: unknown[]; transactions: unknown[] }>(showResponse)
    assert.equal(payload.id, target.id)
    assert.lengthOf(payload.tickets, 1)
    assert.lengthOf(payload.transactions, 1)
  })

  test('admin can store/update/patch/destroy users', async ({ client, assert }) => {
    const admin = await createUser('admin')

    const storeResponse = await client.post(api('/users')).loginAs(admin).json({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@test.com',
      password: 'password123',
      role: 'client',
      wallet: '20.00',
    })
    storeResponse.assertStatus(201)
    const created = body<{ id: number; firstName: string }>(storeResponse)
    assert.equal(created.firstName, 'Ada')

    const updateResponse = await client
      .put(api(`/users/${created.id}`))
      .loginAs(admin)
      .json({
        firstName: 'Grace',
        lastName: 'Hopper',
        email: 'grace@test.com',
        password: 'password123',
        role: 'admin',
        wallet: '50.00',
      })
    updateResponse.assertStatus(200)
    assert.equal(body<{ firstName: string; role: string }>(updateResponse).firstName, 'Grace')

    const patchResponse = await client
      .patch(api(`/users/${created.id}`))
      .loginAs(admin)
      .json({ firstName: 'Patched' })
    patchResponse.assertStatus(200)
    assert.equal(body<{ firstName: string }>(patchResponse).firstName, 'Patched')

    const deleteResponse = await client.delete(api(`/users/${created.id}`)).loginAs(admin)
    deleteResponse.assertStatus(204)
  })
})
