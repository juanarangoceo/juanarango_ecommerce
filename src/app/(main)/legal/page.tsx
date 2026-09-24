import Link from "next/link";
import { ShieldCheck, FileText, Cookie, Scale, ArrowRight } from "lucide-react";
import { constructMetadata } from "@/lib/utils";
import { LEGAL_ENTITY, LEGAL_LAST_UPDATED } from "@/components/legal/legal-shell";

export const metadata = constructMetadata({
  title: "Centro Legal",
  description:
    "Políticas y condiciones de Juan Arango (NITRO ECOM): privacidad, términos y condiciones, cookies y aviso legal.",
  canonical: "https://www.juanarangoecommerce.com/legal",
});

const DOCS = [
  {
    href: "/legal/privacidad",
    title: "Política de Privacidad",
    description:
      "Cómo recopilamos, usamos y protegemos tus datos personales conforme a la Ley 1581 de 2012.",
    icon: ShieldCheck,
  },
  {
    href: "/legal/terminos",
    title: "Términos y Condiciones",
    description:
      "Las reglas para usar este sitio, nuestros contenidos y solicitar nuestros servicios.",
    icon: FileText,
  },
  {
    href: "/legal/cookies",
    title: "Política de Cookies",
    description:
      "Qué cookies usamos, para qué sirven y cómo puedes controlarlas desde tu navegador.",
    icon: Cookie,
  },
  {
    href: "/legal/aviso-legal",
    title: "Aviso Legal",
    description:
      "Identidad del responsable del sitio, propiedad intelectual y condiciones de uso.",
    icon: Scale,
  },
];

export default function LegalHubPage() {
  return (
    <div className="px-5 pb-24 pt-32 lg:px-8 lg:pt-44">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-12 text-center md:mb-16">
          <h1 className="text-balance font-display text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[.97] tracking-[-0.05em] text-white">
            Información clara para una relación <span className="text-primary">transparente.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Aquí encuentras todos nuestros documentos legales. Queremos que sepas exactamente
            cómo tratamos tu información y bajo qué condiciones trabajamos contigo.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-5">
          {DOCS.map((doc) => {
            const Icon = doc.icon;
            return (
              <Link
                key={doc.href}
                href={doc.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/9 bg-[#0d110e] p-6 transition-colors hover:border-primary/40 md:p-7"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground mb-2">{doc.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {doc.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-4">
                  Leer documento
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground/60 mt-12">
          Última actualización: {LEGAL_LAST_UPDATED} · Responsable: {LEGAL_ENTITY.name} ({LEGAL_ENTITY.brand}),{" "}
          {LEGAL_ENTITY.location}.
        </p>
      </div>
    </div>
  );
}
