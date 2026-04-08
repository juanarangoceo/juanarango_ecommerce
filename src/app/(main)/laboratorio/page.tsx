import type { Metadata } from "next";
import { LaboratorioPage } from "./_components/LaboratorioPage";

export const metadata: Metadata = {
  title: "Laboratorio Ecom | La suscripción para escalar proyectos digitales",
  description:
    "Accede a proyectos escalables reales, prompts profesionales y MVPs paso a paso. Juan Arango abre las puertas del Laboratorio Ecom. Regístrate para ser el primero.",
  openGraph: {
    title: "Laboratorio Ecom | Proyectos escalables. Prompts pro. Resultados reales.",
    description:
      "No es un curso. Es un laboratorio activo donde aprenderás replicando proyectos reales. Únete a la lista de espera.",
    url: "https://www.juanarangoecommerce.com/laboratorio",
    siteName: "Nitro Ecom",
    locale: "es_CO",
    type: "website",
  },
  alternates: {
    canonical: "https://www.juanarangoecommerce.com/laboratorio",
  },
};

export default function AcademiaPage() {
  return <LaboratorioPage />;
}
