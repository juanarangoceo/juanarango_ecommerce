"use client";

import Link from "next/link";
import { useEffect } from "react";
import { trackMeta } from "@/components/analytics/meta-pixel";
import { WhatsAppSalesLink } from "@/components/commercial/whatsapp-sales-link";
import { WhatsAppLogo } from "@/components/commercial/brand-logos";
import { VslPlayer } from "@/components/nitrobot/vsl-player";
import { SALES_EVALUATION_HREF } from "@/lib/juan-whatsapp";
import { VSL_UNLOCK_SECONDS, getVslPoster, getVslVariants } from "@/lib/nitrobot-vsl";

// La conversación está disponible desde el inicio: ver el video es opcional.
// Los clics de WhatsApp se miden como intención, nunca como Lead.
export function VslFunnel({ onReveal }: { onReveal?: () => void }) {
  const variants = getVslVariants();
  useEffect(() => {
    trackMeta("ViewContent", { content_name: "NitroBot VSL" });
  }, []);

  function handleFirstPlay() {
    trackMeta("NitroBotVSLPlay", { content_name: "NitroBot VSL" }, true);
    onReveal?.();
  }

  return (
    <div className="w-full">
      {variants ? <VslPlayer
        variants={variants}
        poster={getVslPoster()}
        unlockSeconds={VSL_UNLOCK_SECONDS}
        onFirstPlay={handleFirstPlay}
        onUnlock={() => trackMeta("NitroBotVSLUnlocked", { content_name: "NitroBot VSL", seconds: VSL_UNLOCK_SECONDS, source: "video" }, true)}
      /> : null}
      <div className="mt-5 rounded-2xl border border-primary/25 bg-primary/[0.04] p-5 text-center sm:p-7">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">¿Lo revisamos con tu negocio?</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/65">Mi asistente te atiende por WhatsApp, te orienta entre kit y planes y recoge tu ficha. Juan revisa y autoriza el alta.</p>
        <WhatsAppSalesLink context={{ kind: "evaluation" }} placement="vsl" onClick={() => onReveal?.()} className="mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-base font-bold text-ink hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto">
          <WhatsAppLogo className="size-5 shrink-0" mono title="" />
          Hablar por WhatsApp
        </WhatsAppSalesLink>
        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-xs text-white/60">
          <Link href={SALES_EVALUATION_HREF} className="underline underline-offset-4 hover:text-white">Prefiero el formulario</Link>
          <Link href="/nitro-complete/privacidad" className="underline underline-offset-4 hover:text-white">Privacidad de mis datos</Link>
        </div>
      </div>
    </div>
  );
}
