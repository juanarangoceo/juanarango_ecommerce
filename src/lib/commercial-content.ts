import {
  Bot,
  LayoutDashboard,
  MessageCircle,
  PackageCheck,
  RefreshCw,
  Truck,
  Users,
  Building2,
  ChartNoAxesCombined,
  HeartPulse,
  LayoutTemplate,
  SearchCheck,
  ShoppingBag,
  Store,
} from "lucide-react";

export const primaryNavigation = [
  { label: "Nitro Complete", href: "/nitro-complete", featured: true },
  { label: "Asesoría", href: "/soluciones/nitro-commerce" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre Juan", href: "/sobre-mi" },
] as const;

/** Acción principal del embudo: el calificador de Nitro Complete. */
export const primaryCta = { label: "Evaluar mi operación", href: "/nitrobot/conectar" } as const;

// Nitro Complete es el producto principal. Cada módulo describe una capacidad
// comprobada en /home/juan/nitro_bot (docs/modules). Varias dependen de
// configuración: catálogo, plantillas aprobadas por Meta o permiso del comprador.
export const nitroCompleteModules = [
  {
    key: "asesor",
    moment: "Cuando el cliente escribe",
    title: "Un asesor que vende con tu catálogo real",
    text: "Responde, recomienda productos, cotiza con precios y envíos calculados por el sistema, toma los datos de entrega y deja el pedido creado.",
    icon: MessageCircle,
    how: "Consulta producto, precio y envío en tu catálogo antes de responder, y el total lo calcula el sistema. Toma nombre, dirección y ciudad, y crea el pedido; si tienes Shopify, queda creado en tu tienda.",
    needs: "Tu catálogo en Shopify o cargado en Nitro, y definir con nosotros el tono del asesor y hasta dónde puede negociar.",
  },
  {
    key: "confirmacion",
    moment: "Antes de despachar",
    title: "Pedidos contraentrega confirmados",
    text: "Pide al comprador que confirme su pedido con un botón antes de que lo despaches, para enviar con menos dudas.",
    icon: PackageCheck,
    how: "Envía al comprador el resumen del pedido con tres botones: «Confirmar pedido», «Corregir datos» o «Solicitar cancelación». Lo confirmado queda marcado (en Shopify, con una etiqueta) y lo demás pasa a tu equipo.",
    needs: "Pedidos contraentrega de Shopify o de Nitro Landing y una plantilla de WhatsApp aprobada por Meta.",
  },
  {
    key: "postventa",
    moment: "Mientras llega",
    title: "Postventa que avisa sin que nadie escriba",
    text: "Informa el despacho, comparte la guía y pregunta si el pedido llegó. Tu equipo deja de responder “¿dónde va mi pedido?”.",
    icon: Truck,
    how: "Cuando el pedido sale, avisa al comprador con la transportadora y la guía, y después le pregunta si lo recibió.",
    needs: "Registrar el despacho: en Shopify se detecta solo; sin Shopify, desde el panel. Los estados de reparto o entrega se actualizan en el panel o con un archivo CSV.",
  },
  {
    key: "seguimiento",
    moment: "Cuando la conversación se enfría",
    title: "Seguimiento y recuperación",
    text: "Retoma conversaciones que quedaron a medias y, con permiso del comprador, vuelve a escribir a quien recibió una cotización y no compró.",
    icon: RefreshCw,
    how: "Retoma el chat que quedó a medias dentro de las 24 horas que permite WhatsApp, en tu horario de atención. A quien recibió una cotización y no compró le puede enviar un segundo mensaje con la oferta que tú autorices.",
    needs: "Para el segundo mensaje: permiso del comprador, una plantilla de marketing aprobada por Meta y la oferta definida por producto. Nunca escribe a quien pidió no recibir mensajes.",
  },
  {
    key: "equipo",
    moment: "Cuando hace falta criterio",
    title: "Casos para una persona, con contexto",
    text: "Lo que el asesor no debe resolver pasa a tu equipo con toda la conversación. Nada se queda sin dueño.",
    icon: Users,
    how: "Si llega un reclamo, un cambio o algo que el asesor no debe decidir, deja de responder en ese chat y abre un caso para tu equipo con la conversación completa.",
    needs: "Definir quién del equipo atiende los casos. Al resolverlo, devuelven el chat al asesor.",
  },
  {
    key: "panel",
    moment: "Todos los días",
    title: "Un panel que empieza por lo vendido",
    text: "Ves primero lo que vendió tu asesor, después lo que te espera hoy y luego cómo vender más, también desde el celular.",
    icon: LayoutDashboard,
    how: "Arranca por las ventas del asesor, sigue con lo que requiere atención hoy (casos, confirmaciones, despachos) y termina con oportunidades para vender más.",
    needs: "Nada adicional: viene con tu cuenta. Cada persona del equipo entra con su usuario y sus permisos.",
  },
] as const;

export const nitroCompletePlans = [
  { slug: "nitro-5k", name: "Nitro 5K", units: 5_000, capacity: "5.000 turnos al mes", price: "$590.000", fit: "Para una operación pequeña con volumen estable.", featured: false },
  { slug: "nitro-15k", name: "Nitro 15K", units: 15_000, capacity: "15.000 turnos al mes", price: "$1.190.000", fit: "Para un equipo comercial en crecimiento.", featured: true },
  { slug: "nitro-30k", name: "Nitro 30K", units: 30_000, capacity: "30.000 turnos al mes", price: "$2.200.000", fit: "Para una operación intensiva y mayor volumen.", featured: false },
] as const;

export type NitroCompletePlan = (typeof nitroCompletePlans)[number];

// La unidad de consumo es el turno: cada respuesta que el asesor envía a un
// comprador (nitro_bot: términos del servicio y `consume_turn`). El código no
// define turnos por conversación; se midió en producción (ciclos de sept. 2026,
// dos tiendas): 2,25 y 2,84 turnos por conversación al día, mediana 3. Juan fijó
// 3 el 30-09-2026 (NIT-79). Cambiarlo aquí mueve tarjetas y calculadora a la vez.
export const UNITS_PER_CONVERSATION = 3;

/** Margen de la calculadora sobre el consumo estimado antes de recomendar plan. */
export const PLAN_RECOMMENDATION_MARGIN = 1.15;

/** Conversaciones de venta al mes que cubre un plan, redondeadas hacia abajo a 50. */
export function planConversations(plan: NitroCompletePlan) {
  return Math.floor(plan.units / UNITS_PER_CONVERSATION / 50) * 50;
}

/** Plan más pequeño que cubre el volumen con margen; null si supera el mayor. */
export function recommendPlan(monthlyConversations: number): NitroCompletePlan | null {
  const units = monthlyConversations * UNITS_PER_CONVERSATION * PLAN_RECOMMENDATION_MARGIN;
  return nitroCompletePlans.find((plan) => plan.units >= units) ?? null;
}

export const nitroCompleteImplementation = "$700.000";

export const solutions = [
  {
    slug: "nitro-complete",
    eyebrow: "Producto principal",
    title: "Nitro Complete",
    result: "Tu WhatsApp vende, confirma y hace seguimiento por ti.",
    description:
      "Un asesor con IA que atiende con tu catálogo real y un sistema que acompaña el pedido hasta la entrega, con tu equipo al mando.",
    href: "/nitro-complete",
    icon: Bot,
    fit: "Negocios que venden productos y reciben consultas y pedidos por WhatsApp.",
    fitPoints: [
      "Tus clientes preguntan y compran por WhatsApp",
      "Vendes contraentrega o con despacho a domicilio",
      "Tu equipo no alcanza a responder y hacer seguimiento",
    ],
    proof: "Producto en operación con Shopify y catálogo nativo, panel y control humano.",
  },
  {
    slug: "nitro-commerce",
    eyebrow: "Asesoría ecommerce",
    title: "NitroCommerce",
    result: "Encuentra la oportunidad que merece atención y hazla realidad.",
    description:
      "Revisamos juntos tu negocio, priorizamos una oportunidad y te acompaño a implementarla.",
    href: "/soluciones/nitro-commerce",
    icon: ChartNoAxesCombined,
    fit: "Operaciones ecommerce que ya venden y necesitan ordenar su siguiente etapa.",
    fitPoints: [
      "Quieres una mirada experta sobre tu ecommerce",
      "Ves varias oportunidades y necesitas priorizarlas",
      "Buscas acompañamiento para hacerlas realidad",
    ],
    proof: "Consultoría e implementación adaptadas a la operación; sin promesas de resultados no medidos.",
  },
  {
    slug: "nitro-landing",
    eyebrow: "Una página para tu oferta",
    title: "Nitro Landing",
    result: "Convierte una oferta en una página clara, rápida y medible.",
    description:
      "Creamos una página enfocada en tu oferta, con un siguiente paso claro y medición desde el lanzamiento.",
    href: "/soluciones/nitro-landing",
    icon: LayoutTemplate,
    fit: "Marcas con campañas activas o productos que necesitan una oferta enfocada.",
    fitPoints: [
      "Tienes una oferta o campaña por lanzar",
      "Tu mensaje necesita ser más claro",
      "Quieres saber qué funciona y qué mejorar",
    ],
    proof: "Servicio de diseño e implementación; cada resultado se mide desde su lanzamiento.",
  },
] as const;

export const industries = [
  {
    title: "Ecommerce y retail",
    description: "Conversión de campañas, atención de producto, pedidos y automatización operativa.",
    href: "/soluciones/nitro-retail",
    icon: Store,
  },
  {
    title: "Clínicas",
    description: "Captación, calificación y agendamiento con una experiencia clara para el paciente.",
    href: "/soluciones/clinicas",
    icon: HeartPulse,
  },
  {
    title: "Inmobiliarias",
    description: "Presentación de inventario, calificación de interesados y seguimiento comercial.",
    href: "/soluciones/nitro-inmobiliaria",
    icon: Building2,
  },
] as const;

export const caseStudies = [
  {
    status: "Producto funcional",
    title: "NitroBot",
    description:
      "Sistema multiempresa para vender y atender por WhatsApp usando el catálogo real, pedidos y control humano desde un dashboard.",
    outcome: "Evidencia disponible: producto, flujos y demostración funcional. Sin atribuir métricas todavía.",
    href: "/nitrobot",
    icon: ShoppingBag,
  },
  {
    status: "Demostración",
    title: "Aura Stetic",
    description:
      "Experiencia de referencia para explorar servicios, simular una reserva y mostrar cómo se estructura la captación para clínicas.",
    outcome: "Se presenta como demostración, no como cliente ni resultado en producción.",
    href: "/demos/aura-stetic",
    icon: HeartPulse,
  },
  {
    status: "Demostración",
    title: "Luxe Estates",
    description:
      "Prototipo inmobiliario para visualizar propiedades y conducir al visitante hacia una conversación comercial.",
    outcome: "Se presenta como demostración, no como caso con métricas verificadas.",
    href: "/demos/luxe-estates",
    icon: SearchCheck,
  },
] as const;
