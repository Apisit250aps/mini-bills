import { UnauthorizedError } from '@/lib/app/error';
import { getAuthUser } from '@hono/auth-js'
import { Context, MiddlewareHandler } from 'hono'

export const authMiddleware = (): MiddlewareHandler => {
  return async (c: Context, next) => {
    const auth = await getAuthUser(c)
    if (!auth) {
      throw new UnauthorizedError('Unauthorized')
    }
    c.set('user', auth.session.user)
    return next()
  }
}
