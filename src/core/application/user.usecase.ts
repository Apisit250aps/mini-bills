import UseCase from '@/lib/app/usecase'

import { CreateUserInput, User } from '../domain/user'
import UserRepository from '../repository/user.repo'
import { AppError, InternalError, NotFoundError } from '@/lib/app/error'

export class CreateUserUseCase extends UseCase<CreateUserInput, User> {
  constructor(private userRepository: UserRepository) {
    super()
  }

  execute(input: CreateUserInput): Promise<User> {
    return this.userRepository.create(input)
  }
}

export class GetMeUseCase extends UseCase<string, User> {
  constructor(private userRepository: UserRepository) {
    super()
  }

  execute(userId: string): Promise<User> {
    try {
      const user = this.userRepository.findById(userId)
      if (!user) {
        throw new NotFoundError('User not found')
      }
      return user
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new InternalError('Failed to get user')
    }
  }
}
