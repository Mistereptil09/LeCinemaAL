import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { appprefix } from '#start/constants'
const StatsController = () => import('#controllers/statss_controller')

router
  .group(() => {
    router.get('/daily', [StatsController, 'daily'])
    router.get('/weekly', [StatsController, 'weekly'])
    router.get('/realtime', [StatsController, 'realtime'])
    router.get('/', [StatsController, 'byPeriod'])
  })
  .prefix(appprefix + '/stats')
  .use(middleware.auth())
  .use(middleware.admin())
