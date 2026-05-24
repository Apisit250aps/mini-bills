import { authHandler, initAuthConfig } from '@hono/auth-js'
import { Hono } from 'hono'
import authConfig from './config/auth'

const api = new Hono().basePath('/api')

api.use(
  '*',
  initAuthConfig(() => ({
    basePath: '/api/auth',
    ...authConfig,
  })),
)
api.use('/auth/*', authHandler())

export default api
