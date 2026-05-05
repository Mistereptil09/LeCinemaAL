import Transaction from '#models/transaction'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
  /**
   * @index
   * @tag Transactions
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    return Transaction.query().preload('user').orderBy('createdAt', 'desc').paginate(page, limit)
  }

  /**
   * @show
   * @tag Transactions
   */
  async show({ params }: HttpContext) {
    return Transaction.query().where('id', params.id).preload('user').firstOrFail()
  }

  /**
   * @mine
   * @tag Transactions
   */
  async mine({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return Transaction.query().where('userId', user.id).orderBy('createdAt', 'desc')
  }

  /**
   * @store
   * @tag Transactions
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { type, amount, description } = request.only(['type', 'amount', 'description'])

    // Vérifier que le type est conforme au CHECK SQL ('deposit', 'withdraw', 'purchase')
    const validTypes = ['deposit', 'withdraw', 'purchase']
    if (!validTypes.includes(type)) {
      return response.badRequest('Type de transaction invalide.')
    }

    const currentWallet = Number.parseFloat(user.wallet)
    const transactionAmount = Number.parseFloat(amount)

    // Logique de solde basée sur 'purchase' ou 'withdraw'
    if ((type === 'purchase' || type === 'withdraw') && currentWallet < transactionAmount) {
      return response.paymentRequired('Solde insuffisant.')
    }

    const transaction = await Transaction.create({
      userId: user.id,
      type, // 'purchase', 'deposit' ou 'withdraw'
      amount: transactionAmount.toFixed(2),
      description,
    })

    // Mise à jour du wallet
    user.wallet =
      type === 'deposit'
        ? (currentWallet + transactionAmount).toFixed(2)
        : (currentWallet - transactionAmount).toFixed(2)

    await user.save()
    return response.created(transaction)
  }

  /**
   * @update
   * @tag Transactions
   */
  async update({ params, request }: HttpContext) {
    const transaction = await Transaction.findOrFail(params.id)
    transaction.merge(request.only(['type', 'amount', 'description']))
    await transaction.save()

    return transaction
  }

  /**
   * @destroy
   * @tag Transactions
   */
  async destroy({ params, response }: HttpContext) {
    const transaction = await Transaction.findOrFail(params.id)
    await transaction.delete()

    return response.noContent()
  }
}
