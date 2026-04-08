import { NextResponse } from "next/server";
import { Resend } from "resend";
import NitroProposalEmail from "@/emails/nitro-proposal";
import { GoogleGenAI } from "@google/genai";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Sector CTA mapping ──────────────────────────────────────────────────────
function getSectorCta(sector: string | null | undefined): {
  ctaUrl: string;
  solutionSummary: string;
} {
  const s = (sector ?? "").toLowerCase().trim();

  if (s.includes("inmobi") || s.includes("real estate") || s.includes("propiedad") || s.includes("construc")) {
    return {
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
      solutionSummary: `Implementamos tecnología de última generación (Headless Commerce e IA) que logra que:
- El catálogo cargue casi al instante, eliminando la fricción y la fuga de usuarios.
- Un sistema atienda y filtre a los interesados de forma automática, pasando al equipo solo prospectos altamente cualificados.
- La marca gane autoridad digital y eficiencia operativa sin depender del gasto continuo en portales tradicionales.`,
    };
  }
  if (s.includes("ecommerce") || s.includes("tienda") || s.includes("retail") || s.includes("shopify")) {
    return {
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-retail",
      solutionSummary: `Llevamos tiendas online al siguiente nivel con infraestructura avanzada (Headless) logrando que:
- La velocidad de carga sea instantánea, acelerando la conversión y reduciendo drásticamente los carritos abandonados.
- Un agente autónomo recupere ventas perdidas operando directamente vía WhatsApp.
- El negocio logre un escalado acelerado y máxima soberanía técnica frente a la competencia.`,
    };
  }
  if (s.includes("salud") || s.includes("clinica") || s.includes("estetica") || s.includes("spa")) {
    return {
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
      solutionSummary: `Integramos tecnología que convierte la clínica en una máquina de eficiencia operativa:
- Una agenda autónoma que reduce cancelaciones con recordatorios inteligentes por WhatsApp.
- Filtros agénticos para que solo lleguen al consultorio pacientes viables y educados sobre el tratamiento.
- Seguimiento automatizado y retención de pacientes sin fricción humana.`,
    };
  }
  // Default
  return {
    ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
    solutionSummary: `Implementamos infraestructura y automatización que:
- Transforma la página web de un catálogo pasivo a un activo de alto rendimiento.
- Califica a los interesados de manera autónoma para que el equipo humano se enfoque solo en el cierre.
- Garantiza un escalado acelerado y eficiencia operativa en toda la línea de captación digital.`,
  };
}

// ─── Fallback content ────────────────────────────────────────────────────────
function getFallbackContent(
  prospectName: string,
  companyName: string,
  websiteUrl: string,
  sectorCta: ReturnType<typeof getSectorCta>
) {
  return {
    subject: `Auditoría de latencia en ${companyName}`,
    paragraph1: `Realicé una auditoría técnica en ${websiteUrl} y detecté una fuga de leads a nivel de infraestructura.`,
    paragraph2: `Esos milisegundos extra de carga operan como un freno de mano para tu negocio, traduciéndose en capital que se pierde silenciosamente por falta de eficiencia operativa.`,
    paragraph3: `En NITRO ECOM implementamos el Nitro Protocol: arquitecturas "Headless" de ultra-baja latencia y agentes autónomos que recuperan tu soberanía técnica y automatizan el filtrado comercial.`,
    paragraph4: `Preparé una demo de ingeniería para que evalúes el rendimiento real que tu plataforma debería tener bajo estos estándares.`,
    ctaText: "Ver diagnóstico de 10 minutos →",
    ctaUrl: sectorCta.ctaUrl,
    closingLine: "Quedo a tu disposición para revisar la data técnica.",
  };
}

// ─── Main handler ────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "RESEND_API_KEY missing" }, { status: 500 });
    }
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json({ error: "GOOGLE_API_KEY missing" }, { status: 500 });
    }

    const body = await req.json();
    const { record } = body;

    if (!record || !record.email) {
      return NextResponse.json({ error: "record.email missing" }, { status: 400 });
    }

    const { email, full_name, company_name, sector, problem, notes, website_url } = record;
    const sectorCta = getSectorCta(sector);
    const firstName = (full_name ?? "").split(" ")[0] || "amigo";
    const siteUrl = (website_url && website_url.trim() !== "") ? website_url : "tu plataforma";

    console.log(`[Nitro Email] Generating for ${email} | ${company_name} | sector: ${sector}`);

    // ─── Gemini AI (Nuevo SDK GenAI) ─────────────────────────────────────────
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

    const prompt = `
Eres Juan Arango, Arquitecto de Infraestructura Digital e Inteligencia Agéntica en NITRO ECOM. Tu enfoque es la Ingeniería de Rendimiento orientada al escalado acelerado y la eficiencia operativa. Consideras que una web lenta o un proceso manual es una falla de infraestructura que le cuesta dinero real al cliente. 

Tu tono es profesional, directo, analítico y de alta autoridad. Hablas como un consultor de élite que ha detectado una falla en el sistema del cliente.

═══ INFORMACIÓN DEL DESTINATARIO ═══
- Nombre: ${firstName}
- Empresa: ${company_name ?? "su empresa"}
- Sector: ${sector ?? "negocios digitales"}
- Problema mencionado: "${problem ?? "ineficiencia operativa"}"
- Notas: "${notes ?? ""}"
- Sitio web: ${siteUrl}

═══ QUÉ DEBES TRANSMITIR ═══
${sectorCta.solutionSummary}

═══ INSTRUCCIONES ESTRUCTURALES (4 PÁRRAFOS CORTOS) ═══
1. El Gancho Técnico (paragraph1): Inicia mencionando que has realizado una auditoría técnica en su sitio (${siteUrl}) y detectaste una "Latencia Crítica" o "Fuga de Leads". VE DIRECTO AL GRANO. Cero saludos (el template ya incluye el "Hola [Nombre],").
2. El Dolor Financiero (paragraph2): Traduce los milisegundos de carga o la falta de automatización en pérdida de capital o reputación. Usa la analogía de tener un "Ferrari con el freno de mano puesto" u otra metáfora de ingeniería.
3. La Solución Nitro (paragraph3): Presenta el "Nitro Protocol" (Infraestructura Headless + Agentes Autónomos de IA) como la intervención necesaria para recuperar la soberanía técnica del negocio y garantizar su escalado acelerado.
4. La Demo (paragraph4): Menciona que has preparado una "Demo de Ingeniería" para que vean el potencial real de su marca bajo tu infraestructura.

═══ RESTRICCIONES DE ESTILO ABSOLUTAS ═══
- PROHIBIDO USAR: "espero que estés bien", "quería ofrecerte", "somos los mejores", "un abrazo", "saludos", "hacer de 6 a 7 cifras".
- USA TERMINOLOGÍA TÉCNICA: Latencia, Headless, Infraestructura, Soberanía Técnica, Agentes Autónomos, Eficiencia Operativa, Escalado Acelerado.
- TONO: De "tú a tú", pero con la distancia de un experto respetado. Cero clichés de ventas.
- LONGITUD: Párrafos de máximo 3 líneas. Alta densidad de valor, cero relleno.

═══ FORMATO DE RESPUESTA ═══
Devuelve ÚNICAMENTE un objeto JSON puro (sin bloques markdown).
{
  "subject": "Asunto técnico, analítico e intrigante. Máx 6 palabras. Ej: Auditoría de latencia en [Empresa]",
  "paragraph1": "Gancho técnico directo. Sin saludar.",
  "paragraph2": "Dolor financiero y metáfora de ingeniería.",
  "paragraph3": "Nitro Protocol, Headless y Agentes de IA.",
  "paragraph4": "Invitación sobria a la Demo de Ingeniería.",
  "ctaText": "Ver diagnóstico de 10 minutos →",
  "ctaUrl": "${sectorCta.ctaUrl}",
  "closingLine": "Despedida seca y profesional. Ej: Quedo a tu disposición para revisar la data técnica."
}
`;

    let generatedData = null;

    try {
      // ─── Generación con forzado de JSON nativo ─────────────────────────────
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });
      
      generatedData = JSON.parse(response.text || "{}");
      console.log(`[Nitro Email] ✅ AI generation OK. Subject: "${generatedData.subject}"`);
    } catch (aiError) {
      console.error("[Nitro Email] AI failed, using fallback:", aiError);
      generatedData = getFallbackContent(firstName, company_name ?? "tu empresa", siteUrl, sectorCta);
    }

    // ─── Send via Resend ────────────────────────────────────────────────────
    const data = await resend.emails.send({
      from: "Juan Arango <nitro@juanarangoecommerce.com>",
      to: [email],
      subject: generatedData.subject,
      react: NitroProposalEmail({
        prospectName: firstName,
        companyName: company_name ?? "tu empresa",
        paragraph1: generatedData.paragraph1,
        paragraph2: generatedData.paragraph2,
        paragraph3: generatedData.paragraph3,
        paragraph4: generatedData.paragraph4,
        ctaText: generatedData.ctaText || "Ver diagnóstico de 10 minutos →",
        ctaUrl: generatedData.ctaUrl || sectorCta.ctaUrl,
        closingLine: generatedData.closingLine || "Quedo a tu disposición para revisar la data técnica.",
      }),
    });

    if (data.error) {
      console.error("[Nitro Email] Resend error:", data.error);
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    console.log(`[Nitro Email] ✅ Sent to ${email}. ID: ${data.data?.id}`);

    return NextResponse.json({
      success: true,
      ai_generated: true,
      prospect: firstName,
      company: company_name,
      resend_id: data.data?.id,
    });

  } catch (error: any) {
    console.error("[Nitro Email] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
