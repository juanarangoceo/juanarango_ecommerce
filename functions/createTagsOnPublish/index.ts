// Función que se ejecuta cuando se PUBLICA un post
// Crea documentos 'tag' publicados en Sanity para cada etiqueta del post

export async function handler({ context, event }: any) {
  const doc = event.data

  // Solo ejecutar en posts con tags
  if (doc._type !== 'post') return
  if (!doc.tags || !Array.isArray(doc.tags) || doc.tags.length === 0) {
    console.log('ℹ️ Post sin tags, nada que crear.')
    return
  }

  const { projectId, dataset, token } = context.clientOptions as {
    projectId: string
    dataset: string
    token: string
  }

  const SANITY_API = `https://${projectId}.api.sanity.io/v2024-03-01/data`
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const sanitizeSlug = (text: string) =>
    text.toString().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 96)

  const tagsToCreate = doc.tags.filter((t: any) => typeof t === 'string' && t.trim().length > 0)
  console.log(`🏷️ Creando ${tagsToCreate.length} etiqueta(s) para el post "${doc.title}"...`)
  console.log(`📋 Tags: ${JSON.stringify(tagsToCreate)}`)
  console.log(`🔗 API: ${SANITY_API}/mutate/${dataset}`)

  // Batch: crear todas las mutaciones en una sola llamada
  const mutations: any[] = []

  for (const tagName of tagsToCreate) {
    const cleanName = tagName.trim()
    const tagSlug = sanitizeSlug(cleanName)
    if (!tagSlug) continue

    // ID sin prefijo drafts. para que se cree PUBLICADO
    const tagId = `tag-${tagSlug}`

    mutations.push({
      createIfNotExists: {
        _id: tagId,
        _type: 'tag',
        name: cleanName,
        slug: { _type: 'slug', current: tagSlug }
      }
    })

    console.log(`  → Preparando etiqueta: "${cleanName}" → id: ${tagId}, slug: ${tagSlug}`)
  }

  if (mutations.length === 0) {
    console.log('⚠️ Ninguna mutación para ejecutar.')
    return
  }

  try {
    const body = JSON.stringify({ mutations })
    console.log(`📤 Enviando ${mutations.length} mutaciones a Sanity...`)

    const res = await fetch(`${SANITY_API}/mutate/${dataset}?returnDocuments=true`, {
      method: 'POST',
      headers,
      body
    })

    const responseText = await res.text()
    console.log(`📥 Status: ${res.status}`)
    console.log(`📥 Response: ${responseText.slice(0, 500)}`)

    if (!res.ok) {
      console.error(`❌ Error en mutaciones: ${res.status} ${responseText}`)
    } else {
      console.log(`✅ Todas las etiquetas creadas/verificadas exitosamente.`)
    }
  } catch (err: any) {
    console.error(`❌ Error de red:`, err.message)
  }

  console.log('🏁 Proceso de creación de etiquetas finalizado.')
}
