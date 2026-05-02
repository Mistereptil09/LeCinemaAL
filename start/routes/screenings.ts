import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const ScreeningsController = () => import('#controllers/screenings_controller')

router
  .group(() => {
    router.get('/', [ScreeningsController, 'index'])
    router.get('/:id', [ScreeningsController, 'show'])
    router.get('/:id/stats', [ScreeningsController, 'stats']).use(middleware.admin())
    router.post('/', [ScreeningsController, 'store']).use(middleware.admin())
    router.put('/:id', [ScreeningsController, 'update']).use(middleware.admin())
    router.delete('/:id', [ScreeningsController, 'destroy']).use(middleware.admin())
  })
  .prefix('/screenings')
  .use(middleware.auth())
