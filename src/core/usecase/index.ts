import { walletRepository } from '../repository'
//
import {
  CreateWalletUseCase,
  GetWalletUseCase,
  UpdateWalletUseCase,
  DeleteWalletUseCase,
  AllWalletsUseCase,
  WalletUserUseCase,
} from './wallet.usecase'
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
 * Wallet Use Cases
*/  