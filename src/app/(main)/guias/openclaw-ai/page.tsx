import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Terminal, AlertTriangle, Zap, Lock,
  CheckCircle2, Globe, Code2, Cpu, Lightbulb,
  Wrench, Database, FileJson, Search,
  Info, ShieldAlert, BookOpen, ArrowRight, ExternalLink,
} from "lucide-react"
import { OpenClawSidebar } from "./_components/OpenClawSidebar"
import { OpenClawCodeBlock } from "./_components/OpenClawCodeBlock"
import { OpenClawInstallationTabs } from "./_components/OpenClawInstallationTabs"
import { OpenClawFAQ } from "./_components/OpenClawFAQ"
import { constructMetadata } from "@/lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Guía OpenClaw AI 2026 | Agentes IA Autónomos | Nitro Ecom",
  description:
    "Domina OpenClaw AI desde cero. Aprende a instalar, configurar y desplegar agentes de inteligencia artificial autónomos. Guía completa con ejemplos, Skills y consejos pro.",
  canonical: "https://www.juanarangoecommerce.com/guias/openclaw-ai",
})

// ── Brand colors ──
// Primary accent : #e05a3a (coral/red)
// Dark bg        : #070303 / #0a0505
// Emerald accent : #10b981 (for code/success states)

export const revalidate = 86400 // 24h

function SectionHeader({ icon: Icon, title, iconColor = "text-[#e05a3a]", bgColor = "bg-[#e05a3a]/10", borderColor = "border-[#e05a3a]/20" }: {
  icon: any; title: string; iconColor?: string; bgColor?: string; borderColor?: string
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={`p-3 ${bgColor} rounded-xl border ${borderColor}`}>
        <Icon className={iconColor} size={26} />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
    </div>
  )
}

function ConceptCard({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#e05a3a]/20 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#e05a3a]/10 rounded-lg">
          <Icon className="text-[#e05a3a]" size={22} />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="text-sm text-zinc-400 leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

function StepNumber({ n }: { n: number }) {
  return (
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm font-mono text-[#e05a3a]">
      {n}
    </span>
  )
}

export default function OpenClawGuidePage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo instalar y usar OpenClaw AI paso a paso",
    description: "Guía completa para configurar y usar agentes de IA autónomos con OpenClaw AI.",
    step: [
      { "@type": "HowToStep", position: 1, name: "Instalar dependencias", text: "Clonar el repositorio e instalar Node.js, Python y Git." },
      { "@type": "HowToStep", position: 2, name: "Configurar .env", text: "Añadir tu API Key de Gemini u OpenAI al archivo .env." },
      { "@type": "HowToStep", position: 3, name: "Iniciar el agente", text: "Ejecutar npm run start para lanzar la interfaz de OpenClaw." },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="min-h-screen bg-[#070303] text-white">
        <div className="flex md:flex-row flex-col">
          {/* ─── Sidebar (Client Island) ─── */}
          <OpenClawSidebar />

          {/* ─── Main Content (Server) ─── */}
          <main className="flex-1 px-5 md:px-12 lg:px-20 py-10 md:py-14 max-w-5xl mx-auto w-full">
            <article className="space-y-28">

              {/* ── HERO ── */}
              <section id="inicio" className="pt-6 md:pt-14 scroll-mt-28">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[#e05a3a]/10 text-[#e05a3a] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8 border border-[#e05a3a]/20">
                  <Zap size={13} />
                  Guía Definitiva 2026
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[1.08]">
                  Domina{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e05a3a] to-[#f5977b]">
                    OpenClaw AI
                  </span>{" "}
                  desde cero.
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
                  Ya seas un principiante curioso o un desarrollador experimentado, esta guía interactiva te llevará paso a paso para instalar, configurar y desplegar agentes autónomos. Descubre cómo potenciar tu IA con Skills y automatizar tu trabajo.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <a
                    href="#instalacion"
                    className="inline-flex items-center justify-center gap-2 bg-[#e05a3a] text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-[#c94d30] transition-colors shadow-[0_0_30px_rgba(224,90,58,0.25)] text-sm"
                  >
                    <Terminal size={17} />
                    Instalar Ahora
                  </a>
                  <a
                    href="#que-es"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-colors border border-white/10 text-sm"
                  >
                    Leer la Guía
                    <ArrowRight size={17} />
                  </a>
                </div>

                {/* Brand logo (larger, strategic placement) */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0505] p-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e05a3a]/5 to-transparent" />
                  <Image
                    src="https://res.cloudinary.com/dohwyszdj/image/upload/v1772308526/openclaw-ai-2026_f496yo.webp"
                    alt="OpenClaw AI — Agentes de IA Autónomos"
                    width={480}
                    height={180}
                    priority
                    className="relative z-10 rounded-xl max-w-full"
                    sizes="(max-width: 768px) 90vw, 480px"
                  />
                </div>
              </section>

              {/* ── ¿QUÉ ES? ── */}
              <section id="que-es" className="scroll-mt-24">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Qué es OpenClaw AI?</h2>
                <div className="text-zinc-300 leading-relaxed space-y-5 text-base md:text-lg">
                  <p>
                    <strong className="text-white">OpenClaw AI</strong> es un framework de código abierto diseñado para crear, gestionar y desplegar <strong className="text-white">agentes de inteligencia artificial autónomos</strong>.
                  </p>
                  <p>
                    A diferencia de chatbots como ChatGPT o Claude, OpenClaw tiene &quot;garras&quot; (claws): <strong className="text-white">puede interactuar directamente con tu computadora</strong> — abrir el navegador, hacer clics, escribir código, guardarlo y ejecutarlo.
                  </p>

                  {/* Highlight box */}
                  <div className="bg-[#e05a3a]/10 border border-[#e05a3a]/20 p-5 rounded-2xl">
                    <h4 className="text-[#e05a3a] font-semibold flex items-center gap-2 mb-3 text-base">
                      <Info size={18} /> La diferencia clave
                    </h4>
                    <p className="text-sm text-zinc-300">
                      <strong className="text-white">Chatbot normal:</strong> &quot;Aquí tienes el código.&quot;
                      (Tú debes copiarlo, guardarlo y ejecutarlo).<br /><br />
                      <strong className="text-white">OpenClaw AI:</strong> &quot;He creado el script, lo guardé, lo ejecuté, encontré el error, lo corregí, y aquí tienes el resultado final.&quot;
                    </p>
                  </div>

                  {/* Feature cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                    {[
                      { icon: Globe, title: "Navegación Autónoma", desc: "Interactúa con el navegador, hace clics, llena formularios y extrae datos de cualquier sitio." },
                      { icon: Code2, title: "Ejecución de Código", desc: "Escribe, depura y ejecuta scripts en Python, Node.js y Bash directamente." },
                      { icon: Cpu, title: "Agnóstico de Modelos", desc: "Usa Gemini, OpenAI, Anthropic o modelos locales gratuitos en tu PC." },
                    ].map(({ icon: Icon, title, desc }) => (
                      <div key={title} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#e05a3a]/30 transition-colors">
                        <Icon className="text-[#e05a3a] mb-4" size={30} />
                        <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── CONCEPTOS BÁSICOS ── */}
              <section id="conceptos" className="scroll-mt-24">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Conceptos Básicos para Principiantes</h2>
                <p className="text-zinc-400 mb-8 text-base leading-relaxed">
                  Si es tu primera vez trabajando con herramientas de desarrollo o IA avanzada, aquí tienes un glosario rápido.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <ConceptCard icon={Terminal} title="Terminal / Consola">
                    <p>Una pantalla donde escribes comandos de texto. En Windows se llama <strong className="text-zinc-200">PowerShell</strong>; en Mac/Linux, <strong className="text-zinc-200">Terminal</strong>.</p>
                  </ConceptCard>
                  <ConceptCard icon={Lock} title="API Key (Clave API)">
                    <p>Una contraseña secreta que te dan empresas como Google o OpenAI para que OpenClaw se conecte a sus modelos de IA.</p>
                    <p className="text-red-400 font-semibold mt-1">¡Nunca compartas tu API Key con nadie!</p>
                  </ConceptCard>
                  <ConceptCard icon={BookOpen} title="Variables de Entorno (.env)">
                    <p>Archivo oculto donde guardas configuraciones secretas como tu API Key. OpenClaw lo lee al iniciarse.</p>
                  </ConceptCard>
                  <ConceptCard icon={ShieldAlert} title="Docker (Contenedores)">
                    <p>Una &quot;caja fuerte&quot; virtual dentro de tu PC. Si la IA comete un error en Docker, no afecta tu sistema real.</p>
                  </ConceptCard>
                </div>
              </section>

              {/* ── RIESGOS ── */}
              <section id="advertencias" className="scroll-mt-24">
                <SectionHeader icon={AlertTriangle} title="Riesgos y Seguridad" iconColor="text-amber-400" bgColor="bg-amber-500/10" borderColor="border-amber-500/20" />
                <p className="text-zinc-300 mb-8 text-base leading-relaxed">
                  OpenClaw AI no es un simple generador de texto; es un agente con capacidad de acción real en tu sistema. <strong className="text-white">Lee esto antes de instalarlo.</strong>
                </p>
                <div className="space-y-5">
                  {[
                    {
                      color: "amber", icon: Terminal,
                      title: "Ejecución de Código Arbitrario",
                      body: "El agente puede ejecutar comandos de terminal, crear, modificar o borrar archivos.",
                      fix: "Nunca lo ejecutes con permisos de administrador (root). Usa Docker o una Máquina Virtual.",
                    },
                    {
                      color: "red", icon: Lock,
                      title: "Exposición de Claves Privadas",
                      body: "Con acceso al sistema de archivos raíz, el agente podría leer tus archivos .env o claves bancarias.",
                      fix: "Ejecuta OpenClaw solo en carpetas específicas (Workspaces) y usa el archivo .clawignore.",
                    },
                    {
                      color: "blue", icon: Zap,
                      title: "Costos de API Inesperados",
                      body: "Los agentes pueden entrar en bucles infinitos, consumiendo tokens rápidamente.",
                      fix: "Configura MAX_STEPS=15 en tu .env para que se detenga automáticamente.",
                    },
                  ].map(({ color, icon: Icon, title, body, fix }) => {
                    const c = { amber: "amber-500", red: "red-500", blue: "blue-400" }[color]
                    return (
                      <div key={title} className={`bg-${c?.split("-")[0]}-500/5 border border-${c?.split("-")[0]}-500/20 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row gap-5 items-start`}>
                        <div className={`p-4 bg-${c?.split("-")[0]}-500/10 rounded-full shrink-0`}>
                          <Icon className={`text-${c}`} size={24} />
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold text-${c} mb-2`}>{title}</h3>
                          <p className="text-zinc-300 text-sm leading-relaxed mb-2">{body}</p>
                          <p className="text-zinc-400 text-xs"><strong className="text-zinc-300">Solución:</strong> {fix}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* ── INSTALACIÓN ── */}
              <section id="instalacion" className="scroll-mt-24">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Guía de Instalación</h2>
                <p className="text-zinc-400 mb-8 text-base leading-relaxed">
                  Sigue estos pasos para tener OpenClaw AI corriendo en tu máquina en menos de 5 minutos.
                </p>

                {/* Prerequisites */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-7 mb-10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#e05a3a] rounded-l-2xl" />
                  <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-3">
                    <CheckCircle2 className="text-[#e05a3a]" size={22} /> Requisitos Previos
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 text-zinc-300">
                    {[
                      { href: "https://nodejs.org/", name: "Node.js (v18+)", desc: "Motor que ejecuta el código principal de OpenClaw." },
                      { href: "https://www.python.org/downloads/", name: "Python (v3.10+)", desc: "Necesario para scripts de análisis de datos." },
                      { href: "https://git-scm.com/downloads", name: "Git", desc: "Para descargar el código fuente desde GitHub." },
                      { href: "https://aistudio.google.com/app/apikey", name: "API Key válida", desc: "Recomendamos Google Gemini (gratis para empezar)." },
                    ].map(item => (
                      <li key={item.name} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#e05a3a]" />
                          <a href={item.href} target="_blank" rel="noreferrer" className="font-semibold hover:text-[#e05a3a] transition-colors flex items-center gap-1 text-sm">
                            {item.name} <ExternalLink size={13} />
                          </a>
                        </div>
                        <span className="text-xs text-zinc-500 ml-3.5">{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-10">
                  {/* Step 1 */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                      <StepNumber n={1} /> Clonar e Instalar
                    </h3>
                    <p className="text-zinc-400 mb-1 text-sm leading-relaxed">
                      Abre tu terminal y copia los comandos según tu sistema operativo.
                    </p>
                    <OpenClawInstallationTabs />
                  </div>

                  {/* Step 2 */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                      <StepNumber n={2} /> Configuración de Entorno (.env)
                    </h3>
                    <p className="text-zinc-400 mb-2 text-sm leading-relaxed">
                      El paso anterior creó un archivo <code className="text-[#e05a3a] bg-[#e05a3a]/10 px-1.5 py-0.5 rounded text-xs">.env</code>. Ábrelo con tu editor y añade tu API Key.
                    </p>
                    <OpenClawCodeBlock
                      language="env"
                      code={`# Archivo: .env

# Pega aquí tu clave de Google AI Studio (Gemini)
GEMINI_API_KEY="AIzaSyTuClaveSecretaAqui..."

# Opcional: Si prefieres usar OpenAI (ChatGPT)
# OPENAI_API_KEY="sk-proj-TuClaveSecretaAqui..."

# Carpeta donde el agente guardará sus archivos
WORKSPACE_DIR="./workspace"

# Número máximo de intentos antes de rendirse
MAX_STEPS=15

# Permite que el agente ejecute comandos en la terminal
ALLOW_SHELL_EXECUTION=true`}
                    />
                  </div>

                  {/* Step 3 */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                      <StepNumber n={3} /> Iniciar el Agente
                    </h3>
                    <p className="text-zinc-400 mb-2 text-sm leading-relaxed">
                      Vuelve a tu terminal y ejecuta el comando de inicio.
                    </p>
                    <OpenClawCodeBlock language="bash" code="npm run start" />
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-1">
                      <p className="text-sm text-zinc-400">
                        <strong className="text-white">¡Felicidades!</strong> Si ves el logo de OpenClaw en tu terminal, ya puedes escribirle tareas. Prueba con:{" "}
                        <code className="text-[#e05a3a] bg-[#e05a3a]/10 px-2 py-0.5 rounded text-xs">Crea un archivo llamado hola.txt que diga &apos;Hola Mundo&apos;</code>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── SKILLS ── */}
              <section id="skills" className="scroll-mt-24">
                <SectionHeader icon={Wrench} title="Skills (Habilidades)" iconColor="text-purple-400" bgColor="bg-purple-500/10" borderColor="border-purple-500/20" />
                <p className="text-zinc-300 mb-8 text-base leading-relaxed">
                  La verdadera magia de OpenClaw radica en sus <strong className="text-white">Skills</strong> — herramientas o &quot;superpoderes&quot; que le añades al agente.
                </p>

                <div className="bg-white/5 border border-white/10 p-7 rounded-2xl mb-7">
                  <h3 className="text-lg font-semibold text-white mb-3">¿Cómo funcionan las Skills?</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                    Una Skill es un archivo de código en la carpeta <code className="text-[#e05a3a] bg-[#e05a3a]/10 px-1.5 py-0.5 rounded text-xs">/skills</code> que define una función específica. El agente revisa su &quot;caja de herramientas&quot; y decide cuál usar.
                  </p>
                  <h4 className="text-purple-400 font-semibold mb-3 text-sm">Skills preinstaladas:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { icon: Search, color: "text-blue-400", name: "WebSearchSkill", desc: "Busca en Google y lee páginas web." },
                      { icon: Terminal, color: "text-orange-400", name: "BashExecutionSkill", desc: "Ejecuta comandos en tu terminal." },
                      { icon: FileJson, color: "text-yellow-400", name: "FileManagementSkill", desc: "Lee, escribe y modifica archivos." },
                      { icon: Database, color: "text-purple-400", name: "SQLQuerySkill", desc: "Se conecta a bases de datos." },
                    ].map(({ icon: Icon, color, name, desc }) => (
                      <div key={name} className="flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                        <Icon className={`${color} mt-0.5 shrink-0`} size={18} />
                        <div>
                          <strong className="text-zinc-200 block text-sm">{name}</strong>
                          <span className="text-xs text-zinc-500">{desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 p-7 rounded-2xl">
                  <h3 className="text-lg font-semibold text-white mb-3">Creando tu propia Skill</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-2">
                    Por ejemplo, si quieres que el agente envíe mensajes por Slack:
                  </p>
                  <OpenClawCodeBlock
                    language="typescript"
                    code={`export const SlackSkill = {
  name: "send_slack_message",
  description: "Envía un mensaje a un canal de Slack",
  parameters: {
    channel: "string (ej: #general)",
    message: "string"
  },
  execute: async (args) => {
    await slackClient.chat.postMessage({
      channel: args.channel,
      text: args.message
    });
    return "Mensaje enviado con éxito";
  }
};`}
                  />
                </div>
              </section>

              {/* ── EJEMPLOS ── */}
              <section id="ejemplos" className="scroll-mt-24">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ejemplos de Uso (Prompts)</h2>
                <p className="text-zinc-400 mb-8 text-base leading-relaxed">¿No sabes qué pedirle? Aquí tienes ejemplos desde lo más básico hasta flujos avanzados.</p>

                <div className="space-y-8">
                  {[
                    {
                      level: "Básico (Gestión de Archivos)", color: "text-[#e05a3a]",
                      items: [
                        'Crea una carpeta llamada "proyecto_web". Dentro, crea un index.html con estructura HTML5 y un styles.css con fondo oscuro.',
                        'Lee el archivo "lista_compra.txt", ordénalo alfabéticamente y guárdalo como "lista_ordenada.txt".',
                      ],
                    },
                    {
                      level: "Intermedio (Investigación y Análisis)", color: "text-blue-400",
                      items: [
                        'Busca en internet las últimas 5 noticias sobre Inteligencia Artificial, haz un resumen de cada una y guárdalo en noticias_ia.md',
                        'Crea un script en Python que lea datos.csv, genere un gráfico de barras con matplotlib y guarde la imagen como grafico.png.',
                      ],
                    },
                    {
                      level: "Avanzado (Desarrollo y DevOps)", color: "text-purple-400",
                      items: [
                        'Revisa todos los archivos .js en /src, elimina funciones no utilizadas, ejecuta npm test y si pasan haz un commit con el mensaje "Limpieza de código".',
                        'Tengo un error "CORS policy" en Express.js. Revisa server.js, instala cors si es necesario, arregla el código y reinicia el servidor.',
                      ],
                    },
                  ].map(({ level, color, items }) => (
                    <div key={level}>
                      <h3 className={`text-lg font-semibold ${color} mb-4 border-b border-white/10 pb-2`}>{level}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.map((item, i) => (
                          <div key={i} className="bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl">
                            <p className="text-zinc-200 text-sm leading-relaxed">&quot;{item}&quot;</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── CONSEJOS PRO ── */}
              <section id="consejos-pro" className="scroll-mt-24">
                <SectionHeader icon={Lightbulb} title="Consejos Pro y Optimización" iconColor="text-yellow-400" bgColor="bg-yellow-400/10" borderColor="border-yellow-400/20" />
                <p className="text-zinc-400 mb-8 text-base leading-relaxed">
                  Para dominar OpenClaw AI, aplica estas estrategias utilizadas por desarrolladores expertos.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    {
                      title: "1. System Prompts (Perfiles)",
                      body: 'El "System Prompt" es la instrucción base. Crea perfiles específicos en la carpeta /prompts para diferentes tareas (scraping, análisis, etc.).',
                      code: `{\n  "role": "Senior Scraper",\n  "rules": [\n    "No usar regex para HTML",\n    "Respetar robots.txt",\n    "Devolver JSON"\n  ]\n}`,
                      lang: "json",
                    },
                    {
                      title: "2. Human-in-the-Loop (HITL)",
                      body: 'Activa REQUIRE_APPROVAL=true en tu .env. Esto pausa la ejecución antes de comandos destructivos como "git push" o "rm -rf" y espera tu confirmación.',
                    },
                    {
                      title: "3. Ventana de Contexto",
                      body: 'La IA tiene memoria limitada. Si le pides leer 50 archivos a la vez, se "olvidará" del objetivo. Usa el comando /clear periódicamente para empezar limpio.',
                    },
                    {
                      title: "4. Modelos Locales (Gratis y Privados)",
                      body: "Para código confidencial, conecta OpenClaw a modelos locales usando Ollama o LM Studio. Solo cambia la URL de la API en .env.",
                    },
                  ].map(({ title, body, code, lang }) => (
                    <div key={title} className="bg-white/5 border border-white/10 p-7 rounded-2xl hover:bg-white/[0.07] transition-colors">
                      <h3 className="text-base font-semibold text-white mb-3">{title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-3">{body}</p>
                      {code && lang && <OpenClawCodeBlock code={code} language={lang} />}
                    </div>
                  ))}
                </div>
              </section>

              {/* ── FAQ ── */}
              <section id="faq" className="scroll-mt-24 pb-24">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Preguntas Frecuentes</h2>
                <OpenClawFAQ />

                {/* Back link */}
                <div className="mt-16 pt-8 border-t border-white/10">
                  <Link
                    href="/guias"
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#e05a3a] transition-colors"
                  >
                    ← Volver a Guías
                  </Link>
                </div>
              </section>

            </article>
          </main>
        </div>
      </div>
    </>
  )
}
