import { walletRepository, transactionRepository } from '../repository'

// Wallet Use Cases
import {
  CreateWalletUseCase,
  GetWalletUseCase,
  UpdateWalletUseCase,
  DeleteWalletUseCase,
  AllWalletsUseCase,
  WalletUserUseCase,
} from './wallet.usecase'

// Transaction Use Cases
import {
  AllTransactionsUseCase,
  CreateTransactionUseCase,
  DeleteTransactionUseCase,
  GetTransactionUseCase,
} from './transaction.usecase'

/**
 * Wallet Use Cases
 */
export const createWalletUseCase = new CreateWalletUseCase(walletRepository)
export const getWalletUseCase = new GetWalletUseCase(walletRepository)
export const allWalletsUseCase = new AllWalletsUseCase(walletRepository)
export const walletUserUseCase = new WalletUserUseCase(walletRepository)
export const updateWalletUseCase = new UpdateWalletUseCase(walletRepository)
export const deleteWalletUseCase = new DeleteWalletUseCase(walletRepository)
/**
 * Transaction Use Cases
 */
export const createTransactionUseCase = new CreateTransactionUseCase(
  transactionRepository,
)
export const allTransactionsUseCase = new AllTransactionsUseCase(
  transactionRepository,
)
export const getTransactionUseCase = new GetTransactionUseCase(
  transactionRepository,
)
export const deleteTransactionUseCase = new DeleteTransactionUseCase(
  transactionRepository,
)
