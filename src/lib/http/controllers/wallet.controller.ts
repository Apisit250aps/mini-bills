import { createWalletUseCase, getWalletUseCase } from '@/core/usecase'
import Controller from '@/lib/app/controller'
import { Context } from 'hono'
import z from 'zod'
class WalletController extends Controller {
  getWallet() {
    return this.validator(
      {
        params: z.object({
          walletId: z.uuid(),
        }),
      },
      async (c: Context) => {
        const { walletId } = c.req.param()
        const wallet = await getWalletUseCase.execute(walletId)
        return this.response(c, {
          success: true,
          message: 'Wallet retrieved successfully',
          data: wallet,
        })
      },
    )
  }
  createWallet() {
    return this.validator(
      {
        body: z.object({
          title: z.string().min(1),
          description: z.string().nullable().optional(),
        }),
      },
      async (c: Context) => {
        const body = await c.get('body')
        const user = c.get('user')
        console.log('WalletController.createWallet - user:', user, 'body:', body)
        const wallet = await createWalletUseCase.execute({ ...body, userId: user.id })
        return this.created(c, 'Wallet created successfully', wallet)
      },
    )
  }
}

export default WalletController
