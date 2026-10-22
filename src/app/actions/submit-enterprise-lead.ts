"use server";

import { after } from "next/server";
import { captureContact, cleanAttribution } from "@/lib/crm/capture";
import { ENTERPRISE_CONTRACT, parseEnterpriseLead } from "@/lib/enterprise-lead";
import { sendEnterpriseLead } from "@/lib/enterprise-intake";

export async function submitEnterpriseLead(form: FormData): Promise<{ ok: boolean; error?: string }> {
  const startedAt = Number(form.get("startedAt"));
  if (form.get("website") || !Number.isFinite(startedAt) || Date.now() - startedAt < 3000) return { ok: false, error: "Revisa los datos e intenta nuevamente." };
  let attribution: unknown = {};
  try { attribution = JSON.parse(String(form.get("attribution") ?? "{}")); } catch { /* Sin campaña si el navegador no la aporta. */ }
  const payload = parseEnterpriseLead({
    ...Object.fromEntries(form),
    contractVersion: ENTERPRISE_CONTRACT,
    landingPath: "/nitro-complete",
    consent: form.get("consent") === "on",
    consentVersion: "nitro_enterprise_contact_v1",
    privacyVersion: "2026-09-01",
    submittedAt: new Date().toISOString(),
    attribution,
  });
  if (!payload) return { ok: false, error: "Completa nombre, empresa, WhatsApp, volumen y tu necesidad. Necesitamos tu autorización para contactarte." };
  // La misma clave se conserva en el navegador si la respuesta se pierde.
  try {
    await sendEnterpriseLead(payload);
  } catch {
    return { ok: false, error: "No pudimos confirmar el envío. Tus datos siguen aquí; intenta nuevamente o escríbenos por WhatsApp." };
  }
  after(() => captureContact({
    phone: payload.phone, name: payload.name, company: payload.company,
    form: "nitro_complete", summary: "Solicitud empresarial · Nitro Complete",
    data: { volume: payload.volume, need: payload.need, destination: "sales_assistant" },
    attribution: cleanAttribution(payload.attribution), path: payload.landingPath,
    consent: true, tags: ["empresa"], dedupeKey: `enterprise:${payload.idempotencyKey}`,
  }));
  return { ok: true };
}
