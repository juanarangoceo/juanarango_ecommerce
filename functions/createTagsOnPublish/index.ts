// Función que se ejecuta cuando se PUBLICA un post (documento sin drafts.*)
// Crea documentos 'tag' publicados en Sanity para cada etiqueta del post

export async function handler({ context, event }: any) {
  const doc = event.data

  // Solo ejecutar en posts publicados con tags
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

  for (const tagName of tagsToCreate) {
    const cleanName = tagName.trim()
    const tagSlug = sanitizeSlug(cleanName)
    if (!tagSlug) continue

    // Usamos un ID estable basado en el slug para evitar duplicados
    const tagId = `tag-${tagSlug}`

    try {
      const body = JSON.stringify({
        mutations: [{
          createIfNotExists: {
            _id: tagId,
            _type: 'tag',
            name: cleanName,
            slug: { _type: 'slug', current: tagSlug }
          }
        }]
      })

      const res = await fetch(`${SANITY_API}/mutate/${dataset}`, {
        method: 'POST',
        headers,
        body
      })

      if (res.ok) {
        console.log(`✅ Etiqueta lista: "${cleanName}" (${tagId})`)
      } else {
        const errText = await res.text()
        console.error(`❌ Error creando etiqueta "${cleanName}": ${res.status} ${errText}`)
      }
    } catch (err: any) {
      console.error(`❌ Error creando etiqueta "${cleanName}":`, err.message)
    }
  }

  console.log('✅ Proceso de creación de etiquetas finalizado.')
}
