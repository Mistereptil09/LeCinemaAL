import { type HttpContext } from '@adonisjs/core/http'
export default class MoviesController {
  /**
   * @index
   * @tag Movies
   */
  async index({}: HttpContext) {}
  /**
   * @show
   * @tag Movies
   */
  async show({}: HttpContext) {}
  /**
   * @schedule
   * @tag Movies
   */
  async schedule({}: HttpContext) {}
  /**
   * @store
   * @tag Movies
   */
  async store({}: HttpContext) {}
  /**
   * @update
   * @tag Movies
   */
  async update({}: HttpContext) {}
  /**
   * @destroy
   * @tag Movies
   */
  async destroy({}: HttpContext) {}
}
