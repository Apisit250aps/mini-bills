import db from '@/lib/db'
// repositories
import WalletRepository from './wallet.repo'
import TransactionRepository from './transaction.repo'

const walletRepository = new WalletRepository(db)
const transactionRepository = new TransactionRepository(db)

export { walletRepository, transactionRepository }
