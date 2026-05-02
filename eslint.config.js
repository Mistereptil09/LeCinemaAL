import { configApp } from '@adonisjs/eslint-config'

export default [...configApp(), { ignores: ['docker/**', 'node_modules/**'] }]
