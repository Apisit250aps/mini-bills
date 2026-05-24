import {
  createWalletUseCase,
  deleteWalletUseCase,
  getWalletUseCase,
  updateWalletUseCase,
  walletUserUseCase,
} from '@/core/usecase'
import Controller from '@/lib/app/controller'
import { Context } from 'hono'
import z from 'zod'
class WalletController extends Controller {
  // Get wallet details by ID
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
  //
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
        const wallet = await createWalletUseCase.execute({
          ...body,
          userId: user.id,
        })
        return this.created(c, 'Wallet created successfully', wallet)
      },
    )
  }
  // 
  updateWallet() {
    return this.validator(
      {
        params: z.object({
          walletId: z.uuid(),
        }),
        body: z.object({
          title: z.string().min(1).optional(),
          description: z.string().nullable().optional(),
        }),
      },
      async (c: Context) => {
        const { walletId } = c.req.param()
        const body = await c.get('body')
        const wallet = await updateWalletUseCase.execute({
          walletId,
          data: body,
        })
        return this.response(c, {
          success: true,
          message: 'Wallet updated successfully',
          data: wallet,
        })
      },
    )
  }
  //
  deleteWallet() {
    return this.validator(
      {
        params: z.object({
          walletId: z.uuid(),
        }),
      },
      async (c: Context) => {
        const { walletId } = c.req.param()
        await deleteWalletUseCase.execute(walletId)
        return this.success(c, 'Wallet deleted successfully')
      },
    )
  }
  //
  userWallets() {
    return this.validator({}, async (c: Context) => {
      const user = c.get('user')
      const wallets = await walletUserUseCase.execute(user.id)
      return this.response(c, {
        success: true,
        message: 'User wallets retrieved successfully',
        data: wallets,
      })
    })
  }
}

export default WalletController
