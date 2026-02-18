import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    // Optional: validate webhook secret
    const secret = process.env.SANITY_WEBHOOK_SECRET
    if (secret) {
      const auth = request.headers.get('authorization')
      if (auth !== `Bearer ${secret}`) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }
    }

    // Parse body — Sanity sends the projected fields directly
    let body: Record<string, unknown> = {}
    try {
      body = await request.json()
    } catch {
      // If body parsing fails, still revalidate app-tools
    }

    const docType = body?._type as string | undefined
    const slug = (body?.slug as { current?: string })?.current

    const revalidated: string[] = []

    // Always revalidate app-tools listing via Path and Tag
    revalidatePath('/app-tools', 'page')
    revalidateTag('app-tools')
    revalidated.push('/app-tools')
    revalidated.push('tag:app-tools')

    if (docType === 'appTool' && slug) {
      revalidatePath(`/app-tools/${slug}`, 'page')
      revalidated.push(`/app-tools/${slug}`)
      // If we had detail page tagged, we would revalidateTag(`app-tool:${slug}`)
    }

    if (docType === 'post') {
      revalidatePath('/blog', 'page')
      revalidated.push('/blog')
      if (slug) {
        revalidatePath(`/blog/${slug}`, 'page')
        revalidated.push(`/blog/${slug}`)
      }
    }

    // Revalidate sitemap
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

// Also support GET for easy manual testing
export async function GET() {
  revalidatePath('/app-tools', 'page')
  revalidateTag('app-tools')
  revalidatePath('/sitemap.xml', 'page')
  return NextResponse.json({ 
    revalidated: true, 
    paths: ['/app-tools', 'tag:app-tools'], 
    now: Date.now() 
  })
}
