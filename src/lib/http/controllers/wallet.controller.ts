import { getWalletUseCase } from '@/core/usecase'
import { Context } from 'hono'

class WalletController {
  async getWallet(ctx: Context) {
    const { walletId } = ctx.req.param()
    const wallet = await getWalletUseCase.execute(walletId)

    return ctx.json({
      data: wallet,
      success: true,
      message: 'Wallet retrieved successfully',
    })
  }
}

export default WalletController
