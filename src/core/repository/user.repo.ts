import Repository from '@/lib/app/repository'
import { users } from '@/lib/db/schema'
import { TablesRelationalConfig } from 'drizzle-orm'
import { NodePgDatabase, NodePgTransaction } from 'drizzle-orm/node-postgres'

class UserRepository extends Repository<typeof users.$inferSelect> {
  constructor(
    db:
      | NodePgDatabase
      | NodePgTransaction<Record<string, unknown>, TablesRelationalConfig>,
  ) {
    super(db, users)
  }
}

export default UserRepository
