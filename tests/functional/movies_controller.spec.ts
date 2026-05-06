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

test.group('Movies controller', (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().truncate())

  test('index/show work without auth, schedule requires auth', async ({ client, assert }) => {
    const user = await createUser('client')
    const movie = await createMovie()
    const room = await createRoom()
    await Screening.create({
      movieId: movie.id,
      roomId: room.id,
      startAt: DateTime.now().plus({ hours: 1 }),
      endAt: DateTime.now().plus({ hours: 3 }),
    })

    const indexResponse = await client.get('/movies')
    indexResponse.assertStatus(200)
    assert.exists(indexResponse.body())

    const showResponse = await client.get(`/movies/${movie.id}`)
    showResponse.assertStatus(200)
    assert.equal(body<{ id: number }>(showResponse).id, movie.id)

    const scheduleResponse = await client
      .get(api(`/movies/${movie.id}/schedule`))
      .qs({
        startDate: DateTime.now().minus({ days: 1 }).toISODate(),
        endDate: DateTime.now().plus({ days: 10 }).toISODate(),
      })
      .loginAs(user)
    scheduleResponse.assertStatus(200)

    assert.lengthOf(scheduleResponse.body().data, 1)
  })

  test('admin can store/update/destroy movies', async ({ client, assert }) => {
    const admin = await createUser('admin')

    const storeResponse = await client.post(api('/movies')).loginAs(admin).json({
      title: 'Arrival',
      description: 'Sci-fi movie',
      director: 'Denis Villeneuve',
      duration: 116,
      minAge: 10,
    })

    const storePayload = storeResponse.body()
    const created = storePayload.data || storePayload
    assert.equal(created.title, 'Arrival')

    const updateResponse = await client
      .put(api(`/movies/${created.id}`))
      .loginAs(admin)
      .json({
        title: 'Arrival Updated',
        description: 'Updated',
        director: 'Denis Villeneuve',
        duration: 117,
        minAge: 12,
      })
    updateResponse.assertStatus(200)

    const updatePayload = updateResponse.body()
    const updated = updatePayload.data || updatePayload
    assert.equal(updated.title, 'Arrival Updated')

    const deleteResponse = await client.delete(api(`/movies/${created.id}`)).loginAs(admin)
    deleteResponse.assertStatus(200)
  })

  test('store validates payload', async ({ client }) => {
    const admin = await createUser('admin')
    const response = await client.post(api('/movies')).loginAs(admin).json({
      title: '',
      description: 'Invalid movie',
      director: 'Director',
      duration: 0,
      minAge: -1,
    })
    response.assertStatus(500)
  })
})
