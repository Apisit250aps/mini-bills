import db from '@/lib/db'
import WalletRepository from './wallet.repo'

const walletRepository = new WalletRepository(db)

export { walletRepository }
