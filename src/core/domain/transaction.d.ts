import { transaction, transactionEnum } from '@/lib/db/schema'

export type Transaction = typeof transaction.$inferSelect
export type CreateTransactionInput = typeof transaction.$inferInsert
export type UpdateTransactionInput = Partial<CreateTransactionInput>

export type TransactionType =
  (typeof transactionEnum)[keyof typeof transactionEnum]
