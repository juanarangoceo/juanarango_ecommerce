import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const maxDuration = 60; // Allow 60 seconds for AI operations
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, generateOnly } = body;

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const start = Date.now();
    let blogData: any = null;
    let mainImageRef: string | null = null;
    let imageWarning: string | null = null;
    
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
      
      INVESTIGACIÓN (CRÍTICA): Usa la herramienta 'googleSearch' para buscar información ACTUALIZADA (2024-2025). NO uses conocimientos generales antiguos. Cita fechas y datos recientes.
      
      IMPORTANTE: El formato DEBE ser un objeto JSON válido con la siguiente estructura exacta.
      
      Estructura del JSON esperada:
      {
        "title": "Un título H1 irresistible (Max 60 caracteres) que incluya la keyword principal.",
        "slug": "slug-optimizado-seo-sin-stopwords",
        "excerpt": "Meta descripción persuasiva de 150-160 caracteres que invite al clic.",
        "content": "AQUÍ VA EL ARTÍCULO COMPLETO EN FORMATO MARKDOWN. \n\nEstructura obligatoria:\n1. **Key Takeaways**: Un bloque al inicio con los 3-5 puntos clave.\n2. **Separación**: Usa DOS saltos de línea (\\n\\n) entre cada párrafo sin excepción.\n3. **Cuerpo**: Usa encabezados ## para H2 y ### para H3.\n4. **Listas**: Usa guiones (-) para listas con espacio antes y después.\n\nContenido extenso, detallado y optimizado."
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
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash", 
        tools: [{
            googleSearch: {}
        } as any], 
    });

    // --- PARALLEL EXECUTION START ---
    
    // 1. Define Text Generation Task
    const textGenPromise = (async () => {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
        });
        const text = result.response.text();
        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
    })();

    // 2. Define Image Generation Task (Independent of Text Result)
    const imageGenPromise = (async () => {
        if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
        if (generateOnly) return null; // Skip if draft mode

        console.log("Iniciando generación de imagen paralela...");
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const imagePrompt = `Una imagen editorial moderna y minimalista para un blog de e-commerce sobre: "${topic}". Estilo fotografía de alta calidad, iluminación de estudio, sin texto, profesional, colores corporativos sutiles (verde neón y negro).`;
        
        const response = await openai.images.generate({
            model: "dall-e-3", 
            prompt: imagePrompt, 
            n: 1, 
            size: "1024x1024", 
            quality: "standard" 
        });
        
        const url = response.data?.[0]?.url;
        if (!url) throw new Error("No image URL returned");

        const imgRes = await fetch(url);
        const buffer = Buffer.from(await imgRes.arrayBuffer());
        
        return client.assets.upload('image', buffer, { filename: `blog-${Date.now()}.png` });
    })();

    // 3. Execute Both concurrently
    const [textResult, imageResult] = await Promise.allSettled([textGenPromise, imageGenPromise]);

    // 4. Process Text Result
    if (textResult.status === 'rejected') {
        throw new Error(`Fallo en generación de texto: ${textResult.reason}`);
    }
    blogData = textResult.value;

    // 5. Process Image Result
    if (imageResult.status === 'fulfilled' && imageResult.value) {
        mainImageRef = imageResult.value._id;
    } else if (imageResult.status === 'rejected') {
        console.error("Fallo imagen:", imageResult.reason);
        imageWarning = `No se pudo generar imagen: ${imageResult.reason.message || 'Error desconocido'}`;
    }

    // --- PARALLEL EXECUTION END ---

    // Return Draft if requested
    if (generateOnly) {
       return NextResponse.json({ success: true, data: blogData });
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
      mainImage: mainImageRef ? {
        _type: 'image',
        asset: {
            _ref: mainImageRef
        }
      } : undefined,
      publishedAt: new Date().toISOString(),
      content: blogData.content, 
    };

    const newDoc = await client.create(doc);

    return NextResponse.json({
      success: true,
      docId: newDoc._id,
      warning: imageWarning,
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
