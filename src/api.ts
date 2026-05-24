import { Hono } from 'hono'

const api = new Hono().basePath('/api')

export default api
