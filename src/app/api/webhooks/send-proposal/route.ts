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
      solutionSummary: `Implementamos tecnología de última generación (Headless Commerce e IA) que logra que:
- Tu catálogo cargue casi al instante, para que nadie se frustre y se vaya a otro portal.
- Un sistema atienda y filtre a los interesados de forma automática, pasándole a tu equipo solo a los que de verdad van a rentar o comprar.
- Tu marca gane visibilidad en Google sin depender tanto del pago que exigen los portales tradicionales.`,
    };
  }
  if (s.includes("ecommerce") || s.includes("tienda") || s.includes("retail") || s.includes("shopify")) {
    return {
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-retail",
      solutionSummary: `Llevamos tiendas online al siguiente nivel con infraestructura avanzada (Headless) logrando que:
- La velocidad de tu página se dispare y la gente compre más rápido, reduciendo los abandonos a la mitad.
- Un asistente virtual recupere ventas perdidas hablando directamente por WhatsApp.
- Tu tienda se posicione por encima de los grandes marketplaces.`,
    };
  }
  if (s.includes("salud") || s.includes("clinica") || s.includes("estetica") || s.includes("spa")) {
    return {
      ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
      solutionSummary: `Integramos tecnología que hace tu clínica más eficiente:
- Una agenda que funciona sola y reduce cancelaciones enviando recordatorios automáticos por WhatsApp.
- Filtros inteligentes para que solo lleguen al consultorio pacientes que realmente entienden el tratamiento y pueden pagarlo.
- Seguimiento sin esfuerzo para que los pacientes vuelvan.`,
    };
  }
  // Default
  return {
    ctaUrl: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria",
    solutionSummary: `Implementamos infraestructura y automatización que:
- Hace que tu página web actúe como un vendedor estrella que nunca duerme.
- Califica a los interesados automáticamente para que tú solo hables con la gente correcta.
- Posiciona tu marca para atraer visitantes orgánicamente sin gastar una fortuna en anuncios.`,
  };
}

// ─── Fallback content ────────────────────────────────────────────────────────
function getFallbackContent(
  prospectName: string,
  companyName: string,
  sectorCta: ReturnType<typeof getSectorCta>
) {
  return {
    subject: `Tu sitio web vs. la tecnología que usan los grandes`,
    paragraph1: `Vi lo que están haciendo en ${companyName} y decidí escribirte directamente porque noté un detalle técnico que está limitando su alcance.`,
    paragraph2: `Es común ver negocios muy buenos, con excelentes servicios, pero operando sobre plataformas digitales que son simples vitrinas estáticas. Hoy en día, un sitio lento equivale a cerrarle la puerta a clientes que están listos para comprar.`,
    paragraph3: `Lo que nosotros hacemos en NITRO ECOM es integrar tecnología de punta —sistemas "Headless" ultra rápidos y asistentes automáticos con Inteligencia Artificial— que toman el control de captar y atender visitantes sin que tengas que intervenir. Suena complejo, pero en pocas palabras: hacemos que tu web no solo se vea bien, sino que trabaje y venda por ti de forma ágil.`,
    paragraph4: `Esto significa que tu tiempo se concentra en cerrar ventas y atender a clientes filtrados, no en buscar conversiones. Arreglé algo rápido para mostrarte cómo se ve esto en la práctica.`,
    ctaText: "Mira cómo funciona aquí →",
    ctaUrl: sectorCta.ctaUrl,
    closingLine: "Cualquier duda, simplemente contéstame por acá.",
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
Eres Juan Arango, experto en infraestructura digital y comercio electrónico (Headless commerce e IA) en NITRO ECOM. Llevas años ayudando a la gente a sacar el máximo provecho de su presencia digital para que sus negocios crezcan solos.

Hoy le vas a escribir un email a un potencial cliente. Háblale directamente, de tú a tú, dándole un consejo y mostrándole posibilidades.

═══ INFORMACIÓN DEL DESTINATARIO ═══
- Nombre: ${firstName}
- Empresa: ${company_name ?? "su empresa"}
- Sector: ${sector ?? "negocios digitales"}
- Problema mencionado: "${problem ?? "mejorar sus conversiones digitales"}"
- Notas: "${notes ?? ""}"
- Sitio web: ${website_url ?? "no disponible"}

═══ QUÉ DEBES TRANSMITIR (NITRO ECOM) ═══
${sectorCta.solutionSummary}
Recuerda: Tu enfoque es el headless commerce (webs que cargan en abrir y cerrar de ojos) y la automatización con IA. Pero debes explicarlo de forma coloquial, como decirle "instalamos tecnología detrás de escena para que tu web vuele y tus clientes sean atendidos automáticamente". No hables tanto de código, sino de resultados.

═══ REGLAS ABSOLUTAS DE TU REDACCIÓN ═══
1. TONO: Amistoso, consultivo, empático. Imagina que tomas un café con esta persona. Usa "nosotros en NITRO ECOM", NO "Nitro Protocol".
2. SIN SALUDOS: El template ya tiene la frase "Hola [Nombre],", así que el valor "paragraph1" DEBE ir directo al grano (ej: "Navegando por tu página me di cuenta de..."). NO arranques diciendo "Hola", ni "Saludos".
3. STORYTELLING Y CONSEJOS: Sé narrativo. No hagas listas de bullets, ni escribas frases acartonadas.
4. NADA REPETIDO: El "paragraph4" termina la idea principal e invita a ver una demo casual, pero NO repitas la misma frase del "ctaText". Deja que la transición entre el párrafo 4 y el link sea fluida.
5. LONGITUD CORTA: Máximo 4 párrafos de 2-4 líneas cada uno. Se conciso y directo.
6. ASUNTO: Intrigante, que sienta que es un email personal. Máximo 7 palabras.
7. EMPATA SU PROBLEMA: Menciona algo del problema que ellos indicaron de manera natural en la conversación.

═══ FORMATO DE RESPUESTA ═══
Devuelve ÚNICAMENTE un objeto JSON puro, sin bloques markdown (\`\`\`json).

{
  "subject": "Asunto enganchador, personal. Ej: Tu web y un detalle importante.",
  "paragraph1": "La primera frase. Arranca de una vez sin saludar. Menciona si viste su sitio o su caso. Debe ser un gancho inicial muy conversacional.",
  "paragraph2": "Empatiza con su situación o problema. Explica de forma sencilla por qué operar con métodos digitales lentos o tradicionales les está dejando dinero sobre la mesa.",
  "paragraph3": "Introduce aquí a NITRO ECOM. Explícale, sin enredarlo con términos hiper técnicos, cómo sus problemas se solucionan con arquitecturas veloces y agentes de IA conversacionales que filtren clientes.",
  "paragraph4": "Remate donde pones tu propuesta en perspectiva. Termina con una introducción suave al enlace que verán a continuación. (Ej: 'Preparé algo para que te hagas una idea.')",
  "ctaText": "Texto muy corto del enlace. Ej: 'Puedes ver la demostración aquí →'",
  "ctaUrl": "${sectorCta.ctaUrl}",
  "closingLine": "Cierre natural y simple como quien se despide en WhatsApp o por email personal."
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
