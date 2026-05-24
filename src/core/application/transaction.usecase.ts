import UseCase from '@/lib/app/usecase'
import { Transaction, CreateTransactionInput } from '../domain/transaction'
import TransactionRepository from '../repository/transaction.repo'
import { AppError, InternalError } from '@/lib/app/error'

/**
 * Use case for creating a new transaction
 * This use case handles the business logic for creating a transaction, including validation and error handling.
 */
class CreateTransactionUseCase extends UseCase<
  CreateTransactionInput,
  Transaction
> {
  constructor(private transactionRepository: TransactionRepository) {
    super()
  }

  execute(input: CreateTransactionInput): Promise<Transaction> {
    try {
      return this.transactionRepository.create(input)
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new InternalError('Failed to create transaction')
    }
  }
}

class GetTransactionUseCase extends UseCase<string, Transaction> {
  constructor(private transactionRepository: TransactionRepository) {
    super()
  }
  async execute(transactionId: string): Promise<Transaction> {
    try {
      const transaction =
        await this.transactionRepository.findById(transactionId)
      if (!transaction) {
        throw new AppError('Transaction not found', 404)
      }
      return transaction
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new InternalError('Failed to get transaction')
    }
  }
}

class AllTransactionsUseCase extends UseCase<string, Transaction[]> {
  constructor(private transactionRepository: TransactionRepository) {
    super()
  }
  async execute(walletId: string): Promise<Transaction[]> {
    try {
      return await this.transactionRepository.findByWalletId(walletId)
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new InternalError('Failed to get transactions')
    }
  }
}

class DeleteTransactionUseCase extends UseCase<string, void> {
  constructor(private transactionRepository: TransactionRepository) {
    super()
  }
  async execute(transactionId: string): Promise<void> {
    try {
      await this.transactionRepository.delete(transactionId)
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new InternalError('Failed to delete transaction')
    }
  }
}

export {
  CreateTransactionUseCase,
  GetTransactionUseCase,
  AllTransactionsUseCase,
  DeleteTransactionUseCase,
}
