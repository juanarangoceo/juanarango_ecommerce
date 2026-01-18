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

    console.log(`🚀 Iniciando blog sobre: ${topic}`);

    // 1. GENERAR TEXTO + INVESTIGACIÓN (GEMINI 2.0 FLASH)
    if (!process.env.GOOGLE_API_KEY) throw new Error("Falta GOOGLE_API_KEY");
    
    const geminiResponse = await googleAI.models.generateContent({
      model: "gemini-2.0-flash-exp",
      tools: [
        { googleSearch: {} } as any // Type suppression for beta feature
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
              - Incluye un "imagePrompt" detallado en inglés para DALL-E 3.
              
              Devuelve EXCLUSIVAMENTE este JSON:
              {
                "title": "Título SEO",
                "content": "Contenido completo en Markdown...",
                "imagePrompt": "Descripción visual..."
              }`
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json", 
      },
    } as any);

    // Parseo seguro del contenido
    // @ts-ignore - Handle potential SDK type mismatch
    const generatedText = geminiResponse.text ? geminiResponse.text() : (geminiResponse.response ? geminiResponse.response.text() : JSON.stringify(geminiResponse));
    
    if (!generatedText) throw new Error("Gemini no devolvió texto");
    
    const blogData = JSON.parse(generatedText);
    
    console.log("✅ Contenido generado:", blogData.title);

    // 2. GENERAR IMAGEN (DALL-E 3)
    let imageAssetId = null;
    let imageWarning = null;

    if (process.env.OPENAI_API_KEY) {
        try {
            const imageResponse = await openai.images.generate({
              model: "dall-e-3",
              prompt: `Editorial photography, 8k, highly detailed. ${blogData.imagePrompt}`,
              n: 1,
              size: "1024x1024",
              quality: "standard",
            });

            const imageUrl = imageResponse.data[0].url;
            if (!imageUrl) throw new Error("Fallo al generar imagen");

            // 3. SUBIR IMAGEN A SANITY
            const imageFetch = await fetch(imageUrl);
            const imageBuffer = await imageFetch.arrayBuffer();
            const imageAsset = await client.assets.upload("image", Buffer.from(imageBuffer), {
              filename: `blog-cover-${Date.now()}.png`,
            });
            imageAssetId = imageAsset._id;
        } catch (imgErr: any) {
            console.error("Error imagen:", imgErr);
            imageWarning = imgErr.message;
        }
    } else {
        imageWarning = "Falta OPENAI_API_KEY";
    }

    // 4. CREAR POST
    const slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 96);
    
    const newPost = await client.create({
      _type: "post",
      title: blogData.title,
      slug: { _type: "slug", current: slug },
      publishedAt: new Date().toISOString(),
      content: blogData.content, // Save to 'content' (Markdown)
      mainImage: imageAssetId ? {
        _type: "image",
        asset: { _type: "reference", _ref: imageAssetId },
      } : undefined,
    });

    return NextResponse.json({ success: true, post: newPost, warning: imageWarning });

  } catch (error: any) {
    console.error("❌ Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
