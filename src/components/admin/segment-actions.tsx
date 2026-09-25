"use client";

import { useState, useTransition } from "react";
import { Loader2, Send } from "lucide-react";
import { pushSegment } from "@/app/(admin)/admin/actions";

export function PushSegmentButton({ segmentId, enabled, count }: { segmentId: string; enabled: boolean; count: number }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        disabled={!enabled || pending || count === 0}
        title={enabled ? "Crea o actualiza el segmento en Resend" : "Activa RESEND_CRM_SYNC=true para conectar Resend"}
        onClick={() =>
          startTransition(async () => {
            const result = await pushSegment(segmentId);
            setMessage(result.ok ? `${result.data?.synced ?? 0} contactos enviados a Resend.` : result.error);
          })
        }
        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 px-3 text-xs text-white/70 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />} Enviar a Resend
      </button>
      {message ? <p className="text-[11px] text-white/55">{message}</p> : null}
    </div>
  );
}
