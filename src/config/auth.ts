import { walletRepository } from '@/core/repository'
import { CreateWalletUseCase } from '@/core/application/wallet.usecase'
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
  events: {
    createUser: async ({ user }) => {
      const wallet = new CreateWalletUseCase(walletRepository)
      await wallet.execute({
        userId: user.id!,
        title: 'My Wallet',
        description: 'This is my default wallet',
      })
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
  },
} satisfies NextAuthConfig

export default authConfig
