import db from '@/lib/db'
// repositories
import WalletRepository from './wallet.repo'
import TransactionRepository from './transaction.repo'
import UserRepository from './user.repo';

const walletRepository = new WalletRepository(db)
const transactionRepository = new TransactionRepository(db)
const userRepository = new UserRepository(db)

export { walletRepository, transactionRepository, userRepository }
