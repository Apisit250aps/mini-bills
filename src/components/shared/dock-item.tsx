'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DockIcon } from '@/components/ui/dock'

function DockItem({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <DockIcon>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </DockIcon>
  )
}

export default DockItem
