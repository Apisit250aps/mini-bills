import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export const proxy = auth((req) => {
  const pathname = req.nextUrl.pathname
  const auth = req.auth

  if (['/me', '/'].includes(pathname)) {
    if (!auth) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
  }
  if (pathname === '/login') {
    if (auth) {
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }

  return NextResponse.next()
})

// Optionally, don't invoke Proxy on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
