import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { requireInternalAuth } from '@/lib/api-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const secret = process.env.SANITY_WEBHOOK_SECRET
    if (!secret) {
      console.error('❌ SANITY_WEBHOOK_SECRET is not configured. Denying webhook.')
      return NextResponse.json({ message: 'Webhook not configured' }, { status: 500 })
    }
    const auth = request.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    let body: Record<string, unknown> = {}
    try {
      body = await request.json()
    } catch {
      // If body parsing fails, still revalidate
    }

    const docType = body?._type as string | undefined
    const slug = (body?.slug as { current?: string })?.current

    const revalidated: string[] = []

    // Revalidate app-tools listing
    revalidatePath('/app-tools', 'page')
    revalidated.push('/app-tools')

    if (docType === 'appTool' && slug) {
      revalidatePath(`/app-tools/${slug}`, 'page')
      revalidated.push(`/app-tools/${slug}`)
    }

    if (docType === 'post') {
      revalidatePath('/blog', 'page')
      revalidated.push('/blog')
      if (slug) {
        revalidatePath(`/blog/${slug}`, 'page')
        revalidated.push(`/blog/${slug}`)
      }
    }

    revalidatePath('/sitemap.xml', 'page')
    revalidated.push('/sitemap.xml')

    return NextResponse.json({
      revalidated: true,
      paths: revalidated,
      type: docType || 'unknown',
      now: Date.now(),
    })
  } catch (err) {
    return NextResponse.json(
      { revalidated: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const authError = requireInternalAuth(request);
  if (authError) return authError;

  revalidatePath('/app-tools', 'page')
  revalidatePath('/sitemap.xml', 'page')
  return NextResponse.json({
    revalidated: true,
    paths: ['/app-tools', '/sitemap.xml'],
    now: Date.now(),
  })
}
