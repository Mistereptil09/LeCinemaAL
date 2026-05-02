import env from '#start/env'

export const appprefix = '/api/v' + env.get('APP_VERSION')
