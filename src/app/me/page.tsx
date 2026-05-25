'use client'
import PageLayout from '@/components/layout/page-layout'
import { useUserQuery } from '@/hooks/queries/user.query'
import UserProfile from '@/components/app/user-profile';

export default function Page() {
  const { me } = useUserQuery()
  return (
    <PageLayout>
      <UserProfile me={me} />
    </PageLayout>
  )
}
