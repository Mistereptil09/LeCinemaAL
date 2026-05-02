import { RoomSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Screening from '#models/screening'

export default class Room extends RoomSchema {
  @hasMany(() => Screening)
  declare screenings: HasMany<typeof Screening>
}
