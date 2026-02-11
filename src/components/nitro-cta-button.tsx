"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function NitroCtaButton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
      <Link href="#contacto" className="w-full sm:w-auto" aria-label="Solicitar un diagnóstico gratuito">
        <Button
          size="lg"
          className="w-full bg-emerald-500 text-black hover:bg-emerald-400 text-lg px-8 py-6 h-14 font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
        >
          Solicitar Diagnóstico
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  )
}
