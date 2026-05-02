import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { appprefix } from '#start/constants'

router
  .group(() => {
    router.post('signup', [controllers.NewAccount, 'store'])
    router.post('login', [controllers.AccessTokens, 'store'])
  })
  .prefix(appprefix + '/auth')
  .as('auth')
