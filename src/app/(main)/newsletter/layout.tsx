import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter Gratuita | Ecommerce, IA y Estrategia Digital — Nitro Ecom",
  description:
    "Únete a más de 2,400 fundadores y marketers que reciben estrategias de ecommerce, herramientas de IA y recursos exclusivos cada semana. Gratis, sin spam.",
  openGraph: {
    title: "Newsletter Gratuita | Ecommerce, IA y Estrategia Digital",
    description:
      "Estrategias probadas, herramientas de IA y recursos exclusivos en tu inbox cada semana. Más de 2,400 suscriptores ya lo reciben.",
    url: "https://www.juanarangoecommerce.com/newsletter",
    siteName: "Nitro Ecom",
    locale: "es_CO",
    type: "website",
  },
  alternates: {
    canonical: "https://www.juanarangoecommerce.com/newsletter",
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
