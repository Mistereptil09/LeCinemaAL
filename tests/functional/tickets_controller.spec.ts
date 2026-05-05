import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import {
  api,
  body,
  createScreening,
  createTicket,
  createUser,
} from './helpers/controller_test_helpers.js'

test.group('Tickets controller', (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().truncate())

  test('myTickets and store work for authenticated user', async ({ client, assert }) => {
    const user = await createUser('client')

    const storeResponse = await client
      .post(api('/tickets'))
      .loginAs(user)
      .json({ type: 'standard', remainingUses: 2 })
    storeResponse.assertStatus(201)
    const created = body<{ id: number; userId: number }>(storeResponse)
    assert.equal(created.userId, user.id)

    const myTicketsResponse = await client.get(api('/tickets/me')).loginAs(user)
    myTicketsResponse.assertStatus(200)
    const tickets = body<Array<{ id: number }>>(myTicketsResponse)
    assert.lengthOf(tickets, 1)
    assert.equal(tickets[0].id, created.id)
  })

  test('use ticket flow updates ticket and creates usage', async ({ client, assert }) => {
    const user = await createUser('client')
    const { screening } = await createScreening()
    const ticket = await createTicket(user.id, 1, false)

    const response = await client
      .post(api(`/tickets/${ticket.id}/use`))
      .loginAs(user)
      .json({ screeningId: screening.id })

    response.assertStatus(200)
    const payload = body<{ ticket: { remainingUses: number; isUsed: boolean } }>(response)
    assert.equal(payload.ticket.remainingUses, 0)
    assert.isTrue(payload.ticket.isUsed)
  })

  test('cannot use ticket owned by another user', async ({ client }) => {
    const owner = await createUser('client')
    const stranger = await createUser('client')
    const { screening } = await createScreening()
    const ticket = await createTicket(owner.id, 1, false)

    const response = await client
      .post(api(`/tickets/${ticket.id}/use`))
      .loginAs(stranger)
      .json({ screeningId: screening.id })

    response.assertStatus(403)
  })

  test('admin can index/show/update/patch/destroy tickets', async ({ client, assert }) => {
    const admin = await createUser('admin')
    const clientUser = await createUser('client')
    const ticket = await createTicket(clientUser.id, 1, false)

    const indexResponse = await client.get(api('/tickets')).loginAs(admin)
    indexResponse.assertStatus(200)
    assert.isAtLeast(body<{ meta: { total: number } }>(indexResponse).meta.total, 1)

    const showResponse = await client.get(api(`/tickets/${ticket.id}`)).loginAs(admin)
    showResponse.assertStatus(200)
    assert.equal(body<{ id: number }>(showResponse).id, ticket.id)

    const updateResponse = await client
      .put(api(`/tickets/${ticket.id}`))
      .loginAs(admin)
      .json({
        type: 'super',
        remainingUses: 3,
        isUsed: false,
      })
    updateResponse.assertStatus(200)
    assert.equal(body<{ type: string }>(updateResponse).type, 'super')

    const patchResponse = await client
      .patch(api(`/tickets/${ticket.id}`))
      .loginAs(admin)
      .json({ remainingUses: 1 })
    patchResponse.assertStatus(200)
    assert.equal(body<{ remainingUses: number }>(patchResponse).remainingUses, 1)

    const deleteResponse = await client.delete(api(`/tickets/${ticket.id}`)).loginAs(admin)
    deleteResponse.assertStatus(204)
  })

  test('admin routes are forbidden for client role', async ({ client }) => {
    const user = await createUser('client')

    const response = await client.get(api('/tickets')).loginAs(user)

    response.assertStatus(403)
  })

  test('cannot buy a ticket with insufficient wallet balance (business rule)', async ({
    client,
  }) => {
    const user = await createUser('client')

    // On force le portefeuille du client à 0.00
    user.wallet = '0.00'
    await user.save()

    const response = await client.post(api('/tickets')).loginAs(user).json({
      type: 'standard',
    })

    response.assertStatus(402) // Payment Required
    response.assertBodyContains({ message: 'Not enough money in account balance' })
  })

  test('cannot use ticket if the screening room is at full capacity (business rule)', async ({
    client,
  }) => {
    const user = await createUser('client')
    const { screening, room } = await createScreening()

    // On force la capacité de la salle à un chiffre très bas (ex: 1 place)
    room.capacity = 1
    await room.save()

    // On crée un premier ticket et on l'utilise (la salle est maintenant pleine à 1/1)
    const ticket1 = await createTicket(user.id, 1, false)
    await client
      .post(api(`/tickets/${ticket1.id}/use`))
      .loginAs(user)
      .json({ screeningId: screening.id })

    // On crée un deuxième ticket et on essaie de l'utiliser
    const ticket2 = await createTicket(user.id, 1, false)
    const response = await client
      .post(api(`/tickets/${ticket2.id}/use`))
      .loginAs(user)
      .json({
        screeningId: screening.id,
      })

    // Doit être rejeté car la salle est pleine
    response.assertStatus(403) // Forbidden
    response.assertBodyContains({ message: 'This screening is already full' })
  })
})
