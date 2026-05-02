import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { appprefix } from '#start/constants'
const MoviesController = () => import('#controllers/movies_controller')

router
  .group(() => {
    router.get('/', [MoviesController, 'index'])
    router.get('/:id', [MoviesController, 'show'])
    router.get('/:id/schedule', [MoviesController, 'schedule'])
    router.post('/', [MoviesController, 'store']).use(middleware.admin())
    router.put('/:id', [MoviesController, 'update']).use(middleware.admin())
    router.delete('/:id', [MoviesController, 'destroy']).use(middleware.admin())
  })
  .prefix(appprefix + '/movies')
  .use(middleware.auth())
