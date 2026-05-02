/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import router from '@adonisjs/core/services/router'

import './routes/auth.ts'
import './routes/users.ts'
import './routes/rooms.ts'
import './routes/movies.ts'
import './routes/screenings.ts'
import './routes/tickets.ts'
import './routes/stats.ts'

router.get('/', () => {
  return { hello: 'world' }
})

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})
