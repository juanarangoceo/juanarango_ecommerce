"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Loader2,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { submitNitrobotLead } from "@/app/actions/submit-nitrobot-lead";
import {
  qualificationCopy,
  type NitroBotIntakeResponse,
} from "@/lib/nitrobot-lead";

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
];
const TOTAL_STEPS = 5;

const OPTIONS = {
  businessType: [
    ["productos", "Productos físicos"],
    ["mixto", "Productos y servicios"],
    ["servicios", "Solo servicios"],
    ["otro", "Otro modelo"],
  ],
  platform: [
    ["shopify", "Shopify"],
    ["catalogo_nitro", "Catálogo manual en Nitro"],
    ["woocommerce", "WooCommerce"],
    ["otra", "Otra plataforma"],
    ["sin_catalogo", "Aún no tengo catálogo"],
  ],
  catalogSize: [
    ["1_25", "1 a 25 referencias"],
    ["26_100", "26 a 100"],
    ["101_500", "101 a 500"],
    ["501_plus", "Más de 500"],
    ["sin_catalogo", "Aún no está organizado"],
  ],
  dailyConversations: [
    ["under_20", "Menos de 20"],
    ["20_50", "20 a 50"],
    ["50_150", "50 a 150"],
    ["over_150", "Más de 150"],
    ["unknown", "No lo tengo medido"],
  ],
  monthlyOrders: [
    ["under_30", "Menos de 30"],
    ["30_100", "30 a 100"],
    ["101_300", "101 a 300"],
    ["301_plus", "Más de 300"],
    ["unknown", "No lo tengo medido"],
  ],
  whoAttends: [
    ["owner", "Yo mismo/a"],
    ["one_person", "Una persona"],
    ["team", "Un equipo"],
    ["nobody_fixed", "Nadie fijo; se nos escapan"],
  ],
  primaryPain: [
    ["response_time", "Respondemos tarde"],
    ["quoting", "Cotizar toma demasiado"],
    ["incomplete_data", "Los pedidos llegan incompletos"],
    ["follow_up", "No hacemos seguimiento"],
    ["team_capacity", "El equipo no da abasto"],
    ["other", "Otro"],
  ],
  implementationTiming: [
    ["under_30_days", "Quiero empezar en menos de 30 días"],
    ["one_to_three_months", "En 1 a 3 meses"],
    ["exploring", "Estoy explorando opciones"],
  ],
} as const;

type FormState = {
  businessType: string;
  platform: string;
  catalogSize: string;
  dailyConversations: string;
  monthlyOrders: string;
  whoAttends: string;
  primaryPain: string;
  hasHandoffPerson: string;
  implementationTiming: string;
  catalogReady: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  goal: string;
  consent: boolean;
};

const INITIAL: FormState = {
  businessType: "",
  platform: "",
  catalogSize: "",
  dailyConversations: "",
  monthlyOrders: "",
  whoAttends: "",
  primaryPain: "",
  hasHandoffPerson: "",
  implementationTiming: "",
  catalogReady: "",
  name: "",
  company: "",
  phone: "",
  email: "",
  city: "",
  goal: "",
  consent: false,
};

function ChoiceCards({
  value,
  options,
  onChange,
  columns = 1,
}: {
  value: string;
  options: readonly (readonly [string, string])[];
  onChange: (value: string) => void;
  columns?: 1 | 2;
}) {
  return (
    <div
      className={columns === 2 ? "grid gap-2.5 sm:grid-cols-2" : "grid gap-2.5"}
    >
      {options.map(([id, label]) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={value === id}
          className={`flex min-h-12 items-center rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${value === id ? "border-primary bg-primary/10 text-white shadow-[0_0_24px_rgba(52,211,153,.08)]" : "border-white/10 bg-white/[.035] text-white/78 hover:border-white/25 hover:bg-white/[.06]"}`}
        >
          <span>{label}</span>
          {value === id && (
            <Check
              className="ml-auto h-4 w-4 text-primary"
              aria-hidden="true"
            />
          )}
        </button>
      ))}
    </div>
  );
}

export interface NitroBotFormProps {
  source?: string;
  onStart?: () => void;
  onProgress?: (step: number) => void;
  onSuccess?: () => void;
}

export function NitroBotForm({
  source = "nitrobot_organic",
  onStart,
  onProgress,
  onSuccess,
}: NitroBotFormProps = {}) {
  const pathname = usePathname();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [delivery, setDelivery] = useState<"delivered" | "queued" | null>(null);
  const [result, setResult] = useState<NitroBotIntakeResponse | null>(null);
  const attributionRef = useRef<Record<string, string>>({});
  const idempotencyRef = useRef("");
  const startedAtRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    startedAtRef.current = Date.now();
    idempotencyRef.current =
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-0000-4000-8000-${Math.random().toString(16).slice(2, 14).padEnd(12, "0")}`;
    const params = new URLSearchParams(window.location.search);
    attributionRef.current = Object.fromEntries(
      ATTRIBUTION_KEYS.flatMap((key) =>
        params.get(key) ? [[key, params.get(key)!]] : [],
      ),
    );
    if (document.referrer)
      attributionRef.current.referrer = document.referrer.slice(0, 300);
  }, []);

  function change(name: keyof FormState, value: string | boolean) {
    setError("");
    setForm((current) => ({ ...current, [name]: value }));
    if (!startedRef.current) {
      startedRef.current = true;
      onStart?.();
    }
  }

  function next() {
    const target = Math.min(TOTAL_STEPS - 1, step + 1);
    setStep(target);
    setError("");
    onProgress?.(target + 1);
  }

  async function submit() {
    setLoading(true);
    setError("");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      data.set(key, String(value)),
    );
    data.set("source", source);
    data.set("landingPath", pathname);
    data.set("attribution", JSON.stringify(attributionRef.current));
    data.set("idempotencyKey", idempotencyRef.current);
    data.set("startedAt", String(startedAtRef.current));
    data.set("website", "");
    const response = await submitNitrobotLead(data);
    setLoading(false);
    if (!response.ok) {
      setError(response.error);
      return;
    }
    setDelivery(response.delivery);
    setResult(response.result ?? null);
    setStep(TOTAL_STEPS);
    onSuccess?.();
  }

  const inputClass =
    "min-h-12 w-full rounded-xl border border-white/10 bg-white/[.04] px-4 text-base text-white outline-none transition placeholder:text-zinc-600 focus:border-primary/70 focus:ring-2 focus:ring-primary/10";
  const backButton = (
    <button
      type="button"
      onClick={() => {
        setStep((s) => Math.max(0, s - 1));
        setError("");
      }}
      className="inline-flex min-h-11 items-center gap-2 text-sm text-white/58 hover:text-white"
    >
      <ArrowLeft className="h-4 w-4" />
      Atrás
    </button>
  );
  const nextButton = (disabled: boolean) => (
    <button
      type="button"
      onClick={next}
      disabled={disabled}
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-black transition hover:bg-[#c8ff5a] disabled:cursor-not-allowed disabled:opacity-35"
    >
      Continuar
      <ArrowRight className="h-4 w-4" />
    </button>
  );
  const actions = (disabled: boolean) => (
    <div className="flex items-center justify-between gap-4 pt-2">
      {backButton}
      {nextButton(disabled)}
    </div>
  );

  const steps = [
    <section key="business" className="space-y-6">
      <header>
        <p className="mb-2 text-xs font-bold uppercase tracking-[.22em] text-primary">
          Tu negocio
        </p>
        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          ¿Qué vendes y dónde vive tu catálogo?
        </h3>
      </header>
      <div className="space-y-5">
        <div>
          <p className="mb-3 text-sm text-white/58">Modelo principal</p>
          <ChoiceCards
            value={form.businessType}
            options={OPTIONS.businessType}
            onChange={(v) => change("businessType", v)}
            columns={2}
          />
        </div>
        <div>
          <p className="mb-3 text-sm text-white/58">Catálogo actual</p>
          <ChoiceCards
            value={form.platform}
            options={OPTIONS.platform}
            onChange={(v) => change("platform", v)}
            columns={2}
          />
        </div>
        <div>
          <p className="mb-3 text-sm text-white/58">Cantidad de referencias</p>
          <ChoiceCards
            value={form.catalogSize}
            options={OPTIONS.catalogSize}
            onChange={(v) => change("catalogSize", v)}
            columns={2}
          />
        </div>
      </div>
      <div className="flex justify-end">
        {nextButton(!form.businessType || !form.platform || !form.catalogSize)}
      </div>
    </section>,
    <section key="demand" className="space-y-6">
      <header>
        <p className="mb-2 text-xs font-bold uppercase tracking-[.22em] text-primary">
          Demanda
        </p>
        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          ¿Qué volumen mueve hoy tu WhatsApp?
        </h3>
        <p className="mt-2 text-sm text-white/58">
          No buscamos el número más grande; buscamos recomendarte un plan
          proporcional.
        </p>
      </header>
      <div>
        <p className="mb-3 text-sm text-white/58">Conversaciones por día</p>
        <ChoiceCards
          value={form.dailyConversations}
          options={OPTIONS.dailyConversations}
          onChange={(v) => change("dailyConversations", v)}
          columns={2}
        />
      </div>
      <div>
        <p className="mb-3 text-sm text-white/58">Pedidos al mes</p>
        <ChoiceCards
          value={form.monthlyOrders}
          options={OPTIONS.monthlyOrders}
          onChange={(v) => change("monthlyOrders", v)}
          columns={2}
        />
      </div>
      {actions(!form.dailyConversations || !form.monthlyOrders)}
    </section>,
    <section key="operation" className="space-y-6">
      <header>
        <p className="mb-2 text-xs font-bold uppercase tracking-[.22em] text-primary">
          Operación
        </p>
        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          ¿Dónde se está frenando la venta?
        </h3>
      </header>
      <div>
        <p className="mb-3 text-sm text-white/58">Quién atiende hoy</p>
        <ChoiceCards
          value={form.whoAttends}
          options={OPTIONS.whoAttends}
          onChange={(v) => change("whoAttends", v)}
          columns={2}
        />
      </div>
      <div>
        <p className="mb-3 text-sm text-white/58">Problema principal</p>
        <ChoiceCards
          value={form.primaryPain}
          options={OPTIONS.primaryPain}
          onChange={(v) => change("primaryPain", v)}
          columns={2}
        />
      </div>
      <div>
        <p className="mb-3 text-sm text-white/58">
          ¿Hay una persona que pueda recibir los casos que el bot escale?
        </p>
        <ChoiceCards
          value={form.hasHandoffPerson}
          options={[
            ["true", "Sí, tenemos responsable"],
            ["false", "Todavía no"],
          ]}
          onChange={(v) => change("hasHandoffPerson", v)}
          columns={2}
        />
      </div>
      {actions(!form.whoAttends || !form.primaryPain || !form.hasHandoffPerson)}
    </section>,
    <section key="readiness" className="space-y-6">
      <header>
        <p className="mb-2 text-xs font-bold uppercase tracking-[.22em] text-primary">
          Preparación
        </p>
        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          ¿Cuándo quieres ponerlo a vender?
        </h3>
      </header>
      <ChoiceCards
        value={form.implementationTiming}
        options={OPTIONS.implementationTiming}
        onChange={(v) => change("implementationTiming", v)}
      />
      <div>
        <p className="mb-3 text-sm text-white/58">
          ¿Tu catálogo tiene precios, referencias y disponibilidad al día?
        </p>
        <ChoiceCards
          value={form.catalogReady}
          options={[
            ["true", "Sí, está listo"],
            ["false", "Necesita organizarse"],
          ]}
          onChange={(v) => change("catalogReady", v)}
          columns={2}
        />
      </div>
      <label className="block">
        <span className="mb-2 block text-sm text-white/58">
          ¿Qué quieres lograr? <span className="text-white/38">(opcional)</span>
        </span>
        <input
          className={inputClass}
          value={form.goal}
          onChange={(e) => change("goal", e.target.value)}
          maxLength={240}
          placeholder="Ej. responder más rápido y cerrar pedidos completos"
        />
      </label>
      {actions(!form.implementationTiming || !form.catalogReady)}
    </section>,
    <section key="contact" className="space-y-6">
      <header>
        <p className="mb-2 text-xs font-bold uppercase tracking-[.22em] text-primary">
          Resultado
        </p>
        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          ¿A quién le entregamos la evaluación?
        </h3>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm text-white/58">Nombre *</span>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => change("name", e.target.value)}
            autoComplete="name"
            maxLength={100}
          />
        </label>
        <label>
          <span className="mb-2 block text-sm text-white/58">Negocio</span>
          <input
            className={inputClass}
            value={form.company}
            onChange={(e) => change("company", e.target.value)}
            autoComplete="organization"
            maxLength={140}
          />
        </label>
        <label>
          <span className="mb-2 block text-sm text-white/58">WhatsApp *</span>
          <input
            className={inputClass}
            value={form.phone}
            onChange={(e) => change("phone", e.target.value)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+57 300 000 0000"
            maxLength={40}
          />
        </label>
        <label>
          <span className="mb-2 block text-sm text-white/58">Correo</span>
          <input
            className={inputClass}
            value={form.email}
            onChange={(e) => change("email", e.target.value)}
            type="email"
            autoComplete="email"
            placeholder="tu@negocio.com"
            maxLength={180}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm text-white/58">Ciudad</span>
        <input
          className={inputClass}
          value={form.city}
          onChange={(e) => change("city", e.target.value)}
          autoComplete="address-level2"
          maxLength={100}
        />
      </label>
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[.03] p-4 text-sm leading-relaxed text-white/58">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => change("consent", e.target.checked)}
          className="mt-1 h-4 w-4 accent-primary"
        />
        <span>
          Autorizo a Juan Arango / Nitro Ecom a tratar estos datos para evaluar
          mi operación y contactarme por WhatsApp o correo. Leí la{" "}
          <Link
            href="/legal/privacidad"
            target="_blank"
            className="text-white/84 underline underline-offset-4"
          >
            política de privacidad
          </Link>
          .
        </span>
      </label>
      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </p>
      )}
      <div className="flex items-center justify-between gap-4">
        {backButton}
        <button
          type="button"
          onClick={submit}
          disabled={
            loading ||
            !form.name ||
            form.phone.replace(/\D/g, "").length < 8 ||
            !form.consent
          }
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-black text-ink transition hover:bg-[#c8ff5a] disabled:cursor-not-allowed disabled:opacity-35"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Evaluando
            </>
          ) : (
            <>
              Ver mi resultado
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      <div className="flex items-center gap-2 text-xs text-white/38">
        <LockKeyhole className="h-3.5 w-3.5" />
        Tus respuestas llegan cifradas y no se venden a terceros.
      </div>
    </section>,
  ];

  const status = result?.qualification.status;
  const copy = status ? qualificationCopy[status] : null;
  const success = (
    <section className="py-5 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 ring-1 ring-primary/25">
        {delivery === "queued" ? (
          <Clock3 className="h-9 w-9 text-primary" />
        ) : (
          <ShieldCheck className="h-9 w-9 text-primary" />
        )}
      </div>
      <p className="text-xs font-bold uppercase tracking-[.22em] text-primary">
        {delivery === "queued" ? "Solicitud recibida" : copy?.eyebrow}
      </p>
      <h3 className="mx-auto mt-3 max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl">
        {delivery === "queued"
          ? "Estamos terminando tu evaluación"
          : copy?.title}
      </h3>
      <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/58">
        {delivery === "queued"
          ? "Guardamos tus datos de forma segura. NitroBot estaba tardando más de lo normal y completará el análisis automáticamente; te contactaremos por WhatsApp."
          : copy?.body}
      </p>
      {result?.qualification.plan.monthlyPriceCop && (
        <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-white/10 bg-white/[.04] p-5">
          <p className="text-xs uppercase tracking-widest text-white/45">
            Plan orientativo
          </p>
          <p className="mt-2 text-xl font-bold text-white">
            {result.qualification.plan.name}
          </p>
          <p className="mt-1 text-sm text-white/58">
            {result.qualification.plan.includedUnits?.toLocaleString("es-CO")}{" "}
            mensajes · $
            {result.qualification.plan.monthlyPriceCop.toLocaleString("es-CO")}{" "}
            COP/mes
          </p>
        </div>
      )}
      <div className="mt-7 flex items-center justify-center gap-2 text-sm text-white/45">
        <MessageCircle className="h-4 w-4 text-primary" />
        El siguiente contacto será personalmente por WhatsApp.
      </div>
    </section>
  );

  return (
    <div className="mx-auto min-h-[540px] min-w-0 w-full max-w-3xl overflow-x-clip">
      <div className="mb-4 flex items-center justify-between gap-3 text-xs font-medium text-white/45">
        <span>
          {step < TOTAL_STEPS
            ? `Paso ${step + 1} de ${TOTAL_STEPS}`
            : "Evaluación completada"}
        </span>
        {step < TOTAL_STEPS && <span className="shrink-0">1–2 minutos</span>}
      </div>
      <div
        className="mb-8 flex gap-2"
        aria-label={`Progreso: paso ${Math.min(step + 1, TOTAL_STEPS)} de ${TOTAL_STEPS}`}
      >
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <span
            key={index}
            className={`h-1 min-w-0 flex-1 rounded-full transition-colors ${index <= step ? "bg-primary" : "bg-white/10"}`}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          className="min-w-0"
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          {step === TOTAL_STEPS ? success : steps[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
