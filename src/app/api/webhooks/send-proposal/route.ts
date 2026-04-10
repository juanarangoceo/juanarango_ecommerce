import { NextResponse } from "next/server";
import { Resend } from "resend";
import NitroProposalEmail from "@/emails/nitro-proposal";
import { GoogleGenAI } from "@google/genai";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── TIPOS ───────────────────────────────────────────────────────────────────
type Sector = "clinica" | "retail" | "inmobiliaria";

interface EmailContent {
  subject: string;
  hook: string;
  observation: string;
  pain: string;
  solution: string;
  proof?: string;
  invitation: string;
  ctaText: string;
  ctaUrl: string;
  closingLine: string;
}

// ─── DETECCIÓN DE SECTOR MULTI-SEÑAL (v2) ────────────────────────────────────
// Ponderación: company_name y sector (campo explícito) tienen 3x más peso.
// Se eliminaron términos ambiguos (local, oficina, bodega) que contaminaban.
function detectSector(
  sector: string | null | undefined,
  companyName: string | null | undefined,
  problem: string | null | undefined,
  notes: string | null | undefined,
  websiteUrl: string | null | undefined
): Sector {
  // Normalizar cada fuente por separado para ponderar distinto
  const primarySources   = `${(sector ?? "").toLowerCase()} ${(companyName ?? "").toLowerCase()}`; // 3x peso
  const secondarySources = `${(problem ?? "").toLowerCase()} ${(notes ?? "").toLowerCase()} ${(websiteUrl ?? "").toLowerCase()}`; // 1x peso

  const clinicaTerms = [
    "clinic", "cl\u00ednica", "clinica", "salud", "health", "m\u00e9dico", "medico", "m\u00e9d",
    "doctor", "odonto", "dental", "veterina", "bienestar", "wellness", "spa",
    "est\u00e9tic", "estetica", "estetico", "est\u00e9tico", "cosmet", "belleza", "beauty",
    "derma", "nutri", "psicolog", "terapia", "fisio", "cirugi", "cirugía",
    "paciente", "cita", "agendam", "tratamiento", "medicina", "aesthetic",
    "quirurg", "consult", "terapeut", "massage", "masaje",
  ];

  const retailTerms = [
    "tienda", "store", "ecommerce", "e-commerce", "retail", "producto",
    "moda", "ropa", "calzado", "zapato", "joyería", "joyeria", "accesorio",
    "cat\u00e1log", "catalog", "carrito", "shopify", "woocommerce", "inventario",
    "venta en l\u00ednea", "marketplace", "despacho", "env\u00edo", "envio",
    "supermerc", "almac\u00e9n", "almacen", "ferretería", "ferreteria",
  ];

  const inmobiliariaTerms = [
    // Solo términos MUY específicos de inmobiliaria — sin ambigüedades
    "inmobi", "inmueble", "propiedad", "real estate", "realestate",
    "apartamento", "apto", "vivienda", "finca raíz", "finca raiz",
    "arriendo", "constructora", "urbanismo", "proyecto de vivienda",
    "terreno", "edificio", "conjunto residencial", "lote",
    "venta de apartamento", "venta de casa", "alquiler",
  ];

  // Score con ponderación: primary = 3 puntos, secondary = 1 punto
  let clinicaScore = 0;
  let retailScore = 0;
  let inmobiliariaScore = 0;

  for (const term of clinicaTerms) {
    if (primarySources.includes(term)) clinicaScore += 3;
    if (secondarySources.includes(term)) clinicaScore += 1;
  }
  for (const term of retailTerms) {
    if (primarySources.includes(term)) retailScore += 3;
    if (secondarySources.includes(term)) retailScore += 1;
  }
  for (const term of inmobiliariaTerms) {
    if (primarySources.includes(term)) inmobiliariaScore += 3;
    if (secondarySources.includes(term)) inmobiliariaScore += 1;
  }

  // Log para debugging en Vercel
  console.log(`[Nitro Sector] clinica=${clinicaScore} retail=${retailScore} inmobi=${inmobiliariaScore}`);

  if (clinicaScore === 0 && retailScore === 0 && inmobiliariaScore === 0) {
    return "inmobiliaria"; // fallback neutro — ninguna señal detectada
  }

  if (clinicaScore >= retailScore && clinicaScore >= inmobiliariaScore) return "clinica";
  if (retailScore >= clinicaScore && retailScore >= inmobiliariaScore) return "retail";
  return "inmobiliaria";
}

// ─── URLs POR SECTOR ─────────────────────────────────────────────────────────
function getSectorUrl(sector: Sector): string {
  const urls: Record<Sector, string> = {
    clinica: "https://www.juanarangoecommerce.com/soluciones/clinicas",
    retail: "https://www.juanarangoecommerce.com/soluciones/nitro-retail",
    inmobiliaria: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
  };
  return urls[sector];
}

// ─── PROMPTS ESPECIALIZADOS POR SECTOR (PAS + AIDA) ──────────────────────────
function buildSectorPrompt(
  sector: Sector,
  prospectName: string,
  companyName: string,
  problem: string,
  siteUrl: string,
  ctaUrl: string
): string {
  const sectorContext: Record<Sector, string> = {
    clinica: `
CONTEXTO DEL SECTOR (Salud, Clínicas, Estética, Odontología, Bienestar):
- El dolor número uno: citas perdidas por llamadas sin respuesta fuera de horario.
- El costo oculto: cada cita no agendada = ingreso perdido que no aparece en ningún reporte.
- La solución que ofrecemos: Nitro Health — un agente de IA de recepción virtual 24/7 que agenda, confirma y hace seguimiento automático. Integrado a WhatsApp y calendarios.
- Ángulo emocional: el paciente que no pudo agendar a las 10pm ya buscó otra clínica a las 10:01pm.
- Demo disponible: https://www.juanarangoecommerce.com/demos/aura-stetic`,

    retail: `
CONTEXTO DEL SECTOR (Ecommerce, Tiendas, Retail, Moda, Productos físicos):
- El dolor número uno: carritos abandonados y clientes que preguntan y no reciben respuesta en minutos.
- El costo oculto: el 70% de los carritos abandonados ocurren porque el cliente no encontró respuesta rápida. Eso no está en los reportes de Google Analytics.
- La solución que ofrecemos: Nitro Retail — agente IA conversacional 24/7 que responde, recomienda y cierra ventas en tiempo real. Arquitectura headless para velocidad de carga < 1 segundo.
- Ángulo emocional: tu competidor más lento que tú ya cerró esa venta porque respondió primero.`,

    inmobiliaria: `
CONTEXTO DEL SECTOR (Inmobiliarias, Constructoras, Finca Raíz, Arriendo, Venta):
- El dolor número uno: leads que llegan y se enfrían porque el asesor estaba ocupado o era fin de semana.
- El costo oculto: en inmobiliaria, el primer respondedor gana el 80% de los negocios. Cada lead que espera 2 horas ya habló con otra inmobiliaria.
- La solución que ofrecemos: Nitro Inmobiliaria — agente IA que califica leads automáticamente (zona, presupuesto, intención de compra) y solo pasa al asesor humano los contactos listos para cerrar.
- Ángulo emocional: tus asesores son costosos y talentosos. No deben hacer filtrado manual de prospectos fríos.`,
  };

  // Vocabulario prohibido por sector (garantiza que la IA no mezcle contextos)
  const forbiddenVocab: Record<Sector, string> = {
    clinica: "inmobiliaria, real estate, finca raíz, arriendo, lote, constructora, propiedad, apartamento, asesores inmobiliarios, leads inmobiliarios, ecommerce, carrito de compras, tienda online",
    retail: "inmobiliaria, real estate, finca raíz, arriendo, citas médicas, pacientes, consulta, agendamiento de citas, cirugía, clínica",
    inmobiliaria: "citas médicas, pacientes, salud, clínica, cirugía, carrito de compras, tienda online, ecommerce",
  };

  return `
Eres Juan Arango, Arquitecto de Infraestructura Digital e IA en NITRO ECOM.
Tu voz: es la de un consultor de alto nivel hablando con un CEO de igual a igual.
No eres un vendedor. Eres alguien que detectó una fuga de dinero en su operación y se lo está diciendo de forma directa y respetuosa.

${sectorContext[sector]}

DATOS DEL PROSPECTO:
- Nombre / Contacto: ${prospectName}
- Empresa: ${companyName}
- Problema detectado (lo que ellos dijeron): "${problem}"
- Sitio web: ${siteUrl}

TU MISIÓN: Redactar un email de prospección B2B de clase mundial para el CEO de ${companyName}.

FRAMEWORK A APLICAR (en este orden exacto):
1. HOOK — Una sola frase de máximo 15 palabras. Genera curiosidad o incomodidad inmediata. Sin saludos. Directo al CEO.
2. OBSERVATION — Revisaste ${siteUrl} con ojos de cliente y detectaste una fricción relacionada con: "${problem}". 2 frases máximo. Específico.
3. PAIN — Cuantifica lo que ese problema le cuesta (analogía, cifra estimada, comparación). 2 frases máximo. Sin clichés.
4. SOLUTION — Cómo Nitro resuelve exactamente eso. 2 frases. Menciona "Agente IA 24/7" si aplica.
5. PROOF — Estadística o patrón observado EN ESTE MISMO SECTOR (${sector}). 1 frase. NO inventes clientes. Solo habla del sector ${sector}.
6. INVITATION — Invitación suave al CTA. No "compra ya". 1-2 frases.

REGLAS ABSOLUTAS:
- NINGÚN bloque supera 2 frases.
- Tono: consultor → CEO. Directo, humano, sin relleno.
- PROHIBIDO: frases genéricas como "en el mundo digital de hoy", "en este entorno competitivo", "nos complace ofrecerte".
- El SUBJECT debe generar apertura en bandeja de entrada. Máx 7 palabras. No clickbait, pero sí tensión.
- El ctaText debe incluir el nombre de la empresa: "Ver diagnóstico para ${companyName} →"

⚠️ BARRERA DE CONTAMINACIÓN — CRÍTICO:
Este email es EXCLUSIVAMENTE para el sector: ${sector.toUpperCase()}.
QUEDA COMPLETAMENTE PROHIBIDO mencionar o aludir a: ${forbiddenVocab[sector]}.
Si en tu proof, pain, solution u observation mencionas cualquier término de otro sector, el email falla. Escribe ÚNICAMENTE en el contexto del sector ${sector}.

FORMATO DE RESPUESTA: ÚNICAMENTE JSON puro, sin bloques de código, sin comentarios.
{
  "subject": "...",
  "hook": "...",
  "observation": "...",
  "pain": "...",
  "solution": "...",
  "proof": "...",
  "invitation": "...",
  "ctaText": "Ver diagnóstico para ${companyName} →",
  "ctaUrl": "${ctaUrl}",
  "closingLine": "Si prefiere conversarlo primero, puede responderme aquí o escribirme directamente por WhatsApp: wa.me/573146681896"
}
`;
}

// ─── FALLBACKS ESPECIALIZADOS POR SECTOR ─────────────────────────────────────
function getSectorFallback(
  sector: Sector,
  companyName: string,
  siteUrl: string,
  ctaUrl: string
): EmailContent {
  const fallbacks: Record<Sector, EmailContent> = {
    clinica: {
      subject: `${companyName}: citas que se pierden de noche`,
      hook: "Cada llamada sin respuesta después de las 6pm es una cita que hizo otra clínica.",
      observation: `Revisé ${siteUrl} desde la perspectiva de un paciente nuevo y noté que la única forma de agendar es llamar en horario de oficina. Eso es un cuello de botella que ocurre justo cuando los pacientes tienen tiempo libre.`,
      pain: "En el sector salud, el 40% de las intenciones de agendar ocurren fuera del horario de atención. Cada semana sin atención automatizada es ingresos que van a la clínica que sí respondió a las 10pm.",
      solution: "En Nitro implementamos un Agente IA de recepción virtual 24/7 que agenda, confirma y hace seguimiento automático — integrado a su WhatsApp y calendario sin cambiar su flujo actual.",
      proof: "Clínicas que implementan agendamiento automático reportan una reducción del 60% en citas perdidas y un aumento del 30% en ocupación de agenda.",
      invitation: "Preparé un diagnóstico visual de cómo se vería esto en su operación. No tiene costo ni compromiso.",
      ctaText: `Ver diagnóstico para ${companyName} →`,
      ctaUrl,
      closingLine: "Si prefiere conversarlo primero, puede responderme aquí o escribirme directamente por WhatsApp: wa.me/573146681896",
    },
    retail: {
      subject: `${companyName}: ventas que cierran solas (o no cierran)`,
      hook: "El cliente que no obtiene respuesta en 5 minutos ya compró en otra tienda.",
      observation: `Navegué ${siteUrl} simulando ser un cliente con dudas sobre un producto y el tiempo de respuesta estimado superaba las horas. En ecommerce, eso es abandono seguro.`,
      pain: "El 70% de los carritos abandonados en tiendas latinoamericanas tienen una causa común: falta de respuesta inmediata a una pregunta puntual. Ese ingreso ya se fue sin aparecer en ningún reporte.",
      solution: "Nitro Retail implementa un agente conversacional IA 24/7 que responde, recomienda y cierra ventas en tiempo real — más arquitectura headless para que su tienda cargue en menos de 1 segundo.",
      proof: "Tiendas con agentes conversacionales activos reportan aumentos de hasta 35% en tasa de conversión en los primeros 90 días.",
      invitation: "Tengo un análisis listo de cómo se vería esta intervención en su tienda. Es visual y específico para su operación.",
      ctaText: `Ver diagnóstico para ${companyName} →`,
      ctaUrl,
      closingLine: "Si prefiere conversarlo primero, puede responderme aquí o escribirme directamente por WhatsApp: wa.me/573146681896",
    },
    inmobiliaria: {
      subject: `${companyName}: el lead de hoy ya habló con otra inmobiliaria`,
      hook: "En finca raíz, el primer respondedor cierra el 80% de los negocios.",
      observation: `Analicé el flujo de contacto en ${siteUrl} con ojos de comprador y el tiempo estimado de primera respuesta era manual. En el sector inmobiliario, eso significa perder el lead en el momento de mayor intención.`,
      pain: "Cada lead que espera más de 30 minutos ya contactó 2 inmobiliarias más. Sus asesores no fallan — el proceso de respuesta automática sí.",
      solution: "Nitro Inmobiliaria implementa un agente IA que califica leads automáticamente (zona, presupuesto, intención) las 24 horas. Su equipo solo habla con prospectos listos para cerrar.",
      proof: "Inmobiliarias con agentes IA de calificación automática reportan que sus asesores reducen el 70% del tiempo en filtrado y aumentan su tasa de cierre.",
      invitation: "Armé un diagnóstico de cómo se vería este sistema en su operación actual. Sin tecnicismos, directo al impacto en su equipo.",
      ctaText: `Ver diagnóstico para ${companyName} →`,
      ctaUrl,
      closingLine: "Si prefiere conversarlo primero, puede responderme aquí o escribirme directamente por WhatsApp: wa.me/573146681896",
    },
  };

  return fallbacks[sector];
}

// ─── HANDLER PRINCIPAL ────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY)
      return NextResponse.json({ error: "RESEND_API_KEY missing" }, { status: 500 });
    if (!process.env.GOOGLE_API_KEY)
      return NextResponse.json({ error: "GOOGLE_API_KEY missing" }, { status: 500 });

    const body = await req.json();
    const { record } = body;
    if (!record || !record.email)
      return NextResponse.json({ error: "email missing" }, { status: 400 });

    const { email, full_name, company_name, sector, problem, notes, website_url } = record;

    // --- Limpiar nombre de prospecto ---
    let firstName = (full_name ?? "").split(" ")[0] || "equipo";
    const companyLower = (company_name ?? "").toLowerCase();
    const fNameLower = firstName.toLowerCase();
    const genericNames = ["inmobiliaria", "clinica", "tienda", "agencia", "constructora", "equipo", "contacto", "info", "ventas", "gerencia"];
    if (companyLower.includes(fNameLower) || genericNames.includes(fNameLower)) {
      firstName = "equipo";
    }
    const finalProspectName =
      firstName === "equipo" ? `equipo directivo de ${company_name}` : firstName;

    // --- Detección inteligente de sector ---
    const detectedSector = detectSector(sector, company_name, problem, notes, website_url);
    const ctaUrl = getSectorUrl(detectedSector);
    const siteUrl = website_url?.trim() || "su plataforma digital";
    const companyDisplay = company_name ?? "su empresa";
    const problemDisplay = problem ?? "fricción en la captación de leads";

    // --- Fallback listo antes de llamar a la IA ---
    const fallbackData = getSectorFallback(detectedSector, companyDisplay, siteUrl, ctaUrl);

    let generatedData: EmailContent = fallbackData;

    // --- Generación con IA ---
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
      const prompt = buildSectorPrompt(
        detectedSector,
        finalProspectName,
        companyDisplay,
        problemDisplay,
        siteUrl,
        ctaUrl
      );

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" },
      });

      const rawText = response.text?.trim() || "{}";
      // Limpiar posibles bloques de código markdown que la IA pueda devolver
      const cleanedText = rawText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim();

      const parsed = JSON.parse(cleanedText);

      // Merge con fallback: la IA amplía, el fallback protege
      generatedData = {
        subject: parsed.subject || fallbackData.subject,
        hook: parsed.hook || fallbackData.hook,
        observation: parsed.observation || fallbackData.observation,
        pain: parsed.pain || fallbackData.pain,
        solution: parsed.solution || fallbackData.solution,
        proof: parsed.proof || fallbackData.proof,
        invitation: parsed.invitation || fallbackData.invitation,
        ctaText: parsed.ctaText || fallbackData.ctaText,
        ctaUrl: ctaUrl, // siempre usamos la URL detectada, no la de la IA
        closingLine: parsed.closingLine || fallbackData.closingLine,
      };
    } catch (aiError) {
      console.error("[Nitro Email] AI generation failed, using sector fallback:", aiError);
      generatedData = fallbackData;
    }

    // --- Envío del email ---
    const data = await resend.emails.send({
      from: "Juan Arango <nitro@juanarangoecommerce.com>",
      to: [email],
      subject: generatedData.subject,
      react: NitroProposalEmail({
        prospectName: finalProspectName,
        companyName: companyDisplay,
        sector: detectedSector,
        hook: generatedData.hook,
        observation: generatedData.observation,
        pain: generatedData.pain,
        solution: generatedData.solution,
        proof: generatedData.proof,
        invitation: generatedData.invitation,
        ctaText: generatedData.ctaText,
        ctaUrl: generatedData.ctaUrl,
        closingLine: generatedData.closingLine,
      }),
    });

    return NextResponse.json({
      success: true,
      resend_id: data.data?.id,
      sector_detected: detectedSector,
    });
  } catch (error: any) {
    console.error("[Nitro Email] Fatal error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
