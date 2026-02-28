export function Footer() {
  return (
    <footer className="py-10 md:py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-5 md:gap-6">
        <div className="text-center md:text-left">
          <div className="font-heading text-2xl md:text-3xl tracking-wider text-foreground">
            NITRO <span className="text-primary">DROPSHIPPING</span>
          </div>
          <div className="font-mono text-[10px] md:text-xs text-foreground/30 mt-1">
            Por Juan Arango — Experto en Ecommerce
          </div>
        </div>
        <div className="font-mono text-[10px] md:text-xs text-foreground/30 uppercase tracking-widest text-center md:text-right">
          100% con IA. Cero codigo. Cero excusas.
        </div>
      </div>
    </footer>
  )
}
