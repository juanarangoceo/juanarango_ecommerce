import Link from "next/link";
import type { Metadata } from "next";
import { ChevronDown, Download } from "lucide-react";
import { AdminPage, Card, ChangeBadge, Pill, SetupNotice } from "@/components/admin/ui";
import { displayName, timeAgo } from "@/lib/crm/format";
import { formStats, visibleContacts, visibleEvents } from "@/lib/crm/metrics";
import { loadCrmSnapshot } from "@/lib/crm/queries";

export const metadata: Metadata = { title: "Formularios" };

export default async function FormsPage() {
  const snapshot = await loadCrmSnapshot(90);
  if (!snapshot.ready) {
    return (
      <AdminPage title="Formularios">
        <SetupNotice reason={snapshot.reason} />
      </AdminPage>
    );
  }

  const { now } = snapshot;
  const contacts = visibleContacts(snapshot.contacts);
  const events = visibleEvents(snapshot.events, snapshot.contacts);
  const stats = formStats(contacts, events, now).sort((a, b) => b.last30 - a.last30 || b.total90 - a.total90);

  return (
    <AdminPage title="Formularios" description="Cada punto de captura del sitio: cuánto recibe, quién llegó y qué respondió. Todos escriben en el mismo CRM.">
      <div className="grid gap-3 md:grid-cols-2">
        {stats.map((s) => {
          const recent = events.filter((e) => e.form === s.form && e.type !== "status_change" && e.type !== "note").slice(0, 6);
          const change = s.previous30 === 0 ? (s.last30 > 0 ? null : 0) : Math.round(((s.last30 - s.previous30) / s.previous30) * 100);
          return (
            <Card key={s.form} className="flex flex-col p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-semibold tracking-[-0.02em] text-white">{s.label}</h2>
                  <p className="truncate text-xs text-white/45">{s.where}</p>
                </div>
                {s.last && now - Date.parse(s.last) < 7 * 86_400_000 ? <Pill tone="green">Activo esta semana</Pill> : <Pill>Sin envíos recientes</Pill>}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.03em] tabular-nums">{s.last30}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-1 text-[11px] text-white/45">
                    30 días <ChangeBadge change={change} />
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.03em] tabular-nums text-white/80">{s.total90}</p>
                  <p className="mt-0.5 text-[11px] text-white/45">90 días</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.03em] tabular-nums text-white/80">{s.people}</p>
                  <p className="mt-0.5 text-[11px] text-white/45">personas (histórico)</p>
                </div>
              </div>

              <details className="group mt-4 border-t border-white/[0.06] pt-3">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-white/65 hover:text-white">
                  Últimos envíos {s.last ? <span className="text-white/40">· {timeAgo(s.last, now)}</span> : null}
                  <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-2 divide-y divide-white/[0.05]">
                  {recent.map((e) => (
                    <li key={e.id}>
                      <Link href={`/admin/contactos?id=${e.contact_id}`} className="flex items-center justify-between gap-3 py-2 text-sm">
                        <span className="min-w-0">
                          <span className="block truncate text-white/85">{e.contacts ? displayName(e.contacts) : "Contacto"}</span>
                          <span className="block truncate text-xs text-white/40">{e.summary}</span>
                        </span>
                        <span className="shrink-0 text-xs text-white/40">{timeAgo(e.created_at, now)}</span>
                      </Link>
                    </li>
                  ))}
                  {!recent.length ? <li className="py-3 text-sm text-white/45">Sin envíos en los últimos 90 días.</li> : null}
                </ul>
                <div className="mt-2 flex gap-2">
                  <Link href={`/admin/contactos?form=${s.form}`} className="inline-flex h-8 items-center rounded-full border border-white/10 px-3 text-xs text-white/70 hover:bg-white/[0.04]">
                    Ver contactos
                  </Link>
                  <a href={`/api/admin/crm/export?form=${s.form}`} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 px-3 text-xs text-white/70 hover:bg-white/[0.04]">
                    <Download className="size-3.5" /> CSV
                  </a>
                </div>
              </details>
            </Card>
          );
        })}
      </div>
    </AdminPage>
  );
}
