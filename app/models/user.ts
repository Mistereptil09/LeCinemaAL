import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { UserSchema } from '#database/schema'
import Ticket from '#models/ticket'
import Transaction from '#models/transaction'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(UserSchema, AuthFinder) {
  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasMany(() => Ticket)
  declare tickets: HasMany<typeof Ticket>

  @hasMany(() => Transaction)
  declare transactions: HasMany<typeof Transaction>
}
