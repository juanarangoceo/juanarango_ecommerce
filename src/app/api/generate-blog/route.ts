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
    
    // Mega Prompt Definition
    const persona = `Eres un experto Copywriter Senior y Especialista en SEO con más de 10 años de experiencia posicionando marcas en el mercado hispano (Latinoamérica y España).
    
    Tu misión es escribir artículos de blog para "Nitro Ecom" (agencia de crecimiento para e-commerce) que sean:
    1. **Extremadamente Persuasivos y Atractivos**: Usas técnicas de Storytelling, ganchos emocionales y un tono conversacional pero profesional.
    2. **Optimizados para SEO (On-Page)**: Estructura perfecta de H1, H2, H3, uso natural de keywords LSI y respuesta a la intención de búsqueda.
    3. **Lectura Agradable**: Párrafos cortos, uso de negritas para resaltar ideas clave, y ritmo dinámico.
    
    Tu tono es: Visionario, Autoridad en la materia, pero cercano. Evita el lenguaje corporativo aburrido. Usa palabras poderosas como "Estrategia", "Dominación", "Rentabilidad", "Secreto", "Transformación".`;

    const prompt = `
      ${persona}
      
      Escribe un artículo de blog MAESTRO sobre el tema: "${topic}".
      
      IMPORTANTE: El formato DEBE ser un objeto JSON válido con la siguiente estructura exacta.
      
      Estructura del JSON esperada:
      {
        "title": "Un título H1 irresistible (Max 60 caracteres) que incluya la keyword principal.",
        "slug": "slug-optimizado-seo-sin-stopwords",
        "excerpt": "Meta descripción persuasiva de 150-160 caracteres que invite al clic.",
        "excerpt": "Meta descripción persuasiva de 150-160 caracteres que invite al clic.",
        "content": "AQUÍ VA EL ARTÍCULO COMPLETO EN FORMATO MARKDOWN. \n\nEructura obligatoria:\n1. **Key Takeaways**: Un bloque al inicio con los 3-5 puntos clave, formateado como una lista o blockquote.\n2. **Introducción**.\n3. **Cuerpo**: Usa encabezados ## para H2 y ### para H3.\n4. **Conclusión**.\n\nUsa **negritas**, *cursivas*, > blockquotes y - listas. El contenido debe ser extenso, detallado y optimizado para SEO."
      }
      
      Reglas para el campo 'content' (Markdown):
      - Escribe MÍNIMO 800 palabras.
      - Usa la estructura de Markdown correctamente.
      - INCLUYE SIEMPRE una sección de 'Key Takeaways' al principio.
      - NO incluyas el título H1 al principio del markdown, ya que se renderiza por separado. Empieza directamente con los Key Takeaways o la introducción.
      - Asegúrate de que el markdown sea válido.
      
      Responde SOLO con el JSON. No incluyas bloques de código \`\`\`json.
    `;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const responseText = result.response.text();
    const blogData = JSON.parse(responseText);

    // If generateOnly (Client-side handling), return the structured data directly
    if (generateOnly) {
       return NextResponse.json({ 
        success: true, 
        data: blogData 
      });
    }

    // Server-side saving (fallback or if direct call)
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
      content: blogData.content, // Save the markdown content directly
      // body is now optional or secondary, we rely on content for AI posts
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
