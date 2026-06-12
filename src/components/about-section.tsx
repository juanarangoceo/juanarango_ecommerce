import Image from "next/image";
import { Terminal, Rocket, Code2 } from "lucide-react";

const JUAN_PHOTO = "https://res.cloudinary.com/dohwyszdj/image/upload/f_auto,q_auto,w_800/v1781237424/Juan_arango_Ecommerce_r96gjj.png";

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
    <section id="sobre-mi" className="py-12 md:py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-azul-estructura/20 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14">

          {/* Text Content */}
          <div className="space-y-7">
            <p className="font-dm-mono text-xs md:text-sm uppercase tracking-[0.25em] text-primary">
              Quién te habla
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Soy Juan Arango. <br />
              <span className="text-primary">
                Y esto lo implemento yo.
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Llevo <strong className="text-white">15 años construyendo ecommerce en Latinoamérica</strong>:
              vendiendo en marketplaces, lanzando marcas propias y montando las tiendas y sistemas de mis clientes.
              Todo lo que te propongo sale de operar negocios reales.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Te muestro cómo funciona antes de que me contrates. Y cuando me contratas,
              te dejo funcionando el sistema completo — estrategia, automatización e infraestructura — y te enseño a operarlo.
            </p>

            <div className="pt-5 border-t border-white/10">
              <p className="text-sm italic text-zinc-500 font-serif">
                "NITRO ECOM es mi estructura de implementación: cuando me contratas, esto es lo que ejecuta."
              </p>
            </div>
          </div>

          {/* Foto real de Juan */}
          <div className="relative max-w-md w-full mx-auto">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-primary/25 via-transparent to-transparent blur-xl pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-zinc-900">
              <Image
                src={JUAN_PHOTO}
                alt="Juan Arango, experto en ecommerce y automatización"
                width={800}
                height={1000}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 90vw, 440px"
              />
            </div>
          </div>

        </div>

        {/* Credenciales */}
        <div className="grid md:grid-cols-3 gap-6">
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
    </section>
  );
}
