"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FlaskConical } from "lucide-react"

export function NitroCtaButton() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
        <Link href="#contacto" className="w-full sm:w-auto" aria-label="Solicitar un diagnóstico sin costo">
          <Button
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 h-14 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
          >
            Solicitar diagnóstico
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
        <Link href="/laboratorio" className="w-full sm:w-auto" aria-label="Ver el laboratorio: proyectos construidos en público">
          <Button
            size="lg"
            variant="outline"
            className="w-full border-primary/40 text-primary hover:bg-primary/10 hover:text-primary text-lg px-8 py-6 h-14 font-bold transition-all"
          >
            <FlaskConical className="mr-2 w-5 h-5" />
            Ver el laboratorio
          </Button>
        </Link>
      </div>
      <p className="text-sm text-zinc-500">
        Sin costo y sin compromiso. Te digo qué haría yo con tu operación.
      </p>
    </div>
  )
}
