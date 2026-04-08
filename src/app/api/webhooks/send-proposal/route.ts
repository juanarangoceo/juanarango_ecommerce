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
    subject: `Un detalle sobre la infraestructura de ${companyName}`,
    paragraph1: `Navegando por la plataforma de ${websiteUrl} para entender su flujo de usuarios, noté un detalle técnico en su infraestructura que está generando fricción en la captación.`,
    paragraph2: `A su volumen operativo, los procesos que requieren atención manual o las arquitecturas lentas actúan como un drenaje silencioso de rentabilidad.`,
    paragraph3: `Para solucionar esto desarrollamos el Nitro Protocol: una intervención que integra Inteligencia Agéntica y arquitecturas modernas para automatizar y acelerar su operación.`,
    paragraph4: `Preparé un diagnóstico técnico donde visualizo el impacto real de esta actualización en su marca.`,
    ctaText: "Ver diagnóstico de ingeniería →",
    ctaUrl: sectorCta.ctaUrl,
    closingLine: "Si prefiere discutir la viabilidad de esto de forma más ágil, siéntase libre de responder este correo o escribirme directamente a mi WhatsApp: wa.me/573146681896",
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
      ["inmobiliaria", "clinica", "tienda", "agencia", "constructora", "equipo", "contacto", "info", "ventas"].includes(fNameLower)
    ) {
      firstName = "equipo";
    }

    const finalProspectName = firstName === "equipo" ? `equipo directivo de ${company_name}` : firstName;

    console.log(`[Nitro Email] Generating for ${email} | ${company_name} | sector: ${sector}`);

    // ─── Gemini AI (Nuevo SDK GenAI) ─────────────────────────────────────────
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

    const prompt = `
Eres Juan Arango, Arquitecto de Infraestructura Digital e Inteligencia Agéntica. 
Tu objetivo es redactar un correo de prospección "Cold Email" de altísima conversión dirigido a C-Levels o dueños de empresas.

═══ INFORMACIÓN DEL DESTINATARIO ═══
- Contacto: ${finalProspectName}
- Empresa: ${company_name ?? "su empresa"}
- Problema central detectado: "${problem ?? "fricción operativa general"}"
- Sitio web: ${siteUrl}
- Sector: ${sector ?? "negocios digitales"}
- Resumen de tu solución: ${sectorCta.solutionSummary}

═══ LA LÓGICA CAMALEÓNICA ═══
Adapta todo tu discurso EXCLUSIVAMENTE al "Problema central detectado":
- Si el problema es "no tienen chatbot" o "falta de automatización", NO hables de carga lenta de la web. Habla de cómo la falta de respuestas inmediatas enfría a los prospectos.
- Si el problema es "web lenta", entonces SÍ habla de latencia estructural y rebote de usuarios.
- El "Nitro Protocol" es tu solución, conéctalo orgánicamente con SU problema específico.

═══ INSTRUCCIONES ESTRUCTURALES (EFECTO CASCADA: 4 PÁRRAFOS) ═══
- paragraph1 (El Descubrimiento Orgánico): Di de forma natural que estabas interactuando con su plataforma (${siteUrl}) y notaste [su problema específico]. Cero halagos.
- paragraph2 (El Drenaje de Rentabilidad): Traduce SU problema específico en pérdida de dinero u oportunidades.
- paragraph3 (La Intervención Nitro): Presenta el "Nitro Protocol" como la solución elegante a ese problema exacto.
- paragraph4 (El Gancho Dual): Menciona que preparaste un diagnóstico técnico.

═══ REGLAS ESTRICTAS DE ESTILO ═══
1. RITMO VISUAL: Extrema concisión. NINGÚN párrafo debe superar las 2 oraciones.
2. PROHIBIDO USAR: "espero que estés bien", "quería ofrecerte", "excelente potencial", "tu web está mal", saludos genéricos.
3. TONO: Natural, analítico, de consultor a directivo.

═══ FORMATO DE RESPUESTA ═══
Devuelve ÚNICAMENTE un objeto JSON puro.
{
  "subject": "Asunto natural, corto y sobre SU problema. Máx 6 palabras. Ej: Un detalle sobre la captación en [Empresa]",
  "paragraph1": "Descubrimiento orgánico del problema en su web.",
  "paragraph2": "Cómo ese problema específico frena su escalado.",
  "paragraph3": "Cómo el Nitro Protocol soluciona esto.",
  "paragraph4": "Invitación a ver el diagnóstico.",
  "ctaText": "Ver diagnóstico de ingeniería →",
  "ctaUrl": "${sectorCta.ctaUrl}",
  "closingLine": "Cierre enfocado a la respuesta. EXACTAMENTE ESTE TEXTO: 'Si prefiere discutir la viabilidad de esto de forma más ágil, siéntase libre de responder este correo o escribirme directamente a mi WhatsApp: wa.me/573146681896'"
}
`;

    let generatedData = null;

    try {
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
      generatedData = getFallbackContent(company_name ?? "tu empresa", siteUrl, sectorCta);
    }

    // ─── Send via Resend ────────────────────────────────────────────────────
    const data = await resend.emails.send({
      from: "Juan Arango <nitro@juanarangoecommerce.com>",
      to: [email],
      subject: generatedData.subject,
      react: NitroProposalEmail({
        prospectName: finalProspectName,
        companyName: company_name ?? "tu empresa",
        paragraph1: generatedData.paragraph1,
        paragraph2: generatedData.paragraph2,
        paragraph3: generatedData.paragraph3,
        paragraph4: generatedData.paragraph4,
        ctaText: generatedData.ctaText || "Ver diagnóstico de ingeniería →",
        ctaUrl: generatedData.ctaUrl || sectorCta.ctaUrl,
        closingLine: generatedData.closingLine || "Si prefiere discutir la viabilidad de esto de forma más ágil, siéntase libre de responder este correo o escribirme directamente a mi WhatsApp: wa.me/573146681896",
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
