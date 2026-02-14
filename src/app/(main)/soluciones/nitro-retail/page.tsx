import { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ui/contact-form";
import {
  Store, ShoppingBag, Smartphone, BarChart3, ArrowRight,
  CheckCircle2, Zap, Globe, CreditCard, Truck,
  QrCode, Star, Wifi, MapPin, 
  Info // Replaced HelpCircle with Info to be safe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const revalidate = 3600;

// --- SEO Metadata ---
export const metadata: Metadata = {
  title: "Nitro Retail — Digitalización Integral para Comercios y Tiendas | Nitro Ecom",
  description:
    "Transformamos tiendas físicas, restaurantes y franquicias con tecnología omnicanal. POS integrado, presencia digital, delivery y fidelización. Más ventas, menos fricción.",
  keywords: [
    "digitalización comercios",
    "tienda online Colombia",
    "POS integrado",
    "delivery propio",
    "fidelización clientes retail",
    "omnicanalidad",
    "soluciones digitales para tiendas",
    "catálogo digital",
  ],
  alternates: {
    canonical: "https://www.juanarangoecommerce.com/soluciones/nitro-retail",
  },
  openGraph: {
    title: "Nitro Retail — Digitalización Integral para Comercios",
    description:
      "Conectamos tu tienda física con el mundo digital. POS, presencia online, delivery y fidelización automática.",
    url: "https://www.juanarangoecommerce.com/soluciones/nitro-retail",
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitro Retail — Digitalización Integral para Comercios",
    description:
      "Conectamos tu tienda física con el mundo digital. POS, presencia online, delivery y fidelización automática.",
  },
};

// --- FAQ Data ---
const faqItems = [
  {
    question: "¿Cuánto cuesta digitalizar mi tienda o restaurante?",
    answer:
      "El costo depende de las necesidades específicas: una presencia digital básica (web + Google Business + redes) inicia desde $500 USD, mientras que una solución omnicanal completa con POS, delivery y fidelización puede ir de $3,000 a $15,000+ USD. Ofrecemos diagnósticos gratuitos para presupuestar tu caso exacto.",
  },
  {
    question: "¿Necesito cerrar mi tienda para implementar la tecnología?",
    answer:
      "No. Implementamos todo en paralelo sin interrumpir tus operaciones. La migración de datos, configuración de POS y lanzamiento de plataformas digitales se hace por fases para que sigas vendiendo sin interrupciones.",
  },
  {
    question: "¿Funciona para negocios con varias sucursales?",
    answer:
      "Sí, es uno de nuestros fuertes. Centralizamos inventario, ventas y reportes de todas tus sucursales en un solo dashboard. Cada ubicación mantiene su autonomía operativa pero con visibilidad total para la gerencia.",
  },
  {
    question: "¿Puedo integrar mi sistema de delivery actual?",
    answer:
      "Absolutamente. Nos integramos con Rappi, iFood, UberEats, PedidosYa y plataformas de delivery propias. También podemos crear tu canal de delivery directo para eliminar comisiones de terceros y mantener la relación con tu cliente.",
  },
  {
    question: "¿Qué pasa con mis datos si cancelo el servicio?",
    answer:
      "Todos tus datos son tuyos. En caso de cancelar, hacemos una migración completa de base de datos de clientes, historial de ventas e inventario en formatos estándar. No retenemos información ni cobramos por la exportación.",
  },
  {
    question: "¿Cómo mido el retorno de inversión?",
    answer:
      "Nuestro dashboard muestra métricas de ROI en tiempo real: incremento en ticket promedio, frecuencia de compra, nuevos clientes captados digitalmente, ahorro en operaciones manuales y crecimiento de ventas mes a mes. Típicamente, nuestros clientes ven ROI positivo en los primeros 60-90 días.",
  },
];

// --- Schema JSON-LD ---
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Digitalización Integral para Comercios",
  provider: {
    "@type": "Organization",
    name: "Nitro Ecom",
    url: "https://www.juanarangoecommerce.com",
  },
  description:
    "Soluciones de digitalización omnicanal para tiendas físicas, restaurantes y franquicias. POS, presencia digital, delivery, fidelización y automatización.",
  url: "https://www.juanarangoecommerce.com/soluciones/nitro-retail",
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Nitro Retail — Digitalización Integral para Comercios",
  description:
    "Transformamos comercios físicos con tecnología omnicanal. Presencia digital, POS integrado, delivery y fidelización de clientes.",
  url: "https://www.juanarangoecommerce.com/soluciones/nitro-retail",
  publisher: {
    "@type": "Organization",
    name: "Nitro Ecom",
    url: "https://www.juanarangoecommerce.com",
  },
};

// --- Page Component ---
export default function NitroRetailPage() {
  return (
    <>
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [faqSchema, serviceSchema, webPageSchema] }),
        }}
      />

      <main className="min-h-screen">
        {/* ===== 1. HERO ===== */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
              <Store className="w-4 h-4" />
              Especialistas en Comercio Omnicanal
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Digitaliza tu Comercio —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
                Vende Más, en Todos los Canales
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Conectamos tu tienda física con el mundo digital. POS integrado, presencia online profesional,
              delivery propio y fidelización automática. Todo en una sola plataforma.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-violet-400 mb-1">+40%</div>
                <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">Ventas Incrementales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">3x</div>
                <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">Clientes Recurrentes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-violet-400 mb-1">-60%</div>
                <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">Tiempo Operativo</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contacto-retail">
                <Button className="h-14 px-8 bg-violet-500 hover:bg-violet-400 text-white font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all">
                  Solicita tu diagnóstico gratis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#servicios-retail">
                <Button variant="outline" className="h-14 px-8 text-lg border-violet-500/30 hover:border-violet-500 hover:bg-violet-500/5">
                  Ver servicios
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== 2. PAIN POINTS / POR QUÉ DIGITALIZAR ===== */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                ¿Por qué <span className="text-violet-400">digitalizar</span> tu comercio?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                El 73% de los consumidores investigan online antes de comprar en tienda física. Si no estás en digital, estás perdiendo ventas todos los días.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Globe,
                  title: "Presencia online profesional",
                  desc: "Tu negocio visible 24/7 en Google, redes sociales y directorios. Los clientes te encuentran, no al revés.",
                },
                {
                  icon: CreditCard,
                  title: "Pagos unificados",
                  desc: "Un solo sistema para cobros en tienda, online, delivery y redes sociales. Concilia automáticamente sin Excel.",
                },
                {
                  icon: BarChart3,
                  title: "Datos en tiempo real",
                  desc: "Dashboard con ventas, inventario, productos top y comportamiento de clientes. Decisiones basadas en datos, no en intuición.",
                },
                {
                  icon: Smartphone,
                  title: "Experiencia omnicanal",
                  desc: "Tu cliente compra en Instagram, retira en tienda, y acumula puntos en su app. Todo conectado sin fricciones.",
                },
                {
                  icon: Truck,
                  title: "Delivery sin comisiones excesivas",
                  desc: "Canal de delivery propio integrado a tu web. Elimina la dependencia de apps de terceros y sus comisiones del 25-35%.",
                },
                {
                  icon: Star,
                  title: "Fidelización automática",
                  desc: "Programas de puntos, cashback y promociones personalizadas que convierten compradores ocasionales en clientes frecuentes.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 transition-all duration-300 hover:bg-zinc-900"
                >
                  <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 w-fit mb-4 group-hover:bg-violet-500/20 transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 3. ¿NITRO RETAIL ES PARA TI? ===== */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 bg-zinc-950/50 border-y border-zinc-800/50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                ¿Nitro Retail es para ti? <span className="text-violet-400">Descúbrelo</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Trabajamos con negocios que quieren escalar sus ventas con tecnología. Identifica tu caso.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Tienda física que quiere vender online",
                  desc: "Tienes un local comercial y quieres expandirte al mundo digital sin perder la esencia de tu marca. Necesitas una web que convierta y se integre con tu operación actual.",
                },
                {
                  title: "Restaurante o cafetería",
                  desc: "Necesitas menú digital, sistema de pedidos, delivery propio, reservas online y fidelización de comensales. Todo conectado a tu POS de cocina.",
                },
                {
                  title: "Franquicia o cadena multi-sucursal",
                  desc: "Gestionas varias ubicaciones y necesitas centralizar inventario, reportes y marketing. Control total desde un solo dashboard con autonomía por sucursal.",
                },
                {
                  title: "Comercio local con ambición de crecimiento",
                  desc: "Quieres profesionalizar tu presencia digital, aparecer en Google Maps, gestionar reseñas y captar clientes que hoy no te encuentran.",
                },
                {
                  title: "E-commerce que abre tienda física",
                  desc: "Ya vendes online y ahora quieres un punto de venta físico. Necesitas unificar inventarios, clientes y experiencia de compra en ambos canales.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/20 transition-all"
                >
                  <CheckCircle2 className="w-6 h-6 text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 4. SOLUCIONES COMPLETAS ===== */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                Soluciones completas para <span className="text-violet-400">tu comercio</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Desde la vitrina digital hasta la automatización de operaciones. Todo lo que necesitas para competir en la era digital.
              </p>
            </div>

            <div className="space-y-12">
              {/* Solution 1 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-violet-400" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">Presencia Digital Profesional</h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    Web optimizada para móvil, Google Business configurado, redes sociales conectadas y catálogo digital actualizable. Tus clientes te encuentran, te conocen y confían antes de entrar a tu tienda.
                  </p>
                  <ul className="space-y-3">
                    {["Web responsive con catálogo de productos", "Google Business Profile optimizado", "Integración con Instagram Shopping y Facebook"].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-violet-950/30 to-purple-950/20 border border-violet-500/20 rounded-2xl p-8 h-48 sm:h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-violet-400 mx-auto mb-4 opacity-50" />
                    <p className="text-zinc-500 text-sm">Presencia digital omnicanal</p>
                  </div>
                </div>
              </div>

              {/* Solution 2 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-purple-950/20 to-violet-950/30 border border-purple-500/20 rounded-2xl p-8 h-48 sm:h-64 flex items-center justify-center">
                  <div className="text-center">
                    <ShoppingBag className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                    <p className="text-zinc-500 text-sm">Comercio unificado</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <ShoppingBag className="w-6 h-6 text-purple-400" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">Omnicanalidad Real</h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    Inventario sincronizado entre tienda física y online. Tu cliente compra por WhatsApp, paga con link y recoge en tienda. O compra en la web y devuelve en el local. Sin fricciones.
                  </p>
                  <ul className="space-y-3">
                    {["Inventario unificado multi-canal en tiempo real", "Click & Collect y Ship from Store", "Gestión centralizada de pedidos y devoluciones"].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Solution 3 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-violet-400" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">Automatización Operativa</h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    Elimina tareas repetitivas. Alertas de inventario bajo, reportes automáticos, emails de recompra y seguimiento post-venta. Tu equipo se enfoca en vender, la tecnología hace el resto.
                  </p>
                  <ul className="space-y-3">
                    {["Alertas automáticas de stock bajo", "Reportes semanales sin intervención manual", "Campañas de recompra y carritos abandonados"].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-violet-950/30 to-black border border-violet-500/20 rounded-2xl p-8 h-48 sm:h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="w-16 h-16 text-violet-400 mx-auto mb-4 opacity-50" />
                    <p className="text-zinc-500 text-sm">Automatización inteligente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 5. SERVICIOS NITRO RETAIL ===== */}
        <section id="servicios-retail" className="py-14 sm:py-20 px-4 sm:px-6 bg-zinc-950/50 border-y border-zinc-800/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                Nuestros servicios <span className="text-violet-400">Nitro Retail</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Cada servicio está diseñado para resolver un dolor específico de tu comercio. Combínalos según tus necesidades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Globe,
                  title: "Web y Catálogo Digital",
                  desc: "Sitio web profesional con catálogo de productos actualizable, integración con redes sociales, SEO local optimizado y diseño que convierte visitantes en compradores. Mobile-first siempre.",
                  tags: ["Web Responsive", "SEO Local", "Catálogo Digital", "Google Business"],
                },
                {
                  icon: CreditCard,
                  title: "POS y Pasarela de Pagos",
                  desc: "Sistema de punto de venta moderno con inventario sincronizado, múltiples métodos de pago, facturación electrónica y conciliación automática. Compatible con hardware existente.",
                  tags: ["POS Cloud", "Facturación", "Multi-pago", "Inventario"],
                },
                {
                  icon: Truck,
                  title: "Delivery y Logística",
                  desc: "Canal de delivery propio sin comisiones de terceros. Integración con Rappi, iFood y UberEats cuando convenga. Tracking en tiempo real y notificaciones automáticas al cliente.",
                  tags: ["Delivery Propio", "Integraciones", "Tracking", "Notificaciones"],
                },
                {
                  icon: Star,
                  title: "Fidelización y CRM",
                  desc: "Programa de lealtad con puntos, cashback y promociones personalizadas basadas en historial de compra. CRM que segmenta clientes y automatiza campañas de recompra.",
                  tags: ["Programa de Puntos", "Cashback", "CRM", "Email Marketing"],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 w-fit mb-5 group-hover:bg-violet-500/20 transition-colors">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 6. STACK TECNOLÓGICO ===== */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                Herramientas del <span className="text-violet-400">ecosistema Nitro Retail</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Integramos las mejores herramientas del mercado para crear una experiencia comercial sin fricciones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: CreditCard,
                  name: "POS Inteligente",
                  desc: "Punto de venta en la nube con inventario en tiempo real, múltiples métodos de pago, y reportes automáticos por turno, día y sucursal.",
                },
                {
                  icon: MapPin,
                  name: "Google Business Profile",
                  desc: "Perfil optimizado con fotos, reseñas gestionadas, publicaciones y métricas. Aparece cuando buscan tu tipo de negocio cerca.",
                },
                {
                  icon: BarChart3,
                  name: "Analytics Unificado",
                  desc: "Dashboard que combina datos de ventas online y offline. Identifica productos estrella, horarios pico y patrones de compra.",
                },
                {
                  icon: Wifi,
                  name: "WhatsApp Business API",
                  desc: "Catálogo, pedidos, confirmaciones y seguimiento post-venta por WhatsApp automatizado. El canal preferido de tus clientes.",
                },
                {
                  icon: Truck,
                  name: "Integraciones Delivery",
                  desc: "Conexión con Rappi, iFood, UberEats y delivery propio. Gestiona todos los pedidos desde un solo panel sin cambiar de app.",
                },
                {
                  icon: QrCode,
                  name: "Menú/Catálogo QR",
                  desc: "Menú digital con QR que tus clientes escanean desde la mesa. Actualizable en tiempo real, con precios, fotos y disponibilidad.",
                },
              ].map((tool, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-violet-500/20 transition-all"
                >
                  <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-400 shrink-0">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">{tool.name}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 7. MÉTRICAS Y RESULTADOS ===== */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 bg-zinc-950/50 border-y border-zinc-800/50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                Resultados que nuestros clientes <span className="text-violet-400">ya están viendo</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: "+40%", label: "Incremento en ventas promedio" },
                { value: "3x", label: "Más clientes recurrentes" },
                { value: "85%", label: "Retención de clientes" },
                { value: "-60%", label: "Tiempo en tareas manuales" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
                  <div className="text-2xl sm:text-4xl font-extrabold text-violet-400 mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 8. COMPARATIVA ===== */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                Nitro Retail vs. <span className="text-violet-400">Métodos Tradicionales</span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { feature: "Presencia online", us: "Web + Google + Redes integradas", them: "Solo Facebook o nada" },
                { feature: "Gestión de inventario", us: "Automatizado y en tiempo real", them: "Excel o cuaderno" },
                { feature: "Cobros y facturación", us: "POS cloud con conciliación auto", them: "Datáfono + facturación manual" },
                { feature: "Delivery", us: "Canal propio + integraciones", them: "Solo apps de terceros (25-35% comisión)" },
                { feature: "Fidelización", us: "Programa automático de puntos/cashback", them: "Tarjeta de sellos de cartón" },
                { feature: "Reportes", us: "Dashboard en tiempo real multi-sucursal", them: "Reportes mensuales manuales" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-violet-500/20 transition-all items-center"
                >
                  <span className="font-semibold text-zinc-200">{item.feature}</span>
                  <span className="text-violet-400 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" /> {item.us}
                  </span>
                  <span className="text-zinc-600 line-through text-sm">{item.them}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 9. FAQ ===== */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 bg-zinc-950/50 border-y border-zinc-800/50">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-violet-400 mb-4">
                <Info className="w-5 h-5" />
                <span className="text-sm font-medium">Preguntas frecuentes</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold">
                Todo sobre <span className="text-violet-400">Nitro Retail</span>
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-zinc-800 rounded-xl px-6 py-1 bg-zinc-900/50 hover:border-violet-500/30 transition-all data-[state=open]:border-violet-500/30"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-white hover:text-violet-400 hover:no-underline py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 pb-4 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ===== 10. FORMULARIO DE CONTACTO ===== */}
        <section id="contacto-retail" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-violet-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                Hablemos de tu{" "}
                <span className="text-violet-400">comercio</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Déjanos tus datos. Analizamos tu negocio y diseñamos la estrategia para digitalizar y escalar tus ventas.
              </p>
            </div>
            <ContactForm />
            <div className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-400" />
                <span>Respuesta en menos de 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-400" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-400" />
                <span>Diagnóstico gratuito</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
