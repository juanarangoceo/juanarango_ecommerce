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
      solutionSummary: `Intervención con tecnología de última generación (Headless Commerce e IA) que logra que:
- El catálogo alcance latencia cero, eliminando la fricción estructural y el drenaje de leads.
- Un sistema agéntico pre-califique interesados con precisión quirúrgica, optimizando el tiempo del equipo comercial.
- La operación alcance soberanía técnica total para un escalado acelerado sin dependencias.`,
    };
  }
  if (s.includes("ecommerce") || s.includes("tienda") || s.includes("retail") || s.includes("shopify")) {
    return {
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-retail",
      solutionSummary: `Intervención de infraestructura avanzada (Headless) en e-commerce logrando que:
- El renderizado instantáneo elimine el drenaje de rentabilidad por carritos abandonados.
- Un agente autónomo recupere ventas perdidas con precisión operativa vía WhatsApp.
- El negocio recupere el control de su conversión con soberanía técnica total.`,
    };
  }
  if (s.includes("salud") || s.includes("clinica") || s.includes("estetica") || s.includes("spa")) {
    return {
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
      solutionSummary: `Intervención de infraestructura para máxima eficiencia operativa clínica:
- Una agenda autónoma que minimiza la fricción y reduce cancelaciones de forma quirúrgica.
- Filtros agénticos para calificar viabilidad de pacientes sin carga operativa humana.
- Soberanía técnica total sobre la retención de pacientes a escala.`,
    };
  }
  // Default
  return {
    ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
    solutionSummary: `Intervención de infraestructura y automatización que:
- Transforma la arquitectura actual en un motor de alta conversión sin latencia.
- Automatiza el filtrado de prospectos con precisión quirúrgica.
- Garantiza un escalado acelerado y eficiencia operativa sostenida.`,
  };
}

// ─── Fallback content ────────────────────────────────────────────────────────
function getFallbackContent(
  companyName: string,
  websiteUrl: string,
  sectorCta: ReturnType<typeof getSectorCta>
) {
  return {
    subject: `Informe de Auditoría: Diagnóstico de ineficiencia técnica en ${companyName}`,
    paragraph1: `Tras realizar una auditoría técnica sobre la infraestructura digital de ${websiteUrl}, he detectado una latencia estructural en el renderizado que compromete su eficiencia operativa.`,
    paragraph2: `A su volumen de operación actual, esta fricción técnica actúa como un drenaje silencioso de rentabilidad, dificultando el escalado acelerado y la conversión fluida de leads.`,
    paragraph3: `La solución para esta envergadura reside en el Nitro Protocol: una intervención hacia arquitectura "Headless" e Inteligencia Agéntica para alcanzar soberanía técnica total con precisión quirúrgica.`,
    paragraph4: `He preparado un Diagnóstico de Ingeniería específico donde visualizo cómo transformar su arquitectura actual en un motor de alta conversión.`,
    ctaText: "Ver diagnóstico de ingeniería →",
    ctaUrl: sectorCta.ctaUrl,
    closingLine: "Quedo a su disposición para analizar la viabilidad técnica y el impacto operativo de esta optimización.",
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
    
    // Si el nombre es genérico o igual al de la empresa, apuntamos a la directiva
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
Eres Juan Arango, Arquitecto de Infraestructura Digital e Inteligencia Agéntica en NITRO ECOM. 
Tu enfoque es de élite corporativa ("Whale targeting"). Le escribes al C-Level (Directores de Operaciones/CTOs) de empresas con alto volumen.

REGLA DE ORO: NO USES FLUFF. Cero halagos. No les digas que tienen "buen potencial" ni valides su negocio (ya saben que son líderes, suena a vendedor de humo). Tu misión es presentar un hallazgo de ineficiencia técnica.

═══ INFORMACIÓN DEL DESTINATARIO ═══
- Contacto: ${finalProspectName}
- Empresa: ${company_name ?? "su empresa"}
- Sector: ${sector ?? "negocios digitales"}
- Problema mencionado: "${problem ?? "ineficiencia operativa"}"
- Notas: "${notes ?? ""}"
- Sitio web: ${siteUrl}

═══ EL MENSAJE Y EL "POR QUÉ" ═══
1. El Hallazgo: Has auditado su web y detectado una "latencia estructural" o "fricción en el renderizado".
2. El Drenaje: A su volumen de operación, esa fricción no es estética, es un "drenaje silencioso de rentabilidad" que impide el escalado acelerado.
3. La Intervención: Tu método, el "Nitro Protocol" (Headless + IA), es la intervención necesaria para lograr soberanía técnica total y automatización con precisión quirúrgica.

═══ INSTRUCCIONES ESTRUCTURALES (EFECTO CASCADA: 4 PÁRRAFOS) ═══
Escribe exactamente 4 párrafos. 
Cada párrafo DEBE SER EXTREMADAMENTE CORTO (1 o máximo 2 oraciones). Mantén el ritmo visual ágil y modular.

- paragraph1 (El Hallazgo Técnico): Inicia directamente con el resultado de tu auditoría técnica en su plataforma. CERO HALAGOS INICIALES.
- paragraph2 (El Drenaje Financiero): Explica cómo este problema técnico, a su volumen de operación, actúa como un drenaje de rentabilidad.
- paragraph3 (La Intervención Nitro Protocol): Presenta la transición hacia arquitectura Headless e Inteligencia Agéntica como la intervención para lograr soberanía técnica.
- paragraph4 (El Diagnóstico): Informa que preparaste un Diagnóstico de Ingeniería específico para ellos y los invitas a visualizar el impacto.

═══ RESTRICCIONES DE ESTILO ABSOLUTAS ═══
- PROHIBIDO USAR: "espero que estés bien", "quería ofrecerte", "excelente potencial", "gran negocio", "tu web está mal".
- USA TERMINOLOGÍA CORPORATIVA: Latencia estructural, Intervención, Drenaje de rentabilidad, Precisión quirúrgica, Soberanía técnica total, Volumen de operación, Escalado acelerado.
- TONO: Clínico, de ingeniería, de C-Level a C-Level.

═══ FORMATO DE RESPUESTA ═══
Devuelve ÚNICAMENTE un objeto JSON puro (sin bloques markdown).
{
  "subject": "Asunto analítico. Máx 7 palabras. Ej: Informe de Auditoría: Ineficiencia técnica en [Empresa]",
  "paragraph1": "Auditoría y hallazgo técnico.",
  "paragraph2": "El drenaje de rentabilidad a su volumen operativo.",
  "paragraph3": "Nitro Protocol, Headless e IA como intervención.",
  "paragraph4": "Mención del diagnóstico de ingeniería.",
  "ctaText": "Ver diagnóstico de ingeniería →",
  "ctaUrl": "${sectorCta.ctaUrl}",
  "closingLine": "Despedida corporativa. Ej: Quedo a su disposición para analizar la viabilidad técnica y el impacto operativo de esta optimización."
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
        closingLine: generatedData.closingLine || "Quedo a su disposición para analizar la viabilidad técnica y el impacto operativo de esta optimización.",
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
