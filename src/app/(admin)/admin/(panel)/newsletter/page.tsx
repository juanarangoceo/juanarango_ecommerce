import Link from "next/link";
import type { Metadata } from "next";
import { Download, PenSquare } from "lucide-react";
import { ActivityChart } from "@/components/admin/activity-chart";
import { BarList } from "@/components/admin/bar-list";
import { AdminPage, Card, Section, SetupNotice, StatTile } from "@/components/admin/ui";
import { displayName, timeAgo } from "@/lib/crm/format";
import { computeKpis, dailySeries, delta, visibleContacts, visibleEvents } from "@/lib/crm/metrics";
import { loadCrmSnapshot } from "@/lib/crm/queries";

export const metadata: Metadata = { title: "Newsletter" };

const PLACEMENT: Record<string, string> = {
  newsletter_form: "Formulario en página",
  newsletter_popup: "Popup",
};

export default async function NewsletterPage() {
  const snapshot = await loadCrmSnapshot(90);
  if (!snapshot.ready) {
    return (
      <AdminPage title="Newsletter">
        <SetupNotice reason={snapshot.reason} />
      </AdminPage>
    );
  }

  const { now } = snapshot;
  const contacts = visibleContacts(snapshot.contacts);
  const events = visibleEvents(snapshot.events, snapshot.contacts);
  const kpis = computeKpis(contacts, events, now);
  const subEvents = events.filter((e) => e.type === "newsletter_subscribe");
  const net = kpis.newSubscribers30.value - kpis.unsubscribes30.value;
  const churn = kpis.subscribed ? Math.round((kpis.unsubscribes30.value / kpis.subscribed) * 1000) / 10 : 0;

  const count = (keyOf: (a: Record<string, string>) => string | undefined, labels: Record<string, string> = {}) => {
    const map = new Map<string, number>();
    for (const e of subEvents) {
      const key = keyOf(e.attribution ?? {});
      if (key) map.set(key, (map.get(key) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([label, value]) => ({ label: labels[label] ?? label, value }));
  };

  const latest = contacts
    .filter((c) => c.newsletter_status === "subscribed" && c.subscribed_at)
    .sort((a, b) => Date.parse(b.subscribed_at!) - Date.parse(a.subscribed_at!))
    .slice(0, 8);

  return (
    <AdminPage
      title="Newsletter"
      description="Crecimiento de la lista y de dónde vienen los suscriptores. Las ediciones se escriben y envían desde el Studio."
      actions={
        <>
          <a href="/api/admin/crm/export?segment=suscriptores-activos" className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 px-4 text-sm font-medium text-white/80 hover:bg-white/[0.05]">
            <Download className="size-4" /> Suscriptores
          </a>
          <a href="/studio" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full bg-[#B7FF2A] px-4 text-sm font-semibold text-[#111311]">
            <PenSquare className="size-4" /> Escribir edición
          </a>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Suscriptores activos" value={kpis.subscribed} tone="green" />
        <StatTile label="Nuevos (30 días)" value={kpis.newSubscribers30.value} change={delta(kpis.newSubscribers30)} />
        <StatTile label="Bajas (30 días)" value={kpis.unsubscribes30.value} tone={kpis.unsubscribes30.value ? "alert" : "default"} hint={`${churn}% de la lista`} />
        <StatTile label="Crecimiento neto" value={net} tone={net > 0 ? "green" : net < 0 ? "alert" : "default"} hint="altas menos bajas" />
      </div>

      <Section title="Nuevos suscriptores por día">
        <Card className="p-4 md:p-6">
          <ActivityChart points={dailySeries(subEvents, 90, now)} />
        </Card>
      </Section>

      <div className="grid gap-4 lg:grid-cols-3">
        <Section title="Dónde se suscriben" className="lg:mt-10">
          <Card className="p-3">
            <BarList items={count((a) => a.placement, PLACEMENT)} empty="Se verá con las nuevas suscripciones." />
          </Card>
        </Section>
        <Section title="Desde qué página" className="lg:mt-10">
          <Card className="p-3">
            <BarList tone="white" items={count((a) => a.landing_path)} empty="Se verá con las nuevas suscripciones." />
          </Card>
        </Section>
        <Section title="Últimos en llegar" className="lg:mt-10" actions={<Link href="/admin/contactos?newsletter=subscribed" className="text-xs font-medium text-white/55 hover:text-white">Ver todos</Link>}>
          <Card className="divide-y divide-white/[0.06]">
            {latest.map((c) => (
              <Link key={c.id} href={`/admin/contactos?id=${c.id}`} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm hover:bg-white/[0.02]">
                <span className="min-w-0 truncate text-white/85">{c.email ?? displayName(c)}</span>
                <span className="shrink-0 text-xs text-white/40">{timeAgo(c.subscribed_at, now)}</span>
              </Link>
            ))}
            {!latest.length ? <p className="px-4 py-6 text-center text-sm text-white/45">Sin suscriptores todavía.</p> : null}
          </Card>
        </Section>
      </div>

      <Section title="Cómo se envía hoy">
        <Card className="p-5 text-sm leading-6 text-white/65">
          <ol className="list-decimal space-y-1.5 pl-5">
            <li>Se redacta la edición en el Studio (documento «Newsletter»).</li>
            <li>El botón de envío dispara Inngest, que toma los suscriptores activos de este CRM.</li>
            <li>Resend entrega un correo por persona con su enlace de baja; la baja vuelve aquí al instante.</li>
          </ol>
        </Card>
      </Section>
    </AdminPage>
  );
}
