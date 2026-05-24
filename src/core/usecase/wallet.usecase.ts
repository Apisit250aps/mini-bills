import UseCase from '@/lib/app/usecase'
import { CreateWalletInput, Wallet } from '../domain/wallet'
import WalletRepository from '../repository/wallet.repo'
import { AppError, InternalError, NotFoundError } from '@/lib/app/error'

class CreateWalletUseCase extends UseCase<CreateWalletInput, Wallet> {
  constructor(private walletRepository: WalletRepository) {
    super()
  }

  execute(input: CreateWalletInput): Promise<Wallet> {
    try {
      return this.walletRepository.create(input)
    } catch (err) {
      if (err instanceof AppError) throw err
      throw new InternalError('Failed to create wallet')
    }
  }
}

class GetWalletUseCase extends UseCase<string, Wallet> {
  constructor(private walletRepository: WalletRepository) {
    super()
  }
  async execute(walletId: string): Promise<Wallet> {
    try {
      const wallet = await this.walletRepository.findById(walletId)
      if (!wallet) {
        throw new NotFoundError('Wallet not found')
      }
      return wallet
    } catch (err) {
      if (err instanceof AppError) throw err
      throw new InternalError('Failed to get wallet')
    }
  }
}

class UpdateWalletUseCase extends UseCase<
  { walletId: string; data: Partial<Wallet> },
  Wallet
> {
  constructor(private walletRepository: WalletRepository) {
    super()
  }
  async execute({
    walletId,
    data,
  }: {
    walletId: string
    data: Partial<Wallet>
  }): Promise<Wallet> {
    try {
      const wallet = await this.walletRepository.update(walletId, data)
      if (!wallet) {
        throw new NotFoundError('Wallet not found')
      }
      return wallet
    } catch (err) {
      if (err instanceof AppError) throw err
      throw new InternalError('Failed to update wallet')
    }
  }
}

class DeleteWalletUseCase extends UseCase<string, void> {
  constructor(private walletRepository: WalletRepository) {
    super()
  }
  async execute(walletId: string): Promise<void> {
    try {
      const wallet = await this.walletRepository.findById(walletId)
      if (!wallet) {
        throw new NotFoundError('Wallet not found')
      }
      await this.walletRepository.delete(walletId)
    } catch (err) {
      if (err instanceof AppError) throw err
      throw new InternalError('Failed to delete wallet')
    }
  }
}

class AllWalletsUseCase extends UseCase<void, Wallet[]> {
  constructor(private walletRepository: WalletRepository) {
    super()
  }
  async execute(): Promise<Wallet[]> {
    try {
      return await this.walletRepository.findAll()
    } catch {
      throw new InternalError('Failed to get wallets')
    }
  }
}

class WalletUserUseCase extends UseCase<string, Wallet[]> {
  constructor(private walletRepository: WalletRepository) {
    super()
  }
  async execute(userId: string): Promise<Wallet[]> {
    try {
      const wallets = await this.walletRepository.findByUserId(userId)
      return wallets || []
    } catch {
      throw new InternalError('Failed to get wallets for user')
    }
  }
}

export {
  CreateWalletUseCase,
  GetWalletUseCase,
  UpdateWalletUseCase,
  DeleteWalletUseCase,
  AllWalletsUseCase,
  WalletUserUseCase,
}
