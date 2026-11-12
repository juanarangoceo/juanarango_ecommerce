// Canal del vendedor de Nitro Complete. Es independiente del WhatsApp de
// clientes y del contacto legal del titular. Dato público, no una credencial.
const SALES_NUMBER = "573113005150";

export const SALES_EVALUATION_HREF = "/nitrobot/conectar";

export type JuanWhatsAppContext =
  | { kind: "hero" }
  | { kind: "demo" }
  | { kind: "kit" }
  | { kind: "plan"; planName: string }
  | { kind: "evaluation" }
  | { kind: "enterprise" }
  | { kind: "calculator"; chats: number; turns: number }
  | { kind: "guide"; title: string };

// Contrato con bot_super_admin/lib/sales/origin.ts: mantener estas frases.
export function juanWhatsAppMessage(context: JuanWhatsAppContext): string {
  switch (context.kind) {
    case "hero":
      return "Hola Juan 👋 Vengo de la página de Nitro Complete y quiero empezar con mi asesor.";
    // Demo «pruébalo con tu tienda» (NIT-218): el vendedor la reconoce por
    // esta frase exacta (WEB_PREFILLS.demo) y no la cuenta como compra.
    case "demo":
      return "Hola Juan, quiero probar el asesor de Nitro con mi tienda.";
    case "kit":
      return "Hola Juan, quiero empezar con Nitro Complete por $49.900 al mes.";
    case "plan":
      return `Hola Juan, me interesa el plan ${context.planName} de Nitro Complete.`;
    case "enterprise":
      return "Hola Juan, mi empresa necesita mayor capacidad en Nitro Complete y quiero revisar el alcance contigo.";
    case "evaluation":
      return "Hola Juan, quiero empezar con Nitro Complete.";
    case "calculator":
      return `Hola Juan, quiero revisar mi consumo de Nitro Complete. En la calculadora indiqué ${Math.round(context.chats).toLocaleString("es-CO")} conversaciones al mes y ${Math.round(context.turns)} respuestas del asesor por conversación. Son estimaciones; quiero saber si me alcanza el mes o cuánto debo recargar.`;
    // «vengo de la guía» identifica el origen; el título dice cuál. Falta la
    // regla equivalente en bot_super_admin/lib/sales/origin.ts (detectOrigin).
    case "guide":
      return `Hola Juan, vengo de la guía «${context.title.replace(/[\r\n«»]/g, " ").slice(0, 90)}» y quiero saber cómo Nitro Complete puede atender el WhatsApp de mi tienda.`;
  }
}

export function juanWhatsAppNumber(): string {
  const digits = (process.env.NEXT_PUBLIC_JUAN_WHATSAPP ?? "").replace(/\D/g, "");
  return /^[1-9]\d{10,14}$/.test(digits) ? digits : SALES_NUMBER;
}

export function juanWhatsAppHref(context: JuanWhatsAppContext, attribution?: URLSearchParams): string {
  let message = juanWhatsAppMessage(context);
  // Un enlace wa.me no transmite las UTM como lo hacía el formulario. Solo
  // añadir etiquetas de campaña conocidas y acotadas; nunca volcar la URL.
  const source = attribution?.get("utm_source")?.replace(/[\r\n]/g, " ").slice(0, 80);
  const campaign = attribution?.get("utm_campaign")?.replace(/[\r\n]/g, " ").slice(0, 120);
  if (source || campaign) message += `\nLlegué desde ${[source, campaign].filter(Boolean).join(" · ")}.`;
  return `https://wa.me/${juanWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}
