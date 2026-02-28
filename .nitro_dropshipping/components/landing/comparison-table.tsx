import { Check, X } from "lucide-react"

const rows = [
  { label: "Costo mensual", old: "$39+ / mes", nitro: "$0 / mes", highlight: false },
  { label: "Apps y extensiones", old: "$15 - $80 / mes", nitro: "Incluidas en el stack", highlight: false },
  { label: "Comision por venta", old: "0.5% - 2%", nitro: "0% — todo tuyo", highlight: false },
  { label: "Velocidad de carga", old: "2 - 4 segundos", nitro: "Menos de 1 segundo", highlight: false },
  { label: "Personalizacion", old: "Plantillas limitadas", nitro: "IA genera disenos unicos", highlight: false },
  { label: "Conocimiento tecnico", old: "Medio - Alto", nitro: "Cero. La IA lo hace por ti", highlight: false },
  { label: "Si el producto no vende", old: "Sigues pagando mensualidad", nitro: "No pagas nada. Pivoteas.", highlight: true },
]

export function ComparisonTable() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6">
          {'// COMPARATIVA REAL'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-5 md:mb-6 text-balance">
          MISMO RESULTADO.<br />
          <span className="text-primary">SIN PAGAR ANTES DE GANAR.</span>
        </h2>
        <p className="text-foreground/70 text-base md:text-lg max-w-2xl mb-10 md:mb-14 leading-relaxed">
          Con el metodo Nitro construyes la misma tienda profesional, pero
          mas rapida, mas personalizada y sin los costos que te ahogan antes de tu primera venta.
        </p>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className={`border p-4 ${row.highlight ? "border-primary/30 bg-primary/[0.03]" : "border-border"}`}
            >
              <div className="text-foreground font-semibold text-sm mb-3">{row.label}</div>
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <div className="font-mono text-[10px] text-destructive/60 uppercase tracking-wider mb-1">Tradicional</div>
                  <div className="font-mono text-xs text-foreground/50">{row.old}</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="font-mono text-[10px] text-primary uppercase tracking-wider mb-1">Nitro</div>
                  <div className="font-mono text-xs text-primary font-bold">{row.nitro}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="py-5 px-5 font-mono text-xs uppercase tracking-widest text-foreground/50 w-[40%]">
                  Caracteristica
                </th>
                <th className="py-5 px-5 font-mono text-xs uppercase tracking-widest text-destructive w-[30%]">
                  <span className="flex items-center gap-2">
                    <X className="w-3.5 h-3.5" />
                    Plataformas tradicionales
                  </span>
                </th>
                <th className="py-5 px-5 font-mono text-xs uppercase tracking-widest text-primary w-[30%]">
                  <span className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5" />
                    Metodo Nitro
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.label}
                  className={`border-b border-border/50 transition-colors hover:bg-background/50 ${
                    row.highlight ? "bg-primary/[0.03]" : ""
                  }`}
                >
                  <td className={`py-5 px-5 text-sm lg:text-base ${row.highlight ? "text-foreground font-bold" : "text-foreground/80"}`}>
                    {row.label}
                  </td>
                  <td className="py-5 px-5 font-mono text-sm text-destructive/70">
                    {row.old}
                  </td>
                  <td className={`py-5 px-5 font-mono text-sm text-primary font-bold ${row.highlight ? "border-l-2 border-primary" : ""}`}>
                    {row.nitro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
