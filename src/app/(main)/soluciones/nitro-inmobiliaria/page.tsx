import type { Metadata } from "next";
import { Building2, CalendarCheck, ListFilter, MessageSquareText, SearchCheck } from "lucide-react";
import { IndustryPage } from "@/components/commercial/industry-page";

export const metadata: Metadata = { title: "Soluciones digitales para inmobiliarias", description: "Inventario, calificación y seguimiento conectados para proyectos e inmobiliarias.", alternates: { canonical: "https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria" } };

export default function NitroInmobiliariaPage() {
  return <IndustryPage title="Ayuda a cada interesado a encontrar" highlight="la propiedad adecuada." description="Conectamos presentación de inventario, calificación y seguimiento para que el equipo reciba oportunidades con contexto y pueda continuar la conversación." icon={Building2} situations={["El inventario es difícil de explorar o se desactualiza entre canales", "Los formularios entregan contactos sin presupuesto, zona ni intención", "El seguimiento depende de información dispersa entre asesores y herramientas"]} modules={[{ title: "Inventario comprensible", description: "Páginas, fichas y filtros que ayudan a explorar opciones según la información disponible y vigente.", icon: SearchCheck }, { title: "Calificación inicial", description: "Preguntas breves sobre interés, presupuesto, ubicación y plazo antes de asignar la oportunidad.", icon: ListFilter }, { title: "Conversación con contexto", description: "Entrega al asesor de lo que la persona ya consultó para evitar empezar cada conversación desde cero.", icon: MessageSquareText }, { title: "Visita y seguimiento", description: "Conexión con el proceso real de agenda y continuidad comercial que usa el equipo.", icon: CalendarCheck }]} />;
}
