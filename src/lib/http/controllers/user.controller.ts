import { getMeUseCase } from '@/core/application';
import Controller from '@/lib/app/controller'
import { Context } from 'hono'

class UserController extends Controller {
  getMe() {
    return this.validator({}, async (c: Context) => {
      const user = await c.get('user')
      const userId = user?.id
      const me = await getMeUseCase.execute(userId)
      return this.success(c, 'Get me', me)
    })
  }
}

export default UserController