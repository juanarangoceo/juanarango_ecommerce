"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Mail, Zap, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/subscribe-newsletter";

const STORAGE_KEY_SUBSCRIBED = "nl_subscribed";
const STORAGE_KEY_DISMISSED = "nl_dismissed_at";
const DISMISS_COOLDOWN_DAYS = 7;
const SHOW_DELAY_MS = 15000; // 15 seconds

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Decide whether to show the popup
  useEffect(() => {
    try {
      // Never show if already subscribed
      if (localStorage.getItem(STORAGE_KEY_SUBSCRIBED) === "true") return;

      // Check cooldown after dismissal
      const dismissedAt = localStorage.getItem(STORAGE_KEY_DISMISSED);
      if (dismissedAt) {
        const daysSince = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);
        if (daysSince < DISMISS_COOLDOWN_DAYS) return;
      }
    } catch {
      // localStorage may be unavailable in some environments — fail silently
      return;
    }

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY_DISMISSED, String(Date.now()));
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    const fd = new FormData();
    fd.append("email", email);

    const result = await subscribeToNewsletter(fd);

    if (result.success) {
      setStatus("success");
      setMessage(result.message || "¡Suscripción exitosa!");
      try {
        localStorage.setItem(STORAGE_KEY_SUBSCRIBED, "true");
        localStorage.removeItem(STORAGE_KEY_DISMISSED);
      } catch {
        // ignore
      }
      // Auto-close after 3s on success
      setTimeout(() => setVisible(false), 3000);
    } else {
      setStatus("error");
      setMessage(result.error || "Algo salió mal. Inténtalo de nuevo.");
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity animate-in fade-in duration-300"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Popup */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Suscribirte al newsletter"
        className="fixed bottom-0 left-0 right-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[9999] w-full sm:max-w-md sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300"
      >
        {/* Gradient top border */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500" />

        <div className="bg-zinc-950 border border-zinc-800/80 sm:rounded-b-2xl px-6 py-8 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Removed top-right X button for a more explicit text button at the bottom */}

          {status === "success" ? (
            /* ── SUCCESS STATE ── */
            <div className="flex flex-col items-center text-center gap-4 py-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">¡Ya estás dentro!</p>
                <p className="text-zinc-400 text-sm mt-1">{message}</p>
              </div>
            </div>
          ) : (
            /* ── DEFAULT / FORM STATE ── */
            <div className="relative z-10">
              {/* Icon */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium uppercase tracking-wider mb-5">
                <Zap className="w-3 h-3" />
                <span>Newsletter Semanal</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                La IA cambia cada semana.
                <br />
                <span className="text-emerald-400">Tú no te puedes quedar atrás.</span>
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Recibe cada viernes los mejores prompts, las herramientas que valen la pena y lo que nadie más te está contando sobre IA para negocios.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none" />
                  <input
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm disabled:opacity-50"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs">{message}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !email}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Quiero estar al tanto
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <button
                onClick={dismiss}
                type="button"
                className="w-full mt-3 text-zinc-400 hover:text-white text-sm font-medium py-2 rounded-lg transition-colors hover:bg-zinc-800"
              >
                No gracias, quiero seguir leyendo
              </button>

              <p className="text-zinc-600 text-xs text-center mt-3">
                Sin spam. Date de baja cuando quieras.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
