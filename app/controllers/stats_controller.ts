import User from '#models/user'
import Room from '#models/room'
import Screening from '#models/screening'
import Ticket from '#models/ticket'
import TicketUse from '#models/ticket_use'
import { DateTime } from 'luxon'
import { type HttpContext } from '@adonisjs/core/http'

export default class StatsController {
  /**
   * @daily
   * @tag Stats
   */
  async daily({}: HttpContext) {
    const start = DateTime.now().startOf('day')
    const end = DateTime.now().endOf('day')

    const screeningsToday = await Screening.query()
      .whereBetween('startAt', [start.toSQL()!, end.toSQL()!])
      .count('* as total')

    const usedToday = await TicketUse.query()
      .whereBetween('usedAt', [start.toSQL()!, end.toSQL()!])
      .count('* as total')

    return {
      period: 'daily',
      screenings: Number(screeningsToday[0].$extras.total ?? 0),
      usedTickets: Number(usedToday[0].$extras.total ?? 0),
    }
  }

  /**
   * @weekly
   * @tag Stats
   */
  async weekly({}: HttpContext) {
    const start = DateTime.now().startOf('week')
    const end = DateTime.now().endOf('week')

    const screeningsWeek = await Screening.query()
      .whereBetween('startAt', [start.toSQL()!, end.toSQL()!])
      .count('* as total')

    const usedWeek = await TicketUse.query()
      .whereBetween('usedAt', [start.toSQL()!, end.toSQL()!])
      .count('* as total')

    return {
      period: 'weekly',
      screenings: Number(screeningsWeek[0].$extras.total ?? 0),
      usedTickets: Number(usedWeek[0].$extras.total ?? 0),
    }
  }

  /**
   * @realtime
   * @tag Stats
   */
  async realtime({}: HttpContext) {
    const [users] = await User.query().count('* as total')
    const [rooms] = await Room.query().count('* as total')
    const [screenings] = await Screening.query().count('* as total')
    const [tickets] = await Ticket.query().count('* as total')
    const [ticketUses] = await TicketUse.query().count('* as total')

    return {
      users: Number(users.$extras.total ?? 0),
      rooms: Number(rooms.$extras.total ?? 0),
      screenings: Number(screenings.$extras.total ?? 0),
      tickets: Number(tickets.$extras.total ?? 0),
      ticketUses: Number(ticketUses.$extras.total ?? 0),
    }
  }

  /**
   * @byPeriod
   * @tag Stats
   */
  async byPeriod({ request }: HttpContext) {
    const start = request.input('startDate') // ex: 2026-05-01
    const end = request.input('endDate') // ex: 2026-05-07

    const screenings = await Screening.query()
      .whereBetween('startAt', [start, end])
      .count('* as total')

    const used = await TicketUse.query().whereBetween('usedAt', [start, end]).count('* as total')

    return {
      period: 'custom',
      screenings: screenings[0].$extras.total,
      usedTickets: used[0].$extras.total,
    }
  }
}
