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

    // --- ACCIÓN 1: GENERAR TEXTO (Gemini 2.0 Flash) ---
    if (action === 'generate-text') {
        console.log(`🚀 Generando TEXTO sobre: ${topic}`);
        if (!process.env.GOOGLE_API_KEY) throw new Error("Falta GOOGLE_API_KEY");

        const geminiResponse = await googleAI.models.generateContent({
          model: "gemini-2.0-flash-exp",
          tools: [{ googleSearch: {} } as any],
          contents: [{
            role: "user",
            parts: [{
              text: `Investiga en internet sobre "${topic}" para obtener datos actuales (2025-2026).
              Luego, escribe un artículo de blog experto.
              
              Requisitos:
              - Usa la información encontrada (cita fuentes si es relevante).
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

        // @ts-ignore
        const text = geminiResponse.text ? geminiResponse.text() : (geminiResponse.response ? geminiResponse.response.text() : JSON.stringify(geminiResponse));
        if (!text) throw new Error("Gemini no devolvió texto");
        
        const blogData = JSON.parse(text);
        return NextResponse.json({ success: true, type: 'text', data: blogData });
    }

    // --- ACCIÓN 2: GENERAR IMAGEN (DALL-E 3) ---
    if (action === 'generate-image') {
        console.log(`🎨 Generando IMAGEN para: ${topic}`);
        if (!process.env.OPENAI_API_KEY) throw new Error("Falta OPENAI_API_KEY");
        
        // Usamos el prompt que nos pasó el frontend (generado por Gemini) o uno fallback
        const finalPrompt = imagePrompt || `Editorial photography, 8k, highly detailed, minimalist, modern e-commerce concept about: "${topic}". Professional studio lighting, sleek, corporate colors (neon green and black accents).`;

        const imageResponse = await openai.images.generate({
          model: "dall-e-3",
          prompt: finalPrompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
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
