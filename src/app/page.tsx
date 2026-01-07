import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Zap, TrendingUp, ShoppingCart, BarChart3, MessageSquare, Search, Package } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-primary">Nitro</span>
              <span className="text-foreground">Tech</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                Servicios
              </a>
              <a href="#metricas" className="text-muted-foreground hover:text-foreground transition-colors">
                Resultados
              </a>
              <a href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </a>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Consulta Gratuita</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="animate-fade-in-up">
            <div className="max-w-4xl">
              <h1 className="text-6xl md:text-8xl font-bold leading-none mb-6 text-balance">
                Arquitectos de
                <span className="block text-primary mt-2">ecosistemas digitales</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed text-pretty max-w-2xl">
                No montamos tiendas. Construimos infraestructura tecnológica que escala tu negocio de 6 a 7 cifras.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 group"
                >
                  Auditoría Gratuita
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-border hover:border-primary bg-transparent"
                >
                  Ver Casos de Éxito
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section id="metricas" className="py-16 px-6 border-y border-border/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "10x", label: "ROI Promedio", suffix: "" },
              { value: "99.9", label: "Uptime", suffix: "%" },
              { value: "<200", label: "Tiempo de Carga", suffix: "ms" },
              { value: "50+", label: "Proyectos Escalados", suffix: "" },
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">
                  {metric.value}
                  {metric.suffix}
                </div>
                <div className="text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicios" className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-4">Ecosistema de servicios</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Soluciones modulares que trabajan juntas para acelerar tu crecimiento digital.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* NitroBot */}
            <Card className="bg-card border-border p-8 hover:border-primary transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm text-primary font-mono">01</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">NitroBot</h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Agentes de chat con IA que convierten conversaciones en ventas. Soporte 24/7, calificación de leads y
                automatización inteligente.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs bg-secondary px-3 py-1 rounded-full">Conversión +35%</span>
                <span className="text-xs bg-secondary px-3 py-1 rounded-full">Soporte 24/7</span>
                <span className="text-xs bg-secondary px-3 py-1 rounded-full">Lead Scoring</span>
              </div>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80 p-0 group-hover:translate-x-2 transition-transform"
              >
                Explorar <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>

            {/* NitroSearch */}
            <Card className="bg-card border-border p-8 hover:border-primary transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm text-primary font-mono">02</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">NitroSearch</h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Estrategia de visibilidad omnicanal. SEO técnico, optimización de conversión y posicionamiento en redes
                sociales que genera tráfico calificado.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs bg-secondary px-3 py-1 rounded-full">Tráfico +200%</span>
                <span className="text-xs bg-secondary px-3 py-1 rounded-full">SEO Técnico</span>
                <span className="text-xs bg-secondary px-3 py-1 rounded-full">Social Growth</span>
              </div>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80 p-0 group-hover:translate-x-2 transition-transform"
              >
                Explorar <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>

            {/* NitroCommerce */}
            <Card className="bg-card border-border p-8 hover:border-primary transition-all duration-300 group lg:col-span-2">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <ShoppingCart className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm text-primary font-mono">03</span>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">NitroCommerce</h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    Ecosistemas de ecommerce headless de última generación. Arquitectura desacoplada, rendimiento
                    extremo y experiencias de compra que convierten.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs bg-secondary px-3 py-1 rounded-full">Headless CMS</span>
                    <span className="text-xs bg-secondary px-3 py-1 rounded-full">Tiempo de carga {"<"}1s</span>
                    <span className="text-xs bg-secondary px-3 py-1 rounded-full">Escalabilidad Infinita</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-secondary/50 p-8 rounded-lg border border-border">
                    <Package className="w-24 h-24 text-primary/50 mb-4" />
                    <div className="text-sm text-muted-foreground">Stack Tecnológico:</div>
                    <div className="text-xs text-muted-foreground mt-2 space-y-1">
                      <div>→ Next.js 16 + React 19</div>
                      <div>→ Headless CMS (Sanity/Contentful)</div>
                      <div>→ Stripe/Shopify API</div>
                      <div>→ Vercel Edge Network</div>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80 p-0 mt-4 group-hover:translate-x-2 transition-transform"
              >
                Ver Arquitectura <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>

            {/* AuditoríaNitro */}
            <Card className="bg-card border-border p-8 hover:border-primary transition-all duration-300 group lg:col-span-2">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm text-primary font-mono">04</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">AuditoríaNitro</h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed max-w-3xl">
                Consultoría especializada en comercio electrónico y marketing digital. Análisis profundo de tu operación
                actual, identificación de cuellos de botella y roadmap estratégico para escalar tu negocio.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary/30 p-4 rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-1">Análisis</div>
                  <div className="text-sm text-muted-foreground">Auditoría técnica completa</div>
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-1">Estrategia</div>
                  <div className="text-sm text-muted-foreground">Roadmap de crecimiento</div>
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-1">Ejecución</div>
                  <div className="text-sm text-muted-foreground">Implementación guiada</div>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80 p-0 group-hover:translate-x-2 transition-transform"
              >
                Solicitar Auditoría <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 leading-tight text-balance">
                Por qué las empresas que escalan nos eligen
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                No somos una agencia más. Somos ingenieros de sistemas que entienden tanto el código como el negocio.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: Zap,
                    title: "Velocidad Obsesiva",
                    desc: "Infraestructura optimizada para tiempos de carga <200ms",
                  },
                  {
                    icon: TrendingUp,
                    title: "Escalabilidad Real",
                    desc: "Arquitectura que soporta de 100 a 100,000 usuarios sin refactorización",
                  },
                  { icon: BarChart3, title: "ROI Medible", desc: "Tracking completo con dashboards en tiempo real" },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg h-fit">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <p className="text-lg italic text-muted-foreground mb-4">
                    "Pasamos de facturar $50K mensuales a $500K en 8 meses. La infraestructura que construyeron aguantó
                    el Black Friday sin un solo problema."
                  </p>
                  <div className="font-bold">— CEO, Ecommerce de Moda</div>
                  <div className="text-sm text-muted-foreground">500% crecimiento en 8 meses</div>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <p className="text-lg italic text-muted-foreground mb-4">
                    "No son developers, son arquitectos. Entendieron nuestro modelo de negocio y construyeron algo que
                    escala con nosotros."
                  </p>
                  <div className="font-bold">— Fundador, Tech Startup</div>
                  <div className="text-sm text-muted-foreground">De MVP a Serie A en 12 meses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">¿Listo para escalar tu negocio?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Agenda una auditoría gratuita y descubre cómo nuestra infraestructura puede acelerar tu crecimiento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
              Agenda tu Auditoría Gratuita
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-border hover:border-primary bg-transparent"
            >
              Ver Casos de Estudio
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-primary">Nitro</span>
                <span className="text-foreground">Tech</span>
              </div>
              <p className="text-muted-foreground text-sm">Arquitectos de ecosistemas digitales de alto rendimiento</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    NitroBot
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    NitroSearch
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    NitroCommerce
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    AuditoríaNitro
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Casos de Éxito
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>hola@nitrotech.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            © 2026 NitroTech. Construido con Next.js 16 en Vercel Edge Network.
          </div>
        </div>
      </footer>
    </div>
  )
}
