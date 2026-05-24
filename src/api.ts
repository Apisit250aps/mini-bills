import { authHandler, initAuthConfig } from '@hono/auth-js'
import { Hono } from 'hono'
//
import authConfig from '@/config/auth'
import { onAppError } from '@/lib/app/error'
//
import { logger } from 'hono/logger'
import router from './lib/http/routes'
import { User } from 'next-auth'
type Variables = {
  user?: User | null
}
const api = new Hono<{ Variables: Variables }>().basePath('/api')
api.use(logger())
api.use(
  '*',
  initAuthConfig(() => ({
    basePath: '/api/auth',
    ...authConfig,
  })),
)
api.use('/auth/*', authHandler())
api.route('', router)
api.onError(onAppError)

export default api
