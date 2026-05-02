import { TicketUsSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Ticket from '#models/ticket'
import Screening from '#models/screening'

export default class TicketUse extends TicketUsSchema {
  @belongsTo(() => Ticket)
  declare ticket: BelongsTo<typeof Ticket>

  @belongsTo(() => Screening)
  declare screening: BelongsTo<typeof Screening>
}
