export const NITROBOT_LEAD_CONTRACT_VERSION = "nitrobot-lead-v1" as const
export const NITROBOT_CONSENT_VERSION = "nitrobot_contact_v1" as const
export const NITROBOT_PRIVACY_VERSION = "2026-09-01" as const

export type QualificationStatus = "prequalified" | "review" | "not_recommended"

export type NitroBotLeadPayload = {
  contractVersion: typeof NITROBOT_LEAD_CONTRACT_VERSION
  source: string
  landingPath: string
  name: string
  company?: string
  phone: string
  email?: string
  country?: string
  city?: string
  businessType: "productos" | "servicios" | "mixto" | "otro"
  platform: "shopify" | "catalogo_nitro" | "woocommerce" | "otra" | "sin_catalogo"
  catalogSize: "1_25" | "26_100" | "101_500" | "501_plus" | "sin_catalogo"
  dailyConversations: "under_20" | "20_50" | "50_150" | "over_150" | "unknown"
  monthlyOrders: "under_30" | "30_100" | "101_300" | "301_plus" | "unknown"
  whoAttends: "owner" | "one_person" | "team" | "nobody_fixed"
  primaryPain: "response_time" | "quoting" | "incomplete_data" | "follow_up" | "team_capacity" | "other"
  hasHandoffPerson: boolean
  implementationTiming: "under_30_days" | "one_to_three_months" | "exploring"
  catalogReady: boolean
  goal?: string
  attribution: Record<string, string>
  consent: true
  consentVersion: string
  privacyVersion: string
  submittedAt: string
  isTest?: boolean
}

export type NitroBotPlan = {
  slug: "nitro_5k" | "nitro_15k" | "nitro_30k" | "measure_first"
  name: string
  includedUnits: number | null
  monthlyPriceCop: number | null
  description: string
}

export type NitroBotIntakeResponse = {
  ok: true
  leadId: string
  duplicate: boolean
  qualification: {
    status: QualificationStatus
    reasons: string[]
    risks: string[]
    plan: NitroBotPlan
  }
}

export type NitroBotSubmitResult =
  | { ok: true; delivery: "delivered" | "queued"; result?: NitroBotIntakeResponse }
  | { ok: false; error: string }

export const qualificationCopy: Record<QualificationStatus, { eyebrow: string; title: string; body: string }> = {
  prequalified: {
    eyebrow: "Tu operación tiene buen encaje",
    title: "Estás listo para conectar Nitro Complete",
    body: "Tu catálogo, demanda y operación permiten pasar a una revisión de conexión. Juan validará contigo los últimos detalles por WhatsApp.",
  },
  review: {
    eyebrow: "Hay potencial",
    title: "Vamos a revisar tu operación",
    body: "Nitro Complete puede encajar, pero necesitamos confirmar volumen, catálogo o integración antes de recomendarte un plan.",
  },
  not_recommended: {
    eyebrow: "Primero conviene ordenar la base",
    title: "Todavía no te recomendaríamos conectarlo",
    body: "Preferimos decírtelo con claridad: hoy hay condiciones que harían difícil recuperar la inversión. Juan puede orientarte sobre el siguiente paso.",
  },
}
