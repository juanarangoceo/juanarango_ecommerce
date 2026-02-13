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
          text: `Eres un experto en SEO y Marketing Digital para Ecommerce. 
          Genera contenido rico para una landing page de categoría/etiqueta sobre el tema: "${tag}".
          
          OBJETIVO: Demostrar "Topical Authority" (Autoridad Temática) y atraer tráfico orgánico.

          IMPORTANTE: Tu respuesta DEBE ser un objeto JSON válido con EXACTAMENTE estas 3 claves:
          1. "description": Un texto de 100-120 palabras explicando qué es este tema, su relevancia en ecommerce/tech hoy en día y qué tipo de contenido encontrará el usuario aquí. Tono profesional pero accesible.
          2. "seoTitle": Un título optimizado para SEO (max 60 chars). Ej: "Guía de [Tema] y Recursos para Ecommerce | Nitro Ecom".
          3. "seoDescription": Meta descripción optimizada para CTR (max 155 chars). Incluye keyword principal y llamada a la acción implícita.

          NO incluyas "markdown" al inicio ni al final. Solo el JSON puro.`
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
