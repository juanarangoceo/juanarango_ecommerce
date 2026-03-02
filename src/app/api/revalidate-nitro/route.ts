import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { requireInternalAuth } from '@/lib/api-auth'

export async function POST(request: NextRequest) {
  const authError = requireInternalAuth(request);
  if (authError) return authError;

  try {
    // Revalidate the Nitro Commerce page
    revalidatePath('/soluciones/nitro-commerce')
    
    return NextResponse.json({ 
      revalidated: true, 
      message: 'Nitro Commerce page revalidated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    return NextResponse.json({ 
      revalidated: false, 
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return POST(request)
}
