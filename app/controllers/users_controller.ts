import { type HttpContext } from '@adonisjs/core/http'
export default class UsersController {
  /**
   * @index
   * @tag Users
   */
  async index({}: HttpContext) {}
  /**
   * @me
   * @tag Users
   */
  async me({}: HttpContext) {}
  /**
   * @show
   * @tag Users
   */
  async show({}: HttpContext) {}
}
