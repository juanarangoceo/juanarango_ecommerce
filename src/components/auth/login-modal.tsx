"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Mail, Sparkles, X, CheckCircle } from "lucide-react";

interface LoginModalProps {
  onClose: () => void;
  title?: string;
}

export function LoginModal({
  onClose,
  title = "Accede a los Prompts Premium",
}: LoginModalProps) {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Wait for client mount before creating portal (SSR safety)
  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError(null);

    const { error } = await signInWithEmail(email);
    setLoading(false);

    if (error) {
      setError("No pudimos enviar el link. Intenta de nuevo.");
    } else {
      setSent(true);
    }
  };

  if (!mounted) return null;

  const modal = (
    // Backdrop — rendered at document.body level via portal
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 animate-in zoom-in-95 duration-200">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-1"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center mb-5">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>

          {!sent ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Ingresa tu email y te enviamos un link mágico — sin contraseñas,
                sin complicaciones.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Enviar link mágico
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 text-[11px] text-zinc-600 text-center leading-relaxed">
                Al ingresar aceptas recibir contenido exclusivo sobre IA,
                prompts y herramientas digitales. Sin spam.
              </p>
            </>
          ) : (
            // Success state
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">
                ¡Link enviado! 🎉
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Revisa tu bandeja de entrada en{" "}
                <span className="text-white font-medium">{email}</span>. Haz
                clic en el link y quedarás conectado automáticamente.
              </p>
              <button
                onClick={onClose}
                className="mt-6 text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Portal renders at body level — escapes any parent stacking context (navbar backdrop-blur, etc.)
  return createPortal(modal, document.body);
}
