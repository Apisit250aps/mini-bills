import db from '@/lib/db'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'

const authConfig = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  providers: [Google],
} satisfies NextAuthConfig

export default authConfig
