import { type HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, signupValidator } from '#validators/user'

export default class AuthController {
  /**
   * @register
   * @tag Auth
   */
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(signupValidator)

    const user = await User.create({
      firstName: '',
      lastName: '',
      email: data.email,
      password: data.password,
      role: 'client',
      balance: '0',
    })

    const token = await User.accessTokens.create(user)

    return response.created({
      user,
      token: token.toJSON(),
    })
  }

  /**
   * @login
   * @tag Auth
   */
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      user,
      token: token.toJSON(),
    })
  }

  /**
   * @refresh
   * @tag Auth
   */
  async refresh({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    // Delete current token and create a new one
    const currentToken = auth.user!.currentAccessToken
    if (currentToken) {
      await User.accessTokens.delete(user, currentToken.identifier)
    }

    const newToken = await User.accessTokens.create(user)

    return response.ok({
      token: newToken.toJSON(),
    })
  }

  /**
   * @logout
   * @tag Auth
   */
  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const currentToken = auth.user!.currentAccessToken

    if (currentToken) {
      await User.accessTokens.delete(user, currentToken.identifier)
    }

    return response.ok({ message: 'Logged out successfully' })
  }
}
