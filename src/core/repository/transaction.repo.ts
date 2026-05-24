import Repository from '@/lib/app/repository'
import { Transaction } from '../domain/transaction'
import { transaction } from '@/lib/db/schema'
import { eq, TablesRelationalConfig } from 'drizzle-orm'
import { NodePgDatabase, NodePgTransaction } from 'drizzle-orm/node-postgres'

class TransactionRepository extends Repository<Transaction> {
  constructor(
    db:
      | NodePgDatabase
      | NodePgTransaction<Record<string, unknown>, TablesRelationalConfig>,
  ) {
    super(db, transaction)
  }
  async findByWalletId(walletId: string): Promise<Transaction[]> {
    const model = this.model as typeof transaction & {
      walletId: typeof transaction.walletId
    }
    const data = await this.db
      .select()
      .from(this.model)
      .where(eq(model.walletId, walletId))
    return data as Transaction[]
  }
}

export default TransactionRepository
