'use client'
import PageLayout from '@/components/layout/page-layout'
import { useUserQuery } from '@/hooks/queries/user.query'
import UserProfile from '@/components/app/user-profile'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useWallet } from '@/hooks/wallet-provider'

export default function Page() {
  const { me } = useUserQuery()
  const { transactions } = useWallet()
  const fmt = (n: number) =>
    n.toLocaleString('th-TH', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    })
  return (
    <PageLayout>
      <UserProfile me={me} />
      <div className="px-8">
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            ยังไม่มีรายการ
          </p>
        ) : (
          <ul className="">
            {[...transactions]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .slice(0, 10)
              .map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${
                        t.type === 'income' ? 'bg-primary' : 'bg-orange-400'
                      }`}
                    >
                      {t.type === 'income' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {t.title ??
                          (t.type === 'income' ? 'รายรับ' : 'รายจ่าย')}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(t.createdAt).toLocaleDateString('th-TH', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      t.type === 'income' ? 'text-primary' : 'text-orange-500'
                    }`}
                  >
                    {t.type === 'income' ? '+' : '-'}
                    {fmt(t.amount)}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </PageLayout>
  )
}
