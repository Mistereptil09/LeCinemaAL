import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import { api, body } from './helpers/controller_test_helpers.js'

test.group('Auth controller', (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().truncate())

  test('register creates a user and token', async ({ client, assert }) => {
    const response = await client.post(api('/auth/register')).json({
      email: 'register@test.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    })

    response.assertStatus(201)
    const payload = body<{ user: { email: string; role: string }; token: unknown }>(response)
    assert.equal(payload.user.email, 'register@test.com')
    assert.equal(payload.user.role, 'client')
    assert.exists(payload.token)
  })

  test('login returns a token for existing credentials', async ({ client, assert }) => {
    await client.post(api('/auth/register')).json({
      email: 'login@test.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    })

    const response = await client.post(api('/auth/login')).json({
      email: 'login@test.com',
      password: 'password123',
    })

    response.assertStatus(200)
    const payload = body<{ token: unknown }>(response)
    assert.exists(payload.token)
  })

  test('refresh requires authentication', async ({ client }) => {
    const response = await client.post(api('/auth/refresh'))
    response.assertStatus(401)
  })

  test('refresh and logout work for authenticated user', async ({ client, assert }) => {
    await client.post(api('/auth/register')).json({
      email: 'refresh@test.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    })
    const user = await User.findByOrFail('email', 'refresh@test.com')

    const refreshResponse = await client.post(api('/auth/refresh')).loginAs(user)
    refreshResponse.assertStatus(200)
    assert.exists(body<{ token: unknown }>(refreshResponse).token)

    const logoutResponse = await client.post(api('/auth/logout')).loginAs(user)
    logoutResponse.assertStatus(200)
    assert.equal(body<{ message: string }>(logoutResponse).message, 'Logged out successfully')
  })
})
