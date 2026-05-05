import { ListLoader } from '@adonisjs/ace'
import CreateAdminUser from '#tests/cli_tests/create_admin_user'

const loader = new ListLoader([CreateAdminUser])

export const getMetaData = () => loader.getMetaData()
export const getCommand = (...args: Parameters<typeof loader.getCommand>) =>
  loader.getCommand(...args)
