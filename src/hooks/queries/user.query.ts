import { User } from '@/core/domain/user'
import { ApiResponse } from '@/lib/app/error'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useUserQuery = () => {
  const me = useQuery<User>({
    queryKey: ['USER', 'ME'],
    queryFn: async () => {
      const response = await axios<ApiResponse<User>>({
        method: 'GET',
        url: '/api/me',
      })
      return response.data.data
    },
  })
  return { me }
}

const useUserMutation = () => {
  const update = useMutation({
    mutationKey: ['USER', 'UPDATE'],
    mutationFn: async (input: { name: string }) => {
      const response = await axios<ApiResponse<User>>({
        method: 'POST',
        url: '/api/users',
        data: input,
      })
      return response.data.data
    },
  })
  return { update }
}

export { useUserQuery, useUserMutation }
