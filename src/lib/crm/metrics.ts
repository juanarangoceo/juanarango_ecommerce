import { FORMS, INTERNAL_TAG, LIFECYCLES, type FormKey, type Lifecycle } from "@/lib/crm/config";
import type { ContactRow } from "@/lib/crm/segments";
import type { CrmEventWithContact } from "@/lib/crm/queries";

// Cálculos del panel a partir del snapshot. Puros: sin fechas implícitas
// salvo `now`, que se pasa desde la página.

const DAY = 86_400_000;
const CAPTURE_TYPES = new Set(["form_submit", "newsletter_subscribe", "lead_magnet", "booking"]);

/** Día calendario en Colombia (YYYY-MM-DD). */
export function bogotaDay(iso: string | number) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date(iso));
}

export function visibleContacts(contacts: ContactRow[]) {
  return contacts.filter((c) => !c.tags.includes(INTERNAL_TAG));
}

export function visibleEvents(events: CrmEventWithContact[], contacts: ContactRow[]) {
  const internal = new Set(contacts.filter((c) => c.tags.includes(INTERNAL_TAG)).map((c) => c.id));
  return events.filter((e) => !internal.has(e.contact_id));
}

function countSince(items: { at: string }[], from: number, to: number) {
  return items.filter((i) => {
    const t = Date.parse(i.at);
    return t >= from && t < to;
  }).length;
}

export type Kpi = { value: number; previous: number };

export function computeKpis(contacts: ContactRow[], events: CrmEventWithContact[], now: number) {
  const subscribed = contacts.filter((c) => c.newsletter_status === "subscribed");
  const subs = events.filter((e) => e.type === "newsletter_subscribe").map((e) => ({ at: e.created_at }));
  const unsubs = events.filter((e) => e.type === "newsletter_unsubscribe").map((e) => ({ at: e.created_at }));
  const newContacts = contacts.map((c) => ({ at: c.created_at }));
  const prospectSignals = events
    .filter((e) => e.type === "form_submit" || e.type === "booking")
    .map((e) => ({ at: e.created_at }));

  const w = (items: { at: string }[]): Kpi => ({
    value: countSince(items, now - 30 * DAY, now + DAY),
    previous: countSince(items, now - 60 * DAY, now - 30 * DAY),
  });

  const pipeline = contacts.filter((c) => c.lifecycle === "prospecto" || c.lifecycle === "calificado");
  // Prospectos que escribieron hace más de 48 h y siguen sin moverse de etapa.
  const waiting = contacts.filter(
    (c) => c.lifecycle === "prospecto" && now - Date.parse(c.last_activity_at) > 2 * DAY && now - Date.parse(c.last_activity_at) < 45 * DAY,
  );

  return {
    totalContacts: contacts.length,
    subscribed: subscribed.length,
    newContacts30: w(newContacts),
    newSubscribers30: w(subs),
    unsubscribes30: w(unsubs),
    prospectSignals30: w(prospectSignals),
    pipeline: pipeline.length,
    waiting,
  };
}

export type DailyPoint = { day: string; total: number; byForm: Partial<Record<string, number>> };

export function dailySeries(events: CrmEventWithContact[], days: number, now: number): DailyPoint[] {
  const map = new Map<string, DailyPoint>();
  for (let i = days - 1; i >= 0; i -= 1) {
    const day = bogotaDay(now - i * DAY);
    map.set(day, { day, total: 0, byForm: {} });
  }
  for (const e of events) {
    if (!CAPTURE_TYPES.has(e.type)) continue;
    const point = map.get(bogotaDay(e.created_at));
    if (!point) continue;
    const key = e.form ?? "otro";
    point.total += 1;
    point.byForm[key] = (point.byForm[key] ?? 0) + 1;
  }
  return [...map.values()];
}

export function lifecycleFunnel(contacts: ContactRow[]) {
  const counts = Object.fromEntries(LIFECYCLES.map((l) => [l, 0])) as Record<Lifecycle, number>;
  for (const c of contacts) counts[c.lifecycle] += 1;
  return LIFECYCLES.map((lifecycle) => ({ lifecycle, count: counts[lifecycle] }));
}

export function formStats(contacts: ContactRow[], events: CrmEventWithContact[], now: number) {
  return (Object.keys(FORMS) as FormKey[]).map((form) => {
    const formEvents = events.filter((e) => e.form === form && CAPTURE_TYPES.has(e.type));
    const last30 = formEvents.filter((e) => now - Date.parse(e.created_at) < 30 * DAY).length;
    const previous30 = formEvents.filter((e) => {
      const age = now - Date.parse(e.created_at);
      return age >= 30 * DAY && age < 60 * DAY;
    }).length;
    const people = contacts.filter((c) => c.forms.includes(form)).length;
    return { form, ...FORMS[form], total90: formEvents.length, last30, previous30, people, last: formEvents[0]?.created_at ?? null };
  });
}

/** Origen de los contactos: utm_source, luego referrer, luego ubicación del formulario. */
export function topSources(contacts: ContactRow[], limit = 6) {
  const counts = new Map<string, number>();
  for (const c of contacts) {
    const a = c.first_attribution ?? {};
    let source = a.utm_source || "";
    if (!source && a.referrer) {
      try {
        source = new URL(a.referrer).hostname.replace(/^www\./, "");
      } catch {
        source = "";
      }
    }
    if (!source) source = a.fbclid ? "facebook (sin utm)" : "directo / orgánico";
    counts.set(source, (counts.get(source) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([source, count]) => ({ source, count }));
}

export function topLandingPaths(contacts: ContactRow[], limit = 6) {
  const counts = new Map<string, number>();
  for (const c of contacts) {
    const path = c.first_attribution?.landing_path;
    if (path) counts.set(path, (counts.get(path) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([source, count]) => ({ source, count }));
}

export function delta(kpi: Kpi) {
  if (kpi.previous === 0) return kpi.value > 0 ? null : 0;
  return Math.round(((kpi.value - kpi.previous) / kpi.previous) * 100);
}
