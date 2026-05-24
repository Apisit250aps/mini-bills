import UseCase from '@/lib/app/usecase'
import { Transaction, CreateTransactionInput } from '../domain/transaction'
import TransactionRepository from '../repository/transaction.repo'
import { AppError, InternalError } from '@/lib/app/error'

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

export { CreateTransactionUseCase }
