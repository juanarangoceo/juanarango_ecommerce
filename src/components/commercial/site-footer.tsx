import Link from "next/link";

const groups = [
  {
    title: "Soluciones",
    links: [
      ["Nitro Complete", "/nitro-complete"],
      ["Consultoría ecommerce", "/soluciones/nitro-commerce"],
      ["Nitro Landing", "/soluciones/nitro-landing"],
      ["NitroBot", "/nitrobot"],
      ["Diagnóstico", "/diagnostico"],
    ],
  },
  {
    title: "Explora",
    links: [
      ["Newsletter", "/newsletter"],
      ["Industrias", "/industrias"],
      ["Blog", "/blog"],
      ["Guías", "/guias"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacidad", "/legal/privacidad"],
      ["Términos", "/legal/terminos"],
      ["Cookies", "/legal/cookies"],
      ["Aviso legal", "/legal/aviso-legal"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#0b0d0b] px-5 py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.35fr_2fr]">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-bold tracking-tight text-white">JUAN ARANGO</p>
          <p className="mt-2 font-mono text-[10px] tracking-[0.26em] text-primary">NITRO ECOM</p>
          <p className="mt-5 text-sm leading-6 text-white/55">
            Ventas por WhatsApp con IA y consultoría ecommerce. Tecnología que vende y dirección humana para negocios de Colombia y Latinoamérica.
          </p>
          <a href="mailto:juanarangoecommerce@gmail.com" className="mt-6 inline-block text-sm text-white underline decoration-primary/60 underline-offset-4">
            juanarangoecommerce@gmail.com
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-white">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-white/52 transition-colors hover:text-primary">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-white/8 pt-6 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Juan Arango. Todos los derechos reservados.</p>
        <p>NITRO ECOM es la estructura de implementación de Juan Arango.</p>
      </div>
    </footer>
  );
}
