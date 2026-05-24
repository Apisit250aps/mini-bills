import { walletRepository } from '@/core/repository'
import { CreateWalletUseCase } from '@/core/usecase/wallet.usecase'
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
} satisfies NextAuthConfig

export default authConfig
