import { UserSchema } from '#database/schema'
import { hasMany, beforeSave } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Ticket from '#models/ticket'
import Transaction from '#models/transaction'
import hash from '@adonisjs/core/services/hash'

export default class User extends UserSchema {
  @hasMany(() => Ticket)
  declare tickets: HasMany<typeof Ticket>

  @hasMany(() => Transaction)
  declare transactions: HasMany<typeof Transaction>

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}
