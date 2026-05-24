import Repository from '@/lib/app/repository'
import { Transaction } from '../domain/transaction'
import { transaction } from '@/lib/db/schema'
import { TablesRelationalConfig } from 'drizzle-orm'
import { NodePgDatabase, NodePgTransaction } from 'drizzle-orm/node-postgres'

class TransactionRepository extends Repository<Transaction> {
  constructor(
    db:
      | NodePgDatabase
      | NodePgTransaction<Record<string, unknown>, TablesRelationalConfig>,
  ) {
    super(db, transaction)
  }
}

export default TransactionRepository
