import Link from "next/link";
import { CONTACT_EMAILS } from "@/lib/contact-emails";
import { ArrowLeft, Mail } from "lucide-react";

/** Identidad legal compartida por todas las páginas legales. */
export const LEGAL_ENTITY = {
  name: "Juan Arango",
  brand: "NITRO ECOM",
  site: "www.juanarangoecommerce.com",
  email: CONTACT_EMAILS.contacto,
  location: "Pereira, Risaralda, Colombia",
};

/**
 * Proveedor de Nitro Complete. Es una entidad DISTINTA de la del sitio: las
 * páginas legales del producto (bajo /nitro-complete) la usan en lugar de
 * LEGAL_ENTITY para que el titular del producto sea inequívoco ante Meta y
 * ante quien ejerce sus derechos.
 */
export const NITRO_COMPLETE_ENTITY = {
  name: "TODOPOLIS S.A.S.",
  nit: "901.225.969-6",
  brand: "Nitro Complete",
  site: "www.juanarangoecommerce.com/nitro-complete",
  /** Datos personales y eliminación de datos del producto (también lo ve Meta). */
  email: CONTACT_EMAILS.privacidad,
  whatsapp: "+57 314 668 1896",
  whatsappLink: "https://wa.me/573146681896",
  location: "Pereira, Risaralda, Colombia",
};

type ShellEntity = { brand: string; email: string; location: string };

/** Fecha de última actualización mostrada en todos los documentos legales. */
export const LEGAL_LAST_UPDATED = "13 de junio de 2026";

interface LegalShellProps {
  title: string;
  intro: string;
  /** Sobrescribe la fecha por defecto si fuese necesario. */
  updated?: string;
  /** Titular del documento. Por defecto, el del sitio (LEGAL_ENTITY). */
  entity?: ShellEntity;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}

export function LegalShell({
  title,
  intro,
  updated = LEGAL_LAST_UPDATED,
  entity = LEGAL_ENTITY,
  backHref = "/legal",
  backLabel = "Centro Legal",
  children,
}: LegalShellProps) {
  return (
    <main className="pt-28 md:pt-36 pb-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> {backLabel}
        </Link>

        <header className="border-b border-border/50 pb-8 mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-[family-name:var(--font-dm-mono)] mb-4">
            Centro Legal · {entity.brand}
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
            Escríbenos y te respondemos. Estamos en {entity.location}.
          </p>
          <a
            href={`mailto:${entity.email}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <Mail className="w-4 h-4" /> {entity.email}
          </a>
        </div>
      </div>
    </main>
  );
}
