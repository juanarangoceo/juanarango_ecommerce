import { Terminal, Code2, Rocket, Share2 } from "lucide-react";

export function AboutSection() {
  const experiences = [
    {
      icon: Terminal,
      year: "+8 Años",
      title: "Full Stack Engineering",
      desc: "Arquitectura de software escalable. Desde monolitos hasta microservicios distribuidos."
    },
    {
      icon: Rocket,
      year: "$10M+",
      title: "Revenue Generado",
      desc: "Sistemas diseñados para procesar millones en transacciones sin caídas durante picos de tráfico."
    },
    {
      icon: Code2,
      year: "Global",
      title: "Liderazgo Técnico",
      desc: "Dirigiendo equipos remotos de alto rendimiento en LATAM y USA."
    }
  ];

  return (
    <section id="sobre-mi" className="py-24 px-6 mb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-900/10 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Ingeniero de Escalamiento
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              No soy solo un developer. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                Soy tu socio técnico.
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Mi nombre es <strong className="text-white">Juan Arango</strong>. Me especializo en tomar negocios que ya funcionan y 
              reconstruir su infraestructura técnica para que puedan escalar x10 sin romperse.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Combino <strong>estrategia de negocio</strong> con <strong>ingeniería de software avanzada</strong>. 
              No entrego código; entrego sistemas que imprimen eficiencia y facturación.
            </p>

            {/* Signature or Quote */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm italic text-zinc-500 font-serif">
                "La velocidad es la nueva moneda del ecommerce."
              </p>
            </div>
          </div>

          {/* Cards / Visuals */}
          <div className="grid gap-6">
            {experiences.map((exp, i) => (
              <div 
                key={i}
                className="group relative p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-primary/30 transition-all duration-300 hover:bg-zinc-900/60"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                    <exp.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary tracking-widest uppercase mb-1 block">
                      {exp.year}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
