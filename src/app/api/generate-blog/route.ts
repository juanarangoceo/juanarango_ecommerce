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
      model: "gemini-2.0-flash-exp",
      contents: [{
        role: "user",
        parts: [{
          text: `Actúa como un experto en SEO y Copywriting. Escribe un artículo de blog sobre "${topic}".
          
          Estructura requerida (JSON):
          - title: Título atractivo y optimizado para SEO.
          - slug: URL amigable (kebab-case).
          - content: Contenido completo en Markdown. 
            * Usa H2 (##) para secciones.
            * Usa párrafos cortos.
            * Incluye una lista de "Key Takeaways" al inicio.
          
          Devuelve SOLO el JSON válido.`
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
        content: rawData.content || rawData.body || rawData.text || rawData.article || ""
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
