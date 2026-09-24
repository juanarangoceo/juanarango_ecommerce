import { BookOpenText, Mail, Sparkles } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";

const topics = [
  { icon: BookOpenText, label: "Guías aplicables" },
  { icon: Sparkles, label: "Pruebas de herramientas" },
  { icon: Mail, label: "Una idea por envío" },
] as const;

export function NewsletterSection() {
  return (
    <section className="border-y border-white/7 bg-[#0b0e0c] px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="content">
      <div className="relative mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[2rem] border border-primary/18 bg-[#0d110e] p-7 sm:p-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:p-14">
        <div className="pointer-events-none absolute -left-24 top-1/2 size-72 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[100px]" />
        <div className="relative text-center lg:text-left">
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">Lo que aprendo construyendo, <span className="text-primary">directo a tu correo.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-left text-base leading-7 text-white/55 lg:mx-0">Comparto decisiones, herramientas y aprendizajes de ecommerce e IA para que puedas aplicarlos antes de comprar otra plataforma.</p>
          <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 lg:justify-start">
            {topics.map(({ icon: Icon, label }) => <li key={label} className="flex items-center gap-2 text-xs text-white/48"><Icon className="size-4 text-primary" />{label}</li>)}
          </ul>
        </div>
        <div className="relative rounded-[1.5rem] border border-white/9 bg-black/20 p-5 sm:p-7"><NewsletterForm variant="inline" /></div>
      </div>
    </section>
  );
}
