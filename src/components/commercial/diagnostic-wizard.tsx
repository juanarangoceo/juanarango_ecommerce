"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitDiagnostic } from "@/app/actions/submit-diagnostic";

const questions = [
  { id: "channel", title: "¿Dónde vendes actualmente?", options: ["Tienda online", "WhatsApp y redes", "Tienda física y online", "Todavía estoy estructurando"] },
  { id: "volume", title: "¿Cuántas conversaciones o leads recibes al mes?", options: ["Menos de 50", "Entre 50 y 200", "Entre 200 y 500", "Más de 500"] },
  { id: "bottleneck", title: "¿Dónde ves la mayor oportunidad hoy?", options: ["Atender y vender mejor por WhatsApp", "Convertir mejor el tráfico de campañas", "Ordenar estrategia y operación", "Todavía no lo tengo claro"] },
  { id: "attention", title: "¿Cómo atiendes WhatsApp?", options: ["Manualmente, una persona", "Manualmente, varias personas", "Con respuestas automáticas básicas", "Con una plataforma o bot"] },
  { id: "traffic", title: "¿Tienes campañas o tráfico activo?", options: ["Sí, de forma constante", "Sí, por temporadas", "Solo tráfico orgánico", "Todavía no"] },
  { id: "stage", title: "¿En qué etapa está el negocio?", options: ["Validando la oferta", "Ya vende y quiere ordenar", "Está creciendo y el equipo se satura", "Operación consolidada"] },
] as const;

type Answers = Record<(typeof questions)[number]["id"], string>;

function calculateResult(answers: Partial<Answers>) {
  const bottleneck = answers.bottleneck ?? "";
  const recommendation = bottleneck.includes("WhatsApp") ? "Nitro Complete" : bottleneck.includes("campañas") ? "Nitro Landing" : "NitroCommerce";
  const primaryProblem = bottleneck || "Falta de claridad sobre la prioridad principal";
  const mature = ["Entre 200 y 500", "Más de 500"].includes(answers.volume ?? "") || ["Está creciendo y el equipo se satura", "Operación consolidada"].includes(answers.stage ?? "");
  const maturityLevel = mature ? "Operación con tracción" : answers.stage === "Validando la oferta" ? "Etapa de validación" : "Operación en desarrollo";
  const explanations = {
    "Nitro Complete": "La oportunidad más clara está en la atención, la confirmación y el seguimiento de las ventas por WhatsApp. Conviene revisar volumen, catálogo y capacidad de entrega antes de automatizar.",
    "Nitro Landing": "La oportunidad parece estar entre el tráfico y la acción comercial. Conviene revisar oferta, mensaje, experiencia mobile y medición de campaña.",
    NitroCommerce: "La oportunidad atraviesa varias partes de la operación. Conviene ordenar datos, recorrido, procesos y tecnología antes de elegir una herramienta.",
  } as const;
  return { recommendation, primaryProblem, maturityLevel, explanation: explanations[recommendation] };
}

export function DiagnosticWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [submitted, setSubmitted] = useState<"live" | "preview" | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const result = calculateResult(answers);
  const isQuestion = step < questions.length;
  const progress = Math.min(((step + 1) / (questions.length + 2)) * 100, 100);

  const selectAnswer = (id: (typeof questions)[number]["id"], value: string) => {
    setAnswers((current) => ({ ...current, [id]: value }));
    setStep((current) => current + 1);
  };

  const submit = (formData: FormData) => {
    setError("");
    const attribution = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].map((key) => [key, new URLSearchParams(window.location.search).get(key) ?? ""]));
    attribution.landing_path = window.location.pathname;
    formData.set("answers", JSON.stringify(answers));
    formData.set("attribution", JSON.stringify(attribution));
    formData.set("recommendation", result.recommendation);
    formData.set("primaryProblem", result.primaryProblem);
    formData.set("maturityLevel", result.maturityLevel);
    formData.set("consent", formData.get("consent") === "on" ? "true" : "false");
    startTransition(async () => {
      const response = await submitDiagnostic(formData);
      if (response.error) setError(response.error);
      else setSubmitted(response.preview ? "preview" : "live");
    });
  };

  if (submitted) return <div className="rounded-[2rem] border border-primary/25 bg-primary/6 p-8 text-center sm:p-12"><span className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-[#111311]"><Check className="size-8" /></span><h2 className="mt-7 text-3xl font-bold text-white">Diagnóstico completado</h2><p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/55">{submitted === "preview" ? "Modo de prueba local: el recorrido funciona, pero en este entorno no se guardan datos ni se envían avisos." : "Recibimos tus respuestas. Juan revisará personalmente el contexto antes de contactarte."}</p><Button asChild variant="outline" className="mt-8 rounded-full border-white/15 bg-transparent text-white hover:bg-white/7 hover:text-white"><Link href="/soluciones">Explorar soluciones</Link></Button></div>;

  return <div className="rounded-[2rem] border border-white/9 bg-[#0d110e] p-5 sm:p-8 lg:p-10">
    <div className="flex items-center justify-between gap-4"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Diagnóstico comercial</p><p className="font-mono text-[10px] text-white/35">{isQuestion ? `${step + 1} / ${questions.length}` : step === questions.length ? "Resultado" : "Contacto"}</p></div>
    <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/8" role="progressbar" aria-label="Progreso del diagnóstico" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${progress}%` }} /></div>

    {isQuestion ? <fieldset className="mt-10"><legend className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">{questions[step].title}</legend><div className="mt-8 grid gap-3 sm:grid-cols-2">{questions[step].options.map((option) => <button key={option} type="button" onClick={() => selectAnswer(questions[step].id, option)} className="min-h-16 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left text-sm font-medium text-white/72 transition-colors hover:border-primary/40 hover:bg-primary/6 hover:text-white focus-visible:ring-2 focus-visible:ring-primary">{option}</button>)}</div></fieldset> : null}

    {step === questions.length ? <div className="mt-10 min-w-0"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Lectura inicial · {result.maturityLevel}</p><h2 className="mt-4 text-3xl font-bold text-white [overflow-wrap:anywhere] sm:text-4xl">La ruta que mejor encaja: {result.recommendation}</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/55">{result.explanation}</p><p className="mt-6 rounded-2xl border border-white/8 p-5 text-sm text-white/45">Esto no es una estimación financiera ni reemplaza una revisión de tus datos. Es una orientación basada únicamente en tus respuestas.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row">{result.recommendation === "Nitro Complete" ? <Button asChild size="lg" className="h-12 rounded-full px-7"><Link href="/nitrobot/conectar">Comprobar compatibilidad <ArrowRight /></Link></Button> : null}<Button type="button" size="lg" variant={result.recommendation === "Nitro Complete" ? "outline" : "default"} onClick={() => setStep(questions.length + 1)} className={result.recommendation === "Nitro Complete" ? "h-12 rounded-full border-white/15 bg-transparent px-7 text-white hover:bg-white/7 hover:text-white" : "h-12 rounded-full px-7"}>Recibir revisión de Juan <ArrowRight /></Button></div></div> : null}

    {step === questions.length + 1 ? <form action={submit} className="mt-10"><h2 className="text-3xl font-bold text-white sm:text-4xl">¿Dónde te envío la revisión?</h2><p className="mt-3 text-sm text-white/45">Nombre, email y WhatsApp son necesarios para responder tu diagnóstico.</p><div className="mt-8 grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm text-white/65">Nombre<input required name="name" autoComplete="name" maxLength={100} className="h-12 rounded-xl border border-white/12 bg-black/25 px-4 text-white outline-none focus:border-primary" /></label><label className="grid gap-2 text-sm text-white/65">Empresa<input name="company" autoComplete="organization" maxLength={140} className="h-12 rounded-xl border border-white/12 bg-black/25 px-4 text-white outline-none focus:border-primary" /></label><label className="grid gap-2 text-sm text-white/65">Email<input required type="email" name="email" autoComplete="email" maxLength={180} className="h-12 rounded-xl border border-white/12 bg-black/25 px-4 text-white outline-none focus:border-primary" /></label><label className="grid gap-2 text-sm text-white/65">WhatsApp<input required name="phone" inputMode="tel" autoComplete="tel" maxLength={40} className="h-12 rounded-xl border border-white/12 bg-black/25 px-4 text-white outline-none focus:border-primary" /></label></div><label className="mt-6 flex items-start gap-3 text-xs leading-5 text-white/45"><input required type="checkbox" name="consent" className="mt-1 size-4 accent-[var(--verde-nitro)]" /><span>Acepto que Juan Arango / NITRO ECOM use estos datos para revisar mi diagnóstico y contactarme. He leído la <Link href="/legal/privacidad" className="text-primary underline underline-offset-2">Política de Privacidad</Link>.</span></label>{error ? <p className="mt-5 text-sm text-red-400" role="alert">{error}</p> : null}<Button type="submit" size="lg" disabled={isPending} className="mt-8 h-12 rounded-full px-7">{isPending ? <><Loader2 className="animate-spin" /> Procesando</> : <>Enviar diagnóstico <ArrowRight /></>}</Button></form> : null}

    {step > 0 && step <= questions.length + 1 ? <button type="button" onClick={() => setStep((current) => current - 1)} className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm text-white/40 hover:text-white"><ArrowLeft className="size-4" />Volver</button> : null}
  </div>;
}
