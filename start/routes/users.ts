import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { appprefix } from '#start/constants'
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.get('/', [UsersController, 'index']).use(middleware.admin())
    router.get('/me', [UsersController, 'me'])
    router.get('/:id', [UsersController, 'show']).use(middleware.admin())
    router.post('/', [UsersController, 'store']).use(middleware.admin())
    router.put('/:id', [UsersController, 'update']).use(middleware.admin())
    router.delete('/:id', [UsersController, 'destroy']).use(middleware.admin())
  })
  .prefix(appprefix + '/users')
  .use(middleware.auth())
