import type { Metadata } from "next";
import { BarChart3, Boxes, MessageSquareText, ShoppingBag, Store } from "lucide-react";
import { IndustryPage } from "@/components/commercial/industry-page";

export const metadata: Metadata = { title: "Soluciones digitales para ecommerce y retail", description: "Captación, catálogo, atención y operación conectados para ecommerce y comercios con puntos físicos.", alternates: { canonical: "https://www.juanarangoecommerce.com/soluciones/nitro-retail" } };

export default function NitroRetailPage() {
  return <IndustryPage title="Conecta lo que el cliente ve con" highlight="lo que tu equipo puede cumplir." description="Diseñamos el recorrido entre campañas, catálogo, conversación y pedido alrededor de tu inventario, tus canales y la capacidad real de la operación." icon={Store} situations={["El catálogo y la disponibilidad cambian entre canales", "Las consultas de producto consumen tiempo y no siempre avanzan a pedido", "El equipo necesita ver qué ocurrió antes de preparar o entregar una venta"]} modules={[{ title: "Oferta y captación", description: "Landings y recorridos que hacen clara la propuesta y conservan la atribución de cada campaña.", icon: ShoppingBag }, { title: "Catálogo e inventario", description: "Información de producto organizada para que el cliente y el equipo trabajen sobre una fuente confiable.", icon: Boxes }, { title: "Atención comercial", description: "Conversaciones y automatizaciones que resuelven lo repetitivo y escalan al equipo cuando hace falta criterio.", icon: MessageSquareText }, { title: "Medición operativa", description: "Eventos y estados que permiten entender el recorrido sin inventar resultados ni atribuciones.", icon: BarChart3 }]} />;
}
