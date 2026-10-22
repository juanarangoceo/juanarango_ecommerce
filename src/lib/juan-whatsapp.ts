// Canal del vendedor de Nitro Complete. Es independiente del WhatsApp de
// clientes y del contacto legal del titular. Dato público, no una credencial.
const SALES_NUMBER = "573113005150";

export const SALES_EVALUATION_HREF = "/nitrobot/conectar";

export type JuanWhatsAppContext =
  | { kind: "hero" }
  | { kind: "kit" }
  | { kind: "plan"; planName: string }
  | { kind: "evaluation" }
  | { kind: "enterprise" }
  | { kind: "calculator"; chats: number; turns: number };

// Contrato con bot_super_admin/lib/sales/origin.ts: mantener estas frases.
export function juanWhatsAppMessage(context: JuanWhatsAppContext): string {
  switch (context.kind) {
    case "hero":
      return "Hola Juan 👋 Vengo de la página de Nitro Complete y quiero activar mi asesor con recargas.";
    case "kit":
      return "Hola Juan, quiero activar mi asesor de Nitro Complete y después recargar a mi ritmo.";
    case "plan":
      return `Hola Juan, me interesa el plan ${context.planName} de Nitro Complete.`;
    case "enterprise":
      return "Hola Juan, mi empresa necesita mayor capacidad en Nitro Complete y quiero revisar el alcance contigo.";
    case "evaluation":
      return "Hola Juan, quiero empezar con Nitro Complete sin mensualidad.";
    case "calculator":
      return `Hola Juan, quiero revisar mi consumo de Nitro Complete. En la calculadora indiqué ${Math.round(context.chats).toLocaleString("es-CO")} conversaciones al mes y ${Math.round(context.turns)} respuestas del asesor por conversación. Son estimaciones para elegir una recarga; quiero saber cómo empezar.`;
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
