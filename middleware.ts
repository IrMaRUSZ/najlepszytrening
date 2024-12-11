// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Pobierz aktualny URL
  const url = request.nextUrl.clone()
  
  // Jeśli URL nie zaczyna się od www
  if (!request.headers.get('host')?.startsWith('www.')) {
    url.host = 'www.' + request.headers.get('host')
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}