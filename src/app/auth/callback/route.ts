import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { after } from 'next/server'

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
         after(async () => {
           try {
             // Importación dinámica para aligerar la carga principal
             const { Client } = await import('@notionhq/client')
             const notionAuth = new Client({ auth: process.env.NOTION_AUTH_SECRET });
             const authDatabaseId = process.env.NOTION_AUTH_DB_ID!;
             const userEmail = user.email!;

             // Check if exists para no duplicar en logueos recurrentes
             // @ts-ignore: Tipado temporalmente desactualizado en la versión utilizada
             const existing = await notionAuth.databases.query({
               database_id: authDatabaseId,
               filter: {
                 property: "Email",
                 email: {
                   equals: userEmail
                 }
               }
             });

             if (existing.results.length === 0) {
               await notionAuth.pages.create({
                 parent: { database_id: authDatabaseId },
                 properties: {
                   "Name": { title: [{ text: { content: userEmail } }] },
                   "Email": { email: userEmail },
                   "Fecha de registro": { date: { start: new Date(user.created_at).toISOString() } }
                 }
               });
               console.log(`Usuario autenticado sincronizado a Notion: ${userEmail}`);
             }
           } catch(err) {
              console.error("Error sincronizando a Notion en auth callback:", err)
           }
         })
       }
       return response
    }
  }

  // Auth error fallback
  return NextResponse.redirect(`${origin}/blog/prompts?auth_error=true`)
}
