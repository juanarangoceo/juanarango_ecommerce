"use server";

import { supabaseAdmin } from "@/lib/supabase";

interface WaitlistResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function joinLaboratorioWaitlist(
  formData: FormData
): Promise<WaitlistResult> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const businessType = formData.get("business_type")?.toString().trim();
  const monthlyRevenue = formData.get("monthly_revenue")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || name.length < 2) {
    return { success: false, error: "Por favor ingresa tu nombre completo." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Por favor ingresa un email válido." };
  }

  try {
    const supabase = supabaseAdmin;
    if (!supabase) {
      return { success: false, error: "Error interno del servidor." };
    }

    const { error: dbError } = await supabase
      .from("laboratorio_waitlist")
      .insert([{ name, email, business_type: businessType, monthly_revenue: monthlyRevenue, message }]);

    if (dbError) {
      if (dbError.code === "23505") {
        return {
          success: true,
          message: "¡Ya estás en la lista! Te avisaremos cuando abramos puertas.",
        };
      }
      console.error("Supabase Error:", dbError);
      return { success: false, error: "No se pudo registrar tu solicitud. Intenta de nuevo." };
    }

    return {
      success: true,
      message: "¡Registro exitoso! Eres de los primeros en la lista. Te contactaremos pronto.",
    };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return { success: false, error: "Ocurrió un error inesperado." };
  }
}
