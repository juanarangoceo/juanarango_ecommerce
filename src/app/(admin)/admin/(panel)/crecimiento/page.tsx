import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2, CircleDashed, Download } from "lucide-react";
import { PushSegmentButton } from "@/components/admin/segment-actions";
import { AdminPage, Card, Pill, Section, SetupNotice } from "@/components/admin/ui";
import { loadCrmSnapshot } from "@/lib/crm/queries";
import { resendSyncEnabled } from "@/lib/crm/resend-sync";
import { SEGMENTS, matchesFilter } from "@/lib/crm/segments";

export const metadata: Metadata = { title: "Crecimiento" };

// Solo comprueba si la variable existe; nunca muestra su valor.
const has = (...keys: string[]) => keys.every((key) => Boolean(process.env[key]?.trim()));

export default async function GrowthPage() {
  const snapshot = await loadCrmSnapshot(1);
  const resendOn = resendSyncEnabled();

  const integrations = [
    {
      name: "Resend · contactos y segmentos",
      ok: resendOn,
      detail: resendOn
        ? "Cada contacto nuevo se copia a Resend. Los segmentos se envían con un botón."
        : has("RESEND_API_KEY")
          ? "La API ya envía correos. Falta RESEND_CRM_SYNC=true en Vercel para copiar contactos y segmentos."
          : "Falta RESEND_API_KEY.",
    },
    { name: "Resend · correos transaccionales", ok: has("RESEND_API_KEY"), detail: "Bienvenida de la newsletter, resúmenes PDF y ediciones." },
    { name: "Inngest · envío de la newsletter", ok: has("INNGEST_EVENT_KEY") || has("INNGEST_SIGNING_KEY"), detail: "Reparte cada edición en un correo por suscriptor, con reintentos." },
    { name: "Telegram · avisos", ok: has("TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"), detail: "Aviso inmediato de diagnósticos y formularios de contacto." },
    { name: "Cal.com · reservas", ok: has("CAL_WEBHOOK_SECRET"), detail: "Cada reserva entra al CRM como «Calificado». Sin secreto el webhook queda cerrado en producción." },
    { name: "Nitro Bot · leads de Nitro Complete", ok: has("NITROBOT_API_URL", "NITROBOT_LEAD_INTAKE_SECRET"), detail: "Entrega oficial al panel de Nitro Bot; aquí queda una copia para marketing." },
    { name: "Notion · copia de suscriptores", ok: has("NOTION_SECRET", "NOTION_SUBSCRIBERS_DB_ID"), detail: "Opcional. Con el CRM ya no es necesaria." },
    { name: "Meta Pixel", ok: has("NEXT_PUBLIC_META_PIXEL_ID"), detail: "Atribución de campañas en las landings." },
  ];

  return (
    <AdminPage title="Crecimiento" description="Segmentos listos para email marketing y el estado de cada integración. Un segmento significa lo mismo aquí, en el CSV y en Resend.">
      {!snapshot.ready ? <SetupNotice reason={snapshot.reason} /> : null}

      <Section title="Segmentos" description="Audiencias vivas: se recalculan con cada registro.">
        <div className="grid gap-3 md:grid-cols-2">
          {SEGMENTS.map((segment) => {
            const count = snapshot.ready ? snapshot.contacts.filter((c) => matchesFilter(c, segment.filter, snapshot.now)).length : 0;
            return (
              <Card key={segment.id} className="flex flex-col p-4 md:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold tracking-[-0.02em] text-white">{segment.name}</h3>
                    <p className="mt-0.5 text-xs text-white/45">{segment.description}</p>
                  </div>
                  <p className="text-2xl font-semibold tracking-[-0.03em] tabular-nums text-[#B7FF2A]">{count}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  <span className="text-white/40">Estrategia: </span>
                  {segment.play}
                </p>
                <div className="mt-2">{segment.emailable ? <Pill tone="green">Apto para broadcast</Pill> : <Pill tone="alert">Seguimiento 1 a 1 o con consentimiento</Pill>}</div>
                <div className="mt-4 flex flex-wrap items-start gap-2 border-t border-white/[0.06] pt-3">
                  <Link href={`/admin/contactos?segment=${segment.id}`} className="inline-flex h-8 items-center rounded-full border border-white/10 px-3 text-xs text-white/70 hover:bg-white/[0.04]">
                    Ver contactos
                  </Link>
                  <a href={`/api/admin/crm/export?segment=${segment.id}`} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 px-3 text-xs text-white/70 hover:bg-white/[0.04]">
                    <Download className="size-3.5" /> CSV
                  </a>
                  <PushSegmentButton segmentId={segment.id} enabled={resendOn} count={count} />
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section title="Integraciones" description="Se comprueba si cada variable existe en este entorno; los valores nunca se muestran.">
        <Card className="divide-y divide-white/[0.06]">
          {integrations.map((i) => (
            <div key={i.name} className="flex items-start gap-3 px-4 py-3.5">
              {i.ok ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#B7FF2A]" /> : <CircleDashed className="mt-0.5 size-5 shrink-0 text-[#FF9A5C]" />}
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">{i.name}</p>
                <p className="text-xs leading-5 text-white/50">{i.detail}</p>
              </div>
            </div>
          ))}
        </Card>
      </Section>

      <Section title="Cómo conectar Resend en 3 pasos">
        <Card className="p-5 text-sm leading-6 text-white/65">
          <ol className="list-decimal space-y-1.5 pl-5">
            <li>
              En Vercel, añade <code className="rounded bg-white/[0.06] px-1.5 text-white/85">RESEND_CRM_SYNC=true</code> y vuelve a desplegar.
            </li>
            <li>Pulsa «Enviar a Resend» en cada segmento que quieras trabajar; se crea como «JAE · nombre».</li>
            <li>En Resend, usa ese segmento para broadcasts o automatizaciones. Las bajas se sincronizan solas.</li>
          </ol>
          <p className="mt-3 text-xs text-white/45">
            Criterio legal: en Resend solo queda como suscrito quien aceptó la newsletter. Los demás contactos entran dados de baja de los broadcasts.
          </p>
        </Card>
      </Section>
    </AdminPage>
  );
}
