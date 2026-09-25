import { crmAdminClient } from "@/lib/crm/db";
import { syncContactToResend } from "@/lib/crm/resend-sync";
import type { EventType, FormKey, Lifecycle } from "@/lib/crm/config";

// Punto de entrada único de los formularios hacia el CRM (tablas `contacts` y
// `contact_events`, RPC `crm_capture`). Solo servidor: usa la service role.
//
// Nunca lanza: un fallo del CRM no debe tumbar el formulario que ya envió el
// correo o el aviso. Devuelve `null` si no pudo guardar para que quien llama
// decida si eso es un error visible (newsletter) o solo un registro (NitroBot).

export type CaptureInput = {
  email?: string | null;
  phone?: string | null;
  name?: string | null;
  company?: string | null;
  form: FormKey;
  type?: EventType;
  summary?: string;
  data?: Record<string, unknown>;
  attribution?: Record<string, string>;
  path?: string;
  tags?: string[];
  newsletter?: boolean;
  consent?: boolean;
  lifecycle?: Lifecycle;
  dedupeKey?: string;
};

export type CaptureResult = {
  contact_id: string;
  created: boolean;
  already_subscribed: boolean;
  duplicate_event: boolean;
};

/**
 * El desarrollo local comparte la base de producción: por defecto no escribe.
 * `ENABLE_CRM_WRITES=true` lo permite para una prueba controlada.
 */
export function crmWritesEnabled() {
  return process.env.VERCEL_ENV === "production" || process.env.ENABLE_CRM_WRITES === "true";
}

const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "landing_path", "referrer", "placement"];

/** Limpia la atribución que llega del navegador: solo claves conocidas y cortas. */
export function cleanAttribution(raw: unknown): Record<string, string> {
  let value = raw;
  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch {
      return {};
    }
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key, v]) => ATTRIBUTION_KEYS.includes(key) && typeof v === "string" && v.trim())
      .map(([key, v]) => [key, String(v).trim().slice(0, 300)]),
  );
}

export async function captureContact(input: CaptureInput): Promise<CaptureResult | null> {
  const email = input.email?.trim().toLowerCase() || null;
  const phone = input.phone?.trim() || null;
  if (!email && !phone) return null;

  if (!crmWritesEnabled()) {
    console.info(`[crm] Escritura omitida fuera de producción (${input.form}).`);
    return { contact_id: "preview", created: false, already_subscribed: false, duplicate_event: false };
  }

  const supabase = crmAdminClient();
  if (!supabase) {
    console.error("[crm] Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
    return null;
  }

  const { data, error } = await supabase.rpc("crm_capture", {
    payload: {
      email,
      phone,
      name: input.name?.trim().slice(0, 120) || null,
      company: input.company?.trim().slice(0, 160) || null,
      form: input.form,
      type: input.type ?? "form_submit",
      summary: input.summary?.slice(0, 240),
      data: input.data ?? {},
      attribution: input.attribution ?? {},
      path: input.path?.slice(0, 300),
      tags: input.tags ?? [],
      newsletter: input.newsletter ?? false,
      consent: input.consent ?? false,
      lifecycle: input.lifecycle,
      dedupe_key: input.dedupeKey,
    },
  });

  if (error) {
    console.error("[crm] crm_capture falló:", error.code, error.message);
    return null;
  }

  const result = data as CaptureResult;
  // Resend es opcional y no bloquea: si está desactivado o falla, el contacto
  // ya quedó en Supabase y se puede sincronizar luego desde el panel.
  if (email) await syncContactToResend(result.contact_id).catch(() => undefined);
  return result;
}
