"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";
import { LIFECYCLES, LIFECYCLE_LABEL, type Lifecycle } from "@/lib/crm/config";
import { crmAdminClient } from "@/lib/crm/db";
import { loadContactTimeline, loadContacts } from "@/lib/crm/queries";
import { matchesFilter, segmentById } from "@/lib/crm/segments";
import { pushSegmentToResend, resendSyncEnabled, syncContactToResend } from "@/lib/crm/resend-sync";

// Acciones del panel. Cada una vuelve a verificar la sesión: el middleware
// protege /admin, pero una Server Action no debe depender solo de eso.

type Result<T = undefined> = { ok: true; data?: T } | { ok: false; error: string };

function db() {
  const supabase = crmAdminClient();
  if (!supabase) throw new Error("Supabase no está configurado.");
  return supabase;
}

function fail(error: unknown): { ok: false; error: string } {
  return { ok: false, error: error instanceof Error ? error.message : "Algo salió mal." };
}

function refresh() {
  revalidatePath("/admin", "layout");
}

const cleanTag = (tag: string) => tag.trim().toLowerCase().replace(/\s+/g, "-").slice(0, 40);

export async function getTimeline(contactId: string) {
  await requireAdmin();
  return loadContactTimeline(contactId);
}

export async function updateContact(
  contactId: string,
  patch: { lifecycle?: Lifecycle; name?: string; phone?: string; company?: string; notes?: string; tags?: string[] },
): Promise<Result> {
  try {
    await requireAdmin();
    const supabase = db();
    const update: Record<string, unknown> = {};
    if (patch.name !== undefined) update.name = patch.name.trim() || null;
    if (patch.phone !== undefined) update.phone = patch.phone.trim() || null;
    if (patch.company !== undefined) update.company = patch.company.trim() || null;
    if (patch.notes !== undefined) update.notes = patch.notes.trim().slice(0, 4000) || null;
    if (patch.tags !== undefined) update.tags = [...new Set(patch.tags.map(cleanTag).filter(Boolean))];

    let previous: string | null = null;
    if (patch.lifecycle) {
      if (!LIFECYCLES.includes(patch.lifecycle)) return { ok: false, error: "Etapa no válida." };
      const { data } = await supabase.from("contacts").select("lifecycle").eq("id", contactId).single();
      previous = data?.lifecycle ?? null;
      update.lifecycle = patch.lifecycle;
    }

    const { error } = await supabase.from("contacts").update(update).eq("id", contactId);
    if (error) return { ok: false, error: error.message };

    if (patch.lifecycle && previous !== patch.lifecycle) {
      await supabase.from("contact_events").insert({
        contact_id: contactId,
        type: "status_change",
        summary: `${previous ? LIFECYCLE_LABEL[previous as Lifecycle] : "—"} → ${LIFECYCLE_LABEL[patch.lifecycle]}`,
        data: { from: previous, to: patch.lifecycle },
      });
    }
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function addNote(contactId: string, text: string): Promise<Result> {
  try {
    await requireAdmin();
    const summary = text.trim().slice(0, 2000);
    if (!summary) return { ok: false, error: "Escribe la nota." };
    const supabase = db();
    const { error } = await supabase.from("contact_events").insert({ contact_id: contactId, type: "note", summary });
    if (error) return { ok: false, error: error.message };
    await supabase.from("contacts").update({ last_activity_at: new Date().toISOString() }).eq("id", contactId);
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function bulkUpdate(ids: string[], action: { lifecycle?: Lifecycle; addTag?: string; removeTag?: string }): Promise<Result<number>> {
  try {
    await requireAdmin();
    if (!ids.length || ids.length > 1000) return { ok: false, error: "Selecciona entre 1 y 1.000 contactos." };
    const supabase = db();

    if (action.lifecycle) {
      if (!LIFECYCLES.includes(action.lifecycle)) return { ok: false, error: "Etapa no válida." };
      const { error } = await supabase.from("contacts").update({ lifecycle: action.lifecycle }).in("id", ids);
      if (error) return { ok: false, error: error.message };
      await supabase.from("contact_events").insert(
        ids.map((id) => ({ contact_id: id, type: "status_change", summary: `Etapa masiva → ${LIFECYCLE_LABEL[action.lifecycle!]}`, data: { to: action.lifecycle } })),
      );
    }

    const tag = action.addTag ? cleanTag(action.addTag) : action.removeTag ? cleanTag(action.removeTag) : "";
    if (tag) {
      const { data, error } = await supabase.from("contacts").select("id, tags").in("id", ids);
      if (error) return { ok: false, error: error.message };
      for (const row of data ?? []) {
        const current = (row.tags as string[]) ?? [];
        const next = action.addTag ? [...new Set([...current, tag])] : current.filter((t) => t !== tag);
        await supabase.from("contacts").update({ tags: next }).eq("id", row.id);
      }
    }
    refresh();
    return { ok: true, data: ids.length };
  } catch (error) {
    return fail(error);
  }
}

/** Borrado definitivo (derecho de supresión). Borra también su historial. */
export async function deleteContact(contactId: string): Promise<Result> {
  try {
    await requireAdmin();
    const { error } = await db().from("contacts").delete().eq("id", contactId);
    if (error) return { ok: false, error: error.message };
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function syncContact(contactId: string): Promise<Result> {
  try {
    await requireAdmin();
    if (!resendSyncEnabled()) return { ok: false, error: "Resend no está conectado (RESEND_CRM_SYNC=true)." };
    const synced = await syncContactToResend(contactId);
    refresh();
    return synced ? { ok: true } : { ok: false, error: "Resend rechazó el contacto; revisa los registros." };
  } catch (error) {
    return fail(error);
  }
}

export async function pushSegment(segmentId: string): Promise<Result<{ synced: number }>> {
  try {
    await requireAdmin();
    const segment = segmentById(segmentId);
    if (!segment) return { ok: false, error: "Segmento desconocido." };
    const now = Date.now();
    const members = (await loadContacts()).filter((c) => c.email && matchesFilter(c, segment.filter, now));
    const { synced } = await pushSegmentToResend(segment.name, members);
    refresh();
    return { ok: true, data: { synced } };
  } catch (error) {
    return fail(error);
  }
}
