import { ArrowRight } from "lucide-react";
import { WhatsAppLogo } from "@/components/commercial/brand-logos";
import type { JuanWhatsAppContext } from "@/lib/juan-whatsapp";
import { WhatsAppSalesLink } from "@/components/commercial/whatsapp-sales-link";
import { cn } from "@/lib/utils";

// Botón de compra de Nitro Complete: abre WhatsApp con Juan y un mensaje que
// le dice desde dónde llega el prospecto. Tres tonos para los fondos de la
// página: `primary` (verde Nitro), `dark` (negro sobre fondo claro) y
// `outline` (sobre fondo oscuro).
const VARIANTS = {
  primary: "bg-primary text-ink hover:bg-primary/85",
  dark: "bg-ink text-white hover:bg-ink/85",
  outline: "border border-white/15 bg-transparent text-white hover:bg-white/7",
} as const;

export function WhatsAppJuanButton({
  context,
  children,
  variant = "primary",
  className = "",
  placement,
}: {
  context: JuanWhatsAppContext;
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
  placement: string;
}) {
  return (
    <WhatsAppSalesLink
      context={context}
      placement={placement}
      className={cn("group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-center text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary", VARIANTS[variant], className)}
    >
      <WhatsAppLogo className="size-5 shrink-0" mono={variant !== "outline"} title="" />
      <span>{children}</span>
      <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
    </WhatsAppSalesLink>
  );
}
