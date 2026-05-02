import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { appprefix } from '#start/constants'
const TicketsController = () => import('#controllers/tickets_controller')

router
  .group(() => {
    router.get('/me', [TicketsController, 'myTickets'])
    router.post('/', [TicketsController, 'store'])
    router.post('/:id/use', [TicketsController, 'use'])
  })
  .prefix(appprefix + '/tickets')
  .use(middleware.auth())
