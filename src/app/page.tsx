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

import { TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartConfig = {
  income: {
    label: 'รายรับ',
    color: 'var(--chart-1)',
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ยอดคงเหลือ
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p
                className={`text-2xl font-bold ${balance >= 0 ? 'text-foreground' : 'text-destructive'}`}
              >
                {fmt(balance)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                ยอดสุทธิทั้งหมด
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                รายรับทั้งหมด
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-lime-400" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-lime-400">
                {fmt(totalIncome)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {transactions.filter((t) => t.type === 'income').length} รายการ
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                รายจ่ายทั้งหมด
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-rose-400" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-rose-400">
                {fmt(totalExpense)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {transactions.filter((t) => t.type === 'expense').length} รายการ
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>รายรับ / รายจ่าย รายเดือน</CardTitle>
            <CardDescription>
              {chartData.length > 0
                ? `${chartData[0].month} – ${chartData[chartData.length - 1].month}`
                : 'ไม่มีข้อมูล'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
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
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
