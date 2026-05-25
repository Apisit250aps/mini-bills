import { user } from '@/lib/db/schema'

export type User = typeof user.$inferSelect
export type CreateUserInput = typeof user.$inferInsert
export type UpdateUserInput = Partial<CreateUserInput>