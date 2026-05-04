import { type HttpContext } from '@adonisjs/core/http'
import { storeTicketValidator, useTicketValiator } from '#validators/ticket'
import Ticket from '#models/ticket'
import Screening from '#models/screening'
import TicketUse from '#models/ticket_use'
import { DateTime } from 'luxon'

export default class TicketsController {
  /**
   * @myTickets
   * @tag Tickets
   */
  async myTickets({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const tickets = await user.related('tickets').query().preload('uses')
    return response.ok(tickets)
  }
  /**
   * @store
   * @tag Tickets
   */
  async store({ auth, request, response }: HttpContext) {
    const user = await auth.authenticate()

    const { type } = await request.validateUsing(storeTicketValidator)

    const prices: Record<string, number> = { standard: 10, super: 50 }
    const uses: Record<string, number> = { standard: 1, super: 10 }
    const price = prices[type]

    const balance = Number.parseFloat(user.wallet)
    if (balance < price) {
      return response.paymentRequired({ message: 'Not enough money in account balance' })
    }

    user.wallet = String(balance - price)
    await user.save()

    await user.related('transactions').create({
      amount: String(price),
      type: 'purchase',
      description: `Purchased a ${type} ticket`,
    })

    const ticket = await user.related('tickets').create({
      type,
      remainingUses: uses[type],
      isUsed: false,
    })

    return response.created(ticket)
  }
  /**
   * @use
   * @tag Tickets
   */
  async use({ auth, params, request, response }: HttpContext) {
    const user = await auth.authenticate()

    const { screeningId } = await request.validateUsing(useTicketValiator)

    const ticket = await Ticket.query()
      .where('id', params.id)
      .where('userId', user.id)
      .firstOrFail()

    if (ticket.remainingUses <= 0 || ticket.isUsed) {
      return response.forbidden({ message: 'Not enough ticket use left' })
    }

    const screening = await Screening.findOrFail(screeningId)

    if (screening.startAt <= DateTime.now()) {
      return response.gone({ message: 'Screening already started' })
    }

    const existingUse = await TicketUse.query()
      .whereHas('ticket', (query) => {
        query.where('userId', user.id)
      })
      .where('screeningId', screeningId)
      .first()

    if (existingUse) {
      return response.conflict({ message: 'You already have a ticket for this screening' })
    }

    await ticket.related('uses').create({
      screeningId,
      usedAt: DateTime.now(),
    })

    ticket.remainingUses -= 1
    if (ticket.remainingUses <= 0) {
      ticket.isUsed = true
    }

    await ticket.save()
    return response.ok(ticket)
  }
}
