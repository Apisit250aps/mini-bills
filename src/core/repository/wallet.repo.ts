import Repository from '@/lib/app/repository'
import { Wallet } from '../domain/wallet'
import { wallet } from '@/lib/db/schema'
import { NodePgDatabase, NodePgTransaction } from 'drizzle-orm/node-postgres'
import { TablesRelationalConfig } from 'drizzle-orm'
import db from '@/lib/db'

class WalletRepository extends Repository<Wallet> {
  constructor(
    db:
      | NodePgDatabase
      | NodePgTransaction<Record<string, unknown>, TablesRelationalConfig>,
  ) {
    super(db, wallet)
  }
}

export default WalletRepository
