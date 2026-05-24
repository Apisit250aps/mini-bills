import { eq, TablesRelationalConfig } from 'drizzle-orm'
import { NodePgDatabase, NodePgTransaction } from 'drizzle-orm/node-postgres'
import { PgColumn, PgTable } from 'drizzle-orm/pg-core'

export default abstract class Repository<T> {
  constructor(
    protected readonly db:
      | NodePgDatabase
      | NodePgTransaction<Record<string, unknown>, TablesRelationalConfig>,
    protected readonly model: PgTable,
  ) {}

  async findAll(): Promise<T[]> {
    const data = await this.db.select().from(this.model)
    return data as T[]
  }

  async findById(id: number): Promise<T | null> {
    const model = this.model as PgTable & { id: PgColumn }
    const data = await this.db.select().from(this.model).where(eq(model.id, id))
    return (data[0] as T) || null
  }

  async create(item: Partial<T>): Promise<T> {
    const data = await this.db.insert(this.model).values(item).returning()
    return data[0] as T
  }

  async update(id: number, item: Partial<T>): Promise<T> {
    const model = this.model as PgTable & { id: PgColumn }
    const data = await this.db
      .update(this.model)
      .set(item)
      .where(eq(model.id, id))
      .returning()
    return data[0] as T
  }

  async delete(id: number): Promise<void> {
    const model = this.model as PgTable & { id: PgColumn }
    await this.db.delete(this.model).where(eq(model.id, id))
  }
}
