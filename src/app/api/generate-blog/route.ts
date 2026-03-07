import { normalizeTagSlug } from "@/lib/normalize-tag";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { syncSanityPosts } from "@/app/actions/sync-posts";
import { requireInternalAuth } from "@/lib/api-auth";
import { checkRateLimit } from "@/lib/rate-limit";


// Inicialización de cliente Gemini
const googleAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const maxDuration = 30; 
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const authError = requireInternalAuth(req);
  if (authError) return authError;

  // Rate limit: 5 requests per 10 minutes per token
  const token = req.headers.get('Authorization') ?? 'anon';
  const rl = checkRateLimit(`generate-blog:${token}`, 5, 10 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Demasiadas solicitudes. Reintenta en ${rl.retryAfter}s.` },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    );
  }

  try {
    const { topic } = await req.json();
    if (!topic) return NextResponse.json({ error: "Falta el tema" }, { status: 400 });

    console.log(`🚀 Generando BLOG (Texto) sobre: ${topic}`);
    if (!process.env.GOOGLE_API_KEY) throw new Error("Falta GOOGLE_API_KEY");

    // Modelo principal: Gemini 2.5 Flash Preview
    const geminiResponse = await googleAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [{
          text: `Eres Juan Arango, CEO de Nitro Ecom — consultor de ecommerce, inteligencia artificial y estrategia digital con más de 10 años de experiencia ayudando a marcas y emprendedores a vender más en internet.

Escribe un artículo de blog COMPLETO, EXTENSO y de ALTO VALOR sobre el tema: "${topic}".

━━━━━━━━━━━━━━━━━━━
VOZ Y ESTILO
━━━━━━━━━━━━━━━━━━━
- Escribe en PRIMERA PERSONA como Juan Arango. Tono cercano, directo y profesional.
- usa lenguaje en español latinoamericano natural — como si le hablaras directamente a un emprendedor o empresario.
- Incluye perspectivas y opiniones propias. Ej: "En mi experiencia trabajando con clientes de ecommerce...", "Lo que he visto que mejor funciona es...", "Te lo digo de frente:..."
- NO uses lenguaje robótico, corporativo ni frases genéricas de IA.
- El artículo DEBE terminar con esta firma exacta al final del contenido (en una línea separada):
  ---
  *— Juan Arango, CEO de [Nitro Ecom](https://www.juanarangoecommerce.com)*

━━━━━━━━━━━━━━━━━━━
ESTRUCTURA MARKDOWN OBLIGATORIA
━━━━━━━━━━━━━━━━━━━
CRÍTICO: El título del artículo ya existe como H1 en la página. Por tanto:
- NUNCA uses "# " (H1) dentro del campo "content". Empezar DIRECTAMENTE con "## " (H2).
- Usa "## " para secciones principales (mínimo 6 secciones H2).
- Usa "### " para subsecciones dentro de cada H2 (mínimo 2 H3 por sección principal).
- Estructura el H2 como preguntas reales cuando sea posible: "## ¿Qué es X?", "## ¿Cómo funciona Y?", "## ¿Por qué Z importa para tu negocio?"
- Los H2 son capturados por el Table of Contents lateral — redáctalos de forma clara y atractiva.

Elementos que DEBES usar para enriquecer el contenido:
- **negritas** en TODOS los términos técnicos, nombres propios y conceptos clave de cada párrafo.
- > Blockquotes para datos importantes, insights o tips destacados. Ej: > **Dato clave:** El 73% de los compradores...
- Tablas Markdown (| Col | Col |) cuando compares herramientas, planes o conceptos.
- Listas con guiones (- ) para pasos, características o ventajas.
- Listas numeradas (1. ) para procesos o tutoriales paso a paso.

━━━━━━━━━━━━━━━━━━━
PÁRRAFO DE APERTURA (SGO)
━━━━━━━━━━━━━━━━━━━
El primer párrafo del artículo (antes del primer ## H2) debe:
- Responder directamente y de forma concisa la pregunta central del tema en máximo 60 palabras.
- Incluir la keyword principal de forma natural en las primeras 2 oraciones.
- Enganchar al lector con una afirmación directa o dato relevante.
(Los motores de búsqueda y agentes de IA capturan este párrafo para respuestas directas.)

━━━━━━━━━━━━━━━━━━━
OPTIMIZACIÓN PARA BÚSQUEDAS Y AGENTES IA
━━━━━━━━━━━━━━━━━━━
- Cada sección ## H2 debe INICIAR con 1-2 líneas de respuesta concreta y directa antes de desarrollar el tema.
- Cubre el tema de forma exhaustiva usando sinónimos, conceptos relacionados y términos semánticos.
- Distribuye naturalmente la keyword principal y sus variaciones longtail a lo largo del artículo.
- Incluye ejemplos reales, casos de uso y contexto práctico para Colombia, México y Latinoamérica cuando sea relevante.

━━━━━━━━━━━━━━━━━━━
EXTENSIÓN Y PROFUNDIDAD
━━━━━━━━━━━━━━━━━━━
- Mínimo 1800 palabras de contenido (preferible 2500-3500 para temas técnicos).
- Mínimo 6 secciones ## H2, cada una con al menos 2 subsecciones ### H3.
- Incluye al menos UNA tabla comparativa si el tema involucra herramientas, plataformas o planes.
- Incluye al menos un > blockquote con un dato, stat o insight relevante.
- El último H2 debe ser una conclusión accionable: "## Conclusión: [resumen del valor del tema]".

━━━━━━━━━━━━━━━━━━━
REGLAS ANTI-ALUCINACIÓN
━━━━━━━━━━━━━━━━━━━
- SOLO incluye un bloque de código tipo \`\`\`prompt si el tema es EXPLÍCITAMENTE sobre generación de imágenes con IA, ingeniería de prompts o uso directo de modelos de lenguaje. En cualquier otro tema (marketing, estrategia, ecommerce, plataformas), NO incluyas ningún bloque \`\`\`prompt.
- NUNCA escribas las palabras internas "SEO" o "SGO" de forma técnica o como jerga visible para el lector — usa en su lugar "posicionamiento en buscadores", "visibilidad en Google", "búsquedas en internet", etc.
- NO inventes estadísticas, herramientas, fechas ni empresas. Si mencionas datos, que sean creíbles y verificables.
- NO incluyas el FAQ dentro del campo "content".

━━━━━━━━━━━━━━━━━━━
FORMATO DE RESPUESTA JSON
━━━━━━━━━━━━━━━━━━━
Tu respuesta DEBE ser un objeto JSON válido con EXACTAMENTE estas 8 claves:

1. "title": Título del post (incluye la keyword principal, máx. 65 caracteres, orientado a responder una búsqueda real).
2. "slug": URL amigable en minúsculas con guiones (ej: como-vender-en-shopify-desde-cero).
3. "content": El contenido COMPLETO del artículo en Markdown. Recuerda: empieza con el párrafo de apertura, luego ## H2. NUNCA con # H1. Termina con la firma de Juan Arango.
4. "faq": Array de mínimo 5 objetos con "question" y "answer". Las preguntas deben ser búsquedas reales y conversacionales que alguien haría sobre el tema. Las respuestas, concisas (2-4 oraciones).
5. "category": UNA de estas categorías exactas (sin variaciones): "ecommerce", "estrategia-marketing", "ia-automatizacion", "headless-commerce", "prompts".
6. "tags": Array de 4-6 etiquetas longtail en español, específicas y relevantes (ej: ["shopify-colombia", "tienda-online", "vender-por-internet"]).
7. "keywordFocus": String con la keyword principal del artículo (ej: "cómo crear una tienda en Shopify").
8. "secondaryKeywords": Array de 3-5 keywords longtail secundarias relacionadas (ej: ["crear tienda online gratis", "shopify precio colombia", "plataforma ecommerce latinoamerica"]).

Responde ÚNICAMENTE con el JSON puro. Sin \`\`\`json al inicio ni al final. Sin explicaciones adicionales.`
        }]
      }],
      config: { 
        responseMimeType: "application/json" 
      },
    } as any);

    // Extracción robusta del texto
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

    // Limpieza y Normalización
    const cleanJson = generatedText.replace(/```json\n?|```/g, '').trim();
    const rawData = JSON.parse(cleanJson);
    
    // Normalizar datos (Gemini a veces usa 'body' o 'article' en lugar de 'content')
    const blogData = {
        title: rawData.title || rawData.header || topic,
        slug: rawData.slug,
        // Fallback robusto para encontrar el contenido
        content: rawData.content || rawData.body || rawData.text || rawData.article || rawData.markdown || rawData.fullText || "",
        faq: rawData.faq || [],
        category: rawData.category || "ecommerce",
        tags: (Array.isArray(rawData.tags) ? rawData.tags : []).map((tag: string) => ({
             name: tag,
             slug: normalizeTagSlug(tag)
        })),
        // Nuevos campos de keywords para SEO
        keywordFocus: rawData.keywordFocus || "",
        secondaryKeywords: Array.isArray(rawData.secondaryKeywords) ? rawData.secondaryKeywords : [],
    };

    if (!blogData.content) {
        console.error("❌ Gemini devolvió JSON sin contenido:", JSON.stringify(rawData));
        throw new Error("La IA no generó contenido (JSON incompleto). Intenta de nuevo.");
    }
    
    // Trigger Async Sync to Supabase
    // We don't await this to keep the response fast for the UI
    (async () => {
        try {
            console.log("⚡ Triggering background sync...");
            await syncSanityPosts();
        } catch (err) {
            console.error("Background sync failed:", err);
        }
    })();

    return NextResponse.json({ success: true, data: blogData });

  } catch (error: any) {
    console.error("❌ Error API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
