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
import { IconUser, IconWallet, IconLogout, IconMenu } from '@tabler/icons-react'

export default function PageLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col pt-8 pb-28 px-4 md:px-4 bg-white dark:bg-black">
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size={'lg'}>
                <IconMenu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>
                    <IconUser />
                  </DropdownMenuShortcut>
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
                <DropdownMenuItem>
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
