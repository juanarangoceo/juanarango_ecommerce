"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function submitLead(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const interest = formData.get("interest") as string;

  if (!name || !email) {
    return { error: "Faltan campos requeridos" };
  }

  // Debug: Log environment check (will show in server logs)
  console.log("Submitting lead:", { name, email, hasSupabase: !!process.env.SUPABASE_SERVICE_ROLE_KEY, hasResend: !!process.env.RESEND_API_KEY });

  // 1. Validate Environment
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase Configuration");
    return { error: "Error de configuración del servidor (Supabase Keys missing)." };
  }

  try {
    // Initialize Clients dynamically to catch config errors
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // 2. Save to Supabase
    const { error: dbError } = await supabase.from("leads").insert({
      name,
      email,
      company,
      interest,
    });

    if (dbError) {
      console.error("Supabase Error:", dbError);
      return { error: "Error guardando en base de datos. ¿Creaste la tabla 'leads'?" };
    }

    // 3. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Nitro Ecom <onboarding@resend.dev>", // Or your verified domain
        to: [email],
        subject: "🚀 Recibimos tu solicitud - Nitro Ecom",
        html: `
          <h1>¡Hola ${name}!</h1>
          <p>Gracias por contactar a Nitro Ecom.</p>
          <p>Hemos recibido tu interés en: <strong>${interest}</strong>.</p>
          <p>Nuestro equipo analizará tu caso y te contactará pronto para agendar una sesión de estrategia.</p>
          <br/>
          <p>Atentamente,</p>
          <p>El equipo de Juan Arango</p>
        `,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Submit Exception:", error);
    return { error: "Error inesperado procesando tu solicitud." };
  }
}
