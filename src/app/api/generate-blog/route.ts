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
    const { topic } = await req.json();
    if (!topic) return NextResponse.json({ error: "Falta el tema" }, { status: 400 });

    console.log(`🚀 Iniciando blog PARALELO sobre: ${topic}`);
    
    // --- 1. DEFINICIÓN DE TAREAS PARALELAS ---

    // TAREA A: Generación de Texto con Gemini
    const textPromise = (async () => {
        if (!process.env.GOOGLE_API_KEY) throw new Error("Falta GOOGLE_API_KEY");
        
        const geminiResponse = await googleAI.models.generateContent({
          model: "gemini-2.0-flash-exp",
          tools: [
            { googleSearch: {} } as any 
          ],
          contents: [
            {
              role: "user",
              parts: [
                {
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
                    "slug": "url-amigable"
                  }`
                }
              ]
            }
          ],
          config: {
            responseMimeType: "application/json", 
          },
        } as any);

        // @ts-ignore
        const generatedText = geminiResponse.text ? geminiResponse.text() : (geminiResponse.response ? geminiResponse.response.text() : JSON.stringify(geminiResponse));
        if (!generatedText) throw new Error("Gemini no devolvió texto");
        
        return JSON.parse(generatedText);
    })();

    // TAREA B: Generación de Imagen con DALL-E (Usa el topic directamente para no esperar al texto)
    const imagePromise = (async () => {
        if (!process.env.OPENAI_API_KEY) throw new Error("Falta OPENAI_API_KEY");
        
        // Prompt optimizado basado en el tema
        const imagePrompt = `Editorial photography, 8k, highly detailed, minimalist, modern e-commerce concept about: "${topic}". Professional studio lighting, sleek, corporate colors (neon green and black accents).`;

        const imageResponse = await openai.images.generate({
          model: "dall-e-3",
          prompt: imagePrompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
        });

        const imageUrl = imageResponse.data?.[0]?.url;
        if (!imageUrl) throw new Error("Fallo al generar imagen");

        const imageFetch = await fetch(imageUrl);
        const imageBuffer = await imageFetch.arrayBuffer();
        return client.assets.upload("image", Buffer.from(imageBuffer), {
          filename: `blog-cover-${Date.now()}.png`,
        });
    })();

    // --- 2. EJECUCIÓN CONCURRENTE ---
    const [textResult, imageResult] = await Promise.allSettled([textPromise, imagePromise]);

    // --- 3. PROCESAMIENTO DE RESULTADOS ---
    
    // El texto es obligatorio
    if (textResult.status === 'rejected') {
        throw new Error(`Error generando texto: ${textResult.reason}`);
    }
    const blogData = textResult.value;

    // La imagen es opcional (pero reportamos error)
    let imageAssetId = null;
    let imageWarning = null;

    if (imageResult.status === 'fulfilled') {
        imageAssetId = imageResult.value._id;
    } else {
        console.error("Error imagen:", imageResult.reason);
        imageWarning = `No se pudo generar imagen: ${imageResult.reason.message || 'Error desconocido'}`;
    }

    // --- 4. CREAMOS EL POST ---
    const slug = blogData.slug || blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 96);
    
    const newPost = await client.create({
      _type: "post",
      title: blogData.title,
      slug: { _type: "slug", current: slug },
      publishedAt: new Date().toISOString(),
      content: blogData.content, // Markdown content
      mainImage: imageAssetId ? {
        _type: "image",
        asset: { _type: "reference", _ref: imageAssetId },
      } : undefined,
    });

    return NextResponse.json({ success: true, post: newPost, warning: imageWarning });

  } catch (error: any) {
    console.error("❌ Error General:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
