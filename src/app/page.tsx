'use client'

import PageLayout from '@/components/layout/page-layout'
import { Transaction } from '@/core/domain/transaction'
import { useWallet } from '@/hooks/wallet-provider'

const groupTransactionsByMonth = (data: Transaction[]) => {
  return data.reduce(
    (acc, current) => {
      const date = new Date(current.createdAt)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const monthKey = `${year}-${month}`

      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthKey,
          list: [],
          totalIncome: 0,
          totalExpense: 0,
        }
      }

      acc[monthKey].list.push(current)

      if (current.type === 'income') {
        acc[monthKey].totalIncome += current.amount
      } else if (current.type === 'expense') {
        acc[monthKey].totalExpense += current.amount
      }

      return acc
    },
    {} as Record<
      string,
      {
        month: string
        list: Transaction[]
        totalIncome: number
        totalExpense: number
      }
    >,
  )
}

import { TrendingDown, TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartConfig = {
  income: {
    label: 'รายรับ',
    color: 'var(--primary)',
  },
  expense: {
    label: 'รายจ่าย',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export default function Home() {
  const { wallet, transactions } = useWallet()

  const { totalIncome, totalExpense } = transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'income') acc.totalIncome += curr.amount
      else acc.totalExpense += curr.amount
      return acc
    },
    { totalIncome: 0, totalExpense: 0 },
  )
  const balance = totalIncome - totalExpense

  const groupedData = groupTransactionsByMonth(transactions)
  const chartData = Object.values(groupedData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(({ month, totalIncome, totalExpense }) => ({
      month,
      income: totalIncome,
      expense: totalExpense,
    }))

  const fmt = (n: number) =>
    n.toLocaleString('th-TH', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    })

  return (
    <PageLayout>
      <div className="flex flex-col gap-6 p-4">
        {/* Header */}
        <div>
          <p className="text-sm text-muted-foreground">กระเป๋าเงิน</p>
          <h1 className="text-3xl font-bold tracking-tight">{wallet?.title}</h1>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">ยอดคงเหลือ</p>
            <p
              className={`text-lg font-bold ${balance >= 0 ? 'text-foreground' : 'text-destructive'}`}
            >
              {fmt(balance)}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">รายรับ</p>
            <p className="text-lg font-bold text-primary">
              {fmt(totalIncome)}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">รายจ่าย</p>
            <p className="text-lg font-bold text-orange-400">
              {fmt(totalExpense)}
            </p>
          </div>
        </div>
        {/* Chart */}
        <div>
          <div className="mb-2">
            <p className="font-semibold">รายรับ / รายจ่าย รายเดือน</p>
            <p className="text-sm text-muted-foreground">
              {chartData.length > 0
                ? `${chartData[0].month} – ${chartData[chartData.length - 1].month}`
                : 'ไม่มีข้อมูล'}
            </p>
          </div>
          <div className="pb-2">
            <ChartContainer config={chartConfig} className="h-60 w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
              </BarChart>
            </ChartContainer>
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
                          t.type === 'income'
                            ? 'text-primary'
                            : 'text-orange-500'
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
        </div>
      </div>
    </PageLayout>
  )
}
