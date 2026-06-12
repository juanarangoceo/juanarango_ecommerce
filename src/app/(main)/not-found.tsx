import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Página no encontrada | Juan Arango Ecommerce",
}

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="font-dm-mono text-sm uppercase tracking-widest text-primary mb-6">
        Error 404
      </p>
      <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl text-balance">
        Esta página no existe — pero tu próximo sistema sí.
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Vuelve al inicio y te muestro lo que estoy construyendo.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Volver al inicio
      </Link>
    </section>
  )
}
