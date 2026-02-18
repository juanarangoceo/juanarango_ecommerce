import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret to validate webhook requests from Sanity
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    // Validate the webhook secret
    if (WEBHOOK_SECRET) {
      const authHeader = request.headers.get('authorization')
      if (authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }
    }

    // Parse the Sanity webhook body
    const body = await request.json().catch(() => ({}))
    const { _type, slug } = body

    let revalidatedPaths: string[] = []

    switch (_type) {
      case 'appTool':
        // Revalidate the listing page
        revalidatePath('/app-tools')
        revalidatedPaths.push('/app-tools')
        // Revalidate the specific detail page if slug exists
        if (slug?.current) {
          revalidatePath(`/app-tools/${slug.current}`)
          revalidatedPaths.push(`/app-tools/${slug.current}`)
        }
        // Revalidate sitemap
        revalidatePath('/sitemap.xml')
        revalidatedPaths.push('/sitemap.xml')
        break

      case 'post':
        // Revalidate blog pages
        revalidatePath('/blog')
        revalidatedPaths.push('/blog')
        if (slug?.current) {
          revalidatePath(`/blog/${slug.current}`)
          revalidatedPaths.push(`/blog/${slug.current}`)
        }
        revalidatePath('/sitemap.xml')
        revalidatedPaths.push('/sitemap.xml')
        break

      default:
        // Fallback: revalidate all app-tools pages
        revalidatePath('/app-tools')
        revalidatedPaths.push('/app-tools')
        break
    }

    return NextResponse.json({
      revalidated: true,
      paths: revalidatedPaths,
      type: _type || 'unknown',
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    return NextResponse.json(
      {
        revalidated: false,
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
