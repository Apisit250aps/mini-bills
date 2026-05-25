import DockNavigate from '../shared/dock-nav'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  IconUser,
  IconWallet,
  IconLogout,
  IconMenu,
  IconChevronCompactLeft,
} from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'

export default function PageLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  const pathname = usePathname()
  const Logout = useCallback(async () => {
    await signOut({
      callbackUrl: '/login',
    })
  }, [])
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col pt-8 pb-28 px-4 md:px-4 bg-white dark:bg-black">
        <div className="flex justify-between items-center mb-8">
          {pathname !== '/' && (
            <Button className="text-white" asChild>
              <Link href="/">
                <IconChevronCompactLeft stroke={2} />
              </Link>
            </Button>
          )}
          <div className=""></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size={'lg'}>
                <IconMenu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/me">
                    Profile
                    <DropdownMenuShortcut>
                      <IconUser />
                    </DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Wallet
                  <DropdownMenuShortcut>
                    <IconWallet />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={Logout}>
                  Log out
                  <DropdownMenuShortcut>
                    <IconLogout />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {children}
      </main>
      <DockNavigate
        direction="middle"
        iconSize={52}
        iconMagnification={72}
        className="absolute bottom-4 rounded-lg bg-white/80 backdrop-blur-sm dark:bg-black/80"
      />
    </div>
  )
}
