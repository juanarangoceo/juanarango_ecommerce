"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  FlaskConical,
  Zap,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Code2,
  Layers,
  Rocket,
  BrainCircuit,
  TerminalSquare,
  ShoppingCart,
  Star,
  Users,
  Lock,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CircuitBoard,
  Play,
} from "lucide-react";
import { joinLaboratorioWaitlist } from "@/app/actions/join-laboratorio";
import { motion, AnimatePresence } from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: Rocket,
    label: "EXPERIMENTO 01",
    title: "Proyectos Escalables Reales",
    desc: "Cada mes recibirás un proyecto completo y replicable: tiendas, sistemas de automatización, funnels. Tú lo descargas, lo adaptas y lo lanzas.",
    color: "cyan",
    glow: "shadow-cyan-500/20",
    border: "border-cyan-500/30",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    tag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    icon: TerminalSquare,
    label: "EXPERIMENTO 02",
    title: "Prompts Profesionales",
    desc: "Prompts curados para crear MVPs, landing pages, copy de ventas, análisis de mercado y más. El mismo arsenal que uso con mis clientes.",
    color: "fuchsia",
    glow: "shadow-fuchsia-500/20",
    border: "border-fuchsia-500/30",
    iconBg: "bg-fuchsia-500/10",
    iconColor: "text-fuchsia-400",
    tag: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
  },
  {
    icon: Code2,
    label: "EXPERIMENTO 03",
    title: "MVPs Paso a Paso",
    desc: "Desde la idea hasta el producto lanzado. Documentación completa, código real y proceso detallado para construir productos digitales rápido.",
    color: "cyan",
    glow: "shadow-cyan-500/20",
    border: "border-cyan-500/30",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    tag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    icon: Layers,
    label: "EXPERIMENTO 04",
    title: "Landing Pages Convertidoras",
    desc: "Templates y disecciones de landing pages que venden. Aprenderás la psicología detrás de cada sección y podrás clonarlas para tu negocio.",
    color: "fuchsia",
    glow: "shadow-fuchsia-500/20",
    border: "border-fuchsia-500/30",
    iconBg: "bg-fuchsia-500/10",
    iconColor: "text-fuchsia-400",
    tag: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
  },
  {
    icon: BrainCircuit,
    label: "EXPERIMENTO 05",
    title: "Sistemas con IA",
    desc: "Flujos de trabajo con IA aplicados a ecommerce: automatización de descripciones, chatbots, análisis de competidores y más.",
    color: "cyan",
    glow: "shadow-cyan-500/20",
    border: "border-cyan-500/30",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    tag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    icon: ShoppingCart,
    label: "EXPERIMENTO 06",
    title: "Modelos de Negocio Validados",
    desc: "Análisis profundos de modelos que ya generan dinero: dropshipping avanzado, SaaS verticales, marketplaces de nicho y más.",
    color: "fuchsia",
    glow: "shadow-fuchsia-500/20",
    border: "border-fuchsia-500/30",
    iconBg: "bg-fuchsia-500/10",
    iconColor: "text-fuchsia-400",
    tag: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
  },
];

const differences = [
  { label: "Método Tradicional", items: ["Teoría sin práctica real", "Conocimiento generalista", "Poca interacción y soporte", "Aprendizaje pasivo", "Empiezas desde cero cada vez"] },
  { label: "El Método NP3", items: ["Proyectos reales replicables", "Experimentación comprobada", "Comunidad activa y networking", "Herramientas listas para usar", "Acompañamiento en el escalamiento"] },
];

const faqs = [
  {
    q: "¿Cuándo abre el Laboratorio?",
    a: "Estamos en fase de construcción. Los primeros en la lista de espera tendrán acceso prioritario y un precio especial de lanzamiento. Al registrarte te avisamos antes que nadie.",
  },
  {
    q: "¿Qué tan técnico debo ser para aprovechar el contenido?",
    a: "No necesitas ser desarrollador. Los proyectos y prompts están diseñados para emprendedores que quieren resultados rápidos, con guías paso a paso. Si sabes usar un computador, puedes aprovechar el 100%.",
  },
  {
    q: "¿Qué diferencia hay con los cursos comunes?",
    a: "No es un curso estático. Es un laboratorio activo: cada mes hay contenido nuevo, experimentos frescos y proyectos actualizados. Nunca quedas viendo contenido de hace 2 años.",
  },
  {
    q: "¿Con qué frecuencia se publica contenido nuevo?",
    a: "Al menos 1 proyecto escalable completo por mes, más prompts y recursos adicionales de forma continua. La idea es que always tengas algo nuevo que implementar.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. La suscripción es sin compromisos a largo plazo. Cancelas en cualquier momento desde tu cuenta.",
  },
];

// ─── WAITLIST FORM ────────────────────────────────────────────────────────────

function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("loading");
    const formData = new FormData(formRef.current);
    const result = await joinLaboratorioWaitlist(formData);
    if (result.success) {
      setStatus("success");
      setMessage(result.message || "¡Registro exitoso!");
    } else {
      setStatus("error");
      setMessage(result.error || "Algo salió mal.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-8 text-center"
      >
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-cyan-400" />
          </div>
        </div>
        <h3 className="text-2xl font-black text-white">¡Estás dentro del laboratorio! 🧪</h3>
        <p className="text-zinc-400 max-w-sm leading-relaxed">{message}</p>
        <div className="flex gap-3 mt-2 flex-wrap justify-center">
          <Link href="/guias" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
            Explora las Guías Gratuitas <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
            Lee el Blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Nombre completo *</label>
          <input
            name="name"
            type="text"
            placeholder="Tu nombre"
            required
            disabled={status === "loading"}
            className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-700 focus:border-cyan-500 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Email *</label>
          <input
            name="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            required
            disabled={status === "loading"}
            className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-700 focus:border-cyan-500 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
          />
        </div>
      </div>

      {!compact && (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">¿Qué tipo de negocio tienes?</label>
              <select
                name="business_type"
                disabled={status === "loading"}
                className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-700 focus:border-cyan-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
              >
                <option value="">Selecciona una opción</option>
                <option value="ecommerce">Tienda Ecommerce</option>
                <option value="agencia">Agencia Digital</option>
                <option value="freelance">Freelance / Consultor</option>
                <option value="saas">SaaS / Producto Digital</option>
                <option value="emprendedor">Emprendedor sin negocio aún</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Facturación mensual actual</label>
              <select
                name="monthly_revenue"
                disabled={status === "loading"}
                className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-700 focus:border-cyan-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
              >
                <option value="">Selecciona un rango</option>
                <option value="starting">Apenas empezando</option>
                <option value="0-5k">$0 - $5,000 USD</option>
                <option value="5k-20k">$5,000 - $20,000 USD</option>
                <option value="20k-100k">$20,000 - $100,000 USD</option>
                <option value="100k+">+$100,000 USD</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">¿Qué quieres aprender o escalar? <span className="text-zinc-600 normal-case font-normal">(opcional)</span></label>
            <textarea
              name="message"
              rows={3}
              placeholder="Cuéntame tu situación actual y qué esperas del Laboratorio..."
              disabled={status === "loading"}
              className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-700 focus:border-cyan-500 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm resize-none"
            />
          </div>
        </>
      )}

      {status === "error" && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 font-black text-base rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        style={{
          background: "linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)",
          boxShadow: "0 0 30px rgba(6,182,212,0.3), 0 0 60px rgba(236,72,153,0.15)",
        }}
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <FlaskConical className="w-5 h-5" />
            Quiero acceso al Laboratorio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
      <p className="text-xs text-zinc-600 text-center">
        100% gratuito registrarse · Sin spam · Cancelación en cualquier momento
      </p>
    </form>
  );
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl transition-all duration-300 ${open ? "border-cyan-500/30 bg-cyan-950/20" : "border-zinc-800 bg-zinc-900/40"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={`font-bold text-base transition-colors ${open ? "text-cyan-300" : "text-white"}`}>{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-zinc-400 leading-relaxed text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── NEON TEXT ────────────────────────────────────────────────────────────────

function NeonText({ children, color = "cyan" }: { children: React.ReactNode; color?: "cyan" | "fuchsia" }) {
  return (
    <span
      className={color === "cyan" ? "text-cyan-400" : "text-fuchsia-400"}
      style={{ textShadow: color === "cyan" ? "0 0 10px rgba(34,211,238,0.4)" : "0 0 10px rgba(232,121,249,0.4)" }}
    >
      {children}
    </span>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export function LaboratorioPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-[#030303] overflow-x-hidden">
      {/* ── CIRCUIT GRID BACKGROUND ──────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[400px] bg-fuchsia-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-cyan-500/4 blur-[80px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* ╔══════════════════════════════════════════════════════════════╗
            ║  HERO                                                         ║
            ╚══════════════════════════════════════════════════════════════╝ */}
        <section className="pt-28 pb-24 px-6">
          <div className="container mx-auto max-w-5xl text-center">

            {/* Logo badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border"
                style={{
                  background: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(236,72,153,0.1))",
                  borderColor: "rgba(6,182,212,0.3)",
                  boxShadow: "0 0 20px rgba(6,182,212,0.15), inset 0 0 20px rgba(236,72,153,0.05)",
                }}
              >
                <FlaskConical className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-black uppercase tracking-widest text-cyan-300">Próximamente · Acceso Limitado</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6"
            >
              <span className="block text-white">LABORATORIO</span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 15px rgba(6,182,212,0.3))",
                }}
              >
                ECOM
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-zinc-400 leading-relaxed mb-4 max-w-3xl mx-auto"
            >
              Únete a una comunidad diseñada para construir juntos. En este{" "}
              <NeonText color="cyan">laboratorio activo</NeonText>{" "}
              experimentaremos juntos aplicando el método NP3 para crear y escalar proyectos desde cero, con acceso a modelos replicables y prompts profesionales.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base text-zinc-600 mb-10"
            >
              Por Juan Arango · Experto en Ecommerce y Escalamiento Digital
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <button
                onClick={scrollToForm}
                className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 font-bold text-base rounded-xl text-black transition-all"
                style={{
                  background: "linear-gradient(135deg, #22d3ee 0%, #a855f7 100%)",
                  boxShadow: "0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(168,85,247,0.15)",
                }}
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FlaskConical className="w-5 h-5" />
                Quiero acceso anticipado
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#que-encontraras"
                className="inline-flex items-center gap-2 px-6 py-4 font-semibold text-sm rounded-xl border border-zinc-700 text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
              >
                <Play className="w-4 h-4" />
                Ver qué incluye
              </a>
            </motion.div>


          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════════╗
            ║  THE METHOD                                                    ║
            ╚══════════════════════════════════════════════════════════════╝ */}
        <section className="py-20 px-6 border-y border-zinc-900">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400 mb-4 block">Experimentemos Juntos</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                  Construye tú mismo<br />
                  <NeonText color="fuchsia">con el Método NP3.</NeonText>
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-4">
                  El verdadero aprendizaje empieza cuando experimentas en la práctica. Hemos creado una comunidad activa enfocada en la creación, donde tú mismo implementas sistemas modulares para escalar tus operaciones.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  Con el método <strong className="text-white">NP3</strong> (Nicho, Prompts, Planes y Productos), te acompañamos en la construcción estructural de tus propios activos digitales escalables desde cero, acortando la curva de prueba y error.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "Construcción estructural de funnels",
                  "Arquitectura de sistemas optimizados",
                  "Experimentación con nuevas herramientas IA",
                  "Comunidad activa y networking",
                  "Tú mismo construyes tus sistemas",
                ].map((p) => (
                  <div key={p} className="flex items-start gap-3 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/10">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold mt-0.5">✓</span>
                    <span className="text-zinc-300 text-sm">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════════╗
            ║  WHAT YOU GET                                                  ║
            ╚══════════════════════════════════════════════════════════════╝ */}
        <section id="que-encontraras" className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 block">Lo que encontraremos en el proceso</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Seis líneas de experimentación
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Cada experimento es una oportunidad de crecimiento, diseñada para implementar de forma inmediata.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pillars.map((p) => (
                <motion.div
                  key={p.title}
                  whileHover={{ y: -4 }}
                  className={`relative rounded-2xl border ${p.border} bg-zinc-950/60 p-6 overflow-hidden group transition-all duration-300 hover:${p.glow} hover:shadow-lg`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl rounded-full ${p.iconBg} opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${p.tag} mb-4`}>
                    <Sparkles className="w-2.5 h-2.5" />
                    {p.label}
                  </span>
                  <div className={`w-12 h-12 rounded-xl ${p.iconBg} border ${p.border} flex items-center justify-center mb-4`}>
                    <p.icon className={`w-6 h-6 ${p.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════════╗
            ║  VS COMPARISON                                                 ║
            ╚══════════════════════════════════════════════════════════════╝ */}
        <section className="py-20 px-6 bg-zinc-950/50 border-y border-zinc-900">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                El entorno que mereces.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {differences.map((col, i) => (
                <div
                  key={col.label}
                  className={`rounded-2xl border p-6 ${
                    i === 0
                      ? "border-zinc-800 bg-zinc-900/40"
                      : "border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-fuchsia-950/20"
                  }`}
                  style={i === 1 ? { boxShadow: "0 0 40px rgba(6,182,212,0.1)" } : {}}
                >
                  <h3 className={`font-bold text-base mb-5 ${i === 0 ? "text-zinc-500" : "text-cyan-300"}`}>
                    {i === 1 && "✦ "}
                    {col.label}
                  </h3>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                          i === 0
                            ? "bg-zinc-800 text-zinc-400"
                            : "bg-cyan-500/15 text-cyan-400"
                        }`}>
                          {i === 0 ? "•" : "✓"}
                        </span>
                        <span className={`text-sm ${i === 0 ? "text-zinc-500" : "text-zinc-300"}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════════╗
            ║  AUTHORITY / JUAN                                              ║
            ╚══════════════════════════════════════════════════════════════╝ */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-fuchsia-500/5 blur-3xl rounded-full pointer-events-none" />

              <div className="relative grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Juan Arango</h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Experto en Ecommerce y Escalamiento Digital con más de 15 años experimentando y construyendo sistemas para empresas en Colombia y LATAM.
                  </p>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    A través del tiempo, he comprobado que la mejor manera de escalar es experimentando tú mismo. El Laboratorio es el ecosistema donde comparto resultados, metodologías en tiempo real y aprendemos mutuamente estructurando procesos escalables.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { val: "15+", lab: "años de experiencia" },
                      { val: "50+", lab: "sistemas construidos" },
                      { val: "2,400+", lab: "comunidad activa" },
                    ].map((s) => (
                      <div key={s.lab} className="text-center">
                        <p className="text-2xl font-bold text-cyan-400">{s.val}</p>
                        <p className="text-[11px] text-zinc-600 leading-tight mt-0.5">{s.lab}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-52 h-52">
                    <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, #22d3ee, #a855f7, #ec4899, #22d3ee)", padding: "2px" }}>
                      <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                        <div className="text-center">
                          <FlaskConical className="w-16 h-16 mx-auto mb-2 text-cyan-400" style={{ filter: "drop-shadow(0 0 15px rgba(34,211,238,0.5))" }} />
                          <p className="text-xs font-black text-white tracking-widest uppercase">Lab Director</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -inset-4 rounded-full bg-cyan-500/5 blur-xl animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════════╗
            ║  WAITLIST FORM                                                 ║
            ╚══════════════════════════════════════════════════════════════╝ */}
        <section id="registro" className="py-24 px-6">
          <div className="container mx-auto max-w-2xl" ref={formRef}>
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
                style={{
                  background: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(236,72,153,0.1))",
                  border: "1px solid rgba(6,182,212,0.25)",
                  color: "#22d3ee",
                  boxShadow: "0 0 20px rgba(6,182,212,0.1)",
                }}
              >
                <Sparkles className="w-4 h-4" />
                Lista de espera · Acceso prioritario
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Forma parte de la
                <br />
                <NeonText color="cyan">comunidad</NeonText>
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                Trabajaremos juntos, paso a paso, aplicando nuevas soluciones en nuestro entorno colaborativo.
              </p>
            </div>

            {/* Form container */}
            <div
              className="relative rounded-3xl border overflow-hidden p-8 md:p-10"
              style={{
                background: "linear-gradient(135deg, rgba(6,182,212,0.04) 0%, rgba(3,3,3,0.95) 50%, rgba(236,72,153,0.04) 100%)",
                borderColor: "rgba(6,182,212,0.2)",
                boxShadow: "0 0 30px rgba(6,182,212,0.05), 0 0 50px rgba(236,72,153,0.03)",
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              <WaitlistForm />
            </div>

            {/* Urgency nudges */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: "🔒", text: "Datos 100%\nseguros" },
                { icon: "⚡", text: "Acceso\nprioritario" },
                { icon: "🎯", text: "Precio especial\nde lanzamiento" },
              ].map((n) => (
                <div key={n.text} className="text-xs text-zinc-600 leading-tight whitespace-pre-line">
                  <span className="block text-lg mb-1">{n.icon}</span>
                  {n.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════════╗
            ║  FAQ                                                           ║
            ╚══════════════════════════════════════════════════════════════╝ */}
        <section className="py-20 px-6 border-t border-zinc-900">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Preguntas frecuentes
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════════╗
            ║  FINAL CTA                                                     ║
            ╚══════════════════════════════════════════════════════════════╝ */}
        <section className="py-24 px-6 border-t border-zinc-900">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Construyamos algo<br />
              <NeonText color="fuchsia">juntos hoy</NeonText>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
              Súmate a la creación de proyectos y empieza a dominar la experimentación continua para estructurar y escalar mejor las ideas con el Laboratorio.
            </p>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 px-10 py-5 font-bold text-lg rounded-2xl text-black transition-all"
              style={{
                background: "linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)",
                boxShadow: "0 0 30px rgba(6,182,212,0.2), 0 0 50px rgba(168,85,247,0.1)",
              }}
            >
              <FlaskConical className="w-6 h-6" />
              Registrarme ahora
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-zinc-700 text-sm mt-6">
              ¿Tienes preguntas?{" "}
              <Link href="/blog" className="text-zinc-600 hover:text-cyan-400 transition-colors underline underline-offset-2">
                Lee el blog
              </Link>
              {" · "}
              <Link href="/newsletter" className="text-zinc-600 hover:text-fuchsia-400 transition-colors underline underline-offset-2">
                Únete a la newsletter
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
