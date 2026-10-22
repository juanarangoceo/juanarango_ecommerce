export const ENTERPRISE_CONTRACT = "nitro-enterprise-v1" as const;
export const ENTERPRISE_VOLUMES = ["under_50", "50_150", "over_150", "unknown"] as const;
export type EnterpriseLead = {
  contractVersion: typeof ENTERPRISE_CONTRACT;
  idempotencyKey: string;
  name: string;
  company: string;
  phone: string;
  volume: (typeof ENTERPRISE_VOLUMES)[number];
  need: string;
  landingPath: "/nitro-complete";
  attribution: Record<string, string>;
  consent: true;
  consentVersion: "nitro_enterprise_contact_v1";
  privacyVersion: "2026-09-01";
  submittedAt: string;
};

export function parseEnterpriseLead(input: unknown): EnterpriseLead | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const r = input as Record<string, unknown>;
  const text = (key: string, max: number) => typeof r[key] === "string" ? (r[key] as string).trim().slice(0, max) : "";
  const name = text("name", 100), company = text("company", 140), need = text("need", 1000);
  const rawPhone = text("phone", 40);
  if (!/^[+\d\s().-]+$/.test(rawPhone)) return null;
  let phone = rawPhone.replace(/\D/g, "");
  if (/^3\d{9}$/.test(phone)) phone = `57${phone}`;
  if (!/^[1-9]\d{9,14}$/.test(phone)) return null;
  if (r.contractVersion !== ENTERPRISE_CONTRACT || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(r.idempotencyKey))) return null;
  if (name.length < 2 || company.length < 2 || need.length < 10 || !ENTERPRISE_VOLUMES.includes(r.volume as EnterpriseLead["volume"])) return null;
  if (r.consent !== true || r.consentVersion !== "nitro_enterprise_contact_v1" || r.privacyVersion !== "2026-09-01" || r.landingPath !== "/nitro-complete") return null;
  const submittedAt = text("submittedAt", 40);
  if (!Number.isFinite(Date.parse(submittedAt))) return null;
  const attribution: Record<string, string> = {};
  if (r.attribution && typeof r.attribution === "object") {
    const raw = r.attribution as Record<string, unknown>;
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      if (typeof raw[key] === "string") attribution[key] = raw[key].replace(/[\r\n]/g, " ").slice(0, 200);
    }
  }
  return { contractVersion: ENTERPRISE_CONTRACT, idempotencyKey: String(r.idempotencyKey), name, company, phone, volume: r.volume as EnterpriseLead["volume"], need, landingPath: "/nitro-complete", attribution, consent: true, consentVersion: "nitro_enterprise_contact_v1", privacyVersion: "2026-09-01", submittedAt };
}
