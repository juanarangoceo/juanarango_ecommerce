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
  { label: "Nitro Complete", href: "/nitro-complete" },
  { label: "Consultoría", href: "/soluciones/nitro-commerce" },
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
  },
  {
    key: "confirmacion",
    moment: "Antes de despachar",
    title: "Pedidos contraentrega confirmados",
    text: "Pide al comprador que confirme su pedido con un botón antes de que lo despaches, para enviar con menos dudas.",
    icon: PackageCheck,
  },
  {
    key: "postventa",
    moment: "Mientras llega",
    title: "Postventa que avisa sin que nadie escriba",
    text: "Informa el despacho, comparte la guía y pregunta si el pedido llegó. Tu equipo deja de responder “¿dónde va mi pedido?”.",
    icon: Truck,
  },
  {
    key: "seguimiento",
    moment: "Cuando la conversación se enfría",
    title: "Seguimiento y recuperación",
    text: "Retoma conversaciones que quedaron a medias y, con permiso del comprador, vuelve a escribir a quien recibió una cotización y no compró.",
    icon: RefreshCw,
  },
  {
    key: "equipo",
    moment: "Cuando hace falta criterio",
    title: "Casos para una persona, con contexto",
    text: "Lo que el asesor no debe resolver pasa a tu equipo con toda la conversación. Nada se queda sin dueño.",
    icon: Users,
  },
  {
    key: "panel",
    moment: "Todos los días",
    title: "Un panel que empieza por lo vendido",
    text: "Ves primero lo que vendió tu asesor, después lo que te espera hoy y luego cómo vender más, también desde el celular.",
    icon: LayoutDashboard,
  },
] as const;

export const nitroCompletePlans = [
  { name: "Nitro 5K", capacity: "5.000 unidades de consumo", price: "$590.000", fit: "Para una operación pequeña con volumen estable.", featured: false },
  { name: "Nitro 15K", capacity: "15.000 unidades de consumo", price: "$1.190.000", fit: "Para un equipo comercial en crecimiento.", featured: true },
  { name: "Nitro 30K", capacity: "30.000 unidades de consumo", price: "$2.200.000", fit: "Para una operación intensiva y mayor volumen.", featured: false },
] as const;

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
    eyebrow: "Consultoría ecommerce",
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
