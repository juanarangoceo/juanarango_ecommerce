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
  companyName: string,
  websiteUrl: string,
  sectorCta: ReturnType<typeof getSectorCta>
) {
  return {
    subject: `Infraestructura y escalado en ${companyName}`,
    paragraph1: `Estuve analizando la plataforma de ${websiteUrl} y es evidente que tienen un modelo de negocio con excelente tracción.`,
    paragraph2: `Sin embargo, la infraestructura técnica actual opera como un cuello de botella que genera fricción y limita el escalado acelerado.`,
    paragraph3: `Con el Nitro Protocol solucionamos esto: implementamos arquitectura "Headless" y Agentes de IA para recuperar su soberanía técnica y automatizar la captación.`,
    paragraph4: `Preparé una demo de ingeniería para que evalúen el rendimiento real que su marca debería tener bajo estos estándares.`,
    ctaText: "Ver diagnóstico de ingeniería →",
    ctaUrl: sectorCta.ctaUrl,
    closingLine: "Quedo a tu disposición para revisar la data operativa.",
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
    const siteUrl = (website_url && website_url.trim() !== "") ? website_url : "tu plataforma";
    
    // ─── Lógica para evitar nombres falsos o de empresa ──────────────────────
    let firstName = (full_name ?? "").split(" ")[0] || "equipo";
    const companyLower = (company_name ?? "").toLowerCase();
    const fNameLower = firstName.toLowerCase();
    
    // Si el nombre contiene palabras genéricas o es igual al de la empresa, usamos "equipo"
    if (
      companyLower.includes(fNameLower) || 
      ["inmobiliaria", "clinica", "tienda", "agencia", "constructora", "equipo"].includes(fNameLower)
    ) {
      firstName = "equipo";
    }

    // Ajuste sutil para el saludo en el componente React Email
    const finalProspectName = firstName.toLowerCase() === "equipo" ? `equipo de ${company_name}` : firstName;

    console.log(`[Nitro Email] Generating for ${email} | ${company_name} | sector: ${sector}`);

    // ─── Gemini AI (Nuevo SDK GenAI) ─────────────────────────────────────────
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

    const prompt = `
Eres Juan Arango, Arquitecto de Infraestructura Digital e Inteligencia Agéntica en NITRO ECOM. Tu enfoque es la eficiencia operativa y el escalado acelerado. 

Le estás escribiendo a un negocio que YA tiene tracción y hace las cosas bien, pero cuya infraestructura tecnológica actual es un cuello de botella. No vas a criticar su web diciendo que está "mal"; vas a plantear que su negocio es demasiado bueno para operar sobre una arquitectura que genera fricción.

═══ INFORMACIÓN DEL DESTINATARIO ═══
- Contacto: ${finalProspectName}
- Empresa: ${company_name ?? "su empresa"}
- Sector: ${sector ?? "negocios digitales"}
- Problema mencionado: "${problem ?? "ineficiencia operativa"}"
- Notas: "${notes ?? ""}"
- Sitio web: ${siteUrl}

═══ EL MENSAJE Y EL "POR QUÉ" ═══
1. Validación: Reconoce que tienen una excelente oferta y potencial comercial.
2. El Cuello de Botella (El Por Qué): Explica que operar sobre plataformas tradicionales crea fricción (latencia o procesos manuales). Esa fricción es capital perdido.
3. La Solución Metodológica: Introduce el "Nitro Protocol" (Arquitectura Headless + Inteligencia Agéntica) para lograr máxima soberanía técnica.

═══ INSTRUCCIONES ESTRUCTURALES (EFECTO CASCADA: 4 PÁRRAFOS) ═══
Debes escribir exactamente 4 párrafos. 
Cada párrafo DEBE SER EXTREMADAMENTE CORTO (1 o máximo 2 oraciones). Esto es vital para mantener un ritmo de lectura visual ágil. Cero bloques densos de texto.

- paragraph1 (Gancho y Validación): Menciona que estuviste analizando su plataforma y valida su potencial comercial. VE DIRECTO AL GRANO. Cero saludos iniciales.
- paragraph2 (El Problema Técnico): Señala la fricción estructural (latencia o procesos manuales) que opera como un cuello de botella.
- paragraph3 (Nitro Protocol): Presenta tu método (Headless + IA) como la intervención necesaria para escalar con eficiencia operativa.
- paragraph4 (La Demo): Invitación sobria a revisar un diagnóstico o demo de ingeniería.

═══ RESTRICCIONES DE ESTILO ABSOLUTAS ═══
- PROHIBIDO USAR: "espero que estés bien", "quería ofrecerte", "somos los mejores", "tu web está mal", "un abrazo", "saludos".
- USA TERMINOLOGÍA: Latencia, Infraestructura, Soberanía Técnica, Eficiencia Operativa, Escalado Acelerado, Nitro Protocol.
- TONO: Consultor de élite, analítico, respetuoso pero directo.

═══ FORMATO DE RESPUESTA ═══
Devuelve ÚNICAMENTE un objeto JSON puro (sin bloques markdown).
{
  "subject": "Asunto técnico e intrigante. Máx 6 palabras. Ej: Infraestructura y escalado en [Empresa]",
  "paragraph1": "Gancho técnico y validación directa.",
  "paragraph2": "Dolor operativo y el por qué del cuello de botella.",
  "paragraph3": "Nitro Protocol, Headless y Agentes de IA.",
  "paragraph4": "Invitación sobria a la Demo de Ingeniería.",
  "ctaText": "Ver diagnóstico de ingeniería →",
  "ctaUrl": "${sectorCta.ctaUrl}",
  "closingLine": "Despedida seca y profesional. Ej: Quedo a tu disposición para revisar la data técnica."
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
