"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Zap,
  ArrowRight,
  CheckCircle2,
  Loader2,
  TrendingUp,
  BookOpen,
  Shield,
  Users,
  Star,
  Sparkles,
  Bell,
  Clock,
} from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/subscribe-newsletter";
import { TermsModal } from "@/components/terms-modal";
import { motion, AnimatePresence } from "framer-motion";

// ─── Social Proof Data ───────────────────────────────────────────────────────
const benefits = [
  {
    icon: TrendingUp,
    title: "Estrategias de Ecommerce",
    desc: "Tácticas probadas para escalar ventas, mejorar conversión y construir operaciones sólidas.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Zap,
    title: "Herramientas de IA Curadas",
    desc: "Las mejores apps y automatizaciones que uso para ahorrar cientos de horas cada mes.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: BookOpen,
    title: "Guías y Recursos Exclusivos",
    desc: "Acceso anticipado a guías como Shopify 2024, MCP, Claude Code y más antes de publicarse.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Shield,
    title: "Sin Spam. Jamás.",
    desc: "Solo envío cuando tengo algo que realmente vale tu tiempo. Puedes darte de baja en 1 clic.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
];

const included = [
  "Análisis de tendencias de IA aplicadas al negocio",
  "Casos reales con números de clientes escalando",
  "Prompts probados para marketing y operaciones",
  "Reseñas honestas de herramientas nuevas",
  "Alertas tempranas de cambios en algoritmos",
  "Acceso anticipado a guías y recursos gratuitos",
];

const testimonials = [
  {
    quote: "Llevo 3 meses leyendo la newsletter y ya implementé 2 automatizaciones que me ahorraron 15 horas semanales.",
    name: "Carlos M.",
    role: "Fundador, AgenciaCom",
  },
  {
    quote: "Lo que Juan comparte por email no lo encuentras en ningún blog. Es el insight del que opera, no del que teoriza.",
    name: "Valentina R.",
    role: "Directora de Ecommerce",
  },
  {
    quote: "Cada correo tiene algo accionable. No es contenido de relleno. Vale oro.",
    name: "Andrés P.",
    role: "Emprendedor Digital",
  },
];

// ─── Newsletter Form ──────────────────────────────────────────────────────────
function HeroNewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");
    const formData = new FormData();
    formData.append("email", email);
    const result = await subscribeToNewsletter(formData);
    if (result.success) {
      setStatus("success");
      setMessage(result.message || "¡Suscripción exitosa!");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(result.error || "Algo salió mal.");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 py-8"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">¡Ya estás dentro! 🎉</h3>
          <p className="text-zinc-400 text-center max-w-sm">{message}</p>
          <Link
            href="/guias"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Mientras tanto, explora las Guías Gratuitas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              required
              className="w-full pl-11 pr-4 py-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-base"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || !email}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
          >
            {status === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Suscribirme Gratis
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.form>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm mt-2">{message}</p>
      )}
    </AnimatePresence>
  );
}

// ─── Page Component ──────────────────────────────────────────────────────────
export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-[#050505] relative overflow-x-hidden">
      {/* Background aurora */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-violet-900/8 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8">
              <Bell className="w-4 h-4" />
              Newsletter · Gratis · Sin spam
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
              El conocimiento que{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                escala negocios
              </span>{" "}
              directamente en tu inbox
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              Cada semana comparto estrategias de ecommerce, herramientas de IA y recursos exclusivos que uso con clientes reales. Sin teoría. Solo lo que funciona.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-8 mb-10 flex-wrap">
              {[
                { icon: Users, value: "2,400+", label: "Suscriptores" },
                { icon: Star, value: "4.9/5", label: "Valoración promedio" },
                { icon: Clock, value: "Semanal", label: "Frecuencia" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 text-zinc-400">
                  <stat.icon className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white">{stat.value}</span>
                  <span className="text-sm">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Hero Form */}
            <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
              <HeroNewsletterForm />
              <p className="text-xs text-zinc-600 mt-4 text-center">
                Al suscribirte aceptas nuestros{" "}
                <TermsModal>
                  <button className="text-zinc-500 hover:text-emerald-400 underline underline-offset-2 transition-colors">
                    Términos y Condiciones
                  </button>
                </TermsModal>
                . Cancelación en 1 clic, siempre.
              </p>
            </div>
          </div>
        </section>

        {/* ── QUÉ VAS A RECIBIR ────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Qué recibirás exactamente?
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                No es un email más lleno de noticias que ya viste. Es inteligencia curada aplicada a tu negocio.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className={`flex gap-5 p-6 rounded-2xl border bg-zinc-900/50 ${b.bg} hover:bg-zinc-900/80 transition-all duration-300`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${b.bg} border`}>
                    <b.icon className={`w-6 h-6 ${b.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">{b.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INCLUIDO EN CADA EDICIÓN ─────────────────────────────────── */}
        <section className="py-20 px-6 bg-zinc-950/50">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  Incluido en cada edición
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Inteligencia que otros guardan para sí mismos
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                  Después de años construyendo sistemas digitales y trabajar con decenas de negocios, sé qué información mueve la aguja. Y la comparto aquí primero.
                </p>
              </div>

              <div className="space-y-3">
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS ──────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Lo que dicen quienes ya la leen
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-zinc-900/60 border border-white/8 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed italic mb-5">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="border-t border-white/8 pt-4">
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-zinc-500 text-xs">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-2xl">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-10 md:p-14 text-center shadow-2xl">
              {/* Glow effects */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-teal-500/8 blur-2xl rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-emerald-400" />
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                  Únete ahora. Es gratis.
                </h2>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  Más de 2,400 fundadores, marketers y emprendedores ya reciben esto en su inbox cada semana.
                </p>

                <HeroNewsletterForm />
              </div>
            </div>

            <p className="text-center text-zinc-600 text-sm mt-6">
              ¿Ya tienes todo bajo control?{" "}
              <Link href="/blog" className="text-zinc-500 hover:text-emerald-400 transition-colors underline underline-offset-2">
                Lee el blog
              </Link>{" "}
              ·{" "}
              <Link href="/guias" className="text-zinc-500 hover:text-emerald-400 transition-colors underline underline-offset-2">
                Explora las guías
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
