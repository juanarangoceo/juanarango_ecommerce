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
    needs: "Registrar el despacho: en Shopify se detecta solo; sin Shopify, desde el panel. Los estados se actualizan en el panel, por CSV o con 17TRACK al habilitar la conexión y su saldo por guía.",
  },
  {
    key: "seguimiento",
    moment: "Cuando la conversación se enfría",
    title: "Seguimiento y recuperación",
    text: "Retoma conversaciones que quedaron a medias y, con permiso del comprador, vuelve a escribir a quien recibió una cotización y no compró.",
    icon: RefreshCw,
    how: "Retoma el chat que quedó a medias dentro de la ventana de WhatsApp, en tu horario de atención. También puede acordar con el comprador un día y una franja para volver a conversar, con su permiso.",
    needs: "Permiso del comprador y horarios definidos. Fuera de la ventana de WhatsApp requiere una plantilla aprobada por Meta. Nunca escribe a quien pidió no recibir mensajes.",
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

// La unidad de consumo es el turno: cada respuesta que el asesor envía a un
// comprador (nitro_bot: términos del servicio y `consume_turn`). El código no
// define turnos por conversación; se midió en producción (ciclos de sept. 2026,
// dos tiendas): 2,25 y 2,84 turnos por conversación al día, mediana 3. Juan fijó
// 3 el 30-09-2026 (NIT-79). Cambiarlo aquí mueve tarjetas y calculadora a la vez.
export const UNITS_PER_CONVERSATION = 3;

const copFormat = new Intl.NumberFormat("es-CO");
/** «$1.190.000» a partir del número. */
export function formatCop(value: number) {
  return `$${copFormat.format(Math.round(value))}`;
}

// Modalidad Prepago (NIT-80, decisión de Juan del 2026-10-01). Fuente de verdad:
// nitro_bot, `platform_settings.outbound_pricing` (starter_kit y turn_packs,
// migración 20261001200100). Si cambian allá, se cambian aquí.
export const nitroCompleteStarterKit = {
  price: "$199.000",
  units: 500,
  templates: 100,
  installHours: 48,
} as const;

export const nitroCompleteUnitPacks = [
  { units: 100, priceCop: 16_000 },
  { units: 250, priceCop: 37_000 },
  { units: 500, priceCop: 69_000 },
  { units: 1_000, priceCop: 129_000 },
  { units: 2_500, priceCop: 299_000 },
  { units: 5_000, priceCop: 595_000 },
  { units: 10_000, priceCop: 1_190_000 },
  { units: 20_000, priceCop: 2_380_000 },
] as const;

export type NitroCompleteUnitPack = (typeof nitroCompleteUnitPacks)[number];

/** Precio por plantilla de WhatsApp en las dos modalidades (nitro_bot: price_template_cop). */
export const nitroCompleteTemplatePrice = "$70";


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
