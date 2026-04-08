import { NextResponse } from "next/server";
import { Resend } from "resend";
import NitroProposalEmail from "@/emails/nitro-proposal";
import { GoogleGenerativeAI } from "@google/generative-ai";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Error: RESEND_API_KEY is missing");
      return NextResponse.json(
        { error: "Configuration Error: RESEND_API_KEY is missing in environment variables." },
        { status: 500 }
      );
    }
    
    if (!process.env.GOOGLE_API_KEY) {
      console.error("Error: GOOGLE_API_KEY is missing");
      return NextResponse.json(
        { error: "Configuration Error: GOOGLE_API_KEY is missing." },
        { status: 500 }
      );
    }

    const body = await req.json();

    // Supabase Webhook payload structure: { type: 'INSERT', table: 'prospects', record: { ... }, old_record: null, ... }
    const { record } = body;

    if (!record || !record.email) {
      return NextResponse.json(
        { error: "Invalid payload: 'record.email' is missing." },
        { status: 400 }
      );
    }

    const { email, full_name, company_name, sector, problem } = record;

    console.log(`Generating AI personalized proposal for ${email} (${company_name}) [Sector: ${sector}]...`);

    // --- 1. Generar copy con Gemini AI ---
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.0-flash" }); // Fast and cheap model

    const prompt = `
Eres un copywriter B2B experto en el sector inmobiliario (bienes raíces, desarrollos constructores, agencias). Tu objetivo es escribir el contenido de un correo frío/cálido para una INMOBILIARIA o CONSTRUCTORA que acaba de entrar a nuestro ecosistema.
        
Datos del prospecto inmobiliario:
- Nombre: ${full_name || "Visionario"}
- Empresa: ${company_name || "tu inmobiliaria"}
- Sector/Industria: ${sector || "Sector Inmobiliario"}
- Problema Principal reportado: "${problem || "Queremos captar mejores leads, no perder tiempo con curiosos y aumentar las ventas de propiedades."}"

Contexto de Nuestra Solución (Nitro Inmobiliaria):
Nosotros construimos "Plataformas Inmobiliarias de Alto Rendimiento". Nuestro punto fuerte es:
1. Captación Inteligente: Formularios que califican leads en automático.
2. Velocidad y SEO: Webs que cargan en menos de 1 segundo (Google Performance 90+).
3. Automatización: Integración con WhatsApp y CRM para seguimiento automático. Solo hablan con compradores listos.

Instrucciones: Escribe un copy sumamente persuasivo, súper conciso, usando psicología de ventas y resaltando cómo resolvemos su problema puntual llevándolos a ser una máquina de ventas.
Debes devolver estrictamente un objeto JSON puro (SIN bloques de código markdown como \`\`\`json).

Estructura obligatoria del JSON:
{
  "subject": "[Asunto del correo, intrigante y corto, máximo 8 palabras. Ej: Automatiza las ventas de tu inmobiliaria]",
  "headline": "[Título h1 corto. Usa la etiqueta <span className=\\"text-accent\\">palabra_clave</span> para resaltar 'ventas', 'leads' o 'rendimiento']",
  "intro": "[Párrafo introductorio (1-2 oraciones) indicando que viste su portafolio inmobiliario y detectaste una oportunidad de escalamiento.]",
  "problemParagraph": "[Párrafo (2-3 oraciones) empatizando agresiva pero profesionalmente con su Problema Principal. ¿Por qué depender de los portales de siempre, o tener una web estática, les roba ventas?]",
  "solutionBullets": [
    "[Solución específica Inmobiliaria 1 (máx 6 palabras)]",
    "[Solución específica Inmobiliaria 2 (máx 6 palabras)]",
    "[Solución específica Inmobiliaria 3 (máx 6 palabras)]"
  ],
  "ctaMessage": "[Mensaje súper corto (1 línea) invitando a ver la tecnología en acción]",
  "ctaText": "VER ESTRATEGIA INMOBILIARIA",
  "ctaUrl": "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria"
}
`;

    let generatedData = null;
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      // Limpiar markdown si Gemini lo incluyó por error
      const cleanJson = text.replace(/```json/i, '').replace(/```/i, '').trim();
      generatedData = JSON.parse(cleanJson);
    } catch (aiError) {
      console.error("Error generating AI content, falling back to default:", aiError);
      // Fallback a contenido inmobiliario si la IA falla
      generatedData = {
        subject: `Genera leads inmobiliarios calificados en automático`,
        headline: `Transforma tu web en una <span className="text-accent">Máquina de Ventas</span>`,
        intro: `Hola. He estado analizando la presencia digital de ${company_name || "tu inmobiliaria"} y existe una enorme oportunidad de dominar el posicionamiento local.`,
        problemParagraph: `Entendemos que el problema de "${problem || "captar prospectos serios"}" es frustrante. Depender de portales genéricos o de una web lenta hace que pierdas a los mejores compradores del mercado antes de que te contacten.`,
        solutionBullets: ["Captación Inteligente (IA)", "Seguimiento Automatizado", "Webs de Alto Rendimiento"],
        ctaMessage: "Mira exactamente cómo nuestra infraestructura digital multiplica tus cierres:",
        ctaText: "VER PLATAFORMA INMOBILIARIA",
        ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria"
      };
    }

    // --- 2. Enviar Email con Resend y React Email ---
    console.log(`Sending email... Subject: ${generatedData.subject}`);

    const data = await resend.emails.send({
      from: "Juan Arango Ecommerce <nitro@juanarangoecommerce.com>", 
      to: [email],
      subject: generatedData.subject,
      react: NitroProposalEmail({
        prospectName: full_name || "Visionario",
        companyName: company_name || "tu empresa",
        headline: generatedData.headline,
        intro: generatedData.intro,
        problemParagraph: generatedData.problemParagraph,
        solutionBullets: generatedData.solutionBullets,
        ctaText: generatedData.ctaText,
        ctaUrl: generatedData.ctaUrl,
        ctaMessage: generatedData.ctaMessage,
      }),
    });

    if (data.error) {
      console.error("Resend Error:", data.error);
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, ai_generated: true, data });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
