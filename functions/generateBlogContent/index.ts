import { documentEventHandler } from '@sanity/functions'
import { createClient } from '@sanity/client'
import { GoogleGenAI } from '@google/genai'

export const handler = documentEventHandler(async (envelope) => {
  const { context, event } = envelope
  const doc = event.data

  // Solo ejecutar si el estado es 'generating' y el _id existe
  if (doc._type !== 'post' || doc.generationStatus !== 'generating' || !doc._id) {
    return
  }

  // Sanity Client
  const client = createClient({
    ...context.clientOptions,
    apiVersion: '2024-03-01',
    useCdn: false
  })

  // Evitar duplicidades marcando status='processing'
  // Pero aquí en Serverless Function esto podría ser over-engineering si no hay race condition
  // Igualmente, usaremos variables locales
  
  try {
    // 1. Obtener configuración del prompt
    const promptConfigResult = await client.fetch(`*[_type == "promptConfig"][0]`)
    if (!promptConfigResult || !promptConfigResult.instructions) {
      throw new Error('Configuración de prompt no encontrada.')
    }

    // 2. Api Key GOOGLE (Debe estar en Secrets del Stack de Sanity)
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      throw new Error('Secret GOOGLE_API_KEY no configurado en entorno de la función Sanity.')
    }

    const ai = new GoogleGenAI({ apiKey })

    // 3. Preparar Prompt
    const topic = doc.title || 'Tema general'
    const finalPrompt = promptConfigResult.instructions.replace('{{topic}}', topic)

    console.log(`🚀 Función iniciada para post: ${topic}. Obteniendo de Gemini...`)

    // 4. Llamar Gemini
    const geminiResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [{ text: finalPrompt }]
      }],
      config: { 
        responseMimeType: "application/json" 
      },
    } as any)

    // Extracción robusta (basada en el route.ts web)
    let generatedText = "";
    // @ts-ignore
    if (typeof geminiResponse.text === 'function') {
         // @ts-ignore
         generatedText = geminiResponse.text();
    } else if (typeof geminiResponse.text === 'string') {
         generatedText = geminiResponse.text;
    } else if (geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text) {
         generatedText = geminiResponse.candidates[0].content.parts[0].text;
    } else {
         generatedText = JSON.stringify(geminiResponse);
    }

    if (!generatedText) throw new Error("Gemini no devolvió datos");

    // Limpieza
    const cleanJson = generatedText.replace(/```json\n?|```/g, '').trim();
    let rawData;
    try {
      rawData = JSON.parse(cleanJson);
    } catch(e) {
      // Intentar regex fallback si JSON.parse falla simple
       let jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
       if (jsonMatch) rawData = JSON.parse(jsonMatch[0]);
       else throw e;
    }
    
    // 5. Normalizar datos
    const content = rawData.content || rawData.body || rawData.text || rawData.article || rawData.markdown || rawData.fullText || "";
    if (!content) {
        throw new Error("La IA no generó la llave 'content' requerida.");
    }

    // 6. Actualizar Documento en Sanity
    // Se elimina el estado 'generating' pasándolo a 'completed'
    // También mapeamos los campos a la base de datos
    await client.patch(doc._id)
      .set({
        title: rawData.title || rawData.header || doc.title,
        slug: { _type: 'slug', current: rawData.slug || doc.slug?.current },
        content: content,
        faq: rawData.faq || [],
        category: rawData.category || "ecommerce",
        tags: (Array.isArray(rawData.tags) ? rawData.tags : []).map((tag: string) => ({
             name: tag,
             slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        })),
        keywordFocus: rawData.keywordFocus || "",
        secondaryKeywords: Array.isArray(rawData.secondaryKeywords) ? rawData.secondaryKeywords : [],
        generationStatus: 'completed'
      })
      .commit()

      console.log(`✅ Sanity Document Actualizado: ${doc._id}`)

  } catch (err: any) {
    console.error('❌ Error AI Function:', err.message)
    
    // Si falla, pasamos el request a estado failed para que el usuario pueda reintentar
    await client.patch(doc._id)
      .set({
        generationStatus: 'failed'
      })
      .commit()
  }
})
