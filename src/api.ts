import { authHandler, initAuthConfig } from '@hono/auth-js'
import { Hono } from 'hono'
// 
import authConfig from '@/config/auth'
import { onAppError } from '@/lib/app/error';
// 
const api = new Hono().basePath('/api')

api.use(
  '*',
  initAuthConfig(() => ({
    basePath: '/api/auth',
    ...authConfig,
  })),
)
api.use('/auth/*', authHandler())
api.onError(onAppError)

export default api
