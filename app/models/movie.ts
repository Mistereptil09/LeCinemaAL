import { MovieSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Screening from '#models/screening'
export default class Movie extends MovieSchema {
  @hasMany(() => Screening)
  declare screenings: HasMany<typeof Screening>
}
