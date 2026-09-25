import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_COOKIE, verifyAdminToken } from '@/lib/admin-session'

// Protege el generador de audio interno. `/studio/audio-gen` pide Basic Auth
// y, al validar, emite una cookie firmada que es lo único que aceptan las APIs
// `/api/audio/*` (antes estaban abiertas: cualquiera podía gastar OpenAI TTS y
// escribir en Sanity). Sin credenciales en el entorno, todo queda cerrado.

const COOKIE = 'nitro_audio_gen'
const SESSION_SECONDS = 12 * 60 * 60

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

async function sign(value: string, key: string) {
  const cryptoKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(value))
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function credentials() {
  const user = process.env.AUDIO_GEN_USER
  const password = process.env.AUDIO_GEN_PASSWORD
  return user && password ? { user, password } : null
}

async function validSession(req: NextRequest, password: string) {
  const [issuedAt, signature] = (req.cookies.get(COOKIE)?.value ?? '').split('.')
  const age = Date.now() / 1000 - Number(issuedAt)
  if (!issuedAt || !signature || !(age >= 0 && age < SESSION_SECONDS)) return false
  return safeEqual(signature, await sign(`audio-gen:${issuedAt}`, password))
}

// Panel /admin (CRM): sesión firmada de `src/lib/admin-session.ts`. Quedan
// fuera el login y el lanzador estático de la app instalable, que el navegador
// pide sin cookies al instalarla.
async function adminGate(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === '/admin/login' || pathname === '/admin/launch.html') return NextResponse.next()
  if (await verifyAdminToken(req.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.next()
  if (pathname.startsWith('/api/')) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const login = new URL('/admin/login', req.url)
  if (pathname !== '/admin') login.searchParams.set('from', pathname)
  return NextResponse.redirect(login)
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/api/admin/crm')) {
    return adminGate(req)
  }

  const creds = credentials()
  const isApi = req.nextUrl.pathname.startsWith('/api/audio')

  if (!creds) {
    console.error('AUDIO_GEN_USER y AUDIO_GEN_PASSWORD no están configuradas; acceso cerrado.')
    return isApi
      ? NextResponse.json({ error: 'Herramienta no configurada.' }, { status: 503 })
      : new NextResponse('Herramienta no configurada.', { status: 503 })
  }

  if (isApi) {
    if (await validSession(req, creds.password)) return NextResponse.next()
    return NextResponse.json({ error: 'Inicia sesión en /studio/audio-gen.' }, { status: 401 })
  }

  const basicAuth = req.headers.get('authorization')
  if (basicAuth?.startsWith('Basic ')) {
    let user = ''
    let pwd = ''
    try {
      const decoded = atob(basicAuth.slice(6))
      const separator = decoded.indexOf(':')
      user = decoded.slice(0, separator)
      pwd = decoded.slice(separator + 1)
    } catch {
      // Cabecera mal formada: se trata como credenciales inválidas.
    }

    if (safeEqual(user, creds.user) && safeEqual(pwd, creds.password)) {
      const issuedAt = String(Math.floor(Date.now() / 1000))
      const response = NextResponse.next()
      response.cookies.set(COOKIE, `${issuedAt}.${await sign(`audio-gen:${issuedAt}`, creds.password)}`, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/api/audio',
        maxAge: SESSION_SECONDS,
      })
      return response
    }
  }

  return new NextResponse('Auth Required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Audio Gen Area"' },
  })
}

export const config = {
  matcher: ['/studio/audio-gen/:path*', '/api/audio/:path*', '/admin', '/admin/:path*', '/api/admin/crm/:path*'],
}
