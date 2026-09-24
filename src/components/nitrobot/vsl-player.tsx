"use client";

import { useRef, useState } from "react";
import { MessageCircle, Pause, Play, Volume2, VolumeX } from "lucide-react";

interface VslPlayerProps {
  /** URLs de Cloudinary por calidad. `null` = video aún no configurado. */
  variants: { mobile: string; desktop: string } | null;
  poster: string;
  /** Segundos de reproducción real necesarios para desbloquear el formulario. */
  unlockSeconds: number;
  onFirstPlay?: () => void;
  onUnlock: () => void;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function WhatsAppBadge() {
  return (
    <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-black/80 px-3 py-1.5 text-[11px] font-semibold text-white/84 backdrop-blur-sm">
      <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" aria-hidden="true" />
      Demo: del mensaje al pedido
    </span>
  );
}

export function VslPlayer({
  variants,
  poster,
  unlockSeconds,
  onFirstPlay,
  onUnlock,
}: VslPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [remaining, setRemaining] = useState(unlockSeconds);

  // Tiempo realmente visto. Vive en un ref porque se actualiza varias veces por
  // segundo y solo necesitamos el estado para pintar el contador.
  const watchedRef = useRef(0);
  const lastTimeRef = useRef(0);
  const unlockedRef = useRef(false);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    setCurrentTime(video.currentTime);

    const delta = video.currentTime - lastTimeRef.current;
    lastTimeRef.current = video.currentTime;

    // Solo cuenta el avance natural. Descarta saltos (buffering, cambios de
    // pestaña) para que los 10 segundos sean de video visto de verdad.
    if (delta <= 0 || delta > 1.5) return;

    watchedRef.current += delta;
    setRemaining(Math.max(0, Math.ceil(unlockSeconds - watchedRef.current)));

    if (!unlockedRef.current && watchedRef.current >= unlockSeconds) {
      unlockedRef.current = true;
      onUnlock();
    }
  };

  const startPlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    // El archivo se asigna aquí, no al renderizar: la calidad se elige según la
    // pantalla real y el video solo se descarga cuando alguien decide verlo,
    // así que quien rebota no gasta datos ni ancho de banda. Asignarlo una sola
    // vez evita que girar el teléfono cambie la fuente y reinicie la
    // reproducción.
    if (!video.currentSrc && variants) {
      video.src = window.matchMedia("(max-width: 768px)").matches
        ? variants.mobile
        : variants.desktop;
    }

    setStarted(true);
    onFirstPlay?.();

    try {
      video.muted = false;
      await video.play();
      setMuted(false);
    } catch {
      // Si el navegador rechaza el audio, arranca en silencio y que la persona
      // lo active. Mejor eso que quedarse sin reproducción.
      video.muted = true;
      setMuted(true);
      try {
        await video.play();
      } catch {
        setStarted(false);
      }
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Video pendiente de subir: panel de prueba para poder revisar el embudo.
  if (!variants) {
    return (
      <div className="relative w-full aspect-video rounded-2xl border-2 border-dashed border-border bg-secondary/40 flex flex-col items-center justify-center p-6 text-center">
        <WhatsAppBadge />
        <p className="text-muted-foreground text-sm max-w-md">
          Video pendiente. Sube el VSL a Cloudinary y define{" "}
          <code className="text-primary font-mono text-xs">NEXT_PUBLIC_NITROBOT_VSL_ID</code>{" "}
          con su public id para que aparezca aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-border shadow-2xl shadow-primary/10">
        <WhatsAppBadge />
        <video
          ref={videoRef}
          poster={poster || undefined}
          playsInline
          preload="none"
          className="w-full h-full object-cover"
          onClick={started ? togglePlay : undefined}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />

        {/* Reposo: portada + botón de reproducción */}
        {!started && (
          <button
            onClick={startPlayback}
            aria-label="Reproducir el video"
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 bg-black/50 hover:bg-black/40 transition-colors group"
          >
            <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground fill-current ml-1" />
            </span>
            <span className="text-foreground font-semibold text-base md:text-lg">
              Ver el video
            </span>
            <span className="text-muted-foreground text-xs md:text-sm">
              Con sonido · dura lo justo
            </span>
          </button>
        )}

        {/* Controles mínimos: sin barra de búsqueda, para que el video se vea en orden */}
        {started && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 pt-10 pb-3">
            <div className="h-1 w-full rounded-full bg-white/20 overflow-hidden mb-3">
              <div
                className="h-full bg-primary transition-[width] duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pausar" : "Reproducir"}
                className="text-white hover:text-primary transition-colors"
              >
                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={muted ? "Activar sonido" : "Silenciar"}
                className="text-white hover:text-primary transition-colors"
              >
                {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <span className="text-white/80 text-xs font-mono tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        )}

        {/* Aviso grande cuando el audio quedó silenciado por el navegador */}
        {started && muted && (
          <button
            onClick={toggleMute}
            className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full shadow-lg animate-pulse"
          >
            <VolumeX className="w-4 h-4" /> Toca para activar el sonido
          </button>
        )}
      </div>

      {/* Anticipación: qué pasa cuando termine de ver los primeros segundos */}
      {started && remaining > 0 && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          En <span className="text-primary font-semibold tabular-nums">{remaining}s</span> te
          muestro cómo pedir tu diagnóstico sin costo.
        </p>
      )}
    </div>
  );
}
