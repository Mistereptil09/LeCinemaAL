import { type HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({}: HttpContext) {}
  async login({}: HttpContext) {}
  async refresh({}: HttpContext) {}
  async logout({}: HttpContext) {}
}
