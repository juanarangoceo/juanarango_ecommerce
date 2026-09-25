"use server"

import { NitroBotIntakeError, sendNitroBotLead } from "@/lib/nitrobot-intake"
import { after } from "next/server"
import { inngest } from "@/lib/inngest/client"
import { captureContact, cleanAttribution } from "@/lib/crm/capture"
import {
  NITROBOT_CONSENT_VERSION,
  NITROBOT_LEAD_CONTRACT_VERSION,
  NITROBOT_PRIVACY_VERSION,
  type NitroBotLeadPayload,
  type NitroBotSubmitResult,
} from "@/lib/nitrobot-lead"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const allowed = {
  businessType: ["productos", "servicios", "mixto", "otro"],
  platform: ["shopify", "catalogo_nitro", "woocommerce", "otra", "sin_catalogo"],
  catalogSize: ["1_25", "26_100", "101_500", "501_plus", "sin_catalogo"],
  dailyConversations: ["under_20", "20_50", "50_150", "over_150", "unknown"],
  monthlyOrders: ["under_30", "30_100", "101_300", "301_plus", "unknown"],
  whoAttends: ["owner", "one_person", "team", "nobody_fixed"],
  primaryPain: ["response_time", "quoting", "incomplete_data", "follow_up", "team_capacity", "other"],
  implementationTiming: ["under_30_days", "one_to_three_months", "exploring"],
} as const

function text(formData: FormData, key: string, max = 180) {
  return String(formData.get(key) ?? "").trim().slice(0, max)
}

function pick<K extends keyof typeof allowed>(formData: FormData, key: K) {
  const value = text(formData, key)
  const options = allowed[key] as readonly string[]
  return options.includes(value) ? (value as (typeof allowed)[K][number]) : null
}

function attribution(formData: FormData) {
  const raw = text(formData, "attribution", 2_000)
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {}
    return Object.fromEntries(
      Object.entries(parsed)
        .filter(([, value]) => typeof value === "string")
        .slice(0, 7)
        .map(([key, value]) => [key.slice(0, 40), String(value).slice(0, 300)]),
    )
  } catch {
    return {}
  }
}

async function queueLead(payload: NitroBotLeadPayload, idempotencyKey: string, lastError: string) {
  try {
    await inngest.send({
      name: "nitrobot/lead.retry",
      data: { payload, idempotencyKey, lastError: lastError.slice(0, 500) },
    })
    return true
  } catch (error) {
    console.error("[nitrobot-form] Inngest no pudo aceptar el reintento:", error)
    return false
  }
}

// Copia del prospecto en el CRM propio para segmentar y hacer email marketing.
// La entrega oficial sigue siendo el panel de Nitro Bot; esto corre después de
// responder y nunca cambia el resultado del formulario.
function mirrorToCrm(payload: NitroBotLeadPayload, idempotencyKey: string) {
  after(() =>
    captureContact({
      email: payload.email,
      phone: payload.phone,
      name: payload.name,
      company: payload.company,
      form: "nitro_complete",
      summary: `Nitro Complete · ${payload.primaryPain} · ${payload.implementationTiming}`,
      data: {
        business_type: payload.businessType,
        platform: payload.platform,
        catalog_size: payload.catalogSize,
        daily_conversations: payload.dailyConversations,
        monthly_orders: payload.monthlyOrders,
        who_attends: payload.whoAttends,
        primary_pain: payload.primaryPain,
        implementation_timing: payload.implementationTiming,
        city: payload.city,
        goal: payload.goal,
      },
      attribution: cleanAttribution(payload.attribution),
      path: payload.landingPath,
      consent: payload.consent,
      tags: payload.isTest ? ["prueba"] : [],
      dedupeKey: `nitrobot:${idempotencyKey}`,
    }),
  )
}

export async function submitNitrobotLead(formData: FormData): Promise<NitroBotSubmitResult> {
  if (text(formData, "website")) return { ok: false, error: "No pudimos validar la solicitud." }
  const startedAt = Number(text(formData, "startedAt", 30))
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 3_000) {
    return { ok: false, error: "Revisa la información e intenta de nuevo." }
  }

  const idempotencyKey = text(formData, "idempotencyKey", 50)
  const businessType = pick(formData, "businessType")
  const platform = pick(formData, "platform")
  const catalogSize = pick(formData, "catalogSize")
  const dailyConversations = pick(formData, "dailyConversations")
  const monthlyOrders = pick(formData, "monthlyOrders")
  const whoAttends = pick(formData, "whoAttends")
  const primaryPain = pick(formData, "primaryPain")
  const implementationTiming = pick(formData, "implementationTiming")
  const name = text(formData, "name", 100)
  const phone = text(formData, "phone", 40)
  const email = text(formData, "email", 180).toLowerCase()
  const consent = formData.get("consent") === "true"

  if (!UUID_RE.test(idempotencyKey) || !name || phone.replace(/\D/g, "").length < 8) {
    return { ok: false, error: "Completa tu nombre y un WhatsApp válido." }
  }
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: "Revisa tu correo electrónico." }
  if (!businessType || !platform || !catalogSize || !dailyConversations || !monthlyOrders || !whoAttends || !primaryPain || !implementationTiming) {
    return { ok: false, error: "Faltan respuestas para evaluar tu operación." }
  }
  if (!consent) return { ok: false, error: "Necesitamos tu autorización para contactarte." }

  const payload: NitroBotLeadPayload = {
    contractVersion: NITROBOT_LEAD_CONTRACT_VERSION,
    source: text(formData, "source", 100) || "nitrobot_organic",
    landingPath: text(formData, "landingPath", 200) || "/nitrobot/conectar",
    name,
    company: text(formData, "company", 140) || undefined,
    phone,
    email: email || undefined,
    country: "CO",
    city: text(formData, "city", 100) || undefined,
    businessType,
    platform,
    catalogSize,
    dailyConversations,
    monthlyOrders,
    whoAttends,
    primaryPain,
    hasHandoffPerson: formData.get("hasHandoffPerson") === "true",
    implementationTiming,
    catalogReady: formData.get("catalogReady") === "true",
    goal: text(formData, "goal", 240) || undefined,
    attribution: attribution(formData),
    consent: true,
    consentVersion: NITROBOT_CONSENT_VERSION,
    privacyVersion: NITROBOT_PRIVACY_VERSION,
    submittedAt: new Date().toISOString(),
    isTest: process.env.VERCEL_ENV !== "production",
  }

  if (process.env.ENABLE_NITROBOT_LEAD_SUBMISSIONS !== "true") {
    return { ok: false, error: "El formulario está temporalmente en modo de revisión." }
  }

  try {
    const result = await sendNitroBotLead(payload, idempotencyKey)
    mirrorToCrm(payload, idempotencyKey)
    return { ok: true, delivery: "delivered", result }
  } catch (firstError) {
    if (!(firstError instanceof NitroBotIntakeError) || !firstError.retryable) {
      console.error("[nitrobot-form] rechazo no reintentable:", firstError)
      return { ok: false, error: "No pudimos validar la solicitud. Revisa los datos e intenta de nuevo." }
    }
    try {
      const result = await sendNitroBotLead(payload, idempotencyKey)
      mirrorToCrm(payload, idempotencyKey)
      return { ok: true, delivery: "delivered", result }
    } catch (secondError) {
      const message = secondError instanceof Error ? secondError.message : "Fallo de entrega"
      const queued = await queueLead(payload, idempotencyKey, message)
      if (queued) {
        mirrorToCrm(payload, idempotencyKey)
        return { ok: true, delivery: "queued" }
      }
      console.error("[nitrobot-form] entrega y cola fallaron:", message)
      return { ok: false, error: "No pudimos recibir la solicitud. Intenta de nuevo en unos minutos." }
    }
  }
}
