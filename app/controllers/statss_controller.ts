import { type HttpContext } from '@adonisjs/core/http'
export default class StatsController {
  /**
   * @daily
   * @tag Stats
   */
  async daily({}: HttpContext) {}
  /**
   * @weekly
   * @tag Stats
   */
  async weekly({}: HttpContext) {}
  /**
   * @realtime
   * @tag Stats
   */
  async realtime({}: HttpContext) {}
  /**
   * @byPeriod
   * @tag Stats
   */
  async byPeriod({}: HttpContext) {}
}
