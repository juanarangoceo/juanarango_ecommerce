"use server";

import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";
import { Client } from "@notionhq/client";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SubscriptionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function subscribeToNewsletter(
  formData: FormData
): Promise<SubscriptionResult> {
  const email = formData.get("email")?.toString().trim();

  // 1. Basic Validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Por favor ingresa un email válido." };
  }

  try {
    // 2. Insert into Supabase
    const supabase = supabaseAdmin;

    if (!supabase) {
      console.error("Supabase Admin client not initialized");
      return { success: false, error: "Error interno del servidor (Database)." };
    }

    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    if (dbError) {
      if (dbError.code === "23505") {
        return {
          success: true,
          message: "¡Ya estás suscrito! Gracias por tu interés.",
        };
      }
      console.error("Supabase Error:", dbError);
      return { success: false, error: "No se pudo guardar tu email en la base de datos." };
    }

    // 3. Insert into Notion via fetch (SDK has a bug with child_databases)
    try {
      const notionSecret = process.env.NOTION_SECRET;
      const notionDbId = process.env.NOTION_SUBSCRIBERS_DB_ID;

      if (!notionSecret || !notionDbId) {
        console.warn("⚠️ Faltan credenciales de Notion:", { notionSecret: !!notionSecret, notionDbId: !!notionDbId });
      } else {
        console.log("📝 Enviando a Notion Subscribers DB...");
        const notionRes = await fetch('https://api.notion.com/v1/pages', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${notionSecret}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            parent: { database_id: notionDbId },
            properties: {
              "Name": { title: [{ text: { content: email } }] },
              "Email": { email: email },
              "Fecha de suscripción": { date: { start: new Date().toISOString() } },
            }
          })
        });
        if (notionRes.ok) {
          console.log(`✅ Suscriptor enviado a Notion: ${email}`);
        } else {
          const errBody = await notionRes.json();
          console.error("❌ Notion API Error:", errBody);
        }
      }
    } catch (notionError: any) {
      console.error("❌ Notion Fetch Error:", notionError?.message || notionError);
      // No fallamos la suscripción global si Notion falla
    }

    // 4. Send Welcome Email via Resend
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn("Resend API Key missing. Skipping email.");
      } else {
        await resend.emails.send({
          from: "Juan Arango <onboarding@resend.dev>", // TODO: Replace with user's verified domain if available, otherwise Resend default
          to: email,
          subject: "¡Bienvenido a la comunidad!",
          html: `
            <div style="font-family: sans-serif; color: #333;">
              <h1>¡Gracias por suscribirte!</h1>
              <p>Hola,</p>
              <p>Me alegra mucho tenerte por aquí. A partir de ahora serás de los primeros en enterarte cuando publique nuevos artículos, guías y recursos sobre ecommerce y tecnología.</p>
              <p>Si tienes alguna pregunta o tema del que te gustaría que hable, no dudes en responder a este correo.</p>
              <br>
              <p>Saludos,</p>
              <p><strong>Juan Arango</strong></p>
            </div>
          `,
        });
      }
    } catch (emailError) {
      console.error("Resend Error:", emailError);
    }

    return { success: true, message: "¡Suscripción exitosa! Revisa tu correo." };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { success: false, error: "Ocurrió un error inesperado." };
  }
}
