import { Transaction } from '@/core/domain/transaction'
import { Wallet } from '@/core/domain/wallet'
import { ApiResponse } from '@/lib/app/error'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useWalletQuery = () => {
  return useQuery<Wallet[]>({
    queryKey: ['WALLET', 'LIST'],
    queryFn: async ({ signal }) => {
      const res = await axios.get<ApiResponse<Wallet[]>>('/api/wallets', {
        signal,
      })
      return res.data.data || []
    },
  })
}

export const useWalletTransactionsQuery = (walletId: string) => {
  return useQuery<Transaction[]>({
    queryKey: ['WALLET', walletId, 'TRANSACTIONS'],
    queryFn: async ({ signal }) => {
      const res = await axios({
        method: 'GET',
        url: '/api/transactions',
        params: { walletId },
        signal,
      })
      return res.data.data || []
    },
    enabled: !!walletId,
  })
}

export const useTransactionMutation = () => {
  const create = useMutation({
    mutationKey: ['TRANSACTION', 'CREATE'],
    mutationFn: async (input: {
      walletId: string
      title: string
      amount: number
      description?: string
      category?: string
      type: 'income' | 'expense'
    }) => {
      const res = await axios({
        method: 'POST',
        url: '/api/transactions',
        data: input,
      })
      return res.data.data
    },
  })
  return { create }
}
