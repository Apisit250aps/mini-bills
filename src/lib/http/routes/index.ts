import { Hono } from 'hono'
import WalletController from '@/lib/http/controllers/wallet.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const walletController = new WalletController()

const router = new Hono()
/**
 * Wallet routes
 * - POST /wallets: Create a new wallet
 * - GET /wallets/:walletId: Get wallet details by ID
 * - PUT /wallets/:walletId: Update wallet details by ID
 * - DELETE /wallets/:walletId: Delete a wallet by ID
 */
router.post('/wallets', authMiddleware(), walletController.createWallet())
router.get('/wallets/:walletId', authMiddleware(), walletController.getWallet())

export default router
