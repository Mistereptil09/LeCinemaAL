import { TicketSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import TicketUse from '#models/ticket_use'

export default class Ticket extends TicketSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => TicketUse)
  declare uses: HasMany<typeof TicketUse>
}
