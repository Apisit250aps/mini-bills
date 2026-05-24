import { Context, Next } from 'hono'
import { z, ZodType } from 'zod'
import { ContentfulStatusCode } from 'hono/utils/http-status'
import { ApiResponse, ValidationError } from './error'
import { User } from 'next-auth'

export type RequestSchema = {
  body?: ZodType
  query?: ZodType
  params?: ZodType
  responseBody?: ZodType
}

export type InferVariables<S extends RequestSchema> = {
  body: S['body'] extends ZodType ? z.infer<S['body']> : never
  query: S['query'] extends ZodType ? z.infer<S['query']> : never
  params: S['params'] extends ZodType ? z.infer<S['params']> : never
  user?: User
}

export type InferEnv<S extends RequestSchema> = {
  Variables: InferVariables<S>
}

export type HonoHandler<S extends RequestSchema> = (
  c: Context<InferEnv<S>>,
  next: Next,
) => Response | Promise<Response>

export function response<T>(
  c: Context,
  body: ApiResponse<T>,
  httpStatus: ContentfulStatusCode = 200,
) {
  return c.json<ApiResponse<T>>(body, httpStatus)
}

export function validator<S extends RequestSchema>(
  schema: S,
  handler: HonoHandler<S>,
): (c: Context, next: Next) => Promise<Response | void> {
  return async (c: Context, next: Next) => {
    if (schema.body) {
      const body = await c.req.json().catch(() => undefined)
      const result = schema.body.safeParse(body)
      if (!result.success) {
        throw new ValidationError('Invalid request body')
      }
      c.set('body', result.data)
    }

    if (schema.query) {
      const result = schema.query.safeParse(c.req.query())
      if (!result.success) {
        throw new ValidationError('Invalid query parameters')
      }
      const queryData = result.data as Record<string, unknown>
      const page = Number(queryData.page)
      const limit = Number(queryData.limit)
      c.set('query', {
        ...queryData,
        take: limit,
        skip: (page - 1) * limit,
      })
    }

    if (schema.params) {
      const result = schema.params.safeParse(c.req.param())
      if (!result.success) {
        throw new ValidationError('Invalid path parameters')
      }
      c.set('params', result.data)
    }

    return handler(c as Context<InferEnv<S>>, next)
  }
}
