import { wallet } from '@/lib/db/schema'

export type Wallet = typeof wallet.$inferSelect
export type CreateWalletInput = typeof wallet.$inferInsert
export type UpdateWalletInput = Partial<CreateWalletInput>