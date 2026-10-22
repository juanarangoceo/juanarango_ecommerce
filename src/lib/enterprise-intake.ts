import "server-only";
import { createHmac } from "node:crypto";
import { ENTERPRISE_CONTRACT, type EnterpriseLead } from "@/lib/enterprise-lead";

export async function sendEnterpriseLead(payload: EnterpriseLead) {
  const base = process.env.SALES_ASSISTANT_API_URL;
  const secret = process.env.SALES_ASSISTANT_INTAKE_SECRET;
  if (!base || !secret) throw new Error("Captación empresarial sin configurar");
  const url = new URL("/api/sales/enterprise", base);
  const local = process.env.NODE_ENV !== "production" && ["localhost", "127.0.0.1"].includes(url.hostname);
  if (url.protocol !== "https:" && !local) throw new Error("Destino empresarial inválido");
  const body = JSON.stringify(payload);
  const timestamp = Date.now().toString();
  // Separación criptográfica del contrato de NitroBot, aunque se reutilice la clave.
  const signature = createHmac("sha256", secret).update(`${ENTERPRISE_CONTRACT}.${timestamp}.${body}`).digest("hex");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Nitro-Timestamp": timestamp, "X-Nitro-Signature": signature },
    body, cache: "no-store", signal: AbortSignal.timeout(8000),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.ok !== true || typeof result.contactId !== "string") throw new Error("No se confirmó la recepción empresarial");
  return result as { ok: true; contactId: string; duplicate: boolean };
}
