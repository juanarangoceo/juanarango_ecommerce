import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Only protect /studio/audio-gen route
  if (!req.nextUrl.pathname.startsWith('/studio/audio-gen')) {
    return NextResponse.next()
  }

  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    const validUser = process.env.AUDIO_GEN_USER || 'admin'
    const validPass = process.env.AUDIO_GEN_PASSWORD || 'admin'

    if (user === validUser && pwd === validPass) {
      return NextResponse.next()
    }
  }

  url.pathname = '/api/auth'
  
  return new NextResponse('Auth Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Audio Gen Area"',
    },
  })
}

export const config = {
  matcher: '/studio/audio-gen/:path*',
}
