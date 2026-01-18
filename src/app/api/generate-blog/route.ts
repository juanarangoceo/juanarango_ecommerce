import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { client } from "@/sanity/lib/client";

// Inicialización de clientes
const googleAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const maxDuration = 60; // Timeout extendido para IA + Imagen
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { topic, action = 'generate-text', imagePrompt } = await req.json();
    
    if (!topic && action === 'generate-text') return NextResponse.json({ error: "Falta el tema" }, { status: 400 });

    // --- ACCIÓN 1: GENERAR TEXTO (Gemini 2.0 Flash - SIN BÚSQUEDA PARA VELOCIDAD) ---
    if (action === 'generate-text') {
        console.log(`🚀 Generando TEXTO (Rápido) sobre: ${topic}`);
        if (!process.env.GOOGLE_API_KEY) throw new Error("Falta GOOGLE_API_KEY");

        const geminiResponse = await googleAI.models.generateContent({
          model: "gemini-2.0-flash-exp",
          // tools: [{ googleSearch: {} } as any], // REMOVIDO: Causa Timeouts en Vercel Hobby (>10s)
          contents: [{
            role: "user",
            parts: [{
              text: `Escribe un artículo de blog experto sobre "${topic}".
              
              Requisitos:
              - Datos generales y consejos expertos.
              - Formato Markdown profesional.
              - Usa saltos de línea dobles entre párrafos.
              
              Devuelve EXCLUSIVAMENTE este JSON:
              {
                "title": "Título SEO",
                "content": "Contenido completo en Markdown...",
                "slug": "url-amigable",
                "imagePrompt": "Descripción visual detallada en inglés para DALL-E..."
              }`
            }]
          }],
          config: { responseMimeType: "application/json" },
        } as any);

        // Parseo seguro del contenido
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

        if (!generatedText) throw new Error("Gemini no devolvió texto");

        const cleanJson = generatedText.replace(/```json\n?|```/g, '').trim();
        const blogData = JSON.parse(cleanJson);
        return NextResponse.json({ success: true, type: 'text', data: blogData });
    }

    // --- ACCIÓN 2: GENERAR IMAGEN (DALL-E 2 - MÁS RÁPIDO) ---
    if (action === 'generate-image') {
        console.log(`🎨 Generando IMAGEN (DALL-E 2) para: ${topic}`);
        if (!process.env.OPENAI_API_KEY) throw new Error("Falta OPENAI_API_KEY");
        
        const finalPrompt = imagePrompt || `Review about ${topic}, editorial style, minimal.`;

        // DALL-E 2 es mucho más rápido (<5s) que DALL-E 3 (>12s)
        const imageResponse = await openai.images.generate({
          model: "dall-e-2",
          prompt: finalPrompt.slice(0, 900), // Limit prompt length for DALL-E 2
          n: 1,
          size: "1024x1024",
          // DALL-E 2 doesn't support 'quality' or 'style'
        });

        const imageUrl = imageResponse.data?.[0]?.url;
        if (!imageUrl) throw new Error("Fallo al generar imagen");

        const imageFetch = await fetch(imageUrl);
        const imageBuffer = await imageFetch.arrayBuffer();
        
        const imageAsset = await client.assets.upload("image", Buffer.from(imageBuffer), {
          filename: `blog-cover-${Date.now()}.png`,
        });

        return NextResponse.json({ success: true, type: 'image', imageAssetId: imageAsset._id });
    }

    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });

  } catch (error: any) {
    console.error("❌ Error API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
