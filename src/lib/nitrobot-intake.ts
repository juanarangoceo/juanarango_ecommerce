import "server-only"

import { createHmac } from "node:crypto"
import type { NitroBotIntakeResponse, NitroBotLeadPayload } from "@/lib/nitrobot-lead"

const TIMEOUT_MS = 8_000

export class NitroBotIntakeError extends Error {
  constructor(
    message: string,
    public readonly retryable: boolean,
  ) {
    super(message)
    this.name = "NitroBotIntakeError"
  }
}

function intakeUrl() {
  const base = process.env.NITROBOT_API_URL?.replace(/\/$/, "")
  if (!base) throw new NitroBotIntakeError("NITROBOT_API_URL no configurada", false)
  return `${base}/api/platform/sales-leads`
}

export async function sendNitroBotLead(
  payload: NitroBotLeadPayload,
  idempotencyKey: string,
): Promise<NitroBotIntakeResponse> {
  const secret = process.env.NITROBOT_LEAD_INTAKE_SECRET
  if (!secret) throw new NitroBotIntakeError("Secreto de captación no configurado", false)

  const rawBody = JSON.stringify(payload)
  const timestamp = Date.now().toString()
  const signature = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex")
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(intakeUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Nitro-Timestamp": timestamp,
        "X-Nitro-Signature": signature,
        "X-Nitro-Idempotency-Key": idempotencyKey,
        "X-Nitro-Contract-Version": payload.contractVersion,
      },
      body: rawBody,
      cache: "no-store",
      signal: controller.signal,
    })

    const json = (await response.json().catch(() => null)) as NitroBotIntakeResponse | { error?: string } | null
    if (!response.ok) {
      const retryable = response.status >= 500 || response.status === 408 || response.status === 429
      throw new NitroBotIntakeError(
        `Nitro Bot respondió ${response.status}${json && "error" in json && json.error ? `: ${json.error}` : ""}`,
        retryable,
      )
    }
    if (!json || !("ok" in json) || json.ok !== true) {
      throw new NitroBotIntakeError("Respuesta inválida de Nitro Bot", true)
    }
    return json
  } catch (error) {
    if (error instanceof NitroBotIntakeError) throw error
    const message = error instanceof Error ? error.message : "Fallo de red"
    throw new NitroBotIntakeError(message, true)
  } finally {
    clearTimeout(timeout)
  }
}
