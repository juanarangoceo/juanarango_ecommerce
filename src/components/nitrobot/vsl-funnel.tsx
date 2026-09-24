"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { trackMeta } from "@/components/analytics/meta-pixel";
import { NitroBotForm } from "@/components/nitrobot/nitrobot-form";
import { VslPlayer } from "@/components/nitrobot/vsl-player";
import { VSL_UNLOCK_SECONDS, getVslPoster, getVslVariants } from "@/lib/nitrobot-vsl";

/**
 * Embudo de la landing de campaña: video como demostración y formulario como
 * siguiente paso.
 *
 * El formulario se desbloquea tras los primeros segundos del video o cuando la
 * persona expresa intención con el CTA. Al aparecer, desplazamos la página para
 * que el formulario tome el foco y el encabezado deje de competir por espacio.
 */
interface VslFunnelProps {
  onReveal?: () => void;
}

export function VslFunnel({ onReveal }: VslFunnelProps) {
  const [unlocked, setUnlocked] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const variants = getVslVariants();
  const poster = getVslPoster();

  useEffect(() => {
    trackMeta("ViewContent", { content_name: "NitroBot VSL" });
  }, []);

  const handleFirstPlay = () => {
    trackMeta("NitroBotVSLPlay", { content_name: "NitroBot VSL" }, true);
  };

  const handleUnlock = (source: "video" | "cta") => {
    if (unlocked) return;

    setUnlocked(true);
    onReveal?.();
    trackMeta(
      "NitroBotVSLUnlocked",
      { content_name: "NitroBot VSL", seconds: VSL_UNLOCK_SECONDS, source },
      true
    );

    window.setTimeout(() => {
      const form = formRef.current;
      if (!form) return;

      const top = window.scrollY + form.getBoundingClientRect().top - 16;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }, 300);
  };

  const handleFormStart = () => {
    trackMeta("NitroBotFormStart", { content_name: "NitroBot VSL" }, true);
  };

  const handleFormProgress = (step: number) => {
    trackMeta(
      "NitroBotFormStep",
      { content_name: "NitroBot VSL", step },
      true
    );
  };

  const handleLead = () => {
    trackMeta("Lead", { content_name: "NitroBot VSL" });
  };

  return (
    <div className="w-full">
      <VslPlayer
        variants={variants}
        poster={poster}
        unlockSeconds={VSL_UNLOCK_SECONDS}
        onFirstPlay={handleFirstPlay}
        onUnlock={() => handleUnlock("video")}
      />

      {!unlocked && (
        <div className="mt-5 flex flex-col items-center gap-2 text-center">
          <button
            type="button"
            onClick={() => handleUnlock("cta")}
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 sm:px-6 sm:text-base"
          >
            <span className="sm:hidden">Ver si sirve para mi negocio</span>
            <span className="hidden sm:inline">Ver si NitroBot sirve para mi negocio</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
          <p className="text-xs text-white/45">Evaluación sin costo · Resultado inmediato · 1–2 minutos</p>
        </div>
      )}

      <AnimatePresence>
        {unlocked && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-10"
          >
            <div className="flex flex-col items-center gap-3 mb-8">
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-10 w-10 items-center justify-center"
              >
                <ArrowDown className="w-5 h-5 text-primary" />
              </motion.span>
              <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">
                Comprueba si NitroBot encaja en tu operación
              </h2>
              <p className="text-muted-foreground text-center max-w-lg">
                Evaluamos catálogo, demanda y capacidad operativa. Verás una recomendación al
                terminar; si hay encaje, revisamos contigo la conexión por WhatsApp.
              </p>
            </div>

            <div className="border-t border-primary/25 pt-8">
              <NitroBotForm
                source="nitrobot_vsl_meta"
                onStart={handleFormStart}
                onProgress={handleFormProgress}
                onSuccess={handleLead}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
