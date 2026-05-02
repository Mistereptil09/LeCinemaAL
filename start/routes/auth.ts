import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { appprefix } from '#start/constants'
const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    router.post('/refresh', [AuthController, 'refresh']).use(middleware.auth())
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix(appprefix + '/auth')
  .as('auth')
