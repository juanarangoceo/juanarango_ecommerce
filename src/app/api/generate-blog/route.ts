import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, generateOnly } = body;

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const start = Date.now();
    const persona = `Eres un experto en E-commerce y Tecnología, especializado en el mercado latinoamericano (Colombia). Escribes para el blog de "Nitro Ecom" (una agencia de crecimiento para e-commerce). Tu tono es profesional, visionario, persuasivo pero educativo. Usas términos como "Growth", "Escalabilidad", "Retención", "LTV".`;

    const prompt = `
      ${persona}
      
      Escribe un artículo de blog sobre el tema: "${topic}".
      
      El formato DEBE ser un objeto JSON válido con la siguiente estructura exacta:
      {
        "title": "Un título atractivo y optimizado para SEO",
        "slug": "un-slug-optimizado-para-seo",
        "excerpt": "Un resumen corto de 140 caracteres para SEO y previews.",
        "body": "El contenido completo del artículo en formato Markdown. Usa encabezados (##, ###), listas, negritas, etc. NO incluyas el título h1 aquí."
      }
      
      Responde SOLO con el JSON. No incluyas bloques de código \`\`\`json.
    `;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const responseText = result.response.text();
    const blogData = JSON.parse(responseText);

    // 2. Check mode: If generateOnly is true, return data without saving to Sanity
    if (generateOnly) {
       return NextResponse.json({ 
        success: true, 
        data: blogData 
      });
    }

    // 3. Save to Sanity
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
      excerpt: blogData.excerpt,
      publishedAt: new Date().toISOString(),
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: blogData.body, 
            },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
    };

    const newDoc = await client.create(doc);

    return NextResponse.json({
      success: true,
      docId: newDoc._id,
      duration: Date.now() - start,
    });
  } catch (error) {
    console.error("Error generating blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
