import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.get('/', [UsersController, 'index']).use(middleware.admin())
    router.get('/me', [UsersController, 'me'])
    router.get('/:id', [UsersController, 'show']).use(middleware.admin())
  })
  .prefix('/users')
  .use(middleware.auth())
