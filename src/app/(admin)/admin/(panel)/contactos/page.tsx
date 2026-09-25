import type { Metadata } from "next";
import { ContactsExplorer } from "@/components/admin/contacts-explorer";
import { AdminPage, SetupNotice } from "@/components/admin/ui";
import { FORMS, LIFECYCLES, type FormKey, type Lifecycle } from "@/lib/crm/config";
import { loadCrmSnapshot } from "@/lib/crm/queries";
import { resendSyncEnabled } from "@/lib/crm/resend-sync";
import { segmentById, type ContactFilter } from "@/lib/crm/segments";

export const metadata: Metadata = { title: "Contactos" };

type Search = Promise<Record<string, string | string[] | undefined>>;

export default async function ContactsPage({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;
  const one = (key: string) => (typeof params[key] === "string" ? (params[key] as string) : undefined);
  const snapshot = await loadCrmSnapshot(1);

  const lifecycle = one("lifecycle");
  const form = one("form");
  const newsletter = one("newsletter");
  const initialFilter: ContactFilter = {
    ...(lifecycle && (LIFECYCLES as readonly string[]).includes(lifecycle) ? { lifecycle: lifecycle as Lifecycle } : {}),
    ...(form && form in FORMS ? { form: form as FormKey } : {}),
    ...(newsletter === "subscribed" || newsletter === "unsubscribed" || newsletter === "none" ? { newsletter } : {}),
    ...(one("q") ? { q: one("q") } : {}),
  };

  return (
    <AdminPage title="Contactos" description="Una ficha por persona con todo lo que ha hecho en el sitio. Toca un contacto para ver su historial y moverlo de etapa.">
      {snapshot.ready ? (
        <ContactsExplorer contacts={snapshot.contacts} initialFilter={initialFilter} initialContactId={one("id")} initialSegmentId={segmentById(one("segment") ?? "")?.id} resendEnabled={resendSyncEnabled()} now={snapshot.now} />
      ) : (
        <SetupNotice reason={snapshot.reason} />
      )}
    </AdminPage>
  );
}
