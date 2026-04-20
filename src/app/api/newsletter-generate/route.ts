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
      Eres Juan Arango (CEO de Nitro Ecom), experto en Ecommerce, Inteligencia Artificial y Automatización.
      Tu tarea es escribir un "Newsletter" muy persuasivo y conversacional basado en un artículo de tu blog.

      ESTILO Y TONO:
      - Tono muy conversacional, como si le escribieras un email a un amigo o colega.
      - Usa una buena estrategia de storytelling (cuenta una breve historia, un caso de éxito o un problema común antes de dar la solución).
      - Escribe en primera persona ("yo").
      - Sé directo, sin rodeos, con autoridad real en el tema.
      - Usa párrafos cortos (máximo 3-4 líneas por párrafo) para facilitar la lectura en móviles.
      - Puedes usar emojis sutiles, pero sin exagerar.
      
      ARTÍCULO BASE:
      Título: ${post.title}
      Contenido:
      ${postText.substring(0, 5000)} // Limitamos a 5000 chars para no saturar

      REQUISITOS DEL JSON:
      Tu respuesta DEBE ser EXCLUSIVAMENTE un objeto JSON válido con EXACTAMENTE estas 3 claves:
      1. "title": Un asunto de correo (subject line) irresistible y que genere curiosidad (máx 60 chars).
      2. "previewText": El texto de vista previa del correo (máx 90 chars).
      3. "paragraphs": Un array de strings, donde cada string es un párrafo del cuerpo del correo. NO uses formato markdown (ni negritas ni cursivas ni hashtags), solo texto plano y emojis. 

      Asegúrate de invitar al lector a leer el artículo completo en tu blog al final de la historia.
      NO incluyas backticks (\`\`\`) ni la palabra "json" en tu respuesta. Solo el JSON puro.
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
        temperature: 0.7,
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
