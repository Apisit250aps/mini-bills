import Repository from '@/lib/app/repository'
import { Wallet } from '../domain/wallet'
import { wallet } from '@/lib/db/schema'
import { NodePgDatabase, NodePgTransaction } from 'drizzle-orm/node-postgres'
import { eq, TablesRelationalConfig } from 'drizzle-orm'
class WalletRepository extends Repository<Wallet> {
  constructor(
    db:
      | NodePgDatabase
      | NodePgTransaction<Record<string, unknown>, TablesRelationalConfig>,
  ) {
    super(db, wallet)
  }

  findByUserId(userId: string): Promise<Wallet[] | null> {
    const model = this.model as typeof wallet & { userId: typeof wallet.userId }
    return this.db
      .select()
      .from(this.model)
      .where(eq(model.userId, userId)) as unknown as Promise<Wallet[] | null>
  }
}

export default WalletRepository
