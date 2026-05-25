'use client'

import { Wallet } from '@/core/domain/wallet'
import { createContext, useContext, useMemo, useState } from 'react'
import {
  useWalletQuery,
  useWalletTransactionsQuery,
} from './queries/wallet.query'
import { Transaction } from '@/core/domain/transaction'
type WalletContextState = {
  wallet: Wallet | null
  transactions: Transaction[]
}

const walletContext = createContext<WalletContextState | null>(null)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const walletQuery = useWalletQuery()

  const wallet = useMemo(() => {
    if (walletQuery.isSuccess) {
      return walletQuery.data?.[0] ?? null
    }
    return null
  }, [walletQuery.data, walletQuery.isSuccess])

  const transactionsQuery = useWalletTransactionsQuery(wallet?.id ?? '')

  const transactions = useMemo(() => {
    if (transactionsQuery.isSuccess) {
      return transactionsQuery.data ?? []
    }
    return []
  }, [transactionsQuery.data, transactionsQuery.isSuccess])

  return (
    <walletContext.Provider value={{ wallet, transactions }}>
      {children}
    </walletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(walletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
