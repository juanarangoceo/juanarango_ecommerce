import { normalizeTagSlug } from "@/lib/normalize-tag";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { syncSanityPosts } from "@/app/actions/sync-posts";
import { requireInternalAuth } from "@/lib/api-auth";


// Inicialización de cliente Gemini
const googleAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const maxDuration = 30; 
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const authError = requireInternalAuth(req);
  if (authError) return authError;

  try {
    const { topic } = await req.json();
    if (!topic) return NextResponse.json({ error: "Falta el tema" }, { status: 400 });

    console.log(`🚀 Generando BLOG (Texto) sobre: ${topic}`);
    if (!process.env.GOOGLE_API_KEY) throw new Error("Falta GOOGLE_API_KEY");

    // Usamos el modelo más rápido y capaz actual: Gemini 2.0 Flash Exp
    const geminiResponse = await googleAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [{
          text: `Eres un escritor de blogs experto. Escribe un artículo sobre "${topic}".
          
          IMPORTANTE: Tu respuesta DEBE ser un objeto JSON válido con EXACTAMENTE estas 6 claves:
          1. "title": Título del post.
          2. "slug": URL amigable (ej: titulo-del-post).
          3. "content": El contenido COMPLETO del artículo en formato Markdown (extenso, estructurado con H2, listas, etc). NO incluyas FAQ aquí dentro.
          3. "content": El contenido COMPLETO del artículo en formato Markdown.
             - SI (y solo si) el artículo trata sobre generar imágenes o usar IA, incluye el Prompt en un bloque de código "prompt" o "markdown" para que sea fácil de copiar.
             - Si el tema NO requiere un prompt (ej: marketing, estrategia), NO inventes uno.
             - Formato para el prompt:
             \`\`\`prompt
             Un perro espacial...
             \`\`\`
          4. "faq": Un array de objetos con "question" y "answer".
          5. "category": UNA de estas categorías exactas: "ecommerce", "estrategia-marketing", "ia-automatizacion", "headless-commerce", "prompts". Elige la más relevante.
          6. "tags": Un array de 3-5 etiquetas relevantes en español (ej: ["shopify", "seo", "conversiones"]).

          NO incluyas "markdown" al inicio ni al final. Solo el JSON puro.`
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
