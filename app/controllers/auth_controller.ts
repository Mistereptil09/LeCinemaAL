import { type HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * @register
   * @tag Auth
   */
  async register({}: HttpContext) {}

  /**
   * @login
   * @tag Auth
   */
  async login({}: HttpContext) {}

  /**
   * @refresh
   * @tag Auth
   */
  async refresh({}: HttpContext) {}

  /**
   * @logout
   * @tag Auth
   */
  async logout({}: HttpContext) {}
}
