export const CATEGORIES = [
  { id: "all", label: "Todas", icon: "LayoutGrid", color: "slate" },
  { id: "chatbot", label: "Chatbots", icon: "MessageSquare", color: "emerald" },
  { id: "writing", label: "Escritura", icon: "PenTool", color: "fuchsia" },
  { id: "image-gen", label: "Imagen", icon: "Image", color: "violet" },
  { id: "video", label: "Video", icon: "Clapperboard", color: "orange" },
  { id: "audio", label: "Audio", icon: "Music", color: "rose" },
  { id: "coding", label: "Codigo", icon: "Code", color: "sky" },
  { id: "productivity", label: "Productividad", icon: "Zap", color: "amber" },
  { id: "design", label: "Diseno", icon: "Palette", color: "cyan" },
  { id: "marketing", label: "Marketing", icon: "Megaphone", color: "lime" },
] as const

export type CategoryId = (typeof CATEGORIES)[number]["id"]

export type Pricing = "Free" | "Freemium" | "Paid"

export type AppTool = {
  id: string
  name: string
  description: string
  longDescription: string
  category: Exclude<CategoryId, "all">
  pricing: Pricing
  rank: number
  iconBg: string
  websiteUrl: string
  affiliateUrl?: string
  features: string[]
  pros: string[]
  cons: string[]
  platforms: string[]
  tags: string[]
  updatedAt: string
}

export const apps: AppTool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Chatbot conversacional de IA por OpenAI",
    longDescription:
      "ChatGPT es el chatbot de inteligencia artificial mas popular del mundo, desarrollado por OpenAI. Permite mantener conversaciones naturales, generar textos, resolver problemas de programacion, analizar datos y mucho mas. Con GPT-4o, ofrece capacidades multimodales incluyendo vision, audio y generacion de imagenes.",
    category: "chatbot",
    pricing: "Freemium",
    rank: 1,
    iconBg: "bg-emerald-500",
    websiteUrl: "https://chat.openai.com",
    features: [
      "Conversaciones naturales con IA avanzada",
      "Generacion y edicion de texto",
      "Analisis de imagenes y documentos",
      "Generacion de codigo en multiples lenguajes",
      "Plugins y GPTs personalizados",
      "Busqueda en internet en tiempo real",
    ],
    pros: [
      "Interfaz intuitiva y facil de usar",
      "Modelo GPT-4o extremadamente capaz",
      "Plan gratuito generoso",
    ],
    cons: [
      "Limite de mensajes en plan gratuito",
      "Puede generar informacion incorrecta",
      "Requiere suscripcion para funciones avanzadas",
    ],
    platforms: ["Web", "iOS", "Android", "Desktop"],
    tags: ["chatbot", "escritura", "codigo", "analisis"],
    updatedAt: "2026-02-15",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "Generacion de imagenes a partir de texto con IA",
    longDescription:
      "Midjourney es una herramienta de generacion de imagenes con inteligencia artificial que transforma descripciones de texto en obras visuales impresionantes. Conocida por su calidad artistica superior, es la herramienta favorita de disenadores, artistas y creadores de contenido visual.",
    category: "image-gen",
    pricing: "Paid",
    rank: 2,
    iconBg: "bg-violet-500",
    websiteUrl: "https://midjourney.com",
    features: [
      "Generacion de imagenes de alta calidad",
      "Estilos artisticos variados",
      "Upscaling y variaciones",
      "Editor integrado para edicion parcial",
      "Generacion rapida con modo turbo",
    ],
    pros: [
      "Calidad artistica excepcional",
      "Comunidad activa y creativa",
      "Mejoras constantes del modelo",
    ],
    cons: [
      "Sin plan gratuito disponible",
      "Curva de aprendizaje en prompts",
      "Funciona principalmente via Discord",
    ],
    platforms: ["Web", "Discord"],
    tags: ["imagen", "arte", "diseno", "creativo"],
    updatedAt: "2026-02-10",
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    description: "Workspace conectado con escritura asistida por IA",
    longDescription:
      "Notion AI integra inteligencia artificial directamente en tu espacio de trabajo de Notion. Permite generar borradores, resumir documentos, extraer tareas, traducir contenido y mucho mas sin salir de tu flujo de trabajo habitual. Ideal para equipos que ya usan Notion como su hub central de productividad.",
    category: "productivity",
    pricing: "Freemium",
    rank: 3,
    iconBg: "bg-neutral-700",
    websiteUrl: "https://notion.so",
    features: [
      "Escritura asistida por IA dentro de Notion",
      "Resumen automatico de documentos",
      "Extraccion de tareas y accion items",
      "Traduccion a multiples idiomas",
      "Q&A sobre tu contenido en Notion",
      "Generacion de tablas y bases de datos",
    ],
    pros: [
      "Integrado nativamente en Notion",
      "Contexto de tu workspace completo",
      "Excelente para equipos colaborativos",
    ],
    cons: [
      "Requiere suscripcion adicional a Notion AI",
      "Solo funciona dentro de Notion",
      "Generacion mas lenta que herramientas dedicadas",
    ],
    platforms: ["Web", "iOS", "Android", "Desktop"],
    tags: ["productividad", "escritura", "notas", "equipo"],
    updatedAt: "2026-02-12",
  },
  {
    id: "jasper",
    name: "Jasper",
    description: "Copiloto de IA para copywriting y contenido",
    longDescription:
      "Jasper es una plataforma de IA para marketing y escritura que ayuda a crear contenido de alta calidad para blogs, redes sociales, emails y anuncios. Con su voz de marca personalizable y templates especializados, es la herramienta preferida de equipos de marketing en empresas de todos los tamanos.",
    category: "writing",
    pricing: "Paid",
    rank: 4,
    iconBg: "bg-fuchsia-500",
    websiteUrl: "https://jasper.ai",
    features: [
      "50+ plantillas de contenido",
      "Voz de marca personalizable",
      "Extension para navegador",
      "Generacion de imagenes con IA",
      "Detector de plagio integrado",
      "Colaboracion en equipo",
    ],
    pros: [
      "Excelente para contenido de marketing",
      "Templates muy variados y utiles",
      "Soporte multilingue robusto",
    ],
    cons: [
      "Precio elevado para usuarios individuales",
      "Requiere edicion post-generacion",
      "Sin plan gratuito permanente",
    ],
    platforms: ["Web", "Chrome Extension"],
    tags: ["escritura", "marketing", "copywriting", "blog"],
    updatedAt: "2026-01-28",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "Tu programador par con IA",
    longDescription:
      "GitHub Copilot es un asistente de programacion potenciado por IA que sugiere codigo en tiempo real directamente en tu editor. Entrenado con miles de millones de lineas de codigo, puede completar funciones, generar tests, explicar codigo y ayudarte a resolver problemas complejos de programacion mas rapido.",
    category: "coding",
    pricing: "Paid",
    rank: 5,
    iconBg: "bg-slate-700",
    websiteUrl: "https://github.com/features/copilot",
    features: [
      "Autocompletado de codigo en tiempo real",
      "Chat integrado en el editor",
      "Generacion de tests automatizada",
      "Explicacion de codigo existente",
      "Soporte para 20+ lenguajes",
      "Integracion con VS Code, JetBrains, Neovim",
    ],
    pros: [
      "Aumenta la productividad de desarrollo significativamente",
      "Excelente integracion con editores populares",
      "Mejora continua del modelo",
    ],
    cons: [
      "Puede sugerir codigo inseguro o incorrecto",
      "Requiere revision del codigo generado",
      "Precio mensual obligatorio",
    ],
    platforms: ["VS Code", "JetBrains", "Neovim", "Web"],
    tags: ["codigo", "desarrollo", "programacion", "automatizacion"],
    updatedAt: "2026-02-14",
  },
  {
    id: "canva-magic",
    name: "Canva Magic Studio",
    description: "Suite de diseno visual todo en uno con IA",
    longDescription:
      "Canva Magic Studio integra multiples herramientas de IA dentro de la plataforma de diseno mas popular del mundo. Incluye Magic Write para textos, Magic Edit para edicion de imagenes, Magic Eraser para eliminar objetos, Text to Image, y mucho mas. Ideal para crear contenido visual profesional sin experiencia en diseno.",
    category: "design",
    pricing: "Freemium",
    rank: 6,
    iconBg: "bg-cyan-500",
    websiteUrl: "https://canva.com",
    features: [
      "Magic Write para generacion de texto",
      "Magic Edit para edicion de imagenes con IA",
      "Text to Image integrado",
      "Magic Eraser para eliminar objetos",
      "Resize automatico para multiples formatos",
      "Plantillas con IA adaptativa",
    ],
    pros: [
      "Plataforma de diseno integral y accesible",
      "Enorme biblioteca de templates",
      "Plan gratuito muy funcional",
    ],
    cons: [
      "Funciones IA avanzadas solo en plan Pro",
      "Menos control que herramientas profesionales",
      "Puede sentirse limitado para disenadores expertos",
    ],
    platforms: ["Web", "iOS", "Android", "Desktop"],
    tags: ["diseno", "imagen", "marketing", "redes sociales"],
    updatedAt: "2026-02-08",
  },
  {
    id: "runway-gen3",
    name: "Runway Gen-3",
    description: "Generacion y edicion de video con IA",
    longDescription:
      "Runway Gen-3 es la plataforma lider en generacion de video con inteligencia artificial. Permite crear videos a partir de texto o imagenes, editar videos existentes con IA, eliminar fondos, aplicar motion tracking y mucho mas. Es la herramienta preferida de cineastas y creadores de contenido visual avanzado.",
    category: "video",
    pricing: "Freemium",
    rank: 7,
    iconBg: "bg-orange-500",
    websiteUrl: "https://runwayml.com",
    features: [
      "Text to Video de alta calidad",
      "Image to Video con control de movimiento",
      "Eliminacion de fondos automatica",
      "Motion tracking avanzado",
      "Inpainting de video",
      "Generacion de audio sincronizado",
    ],
    pros: [
      "Calidad de video generado impresionante",
      "Herramientas de edicion profesionales",
      "Interfaz intuitiva y moderna",
    ],
    cons: [
      "Creditos limitados en plan gratuito",
      "Generacion puede ser lenta",
      "Precio elevado para uso intensivo",
    ],
    platforms: ["Web", "API"],
    tags: ["video", "edicion", "creativo", "cine"],
    updatedAt: "2026-02-05",
  },
  {
    id: "suno-ai",
    name: "Suno AI",
    description: "Crea musica completa con inteligencia artificial",
    longDescription:
      "Suno AI es una plataforma revolucionaria que permite crear canciones completas con letra, melodia, voces e instrumentacion usando solo texto como entrada. Ideal para creadores de contenido, musicos que buscan inspiracion y cualquier persona que quiera generar musica original sin conocimientos musicales previos.",
    category: "audio",
    pricing: "Freemium",
    rank: 8,
    iconBg: "bg-rose-500",
    websiteUrl: "https://suno.ai",
    features: [
      "Generacion de canciones completas desde texto",
      "Multiples generos y estilos musicales",
      "Letras generadas o personalizadas",
      "Voces sinteticas de alta calidad",
      "Instrumentacion variada",
      "Descarga en formato MP3",
    ],
    pros: [
      "Resultados musicales sorprendentemente buenos",
      "Muy facil de usar, sin conocimientos previos",
      "Plan gratuito disponible con 5 canciones/dia",
    ],
    cons: [
      "Derechos de uso comercial solo en planes pagos",
      "Calidad vocal variable segun el estilo",
      "Poca personalizacion de la produccion musical",
    ],
    platforms: ["Web", "iOS", "Android"],
    tags: ["musica", "audio", "creativo", "produccion"],
    updatedAt: "2026-01-30",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Asistente de IA por Anthropic, seguro y util",
    longDescription:
      "Claude es el asistente de inteligencia artificial desarrollado por Anthropic, disenado para ser seguro, util y honesto. Destaca en analisis de documentos largos, razonamiento complejo, escritura creativa y programacion. Con una ventana de contexto de 200K tokens, puede procesar documentos extensos completos.",
    category: "chatbot",
    pricing: "Freemium",
    rank: 9,
    iconBg: "bg-amber-600",
    websiteUrl: "https://claude.ai",
    features: [
      "Ventana de contexto de 200K tokens",
      "Analisis de documentos PDF extensos",
      "Razonamiento avanzado con Claude 3.5 Sonnet",
      "Vision y analisis de imagenes",
      "Generacion de codigo precisa",
      "Artefactos interactivos",
    ],
    pros: [
      "Excelente razonamiento y analisis",
      "Ventana de contexto enorme (200K tokens)",
      "Respuestas mas seguras y equilibradas",
    ],
    cons: [
      "Limites de uso en plan gratuito",
      "Menor ecosistema de plugins que ChatGPT",
      "No disponible en todos los paises",
    ],
    platforms: ["Web", "iOS", "Android", "API"],
    tags: ["chatbot", "escritura", "analisis", "codigo"],
    updatedAt: "2026-02-13",
  },
  {
    id: "hubspot-ai",
    name: "HubSpot AI",
    description: "Suite de marketing y CRM potenciada con IA",
    longDescription:
      "HubSpot AI integra inteligencia artificial en toda la plataforma de CRM, marketing, ventas y servicio al cliente de HubSpot. Desde la generacion de contenido para blogs y emails, hasta predicciones de ventas y chatbots inteligentes, HubSpot AI automatiza tareas repetitivas y mejora la eficiencia de todo tu equipo.",
    category: "marketing",
    pricing: "Freemium",
    rank: 10,
    iconBg: "bg-orange-600",
    websiteUrl: "https://hubspot.com",
    features: [
      "Generacion de contenido para blogs y emails",
      "Chatbot inteligente para atencion al cliente",
      "Prediccion de scoring de leads",
      "Automatizacion de workflows con IA",
      "Analisis predictivo de ventas",
      "SEO recommendations con IA",
    ],
    pros: [
      "Todo en una sola plataforma integrada",
      "CRM gratuito muy completo",
      "Excelente soporte y documentacion",
    ],
    cons: [
      "Planes pagos pueden ser costosos",
      "Curva de aprendizaje considerable",
      "Funciones IA mas avanzadas en planes premium",
    ],
    platforms: ["Web", "iOS", "Android"],
    tags: ["marketing", "crm", "ventas", "automatizacion"],
    updatedAt: "2026-02-01",
  },
]

export function getAppById(id: string): AppTool | undefined {
  return apps.find((app) => app.id === id)
}

export function getAppsByCategory(category: CategoryId): AppTool[] {
  if (category === "all") return apps
  return apps.filter((app) => app.category === category)
}

export function getRelatedApps(currentId: string, limit = 3): AppTool[] {
  const current = getAppById(currentId)
  if (!current) return []
  return apps
    .filter((app) => app.id !== currentId && app.category === current.category)
    .slice(0, limit)
}

export function getCategoryLabel(categoryId: string): string {
  return CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId
}

export function getAppUrl(app: AppTool): string {
  const base = app.affiliateUrl || app.websiteUrl
  const separator = base.includes("?") ? "&" : "?"
  return `${base}${separator}ref=juanarango`
}
