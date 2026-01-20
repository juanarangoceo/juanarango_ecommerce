"use server";

import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

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
    // We use supabaseAdmin to bypass RLS if strictly necessary, 
    // but typically standard client works if policies are set for anon.
    // However, for consistency and security in server actions, admin is often safer if configured.
    // Re-using the logic from the plan: "public insert" policy was suggested.
    // Let's check if Admin client is available, otherwise fail gracefully or use what we have.
    const supabase = supabaseAdmin;

    if (!supabase) {
      console.error("Supabase Admin client not initialized");
      return { success: false, error: "Error interno del servidor (Database)." };
    }

    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    if (dbError) {
      // Handle unique constraint violation assuming code '23505'
      if (dbError.code === "23505") {
        return {
          success: true,
          message: "¡Ya estás suscrito! Gracias por tu interés.",
        };
      }
      console.error("Supabase Error:", dbError);
      return { success: false, error: "No se pudo guardar tu email en la base de datos." };
    }

    // 3. Send Welcome Email via Resend
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
      // We don't fail the request if email fails, as the subscription is recorded.
    }

    return { success: true, message: "¡Suscripción exitosa! Revisa tu correo." };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { success: false, error: "Ocurrió un error inesperado." };
  }
}
