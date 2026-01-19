"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Initialize Clients
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Secure server-side key
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitLead(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const interest = formData.get("interest") as string;

  if (!name || !email) {
    return { error: "Faltan campos requeridos" };
  }

  try {
    // 1. Save to Supabase
    const { error: dbError } = await supabase.from("leads").insert({
      name,
      email,
      company,
      interest,
    });

    if (dbError) {
      console.error("Supabase Error:", dbError);
      throw new Error("Error guardando en base de datos");
    }

    // 2. Send Email via Resend
    // We only try to send if we have a key, otherwise we log/skip (for dev safety)
    if (process.env.RESEND_API_KEY) {
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
      
      // Notify Admin (You)
      // await resend.emails.send({ ... }) 
    }

    return { success: true };
  } catch (error) {
    console.error("Submit Error:", error);
    return { error: "Hubo un error procesando tu solicitud. Intenta nuevamente." };
  }
}
