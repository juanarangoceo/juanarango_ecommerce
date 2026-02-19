import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function POST(request: NextRequest) {
  try {
    const { app1, app2 } = await request.json()

    if (!app1?.appName || !app2?.appName) {
      return NextResponse.json({ error: 'Se requieren datos de las dos apps.' }, { status: 400 })
    }

    const prompt = `Eres un experto en tecnología y marketing digital. Genera una comparación CONCISA y visualmente organizada entre "${app1.appName}" y "${app2.appName}".

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

REGLAS DE FORMATO IMPORTANTE:
- El contenido debe ser CONCISO y SCANNABLE (fácil de escanear visualmente)
- Máximo 800-1000 palabras en el campo "content"
- Usa párrafos CORTOS (máximo 2-3 líneas cada uno)
- Usa listas con bullets en vez de párrafos largos
- Cada sección h2/h3 debe tener máximo 3-4 párrafos cortos o listas
- Piensa en mobile: el usuario va a leer en el celular
- NO repitas información que ya está en comparisonTable o en los otros campos

Devuelve un JSON con esta estructura exacta:

{
  "title": "Título SEO tipo: ${app1.appName} vs ${app2.appName}: [Subtítulo corto]",
  "slug": "${(app1.appName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-vs-${(app2.appName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
  "metaDescription": "Meta description de 150-160 caracteres para Google",
  "introText": "1-2 párrafos cortos introduciendo POR QUÉ alguien compararía estas dos apps. Máximo 80 palabras.",
  "app1Summary": "Descripción de ${app1.appName} en 2-3 oraciones. Directa y al grano.",
  "app2Summary": "Descripción de ${app2.appName} en 2-3 oraciones. Directa y al grano.",
  "app1BestFor": "Frase corta: Para quién es ideal App1. Ej: 'Ideal para creadores de contenido que necesitan generar imágenes rápido'",
  "app2BestFor": "Frase corta: Para quién es ideal App2.",
  "content": "Contenido en Markdown con estas secciones BREVES:
    ## Funcionalidades Clave (lista con bullets comparando las funcionalidades principales, máximo 6 bullets)
    ## Experiencia de Uso (2 párrafos cortos: uno por app)
    ## Precios y Planes (comparación directa de precios, sin repetir la tabla)
    ## Integraciones (lista corta de integraciones clave de cada app)
    
    IMPORTANTE: No incluyas introducción ni veredicto en el content, esos van en campos separados.",
  "comparisonTable": [
    {"feature": "Característica", "app1Value": "Valor corto", "app2Value": "Valor corto"},
    // 8-10 filas: Precio, Plan Gratis, Funcionalidad Principal, Facilidad de Uso, Soporte, Integraciones, Plataformas, Idioma Español, API
  ],
  "verdict": "Veredicto en 2-3 oraciones: cuál es mejor para qué tipo de usuario.",
  "faq": [
    {"question": "Pregunta", "answer": "Respuesta en máximo 2-3 oraciones"},
    // 5 preguntas cortas y directas
  ]
}

IMPORTANTE:
- Responde SOLO con JSON puro, sin markdown ni explicaciones
- Todo en español
- Sé CONCISO: calidad > cantidad
- Las respuestas de FAQ deben ser cortas (2-3 oraciones máximo)`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 8000,
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
        introText: parsedData.introText || '',
        app1Summary: parsedData.app1Summary || '',
        app2Summary: parsedData.app2Summary || '',
        app1BestFor: parsedData.app1BestFor || '',
        app2BestFor: parsedData.app2BestFor || '',
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
