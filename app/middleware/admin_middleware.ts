import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ message: 'Not authenticated' })
    }

    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return response.forbidden({ message: 'Access denied' })
    }

    await next()
  }
}
