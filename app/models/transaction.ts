import { TransactionSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Transaction extends TransactionSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
