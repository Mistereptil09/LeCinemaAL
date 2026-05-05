import { DateTime } from 'luxon'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import Screening from '#models/screening'
import {
  api,
  body,
  createMovie,
  createRoom,
  createUser,
} from './helpers/controller_test_helpers.js'

test.group('Rooms controller', (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().truncate())

  test('index/show/schedule work for authenticated users', async ({ client, assert }) => {
    const user = await createUser('client')
    const room = await createRoom()
    const movie = await createMovie()
    await Screening.create({
      movieId: movie.id,
      roomId: room.id,
      startAt: DateTime.now().plus({ hours: 2 }),
      endAt: DateTime.now().plus({ hours: 4 }),
    })

    const indexResponse = await client.get(api('/rooms')).loginAs(user)
    indexResponse.assertStatus(200)
    assert.isAtLeast(body<{ meta: { total: number } }>(indexResponse).meta.total, 1)

    const showResponse = await client.get(api(`/rooms/${room.id}`)).loginAs(user)
    showResponse.assertStatus(200)
    assert.equal(body<{ id: number }>(showResponse).id, room.id)

    const scheduleResponse = await client.get(api(`/rooms/${room.id}/schedule`)).loginAs(user)
    scheduleResponse.assertStatus(200)
    assert.lengthOf(body<unknown[]>(scheduleResponse), 1)
  })

  test('admin can store/update/toggle/destroy rooms', async ({ client, assert }) => {
    const admin = await createUser('admin')

    const storeResponse = await client.post(api('/rooms')).loginAs(admin).json({
      name: 'VIP Room',
      type: 'vip',
      capacity: 25,
      description: 'Premium room',
      hasDisabledAccess: true,
      isUnderMaintenance: false,
    })
    storeResponse.assertStatus(201)
    const created = body<{ id: number; name: string }>(storeResponse)
    assert.equal(created.name, 'VIP Room')

    const updateResponse = await client
      .put(api(`/rooms/${created.id}`))
      .loginAs(admin)
      .json({
        name: 'VIP Room Updated',
        type: 'vip',
        capacity: 30,
        description: 'Updated room',
        hasDisabledAccess: true,
        isUnderMaintenance: false,
      })
    updateResponse.assertStatus(200)
    assert.equal(body<{ name: string }>(updateResponse).name, 'VIP Room Updated')

    const toggleResponse = await client.put(api(`/rooms/${created.id}/maintenance`)).loginAs(admin)
    toggleResponse.assertStatus(200)
    assert.isTrue(body<{ isUnderMaintenance: boolean }>(toggleResponse).isUnderMaintenance)

    const deleteResponse = await client.delete(api(`/rooms/${created.id}`)).loginAs(admin)
    deleteResponse.assertStatus(204)
  })

  test('admin routes are forbidden for client role', async ({ client }) => {
    const clientUser = await createUser('client')

    const response = await client.post(api('/rooms')).loginAs(clientUser).json({
      name: 'Blocked Room',
      type: 'standard',
      capacity: 20,
    })

    response.assertStatus(403)
  })

  test('admin cannot create room with invalid capacity (business rule)', async ({ client }) => {
    const admin = await createUser('admin')

    const tooSmallResponse = await client.post(api('/rooms')).loginAs(admin).json({
      name: 'Small Room',
      type: 'standard',
      capacity: 10,
      description: '...',
      hasDisabledAccess: true,
      isUnderMaintenance: false,
    })
    tooSmallResponse.assertStatus(400) // ou 422

    const tooBigResponse = await client.post(api('/rooms')).loginAs(admin).json({
      name: 'Huge Room',
      type: 'standard',
      capacity: 35,
      description: '...',
      hasDisabledAccess: true,
      isUnderMaintenance: false,
    })
    tooBigResponse.assertStatus(400) // ou 422
  })
})
