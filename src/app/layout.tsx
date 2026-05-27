import type { Metadata } from 'next'
import { Itim } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { cn } from '@/lib/utils'
import { TooltipProvider } from '@/components/ui/tooltip'
import ClientProvider from '@/hooks/client-provider'

const itim = Itim({
  weight: '400',
  subsets: ['latin', 'thai'],
  variable: '--font-itim',
})

export const metadata: Metadata = {
  title: 'Mini Wallet',
  description:
    'A simple wallet app built with Next.js and TypeScript. drizzle is a simple wallet app built with Next.js and TypeScript.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="en" className={cn('h-full', 'antialiased', itim.variable)}>
      <body className="min-h-full flex flex-col">
        <ClientProvider>
          <SessionProvider
            session={session}
            refetchInterval={0}
            refetchOnWindowFocus={false}
          >
            <TooltipProvider>{children}</TooltipProvider>
          </SessionProvider>
        </ClientProvider>
      </body>
    </html>
  )
}
