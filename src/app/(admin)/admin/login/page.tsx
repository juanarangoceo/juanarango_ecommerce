"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { NitroMark } from "@/components/commercial/nitro-mark";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "No se pudo entrar.");
      // `from` solo se respeta si apunta al propio panel.
      const from = new URLSearchParams(window.location.search).get("from");
      router.replace(from && from.startsWith("/admin/") ? from : "/admin");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-[max(2rem,env(safe-area-inset-top))]">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[#B7FF2A]/[0.07] blur-3xl" />
      <div className="relative w-full max-w-sm">
        <NitroMark className="h-11 w-auto text-[#B7FF2A]" />
        <h1 className="mt-6 text-[2rem] font-semibold leading-tight tracking-[-0.04em]">
          Tu panel de <span className="text-[#B7FF2A]">crecimiento</span>
        </h1>
        <p className="mt-2 text-sm leading-6 text-white/55">Contactos, newsletter y formularios de juanarangoecommerce.com.</p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-white/80">Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              disabled={loading}
              autoFocus
              className="h-12 w-full rounded-xl border border-white/10 bg-[#131613] px-4 text-base text-white outline-none transition focus:border-[#B7FF2A]/60 focus:ring-4 focus:ring-[#B7FF2A]/10"
            />
          </label>
          {error ? (
            <p className="rounded-xl border border-[#FF6A13]/30 bg-[#FF6A13]/10 px-3 py-2 text-sm text-[#FF9A5C]" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading || !password}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#B7FF2A] text-sm font-semibold text-[#111311] transition hover:brightness-105 disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            {loading ? "Verificando…" : "Entrar"}
            {!loading ? <ArrowRight className="size-4" /> : null}
          </button>
        </form>
      </div>
    </main>
  );
}
