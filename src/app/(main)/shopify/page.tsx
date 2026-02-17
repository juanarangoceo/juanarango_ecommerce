import { client } from "@/sanity/lib/client";
import { BlogCard } from "@/components/blog/blog-card";
import { AdvertisingBanner } from "@/components/blog/advertising-banner";
import { ContactForm } from "@/components/ui/contact-form";
import Link from "next/link";
import { constructMetadata } from "@/lib/utils";
import {
  Zap, Shield, TrendingUp, Puzzle, ShoppingCart, Search,
  Rocket, Bot, CreditCard, Workflow, Globe, Store, Code,
  ArrowRight, CheckCircle2, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SHOPIFY_LOGO = "https://res.cloudinary.com/dohwyszdj/image/upload/v1771103680/shopify_mrjlq8.svg";

// --- GROQ Query: Fetch Shopify-related blog posts ---
const SHOPIFY_POSTS_QUERY = `
  *[_type == "post" && (
    "shopify" in tags[] ||
    "Shopify" in tags[] ||
    "sidekick" in tags[] ||
    "shopify-plus" in tags[] ||
    "hydrogen" in tags[] ||
    "liquid" in tags[] ||
    "ecommerce" in tags[] ||
    "Ecommerce" in tags[]
  ) && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) [0...6] {
    _id,
    title,
    slug,
    publishedAt,
    _createdAt,
    mainImage,
    excerpt,
    category,
    tags,
    estimatedReadingTime
  }
  }
`;

const AD_QUERY = `*[_type == "advertisingShopify"] | order(_createdAt desc)[0] {
  title,
  desktopImage,
  mobileImage,
  link
}`;

export const revalidate = 3600;

// --- SEO Metadata ---
export function generateMetadata() {
  return constructMetadata({
    title: "Experto Shopify — Desarrollo, Migración y Optimización | Nitro Ecom",
    description:
      "Agencia Shopify especializada. Desarrollo personalizado, migración desde WooCommerce, Shopify Plus, Hydrogen headless y optimización CRO. +50 tiendas escaladas.",
    canonical: "https://www.juanarangoecommerce.com/shopify",
  });
}

// --- FAQ Data ---
const faqItems = [
  {
    question: "¿Cuánto cuesta crear una tienda Shopify?",
    answer:
      "Los planes de Shopify inician desde $29 USD/mes (Basic). El costo total depende del nivel de personalización: una tienda con theme estándar puede costar entre $500-$2,000 USD, mientras que un desarrollo personalizado con Liquid y funcionalidades avanzadas puede ir de $3,000 a $15,000+ USD.",
  },
  {
    question: "¿Shopify es mejor que WooCommerce para mi negocio?",
    answer:
      "Depende de tu contexto. Shopify es superior en velocidad de lanzamiento, seguridad (PCI DSS incluido), y checkout optimizado (Shop Pay). WooCommerce ofrece más flexibilidad pero requiere hosting, mantenimiento y actualizaciones constantes. Para negocios que priorizan conversión y escalabilidad, Shopify es la opción más eficiente.",
  },
  {
    question: "¿Qué es Shopify Plus y cuándo lo necesito?",
    answer:
      "Shopify Plus es la versión enterprise de Shopify, diseñada para marcas con +$1M en ventas anuales. Ofrece checkout personalizable, Shopify Flow para automatización, soporte dedicado, y capacidad para manejar picos de tráfico extremos (Black Friday, lanzamientos). Si superas los 10,000 pedidos/mes, es el momento de considerar Plus.",
  },
  {
    question: "¿Puedo migrar mi tienda de WooCommerce a Shopify?",
    answer:
      "Sí. La migración incluye transferir productos, clientes, pedidos históricos y SEO (redirects 301). En Nitro Ecom hemos migrado tiendas desde WooCommerce, Magento, VTEX y PrestaShop sin pérdida de tráfico orgánico. El proceso toma entre 2-6 semanas dependiendo del volumen de datos.",
  },
  {
    question: "¿Qué es Shopify Hydrogen y para quién es?",
    answer:
      "Hydrogen es el framework headless de Shopify basado en React. Permite crear experiencias de compra ultra-rápidas con control total del frontend. Es ideal para marcas DTC que necesitan performance extremo, personalización avanzada, y quieren mantener Shopify como backend de comercio.",
  },
  {
    question: "¿Shopify cobra comisión por venta?",
    answer:
      "Si usas Shopify Payments (disponible en Colombia), no hay comisión adicional sobre ventas. Solo pagas las tarifas estándar de procesamiento de tarjetas (2.9% + 30¢ en Basic). Si usas un proveedor de pagos externo, Shopify cobra entre 0.5% y 2% adicional dependiendo del plan.",
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

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Experto Shopify — Tiendas que Convierten",
  description:
    "Centro de recursos Shopify. Desarrollo personalizado, migración, Shopify Plus, Hydrogen headless y optimización CRO.",
  url: "https://www.juanarangoecommerce.com/shopify",
  publisher: {
    "@type": "Organization",
    name: "Nitro Ecom",
    url: "https://www.juanarangoecommerce.com",
  },
  about: {
    "@type": "SoftwareApplication",
    name: "Shopify",
    applicationCategory: "E-commerce Platform",
  },
};

// --- Page Component ---
export default async function ShopifyPage() {
  const [posts, ad] = await Promise.all([
    client.fetch<any[]>(SHOPIFY_POSTS_QUERY),
    client.fetch<any>(AD_QUERY)
  ]);

  return (
    <>
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [faqSchema, webPageSchema] }),
        }}
      />

      <main className="min-h-screen">
        {/* ===== 1. HERO ===== */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          {/* Shopify logo watermark */}
          <img
            src={SHOPIFY_LOGO}
            alt=""
            role="presentation"
            width={400}
            height={400}
            className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[300px] lg:w-[400px] opacity-[0.04] pointer-events-none select-none hidden md:block"
            loading="lazy"
            fetchPriority="low"
          />

          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
              <img
                src={SHOPIFY_LOGO}
                alt="Shopify"
                width={20}
                height={20}
                className="w-5 h-5"
                loading="eager"
              />
              Shopify Partner Certificado
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Experto Shopify —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
                Tiendas que Convierten
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Desarrollo personalizado, migración desde cualquier plataforma, y optimización CRO.
              Construimos tiendas Shopify de alto rendimiento que escalan tu negocio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contacto-shopify">
                <Button className="h-14 px-8 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all">
                  Solicita tu diagnóstico gratis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#servicios-shopify">
                <Button variant="outline" className="h-14 px-8 text-lg border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/5">
                  Ver servicios
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== ADVERTISING BANNER ===== */}
        {ad && (
          <div className="container mx-auto px-4 max-w-5xl -mt-8 mb-12 relative z-20">
             <AdvertisingBanner ad={ad} />
          </div>
        )}

        {/* ===== 2. VENTAJAS DE SHOPIFY ===== */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                ¿Por qué elegir <span className="text-emerald-400">Shopify</span> para tu negocio?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                La plataforma de ecommerce #1 del mundo no es casualidad. Estas son las razones por las que más de 4.7 millones de negocios confían en Shopify.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Velocidad de lanzamiento",
                  desc: "Lanza tu tienda en días, no meses. Shopify elimina la complejidad técnica para que te enfoques en vender.",
                },
                {
                  icon: Shield,
                  title: "Seguridad y PCI Compliance",
                  desc: "Certificación PCI DSS nivel 1 incluida. Tu tienda y los datos de tus clientes protegidos 24/7 sin configuración adicional.",
                },
                {
                  icon: TrendingUp,
                  title: "Escalabilidad infinita",
                  desc: "Desde 10 pedidos al mes hasta 10,000+. Con Shopify Plus puedes escalar sin cambiar de plataforma ni perder rendimiento.",
                },
                {
                  icon: Puzzle,
                  title: "Ecosistema de +8,000 apps",
                  desc: "Aplicaciones para email marketing, logística, inventario, analytics, reseñas y más. Todo se integra con un clic.",
                },
                {
                  icon: ShoppingCart,
                  title: "Checkout de alta conversión",
                  desc: "El checkout de Shopify convierte hasta un 36% más que la competencia. Shop Pay acelera la compra con 1 clic.",
                },
                {
                  icon: Search,
                  title: "SEO nativo optimizado",
                  desc: "Sitemap automático, meta tags editables, URLs limpias, compresión de imágenes y velocidad optimizada de fábrica para Google.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all duration-300 hover:bg-zinc-900"
                >
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4 group-hover:bg-emerald-500/20 transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 3. ¿SHOPIFY ES PARA TI? ===== */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 bg-zinc-950/50 border-y border-zinc-800/50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                ¿Shopify es para ti? <span className="text-emerald-400">Descúbrelo según tu caso</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Shopify se adapta a diferentes tipos de negocio. Identifica cuál es el tuyo.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Emprendedor lanzando su primera tienda online",
                  desc: "Necesitas rapidez y simplicidad sin depender de un desarrollador. Shopify te da todo listo para vender en menos de una semana.",
                },
                {
                  title: "Marca DTC (Direct to Consumer)",
                  desc: "Vendes productos propios y necesitas control total de la experiencia de marca, desde el landing page hasta el unboxing digital.",
                },
                {
                  title: "Negocio físico expandiéndose al digital",
                  desc: "Shopify POS unifica tu tienda física y online en un solo inventario, un solo dashboard, una sola plataforma.",
                },
                {
                  title: "Empresa con +$1M en ventas anuales",
                  desc: "Shopify Plus ofrece automatización con Flow, personalización del checkout, scripts exclusivos y soporte dedicado 24/7.",
                },
                {
                  title: "Dropshipping y Marketplaces",
                  desc: "Integración nativa con DSers, Amazon, MercadoLibre, Instagram Shopping y TikTok Shop. Conecta todos tus canales de venta.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/20 transition-all"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 4. SHOPIFY VS OTRAS PLATAFORMAS ===== */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Shopify vs WooCommerce vs VTEX —{" "}
                <span className="text-emerald-400">Comparativa honesta</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                No todas las plataformas son iguales. Esta comparativa te ayuda a tomar la decisión correcta para tu negocio.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-zinc-800 -mx-4 sm:mx-0">
              <table className="w-full text-xs sm:text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-zinc-900 border-b border-zinc-800">
                    <th className="text-left p-4 font-bold text-zinc-400">Criterio</th>
                    <th className="p-4 font-bold text-emerald-400">Shopify</th>
                    <th className="p-4 font-bold text-zinc-300">WooCommerce</th>
                    <th className="p-4 font-bold text-zinc-300">VTEX</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {[
                    ["Tiempo de lanzamiento", "Días", "Semanas", "Meses"],
                    ["Costo inicial", "Bajo ($29/mes)", "Medio (hosting + dev)", "Alto (enterprise)"],
                    ["Mantenimiento", "Cero (SaaS)", "Alto (hosting, updates, seguridad)", "Medio"],
                    ["Escalabilidad", "Shopify Plus (ilimitada)", "Limitada por hosting", "Enterprise"],
                    ["Checkout optimizado", "✅ Shop Pay (36% más conversión)", "❌ Custom, sin optimizar", "✅ Propio"],
                    ["Headless / API", "✅ Hydrogen + Storefront API", "Parcial (REST)", "✅ VTEX IO"],
                    ["SEO nativo", "✅ Completo", "✅ Con plugins (Yoast)", "⚠️ Complejo"],
                    ["Soporte 24/7", "✅ Incluido", "❌ Comunidad", "✅ Enterprise"],
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="p-4 font-medium text-white">{row[0]}</td>
                      <td className="p-4 text-center text-emerald-300">{row[1]}</td>
                      <td className="p-4 text-center text-zinc-400">{row[2]}</td>
                      <td className="p-4 text-center text-zinc-400">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-zinc-500 mt-6 text-center max-w-3xl mx-auto">
              ¿Estás pensando en migrar de WooCommerce a Shopify o de VTEX a Shopify? En Nitro Ecom hemos realizado migraciones exitosas sin pérdida de tráfico orgánico. Cada caso es diferente — agenda un diagnóstico gratis para evaluar tu situación.
            </p>
          </div>
        </section>

        {/* ===== 5. SERVICIOS SHOPIFY ===== */}
        <section id="servicios-shopify" className="py-14 sm:py-20 px-4 sm:px-6 bg-zinc-950/50 border-y border-zinc-800/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                Nuestros servicios <span className="text-emerald-400">Shopify</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Desde el primer producto hasta la internacionalización. Te acompañamos en cada etapa de tu crecimiento en Shopify.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Code,
                  title: "Desarrollo Shopify personalizado",
                  desc: "Themes a medida con Liquid, secciones dinámicas, integraciones de pago locales y funcionalidades únicas. No usamos templates genéricos — cada tienda refleja la identidad de tu marca.",
                  tags: ["Liquid", "Tema personalizado", "Secciones dinámicas"],
                },
                {
                  icon: Rocket,
                  title: "Migración a Shopify",
                  desc: "Migración completa desde WooCommerce, Magento, VTEX, PrestaShop o cualquier plataforma. Transferimos productos, clientes, pedidos y preservamos tu SEO con redirects 301.",
                  tags: ["WooCommerce a Shopify", "Magento", "VTEX", "Redirects 301"],
                },
                {
                  icon: Globe,
                  title: "Shopify Plus & Headless (Hydrogen)",
                  desc: "Para marcas enterprise que necesitan ultra-performance. Hydrogen + React + Storefront API para tiendas con tiempos de carga sub-segundo y personalización total del frontend.",
                  tags: ["Shopify Plus", "Hydrogen", "Headless", "React"],
                },
                {
                  icon: TrendingUp,
                  title: "Optimización CRO Shopify",
                  desc: "Optimización de checkout, velocidad de carga, UX mobile-first y A/B testing. Incrementamos tu tasa de conversión identificando y eliminando fricciones en el embudo de compra.",
                  tags: ["CRO", "Checkout", "Velocidad", "A/B Testing"],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-5 group-hover:bg-emerald-500/20 transition-colors">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 6. HERRAMIENTAS DEL ECOSISTEMA ===== */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                Herramientas esenciales del <span className="text-emerald-400">ecosistema Shopify</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Shopify no es solo una tienda. Es un ecosistema completo de herramientas para vender, automatizar y escalar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: Bot,
                  name: "Shopify Sidekick (AI)",
                  desc: "Asistente de inteligencia artificial que te ayuda a gestionar tu tienda, crear descripciones de producto, y analizar datos de ventas con lenguaje natural.",
                },
                {
                  icon: CreditCard,
                  name: "Shop Pay",
                  desc: "Checkout acelerado con 1 clic. Los clientes que usan Shop Pay convierten hasta un 50% más que con checkout tradicional.",
                },
                {
                  icon: Workflow,
                  name: "Shopify Flow",
                  desc: "Automatización sin código. Crea flujos para etiquetar clientes VIP, alertas de inventario bajo, segmentación automática y más.",
                },
                {
                  icon: Globe,
                  name: "Shopify Markets",
                  desc: "Vende en múltiples países con localización de moneda, idioma, precios y dominios. Expansión internacional sin complicaciones.",
                },
                {
                  icon: Store,
                  name: "Shopify POS",
                  desc: "Punto de venta físico integrado con tu tienda online. Un solo inventario, un solo dashboard, una experiencia omnicanal.",
                },
                {
                  icon: Code,
                  name: "Hydrogen + Oxygen",
                  desc: "Framework headless de Shopify basado en React. Tiendas ultra-rápidas con despliegue global en la edge network de Oxygen.",
                },
              ].map((tool, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-emerald-500/20 transition-all"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
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
                Resultados que hablan: <span className="text-emerald-400">Shopify en números</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: "+4.7M", label: "Tiendas activas globalmente" },
                { value: "$444B", label: "En ventas procesadas" },
                { value: "94%", label: "Uptime checkout (Black Friday)" },
                { value: "175+", label: "Países con soporte nativo" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
                  <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400 mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 8. BLOG DINÁMICO ===== */}
        {posts && posts.length > 0 && (
          <section className="py-14 sm:py-20 px-4 sm:px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-2xl sm:text-4xl font-bold mb-2">
                    Últimos artículos sobre <span className="text-emerald-400">Shopify</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Guías, tutoriales y estrategias para dominar Shopify.
                  </p>
                </div>
                <Link
                  href="/blog/tags/shopify"
                  className="hidden sm:inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  Ver todos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: any, index: number) => (
                  <BlogCard key={post._id} post={post} priority={index < 2} />
                ))}
              </div>

              <div className="sm:hidden mt-8 text-center">
                <Link href="/blog/tags/shopify">
                  <Button variant="outline" className="border-emerald-500/30 hover:border-emerald-500">
                    Ver todos los artículos <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ===== 9. FAQ ===== */}
        <section className="py-20 px-6 bg-zinc-950/50 border-y border-zinc-800/50">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-emerald-400 mb-4">
                <HelpCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Preguntas frecuentes</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold">
                Todo lo que necesitas saber sobre <span className="text-emerald-400">Shopify</span>
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-zinc-800 rounded-xl px-6 py-1 bg-zinc-900/50 hover:border-emerald-500/30 transition-all data-[state=open]:border-emerald-500/30"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-white hover:text-emerald-400 hover:no-underline py-4">
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
        <section id="contacto-shopify" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Hablemos de tu tienda{" "}
                <span className="text-emerald-400">Shopify</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Déjanos tus datos. Analizamos tu caso y diseñamos la estrategia para escalar con Shopify.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}
