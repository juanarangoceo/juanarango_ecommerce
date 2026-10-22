"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AudioLines, Mic, PhoneIncoming } from "lucide-react";

const voices = [
  { id: "sara", name: "Sara", description: "Voz femenina colombiana" },
  { id: "carlos", name: "Carlos", description: "Voz masculina colombiana" },
] as const;

export function NitroVoiceShowcase() {
  const players = useRef<(HTMLAudioElement | null)[]>([]);
  const [failed, setFailed] = useState<string[]>([]);

  return (
    <section id="voz" className="scroll-mt-24 bg-ground px-5 py-16 text-ink lg:px-8 lg:py-24" data-nitro-orb="conversation">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-left">Tus clientes mandan audios.<br /><span className="text-nitro-text">Nitro también tiene voz.</span></h2>
          <p className="mx-auto max-w-lg text-pretty text-lg leading-8 text-ink/75 lg:mx-0 lg:justify-self-end">Responde notas de voz con una voz colombiana o con la tuya clonada. Y si el cliente llama a tu WhatsApp, Nitro puede contestar.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-[2rem] border border-line bg-white p-5 sm:p-8">
            <div className="flex items-center gap-3"><AudioLines className="size-5 text-nitro-text" aria-hidden="true" /><h3 className="text-xl font-semibold tracking-tight">Escucha cómo puede sonar tu asesor</h3></div>
            <p className="mt-2 text-sm leading-6 text-ink/65">Muestras de las voces sintéticas disponibles para notas de voz.</p>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              {voices.map((voice, index) => (
                <div key={voice.id}>
                  <div className="flex items-center gap-3">
                    <Image src={`/nitro/voces/${voice.id}.webp`} alt="" width={64} height={64} className="size-16 rounded-2xl object-cover" />
                    <div><p id={`voice-${voice.id}`} className="text-lg font-semibold">{voice.name}</p><p className="mt-0.5 text-xs leading-5 text-ink/65">{voice.description}</p></div>
                  </div>
                  <audio
                    ref={(element) => { players.current[index] = element; }}
                    controls
                    preload="none"
                    src={`/nitro/voces/${voice.id}.mp3`}
                    aria-labelledby={`voice-${voice.id}`}
                    className="mt-4 h-11 w-full min-w-0 [color-scheme:light]"
                    onPlay={() => players.current.forEach((player, otherIndex) => { if (otherIndex !== index) player?.pause(); })}
                    onError={() => setFailed((current) => current.includes(voice.id) ? current : [...current, voice.id])}
                  >
                    Tu navegador no permite reproducir audio.
                  </audio>
                  {failed.includes(voice.id) ? <p role="status" className="mt-2 text-xs leading-5 text-ink/70">No se pudo cargar la muestra. <a href={`/nitro/voces/${voice.id}.mp3`} className="underline underline-offset-2">Abrir audio de {voice.name}</a></p> : null}
                </div>
              ))}
            </div>
            <div className="mt-7 flex gap-3 border-t border-line pt-6">
              <Mic className="mt-0.5 size-5 shrink-0 text-nitro-text" aria-hidden="true" />
              <p className="text-sm leading-6 text-ink/75"><strong className="font-semibold text-ink">¿Prefieres tu propia voz?</strong> Nos compartes una grabación y tu autorización. Preparamos y probamos la voz clonada para responder audios.</p>
            </div>
          </div>

          <article className="relative flex flex-col overflow-hidden rounded-[2rem] bg-ink p-7 text-white sm:p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative flex items-center justify-between gap-4">
              <p className="text-lg font-semibold">Nitro Call</p>
              <span className="rounded-full border border-primary/25 px-3 py-1 text-xs font-medium text-primary">Llamadas por WhatsApp</span>
            </div>
            <div className="relative my-8 flex items-center justify-center gap-1.5" aria-hidden="true">
              {[14, 27, 43, 24].map((height, index) => <span key={index} className="w-1 rounded-full bg-primary/35" style={{ height }} />)}
              <span className="mx-5 flex size-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10"><PhoneIncoming className="size-8 text-primary" /></span>
              {[24, 43, 27, 14].map((height, index) => <span key={index} className="w-1 rounded-full bg-primary/35" style={{ height }} />)}
            </div>
            <h3 className="text-balance text-3xl font-semibold leading-tight tracking-tight">Te llaman.<br />Nitro contesta.</h3>
            <p className="mt-3 text-base leading-7 text-white/75">Atiende llamadas entrantes, conversa sobre tus productos y continúa la compra por escrito en el chat.</p>
            <p className="mt-6 border-t border-white/15 pt-5 text-sm leading-6 text-white/65"><strong className="font-semibold text-white">Se habilita por separado:</strong> eliges entre 8 voces para llamadas y recargas su saldo en COP. Se cobra por segundos; no consume turnos. La voz clonada de los audios no aplica a llamadas.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
