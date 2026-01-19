import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Inicialización de cliente Gemini
const googleAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const maxDuration = 30; 
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
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
          
          IMPORTANTE: Tu respuesta DEBE ser un objeto JSON válido con EXACTAMENTE estas 3 claves:
          1. "title": Título del post.
          2. "slug": URL amigable (ej: titulo-del-post).
          3. "content": El contenido COMPLETO del artículo en formato Markdown (extenso, estructurado con H2, listas, etc).
          
          NO uses claves anidadas. NO uses 'body'. La clave 'content' es OBLIGATORIA.`
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
        content: rawData.content || rawData.body || rawData.text || rawData.article || rawData.markdown || rawData.fullText || ""
    };

    if (!blogData.content) {
        console.error("❌ Gemini devolvió JSON sin contenido:", JSON.stringify(rawData));
        throw new Error("La IA no generó contenido (JSON incompleto). Intenta de nuevo.");
    }
    
    return NextResponse.json({ success: true, data: blogData });

  } catch (error: any) {
    console.error("❌ Error API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
