import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { requireInternalAuth } from "@/lib/api-auth";

// Inicialización de cliente Gemini
const googleAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

const VALID_CATEGORIES = [
  'chatbot', 'writing', 'image-gen', 'video', 'audio',
  'coding', 'productivity', 'design', 'marketing'
];

const CATEGORY_ICON_COLORS: Record<string, string> = {
  chatbot: 'bg-emerald-500',
  writing: 'bg-fuchsia-500',
  'image-gen': 'bg-violet-500',
  video: 'bg-orange-500',
  audio: 'bg-rose-500',
  coding: 'bg-sky-500',
  productivity: 'bg-amber-500',
  design: 'bg-cyan-500',
  marketing: 'bg-lime-500',
};

export async function POST(req: Request) {
  const authError = requireInternalAuth(req);
  if (authError) return authError;

  try {
    const { appName, websiteUrl } = await req.json();

    if (!appName) return NextResponse.json({ error: "Falta el nombre de la app" }, { status: 400 });
    if (!websiteUrl) return NextResponse.json({ error: "Falta la URL del sitio web" }, { status: 400 });

    console.log(`🚀 Generando contenido para APP: ${appName} (${websiteUrl})`);
    if (!process.env.GOOGLE_API_KEY) throw new Error("Falta GOOGLE_API_KEY");

    const geminiResponse = await googleAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [{
          text: `Eres un investigador experto en herramientas de software y aplicaciones de tecnología. 
          
Investiga la aplicación "${appName}" cuyo sitio web es ${websiteUrl}.

Tu respuesta DEBE ser un objeto JSON válido con EXACTAMENTE estas claves:

1. "slug": URL amigable derivada del nombre (ej: "chatgpt", "notion-ai", "github-copilot"). Solo letras minúsculas, números y guiones.

2. "description": Descripción corta de 1 línea (máximo 80 caracteres) que explique qué hace la app. En español.

3. "longDescription": Descripción detallada de 2-3 párrafos (200-400 caracteres) explicando qué hace la app, para quién es útil y por qué destaca. En español.

4. "category": UNA de estas categorías exactas: ${VALID_CATEGORIES.map(c => `"${c}"`).join(', ')}. Elige la más relevante.

5. "pricing": UNO de estos valores exactos: "Free", "Freemium", "Paid". Investiga el modelo de precios real.

6. "features": Un array de 5-6 strings describiendo las funcionalidades principales. En español. Cada una de 5-10 palabras.

7. "pros": Un array de 3 strings con las ventajas principales. En español.

8. "cons": Un array de 3 strings con las desventajas principales. En español.

9. "platforms": Un array con las plataformas donde está disponible. Usa valores como: "Web", "iOS", "Android", "Desktop", "Chrome Extension", "VS Code", "API", "Discord".

10. "iconBg": Una clase de TailwindCSS para el color de fondo del ícono. Debe ser una de: ${Object.values(CATEGORY_ICON_COLORS).map(c => `"${c}"`).join(', ')}. Elige el color que mejor represente la marca de la app.

11. "rating": Un número decimal entre 1.0 y 5.0 representando la calificación general de la app basada en reviews y reputación. Usa incrementos de 0.5 (ej: 4.0, 4.5, 3.5). Sé objetivo y realista.

12. "priceDetail": Un string corto describiendo el precio real de la app. Ej: "Gratis", "Desde $20/mes", "$9.99/mes", "Plan Pro: $49/mes", "Free + Pro desde $10/mes". Investiga el precio real.

IMPORTANTE: 
- Responde SOLO con el JSON puro, sin markdown ni explicaciones.
- Toda la información debe ser precisa y basada en datos reales de la app.
- El contenido debe estar en español.`
        }]
      }],
      config: {
        responseMimeType: "application/json"
      },
    } as any);

    // Extracción robusta del texto
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

    // Validar y normalizar
    const appData = {
      slug: rawData.slug || appName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: rawData.description || '',
      longDescription: rawData.longDescription || rawData.description || '',
      category: VALID_CATEGORIES.includes(rawData.category) ? rawData.category : 'productivity',
      pricing: ['Free', 'Freemium', 'Paid'].includes(rawData.pricing) ? rawData.pricing : 'Freemium',
      features: Array.isArray(rawData.features) ? rawData.features : [],
      pros: Array.isArray(rawData.pros) ? rawData.pros : [],
      cons: Array.isArray(rawData.cons) ? rawData.cons : [],
      platforms: Array.isArray(rawData.platforms) ? rawData.platforms : ['Web'],
      iconBg: rawData.iconBg || CATEGORY_ICON_COLORS[rawData.category] || 'bg-emerald-500',
      rating: typeof rawData.rating === 'number' ? Math.min(5, Math.max(0, Math.round(rawData.rating * 2) / 2)) : 4.0,
      priceDetail: rawData.priceDetail || (rawData.pricing === 'Free' ? 'Gratis' : ''),
    };

    if (!appData.description) {
      console.error("❌ Gemini devolvió JSON sin descripción:", JSON.stringify(rawData));
      throw new Error("La IA no generó descripción. Intenta de nuevo.");
    }

    console.log(`✅ Contenido generado para: ${appName}`);

    return NextResponse.json({ success: true, data: appData });

  } catch (error: any) {
    console.error("❌ Error API generate-app-content:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
