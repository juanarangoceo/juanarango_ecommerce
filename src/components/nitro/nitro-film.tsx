"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Captions, CaptionsOff, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { trackMeta } from "@/components/analytics/meta-pixel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FILM_MOBILE_QUERY, filmIds, filmPoster, filmUrl, type NitroFilm } from "@/lib/nitro-film";

// Videos del film de Nitro Complete (ver src/lib/nitro-film.ts).
//
// - NitroFilmPlayer: se reproduce al tocarlo, con sonido y subtítulos. El
//   archivo se elige y se descarga recién en ese momento (vertical en móvil si
//   existe), así que quien no lo ve no gasta datos.
// - NitroFilmTeaser: bucle silencioso para el hero; solo corre mientras está a
//   la vista y no corre con «reducir movimiento». Su botón abre el film completo
//   en una ventana.
//
// Medición (Meta Pixel, eventos propios): NitroFilmPlay y NitroFilmProgress
// (25/50/75/100 %), con el nombre de la pieza.

type Size = "inline" | "dialog";

/** Proporción y ancho de la caja según los formatos disponibles. Clases literales para Tailwind. */
function frameClass(film: NitroFilm, size: Size) {
  const { hasPortrait, hasLandscape } = filmIds(film);
  if (hasPortrait && hasLandscape)
    return size === "inline"
      ? "mx-auto aspect-[9/16] w-full max-w-[calc(78svh*9/16)] md:aspect-video md:max-w-none"
      : "aspect-[9/16] w-[min(94vw,calc(86svh*9/16))] md:aspect-video md:w-[min(94vw,1100px,calc(86svh*16/9))]";
  if (hasPortrait)
    return size === "inline"
      ? "mx-auto aspect-[9/16] w-full max-w-[calc(78svh*9/16)]"
      : "aspect-[9/16] w-[min(94vw,calc(86svh*9/16))]";
  return size === "inline" ? "aspect-video w-full" : "aspect-video w-[min(94vw,1100px,calc(86svh*16/9))]";
}

/** Portada por formato: <picture> sí respeta `media` (el atributo `poster` de <video> no). */
function FilmPoster({ film, hidden = false }: { film: NitroFilm; hidden?: boolean }) {
  const { landscape, portrait, hasPortrait } = filmIds(film);
  if (!landscape) return null;
  return (
    <picture className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${hidden ? "opacity-0" : "opacity-100"}`}>
      {hasPortrait && portrait ? <source media={FILM_MOBILE_QUERY} srcSet={filmPoster(portrait, film.posterAt, { portrait: true })} /> : null}
      {/* next/image no hace dirección de arte por media query; la portada ya viene optimizada por Cloudinary. */}
      <img src={filmPoster(landscape, film.posterAt, { portrait: !film.landscape })} alt="" className="size-full object-cover" loading="lazy" decoding="async" />
    </picture>
  );
}

function pickSource(film: NitroFilm, muted = false) {
  const { landscape, portrait, hasPortrait } = filmIds(film);
  const mobile = window.matchMedia(FILM_MOBILE_QUERY).matches;
  const usePortrait = (mobile && hasPortrait) || !film.landscape;
  return filmUrl(usePortrait && portrait ? portrait : landscape, { portrait: usePortrait, muted });
}

const formatTime = (s: number) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

export function NitroFilmPlayer({ film, size = "inline", autoStart = false, className = "" }: { film: NitroFilm; size?: Size; autoStart?: boolean; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // En la ventana del film arranca solo: la fuente se elige al montar (solo en
  // el cliente: la ventana no existe en el servidor) y el efecto da play.
  const [started, setStarted] = useState(autoStart);
  const [autoSrc] = useState(() => (autoStart ? pickSource(film) : undefined));
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const quartiles = useRef(new Set<number>());

  const start = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    // Una sola vez: girar el teléfono no cambia la fuente ni reinicia el video.
    if (!video.currentSrc) video.src = pickSource(film);
    setStarted(true);
    trackMeta("NitroFilmPlay", { content_name: film.name }, true);
    try {
      video.muted = false;
      await video.play();
      setMuted(false);
    } catch {
      // Sin permiso para sonido: arranca en silencio (con subtítulos) y se avisa.
      video.muted = true;
      setMuted(true);
      try {
        await video.play();
      } catch {
        setStarted(false);
      }
    }
  }, [film]);

  useEffect(() => {
    const video = videoRef.current;
    if (!autoStart || !video) return;
    trackMeta("NitroFilmPlay", { content_name: film.name }, true);
    video
      .play()
      .catch(() => {
        // Sin permiso para sonido: sigue en silencio (con subtítulos) y se avisa.
        video.muted = true;
        setMuted(true);
        return video.play();
      })
      .catch(() => setStarted(false));
  }, [autoStart, film.name]);

  // Subtítulos visibles u ocultos sin recargar la pista.
  const toggleCaptions = () => {
    const next = !captions;
    setCaptions(next);
    const video = videoRef.current;
    if (!video || !video.textTracks.length) return;
    video.textTracks[0].mode = next ? "showing" : "hidden";
  };

  const onTime = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setCurrent(video.currentTime);
    const pct = (video.currentTime / video.duration) * 100;
    for (const q of [25, 50, 75]) {
      if (pct >= q && !quartiles.current.has(q)) {
        quartiles.current.add(q);
        trackMeta("NitroFilmProgress", { content_name: film.name, percent: q }, true);
      }
    }
  };

  const onEnded = () => {
    setPlaying(false);
    if (!quartiles.current.has(100)) {
      quartiles.current.add(100);
      trackMeta("NitroFilmProgress", { content_name: film.name, percent: 100 }, true);
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

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black ${frameClass(film, size)} ${className}`}>
      <video
        ref={videoRef}
        src={autoSrc}
        playsInline
        preload={autoStart ? "auto" : "none"}
        className="size-full object-cover"
        onClick={started ? togglePlay : undefined}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={onTime}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={onEnded}
      >
        {film.captions ? <track kind="captions" src={film.captions} srcLang="es" label="Español" default /> : null}
      </video>

      {!started && (
        <>
          <FilmPoster film={film} />
          <button
            type="button"
            onClick={() => void start()}
            aria-label={`Reproducir el video (${film.duration})`}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/35 transition-colors hover:bg-black/25"
          >
            <span className="flex size-18 items-center justify-center rounded-full bg-primary text-ink transition-transform duration-300 group-hover:scale-110 md:size-22">
              <Play className="ml-1 size-8 fill-current md:size-9" aria-hidden="true" />
            </span>
            <span className="rounded-full bg-black/60 px-3 py-1 text-sm font-semibold text-white">
              {film.captions ? "Ver con sonido" : "Ver el video"} · {film.duration}
            </span>
          </button>
        </>
      )}

      {started && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-10">
          <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-white/20">
            <div className="h-full bg-primary transition-[width] duration-300 ease-linear" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center gap-3 text-white">
            <button type="button" onClick={togglePlay} aria-label={playing ? "Pausar" : "Reproducir"} className="hover:text-primary">
              {playing ? <Pause className="size-5" /> : <Play className="size-5 fill-current" />}
            </button>
            <button type="button" onClick={toggleMute} aria-label={muted ? "Activar sonido" : "Silenciar"} className="hover:text-primary">
              {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
            </button>
            {film.captions ? (
              <button type="button" onClick={toggleCaptions} aria-label={captions ? "Ocultar subtítulos" : "Mostrar subtítulos"} aria-pressed={captions} className="hover:text-primary">
                {captions ? <Captions className="size-5" /> : <CaptionsOff className="size-5" />}
              </button>
            ) : null}
            <span className="font-mono text-xs tabular-nums text-white/80">
              {formatTime(current)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      )}

      {started && muted && (
        <button type="button" onClick={toggleMute} className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-ink">
          <VolumeX className="size-4" aria-hidden="true" /> Toca para activar el sonido
        </button>
      )}
    </div>
  );
}

export function NitroFilmTeaser({ teaser, full }: { teaser: NitroFilm; full: NitroFilm }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);

  // Bucle silencioso: fuente elegida en el cliente y solo mientras se ve.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.currentSrc) video.src = pickSource(teaser, true);
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [teaser]);

  // El bucle se detiene mientras la ventana del film está abierta.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (open) video.pause();
    else if (video.currentSrc) void video.play().catch(() => undefined);
  }, [open]);

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="pointer-events-none absolute inset-x-0 top-[10%] mx-auto aspect-square w-[80%] rounded-full bg-primary/[0.08] blur-[90px]" aria-hidden="true" />
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[calc(62svh*9/16)] overflow-hidden rounded-3xl border border-white/10 bg-black md:aspect-video md:max-w-none">
        <video ref={videoRef} muted loop playsInline preload="none" aria-hidden="true" className="size-full object-cover" onPlaying={() => setPlaying(true)} />
        <FilmPoster film={teaser} hidden={playing} />
        <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-ink transition hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <Play className="size-4 fill-current" aria-hidden="true" />
            Ver cómo funciona · {full.duration}
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent aria-describedby={undefined} className="w-auto max-w-none gap-0 overflow-hidden border-white/10 bg-black p-0 sm:rounded-2xl [&>button:last-child]:z-20 [&>button:last-child]:rounded-full [&>button:last-child]:bg-black/70 [&>button:last-child]:p-2 [&>button:last-child]:text-white [&>button:last-child]:opacity-100">
          <DialogTitle className="sr-only">Nitro Complete en {full.duration}</DialogTitle>
          {open ? <NitroFilmPlayer film={full} size="dialog" autoStart className="rounded-none border-0" /> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
