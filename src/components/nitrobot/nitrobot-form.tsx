"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, MessageCircle } from "lucide-react";
import { submitNitrobotLead } from "@/app/actions/submit-nitrobot-lead";

const VOLUME_OPTIONS = ["Menos de 20", "20 a 50", "50 a 150", "Más de 150"];

const WHO_OPTIONS = [
  "Yo mismo/a",
  "Una persona del equipo",
  "Varias personas",
  "Nadie fijo, se nos escapan",
];

const GOAL_OPTIONS = [
  "Responder al instante 24/7",
  "Vender más sin contratar más gente",
  "Dejar de perder clientes por demora",
  "Liberar a mi equipo de lo repetitivo",
];

const TOTAL_STEPS = 4; // pasos de captura antes del éxito

interface RadioGroupProps {
  name: string;
  value: string;
  options: string[];
  onChange: (name: string, value: string) => void;
}

function RadioCards({ name, value, options, onChange }: RadioGroupProps) {
  return (
    <div className="grid gap-2.5">
      {options.map((option) => (
        <label
          key={option}
          className={`flex items-center p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
            value === option
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-secondary text-muted-foreground hover:border-primary/50 hover:bg-secondary/80"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(name, option)}
            className="hidden"
          />
          <span className="text-sm md:text-base font-medium">{option}</span>
          {value === option && <Check className="ml-auto w-5 h-5 text-primary shrink-0" />}
        </label>
      ))}
    </div>
  );
}

export function NitroBotForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    whatsapp: "",
    email: "",
    sector: "",
    volume: "",
    whoAttends: "",
    goal: "",
  });

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep((p) => p + 1);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePick = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    const result = await submitNitrobotLead(data);
    setLoading(false);
    if (result.success) setStep(TOTAL_STEPS); // éxito
    else alert(result.error || "Hubo un error. Por favor intenta de nuevo.");
  };

  const inputClass =
    "w-full bg-secondary border-b-2 border-border text-xl md:text-2xl font-light text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 py-3 rounded-lg px-4 transition-all placeholder:text-muted-foreground";

  const nextBtn = (label: string, disabled: boolean) => (
    <button
      onClick={handleNext}
      disabled={disabled}
      className="group flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  );

  const steps = [
    // Paso 0 — Identidad
    <div key="s0" className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">Cuéntame de tu negocio.</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-primary mb-2 font-medium">¿Cómo te llamas?</label>
          <input type="text" name="name" value={formData.name} onChange={handleInput} placeholder="Tu nombre" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-primary mb-2 font-medium">¿Cómo se llama tu negocio?</label>
          <input type="text" name="company" value={formData.company} onChange={handleInput} placeholder="Nombre de tu negocio" className={inputClass} />
        </div>
      </div>
      {nextBtn("Siguiente", !formData.name)}
    </div>,

    // Paso 1 — Contacto (WhatsApp es el canal del producto)
    <div key="s1" className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">
        Genial, {formData.name.split(" ")[0]}. <br /> ¿Por dónde te escribo?
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-primary mb-2 font-medium">Tu WhatsApp (te escribo por aquí)</label>
          <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInput} placeholder="+57 300 000 0000" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-primary mb-2 font-medium">Tu correo (para enviarte el resumen)</label>
          <input type="email" name="email" value={formData.email} onChange={handleInput} placeholder="tu@email.com" className={inputClass} />
        </div>
      </div>
      {nextBtn("Siguiente", formData.whatsapp.length < 7 || !formData.email.includes("@"))}
    </div>,

    // Paso 2 — Calificación: sector + volumen
    <div key="s2" className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">¿Cómo es tu operación hoy?</h3>
      <div>
        <label className="block text-sm text-primary mb-2 font-medium">¿A qué se dedica tu negocio?</label>
        <input type="text" name="sector" value={formData.sector} onChange={handleInput} placeholder="Ej: ropa, clínica estética, repuestos…" className={inputClass} />
      </div>
      <div>
        <label className="block text-sm text-primary mb-3 font-medium">¿Cuántas conversaciones de WhatsApp recibes al día?</label>
        <RadioCards name="volume" value={formData.volume} options={VOLUME_OPTIONS} onChange={handlePick} />
      </div>
      {nextBtn("Siguiente", !formData.volume)}
    </div>,

    // Paso 3 — Calificación: quién atiende + objetivo
    <div key="s3" className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">Un par de cosas más.</h3>
      <div>
        <label className="block text-sm text-primary mb-3 font-medium">¿Quién responde WhatsApp hoy?</label>
        <RadioCards name="whoAttends" value={formData.whoAttends} options={WHO_OPTIONS} onChange={handlePick} />
      </div>
      <div>
        <label className="block text-sm text-primary mb-3 font-medium">¿Qué quieres lograr con NitroBot?</label>
        <RadioCards name="goal" value={formData.goal} options={GOAL_OPTIONS} onChange={handlePick} />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading || !formData.whoAttends || !formData.goal}
        className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Solicitar mi diagnóstico gratis"}
      </button>
    </div>,

    // Paso 4 — Éxito
    <div key="s4" className="text-center space-y-6 py-12">
      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
        <MessageCircle className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-3xl font-bold text-foreground">¡Listo, {formData.name.split(" ")[0]}!</h3>
      <p className="text-muted-foreground text-lg max-w-md mx-auto">
        Revisaré tu operación y te escribo personalmente por WhatsApp al{" "}
        <strong className="text-primary">{formData.whatsapp}</strong> para coordinar tu diagnóstico sin costo.
      </p>
      <p className="text-muted-foreground">Normalmente respondo el mismo día.</p>
    </div>,
  ];

  return (
    <div className="w-full max-w-2xl mx-auto min-h-[420px]">
      <div className="mb-8 flex gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
              s <= step ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
