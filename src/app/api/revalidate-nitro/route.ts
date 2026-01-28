import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication here if needed
    // const authHeader = request.headers.get('authorization')
    // if (authHeader !== `Bearer ${process.env.REVALIDATION_SECRET}`) {
    //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    // }

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
