import { INTERNAL_TAG, type FormKey, type Lifecycle, type NewsletterStatus } from "@/lib/crm/config";

// Filtros y segmentos del CRM. Funciones puras: las usan la tabla del panel
// (en el navegador), la exportación CSV y la sincronización con Resend (en el
// servidor), así un segmento significa lo mismo en todas partes.

export type ContactRow = {
  id: string;
  email: string | null;
  phone: string | null;
  name: string | null;
  company: string | null;
  lifecycle: Lifecycle;
  newsletter_status: NewsletterStatus;
  subscribed_at: string | null;
  unsubscribed_at: string | null;
  source: string | null;
  first_attribution: Record<string, string>;
  last_attribution: Record<string, string>;
  tags: string[];
  score: number;
  notes: string | null;
  consent_at: string | null;
  last_activity_at: string;
  resend_contact_id: string | null;
  resend_synced_at: string | null;
  created_at: string;
  forms: string[];
  event_count: number;
};

export type ContactFilter = {
  q?: string;
  lifecycle?: Lifecycle | "all";
  newsletter?: NewsletterStatus | "all";
  form?: FormKey | "all";
  tag?: string;
  minScore?: number;
  /** Creado en los últimos N días. */
  createdWithinDays?: number;
  /** Sin actividad hace más de N días. */
  inactiveForDays?: number;
  includeInternal?: boolean;
};

const DAY = 86_400_000;

export function matchesFilter(contact: ContactRow, filter: ContactFilter, now = Date.now()) {
  if (!filter.includeInternal && contact.tags.includes(INTERNAL_TAG)) return false;
  if (filter.lifecycle && filter.lifecycle !== "all" && contact.lifecycle !== filter.lifecycle) return false;
  if (filter.newsletter && filter.newsletter !== "all" && contact.newsletter_status !== filter.newsletter) return false;
  if (filter.form && filter.form !== "all" && !contact.forms.includes(filter.form)) return false;
  if (filter.tag && !contact.tags.includes(filter.tag)) return false;
  if (filter.minScore && contact.score < filter.minScore) return false;
  if (filter.createdWithinDays && now - Date.parse(contact.created_at) > filter.createdWithinDays * DAY) return false;
  if (filter.inactiveForDays && now - Date.parse(contact.last_activity_at) < filter.inactiveForDays * DAY) return false;
  if (filter.q) {
    const needle = filter.q.trim().toLowerCase();
    const haystack = [contact.email, contact.name, contact.company, contact.phone, ...contact.tags].join(" ").toLowerCase();
    if (!haystack.includes(needle)) return false;
  }
  return true;
}

export type Segment = {
  id: string;
  name: string;
  description: string;
  /** Para qué sirve en una estrategia de correo o seguimiento. */
  play: string;
  filter: ContactFilter;
  /** Solo quien aceptó la newsletter puede recibir broadcasts. */
  emailable: boolean;
};

export const SEGMENTS: Segment[] = [
  {
    id: "suscriptores-activos",
    name: "Suscriptores activos",
    description: "Todos los suscritos a la newsletter.",
    play: "Broadcast semanal y lanzamientos.",
    filter: { newsletter: "subscribed" },
    emailable: true,
  },
  {
    id: "nuevos-7-dias",
    name: "Nuevos de la semana",
    description: "Suscritos en los últimos 7 días.",
    play: "Secuencia de bienvenida: quién eres, mejores guías y el diagnóstico.",
    filter: { newsletter: "subscribed", createdWithinDays: 7 },
    emailable: true,
  },
  {
    id: "prospectos-calientes",
    name: "Prospectos calientes",
    description: "Prospectos con 30 puntos o más de intención.",
    play: "Seguimiento personal por WhatsApp o correo en menos de 24 horas.",
    filter: { lifecycle: "prospecto", minScore: 30 },
    emailable: false,
  },
  {
    id: "interes-nitro-complete",
    name: "Interés en Nitro Complete",
    description: "Pasaron por el calificador de Nitro Complete.",
    play: "Casos de uso de WhatsApp y recordatorio para agendar la llamada.",
    filter: { form: "nitro_complete" },
    emailable: false,
  },
  {
    id: "hicieron-diagnostico",
    name: "Hicieron el diagnóstico",
    description: "Completaron el diagnóstico comercial.",
    play: "Correo con la solución recomendada y el siguiente paso.",
    filter: { form: "diagnostico" },
    emailable: false,
  },
  {
    id: "lectores-de-recursos",
    name: "Lectores de recursos",
    description: "Pidieron un resumen PDF de un artículo.",
    play: "Invitarlos a la newsletter con contenido del mismo tema.",
    filter: { form: "resumen_pdf" },
    emailable: false,
  },
  {
    id: "suscriptores-dormidos",
    name: "Suscriptores dormidos",
    description: "Suscritos sin actividad hace más de 60 días.",
    play: "Campaña de reactivación antes de limpiar la lista.",
    filter: { newsletter: "subscribed", inactiveForDays: 60 },
    emailable: true,
  },
  {
    id: "clientes",
    name: "Clientes",
    description: "Contactos marcados como clientes.",
    play: "Onboarding, novedades de producto y pedido de testimonios.",
    filter: { lifecycle: "cliente" },
    emailable: false,
  },
];

export function segmentById(id: string) {
  return SEGMENTS.find((segment) => segment.id === id);
}

export function toCsv(contacts: ContactRow[]) {
  const columns: [string, (c: ContactRow) => string | number | null][] = [
    ["email", (c) => c.email],
    ["first_name", (c) => c.name?.split(/\s+/)[0] ?? ""],
    ["name", (c) => c.name],
    ["phone", (c) => c.phone],
    ["company", (c) => c.company],
    ["lifecycle", (c) => c.lifecycle],
    ["newsletter", (c) => c.newsletter_status],
    ["score", (c) => c.score],
    ["forms", (c) => c.forms.join("|")],
    ["tags", (c) => c.tags.join("|")],
    ["source", (c) => c.source],
    ["utm_source", (c) => c.first_attribution.utm_source ?? ""],
    ["utm_campaign", (c) => c.first_attribution.utm_campaign ?? ""],
    ["created_at", (c) => c.created_at],
    ["last_activity_at", (c) => c.last_activity_at],
  ];
  const escape = (value: string | number | null) => {
    const text = value === null || value === undefined ? "" : String(value);
    // Evita inyección de fórmulas al abrir el CSV en una hoja de cálculo.
    const safe = /^[=+\-@]/.test(text) ? `'${text}` : text;
    return /[",\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
  };
  return [columns.map(([name]) => name).join(","), ...contacts.map((c) => columns.map(([, get]) => escape(get(c))).join(","))].join("\n");
}
