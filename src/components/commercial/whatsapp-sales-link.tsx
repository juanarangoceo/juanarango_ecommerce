"use client";

import type { ComponentProps, MouseEvent } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { trackMeta } from "@/components/analytics/meta-pixel";
import { readSalesCampaign } from "@/components/commercial/sales-campaign-context";
import { juanWhatsAppHref, type JuanWhatsAppContext } from "@/lib/juan-whatsapp";

type Props = Omit<ComponentProps<"a">, "href"> & {
  context: JuanWhatsAppContext;
  placement: string;
};

export function WhatsAppSalesLink({ context, placement, onClick, children, ...props }: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    event.currentTarget.href = juanWhatsAppHref(context, readSalesCampaign());
    // Abrir WhatsApp no equivale a recibir un lead ni a cerrar una compra.
    // La analítica es opcional y nunca debe bloquear el contacto.
    try {
      sendGAEvent("event", "whatsapp_click", { placement, interest: context.kind });
      trackMeta("WhatsAppClick", { placement, interest: context.kind }, true);
    } catch { /* El enlace funciona aunque la analítica esté bloqueada. */ }
  }

  return (
    <a {...props} href={juanWhatsAppHref(context)} target="_blank" rel="noopener noreferrer" data-sales-whatsapp={placement} onClick={handleClick}>
      {children}
    </a>
  );
}
