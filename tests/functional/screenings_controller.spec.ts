import { DateTime } from 'luxon'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import TicketUse from '#models/ticket_use'
import {
  api,
  body,
  createScreening,
  createTicket,
  createUser,
} from './helpers/controller_test_helpers.js'

test.group('Screenings controller', (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().truncate())

  test('index and show work for authenticated users', async ({ client, assert }) => {
    const user = await createUser('client')
    const { screening } = await createScreening()

    const indexResponse = await client.get(api('/screenings')).loginAs(user)
    indexResponse.assertStatus(200)
    assert.isAtLeast(body<{ meta: { total: number } }>(indexResponse).meta.total, 1)

    const showResponse = await client.get(api(`/screenings/${screening.id}`)).loginAs(user)
    showResponse.assertStatus(200)
    assert.equal(body<{ id: number }>(showResponse).id, screening.id)
  })

  test('stats endpoint is forbidden for client role', async ({ client }) => {
    const user = await createUser('client')
    const { screening } = await createScreening()

    const response = await client.get(api(`/screenings/${screening.id}/stats`)).loginAs(user)

    response.assertStatus(403)
  })

  test('admin can read stats and manage screenings', async ({ client, assert }) => {
    const admin = await createUser('admin')
    const ticketOwner = await createUser('client')
    const { screening, movie, room } = await createScreening()
    const usedTicket = await createTicket(ticketOwner.id, 0, true)
    await TicketUse.create({
      ticketId: usedTicket.id,
      screeningId: screening.id,
      usedAt: DateTime.now(),
    })

    const statsResponse = await client.get(api(`/screenings/${screening.id}/stats`)).loginAs(admin)
    statsResponse.assertStatus(200)
    assert.equal(body<{ stats: { usedTickets: number } }>(statsResponse).stats.usedTickets, 1)

    const storeResponse = await client
      .post(api('/screenings'))
      .loginAs(admin)
      .json({
        movieId: movie.id,
        roomId: room.id,
        startAt: DateTime.now().plus({ days: 1 }).set({ hour: 17, minute: 0 }).toISO(),
      })
    storeResponse.assertStatus(201)

    const storePayload = storeResponse.body()
    const created = storePayload.data || storePayload

    const updateResponse = await client
      .put(api(`/screenings/${created.id}`))
      .loginAs(admin)
      .json({
        movieId: movie.id,
        roomId: room.id,
        startAt: DateTime.now().plus({ days: 2 }).set({ hour: 15, minute: 0 }).toISO(),
      })
    updateResponse.assertStatus(200)

    const deleteResponse = await client.delete(api(`/screenings/${created.id}`)).loginAs(admin)
    deleteResponse.assertStatus(204)
  })

  test('cannot schedule a screening outside of opening hours 9h-20h (business rule)', async ({
    client,
  }) => {
    const admin = await createUser('admin')
    const { movie, room } = await createScreening()

    const lateStart = DateTime.now().set({ hour: 22, minute: 0 }).toISO()

    const response = await client.post(api('/screenings')).loginAs(admin).json({
      movieId: movie.id,
      roomId: room.id,
      startAt: lateStart,
    })

    response.assertStatus(400)
  })

  test('cannot schedule a screening in a room under maintenance (business rule)', async ({
    client,
  }) => {
    const admin = await createUser('admin')
    const { movie, room } = await createScreening()

    room.isUnderMaintenance = true
    await room.save()

    const response = await client
      .post(api('/screenings'))
      .loginAs(admin)
      .json({
        movieId: movie.id,
        roomId: room.id,
        startAt: DateTime.now().plus({ days: 1 }).set({ hour: 10, minute: 0 }).toISO(),
      })

    response.assertStatus(403)
  })

  test('cannot schedule overlapping screenings in the same room (business rule)', async ({
    client,
  }) => {
    const admin = await createUser('admin')
    const { movie, room, screening } = await createScreening()

    const response = await client.post(api('/screenings')).loginAs(admin).json({
      movieId: movie.id,
      roomId: room.id,
      startAt: screening.startAt.toISO(),
    })

    response.assertStatus(409)
  })
})
