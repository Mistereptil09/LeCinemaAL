import User from '#models/user'
import { type HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * @index
   * @tag Users
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    return User.query().orderBy('createdAt', 'desc').paginate(page, limit)
  }

  /**
   * @me
   * @tag Users
   */
  async me({ auth }: HttpContext) {
    return auth.getUserOrFail()
  }

  /**
   * @show
   * @tag Users
   */
  async show({ params }: HttpContext) {
    return User.query()
      .where('id', params.id)
      .preload('tickets', (ticketQuery) => {
        // On passe par la table de liaison définie dans le schéma SQL
        ticketQuery.preload('uses', (useQuery) => {
          useQuery.preload('screening', (screeningQuery) => {
            screeningQuery.preload('movie')
          })
        })
      })
      .preload('transactions')
      .firstOrFail()
  }

  /**
   * @store
   * @tag Users
   */
  async store({ request, response }: HttpContext) {
    const payload = request.only(['firstName', 'lastName', 'email', 'password', 'role', 'wallet'])

    const user = await User.create({
      ...payload,
      wallet: payload.wallet ?? '0',
      role: payload.role ?? 'client',
    })

    return response.created(user)
  }
  /**
   * @update
   * @tag Users
   */
  async update({ params, request }: HttpContext) {
    const user = await User.findOrFail(params.id)
    user.merge(request.only(['firstName', 'lastName', 'email', 'wallet', 'role']))

    await user.save()
    return user
  }

  /**
   * @destroy
   * @tag Users
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return response.noContent()
  }
}
