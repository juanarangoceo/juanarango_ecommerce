"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

/**
 * Lead calificado de NitroBot.
 *
 * A diferencia del formulario genérico, este captura señales de calificación
 * (volumen de WhatsApp, quién atiende hoy, objetivo) para que podamos ver de
 * inmediato si quien escribe es nuestro cliente ideal. Reutiliza la tabla
 * `leads` existente: el detalle estructurado va en `interest` y `message`,
 * sin necesidad de migración.
 */

/** Califica el fit del lead según el volumen de conversaciones (valores exactos del formulario). */
function calcularFit(volume: string): { etiqueta: string; emoji: string } {
  switch (volume) {
    case "Más de 150":
      return { etiqueta: "Cliente ideal — alto volumen", emoji: "🔥" };
    case "50 a 150":
      return { etiqueta: "Buen fit", emoji: "✅" };
    case "20 a 50":
      return { etiqueta: "Fit medio", emoji: "🟢" };
    default:
      return { etiqueta: "A evaluar — volumen bajo", emoji: "🟡" };
  }
}

export async function submitNitrobotLead(formData: FormData) {
  const get = (k: string) => ((formData.get(k) as string) || "").trim();

  const name = get("name");
  const company = get("company");
  const whatsapp = get("whatsapp");
  const email = get("email");
  const sector = get("sector");
  const volume = get("volume");
  const whoAttends = get("whoAttends");
  const goal = get("goal");

  if (!name || !whatsapp || !email) {
    return { error: "Faltan campos requeridos (nombre, WhatsApp y email)." };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase Configuration");
    return { error: "Error de configuración del servidor (Supabase Keys missing)." };
  }

  const fit = calcularFit(volume);

  // Resumen estructurado para guardar en la tabla `leads` (campo `message`).
  const interest = `NitroBot · ${goal || "Sin objetivo definido"}`;
  const message = [
    `📱 WhatsApp: ${whatsapp}`,
    `🏭 Sector: ${sector || "No especificado"}`,
    `💬 Volumen diario de WhatsApp: ${volume || "No especificado"}`,
    `🙋 Quién atiende hoy: ${whoAttends || "No especificado"}`,
    `🎯 Objetivo con NitroBot: ${goal || "No especificado"}`,
    `${fit.emoji} Calificación: ${fit.etiqueta}`,
  ].join("\n");

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error: dbError } = await supabase.from("leads").insert({
      name,
      email,
      company,
      interest,
      message,
    });

    if (dbError) {
      console.error("Supabase Error:", dbError);
      return { error: "Error guardando en base de datos." };
    }

    // Notificación a Telegram — específica de NitroBot, con calificación destacada.
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const telegramMsg = `
🤖 *NUEVO LEAD · NITROBOT*

${fit.emoji} *${fit.etiqueta}*

👤 *Nombre:* ${name}
🏢 *Negocio:* ${company || "No especificado"}
📱 *WhatsApp:* ${whatsapp}
📧 *Email:* ${email}

🏭 *Sector:* ${sector || "No especificado"}
💬 *Volumen WhatsApp/día:* ${volume || "No especificado"}
🙋 *Atiende hoy:* ${whoAttends || "No especificado"}
🎯 *Objetivo:* ${goal || "No especificado"}

⏰ ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })}
      `.trim();

      try {
        const res = await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: telegramMsg,
              parse_mode: "Markdown",
            }),
          }
        );
        if (!res.ok) console.error("Telegram API Error:", await res.json());
      } catch (telegramError) {
        console.error("Error enviando a Telegram:", telegramError);
      }
    }

    // Email de confirmación — orientado a WhatsApp (el canal del producto).
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Nitro Ecom <onboarding@resend.dev>",
          to: [email],
          subject: "🤖 Recibimos tu solicitud de NitroBot",
          html: `
            <h1>¡Hola ${name.split(" ")[0]}!</h1>
            <p>Recibí tu solicitud para implementar <strong>NitroBot</strong> en ${company || "tu negocio"}.</p>
            <p>Voy a revisar tu operación y te escribo personalmente por WhatsApp al <strong>${whatsapp}</strong> para coordinar tu diagnóstico (sin costo).</p>
            <p>Objetivo que me compartiste: <strong>${goal || "mejorar tu atención por WhatsApp"}</strong>.</p>
            <br/>
            <p>Nos hablamos pronto,</p>
            <p>Juan Arango — NITRO ECOM</p>
          `,
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Submit Exception:", error);
    return { error: "Error inesperado procesando tu solicitud." };
  }
}
