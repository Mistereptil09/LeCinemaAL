import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { appprefix } from '#start/constants'
const RoomsController = () => import('#controllers/rooms_controller')

router
  .group(() => {
    router.get('/', [RoomsController, 'index'])
    router.get('/:id', [RoomsController, 'show'])
    router.get('/:id/schedule', [RoomsController, 'schedule'])
    router.post('/', [RoomsController, 'store']).use(middleware.admin())
    router.put('/:id', [RoomsController, 'update']).use(middleware.admin())
    router.patch('/:id/maintenance', [RoomsController, 'toggleMaintenance']).use(middleware.admin())
    router.delete('/:id', [RoomsController, 'destroy']).use(middleware.admin())
  })
  .prefix(appprefix + '/rooms')
  .use(middleware.auth())
