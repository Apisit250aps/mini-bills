import { Wallet } from '@/core/domain/wallet'
import { ApiResponse } from '@/lib/app/error'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useWalletQuery = () => {
  return useQuery<Wallet[]>({
    queryKey: ['WALLET', 'USER', 'GET', 'GET_USER_WALLET'],
    queryFn: async ({ signal }) => {
      const res = await axios.get<ApiResponse<Wallet[]>>('/api/wallets', {
        signal,
      })
      return res.data.data || []
    },
  })
}
