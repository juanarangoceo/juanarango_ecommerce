// Zero-dependency Sanity Function handler
// Uses only Node.js built-in fetch (Node 18+) to call Sanity REST API and Gemini API
// No external npm packages needed — avoids ERR_MODULE_NOT_FOUND in the Sanity cloud runtime

export async function handler({ context, event }: any) {
  const doc = event.data

  // Solo ejecutar si el estado es 'generating' y el _id existe
  if (doc._type !== 'post' || doc.generationStatus !== 'generating' || !doc._id) {
    console.log(`⏩ Skipping: type=${doc._type} status=${doc.generationStatus}`)
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

  // Helper: GROQ query via Sanity REST API
  async function sanityFetch(query: string) {
    const url = `${SANITY_API}/query/${dataset}?query=${encodeURIComponent(query)}`
    const res = await fetch(url, { headers })
    if (!res.ok) throw new Error(`Sanity fetch error: ${res.status} ${await res.text()}`)
    const json: any = await res.json()
    return json.result
  }

  // Helper: patch a document via Sanity Mutations REST API
  async function sanityPatch(docId: string, setFields: Record<string, any>) {
    const url = `${SANITY_API}/mutate/${dataset}`
    const body = JSON.stringify({
      mutations: [{
        patch: {
          id: docId,
          set: setFields
        }
      }]
    })
    const res = await fetch(url, { method: 'POST', headers, body })
    if (!res.ok) throw new Error(`Sanity patch error: ${res.status} ${await res.text()}`)
    return res.json()
  }

  try {
    // 1. Obtener configuración del prompt
    console.log('📥 Buscando prompt config en Sanity...')
    const promptConfig = await sanityFetch(`*[_type == "promptConfig"][0]`)
    if (!promptConfig || !promptConfig.instructions) {
      throw new Error('Configuración de prompt no encontrada. Publícala en Sanity Studio.')
    }

    // 2. Api Key GOOGLE
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      throw new Error('Secret GOOGLE_API_KEY no configurado.')
    }

    // 3. Preparar Prompt — limpia comillas del topic para no romper el JSON de Gemini
    const rawTopic = doc.topic || doc.title || 'Tema general'
    const topic = rawTopic
      .replace(/[""«»]/g, '"')   // normalizar comillas tipográficas
      .replace(/[''‹›]/g, "'")  // normalizar comillas simples
      .trim()
    const finalPrompt = promptConfig.instructions.replace('{{topic}}', topic)
    console.log(`🚀 Generando contenido para: "${topic.slice(0, 80)}"`)

    // 4. Llamar Gemini via REST fetch
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: finalPrompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      }
    )

    if (!geminiRes.ok) {
      const errText = await geminiRes.text()
      throw new Error(`Gemini API error ${geminiRes.status}: ${errText}`)
    }

    const geminiJson: any = await geminiRes.json()
    const generatedText = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!generatedText) throw new Error('Gemini no devolvió contenido en el formato esperado')

    // 5. Parsear JSON — varios fallbacks para resiliencia
    const cleanJson = generatedText.replace(/```json\n?|```/g, '').trim()
    let rawData: any
    try {
      rawData = JSON.parse(cleanJson)
    } catch {
      // Fallback 1: Extraer el primer objeto JSON del texto
      const match = cleanJson.match(/\{[\s\S]*\}/)
      if (match) {
        try {
          rawData = JSON.parse(match[0])
        } catch {
          // Fallback 2: Si el JSON tiene caracteres problemáticos, intentar parsearlo de forma más permisiva
          // Reemplazamos saltos de línea dentro de strings con \n escapado
          const sanitized = match[0]
            .replace(/(?<=": ?"[^"]*)\n(?=[^"]*")/g, '\\n')  // escapa newlines dentro de strings
          try {
            rawData = JSON.parse(sanitized)
          } catch (finalErr: any) {
            throw new Error(`JSON inválido: ${finalErr.message}. Texto recibido (inicio): ${cleanJson.slice(0, 300)}`)
          }
        }
      } else {
        throw new Error('No se encontró JSON en la respuesta de Gemini')
      }
    }

    // 6. Validar contenido
    const content = rawData.content || rawData.body || rawData.text || rawData.markdown || ''
    if (!content || content.length < 100) {
      throw new Error(`Contenido insuficiente (${content.length} chars)`)
    }

    // Función helper para limpiar slugs
    const sanitizeSlug = (text: string) =>
      text.toString().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 96)

    const finalSlug = rawData.slug
      ? sanitizeSlug(typeof rawData.slug === 'string' ? rawData.slug : rawData.slug.current || '')
      : sanitizeSlug(rawData.title || topic)

    // Función para procesar y crear tags como documentos 'Draft' en Sanity
    async function getOrCreateTagDraftRefs(tagNames: string[]) {
      const refs: { _type: 'reference', _ref: string, _key: string }[] = []
      
      for (const t of tagNames) {
        if (!t || typeof t !== 'string') continue
        const cleanName = t.trim()
        const tSlug = sanitizeSlug(cleanName)
        if (!tSlug) continue
        
        // El id del documento draft
        const draftId = `drafts.tag-${tSlug}`
        
        // Creamos (createIfNotExists) el documento draft tag usando la REST API
        const createUrl = `${SANITY_API}/mutate/${dataset}`
        const bodyCreate = JSON.stringify({
          mutations: [{
            createIfNotExists: {
              _id: draftId,
              _type: 'tag',
              name: cleanName,
              slug: { _type: 'slug', current: tSlug }
            }
          }]
        })
        
        try {
          await fetch(createUrl, { method: 'POST', headers, body: bodyCreate })
        } catch (e) {
          console.error(`Error creando tag draft ${draftId}:`, e)
        }
        
        // Agregamos la referencia a la lista
        refs.push({
          _type: 'reference',
          _ref: draftId,
          _key: `ref-${tSlug}-${Date.now()}`
        })
      }
      return refs
    }

    // Unir tags y secondaryKeywords que vengan de Gemini para crear los Documentos Tag Draft
    const rawTags = Array.isArray(rawData.tags) ? rawData.tags : []
    const rawSecKeys = Array.isArray(rawData.secondaryKeywords) ? rawData.secondaryKeywords : []
    
    console.log(`🏷️ Creando tags como drafts...`)
    const tagDraftRefs = await getOrCreateTagDraftRefs(rawTags)
    const secKeyDraftRefs = await getOrCreateTagDraftRefs(rawSecKeys)

    // 7. Actualizar Documento POST en Sanity
    console.log(`💾 Actualizando documento ${doc._id}...`)
    await sanityPatch(doc._id, {
      title: rawData.title || doc.title,
      slug: { _type: 'slug', current: finalSlug },
      content: content,
      faq: (rawData.faq || []).map((item: any, i: number) => ({
        _key: `faq-${i}-${Date.now()}`,
        question: item.question || '',
        answer: item.answer || '',
      })),
      category: rawData.category || 'ecommerce',
      tags: tagDraftRefs,
      keywordFocus: rawData.keywordFocus || '',
      secondaryKeywords: secKeyDraftRefs,
      generationStatus: 'completed'
    })

    console.log(`✅ Post generado exitosamente: "${rawData.title}"`)

  } catch (err: any) {
    console.error('❌ Error en función AI:', err.message)
    try {
      await sanityPatch(doc._id, { generationStatus: 'failed' })
    } catch (patchErr: any) {
      console.error('❌ No se pudo marcar como failed:', patchErr.message)
    }
  }
}
