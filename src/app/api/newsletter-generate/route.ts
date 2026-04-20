import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "next-sanity";

const googleAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { newsletterId, postId } = await req.json();

    if (!newsletterId || !postId) {
      return NextResponse.json(
        { success: false, error: "Faltan parámetros (newsletterId o postId)" },
        { status: 400 }
      );
    }

    console.log(`🚀 Generando Newsletter para postId: ${postId}`);

    // 1. Obtener el post de Sanity
    const post = await sanityClient.fetch(
      `*[_type == "post" && _id == $postId][0]{ title, content, body }`,
      { postId }
    );

    if (!post) {
      return NextResponse.json(
        { success: false, error: "No se encontró el artículo base." },
        { status: 404 }
      );
    }

    // Convertir el body (Portable Text) a texto plano o usar content (Markdown)
    let postText = post.content || "";
    if (!postText && post.body && Array.isArray(post.body)) {
      postText = post.body
        .filter((block: any) => block._type === "block" && block.children)
        .map((block: any) => block.children.map((child: any) => child.text).join(""))
        .join("\n\n");
    }

    if (!postText) {
      return NextResponse.json(
        { success: false, error: "El artículo base no tiene contenido." },
        { status: 400 }
      );
    }

    // 2. Ejecutar Gemini
    if (!process.env.GOOGLE_API_KEY) throw new Error("Falta GOOGLE_API_KEY");

    const prompt = `
Eres Juan Arango, fundador de Nitro Ecom. Escribes newsletters diarias para tu audiencia de emprendedores, tiendas online y makers de habla hispana.

Tu newsletter se llama "Nitro Newsletter". La gente la abre porque confía en que vas directo al grano, compartes lo que realmente usas, y conectas de verdad. No suenas como un blog corporativo. Suenas como el amigo experto que todos quisieran tener.

────────────────────────────────────────
REGLAS DE ESCRITURA (NO NEGOCIABLES)
────────────────────────────────────────

1. NUNCA empieces con "Hola soy Juan" ni con presentaciones. Arranca directo con un GANCHO poderoso. Puede ser:
   - Una pregunta incómoda ("¿Cuánto dinero dejaste ir la semana pasada por no automatizar esto?")
   - Un dato sorprendente ("El 73% de las tiendas Shopify tienen este problema y ni lo saben.")
   - Una confesión corta ("Cometí un error caro hace 3 meses. Hoy te lo cuento.")
   - Una afirmación disruptiva ("Las APIs de OpenAI te están cobrando de más. Y hay una salida.")

2. PÁRRAFOS ULTRABREVES. Máximo 2 líneas por párrafo. Punto. Baja. Sigue.
   - Esta técnica se llama "párrafos cortos + bajas" y es la clave de la lectura fluida en móvil.
   - Cada párrafo es una idea. No metas dos ideas en el mismo párrafo.

3. RITMO VARIABLE. Alterna párrafos de 1 línea con párrafos de 2 líneas. Alguna frase de impacto sola, sin más.
   Ejemplo: "Era todo o nada."

4. STORYTELLING PRIMERO. El cuerpo sigue esta estructura:
   - Gancho (1-2 líneas que generen curiosidad o tensión)
   - Contexto/historia breve (qué pasó, qué descubriste, qué problema viste)
   - La revelación o el giro (aquí está el valor real)
   - Consecuencias / por qué importa ahora
   - Cierre con llamado claro a leer el artículo completo

5. EMOJIS: úsalos con moderación, solo cuando refuercen la emoción. Máximo 3-4 en todo el email.

6. LONGITUD TOTAL: entre 180 y 280 palabras repartidas en 10 a 16 párrafos cortos.

7. TONO: primera persona ("yo", "me", "mi"). Nunca en tercera persona. Nunca genérico.

8. PROHIBIDO:
   - "En el mundo digital de hoy..."
   - "En este artículo exploraremos..."
   - "Es importante destacar que..."
   - Cualquier frase que suene a blog de SEO.
   - Párrafos de más de 3 líneas.
   - Frases pasivas o impersonales.

────────────────────────────────────────
ARTÍCULO BASE:
────────────────────────────────────────
Título: ${post.title}
Contenido:
${postText.substring(0, 5000)}

────────────────────────────────────────
FORMATO DE SALIDA (JSON PURO)
────────────────────────────────────────
Devuelve ÚNICAMENTE un objeto JSON válido con estas 3 claves:

{
  "title": "Asunto del email. Corto, curioso, que provoque apertura. Máx 55 chars.",
  "previewText": "El texto que aparece debajo del asunto. Máx 85 chars. Debe ampliar el gancho, no repetirlo.",
  "paragraphs": [
    "Párrafo 1 (el gancho, máx 2 líneas)",
    "Párrafo 2 (segunda idea, max 2 líneas)",
    "..."
  ]
}

Cada elemento del array "paragraphs" es UN párrafo individual. Solo texto plano (sin markdown, sin asteriscos, sin ##). Emojis permitidos con moderación.
NO incluyas backticks, ni la palabra json, ni comentarios. Solo el JSON puro.
    `;

    const geminiResponse = await googleAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.85,
      },
    } as any);

    let generatedText = "";
    // @ts-ignore
    if (typeof geminiResponse.text === "function") {
      // @ts-ignore
      generatedText = geminiResponse.text();
    } else if (typeof geminiResponse.text === "string") {
      generatedText = geminiResponse.text;
    } else if (geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text) {
      generatedText = geminiResponse.candidates[0].content.parts[0].text;
    } else {
      generatedText = JSON.stringify(geminiResponse);
    }

    if (!generatedText) throw new Error("Gemini no devolvió datos");

    const cleanJson = generatedText.replace(/```json\n?|```/g, "").trim();
    const rawData = JSON.parse(cleanJson);

    if (!rawData.paragraphs || !Array.isArray(rawData.paragraphs)) {
      throw new Error("El JSON de Gemini no contiene el array de paragraphs");
    }

    // 3. Convertir el array de párrafos a bloques de Portable Text de Sanity
    const bodyBlocks = rawData.paragraphs.map((text: string) => {
      // Generar una key única aleatoria de 12 caracteres (lo usual en Sanity)
      const generateKey = () => Math.random().toString(36).substring(2, 14);
      return {
        _key: generateKey(),
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: generateKey(),
            _type: "span",
            text: text,
            marks: [],
          },
        ],
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        title: rawData.title || post.title,
        previewText: rawData.previewText || "",
        bodyBlocks,
      },
    });
  } catch (error: any) {
    console.error("❌ Error API Newsletter Gen:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
