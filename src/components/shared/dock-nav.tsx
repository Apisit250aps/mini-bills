'use client'
import React from 'react'
import { Dock } from '../ui/dock'
import DockItem from './dock-item'
import Link from 'next/link'
import { IconCashPlus, IconUser } from '@tabler/icons-react'

export default function DockNavigate({ ...props }) {
  return (
    <Dock {...props} iconDistance={180}>
      <DockItem label="Item 1">
        <Link href="/">
          <IconCashPlus />
        </Link>
      </DockItem>
      <DockItem label="Profile">
        <Link href="/me">
          <IconUser />
        </Link>
      </DockItem>
    </Dock>
  )
}
