import { crmAdminClient } from "@/lib/crm/db";
import type { ContactRow } from "@/lib/crm/segments";
import type { EventType } from "@/lib/crm/config";

// Lecturas del panel /admin. Solo servidor (service role).
//
// El volumen actual (cientos de contactos) permite traer la lista completa y
// filtrar en el navegador al instante. Si pasa de ~5.000 contactos, mover los
// filtros a la consulta.

export type CrmEvent = {
  id: string;
  contact_id: string;
  type: EventType;
  form: string | null;
  summary: string | null;
  data: Record<string, unknown>;
  attribution: Record<string, string>;
  path: string | null;
  created_at: string;
};

export type CrmEventWithContact = CrmEvent & {
  contacts: { email: string | null; name: string | null; lifecycle: string } | null;
};

export type CrmSnapshot =
  | { ready: true; contacts: ContactRow[]; events: CrmEventWithContact[]; now: number }
  | { ready: false; reason: string };

const CONTACT_LIMIT = 5000;

export async function loadCrmSnapshot(eventDays = 90): Promise<CrmSnapshot> {
  const supabase = crmAdminClient();
  if (!supabase) return { ready: false, reason: "Faltan las variables de Supabase en este entorno." };

  const since = new Date(Date.now() - eventDays * 86_400_000).toISOString();
  const [contacts, events] = await Promise.all([
    supabase.from("crm_contact_overview").select("*").order("last_activity_at", { ascending: false }).limit(CONTACT_LIMIT),
    supabase
      .from("contact_events")
      .select("id, contact_id, type, form, summary, data, attribution, path, created_at, contacts(email, name, lifecycle)")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(5000),
  ]);

  const error = contacts.error ?? events.error;
  if (error) {
    // 42P01 / PGRST205: la migración del CRM todavía no está aplicada.
    const missing = error.code === "42P01" || error.code === "PGRST205" || /does not exist|schema cache/i.test(error.message);
    return {
      ready: false,
      reason: missing
        ? "Las tablas del CRM aún no existen. Aplica supabase/migrations/20260925120000_crm_core.sql y la importación."
        : `Supabase respondió con un error: ${error.message}`,
    };
  }

  return {
    ready: true,
    contacts: (contacts.data ?? []) as ContactRow[],
    events: (events.data ?? []) as unknown as CrmEventWithContact[],
    // Referencia temporal única para los cálculos de la página.
    now: Date.now(),
  };
}

export async function loadContactTimeline(contactId: string) {
  const supabase = crmAdminClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("contact_events")
    .select("id, contact_id, type, form, summary, data, attribution, path, created_at")
    .eq("contact_id", contactId)
    .order("created_at", { ascending: false })
    .limit(200);
  return (data ?? []) as CrmEvent[];
}

export async function loadContacts(): Promise<ContactRow[]> {
  const supabase = crmAdminClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from("crm_contact_overview").select("*").limit(CONTACT_LIMIT);
  if (error) throw new Error(error.message);
  return (data ?? []) as ContactRow[];
}
