'use client'

import PageLayout from '@/components/layout/page-layout'
import { useWallet } from '@/hooks/wallet-provider'

export default function Home() {
  const { wallet } = useWallet()
  return (
    <PageLayout>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{wallet?.title}</h1>
      </div>
    </PageLayout>
  )
}
