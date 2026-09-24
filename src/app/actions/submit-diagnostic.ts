"use server";

import { createClient } from "@supabase/supabase-js";

export type DiagnosticSubmissionResult = {
  success?: true;
  preview?: boolean;
  error?: string;
};

const MAX_PAYLOAD_LENGTH = 12_000;

function text(formData: FormData, key: string, maxLength = 180) {
  return String(formData.get(key) ?? "").trim().slice(0, maxLength);
}

export async function submitDiagnostic(formData: FormData): Promise<DiagnosticSubmissionResult> {
  const name = text(formData, "name", 100);
  const company = text(formData, "company", 140);
  const email = text(formData, "email", 180).toLowerCase();
  const phone = text(formData, "phone", 40);
  const recommendation = text(formData, "recommendation", 60);
  const primaryProblem = text(formData, "primaryProblem", 100);
  const maturityLevel = text(formData, "maturityLevel", 60);
  const answersRaw = text(formData, "answers", MAX_PAYLOAD_LENGTH);
  const attributionRaw = text(formData, "attribution", 2_000);
  const consent = formData.get("consent") === "true";

  if (!name || !email || !phone || !consent) return { error: "Completa nombre, email, WhatsApp y consentimiento." };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Escribe un email válido." };
  if (!recommendation || !primaryProblem || !maturityLevel) return { error: "No pudimos leer el resultado del diagnóstico." };

  let answers: Record<string, string>;
  let attribution: Record<string, string>;
  try {
    answers = JSON.parse(answersRaw) as Record<string, string>;
    attribution = JSON.parse(attributionRaw || "{}") as Record<string, string>;
  } catch {
    return { error: "Los datos del diagnóstico no tienen un formato válido." };
  }

  // El desarrollo local nunca escribe en el proyecto remoto por accidente.
  // Producción siempre guarda: un diagnóstico perdido es un lead perdido.
  const live = process.env.ENABLE_DIAGNOSTIC_SUBMISSIONS === "true" || process.env.VERCEL_ENV === "production";
  if (!live) return { success: true, preview: true };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return { error: "La captación todavía no está configurada en este entorno." };

  const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await supabase.rpc("submit_commercial_diagnostic", {
    payload: {
      name,
      company,
      email,
      phone,
      recommendation,
      primary_problem: primaryProblem,
      maturity_level: maturityLevel,
      answers,
      attribution,
    },
  });

  if (error) {
    // Mientras la migración 20260826155922 no esté aplicada, el RPC no existe.
    // El lead se guarda igual en las columnas originales de `leads`.
    const { error: fallbackError } = await supabase.from("leads").insert({
      name,
      email,
      company: company || null,
      interest: `Diagnóstico · ${recommendation}`,
      message: [
        `WhatsApp: ${phone}`,
        `Prioridad: ${primaryProblem}`,
        `Madurez: ${maturityLevel}`,
        `Respuestas: ${JSON.stringify(answers)}`,
        `Atribución: ${JSON.stringify(attribution)}`,
      ].join("\n"),
    });
    if (fallbackError) {
      console.error("No fue posible guardar el diagnóstico:", error.code, fallbackError.code);
      return { error: "No pudimos guardar el diagnóstico. Intenta de nuevo." };
    }
  }

  await notifyTelegram([
    "Nuevo diagnóstico en juanarangoecommerce.com",
    `Nombre: ${name}${company ? ` (${company})` : ""}`,
    `Email: ${email}`,
    `WhatsApp: ${phone}`,
    `Recomendación: ${recommendation} · ${maturityLevel}`,
    `Prioridad: ${primaryProblem}`,
  ].join("\n"));

  return { success: true };
}

async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!response.ok) console.error("Telegram rechazó el aviso del diagnóstico:", response.status);
  } catch {
    console.error("No fue posible avisar el diagnóstico por Telegram.");
  }
}
