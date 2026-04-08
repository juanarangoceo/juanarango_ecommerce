import { NextResponse } from "next/server";
import { Resend } from "resend";
import NitroProposalEmail from "@/emails/nitro-proposal";
import { GoogleGenAI } from "@google/genai";

const resend = new Resend(process.env.RESEND_API_KEY);

function getSectorCta(sector: string | null | undefined): { ctaUrl: string; solutionSummary: string } {
  const s = (sector ?? "").toLowerCase().trim();
  if (s.includes("inmobi") || s.includes("real") || s.includes("propiedad")) {
    return { ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria", solutionSummary: "" };
  }
  if (s.includes("ecommerce") || s.includes("tienda") || s.includes("retail")) {
    return { ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-retail", solutionSummary: "" };
  }
  return { ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria", solutionSummary: "" };
}

function getFallbackContent(companyName: string, websiteUrl: string, sectorCta: ReturnType<typeof getSectorCta>) {
  return {
    subject: `Una observación sobre la operación de ${companyName}`,
    paragraph1: `Mi nombre es Juan Arango, soy Arquitecto de Infraestructura Digital e IA. Ayudo a empresas a escalar su operación sin aumentar proporcionalmente su equipo.`,
    paragraph2: `Revisé el flujo de ${websiteUrl} desde la perspectiva de un cliente y detecté una fricción técnica que probablemente ya conocen.`,
    paragraph3: `A escala, los procesos manuales o la latencia se traducen directamente en ventas que no cierran y capital que se evapora.`,
    paragraph4: `En Nitro Ecom resolvemos esto implementando Agentes de IA 24/7 y arquitectura Headless para calificar y convertir sin fricción.`,
    paragraph5: `Preparé un diagnóstico breve donde muestro cómo se vería esto aplicado específicamente a su operación.`,
    ctaText: "Ver diagnóstico personalizado →",
    ctaUrl: sectorCta.ctaUrl,
    closingLine: "Si prefiere conversarlo directamente antes, puede responderme aquí o escribirme por WhatsApp: wa.me/573146681896",
  };
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: "RESEND_API_KEY missing" }, { status: 500 });
    if (!process.env.GOOGLE_API_KEY) return NextResponse.json({ error: "GOOGLE_API_KEY missing" }, { status: 500 });

    const body = await req.json();
    const { record } = body;
    if (!record || !record.email) return NextResponse.json({ error: "email missing" }, { status: 400 });

    const { email, full_name, company_name, sector, problem, notes, website_url } = record;
    const sectorCta = getSectorCta(sector);
    const siteUrl = (website_url && website_url.trim() !== "") ? website_url : "su plataforma";
    
    let firstName = (full_name ?? "").split(" ")[0] || "equipo";
    const companyLower = (company_name ?? "").toLowerCase();
    const fNameLower = firstName.toLowerCase();
    
    if (companyLower.includes(fNameLower) || ["inmobiliaria", "clinica", "tienda", "agencia", "constructora", "equipo", "contacto"].includes(fNameLower)) {
      firstName = "equipo";
    }
    const finalProspectName = firstName === "equipo" ? `equipo directivo de ${company_name}` : firstName;

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

    // REGLA DE ORO: Instrucciones de comportamiento, no de plantillas.
    const prompt = `
Eres Juan Arango, Arquitecto de Infraestructura Digital e IA en NITRO ECOM. Tu estilo es profesional, directo y de alta autoridad técnica, pero con un tono humano y conversacional.

TU MISIÓN: Redactar un correo de prospección único para el CEO de ${company_name}.

DATOS DEL PROSPECTO:
- Nombre/Equipo: ${finalProspectName}
- Sector: ${sector ?? "su industria"}
- PROBLEMA DETECTADO: "${problem ?? "fricción en la captación de leads"}"
- Sitio Web: ${siteUrl}

ESTRUCTURA NARRATIVA (PROHIBIDO COPIAR EJEMPLOS, REDACTA DESDE CERO):
1. Párrafo 1 (Presentación de Autoridad): Preséntate como Juan Arango. Explica brevemente que eres Arquitecto de Infraestructura e IA y que ayudas a empresas de ${sector} a escalar su operación de forma eficiente (sin inflar la nómina).
2. Párrafo 2 (Hallazgo Orgánico): Explica que entraste a ${siteUrl} con ojos de cliente y que, de manera muy natural, detectaste que tienen un reto con: ${problem}. Menciona que sospechas que ellos ya son conscientes de este cuello de botella.
3. Párrafo 3 (Impacto Financiero): Explica por qué ese problema específico es un drenaje de rentabilidad a gran escala. No uses clichés; habla de cómo se pierden oportunidades en el momento crítico.
4. Párrafo 4 (Solución Nitro): Introduce los "Agentes de IA 24/7" (y la arquitectura Headless si aplica) como la forma de automatizar ese proceso. Aclara que no es un chatbot básico, sino un sistema con su lógica de negocio.
5. Párrafo 5 (Cierre de Ingeniería): Menciona que creaste un diagnóstico visual de cómo se vería esta intervención en su marca.

REGLAS DE ORO:
- Prohibido repetir frases de correos anteriores.
- Cada párrafo debe tener máximo 2 frases (Efecto Cascada).
- Tono de consultor a CEO: Respetuoso pero señalando una falla operativa que cuesta dinero.
- Si el problema es falta de atención, enfócate en la IA. Si es lentitud, enfócate en infraestructura.

FORMATO DE RESPUESTA: ÚNICAMENTE JSON puro.
{
  "subject": "Asunto enganchador de máximo 6 palabras relacionado con su problema.",
  "paragraph1": "Presentación personalizada.",
  "paragraph2": "El hallazgo orgánico en su web.",
  "paragraph3": "Impacto financiero del problema.",
  "paragraph4": "La intervención con Agentes IA 24/7.",
  "paragraph5": "Invitación al diagnóstico.",
  "ctaText": "Ver diagnóstico personalizado →",
  "ctaUrl": "${sectorCta.ctaUrl}",
  "closingLine": "Si prefiere conversarlo directamente antes, puede responderme aquí o escribirme por WhatsApp: wa.me/573146681896"
}
`;

    let generatedData: any = {};
    const fallbackData = getFallbackContent(company_name ?? "la empresa", siteUrl, sectorCta);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      
      const parsedData = JSON.parse(response.text || "{}");
      generatedData = { ...fallbackData, ...parsedData };
    } catch (aiError) {
      console.error("[Nitro Email] AI Error:", aiError);
      generatedData = fallbackData;
    }

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
        ctaText: generatedData.ctaText,
        ctaUrl: generatedData.ctaUrl,
        closingLine: generatedData.closingLine,
      }),
    });

    return NextResponse.json({ success: true, resend_id: data.data?.id });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
