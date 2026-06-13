import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

/** Identidad legal compartida por todas las páginas legales. */
export const LEGAL_ENTITY = {
  name: "Juan Arango",
  brand: "NITRO ECOM",
  site: "www.juanarangoecommerce.com",
  email: "hola@juanarangoecommerce.com",
  location: "Pereira, Risaralda, Colombia",
};

/** Fecha de última actualización mostrada en todos los documentos legales. */
export const LEGAL_LAST_UPDATED = "13 de junio de 2026";

interface LegalShellProps {
  title: string;
  intro: string;
  /** Sobrescribe la fecha por defecto si fuese necesario. */
  updated?: string;
  children: React.ReactNode;
}

export function LegalShell({ title, intro, updated = LEGAL_LAST_UPDATED, children }: LegalShellProps) {
  return (
    <main className="pt-28 md:pt-36 pb-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <Link
          href="/legal"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Centro Legal
        </Link>

        <header className="border-b border-border/50 pb-8 mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-[family-name:var(--font-dm-mono)] mb-4">
            Centro Legal · {LEGAL_ENTITY.brand}
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-[1.1]">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{intro}</p>
          <p className="text-sm text-muted-foreground/60 mt-6">
            Última actualización: {updated}
          </p>
        </header>

        <article
          className="prose prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground prose-li:my-1
            prose-strong:text-foreground
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-ul:my-4"
        >
          {children}
        </article>

        {/* Contacto */}
        <div className="mt-14 rounded-2xl border border-border/50 bg-card/40 p-6 md:p-8">
          <h2 className="text-lg font-bold text-foreground mb-2">¿Dudas sobre este documento?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Escríbenos y te respondemos. Estamos en {LEGAL_ENTITY.location}.
          </p>
          <a
            href={`mailto:${LEGAL_ENTITY.email}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <Mail className="w-4 h-4" /> {LEGAL_ENTITY.email}
          </a>
        </div>
      </div>
    </main>
  );
}
