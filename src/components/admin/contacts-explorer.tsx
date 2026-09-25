"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Download, Search, SlidersHorizontal, Tag, X } from "lucide-react";
import { ContactDrawer } from "@/components/admin/contact-drawer";
import { LIFECYCLE_TONE, Pill } from "@/components/admin/ui";
import { bulkUpdate } from "@/app/(admin)/admin/actions";
import { FORMS, INTERNAL_TAG, LIFECYCLES, LIFECYCLE_LABEL, NEWSLETTER_LABEL, formLabel, type FormKey, type Lifecycle, type NewsletterStatus } from "@/lib/crm/config";
import { displayName, initials, timeAgo } from "@/lib/crm/format";
import { SEGMENTS, matchesFilter, type ContactFilter, type ContactRow } from "@/lib/crm/segments";

type Sort = "activity" | "score" | "created" | "name";
const PAGE = 60;

function exportHref(filter: ContactFilter, ids?: string[]) {
  const params = new URLSearchParams();
  if (ids?.length) params.set("ids", ids.join(","));
  else {
    if (filter.q) params.set("q", filter.q);
    if (filter.lifecycle && filter.lifecycle !== "all") params.set("lifecycle", filter.lifecycle);
    if (filter.form && filter.form !== "all") params.set("form", filter.form);
    if (filter.newsletter && filter.newsletter !== "all") params.set("newsletter", filter.newsletter);
    if (filter.tag) params.set("tag", filter.tag);
    if (filter.includeInternal) params.set("internal", "1");
  }
  return `/api/admin/crm/export?${params}`;
}

function Select<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (value: T) => void }) {
  return (
    <label className="relative inline-flex">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={`h-9 appearance-none rounded-full border pl-3 pr-8 text-[13px] font-medium outline-none transition focus:ring-2 focus:ring-[#B7FF2A]/30 ${
          value === "all" ? "border-white/10 bg-white/[0.03] text-white/65" : "border-[#B7FF2A]/40 bg-[#B7FF2A]/10 text-[#D7FF85]"
        }`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#131613] text-white">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-white/45" />
    </label>
  );
}

export function ContactsExplorer({
  contacts,
  initialFilter,
  initialContactId,
  initialSegmentId,
  resendEnabled,
  now,
}: {
  contacts: ContactRow[];
  initialFilter: ContactFilter;
  initialContactId?: string;
  initialSegmentId?: string;
  /** Instante del servidor para los filtros por fecha (render puro). */
  now: number;
  resendEnabled: boolean;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<ContactFilter>({ lifecycle: "all", newsletter: "all", form: "all", ...initialFilter });
  const [segmentId, setSegmentId] = useState<string | null>(initialSegmentId ?? null);
  const [sort, setSort] = useState<Sort>("activity");
  const [limit, setLimit] = useState(PAGE);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(initialContactId ?? null);
  const [showFilters, setShowFilters] = useState(Boolean(initialFilter.lifecycle || initialFilter.form || initialFilter.newsletter));
  const [bulkTag, setBulkTag] = useState("");
  const [toast, setToast] = useState("");
  const [pending, startTransition] = useTransition();
  const searchRef = useRef<HTMLInputElement>(null);

  // Atajo «/» para buscar, como en las herramientas de escritorio.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Enlace profundo al contacto abierto (?id=), útil desde el resumen.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (openId) url.searchParams.set("id", openId);
    else url.searchParams.delete("id");
    window.history.replaceState(null, "", url);
  }, [openId]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(id);
  }, [toast]);

  const tags = useMemo(() => [...new Set(contacts.flatMap((c) => c.tags))].sort(), [contacts]);

  const results = useMemo(() => {
    const segment = SEGMENTS.find((s) => s.id === segmentId);
    const merged: ContactFilter = segment ? { ...segment.filter, q: filter.q, includeInternal: filter.includeInternal } : filter;
    const list = contacts.filter((c) => matchesFilter(c, merged, now));
    const by: Record<Sort, (a: ContactRow, b: ContactRow) => number> = {
      activity: (a, b) => Date.parse(b.last_activity_at) - Date.parse(a.last_activity_at),
      score: (a, b) => b.score - a.score || Date.parse(b.last_activity_at) - Date.parse(a.last_activity_at),
      created: (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
      name: (a, b) => displayName(a).localeCompare(displayName(b), "es"),
    };
    return list.sort(by[sort]);
  }, [contacts, filter, segmentId, sort, now]);

  const effectiveFilter = useMemo(() => {
    const segment = SEGMENTS.find((s) => s.id === segmentId);
    return segment ? { ...segment.filter, q: filter.q, includeInternal: filter.includeInternal } : filter;
  }, [filter, segmentId]);

  const visible = results.slice(0, limit);
  const allVisibleSelected = visible.length > 0 && visible.every((c) => selected.has(c.id));
  const open = contacts.find((c) => c.id === openId) ?? null;
  const activeFilters = [filter.lifecycle !== "all", filter.form !== "all", filter.newsletter !== "all", Boolean(filter.tag), Boolean(filter.includeInternal)].filter(Boolean).length;

  const update = (patch: Partial<ContactFilter>) => {
    setSegmentId(null);
    setLimit(PAGE);
    setFilter((f) => ({ ...f, ...patch }));
  };

  const toggle = (id: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const runBulk = (action: Parameters<typeof bulkUpdate>[1], label: string) => {
    const ids = [...selected];
    startTransition(async () => {
      const result = await bulkUpdate(ids, action);
      if (result.ok) {
        setToast(`${label}: ${ids.length} contacto${ids.length === 1 ? "" : "s"}.`);
        setSelected(new Set());
        setBulkTag("");
        router.refresh();
      } else setToast(result.error);
    });
  };

  return (
    <div>
      {/* Segmentos rápidos: el mismo criterio que la exportación y Resend. */}
      <div className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0" style={{ scrollbarWidth: "none" }}>
        <button
          type="button"
          onClick={() => {
            setSegmentId(null);
            setFilter({ lifecycle: "all", newsletter: "all", form: "all", q: filter.q });
          }}
          className={`shrink-0 rounded-full border px-3 py-1.5 text-[13px] font-medium transition ${!segmentId && activeFilters === 0 ? "border-white bg-white text-[#111311]" : "border-white/10 text-white/60 hover:text-white"}`}
        >
          Todos
        </button>
        {SEGMENTS.map((s) => (
          <button
            key={s.id}
            type="button"
            title={s.description}
            onClick={() => {
              setSegmentId(segmentId === s.id ? null : s.id);
              setLimit(PAGE);
            }}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[13px] font-medium transition ${segmentId === s.id ? "border-[#B7FF2A] bg-[#B7FF2A] text-[#111311]" : "border-white/10 text-white/60 hover:border-white/20 hover:text-white"}`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="relative min-w-0 flex-1 basis-60">
          <span className="sr-only">Buscar contactos</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
          <input
            ref={searchRef}
            type="search"
            value={filter.q ?? ""}
            onChange={(e) => {
              setLimit(PAGE);
              setFilter((f) => ({ ...f, q: e.target.value }));
            }}
            placeholder="Buscar por nombre, email, empresa o etiqueta"
            className="h-11 w-full rounded-full border border-white/10 bg-[#131613] pl-10 pr-10 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-[#B7FF2A]/50 focus:ring-4 focus:ring-[#B7FF2A]/10 md:text-sm"
          />
          <kbd className="pointer-events-none absolute right-3.5 top-1/2 hidden -translate-y-1/2 rounded border border-white/15 px-1.5 font-mono text-[10px] text-white/40 md:block">/</kbd>
        </label>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
          className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium ${activeFilters ? "border-[#B7FF2A]/40 text-[#D7FF85]" : "border-white/10 text-white/70"}`}
        >
          <SlidersHorizontal className="size-4" /> Filtros{activeFilters ? ` · ${activeFilters}` : ""}
        </button>
        <a href={exportHref(effectiveFilter)} className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-medium text-white/70 hover:bg-white/[0.04]">
          <Download className="size-4" /> <span className="hidden sm:inline">Exportar</span> CSV
        </a>
      </div>

      {showFilters ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-white/[0.07] bg-[#131613]/60 p-3">
          <Select<Lifecycle | "all">
            label="Etapa"
            value={filter.lifecycle ?? "all"}
            onChange={(lifecycle) => update({ lifecycle })}
            options={[{ value: "all", label: "Todas las etapas" }, ...LIFECYCLES.map((l) => ({ value: l, label: LIFECYCLE_LABEL[l] }))]}
          />
          <Select<FormKey | "all">
            label="Formulario"
            value={filter.form ?? "all"}
            onChange={(form) => update({ form })}
            options={[{ value: "all", label: "Todos los formularios" }, ...(Object.keys(FORMS) as FormKey[]).map((f) => ({ value: f, label: FORMS[f].label }))]}
          />
          <Select<NewsletterStatus | "all">
            label="Newsletter"
            value={filter.newsletter ?? "all"}
            onChange={(newsletter) => update({ newsletter })}
            options={[{ value: "all", label: "Newsletter: todos" }, ...(["subscribed", "unsubscribed", "none"] as const).map((n) => ({ value: n, label: NEWSLETTER_LABEL[n] }))]}
          />
          {tags.length ? (
            <Select<string>
              label="Etiqueta"
              value={filter.tag || "all"}
              onChange={(tag) => update({ tag: tag === "all" ? undefined : tag })}
              options={[{ value: "all", label: "Todas las etiquetas" }, ...tags.map((t) => ({ value: t, label: `#${t}` }))]}
            />
          ) : null}
          <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-[13px] text-white/60">
            <input type="checkbox" checked={Boolean(filter.includeInternal)} onChange={(e) => update({ includeInternal: e.target.checked })} className="size-4 accent-[#B7FF2A]" />
            Incluir pruebas (#{INTERNAL_TAG})
          </label>
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-between gap-3 text-sm text-white/50">
        <p>
          <span className="font-semibold text-white tabular-nums">{results.length.toLocaleString("es-CO")}</span> contacto{results.length === 1 ? "" : "s"}
          {segmentId ? <span className="text-white/40"> · {SEGMENTS.find((s) => s.id === segmentId)?.play}</span> : null}
        </p>
        <label className="relative inline-flex items-center">
          <span className="sr-only">Ordenar</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="appearance-none bg-transparent pr-5 text-[13px] text-white/65 outline-none">
            <option value="activity" className="bg-[#131613]">Actividad reciente</option>
            <option value="score" className="bg-[#131613]">Mayor intención</option>
            <option value="created" className="bg-[#131613]">Más nuevos</option>
            <option value="name" className="bg-[#131613]">Nombre</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-0 size-3.5 text-white/45" />
        </label>
      </div>

      {/* Escritorio: tabla. */}
      <div className="mt-3 hidden overflow-hidden rounded-[1.35rem] border border-white/[0.07] bg-[#131613] md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/[0.07] text-xs text-white/45">
            <tr>
              <th className="w-10 py-3 pl-4">
                <input
                  type="checkbox"
                  aria-label="Seleccionar visibles"
                  checked={allVisibleSelected}
                  onChange={() => setSelected(allVisibleSelected ? new Set() : new Set(visible.map((c) => c.id)))}
                  className="size-4 accent-[#B7FF2A]"
                />
              </th>
              <th className="py-3 pr-3 font-medium">Contacto</th>
              <th className="py-3 pr-3 font-medium">Etapa</th>
              <th className="py-3 pr-3 font-medium">Formularios</th>
              <th className="py-3 pr-3 font-medium">Intención</th>
              <th className="py-3 pr-4 text-right font-medium">Actividad</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((c) => (
              <tr key={c.id} onClick={() => setOpenId(c.id)} className={`cursor-pointer border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.025] ${selected.has(c.id) ? "bg-[#B7FF2A]/[0.04]" : ""}`}>
                <td className="py-3 pl-4" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" aria-label={`Seleccionar ${displayName(c)}`} checked={selected.has(c.id)} onChange={() => toggle(c.id)} className="size-4 accent-[#B7FF2A]" />
                </td>
                <td className="max-w-0 py-3 pr-3">
                  <div className="flex items-center gap-3">
                    <Avatar contact={c} />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">
                        {displayName(c)}
                        {c.newsletter_status === "subscribed" ? <span className="ml-1.5 inline-block size-1.5 rounded-full bg-[#B7FF2A] align-middle" title="Suscrito a la newsletter" /> : null}
                      </p>
                      <p className="truncate text-xs text-white/45">{[c.email, c.company].filter(Boolean).join(" · ") || c.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-3">
                  <Pill tone={LIFECYCLE_TONE[c.lifecycle]}>{LIFECYCLE_LABEL[c.lifecycle]}</Pill>
                </td>
                <td className="py-3 pr-3 text-xs text-white/55">{c.forms.map(formLabel).join(", ") || "—"}</td>
                <td className="py-3 pr-3">
                  <ScoreBar score={c.score} />
                </td>
                <td className="py-3 pr-4 text-right text-xs text-white/45">{timeAgo(c.last_activity_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!visible.length ? <p className="px-4 py-12 text-center text-sm text-white/45">Ningún contacto coincide con estos filtros.</p> : null}
      </div>

      {/* Móvil: tarjetas con selección por pulsación en el avatar. */}
      <ul className="mt-3 space-y-2 md:hidden">
        {visible.map((c) => (
          <li key={c.id} className={`flex items-center gap-3 rounded-2xl border bg-[#131613] p-3 transition-colors ${selected.has(c.id) ? "border-[#B7FF2A]/40" : "border-white/[0.07]"}`}>
            <button type="button" onClick={() => toggle(c.id)} aria-pressed={selected.has(c.id)} aria-label={`Seleccionar ${displayName(c)}`} className="shrink-0">
              {selected.has(c.id) ? (
                <span className="grid size-10 place-items-center rounded-full bg-[#B7FF2A] text-[#111311]">
                  <Check className="size-5" />
                </span>
              ) : (
                <Avatar contact={c} size="lg" />
              )}
            </button>
            <button type="button" onClick={() => setOpenId(c.id)} className="min-w-0 flex-1 text-left">
              <span className="flex items-center justify-between gap-2">
                <span className="truncate text-[15px] font-medium text-white">{displayName(c)}</span>
                <span className="shrink-0 text-[11px] text-white/40">{timeAgo(c.last_activity_at)}</span>
              </span>
              <span className="mt-0.5 block truncate text-xs text-white/45">{c.email ?? c.phone}</span>
              <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <Pill tone={LIFECYCLE_TONE[c.lifecycle]}>{LIFECYCLE_LABEL[c.lifecycle]}</Pill>
                {c.newsletter_status === "subscribed" ? <Pill tone="green">Newsletter</Pill> : null}
                {c.forms.filter((f) => f !== "newsletter").slice(0, 2).map((f) => (
                  <Pill key={f}>{formLabel(f)}</Pill>
                ))}
              </span>
            </button>
          </li>
        ))}
        {!visible.length ? <li className="rounded-2xl border border-white/[0.07] px-4 py-10 text-center text-sm text-white/45">Ningún contacto coincide con estos filtros.</li> : null}
      </ul>

      {results.length > limit ? (
        <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="mx-auto mt-4 flex h-11 items-center rounded-full border border-white/10 px-5 text-sm font-medium text-white/70 hover:bg-white/[0.04]">
          Ver {Math.min(PAGE, results.length - limit)} más
        </button>
      ) : null}

      {/* Barra de acciones masivas: sobre la barra de pestañas en móvil. */}
      {selected.size ? (
        <div className="fixed inset-x-3 bottom-[calc(4.9rem+env(safe-area-inset-bottom))] z-40 mx-auto max-w-3xl rounded-2xl border border-white/12 bg-[#1A1E1A]/95 p-3 shadow-2xl backdrop-blur-xl md:bottom-6 md:left-[calc(15rem+1.5rem)] md:right-6">
          <div className="flex flex-wrap items-center gap-2">
            <p className="mr-auto text-sm font-medium text-white">
              {selected.size} seleccionado{selected.size === 1 ? "" : "s"}
            </p>
            <label className="relative inline-flex">
              <span className="sr-only">Cambiar etapa</span>
              <select
                disabled={pending}
                value=""
                onChange={(e) => e.target.value && runBulk({ lifecycle: e.target.value as Lifecycle }, `Etapa → ${LIFECYCLE_LABEL[e.target.value as Lifecycle]}`)}
                className="h-9 appearance-none rounded-full border border-white/12 bg-transparent pl-3 pr-8 text-[13px] text-white/80 outline-none"
              >
                <option value="" className="bg-[#131613]">Cambiar etapa</option>
                {LIFECYCLES.map((l) => (
                  <option key={l} value={l} className="bg-[#131613]">
                    {LIFECYCLE_LABEL[l]}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-white/45" />
            </label>
            <form
              className="flex items-center"
              onSubmit={(e) => {
                e.preventDefault();
                if (bulkTag.trim()) runBulk({ addTag: bulkTag }, `Etiqueta #${bulkTag.trim()}`);
              }}
            >
              <label className="relative">
                <span className="sr-only">Añadir etiqueta</span>
                <Tag className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-white/40" />
                <input value={bulkTag} onChange={(e) => setBulkTag(e.target.value)} placeholder="Etiqueta" disabled={pending} className="h-9 w-28 rounded-full border border-white/12 bg-transparent pl-7 pr-2 text-[13px] text-white outline-none placeholder:text-white/35" />
              </label>
            </form>
            <a href={exportHref(effectiveFilter, [...selected])} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#B7FF2A] px-3 text-[13px] font-semibold text-[#111311]">
              <Download className="size-3.5" /> CSV
            </a>
            <button type="button" onClick={() => setSelected(new Set())} className="grid size-9 place-items-center rounded-full text-white/55 hover:text-white" aria-label="Quitar selección">
              <X className="size-4" />
            </button>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div role="status" className="fixed left-1/2 top-[calc(4.5rem+env(safe-area-inset-top))] z-[60] -translate-x-1/2 rounded-full border border-white/10 bg-[#1A1E1A] px-4 py-2 text-sm text-white shadow-2xl md:top-6">
          {toast}
        </div>
      ) : null}

      <ContactDrawer
        contact={open}
        resendEnabled={resendEnabled}
        onClose={() => setOpenId(null)}
        onChanged={(message) => {
          if (message) setToast(message);
          router.refresh();
        }}
        onDeleted={() => {
          setOpenId(null);
          setToast("Contacto eliminado.");
          router.refresh();
        }}
      />
    </div>
  );
}

export function Avatar({ contact, size = "md" }: { contact: ContactRow; size?: "md" | "lg" }) {
  const hot = contact.score >= 30 && contact.lifecycle !== "cliente" && contact.lifecycle !== "descartado";
  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-white/[0.12] to-white/[0.03] font-semibold text-white/85 ${size === "lg" ? "size-10 text-sm" : "size-8 text-xs"}`}
      aria-hidden
    >
      {initials(contact)}
      {hot ? <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-[#131613] bg-[#FF6A13]" /> : null}
    </span>
  );
}

export function ScoreBar({ score }: { score: number }) {
  return (
    <span className="flex items-center gap-2" title={`${score} puntos de intención`}>
      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white/[0.08]">
        <span className="block h-full rounded-full bg-[#B7FF2A]" style={{ width: `${Math.min(100, score)}%` }} />
      </span>
      <span className="text-xs tabular-nums text-white/55">{score}</span>
    </span>
  );
}
