export function TickerBar() {
  const items = [
    "NITRO DROPSHIPPING",
    "100% CON IA",
    "SIN CÓDIGO",
    "SIN MENSUALIDADES",
    "14 CUPOS DE LANZAMIENTO",
    "CERO COMISIONES",
    "PAGO ÚNICO",
    "ACCESO DE POR VIDA",
    "CURSO POR JUAN ARANGO",
  ]

  const repeated = [...items, ...items]

  return (
    <div className="bg-primary py-2.5 overflow-hidden whitespace-nowrap select-none border-b border-border">
      <div className="animate-ticker inline-block">
        {repeated.map((text, i) => (
          <span key={i}>
            <span className="mx-4 md:mx-6 font-mono text-[10px] md:text-xs font-bold text-primary-foreground uppercase tracking-wider">
              {text}
            </span>
            <span className="text-primary-foreground/40 font-mono text-[10px] md:text-xs">
              {'///'}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
