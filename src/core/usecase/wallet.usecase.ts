import UseCase from '@/lib/app/usecase'
import { CreateWalletInput, Wallet } from '../domain/wallet'
import WalletRepository from '../repository/wallet.repo'
import { InternalError } from '@/lib/app/error'

class CreateWalletUseCase extends UseCase<CreateWalletInput, Wallet> {
  constructor(private walletRepository: WalletRepository) {
    super()
  }

  execute(input: CreateWalletInput): Promise<Wallet> {
    try {
      return this.walletRepository.create(input)
    } catch {
      throw new InternalError('Failed to create wallet')
    }
  }
}

export { CreateWalletUseCase }
