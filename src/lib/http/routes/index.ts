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
router.get('/wallets', authMiddleware(), walletController.userWallets())
router.get('/wallets/:walletId', authMiddleware(), walletController.getWallet())
router.put(
  '/wallets/:walletId',
  authMiddleware(),
  walletController.updateWallet(),
)
router.delete(
  '/wallets/:walletId',
  authMiddleware(),
  walletController.deleteWallet(),
)
/**
 * Transaction routes
 * - POST /transactions: Create a new transaction
 * - GET /transactions/:transactionId: Get transaction details by ID
 * - PUT /transactions/:transactionId: Update transaction details by ID
 * - DELETE /transactions/:transactionId: Delete a transaction by ID
 */
export default router
