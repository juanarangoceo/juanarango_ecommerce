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
      <h3 className="text-2xl font-bold text-foreground">Empecemos por conocernos.</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-primary mb-2 font-medium">¿Cómo te llamas?</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full bg-secondary border-b-2 border-border text-2xl font-light text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 py-3 rounded-lg px-4 transition-all placeholder:text-muted-foreground"
          />
        </div>
        <div>
          <label className="block text-sm text-primary mb-2 font-medium">¿Y tu empresa?</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nombre de tu negocio"
            className="w-full bg-secondary border-b-2 border-border text-2xl font-light text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 py-3 rounded-lg px-4 transition-all placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <button
        onClick={handleNext}
        disabled={!formData.name}
        className="group flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>,

    // Step 1: Email
    <div key="step1" className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">Genial, {formData.name.split(" ")[0]}. <br/> ¿Dónde podemos contactarte?</h3>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className="w-full bg-secondary border-b-2 border-border text-2xl font-light text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 py-3 rounded-lg px-4 transition-all placeholder:text-muted-foreground"
        />
      </div>
      <button
        onClick={handleNext}
        disabled={!formData.email.includes("@")}
        className="group flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>,

    // Step 2: Interest
    <div key="step2" className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">¿Qué estás buscando mejorar hoy?</h3>
      <div className="grid gap-3">
        {["Infraestructura de Ecommerce", "Automatización de Negocio", "Consultoría de Escalamiento", "Otro"].map((option) => (
          <label
            key={option}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              formData.interest === option
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/50 hover:bg-secondary/80"
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
            <span className="text-base font-medium">{option}</span>
            {formData.interest === option && <Check className="ml-auto w-5 h-5 text-primary" />}
          </label>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={!formData.interest}
        className="group flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Revisar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>,

    // Step 3: Confirmation / Submit
    <div key="step3" className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">¿Todo correcto?</h3>
      <div className="bg-secondary p-6 rounded-lg border border-border space-y-4 text-foreground">
        <p><strong className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Nombre</strong> {formData.name}</p>
        <p><strong className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Empresa</strong> {formData.company || "No especificada"}</p>
        <p><strong className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Email</strong> {formData.email}</p>
        <p><strong className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Interés</strong> {formData.interest}</p>
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Enviar Solicitud"}
      </button>
    </div>,

    // Step 4: Success
    <div key="step4" className="text-center space-y-6 py-12">
      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-3xl font-bold text-foreground">¡Recibido!</h3>
      <p className="text-muted-foreground text-lg max-w-md mx-auto">
        Gracias por tu interés, {formData.name.split(" ")[0]}. Hemos enviado un correo de confirmación a <strong className="text-primary">{formData.email}</strong>.
      </p>
      <p className="text-muted-foreground">Nuestro equipo te contactará en breve.</p>
    </div>
  ];

  return (
    <div className="w-full max-w-2xl mx-auto min-h-[400px]">
      <div className="mb-8 flex gap-2">
        {[0, 1, 2, 3].map((s) => (
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
