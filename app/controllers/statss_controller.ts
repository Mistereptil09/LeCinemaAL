import { type HttpContext } from '@adonisjs/core/http'

export default class StatsController {
  async daily({}: HttpContext) {}
  async weekly({}: HttpContext) {}
  async realtime({}: HttpContext) {}
  async byPeriod({}: HttpContext) {}
}
