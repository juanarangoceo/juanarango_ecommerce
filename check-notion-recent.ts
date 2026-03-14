import { config } from 'dotenv'

config({ path: '.env.local' })

async function checkNotionForEmail(label: string, token: string, dbId: string, email: string) {
  console.log(`\n=== Buscando "${email}" en ${label} ===`)
  const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sorts: [{ timestamp: 'created_time', direction: 'descending' }],
      page_size: 5
    })
  })
  const data = await res.json() as any
  if (!res.ok) {
    console.error('Error:', data)
    return
  }
  console.log(`Últimas ${data.results.length} entradas:`)
  data.results.forEach((r: any) => {
    const nameTitle = r.properties?.Name?.title?.[0]?.plain_text || '(sin nombre)'
    const emailProp = r.properties?.Email?.email || '(sin email)'
    console.log(`  • ${emailProp} | Nombre: ${nameTitle} | created: ${r.created_time}`)
  })
}

async function main() {
  await checkNotionForEmail(
    'SUBSCRIBERS DB',
    process.env.NOTION_SECRET!,
    process.env.NOTION_SUBSCRIBERS_DB_ID!,
    'debug_vercel_test@example.com'
  )
  await checkNotionForEmail(
    'AUTH USERS DB',
    process.env.NOTION_AUTH_SECRET!,
    process.env.NOTION_AUTH_DB_ID!,
    'debug_vercel_test@example.com'
  )
}

main()
