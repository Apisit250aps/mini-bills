import React from 'react'
import Image from 'next/image'
import { User } from '@/core/domain/user'

export default function UserProfile({ me }: { me: User }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold text-center">Profile</h1>
      <div className="flex flex-col justify-center gap-2">
        <div className="relative">
          <Image
            src={me.data?.image || '/default-avatar.png'}
            alt="Profile Picture"
            width={96}
            height={96}
            className="rounded-full"
            loading="eager"
          />
        </div>
      </div>
      <p className="text-lg font-medium text-center">{me.data?.name}</p>
      <p className="text-sm text-center text-gray-500">{me.data?.email}</p>
    </div>
  )
}
