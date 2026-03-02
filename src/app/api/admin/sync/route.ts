import { NextResponse } from 'next/server';
import { syncSanityPosts } from '@/app/actions/sync-posts';
import { requireInternalAuth } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authError = requireInternalAuth(request);
  if (authError) return authError;

  try {
    const result = await syncSanityPosts();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
