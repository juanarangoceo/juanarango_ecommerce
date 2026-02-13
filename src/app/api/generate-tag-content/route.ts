import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Inicialización de cliente Gemini
const googleAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const maxDuration = 30; 
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { tag } = await req.json();
    if (!tag) return NextResponse.json({ error: "Falta el nombre de la etiqueta" }, { status: 400 });

    console.log(`🚀 Generando TAG Content sobre: ${tag}`);
    if (!process.env.GOOGLE_API_KEY) throw new Error("Falta GOOGLE_API_KEY");

    // Usamos el modelo más rápido y capaz actual
    const geminiResponse = await googleAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [{
          text: `Eres un experto en SEO y Marketing Digita para Ecommerce. 
          Genera una estructura de contenido "MegaPro" para la etiqueta: "${tag}".

          IMPORTANTE: Tu respuesta DEBE ser un objeto JSON válido con EXACTAMENTE estas 5 claves:
          
          1. "h1": Un Título H1 optimizado (ej: "Guía Completa de ${tag} para Ecommerce").
          2. "description": Un artículo en MARKDOWN (NO HTML) de 300-400 palabras. Estructura:
             - H2 inicial (Intro)
             - Párrafos de valor
             - Lista con bullet points
             - H2 secundario (Beneficios/Usos)
             - Conclusión breve
             - USA NEGRITAS para keywords.
          3. "faq": Un array de 3 objetos exactamente: [{"question": "...", "answer": "..."}].
             - Preguntas reales que la gente busca en Google sobre "${tag}".
             - Respuestas directas y útiles (40-60 palabras).
          4. "seoTitle": Título SEO (Title Tag) < 60 caracteres.
          5. "seoDescription": Meta description < 155 caracteres.

          NO incluyas "markdown" u otros textos fuera del JSON. Solo el objeto puro.`
        }]
      }],
      config: { 
        responseMimeType: "application/json" 
      },
    } as any);

    // Extracción robusta del texto similar a generate-blog
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
    
    const tagData = {
        description: rawData.description || "",
        seoTitle: rawData.seoTitle || "",
        seoDescription: rawData.seoDescription || "",
    };

    if (!tagData.description) {
        console.error("❌ Gemini devolvió JSON incompleto:", JSON.stringify(rawData));
        throw new Error("La IA no generó la descripción correctamente.");
    }
    
    return NextResponse.json({ success: true, data: tagData });

  } catch (error: any) {
    console.error("❌ Error API Tag Gen:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
