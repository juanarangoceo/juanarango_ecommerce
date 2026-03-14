import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'


// Supabase Auth Magic Link callback — receives code, exchanges for session, redirects
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/blog/prompts'

  if (code) {
    const response = NextResponse.redirect(`${origin}${next}`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
       const user = data.user
       if (user?.email && process.env.NOTION_AUTH_SECRET && process.env.NOTION_AUTH_DB_ID) {
         try {
           const authToken = process.env.NOTION_AUTH_SECRET?.trim();
           const authDbId = process.env.NOTION_AUTH_DB_ID?.trim();
           const userEmail = user.email!;

           if (!authToken || !authDbId) {
             console.warn("⚠️ Faltan credenciales de Notion Auth");
           } else {
             // Check for duplicates primero
             const checkRes = await fetch(`https://api.notion.com/v1/databases/${authDbId}/query`, {
               method: 'POST',
               headers: {
                 'Authorization': `Bearer ${authToken}`,
                 'Notion-Version': '2022-06-28',
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                 filter: {
                   property: "Email",
                   email: { equals: userEmail }
                 }
               })
             });
             const checkData = await checkRes.json() as any;

             if (checkData.results?.length === 0) {
               const insertRes = await fetch('https://api.notion.com/v1/pages', {
                 method: 'POST',
                 headers: {
                   'Authorization': `Bearer ${authToken}`,
                   'Notion-Version': '2022-06-28',
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                   parent: { database_id: authDbId },
                   properties: {
                     "Name": { title: [{ text: { content: userEmail } }] },
                     "Email": { email: userEmail },
                     "Fecha de registro": { date: { start: new Date(user.created_at).toISOString() } }
                   }
                 })
               });
               if (insertRes.ok) {
                 console.log(`✅ Usuario sincronizado a Notion: ${userEmail}`);
               } else {
                 const errBody = await insertRes.json();
                 console.error("❌ Notion Auth Insert Error:", errBody);
               }
             } else {
               console.log(`ℹ️ Usuario ya existe en Notion: ${userEmail}`);
             }
           }
         } catch(err: any) {
            console.error("❌ Error sincronizando a Notion en auth callback:", err?.message || err)
         }
       }
       return response
    }
  }

  // Auth error fallback
  return NextResponse.redirect(`${origin}/blog/prompts?auth_error=true`)
}

