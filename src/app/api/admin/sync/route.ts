import { NextResponse } from 'next/server';
import { syncSanityPosts } from '@/app/actions/sync-posts';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await syncSanityPosts();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
