import { Context } from 'hono'
import { ApiResponse } from './error';

export function success<T>(c: Context, message: string, data?: T): Response {
  return c.json<ApiResponse<T>>(
    {
      success: true,
      message,
      data,
    },
    200,
  )
}

// created response with data
export function created<T>(c: Context, message: string, data?: T): Response {
  return c.json<ApiResponse<T>>(
    {
      success: true,
      message,
      data,
    },
    201,
  )
}

// error response
export function error(c: Context, message: string): Response {
  return c.json<ApiResponse<never>>(
    {
      success: false,
      message,
      error: 'INTERNAL_SERVER_ERROR',
    },
    500,
  )
}

// bad request response
export function badRequest(c: Context, message: string): Response {
  return c.json<ApiResponse<never>>(
    {
      success: false,
      message,
      error: 'INVALID_DATA',
    },
    400,
  )
}

// not found response
export function notFound(c: Context, message: string): Response {
  return c.json<ApiResponse<never>>(
    {
      success: false,
      message,
      error: 'NOT_FOUND',
    },
    404,
  )
}

// unauthorized response
export function unauthorized(c: Context, message: string): Response {
  return c.json<ApiResponse<never>>(
    {
      success: false,
      message,
      error: 'UNAUTHORIZED',
    },
    401,
  )
}

// forbidden response
export function forbidden(c: Context, message: string): Response {
  return c.json<ApiResponse<never>>(
    {
      success: false,
      message,
      error: 'FORBIDDEN',
    },
    403,
  )
}
