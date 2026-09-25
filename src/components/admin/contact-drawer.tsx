"use client";

import { useEffect, useState, useTransition } from "react";
import { Building2, Loader2, Mail, MessageCircle, Phone, RefreshCw, Send, Trash2, X } from "lucide-react";
import { EventIcon } from "@/components/admin/event-icon";
import { Pill } from "@/components/admin/ui";
import { addNote, deleteContact, getTimeline, syncContact, updateContact } from "@/app/(admin)/admin/actions";
import { EVENT_LABEL, LIFECYCLES, LIFECYCLE_LABEL, NEWSLETTER_LABEL, formLabel, type Lifecycle } from "@/lib/crm/config";
import { displayName, formatDate, formatDateTime, initials, timeAgo } from "@/lib/crm/format";
import type { CrmEvent } from "@/lib/crm/queries";
import type { ContactRow } from "@/lib/crm/segments";

const ATTRIBUTION_LABEL: Record<string, string> = {
  utm_source: "Fuente",
  utm_medium: "Medio",
  utm_campaign: "Campaña",
  utm_content: "Anuncio",
  utm_term: "Término",
  landing_path: "Página",
  referrer: "Referido",
  placement: "Ubicación",
  fbclid: "Meta click",
  gclid: "Google click",
};

function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits.length === 10 ? `57${digits}` : digits}`;
}

// Ficha del contacto: panel lateral en escritorio, hoja a pantalla completa en
// móvil. Se edita en línea; cada cambio de etapa queda en el historial.
export function ContactDrawer({
  contact,
  resendEnabled,
  onClose,
  onChanged,
  onDeleted,
}: {
  contact: ContactRow | null;
  resendEnabled: boolean;
  onClose: () => void;
  onChanged: (message?: string) => void;
  onDeleted: () => void;
}) {
  const [timeline, setTimeline] = useState<CrmEvent[] | null>(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [lifecycle, setLifecycle] = useState<Lifecycle>("suscriptor");
  const [tags, setTags] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const contactId = contact?.id;

  // Al abrir otro contacto se reinicia la ficha y se pide su historial.
  useEffect(() => {
    if (!contactId || !contact) return;
    let cancelled = false;
    const reset = window.setTimeout(() => {
      setTimeline(null);
      setNotes(contact.notes ?? "");
      setLifecycle(contact.lifecycle);
      setTags(contact.tags);
      setConfirmDelete(false);
      setError("");
      setNote("");
    }, 0);
    getTimeline(contactId)
      .then((events) => !cancelled && setTimeline(events))
      .catch(() => !cancelled && setTimeline([]));
    return () => {
      cancelled = true;
      window.clearTimeout(reset);
    };
    // Solo al cambiar de contacto: no pisar lo que se está editando.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactId]);

  useEffect(() => {
    if (!contactId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [contactId, onClose]);

  if (!contact) return null;

  const refreshTimeline = () => getTimeline(contact.id).then(setTimeline).catch(() => undefined);

  const save = (patch: Parameters<typeof updateContact>[1], message?: string) =>
    startTransition(async () => {
      setError("");
      const result = await updateContact(contact.id, patch);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onChanged(message);
      if (patch.lifecycle) refreshTimeline();
    });

  const changeLifecycle = (next: Lifecycle) => {
    if (next === lifecycle) return;
    setLifecycle(next);
    save({ lifecycle: next }, `Etapa → ${LIFECYCLE_LABEL[next]}`);
  };

  const saveTags = (next: string[]) => {
    setTags(next);
    save({ tags: next });
  };

  const submitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    startTransition(async () => {
      const result = await addNote(contact.id, note);
      if (!result.ok) return setError(result.error);
      setNote("");
      refreshTimeline();
      onChanged("Nota guardada.");
    });
  };

  const attribution = Object.entries(contact.first_attribution ?? {}).filter(([, v]) => v);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <button type="button" aria-label="Cerrar" onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-[2px] admin-fade" />
      <aside className="absolute inset-x-0 bottom-0 top-[max(2.5rem,env(safe-area-inset-top))] flex flex-col overflow-hidden rounded-t-[1.75rem] border border-white/10 bg-[#101310] shadow-2xl admin-sheet md:inset-y-0 md:left-auto md:right-0 md:top-0 md:w-[30rem] md:rounded-none md:border-y-0 md:border-r-0">
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/20 md:hidden" aria-hidden />

        <header className="flex items-start gap-3 border-b border-white/[0.07] px-5 pb-4 pt-3 md:pt-6">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#B7FF2A]/30 to-[#B7FF2A]/5 text-base font-semibold text-[#E3FFAE]">{initials(contact)}</span>
          <div className="min-w-0 flex-1">
            <h2 id="contact-title" className="truncate text-lg font-semibold tracking-[-0.02em] text-white">
              {displayName(contact)}
            </h2>
            <p className="text-xs text-white/45">
              Desde {formatDate(contact.created_at)} · {contact.event_count} interacciones · {contact.score} pts
            </p>
          </div>
          <button type="button" onClick={onClose} className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.06] text-white/70 hover:text-white" aria-label="Cerrar ficha">
            <X className="size-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
          <div className="grid grid-cols-3 gap-2">
            {contact.email ? (
              <a href={`mailto:${contact.email}`} className="flex flex-col items-center gap-1 rounded-2xl bg-white/[0.04] py-3 text-xs text-white/75 hover:bg-white/[0.07]">
                <Mail className="size-4 text-[#B7FF2A]" /> Correo
              </a>
            ) : null}
            {contact.phone ? (
              <>
                <a href={whatsappHref(contact.phone)} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 rounded-2xl bg-white/[0.04] py-3 text-xs text-white/75 hover:bg-white/[0.07]">
                  <MessageCircle className="size-4 text-[#B7FF2A]" /> WhatsApp
                </a>
                <a href={`tel:${contact.phone}`} className="flex flex-col items-center gap-1 rounded-2xl bg-white/[0.04] py-3 text-xs text-white/75 hover:bg-white/[0.07]">
                  <Phone className="size-4 text-[#B7FF2A]" /> Llamar
                </a>
              </>
            ) : null}
          </div>

          <dl className="mt-4 space-y-2 text-sm">
            {contact.email ? <Row label="Email" value={contact.email} /> : null}
            {contact.phone ? <Row label="Teléfono" value={contact.phone} /> : null}
            {contact.company ? <Row label="Empresa" value={contact.company} icon={<Building2 className="size-3.5" />} /> : null}
            <Row label="Newsletter" value={NEWSLETTER_LABEL[contact.newsletter_status]} />
            <Row label="Primer formulario" value={formLabel(contact.source)} />
            {contact.consent_at ? <Row label="Consentimiento" value={formatDate(contact.consent_at)} /> : null}
          </dl>

          <h3 className="mb-2 mt-6 text-xs font-medium text-white/45">Etapa</h3>
          <div className="grid grid-cols-3 gap-1 rounded-2xl bg-white/[0.04] p-1 min-[420px]:grid-cols-5">
            {LIFECYCLES.map((l) => (
              <button
                key={l}
                type="button"
                disabled={pending}
                onClick={() => changeLifecycle(l)}
                aria-pressed={lifecycle === l}
                className={`rounded-xl px-1 py-2 text-[12px] font-medium transition ${
                  lifecycle === l ? (l === "descartado" ? "bg-white/15 text-white" : l === "prospecto" ? "bg-[#FF6A13] text-[#111311]" : "bg-[#B7FF2A] text-[#111311]") : "text-white/55 hover:text-white"
                }`}
              >
                {LIFECYCLE_LABEL[l]}
              </button>
            ))}
          </div>

          <h3 className="mb-2 mt-6 text-xs font-medium text-white/45">Etiquetas</h3>
          <div className="flex flex-wrap items-center gap-1.5">
            {tags.map((t) => (
              <button key={t} type="button" onClick={() => saveTags(tags.filter((x) => x !== t))} className="group" aria-label={`Quitar etiqueta ${t}`}>
                <Pill tone="white">
                  #{t} <X className="size-3 opacity-50 group-hover:opacity-100" />
                </Pill>
              </button>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const value = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
                if (value && !tags.includes(value)) saveTags([...tags, value]);
                setTagInput("");
              }}
            >
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="+ etiqueta" className="h-7 w-28 rounded-full border border-dashed border-white/15 bg-transparent px-2.5 text-[12px] text-white outline-none placeholder:text-white/35 focus:border-[#B7FF2A]/50" />
            </form>
          </div>

          <h3 className="mb-2 mt-6 text-xs font-medium text-white/45">Notas internas</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => notes !== (contact.notes ?? "") && save({ notes }, "Notas guardadas.")}
            rows={3}
            placeholder="Contexto, presupuesto, próximos pasos… (se guarda al salir)"
            className="w-full resize-y rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#B7FF2A]/40"
          />

          {attribution.length ? (
            <>
              <h3 className="mb-2 mt-6 text-xs font-medium text-white/45">Cómo llegó</h3>
              <dl className="grid grid-cols-2 gap-2">
                {attribution.map(([key, value]) => (
                  <div key={key} className="min-w-0 rounded-xl bg-white/[0.03] px-3 py-2">
                    <dt className="text-[10px] uppercase tracking-wide text-white/40">{ATTRIBUTION_LABEL[key] ?? key}</dt>
                    <dd className="truncate text-xs text-white/80" title={value}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          ) : null}

          <h3 className="mb-2 mt-6 text-xs font-medium text-white/45">Historial</h3>
          <form onSubmit={submitNote} className="mb-3 flex gap-2">
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Añadir nota al historial" className="h-10 min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#B7FF2A]/40" />
            <button type="submit" disabled={pending || !note.trim()} className="grid size-10 shrink-0 place-items-center rounded-full bg-[#B7FF2A] text-[#111311] disabled:opacity-40" aria-label="Guardar nota">
              {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            </button>
          </form>
          {timeline === null ? (
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-14 animate-pulse rounded-xl bg-white/[0.04]" />
              ))}
            </div>
          ) : (
            <ol className="relative space-y-3 before:absolute before:bottom-2 before:left-4 before:top-2 before:w-px before:bg-white/[0.08]">
              {timeline.map((event) => (
                <li key={event.id} className="relative flex gap-3">
                  <EventIcon type={event.type} className="relative ring-4 ring-[#101310]" />
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-sm text-white">{event.summary ?? EVENT_LABEL[event.type]}</p>
                    <p className="text-[11px] text-white/40" title={formatDateTime(event.created_at)}>
                      {formLabel(event.form)} · {timeAgo(event.created_at)}
                    </p>
                    <EventData data={event.data} />
                  </div>
                </li>
              ))}
            </ol>
          )}

          <div className="mt-8 space-y-2 border-t border-white/[0.07] pt-5">
            {resendEnabled && contact.email ? (
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    const r = await syncContact(contact.id);
                    if (r.ok) onChanged("Sincronizado con Resend.");
                    else setError(r.error);
                  })
                }
                className="flex h-10 w-full items-center justify-center gap-2 rounded-full border border-white/10 text-sm text-white/75 hover:bg-white/[0.04]"
              >
                <RefreshCw className="size-4" /> Sincronizar con Resend
                {contact.resend_synced_at ? <span className="text-white/40">· {timeAgo(contact.resend_synced_at)}</span> : null}
              </button>
            ) : null}
            {confirmDelete ? (
              <div className="rounded-2xl border border-[#FF6A13]/30 bg-[#FF6A13]/[0.07] p-3 text-sm">
                <p className="text-white/80">Se borran el contacto y todo su historial. No se puede deshacer.</p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      startTransition(async () => {
                        const r = await deleteContact(contact.id);
                        if (r.ok) onDeleted();
                        else setError(r.error);
                      })
                    }
                    className="h-9 flex-1 rounded-full bg-[#FF6A13] text-sm font-semibold text-[#111311]"
                  >
                    Borrar definitivamente
                  </button>
                  <button type="button" onClick={() => setConfirmDelete(false)} className="h-9 flex-1 rounded-full border border-white/12 text-sm text-white/75">
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => setConfirmDelete(true)} className="flex h-10 w-full items-center justify-center gap-2 rounded-full text-sm text-white/45 hover:text-[#FF9A5C]">
                <Trash2 className="size-4" /> Borrar contacto (solicitud de supresión)
              </button>
            )}
          </div>
        </div>

        {error ? (
          <p role="alert" className="border-t border-[#FF6A13]/30 bg-[#FF6A13]/10 px-5 py-2.5 text-sm text-[#FF9A5C]">
            {error}
          </p>
        ) : null}
      </aside>
    </div>
  );
}

function Row({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.05] pb-2">
      <dt className="shrink-0 text-white/45">{label}</dt>
      <dd className="flex min-w-0 items-center gap-1.5 truncate text-right text-white/85">
        {icon}
        <span className="truncate">{value}</span>
      </dd>
    </div>
  );
}

// Respuestas del formulario (diagnóstico, calificador…) en formato legible.
function EventData({ data }: { data: Record<string, unknown> }) {
  const flat = Object.entries(data ?? {}).flatMap(([key, value]) =>
    value && typeof value === "object" && !Array.isArray(value)
      ? Object.entries(value as Record<string, unknown>).map(([k, v]) => [`${key}.${k}`, v] as const)
      : [[key, value] as const],
  );
  const shown = flat.filter(([, v]) => v !== null && v !== undefined && v !== "" && typeof v !== "object");
  if (!shown.length) return null;
  return (
    <details className="mt-1.5 text-xs">
      <summary className="cursor-pointer select-none text-white/45 hover:text-white/70">Ver respuestas</summary>
      <dl className="mt-1.5 space-y-1 rounded-xl bg-white/[0.03] p-2.5">
        {shown.map(([key, value]) => (
          <div key={key} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-2">
            <dt className="truncate text-white/40">{key.replace(/_/g, " ")}</dt>
            <dd className="break-words text-white/80">{String(value)}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
