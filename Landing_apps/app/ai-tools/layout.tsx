import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Nitro Ecom AI Tools",
    default: "AI Tools - Las Mejores Apps de IA y Productividad | Nitro Ecom",
  },
  description:
    "Biblioteca curada de las mejores herramientas de inteligencia artificial y productividad. Recomendaciones de Nitro Ecom por Juan Arango Ecommerce.",
}

export default function AiToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="ai-tools-dark min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {children}
      </main>
    </div>
  )
}
