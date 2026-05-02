import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', [RoomsController, 'index'])
    router.get('/:id', [RoomsController, 'show'])
    router.get('/:id/schedule', [RoomsController, 'schedule'])
    router.post('/', [RoomsController, 'store']).use(middleware.admin())
    router.put('/:id', [RoomsController, 'update']).use(middleware.admin())
    router.delete('/:id', [RoomsController, 'destroy']).use(middleware.admin())
    router.patch('/:id/maintenance', [RoomsController, 'toggleMaintenance']).use(middleware.admin())
  })
  .prefix('/rooms')
  .use(middleware.auth())

