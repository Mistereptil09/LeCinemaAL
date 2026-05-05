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

    const payload = body<{ remainingUses: number; isUsed: boolean }>(response)
    assert.equal(payload.remainingUses, 0)
    assert.isTrue(payload.isUsed)
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
    response.assertStatus(404)
  })

  test('cannot buy a ticket with insufficient wallet balance (business rule)', async ({
    client,
  }) => {
    const user = await createUser('client')
    user.wallet = '0.00'
    await user.save()

    const response = await client.post(api('/tickets')).loginAs(user).json({ type: 'standard' })
    response.assertStatus(402)
    response.assertBodyContains({ message: 'Not enough money in account balance' })
  })

  test('cannot use ticket if the screening room is at full capacity (business rule)', async ({
    client,
  }) => {
    const user = await createUser('client')
    const { screening, room } = await createScreening()
    room.capacity = 1
    await room.save()

    const ticket1 = await createTicket(user.id, 1, false)
    await client
      .post(api(`/tickets/${ticket1.id}/use`))
      .loginAs(user)
      .json({ screeningId: screening.id })

    const ticket2 = await createTicket(user.id, 1, false)
    const response = await client
      .post(api(`/tickets/${ticket2.id}/use`))
      .loginAs(user)
      .json({ screeningId: screening.id })
    response.assertStatus(403)
    response.assertBodyContains({ message: 'This screening is already full' })
  })
})
