// Zero-dependency Sanity Function handler — REFINADOR DE CTR
// Mejora título, meta description y contenido de un post existente con Gemini 3.5 Flash.
// NO toca el slug (la URL no cambia → se conserva el ranking actual).
// Usa solo Node.js built-in fetch (Node 18+) para llamar a Sanity REST API y Gemini API.

export async function handler({ context, event }: any) {
  const doc = event.data

  // Solo ejecutar si el estado es 'refining' y el _id existe
  if (doc._type !== 'post' || doc.refineStatus !== 'refining' || !doc._id) {
    console.log(`⏩ Skipping refine: type=${doc._type} status=${doc.refineStatus}`)
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
    // 1. Obtener configuración del prompt de refinado
    console.log('📥 Buscando refineInstructions en Sanity...')
    const promptConfig = await sanityFetch(`*[_type == "promptConfig"][0]`)
    if (!promptConfig || !promptConfig.refineInstructions) {
      throw new Error('Configuración de refinado no encontrada. Publica refineInstructions en Sanity Studio.')
    }

    // 2. Api Key GOOGLE
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      throw new Error('Secret GOOGLE_API_KEY no configurado.')
    }

    // 3. Validar que haya contenido para refinar
    const currentContent = doc.content || ''
    if (!currentContent || currentContent.length < 100) {
      throw new Error(`El post no tiene contenido suficiente para refinar (${currentContent.length} chars). Genera el contenido primero.`)
    }

    // 4. Preparar Prompt — limpia comillas tipográficas para no romper el JSON de Gemini
    const normalizeQuotes = (text: string) =>
      (text || '')
        .replace(/[“”«»]/g, '"')
        .replace(/[‘’‹›]/g, "'")

    const finalPrompt = promptConfig.refineInstructions
      .replace('{{title}}', normalizeQuotes(doc.title || ''))
      .replace('{{keywordFocus}}', normalizeQuotes(doc.keywordFocus || ''))
      .replace('{{content}}', normalizeQuotes(currentContent))
    console.log(`🚀 Refinando post: "${(doc.title || '').slice(0, 80)}"`)

    // 5. Llamar Gemini via REST fetch
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
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
    const generatedText = (geminiJson?.candidates?.[0]?.content?.parts || [])
      .map((p: any) => p?.text || '')
      .join('')
    if (!generatedText) throw new Error('Gemini no devolvió contenido en el formato esperado')

    // 6. Parsear JSON — varios fallbacks para resiliencia
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
          // Fallback 2: escapar saltos de línea dentro de strings
          const sanitized = match[0]
            .replace(/(?<=": ?"[^"]*)\n(?=[^"]*")/g, '\\n')
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

    // 7. Validar contenido refinado
    const content = rawData.content || rawData.body || rawData.text || rawData.markdown || ''
    if (!content || content.length < 100) {
      throw new Error(`Contenido refinado insuficiente (${content.length} chars)`)
    }

    // 8. Actualizar Documento — SOLO title, metaDescription, content. NUNCA el slug.
    console.log(`💾 Actualizando documento ${doc._id} (sin tocar slug)...`)
    await sanityPatch(doc._id, {
      title: rawData.title || doc.title,
      metaDescription: rawData.metaDescription || doc.metaDescription || '',
      content: content,
      refineStatus: 'completed'
    })

    console.log(`✅ Post refinado exitosamente: "${rawData.title}"`)

  } catch (err: any) {
    console.error('❌ Error en función de refinado:', err.message)
    try {
      await sanityPatch(doc._id, { refineStatus: 'failed' })
    } catch (patchErr: any) {
      console.error('❌ No se pudo marcar como failed:', patchErr.message)
    }
  }
}
