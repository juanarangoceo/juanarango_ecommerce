import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { requireInternalAuth } from "@/lib/api-auth";

// Inicialización de cliente Gemini
const googleAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const maxDuration = 30; 
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const authError = requireInternalAuth(req);
  if (authError) return authError;

  try {
    const { tag } = await req.json();
    if (!tag) return NextResponse.json({ error: "Falta el nombre de la etiqueta" }, { status: 400 });

    console.log(`🚀 Generando TAG Content sobre: ${tag}`);
    if (!process.env.GOOGLE_API_KEY) throw new Error("Falta GOOGLE_API_KEY");

    // Usamos el modelo más rápido y capaz actual
    const geminiResponse = await googleAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [{
          text: `Eres un experto en SEO y creación de contenido para la marca Nitro Ecom (blog de Juan Arango), 
          que cubre temas de ecommerce, inteligencia artificial, automatización, marketing digital, herramientas de productividad, 
          shopify, estrategia de negocios digitales y más.

          Tu estilo es: profesional pero cercano, directo, orientado a la acción, sin relleno, con autoridad real en el tema.
          Jamás uses frases genéricas como "en el mundo digital de hoy" o "en este artículo exploraremos".

          Genera una estructura de contenido SEO de alto impacto para la etiqueta/tema: "${tag}".

          Detecta automáticamente el tema real de "${tag}" (puede ser IA, shopify, marketing, automatización, SEO, prompts, ecommerce, etc.)
          y adapta TODO el contenido a ese tema específico. NO asumas que siempre es sobre ecommerce.

          IMPORTANTE: Tu respuesta DEBE ser un objeto JSON válido con EXACTAMENTE estas 5 claves:

          1. "h1": Título H1 optimizado para SEO. Debe ser específico al tema de "${tag}", atractivo, con intención de búsqueda clara. Máx 65 chars.
          2. "description": Artículo en MARKDOWN (NO HTML) de 350-450 palabras. Estructura:
             - H2 de intro (contextualiza el tema sin clichés)
             - 2-3 párrafos de valor real con perspectiva experta
             - Lista con bullet points (mínimo 4 puntos accionables)
             - H2 secundario (beneficios, casos de uso, o estrategias según aplique al tema)
             - Párrafo de cierre con llamado sutil a explorar más contenido de Nitro Ecom
             - USA **NEGRITAS** para conceptos clave importantes.
          3. "faq": Array de exactamente 3 objetos: [{"question": "...", "answer": "..."}].
             - Preguntas reales que la gente busca en Google sobre "${tag}" específicamente.
             - Respuestas directas, útiles, sin relleno (40-70 palabras por respuesta).
          4. "seoTitle": Title Tag SEO < 60 caracteres. Orientado al tema real de "${tag}". Incluye la keyword principal.
          5. "seoDescription": Meta description < 155 caracteres. Persuasiva, con la keyword y un call to action implícito.

          NO incluyas texto ni markdown fuera del JSON. Solo el objeto JSON puro.`
        }]
      }],
      config: { 
        responseMimeType: "application/json" 
      },
    } as any);

    // Extracción robusta del texto similar a generate-blog
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

    if (!generatedText) throw new Error("Gemini no devolvió datos");

    // Limpieza y Normalización
    const cleanJson = generatedText.replace(/```json\n?|```/g, '').trim();
    const rawData = JSON.parse(cleanJson);
    
    // Include all 5 fields (h1, description, faq, seoTitle, seoDescription)
    const tagData = {
        h1: rawData.h1 || "",
        description: rawData.description || "",
        faq: rawData.faq || [],
        seoTitle: rawData.seoTitle || "",
        seoDescription: rawData.seoDescription || "",
    };

    if (!tagData.description) {
        console.error("❌ Gemini devolvió JSON incompleto:", JSON.stringify(rawData));
        throw new Error("La IA no generó la descripción correctamente.");
    }
    
    return NextResponse.json({ success: true, data: tagData });

  } catch (error: any) {
    console.error("❌ Error API Tag Gen:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
