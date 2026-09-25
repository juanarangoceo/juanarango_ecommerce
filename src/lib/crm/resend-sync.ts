import { Resend } from "resend";
import { crmAdminClient } from "@/lib/crm/db";

// Puente opcional CRM → Resend (contactos globales y segmentos).
//
// Se activa con `RESEND_CRM_SYNC=true`; sin eso no llama a Resend. Supabase
// sigue siendo la fuente de verdad: Resend recibe una copia para broadcasts y
// automatizaciones. Criterio legal conservador: en Resend solo queda como
// «suscrito» quien se suscribió a la newsletter; el resto entra como
// `unsubscribed` y no recibe broadcasts hasta que dé su consentimiento.

export function resendSyncEnabled() {
  return process.env.RESEND_CRM_SYNC === "true" && Boolean(process.env.RESEND_API_KEY);
}

let client: Resend | null = null;
function resend() {
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

type SyncableContact = {
  id: string;
  email: string | null;
  name: string | null;
  newsletter_status: string;
  resend_contact_id: string | null;
};

async function upsertInResend(contact: SyncableContact) {
  if (!contact.email) return null;
  const firstName = contact.name?.split(/\s+/)[0] || undefined;
  const unsubscribed = contact.newsletter_status !== "subscribed";

  const created = await resend().contacts.create({ email: contact.email, firstName, unsubscribed });
  if (created.data?.id) return created.data.id;

  // Ya existía: se actualiza por email.
  const updated = await resend().contacts.update({ email: contact.email, firstName: firstName ?? null, unsubscribed });
  if (updated.error) throw new Error(updated.error.message);
  return updated.data?.id ?? contact.resend_contact_id;
}

export async function syncContactToResend(contactId: string) {
  if (!resendSyncEnabled()) return false;
  const supabase = crmAdminClient();
  if (!supabase) return false;

  const { data: contact } = await supabase
    .from("contacts")
    .select("id, email, name, newsletter_status, resend_contact_id")
    .eq("id", contactId)
    .maybeSingle<SyncableContact>();
  if (!contact?.email) return false;

  try {
    const resendId = await upsertInResend(contact);
    await supabase
      .from("contacts")
      .update({ resend_contact_id: resendId, resend_synced_at: new Date().toISOString() })
      .eq("id", contact.id);
    return true;
  } catch (error) {
    console.error("[crm] No fue posible sincronizar con Resend:", error instanceof Error ? error.message : error);
    return false;
  }
}

export async function syncContactByEmail(email: string) {
  if (!resendSyncEnabled()) return false;
  const { data } = (await crmAdminClient()?.from("contacts").select("id").eq("email", email.trim().toLowerCase()).maybeSingle()) ?? {};
  return data?.id ? syncContactToResend(data.id as string) : false;
}

/**
 * Copia un segmento del panel a Resend: crea (o reutiliza) un segmento con el
 * mismo nombre y agrega a cada contacto. Resend limita la tasa de llamadas,
 * así que va en serie con una pausa corta.
 */
export async function pushSegmentToResend(segmentName: string, contacts: SyncableContact[]) {
  if (!resendSyncEnabled()) throw new Error("Activa RESEND_CRM_SYNC=true para sincronizar con Resend.");
  const supabase = crmAdminClient();
  const name = `JAE · ${segmentName}`;

  const existing = await resend().segments.list();
  let segmentId = existing.data?.data.find((segment) => segment.name === name)?.id;
  if (!segmentId) {
    const created = await resend().segments.create({ name });
    if (created.error || !created.data) throw new Error(created.error?.message ?? "Resend no creó el segmento.");
    segmentId = created.data.id;
  }

  let synced = 0;
  for (const contact of contacts) {
    if (!contact.email) continue;
    try {
      await upsertInResend(contact);
      await resend().contacts.segments.add({ email: contact.email, segmentId });
      await supabase?.from("contacts").update({ resend_synced_at: new Date().toISOString() }).eq("id", contact.id);
      synced += 1;
    } catch (error) {
      console.error("[crm] Contacto no sincronizado:", contact.id, error instanceof Error ? error.message : error);
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return { segmentId, synced };
}
