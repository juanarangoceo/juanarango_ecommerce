import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function POST(request: NextRequest) {
  try {
    const { app1, app2 } = await request.json()

    if (!app1?.appName || !app2?.appName) {
      return NextResponse.json({ error: 'Se requieren datos de las dos apps.' }, { status: 400 })
    }

    const prompt = `Eres un experto en tecnología y marketing digital especializado en herramientas de IA. Genera una comparación exhaustiva y profesional entre "${app1.appName}" y "${app2.appName}".

DATOS DE ${app1.appName.toUpperCase()}:
- Descripción: ${app1.description || 'N/A'}
- Descripción larga: ${app1.longDescription || 'N/A'}
- Categoría: ${app1.category || 'N/A'}
- Precio: ${app1.pricing || 'N/A'} (${app1.priceDetail || 'N/A'})
- Rating: ${app1.rating || 'N/A'}/5
- Funcionalidades: ${(app1.features || []).join(', ') || 'N/A'}
- Pros: ${(app1.pros || []).join(', ') || 'N/A'}
- Contras: ${(app1.cons || []).join(', ') || 'N/A'}
- Plataformas: ${(app1.platforms || []).join(', ') || 'N/A'}

DATOS DE ${app2.appName.toUpperCase()}:
- Descripción: ${app2.description || 'N/A'}
- Descripción larga: ${app2.longDescription || 'N/A'}
- Categoría: ${app2.category || 'N/A'}
- Precio: ${app2.pricing || 'N/A'} (${app2.priceDetail || 'N/A'})
- Rating: ${app2.rating || 'N/A'}/5
- Funcionalidades: ${(app2.features || []).join(', ') || 'N/A'}
- Pros: ${(app2.pros || []).join(', ') || 'N/A'}
- Contras: ${(app2.cons || []).join(', ') || 'N/A'}
- Plataformas: ${(app2.platforms || []).join(', ') || 'N/A'}

Devuelve un JSON con esta estructura:

{
  "title": "Título SEO optimizado tipo: ${app1.appName} vs ${app2.appName}: [Subtítulo con keyword principal]",
  "slug": "slug-en-formato-url tipo: ${(app1.appName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-vs-${(app2.appName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
  "metaDescription": "Meta description de 150-160 caracteres optimizada para CTR en Google, naturalmente incluyendo las dos apps",
  "content": "Contenido completo en formato Markdown. DEBE incluir:
    ## Introducción (2-3 párrafos contextualizando la comparación, mencionando por qué alguien buscaría esta comparación)
    ## ¿Qué es [App1]? (descripción detallada)
    ## ¿Qué es [App2]? (descripción detallada)
    ## Comparativa Detallada
    ### Funcionalidades
    ### Interfaz y Experiencia de Usuario
    ### Precios y Planes
    ### Integraciones y Compatibilidad
    ### Soporte y Comunidad
    ## ¿Cuándo elegir [App1]?
    ## ¿Cuándo elegir [App2]?
    ## Veredicto Final
    
    El contenido debe ser:
    - Mínimo 2000 palabras
    - Objetivo e imparcial
    - Con datos reales y comparaciones específicas
    - Optimizado para SEO y SGE (Search Generative Experience)
    - En español natural y profesional
    - Rico en keywords long-tail relacionadas
    - Incluir listas, negritas y formato enriquecido
    ",
  "comparisonTable": [
    {"feature": "Nombre de la característica", "app1Value": "Valor para App1", "app2Value": "Valor para App2"},
    // Mínimo 8 filas comparando: Precio, Plan Gratuito, Funcionalidad Principal, Facilidad de Uso, Soporte, Integraciones, Plataformas, Idioma, etc.
  ],
  "verdict": "Párrafo de veredicto final de 3-4 oraciones, objetivo y útil, indicando para qué tipo de usuario es mejor cada app",
  "faq": [
    {"question": "Pregunta frecuente sobre la comparación", "answer": "Respuesta detallada y útil"},
    // 5-7 preguntas frecuentes reales que la gente buscaría, tipo: "¿Cuál es más barato?", "¿Cuál es mejor para principiantes?", etc.
  ]
}

IMPORTANTE:
- Responde SOLO con el JSON puro, sin markdown ni explicaciones.
- Todo el contenido debe estar en español.
- El contenido markdown debe ser rico, detallado y con formato adecuado.
- Las preguntas FAQ deben ser las que la gente realmente busca en Google.
- El slug debe ser limpio y SEO-friendly.`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 16000,
      },
    })

    const rawText = response.text || ''
    
    // Clean JSON from potential markdown wrapping
    const cleanJson = rawText
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/gi, '')
      .trim()

    let parsedData
    try {
      parsedData = JSON.parse(cleanJson)
    } catch {
      console.error('Failed to parse comparison JSON:', cleanJson.substring(0, 500))
      return NextResponse.json({ error: 'La IA generó una respuesta no válida. Intenta de nuevo.' }, { status: 500 })
    }

    // Validate essential fields
    if (!parsedData.title || !parsedData.content) {
      return NextResponse.json({ error: 'Contenido insuficiente generado. Intenta de nuevo.' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: {
        title: parsedData.title,
        slug: parsedData.slug || `${app1.appName}-vs-${app2.appName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        metaDescription: parsedData.metaDescription || '',
        content: parsedData.content,
        comparisonTable: Array.isArray(parsedData.comparisonTable) ? parsedData.comparisonTable : [],
        verdict: parsedData.verdict || '',
        faq: Array.isArray(parsedData.faq) ? parsedData.faq : [],
      },
    })
  } catch (error: any) {
    console.error('Comparison generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
