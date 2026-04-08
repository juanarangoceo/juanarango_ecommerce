import { NextResponse } from "next/server";
import { Resend } from "resend";
import NitroProposalEmail from "@/emails/nitro-proposal";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
      solutionSummary: `Construimos plataformas inmobiliarias que:
- Cargan en menos de 1 segundo, eliminando el rebote en móviles.
- Califican a los prospectos automáticamente, para que los asesores solo hablen con compradores reales.
- Posicionan el inventario directamente en Google, reduciendo la dependencia de portales de terceros.`,
    };
  }
  if (s.includes("ecommerce") || s.includes("tienda") || s.includes("retail") || s.includes("shopify")) {
    return {
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-retail",
      solutionSummary: `Construimos tiendas de alto rendimiento que:
- Reducen el abandono del carrito con un checkout optimizado.
- Recuperan automáticamente compradores indecisos por WhatsApp.
- Posicionan productos en Google por encima de Mercado Libre y Amazon.`,
    };
  }
  if (s.includes("salud") || s.includes("clinica") || s.includes("estetica") || s.includes("spa")) {
    return {
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
      solutionSummary: `Construimos sistemas para clínicas y centros de bienestar que:
- Gestionan la agenda con reservas automáticas y recordatorios por WhatsApp.
- Pre-califican pacientes antes de que lleguen a consulta.
- Reactivan pacientes inactivos con seguimiento automático.`,
    };
  }
  // Default
  return {
    ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
    solutionSummary: `Construimos infraestructura digital que:
- Convierte el sitio web en un sistema activo de captación, no un catálogo pasivo.
- Automatiza el seguimiento comercial para que el equipo solo hable con prospectos calificados.
- Posiciona el negocio orgánicamente para capturar tráfico sin depender de publicidad paga.`,
  };
}

// ─── Fallback content ────────────────────────────────────────────────────────
function getFallbackContent(
  prospectName: string,
  companyName: string,
  sectorCta: ReturnType<typeof getSectorCta>
) {
  return {
    subject: `${companyName} — algo que quería contarte`,
    paragraph1: `Vi lo que hacen en ${companyName} y quería escribirte directamente, porque creo que hay algo puntual que puedo aportarte.`,
    paragraph2: `Trabajando con negocios como el tuyo, me encontré con el mismo patrón una y otra vez: una operación sólida, con clientes reales, pero donde la plataforma digital está frenando el crecimiento sin que nadie se haya dado cuenta todavía.`,
    paragraph3: `No te hablo de rediseñar nada visual. Te hablo de que tu web empiece a trabajar contigo activamente — que capture, califique y haga seguimiento sin que tengas que mover un dedo.`,
    paragraph4: `Lo que hacemos se llama Nitro Protocol: una arquitectura que convierte tu presencia digital en un sistema de ventas que opera las 24 horas. ¿Vale la pena 5 minutos para que lo veas funcionando?`,
    ctaText: "Puedes ver cómo funciona aquí →",
    ctaUrl: sectorCta.ctaUrl,
    closingLine: "Si te genera alguna pregunta, responde este mismo correo. Lo leo yo.",
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

    console.log(`[Nitro Email] Generating for ${email} | ${company_name} | sector: ${sector}`);

    // ─── Gemini AI ──────────────────────────────────────────────────────────
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Eres Juan Arango, experto en infraestructura digital y e-commerce de alto rendimiento. Llevas años ayudando a negocios a transformar su presencia digital en sistemas reales de ventas.

Hoy vas a escribir un email personal a un prospecto. No es un email de marketing masivo. Es una conversación uno a uno, como si le escribieras a un contacto conocido al que quieres darle un consejo genuino.

═══ INFORMACIÓN DEL DESTINATARIO ═══
- Nombre (primer nombre solamente): ${firstName}
- Empresa: ${company_name ?? "su empresa"}
- Sector: ${sector ?? "negocios digitales"}
- Problema principal que mencionaron: "${problem ?? "mejorar sus resultados digitales"}"
- Notas adicionales: "${notes ?? "ninguna"}"
- Sitio web (si aplica): ${website_url ?? "no disponible"}

═══ LO QUE OFRECES (Nitro Protocol) ═══
${sectorCta.solutionSummary}

═══ REGLAS ABSOLUTAS DEL EMAIL ═══
1. TONO: Conversacional, cálido, experto pero accesible. Como un amigo que te da un consejo que nadie más te daría. Nunca corporativo, nunca agresivo.
2. NO menciones que "auditaste su web" ni que "detectaste su sitio a la fuerza". Más bien: notaste algo, te llamó la atención, algo te hizo querer escribirles.
3. STORYTELLING: Usa una narrativa natural. No listas de bullets. No recuadros. No frases de "He desarrollado...". Habla como persona.
4. SALUDO: El email COMIENZA con el saludo ya en el campo paragraph1 (el template ya pone "Hola [nombre],"). El paragraph1 es la primera frase real del cuerpo. NO repitas el saludo.
5. LONGITUD: Máximo 4 párrafos cortos (3-4 oraciones cada uno). La brevedad es respeto por el tiempo del otro.
6. CTA: No hay botones. Solo una frase natural que invita a ver la página. Ya está en el template como link de texto.
7. CIERRE: Una frase final humana, que invite a responder. No "Atentamente" ni cierres formales.
8. El subject debe generar curiosidad genuina sin clickbait. Máximo 7 palabras.
9. Personaliza usando el problema específico que mencionaron — demuestra que los entiendes.
10. Si hay website_url, puedes mencionar sutilmente que visitaste su sitio de forma natural y casual.

═══ FORMATO DE RESPUESTA ═══
Devuelve ÚNICAMENTE un JSON puro, sin bloques markdown (sin \`\`\`json), sin explicaciones.

{
  "subject": "Asunto del email — máx 7 palabras, genera curiosidad",
  "paragraph1": "Primera frase del cuerpo. Debe enganchar de inmediato. ¿Qué te llevó a escribir? Menciona algo específico de su negocio o sector que lo haga sentir que esto es para él, no para una lista.",
  "paragraph2": "Párrafo de empatía y contexto. Conecta con su problema real. Cuenta brevemente por qué este problema es más costoso de lo que parece. Hazlo con storytelling, no con estadísticas frías.",
  "paragraph3": "El giro natural. Sin vender todavía. Introduce qué es lo que haces, pero desde el ángulo del beneficio que obtiene él, no desde lo que tú ofreces. Una transición suave.",
  "paragraph4": "El párrafo de valor concreto. Aquí sí puedes ser más específico sobre el resultado. Menciona 1-2 cosas puntuales que les cambiaría algo real en su operación. Termina invitando a ver la demo de forma casual.",
  "ctaText": "Frase de 5-7 palabras invitando a ver la página. Ejemplos: 'Puedes ver cómo funciona aquí →' o 'Lo armé para que lo veas →'",
  "ctaUrl": "${sectorCta.ctaUrl}",
  "closingLine": "Una frase final muy corta y humana. Ej: 'Si te genera alguna pregunta, responde este mismo correo. Lo leo yo.' o 'Cuéntame qué opinas cuando puedas.'"
}
`;

    let generatedData = null;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleanJson = text
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/gi, "")
        .trim();
      generatedData = JSON.parse(cleanJson);
      console.log(`[Nitro Email] ✅ AI generation OK. Subject: "${generatedData.subject}"`);
    } catch (aiError) {
      console.error("[Nitro Email] AI failed, using fallback:", aiError);
      generatedData = getFallbackContent(firstName, company_name ?? "tu empresa", sectorCta);
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
        ctaText: generatedData.ctaText,
        ctaUrl: generatedData.ctaUrl,
        closingLine: generatedData.closingLine,
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
