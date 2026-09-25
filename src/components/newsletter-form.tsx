"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/subscribe-newsletter";
import { readAttribution } from "@/lib/crm/client-attribution";

type NewsletterFormProps = {
  variant?: "card" | "inline";
};

export function NewsletterForm({ variant = "card" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inline = variant === "inline";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("attribution", readAttribution("newsletter_form"));
    const result = await subscribeToNewsletter(formData);

    if (result.success) {
      setStatus("success");
      setMessage(result.message || "Tu suscripción quedó confirmada.");
      setEmail("");
      return;
    }

    setStatus("error");
    setMessage(result.error || "No pudimos completar la suscripción.");
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-4 rounded-2xl border border-primary/25 bg-primary/7 ${inline ? "p-5" : "p-7"}`} role="status">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-[#111311]"><CheckCircle2 className="size-5" /></span>
        <div><p className="font-semibold text-white">Ya estás dentro.</p><p className="mt-1 text-sm leading-6 text-white/55">{message}</p></div>
      </div>
    );
  }

  return (
    <div className={inline ? "w-full" : "relative w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d110e] p-6 sm:p-8"}>
      {!inline ? (
        <div className="mb-7">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/9 text-primary"><Mail className="size-5" /></span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">Ideas para decidir mejor.</h2>
          <p className="mt-3 text-sm leading-6 text-white/55">Ecommerce, automatización e IA aplicada, sin llenar tu correo de ruido.</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor={`newsletter-email-${variant}`}>Correo electrónico</label>
          <input id={`newsletter-email-${variant}`} type="email" inputMode="email" autoComplete="email" placeholder="tu@correo.com" value={email} onChange={(event) => setEmail(event.target.value)} disabled={status === "loading"} required className="h-13 min-w-0 flex-1 rounded-full border border-white/14 bg-black/25 px-5 text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary focus:ring-2 focus:ring-primary/20" />
          <button type="submit" disabled={status === "loading" || !email} className="group inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-[#111311] transition-[background-color,transform] hover:bg-[#c8ff5a] active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50">
            {status === "loading" ? <><Loader2 className="size-4 animate-spin" /> Suscribiendo</> : <>Quiero recibirlo <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></>}
          </button>
        </div>
        {status === "error" ? <p className="mt-3 text-sm text-red-400" role="alert">{message}</p> : null}
        <p className={`text-xs leading-5 text-white/35 ${inline ? "mt-4" : "mt-5 text-center"}`}>Al suscribirte aceptas la <Link href="/legal/privacidad" className="text-white/60 underline decoration-primary/45 underline-offset-2 transition-colors hover:text-primary">Política de Privacidad</Link>. Puedes salir cuando quieras.</p>
      </form>
    </div>
  );
}
