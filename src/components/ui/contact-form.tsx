"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { submitLead } from "@/app/actions/submit-lead";

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
  });

  const handleNext = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    const result = await submitLead(data);
    setLoading(false);

    if (result.success) {
      setStep(4); // Success Step
    } else {
      // Show specific error from server
      alert(result.error || "Hubo un error. Por favor intenta de nuevo.");
    }
  };

  const steps = [
    // Step 0: Intro / Name
    <div key="step0" className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Empecemos por conocernos.</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-2">¿Cómo te llamas?</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full bg-transparent border-b-2 border-zinc-700 text-3xl font-light text-white focus:border-primary focus:outline-none py-2 transition-colors placeholder:text-zinc-700"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-2">¿Y tu empresa?</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nombre de tu negocio"
            className="w-full bg-transparent border-b-2 border-zinc-700 text-3xl font-light text-white focus:border-primary focus:outline-none py-2 transition-colors placeholder:text-zinc-700"
          />
        </div>
      </div>
      <button
        onClick={handleNext}
        disabled={!formData.name}
        className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>,

    // Step 1: Email
    <div key="step1" className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Genial, {formData.name.split(" ")[0]}. <br/> ¿Dónde podemos contactarte?</h3>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className="w-full bg-transparent border-b-2 border-zinc-700 text-3xl font-light text-white focus:border-primary focus:outline-none py-2 transition-colors placeholder:text-zinc-700"
          autoFocus
        />
      </div>
      <button
        onClick={handleNext}
        disabled={!formData.email.includes("@")}
        className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>,

    // Step 2: Interest
    <div key="step2" className="space-y-6">
      <h3 className="text-2xl font-bold text-white">¿Qué estás buscando mejorar hoy?</h3>
      <div className="grid gap-3">
        {["Infraestructura de Ecommerce", "Automatización de Negocio", "Consultoría de Escalamiento", "Otro"].map((option) => (
          <label
            key={option}
            className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
              formData.interest === option
                ? "border-primary bg-primary/10 text-white"
                : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
            }`}
          >
            <input
              type="radio"
              name="interest"
              value={option}
              checked={formData.interest === option}
              onChange={handleChange}
              className="hidden"
            />
            <span className="text-lg">{option}</span>
            {formData.interest === option && <Check className="ml-auto w-5 h-5 text-primary" />}
          </label>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={!formData.interest}
        className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Revisar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>,

    // Step 3: Confirmation / Submit
    <div key="step3" className="space-y-6">
      <h3 className="text-2xl font-bold text-white">¿Todo correcto?</h3>
      <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 space-y-4 text-zinc-300">
        <p><strong className="text-zinc-500 block text-xs uppercase tracking-wider">Nombre</strong> {formData.name}</p>
        <p><strong className="text-zinc-500 block text-xs uppercase tracking-wider">Empresa</strong> {formData.company || "No especificada"}</p>
        <p><strong className="text-zinc-500 block text-xs uppercase tracking-wider">Email</strong> {formData.email}</p>
        <p><strong className="text-zinc-500 block text-xs uppercase tracking-wider">Interés</strong> {formData.interest}</p>
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary text-black font-bold text-lg py-4 rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Enviar Solicitud"}
      </button>
    </div>,

    // Step 4: Success
    <div key="step4" className="text-center space-y-6 py-12">
      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-3xl font-bold text-white">¡Recibido!</h3>
      <p className="text-zinc-400 text-lg max-w-md mx-auto">
        Gracias por tu interés, {formData.name.split(" ")[0]}. Hemos enviado un correo de confirmación a <strong>{formData.email}</strong>.
      </p>
      <p className="text-zinc-500">Nuestro equipo te contactará en breve.</p>
    </div>
  ];

  return (
    <div className="w-full max-w-2xl mx-auto min-h-[400px]">
      <div className="mb-8 flex gap-2">
        {[0, 1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
              s <= step ? "bg-primary" : "bg-zinc-800"
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
