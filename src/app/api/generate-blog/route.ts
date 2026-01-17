import { GoogleGenerativeAI } from "@google/generative-ai";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // 1. Generate Content with Gemini
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" } // Force JSON output
    });

    const prompt = `
      Actúa como un experto en E-commerce y Tecnología (estilo Nitro Tech).
      Escribe un artículo de blog sobre: "${topic}".
      
      Devuelve la respuesta ESTRICTAMENTE en formato JSON con la siguiente estructura:
      {
        "title": "Un título atractivo y optimizado para SEO",
        "slug": "un-slug-optimizado-para-seo",
        "excerpt": "Un resumen corto y atractivo del artículo para redes sociales (max 160 caracteres)",
        "body": "El contenido completo del artículo en formato Markdown. Usa encabezados (##, ###), listas, y negritas para dar estructura."
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const blogData = JSON.parse(responseText);

    // 2. Save to Sanity
    // Verify we have a write token
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json({ error: "Missing SANITY_API_TOKEN for write access" }, { status: 500 });
    }

    const doc = {
      _type: "post",
      title: blogData.title,
      slug: {
        _type: "slug",
        current: blogData.slug,
      },
      publishedAt: new Date().toISOString(),
      // We map the markdown body to a simple block structure for now, 
      // or we could assume the user wants the raw markdown string if schema allowed.
      // Since the schema defines 'body' as 'array' of 'block', we need to structure it.
      // For simplicity in this 'Cerebro' mvp, we push a single block with the markdown.
      // Ideally, we would parse markdown to portable text, but that requires more deps.
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: blogData.body, // This places raw markdown in a paragraph. 
            },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
      excerpt: blogData.excerpt, // Note: Schema 'post.ts' didn't explicitly have excerpt in Prompt 1, but Prompt 2 asks for it. 
                                 // We'll save it. If schema is strict, this field might be ignored or cause error if strict validation is on.
                                 // Adding it blindly as requested.
    };

    const createdDoc = await client.create(doc);

    return NextResponse.json({ 
      success: true, 
      documentId: createdDoc._id,
      data: blogData 
    });

  } catch (error: any) {
    console.error("Cerebro API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
