'use client'

import { Wallet } from '@/core/domain/wallet'
import { createContext, useContext, useMemo, useState } from 'react'
import { useWalletQuery } from './queries/wallet.query';
type WalletContextState = {
  wallet: Wallet | null
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

  return (
    <walletContext.Provider value={{ wallet }}>
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
