import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { appprefix } from '#start/constants'
const TransactionsController = () => import('#controllers/transactions_controller')

router
  .group(() => {
    router.get('/', [TransactionsController, 'index']).use(middleware.admin())
    router.get('/me', [TransactionsController, 'mine'])
    router.get('/:id', [TransactionsController, 'show']).use(middleware.admin())
    router.post('/', [TransactionsController, 'store'])
    router.put('/:id', [TransactionsController, 'update']).use(middleware.admin())
    router.delete('/:id', [TransactionsController, 'destroy']).use(middleware.admin())
  })
  .prefix(appprefix + '/transactions')
  .use(middleware.auth())
