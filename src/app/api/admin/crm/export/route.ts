import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/lib/admin-guard";
import { FORMS, LIFECYCLES } from "@/lib/crm/config";
import type { ContactFilter } from "@/lib/crm/segments";
import { loadContacts } from "@/lib/crm/queries";
import { matchesFilter, segmentById, toCsv } from "@/lib/crm/segments";

export const dynamic = "force-dynamic";

// CSV de contactos para importar en Resend u otra herramienta.
// `?segment=<id>` exporta un segmento; si no, aplica los filtros de la tabla
// (`q`, `lifecycle`, `newsletter`, `form`, `tag`, `internal=1`) o `ids=a,b,c`.
export async function GET(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const params = request.nextUrl.searchParams;

  let filter: ContactFilter = {};
  let name = "contactos";
  const segment = params.get("segment");
  if (segment) {
    const found = segmentById(segment);
    if (!found) return NextResponse.json({ error: "Segmento desconocido" }, { status: 404 });
    filter = found.filter;
    name = found.id;
  } else {
    const lifecycle = params.get("lifecycle");
    const form = params.get("form");
    const newsletter = params.get("newsletter");
    filter = {
      q: params.get("q") ?? undefined,
      lifecycle: lifecycle && (LIFECYCLES as readonly string[]).includes(lifecycle) ? (lifecycle as ContactFilter["lifecycle"]) : "all",
      form: form && form in FORMS ? (form as ContactFilter["form"]) : "all",
      newsletter: newsletter === "subscribed" || newsletter === "unsubscribed" || newsletter === "none" ? newsletter : "all",
      tag: params.get("tag") ?? undefined,
      includeInternal: params.get("internal") === "1",
    };
  }

  const ids = params.get("ids")?.split(",").filter(Boolean);
  const now = Date.now();
  const contacts = (await loadContacts()).filter((c) => (ids ? ids.includes(c.id) : matchesFilter(c, filter, now)));
  const stamp = new Date().toISOString().slice(0, 10);

  return new NextResponse(`﻿${toCsv(contacts)}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="jae-${name}-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
