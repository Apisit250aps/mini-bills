import { authHandler, initAuthConfig } from '@hono/auth-js'
import { Hono } from 'hono'
// 
import authConfig from '@/config/auth'
import { onAppError } from '@/lib/app/error';
// 
import WalletController from './lib/http/controllers/wallet.controller';
import {logger} from 'hono/logger'
const walletController = new WalletController()

const api = new Hono().basePath('/api')
api.use(logger())
api.use(
  '*',
  initAuthConfig(() => ({
    basePath: '/api/auth',
    ...authConfig,
  })),
)

api.use('/auth/*', authHandler())
api.get('/wallets/:walletId',walletController.getWallet)
api.onError(onAppError)

export default api
