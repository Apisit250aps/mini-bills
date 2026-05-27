'use client'
import NiceModal from '@ebay/nice-modal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { WalletProvider } from './wallet-provider'
const queryClient = new QueryClient()

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <NiceModal.Provider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </NiceModal.Provider>
      </WalletProvider>
    </QueryClientProvider>
  )
}
