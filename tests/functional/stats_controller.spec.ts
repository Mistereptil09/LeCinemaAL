import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { api, body, createUser } from './helpers/controller_test_helpers.js'

test.group('Stats controller', (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().truncate())

  test('requires authentication', async ({ client }) => {
    const response = await client.get(api('/stats/realtime'))
    response.assertStatus(401)
  })

  test('forbids client role', async ({ client }) => {
    const user = await createUser('client')
    const response = await client.get(api('/stats/realtime')).loginAs(user)
    response.assertStatus(403)
  })

  test('admin can access daily/weekly/realtime endpoints', async ({ client, assert }) => {
    const admin = await createUser('admin')

    const dailyResponse = await client.get(api('/stats/daily')).loginAs(admin)
    dailyResponse.assertStatus(200)
    assert.equal(body<{ period: string }>(dailyResponse).period, 'daily')

    const weeklyResponse = await client.get(api('/stats/weekly')).loginAs(admin)
    weeklyResponse.assertStatus(200)
    assert.equal(body<{ period: string }>(weeklyResponse).period, 'weekly')

    const realtimeResponse = await client.get(api('/stats/realtime')).loginAs(admin)
    realtimeResponse.assertStatus(200)
    const realtime = body<Record<string, number>>(realtimeResponse)
    assert.exists(realtime.users)
    assert.exists(realtime.rooms)
    assert.exists(realtime.screenings)
    assert.exists(realtime.tickets)
    assert.exists(realtime.ticketUses)
  })

  test('byPeriod returns stats for custom dates', async ({ client, assert }) => {
    const admin = await createUser('admin')

    const response = await client
      .get(api('/stats'))
      .loginAs(admin)
      .qs({ startDate: '2026-05-01', endDate: '2026-05-07' })

    response.assertStatus(200)
    assert.equal(body<{ period: string }>(response).period, 'custom')
    assert.exists(body<Record<string, number>>(response).screenings)
    assert.exists(body<Record<string, number>>(response).usedTickets)
  })
})
