import { Terminal, Rocket, Code2 } from "lucide-react";

export function AboutSection() {
  const experiences = [
    {
      icon: Terminal,
      year: "15 años",
      title: "Ecommerce y marketing digital en LATAM",
      desc: "Llevo 15 años construyendo y operando comercio electrónico en Latinoamérica: marketplaces, marcas propias y tiendas de clientes."
    },
    {
      icon: Rocket,
      year: "Pereira, Colombia",
      title: "Base en Colombia, cancha en toda Latinoamérica",
      desc: "Trabajo con empresas de Colombia y de la región que quieren automatizar su operación y escalar sus ventas."
    },
    {
      icon: Code2,
      year: "NITRO ECOM",
      title: "Mi estructura de implementación",
      desc: "Cuando me contratas, NITRO ECOM es lo que ejecuta: estrategia, automatización e infraestructura funcionando en tu negocio."
    }
  ];

  return (
    <section id="sobre-mi" className="py-12 md:py-24 px-6 mb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-azul-estructura/20 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-dm-mono text-primary uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Quién te habla
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Soy Juan Arango. <br />
              <span className="text-primary">
                Y esto lo implemento yo.
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Llevo <strong className="text-white">15 años construyendo ecommerce en Latinoamérica</strong>:
              vendiendo en marketplaces, lanzando marcas propias y montando las tiendas y sistemas de mis clientes.
              Lo que te propongo no sale de un manual: sale de operar negocios reales.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Te muestro cómo funciona antes de que me contrates. Y cuando me contratas, no te entrego una página:
              te dejo funcionando el sistema completo — estrategia, automatización e infraestructura — y te enseño a operarlo.
            </p>

            {/* Signature or Quote */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm italic text-zinc-500 font-serif">
                "NITRO ECOM es mi estructura de implementación: cuando me contratas, esto es lo que ejecuta."
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
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <exp.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary tracking-widest uppercase mb-1 block font-dm-mono">
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
