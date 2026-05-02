import { ScreeningSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Room from '#models/room'
import Movie from '#models/movie'
import TicketUse from '#models/ticket_use'

export default class Screening extends ScreeningSchema {
  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>

  @belongsTo(() => Movie)
  declare movie: BelongsTo<typeof Movie>

  @hasMany(() => TicketUse)
  declare ticketUses: HasMany<typeof TicketUse>
}
