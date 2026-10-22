"use client";

import Link from "next/link";
import { useId, useRef, useState, useTransition } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { submitEnterpriseLead } from "@/app/actions/submit-enterprise-lead";
import { readSalesCampaign } from "@/components/commercial/sales-campaign-context";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";

export function EnterpriseContact() {
  const id = useId();
  const requestId = useRef("");
  const startedAt = useRef(Date.now());
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const field = "mt-2 min-h-12 w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-base text-ink outline-none focus-visible:ring-2 focus-visible:ring-ink";
  return (
    <section id="empresas" className="scroll-mt-24 bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="diagnostic">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div>
          <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">¿Tu empresa necesita <span className="text-nitro-text">mayor capacidad?</span></h2>
          <p className="mt-6 text-lg leading-8 text-ink/75">Si manejas un volumen alto de conversaciones o necesitas conexiones especiales, cuéntanos cómo opera tu empresa. <strong className="font-semibold text-ink">Juan revisará tu caso y te contactará para definir el alcance.</strong></p>
          <p className="mt-6 border-t border-ink/15 pt-6 text-base leading-7 text-ink/70">Puedes empezar con activación y recargas. Este contacto es para revisar los requerimientos que tu operación necesita resolver por separado.</p>
        </div>
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 sm:p-8">
          {sent ? <div role="status" className="py-8"><Check className="size-9 text-nitro-text" aria-hidden="true" /><h3 className="mt-5 text-2xl font-semibold">Recibimos tu solicitud.</h3><p className="mt-3 text-base leading-7 text-ink/75">Juan revisará lo que nos cuentas y te contactará en el WhatsApp que dejaste.</p></div> : <form onChange={() => { requestId.current = ""; }} onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            requestId.current ||= crypto.randomUUID();
            form.set("idempotencyKey", requestId.current);
            form.set("startedAt", String(startedAt.current));
            form.set("attribution", JSON.stringify(Object.fromEntries(readSalesCampaign())));
            setError("");
            startTransition(async () => {
              try {
                const result = await submitEnterpriseLead(form);
                if (result.ok) setSent(true);
                else setError(result.error ?? "No pudimos enviar la solicitud.");
              } catch { setError("No pudimos confirmar el envío. Intenta nuevamente; tus datos siguen aquí."); }
            });
          }}>
            <h3 className="text-xl font-semibold">Cuéntanos qué necesitas</h3>
            <fieldset disabled={pending} className="mt-6 space-y-5 disabled:opacity-65">
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label htmlFor={`${id}-name`} className="text-sm font-semibold">Tu nombre</label><input id={`${id}-name`} name="name" autoComplete="name" required minLength={2} maxLength={100} className={field} /></div>
                <div><label htmlFor={`${id}-company`} className="text-sm font-semibold">Empresa</label><input id={`${id}-company`} name="company" autoComplete="organization" required minLength={2} maxLength={140} className={field} /></div>
              </div>
              <div><label htmlFor={`${id}-phone`} className="text-sm font-semibold">WhatsApp de contacto</label><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="Ej. +57 300 123 4567" required maxLength={40} className={field} /><p className="mt-1.5 text-sm leading-6 text-ink/65">Incluye el indicativo si tu número es de otro país.</p></div>
              <div><label htmlFor={`${id}-volume`} className="text-sm font-semibold">Conversaciones aproximadas al día</label><select id={`${id}-volume`} name="volume" required defaultValue="" className={field}><option value="" disabled>Selecciona una referencia</option><option value="under_50">Menos de 50</option><option value="50_150">Entre 50 y 150</option><option value="over_150">Más de 150</option><option value="unknown">Necesito ayuda para estimarlo</option></select></div>
              <div><label htmlFor={`${id}-need`} className="text-sm font-semibold">¿Qué necesita resolver tu empresa?</label><textarea id={`${id}-need`} name="need" required minLength={10} maxLength={1000} rows={4} placeholder="Qué vendes, cómo atiendes hoy o qué conexión necesitas…" className={`${field} resize-y`} /></div>
              <div className="hidden" aria-hidden="true"><label htmlFor={`${id}-website`}>Sitio web</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
              <label className="flex items-start gap-3 text-sm leading-6 text-ink/75"><input name="consent" type="checkbox" required className="mt-1 size-4 shrink-0 accent-[#111311]" /><span>Autorizo el tratamiento de mis datos para responder esta solicitud y contactarme por WhatsApp según la <Link href="/nitro-complete/privacidad" className="font-semibold text-ink underline underline-offset-4">Política de Privacidad</Link>.</span></label>
              {error ? <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-800">{error}</p> : null}
              <button type="submit" className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-base font-semibold text-white hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">{pending ? "Enviando solicitud…" : "Solicitar contacto"}<ArrowUpRight className="size-4" aria-hidden="true" /></button>
            </fieldset>
            {error ? <WhatsAppJuanButton context={{ kind: "enterprise" }} placement="enterprise_fallback" variant="dark" className="mt-3 w-full">Continuar por WhatsApp</WhatsAppJuanButton> : null}
          </form>}
        </div>
      </div>
    </section>
  );
}
