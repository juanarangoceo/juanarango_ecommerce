import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock, Download, Mail, UserPlus, Users, Zap } from "lucide-react";
import { ActivityChart } from "@/components/admin/activity-chart";
import { BarList } from "@/components/admin/bar-list";
import { EventIcon } from "@/components/admin/event-icon";
import { AdminPage, Card, Section, SetupNotice, StatTile } from "@/components/admin/ui";
import { EVENT_LABEL, LIFECYCLE_LABEL, formLabel } from "@/lib/crm/config";
import { displayName, timeAgo } from "@/lib/crm/format";
import { computeKpis, dailySeries, delta, lifecycleFunnel, topLandingPaths, topSources, visibleContacts, visibleEvents } from "@/lib/crm/metrics";
import { loadCrmSnapshot } from "@/lib/crm/queries";

export const metadata: Metadata = { title: "Resumen" };

function greeting(now: number) {
  const hour = Number(new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: "America/Bogota" }).format(now));
  return hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
}

export default async function AdminHome() {
  const snapshot = await loadCrmSnapshot(90);

  if (!snapshot.ready) {
    return (
      <AdminPage title="Resumen">
        <SetupNotice reason={snapshot.reason} />
      </AdminPage>
    );
  }

  const { now } = snapshot;
  const contacts = visibleContacts(snapshot.contacts);
  const events = visibleEvents(snapshot.events, snapshot.contacts);
  const kpis = computeKpis(contacts, events, now);
  const series = dailySeries(events, 90, now);
  const funnel = lifecycleFunnel(contacts).filter((f) => f.lifecycle !== "descartado");
  const recent = events.slice(0, 10);

  return (
    <AdminPage
      title={`${greeting(now)}, Juan`}
      description="Así va la captación de juanarangoecommerce.com en los últimos 30 días. Las pruebas internas no cuentan."
      actions={
        <>
          <a href="/api/admin/crm/export" className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 px-4 text-sm font-medium text-white/80 hover:bg-white/[0.05]">
            <Download className="size-4" /> CSV
          </a>
          <Link href="/admin/contactos" className="inline-flex h-10 items-center gap-2 rounded-full bg-[#B7FF2A] px-4 text-sm font-semibold text-[#111311]">
            Contactos <ArrowRight className="size-4" />
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Contactos" value={kpis.totalContacts} change={delta(kpis.newContacts30)} hint={`+${kpis.newContacts30.value} en 30 días`} icon={<Users className="size-4" />} />
        <StatTile label="Suscriptores activos" value={kpis.subscribed} tone="green" change={delta(kpis.newSubscribers30)} hint={`+${kpis.newSubscribers30.value} nuevos`} icon={<Mail className="size-4" />} />
        <StatTile label="Prospectos en curso" value={kpis.pipeline} change={delta(kpis.prospectSignals30)} hint={`${kpis.prospectSignals30.value} solicitudes`} icon={<UserPlus className="size-4" />} />
        <StatTile label="Te esperan" value={kpis.waiting.length} tone={kpis.waiting.length ? "alert" : "default"} hint="prospectos sin mover > 48 h" icon={<Clock className="size-4" />} />
      </div>

      {kpis.waiting.length ? (
        <Card className="mt-4 border-[#FF6A13]/25 bg-gradient-to-br from-[#FF6A13]/[0.08] to-transparent p-4 md:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#FF9A5C]">
              <Zap className="size-4" /> Responde primero a estos prospectos
            </p>
            <Link href="/admin/contactos?lifecycle=prospecto" className="text-xs font-medium text-white/60 hover:text-white">
              Ver todos
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-white/[0.06]">
            {kpis.waiting.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link href={`/admin/contactos?id=${c.id}`} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-white">{displayName(c)}</span>
                    <span className="block truncate text-xs text-white/45">{c.forms.map(formLabel).join(" · ") || c.email}</span>
                  </span>
                  <span className="shrink-0 text-xs text-white/45">{timeAgo(c.last_activity_at, now)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      <Section title="Captación diaria" description="Suscripciones, formularios, recursos descargados y llamadas agendadas.">
        <Card className="p-4 md:p-6">
          <ActivityChart points={series} />
        </Card>
      </Section>

      <div className="grid gap-4 lg:grid-cols-3">
        <Section title="Embudo" description="Contactos por etapa." className="lg:mt-10">
          <Card className="p-3">
            <BarList items={funnel.map((f) => ({ label: LIFECYCLE_LABEL[f.lifecycle], value: f.count, href: `/admin/contactos?lifecycle=${f.lifecycle}` }))} />
          </Card>
        </Section>
        <Section title="De dónde llegan" description="Primer origen de cada contacto." className="lg:mt-10">
          <Card className="p-3">
            <BarList tone="white" items={topSources(contacts).map((s) => ({ label: s.source, value: s.count }))} />
          </Card>
        </Section>
        <Section title="Páginas que convierten" description="Página donde se registró por primera vez." className="lg:mt-10">
          <Card className="p-3">
            <BarList tone="white" items={topLandingPaths(contacts).map((s) => ({ label: s.source, value: s.count }))} empty="Aparecerá con los nuevos registros (antes no se guardaba la página)." />
          </Card>
        </Section>
      </div>

      <Section title="Actividad reciente" actions={<Link href="/admin/formularios" className="text-xs font-medium text-white/55 hover:text-white">Por formulario</Link>}>
        <Card className="divide-y divide-white/[0.06]">
          {recent.length ? (
            recent.map((e) => (
              <Link key={e.id} href={`/admin/contactos?id=${e.contact_id}`} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02]">
                <EventIcon type={e.type} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-white">
                    <span className="font-medium">{e.contacts ? displayName(e.contacts) : "Contacto"}</span>
                    <span className="text-white/50"> · {e.summary ?? EVENT_LABEL[e.type]}</span>
                  </span>
                  <span className="block text-xs text-white/40">{formLabel(e.form)}</span>
                </span>
                <span className="shrink-0 text-xs text-white/40">{timeAgo(e.created_at, now)}</span>
              </Link>
            ))
          ) : (
            <p className="px-4 py-8 text-center text-sm text-white/45">Todavía no hay actividad en los últimos 90 días.</p>
          )}
        </Card>
      </Section>
    </AdminPage>
  );
}
