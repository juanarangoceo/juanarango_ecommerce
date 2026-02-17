"use client";

import { useState } from "react";
import { Loader2, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/subscribe-newsletter";
import { TermsModal } from "@/components/terms-modal";
import { motion, AnimatePresence } from "framer-motion";

export function NewsletterForm() {
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
    <div className="w-full mx-auto p-1 relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 shadow-2xl">
      <div className="absolute inset-0 opacity-20"></div>
      
      <div className="relative bg-zinc-950 rounded-[14px] px-6 py-8 flex flex-col items-center gap-6 overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Text Content */}
        <div className="w-full space-y-3 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium uppercase tracking-wider backdrop-blur-sm">
            <Mail className="w-3 h-3" />
            <span>Newsletter</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Mantente a la <span className="text-emerald-400">vanguardia</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Recibe estrategias de ecommerce, tendencias tecnológicas y recursos exclusivos directamente en tu bandeja de entrada.
          </p>
        </div>

        {/* Form */}
        <div className="w-full z-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center space-y-3"
              >
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">¡Gracias por suscribirte!</h3>
                <p className="text-zinc-400 text-sm">
                  {message}
                </p>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full pl-4 pr-12 py-3.5 bg-zinc-900/80 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-light text-base"
                    required
                  />
                  <div className="absolute right-2 top-2 bottom-2">
                    <button
                      type="submit"
                      disabled={status === "loading" || !email}
                      className="h-full aspect-square flex items-center justify-center bg-white text-black rounded-md hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm">{message}</p>
                )}

                <div className="text-xs text-zinc-500 text-center">
                  Al suscribirte, aceptas nuestros{" "}
                  <TermsModal>
                    <button type="button" className="text-zinc-400 hover:text-emerald-400 underline underline-offset-2 transition-colors">
                      Términos y Condiciones
                    </button>
                  </TermsModal>
                  .
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
