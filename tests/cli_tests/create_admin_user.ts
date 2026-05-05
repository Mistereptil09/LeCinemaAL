import { BaseCommand } from '@adonisjs/core/ace'
import { flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import User from '#models/user'

export default class CreateAdminUser extends BaseCommand {
  static commandName = 'create:admin-user'
  static description = 'Create or update an admin user'

  static options: CommandOptions = {
    startApp: true,
  }

  @flags.string({ description: 'Admin email', required: true })
  declare email: string

  @flags.string({ description: 'Admin password', required: true })
  declare password: string

  @flags.string({ description: 'First name', default: 'Admin' })
  declare firstName: string

  @flags.string({ description: 'Last name', default: 'User' })
  declare lastName: string

  @flags.string({ description: 'Starting Wallet amount', default: '0' })
  declare wallet: string

  @flags.boolean({ description: 'Create as superadmin instead of admin' })
  declare superadmin: boolean

  @flags.boolean({ description: 'Update existing user with same email' })
  declare upsert: boolean

  async run() {
    const role = this.superadmin ? 'superadmin' : 'admin'
    const existingUser = await User.findBy('email', this.email)

    if (existingUser && !this.upsert) {
      this.logger.error(`User "${this.email}" already exists. Use --upsert to update it.`)
      this.exitCode = 1
      return
    }

    if (existingUser) {
      existingUser.merge({
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        role,
        wallet: this.wallet,
      })
      await existingUser.save()
      this.logger.success(`Updated ${role} user: ${existingUser.email} (id=${existingUser.id})`)
      return
    }

    const user = await User.create({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      role,
      wallet: this.wallet,
    })

    this.logger.success(`Created ${role} user: ${user.email} (id=${user.id})`)
  }
}
