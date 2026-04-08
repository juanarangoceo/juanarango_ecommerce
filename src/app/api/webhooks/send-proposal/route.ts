import { NextResponse } from "next/server";
import { Resend } from "resend";
import NitroProposalEmail from "@/emails/nitro-proposal";
import { GoogleGenerativeAI } from "@google/generative-ai";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Multi-sector context builder ────────────────────────────────────────────
function getSectorContext(sector: string | null | undefined): {
  label: string;
  identity: string;
  painContext: string;
  solutionContext: string;
  ctaUrl: string;
  ctaText: string;
} {
  const s = (sector ?? "").toLowerCase().trim();

  if (s.includes("inmobi") || s.includes("real estate") || s.includes("propiedad") || s.includes("construc")) {
    return {
      label: "Sector Inmobiliario",
      identity: "arquitecto de sistemas para el sector inmobiliario (bienes raíces, desarrolladoras, agencias)",
      painContext: "dependencia de portales de terceros, web lentas que pierden compradores y leads de baja calidad que roban el tiempo de los asesores",
      solutionContext: `1. Captación Inteligente: IA que califica prospectos inmobiliarios 24/7 — solo hablan con compradores reales.
2. Velocidad SEO: Web que carga en <1s, capturando tráfico orgánico de compradores antes que la competencia.
3. Independencia de Portales: Plataforma propia de alto rango que reduce comisiones a portales genéricos.`,
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
      ctaText: "VER ESTRATEGIA INMOBILIARIA",
    };
  }

  if (s.includes("ecommerce") || s.includes("tienda") || s.includes("retail") || s.includes("shopify") || s.includes("venta online")) {
    return {
      label: "Sector E-commerce",
      identity: "especialista en arquitecturas de e-commerce de alto rendimiento",
      painContext: "carros de compra abandonados, tiendas lentas que Google penaliza, y clientes que se van a Amazon o Mercado Libre antes de pagar",
      solutionContext: `1. Velocidad de Conversión: Checkout optimizado que reduce el abandono de carrito hasta un 40%.
2. Recuperación Automatizada: IA que sigue a los compradores indecisos por WhatsApp y email.
3. SEO Técnico: Arquitectura headless que posiciona tus productos sobre los grandes marketplace.`,
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-retail",
      ctaText: "VER ESTRATEGIA E-COMMERCE",
    };
  }

  if (s.includes("restaurante") || s.includes("food") || s.includes("gastro") || s.includes("café") || s.includes("bar")) {
    return {
      label: "Sector Gastronómico",
      identity: "especialista en sistemas digitales para negocios gastronómicos",
      painContext: "dependencia total de plataformas de delivery que se quedan con el 30% de cada pedido, y la imposibilidad de fidelizar al cliente porque los datos son de la plataforma, no del restaurante",
      solutionContext: `1. Canal de Pedidos Propio: Plataforma directa que elimina comisiones de terceros.
2. Fidelización Automática: Sistema que recuerda pedidos recurrentes y activa promos personalizadas.
3. Reservas Inteligentes: Gestión de mesas con confirmación automática por WhatsApp.`,
      ctaUrl: "https://www.juanarangoecommerce.com",
      ctaText: "VER SISTEMA PARA RESTAURANTES",
    };
  }

  if (s.includes("salud") || s.includes("clinica") || s.includes("medic") || s.includes("estetica") || s.includes("spa") || s.includes("aesthetic")) {
    return {
      label: "Sector Salud & Bienestar",
      identity: "especialista en sistemas de captación digital para clínicas y centros de bienestar",
      painContext: "agenda desorganizada que depende de llamadas manuales, pacientes que no completan su ciclo de tratamiento y ausencia de un sistema que capture y retenga prospectos calificados",
      solutionContext: `1. Agenda Inteligente: Reservas online con confirmación y recordatorio automático por WhatsApp.
2. Pre-calificación de Pacientes: IA que filtra y educa al prospecto antes de que llegue a consulta.
3. Sistema de Retención: Seguimiento post-tratamiento automatizado que aumenta la recurrencia.`,
      ctaUrl: "https://www.juanarangoecommerce.com",
      ctaText: "VER SISTEMA PARA CLÍNICAS",
    };
  }

  if (s.includes("servicio") || s.includes("agencia") || s.includes("consultor") || s.includes("b2b") || s.includes("legal") || s.includes("financier")) {
    return {
      label: "Sector Servicios B2B",
      identity: "arquitecto de sistemas de captación B2B",
      painContext: "dependencia del boca a boca, ausencia de un pipeline predecible de nuevos clientes y sitios web que actúan como brochure en lugar de como un sistema activo de generación de negocio",
      solutionContext: `1. Autoridad Digital: Presencia de alto rendimiento que posiciona tu expertise antes de la primera llamada.
2. Pipeline Automatizado: Sistema que califica y nutre leads B2B en piloto automático.
3. Conversión Consultiva: IA que educa al prospecto y acorta el ciclo de venta.`,
      ctaUrl: "https://www.juanarangoecommerce.com",
      ctaText: "VER SISTEMA B2B",
    };
  }

  // Default — genérico
  return {
    label: "Estrategia Digital",
    identity: "arquitecto de sistemas de alto rendimiento digital",
    painContext: "fuga de clientes potenciales por plataformas lentas, ausencia de automatización y dependencia de canales que no controlan",
    solutionContext: `1. Infraestructura de Alto Rendimiento: Plataforma que carga en <1s y convierte visitas en oportunidades reales.
2. Captación Agéntica: IA que pre-califica a los interesados 24/7, entregando solo leads con perfil real.
3. Automatización Comercial: Seguimiento inteligente que mantiene el pipeline activo sin intervención manual.`,
    ctaUrl: "https://www.juanarangoecommerce.com",
    ctaText: "VER DIAGNÓSTICO TÉCNICO",
  };
}

// ─── Fallback content ─────────────────────────────────────────────────────────
function getFallbackContent(
  company_name: string | null,
  problem: string | null,
  ctx: ReturnType<typeof getSectorContext>
) {
  return {
    subject: `Auditoría digital de ${company_name ?? "tu empresa"} — resultados`,
    headline: `Tu plataforma puede convertirse en tu mejor <span className="text-accent">vendedor</span>`,
    intro: `He analizado la presencia digital de ${company_name ?? "tu empresa"} y existe una oportunidad clara de escalar resultados que hoy se están dejando sobre la mesa.`,
    hallazgoPrincipal: `La infraestructura actual no está capturando ni convirtiendo el tráfico disponible al ritmo que el mercado demanda.`,
    problemParagraph: `Entendemos que el problema de "${problem ?? "crecer sin depender de canales costosos"}" es frustrante. ${ctx.painContext.charAt(0).toUpperCase() + ctx.painContext.slice(1)} está frenando el crecimiento real del negocio.`,
    solutionBullets: ["Captación Inteligente 24/7", "Automatización Comercial", "Infraestructura de Alto Rendimiento"],
    urgencyLine: "Cada semana sin este sistema es una semana entregándole clientes a la competencia.",
    ctaMessage: "He preparado una demo técnica de cómo se vería tu negocio operando bajo el motor Nitro:",
    ctaText: ctx.ctaText,
    ctaUrl: ctx.ctaUrl,
    sectorLabel: ctx.label,
  };
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Error: RESEND_API_KEY is missing");
      return NextResponse.json(
        { error: "Configuration Error: RESEND_API_KEY is missing." },
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

    // Supabase Webhook payload: { type: 'INSERT', table: 'prospects', record: { ... } }
    const { record } = body;

    if (!record || !record.email) {
      return NextResponse.json(
        { error: "Invalid payload: 'record.email' is missing." },
        { status: 400 }
      );
    }

    const { email, full_name, company_name, sector, problem, notes, website_url } = record;

    // Get sector-specific context
    const sectorCtx = getSectorContext(sector);

    console.log(`[Nitro Email] Generating AI proposal for ${email} | Company: ${company_name} | Sector: ${sectorCtx.label}`);

    // ─── 1. Generate copy with Gemini AI ──────────────────────────────────────
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Eres ${sectorCtx.identity}. Tu misión es escribir el contenido de un email de prospección B2B altamente personalizado y persuasivo. Este email puede ser el primer y único contacto con este cliente — cada palabra importa.

═══ DATOS DEL PROSPECTO ═══
- Nombre: ${full_name ?? "Director/Dueño"}
- Empresa: ${company_name ?? "la empresa"}
- Sitio web (si aplica): ${website_url ?? "No disponible"}
- Sector/Industria: ${sector ?? sectorCtx.label}
- Problema principal declarado: "${problem ?? "mejorar resultados digitales"}"
- Notas adicionales: "${notes ?? "Sin notas adicionales"}"

═══ CONTEXTO DE NUESTRA SOLUCIÓN (Nitro Protocol) ═══
${sectorCtx.solutionContext}

═══ INSTRUCCIONES DE COPYWRITING ═══
1. El tono debe ser: experto, directo y levemente urgente. NO agresivo, NO corporativo genérico.
2. Habla ESPECÍFICAMENTE del problema declarado — demuestra que lo entiendes mejor que ellos.
3. Si hay website_url disponible, menciona que realizaste una "auditoría técnica automatizada" sobre su sitio.
4. El hallazgoPrincipal debe sonar técnico y específico — como si realmente hubieras analizado su sitio/negocio.
5. La urgencyLine debe crear FOMO sin ser sensacionalista.
6. Los solutionBullets deben ser específicos al sector, máximo 8 palabras cada uno.
7. El subject del email debe ser corto (máx 9 palabras), intrigante, que genere la apertura del email.

═══ FORMATO DE RESPUESTA ═══
Devuelve ÚNICAMENTE un objeto JSON puro, SIN bloques de código markdown (sin \`\`\`json), sin explicaciones adicionales.

Estructura obligatoria:
{
  "subject": "Asunto del email — corto, intrigante, máx 9 palabras",
  "headline": "Título h1 del email — usa la etiqueta <span className=\\"text-accent\\">palabra_clave</span> para resaltar 1 término clave",
  "intro": "Párrafo introductorio de 1-2 oraciones. Si hay sitio web, menciona la auditoría técnica.",
  "hallazgoPrincipal": "1 oración contundente describiendo el hallazgo técnico más crítico encontrado. Debe sonar específico y urgente.",
  "problemParagraph": "2-3 oraciones empatizando con su problema específico declarado. ¿Por qué este problema les está costando dinero HOY?",
  "solutionBullets": [
    "Solución específica al sector 1 (máx 8 palabras)",
    "Solución específica al sector 2 (máx 8 palabras)",
    "Solución específica al sector 3 (máx 8 palabras)"
  ],
  "urgencyLine": "1 oración de urgencia o escasez personalizada. Sin exclamaciones.",
  "ctaMessage": "1-2 oraciones invitando a ver la demo o el diagnóstico. Cierra con energía.",
  "ctaText": "${sectorCtx.ctaText}",
  "ctaUrl": "${sectorCtx.ctaUrl}",
  "sectorLabel": "${sectorCtx.label}"
}
`;

    let generatedData = null;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      // Strip any accidental markdown code fences
      const cleanJson = text
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/gi, "")
        .trim();
      generatedData = JSON.parse(cleanJson);
      console.log(`[Nitro Email] AI generation successful. Subject: "${generatedData.subject}"`);
    } catch (aiError) {
      console.error("[Nitro Email] AI generation failed, using fallback:", aiError);
      generatedData = getFallbackContent(company_name, problem, sectorCtx);
    }

    // ─── 2. Send email via Resend + React Email ─────────────────────────────
    const data = await resend.emails.send({
      from: "Juan Arango | Nitro Ecom <nitro@juanarangoecommerce.com>",
      to: [email],
      subject: generatedData.subject,
      react: NitroProposalEmail({
        prospectName: full_name ?? "Visionario",
        companyName: company_name ?? "tu empresa",
        sectorLabel: generatedData.sectorLabel ?? sectorCtx.label,
        websiteUrl: website_url ?? undefined,
        headline: generatedData.headline,
        intro: generatedData.intro,
        hallazgoPrincipal: generatedData.hallazgoPrincipal,
        problemParagraph: generatedData.problemParagraph,
        solutionBullets: generatedData.solutionBullets,
        urgencyLine: generatedData.urgencyLine,
        ctaText: generatedData.ctaText,
        ctaUrl: generatedData.ctaUrl,
        ctaMessage: generatedData.ctaMessage,
      }),
    });

    if (data.error) {
      console.error("[Nitro Email] Resend error:", data.error);
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    console.log(`[Nitro Email] ✅ Email sent successfully to ${email}. Resend ID: ${data.data?.id}`);

    return NextResponse.json({
      success: true,
      ai_generated: true,
      sector: sectorCtx.label,
      resend_id: data.data?.id,
    });

  } catch (error: any) {
    console.error("[Nitro Email] Webhook Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
