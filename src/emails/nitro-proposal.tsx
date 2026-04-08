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
      solutionSummary: `Intervención de infraestructura y automatización que elimina la fuga de prospectos inmobiliarios mediante respuestas inmediatas y arquitecturas sin fricción.`,
    };
  }
  if (s.includes("ecommerce") || s.includes("tienda") || s.includes("retail") || s.includes("shopify")) {
    return {
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-retail",
      solutionSummary: `Intervención de infraestructura avanzada que acelera la conversión, elimina carritos abandonados por latencia y recupera ventas vía agentes autónomos.`,
    };
  }
  if (s.includes("salud") || s.includes("clinica") || s.includes("estetica") || s.includes("spa")) {
    return {
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
      solutionSummary: `Intervención operativa que automatiza agendas, califica pacientes mediante IA y elimina la fricción en el seguimiento clínico.`,
    };
  }
  // Default
  return {
    ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
    solutionSummary: `Intervención de infraestructura digital que automatiza el filtrado de prospectos y garantiza una operación de máxima conversión sin latencia.`,
  };
}

// ─── Fallback content ────────────────────────────────────────────────────────
function getFallbackContent(
  companyName: string,
  websiteUrl: string,
  sectorCta: ReturnType<typeof getSectorCta>
) {
  return {
    subject: `Una oportunidad de optimización en ${companyName}`,
    paragraph1: `Mi nombre es Juan Arango, soy Arquitecto de Infraestructura Digital e IA, y trabajo ayudando a empresas a escalar su operación sin aumentar proporcionalmente su equipo.`,
    paragraph2: `La razón de este correo es concreta: revisé el flujo de ${websiteUrl} desde la perspectiva de un cliente y detecté una fricción técnica que probablemente ya conocen.`,
    paragraph3: `A escala, los procesos manuales o las plataformas con tiempos de carga elevados se traducen directamente en ventas que no cierran y capital que se evapora.`,
    paragraph4: `En Nitro Ecom resolvemos esto implementando Agentes de Inteligencia Artificial 24/7 y arquitectura Headless. No son chatbots genéricos, son sistemas entrenados con su lógica de negocio para calificar y convertir sin fricción.`,
    paragraph5: `Preparé un diagnóstico breve y visual donde muestro cómo se vería esto aplicado específicamente a su operación.`,
    ctaText: "Ver diagnóstico personalizado →",
    ctaUrl: sectorCta.ctaUrl,
    closingLine: "Si prefiere conversarlo directamente antes, puede responderme aquí o escribirme por WhatsApp: wa.me/573146681896",
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
    const siteUrl = (website_url && website_url.trim() !== "") ? website_url : "su plataforma";
    
    // ─── Lógica Corporate C-Level para el Nombre ─────────────────────────────
    let firstName = (full_name ?? "").split(" ")[0] || "equipo";
    const companyLower = (company_name ?? "").toLowerCase();
    const fNameLower = firstName.toLowerCase();
    
    if (
      companyLower.includes(fNameLower) || 
      ["inmobiliaria", "clinica", "tienda", "agencia", "constructora", "equipo", "contacto"].includes(fNameLower)
    ) {
      firstName = "equipo";
    }
    
    const finalProspectName = firstName === "equipo" ? `equipo directivo de ${company_name}` : firstName;

    console.log(`[Nitro Email] Generating for ${email} | ${company_name} | sector: ${sector}`);

    // ─── Gemini AI (Nuevo SDK GenAI) ─────────────────────────────────────────
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

    const prompt = `
Eres Juan Arango, Arquitecto de Infraestructura Digital e IA en NITRO ECOM.
Tu tarea es redactar un correo persuasivo, conversacional y de élite para el CEO de una empresa.

═══ INFORMACIÓN DEL DESTINATARIO ═══
- Contacto: ${finalProspectName}
- Empresa: ${company_name ?? "la empresa"}
- Sector: ${sector ?? "su sector"}
- PROBLEMA A ATACAR: "${problem ?? "fricción en la captación y latencia"}"
- Sitio web: ${siteUrl}

═══ ESTRUCTURA PSICOLÓGICA (EL CÓMO DEBES ESCRIBIR) ═══
Aplica EXACTAMENTE este flujo narrativo, pero adaptando el contenido al "PROBLEMA A ATACAR":

1. Presentación (paragraph1): "Mi nombre es Juan Arango, soy Arquitecto de Infraestructura Digital e IA, y trabajo con marcas de [Sector] ayudándoles a escalar su operación sin aumentar proporcionalmente su equipo."
2. El Descubrimiento Empático (paragraph2): Di que revisaste el flujo de su web desde la perspectiva de un cliente y detectaste el [PROBLEMA A ATACAR]. Usa la frase: "...y detecté algo que probablemente ya conocen: [Describe el problema detectado de forma profesional]."
3. El Impacto Financiero (paragraph3): Explica cómo ese problema específico frena la conversión. Remata con: "Eso, a escala, se traduce en ventas que no cierran."
4. La Solución IA (paragraph4): Presenta tu solución. Debes mencionar explícitamente "Agentes de Inteligencia Artificial que operan 24/7". Aclara contundentemente: "No es un chatbot genérico. Es un agente entrenado con la lógica de negocio de su marca". (Adapta esto a Headless Commerce si el problema es de velocidad extrema).
5. El Gancho (paragraph5): Menciona que preparaste un diagnóstico breve y visual aplicado específicamente a su empresa.

═══ REGLAS ESTRICTAS DE ESTILO ═══
1. RITMO VISUAL: Extrema concisión. Ningún párrafo debe superar las 2 oraciones (efecto cascada).
2. TONO: Consultor premium. Empático pero directo.
3. ADAPTABILIDAD: Si el problema es "web lenta", enfócate en infraestructura Headless y pérdida de leads por carga. Si es "falta de atención", enfócate 100% en los Agentes IA 24/7.

═══ FORMATO DE RESPUESTA ═══
Devuelve ÚNICAMENTE un objeto JSON puro.
{
  "subject": "Asunto natural y conversacional. Ej: Una oportunidad que vi en [Empresa]",
  "paragraph1": "Presentación de autoridad.",
  "paragraph2": "Descubrimiento empático del problema.",
  "paragraph3": "El impacto a escala (ventas perdidas).",
  "paragraph4": "La solución: Agentes IA 24/7 / Headless.",
  "paragraph5": "Diagnóstico específico preparado.",
  "ctaText": "Ver diagnóstico personalizado →",
  "ctaUrl": "${sectorCta.ctaUrl}",
  "closingLine": "Si prefiere conversarlo directamente antes, puede responderme aquí o escribirme por WhatsApp: wa.me/573146681896"
}
`;

    let generatedData = null;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { 
          responseMimeType: "application/json" 
        }
      });
      generatedData = JSON.parse(response.text || "{}");
      console.log(`[Nitro Email] ✅ AI generation OK. Subject: "${generatedData.subject}"`);
    } catch (aiError) {
      console.error("[Nitro Email] AI failed, using fallback:", aiError);
      generatedData = getFallbackContent(company_name ?? "la empresa", siteUrl, sectorCta);
    }

    // ─── Send via Resend ────────────────────────────────────────────────────
    const data = await resend.emails.send({
      from: "Juan Arango <nitro@juanarangoecommerce.com>",
      to: [email],
      subject: generatedData.subject,
      react: NitroProposalEmail({
        prospectName: finalProspectName,
        companyName: company_name ?? "la empresa",
        paragraph1: generatedData.paragraph1,
        paragraph2: generatedData.paragraph2,
        paragraph3: generatedData.paragraph3,
        paragraph4: generatedData.paragraph4,
        paragraph5: generatedData.paragraph5,
        ctaText: generatedData.ctaText || "Ver diagnóstico personalizado →",
        ctaUrl: generatedData.ctaUrl || sectorCta.ctaUrl,
        closingLine: generatedData.closingLine || "Si prefiere conversarlo directamente antes, puede responderme aquí o escribirme por WhatsApp: wa.me/573146681896",
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
      prospect: finalProspectName,
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
