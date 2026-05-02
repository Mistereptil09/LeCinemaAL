import { type HttpContext } from '@adonisjs/core/http'
export default class TicketsController {
  /**
   * @myTickets
   * @tag Tickets
   */
  async myTickets({}: HttpContext) {}
  /**
   * @store
   * @tag Tickets
   */
  async store({}: HttpContext) {}
  /**
   * @use
   * @tag Tickets
   */
  async use({}: HttpContext) {}
}
