import { formatCop, nitroCompleteMonthly, nitroCompleteUnitPacks } from "@/lib/commercial-content";
import { GUIDE_GROUPS, GUIDE_HUBS, guidePath } from "@/lib/guias/hubs";
import { SITE_URL, getAllGuides } from "@/lib/guias/queries";
import { juanWhatsAppNumber } from "@/lib/juan-whatsapp";

// Resumen del sitio para agentes y buscadores con IA (formato llmstxt.org).
// Toda afirmación de producto sale de docs/producto/nitrobot.md y de las mismas
// constantes de precio que usa /nitro-complete; no añadir capacidades aquí.
export const revalidate = 3600;

function line(path: string, title: string, note?: string) {
  return `- [${title}](${SITE_URL}${path})${note ? `: ${note.replace(/\s+/g, " ").trim()}` : ""}`;
}

export async function GET() {
  const guides = await getAllGuides().catch(() => []);
  const firstPack = nitroCompleteUnitPacks[0];
  const phone = juanWhatsAppNumber();

  const guideSections = GUIDE_HUBS.flatMap((hub) => {
    const hubGuides = guides.filter((guide) => guide.hub === hub.slug);
    const pilar = hubGuides.find((guide) => guide.tipo === "pilar");
    if (!pilar) return [];
    const groups = GUIDE_GROUPS.flatMap((group) => {
      const items = hubGuides.filter((guide) => guide.tipo === "articulo" && guide.grupo === group.value);
      return items.length ? [`### ${group.title}`, "", ...items.map((guide) => line(guidePath(hub.slug, guide.slug), guide.title, guide.respuestaCorta)), ""] : [];
    });
    return [`## Guías: ${hub.headline}`, "", line(guidePath(hub.slug), pilar.title, pilar.respuestaCorta), "", ...groups];
  });

  const body = [
    "# Juan Arango Ecommerce · Nitro Complete",
    "",
    "> Sitio de Juan Arango, especialista en ecommerce en Colombia, y de Nitro Complete: un asesor de ventas con IA que atiende el WhatsApp de tiendas colombianas con su catálogo real. Incluye guías prácticas para vender por WhatsApp en Colombia (contraentrega, Nequi y PSE, envíos y reglas de Meta).",
    "",
    "Contenido en español de Colombia. Los ejemplos de conversaciones de las guías usan tiendas ficticias.",
    "",
    "## Nitro Complete",
    "",
    line("/nitro-complete", "Nitro Complete", "Asesor de ventas con IA para WhatsApp. Consulta el catálogo real (Shopify o productos que el negocio sube a Nitro), recomienda productos, responde notas de voz, recopila los datos de entrega, crea pedidos contraentrega en Shopify y escala a una persona los casos que lo necesitan. Pagos con Confío y seguimiento con 17TRACK según la configuración de cada tienda."),
    `- Precio: ${nitroCompleteMonthly.price} COP al mes, sin contrato ni cobro automático, con número gestionado por Nitro, ${nitroCompleteMonthly.turns} turnos y ${nitroCompleteMonthly.templates} plantillas por mes; el primer mes empieza cuando el asesor queda atendiendo (instalación en menos de ${nitroCompleteMonthly.installHours} horas desde el pago y la información del negocio). Funciona con Shopify o con productos que el negocio sube a su panel de Nitro (uno a uno o con plantilla de Excel). Recargas aparte desde ${formatCop(firstPack.priceCop)} COP por ${firstPack.units} turnos, que no vencen. Sin renovar, el asesor se pausa. Un turno es una respuesta enviada por el asesor.`,
    `- Contacto comercial: WhatsApp https://wa.me/${phone}`,
    `- Demostración gratuita: al escribir «quiero probar el asesor de Nitro con mi tienda» a ese WhatsApp, el dueño da un producto con su precio y el asesor lo atiende como si fuera su tienda. No crea pedidos ni cobros reales.`,
    "",
    ...guideSections,
    "## Más información",
    "",
    line("/sobre-mi", "Sobre Juan Arango", "Trayectoria en ecommerce y por qué creó Nitro Complete."),
    line("/soluciones/nitro-commerce", "Asesoría NitroCommerce", "Diagnóstico e implementación para tiendas online."),
    line("/guias", "Todas las guías"),
    line("/blog", "Blog", "Artículos sobre ecommerce, marketing e inteligencia artificial."),
    line("/legal/privacidad", "Política de privacidad"),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
