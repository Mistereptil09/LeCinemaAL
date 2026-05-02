import { type HttpContext } from '@adonisjs/core/http'

export default class RoomsController {
  /**
   * @index
   * @tag Rooms
   */
  async index({}: HttpContext) {}
  /**
   * @show
   * @tag Rooms
   */
  async show({}: HttpContext) {}
  /**
   * @schedule
   * @tag Rooms
   */
  async schedule({}: HttpContext) {}
  /**
   * @store
   * @tag Rooms
   */
  async store({}: HttpContext) {}
  /**
   * @update
   * @tag Rooms
   */
  async update({}: HttpContext) {}
  /**
   * @destroy
   * @tag Rooms
   */
  async destroy({}: HttpContext) {}
  /**
   * @toggleMaintenance
   * @tag Rooms
   */
  async toggleMaintenance({}: HttpContext) {}
}
