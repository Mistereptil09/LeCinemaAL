import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/me', [TicketsController, 'myTickets'])
    router.post('/', [TicketsController, 'store'])
    router.post('/:id/use', [TicketsController, 'use'])
  })
  .prefix('/tickets')
  .use(middleware.auth())
