import {
  allTransactionsUseCase,
  createTransactionUseCase,
  deleteTransactionUseCase,
  getTransactionUseCase,
} from '@/core/application'
import Controller from '@/lib/app/controller'
import { Context } from 'hono'
import z from 'zod'

export default class TransactionController extends Controller {
  // Create a new transaction
  createTransaction() {
    return this.validator(
      {
        body: z.object({
          walletId: z.string().uuid(),
          amount: z.number(),
          description: z.string().nullable().optional(),
        }),
      },
      async (c: Context) => {
        const body = await c.get('body')
        const user = c.get('user')
        const transaction = await createTransactionUseCase.execute({
          ...body,
          userId: user.id,
        })
        return this.created(c, 'Transaction created successfully', transaction)
      },
    )
  }
  // Get all transactions for a wallet
  getAllTransactions() {
    return this.validator(
      {
        query: z.object({
          walletId: z.uuid(),
        }),
      },
      async (c: Context) => {
        const query = await c.get('query')
        const transactions = await allTransactionsUseCase.execute(
          query.walletId,
        )
        return this.success(
          c,
          'Transactions retrieved successfully',
          transactions,
        )
      },
    )
  }
  // Get transaction details by ID
  getTransaction() {
    return this.validator(
      {
        params: z.object({
          transactionId: z.uuid(),
        }),
      },
      async (c: Context) => {
        const { transactionId } = c.req.param()
        const transaction = await getTransactionUseCase.execute(transactionId)
        return this.response(c, {
          success: true,
          message: 'Transaction retrieved successfully',
          data: transaction,
        })
      },
    )
  }
  // Delete a transaction by ID
  deleteTransaction() {
    return this.validator(
      {
        params: z.object({
          transactionId: z.uuid(),
        }),
      },
      async (c: Context) => {
        const { transactionId } = c.req.param()
        await deleteTransactionUseCase.execute(transactionId)
        return this.success(c, 'Transaction deleted successfully')
      },
    )
  }
}
