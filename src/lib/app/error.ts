import { ContentfulStatusCode } from 'hono/utils/http-status'
import { Context } from 'hono'

type AppErrorCode =
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'INTERNAL_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'

class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly code?: AppErrorCode,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation Error') {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

class InternalError extends AppError {
  constructor(message = 'Internal Server Error') {
    super(message, 500, 'INTERNAL_ERROR')
    this.name = 'InternalError'
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403, 'FORBIDDEN')
    this.name = 'ForbiddenError'
  }
}

type ApiResponse<T> = {
  message: string
  success: boolean
  data?: T
  error?: string
  code?: AppErrorCode
}

function onAppError(err: Error, ctx: Context) {
  if (err instanceof AppError) {
    return ctx.json(
      {
        success: false,
        message: err.message,
        error: err.message,
        code: err.code,
      },
      err.statusCode as ContentfulStatusCode,
    )
  }
  return ctx.json(
    {
      success: false,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
    },
    500,
  )
}

export {
  AppError,
  NotFoundError,
  ValidationError,
  InternalError,
  UnauthorizedError,
  ForbiddenError,
}

export { onAppError }

export type { AppErrorCode, ApiResponse }
