/**
 * Film de lanzamiento de Nitro Complete en la web (home, /nitro-complete y
 * /nitrobot). Los videos salen de `nitro_video_studio` (`out/deliver/`, commit
 * 1531ae0) y viven en Cloudinary; aquí solo va su public id con versión (lo que
 * está entre `upload/` y `.mp4` en el enlace de Cloudinary). No son secretos.
 *
 * Cada pieza tiene versión horizontal (escritorio) y, si existe, vertical
 * (móvil). Los subtítulos son del film con voz y sirven para ambos formatos
 * (misma línea de tiempo). Si se cambia el film, se regeneran en el estudio con
 * `npm run captions` y se copian a `public/videos/`.
 */

const CLOUDINARY_CLOUD = "dohwyszdj";
const BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload`;

/** Ancho máximo del móvil, alineado con el breakpoint `md` de Tailwind (768px). */
export const FILM_MOBILE_QUERY = "(max-width: 767px)";

export interface NitroFilm {
  /** Public id horizontal (16:9), con versión. */
  landscape: string;
  /** Public id vertical (9:16), con versión. Opcional. */
  portrait?: string;
  /** Subtítulos (mismo dominio: un <track> de otro origen exige CORS). */
  captions?: string;
  /** Duración para mostrar («1:26»). */
  duration: string;
  /** Segundo que se usa como portada. */
  posterAt: number;
  /** Nombre para la medición (Meta Pixel). */
  name: string;
}

export const NITRO_FILMS = {
  /** Film completo con voz (86 s): /nitro-complete y la ventana del hero de la home. */
  full: {
    landscape: "v1791303852/nitro-complete-launch-film-16x9-con-voz_gqpckh",
    portrait: "v1791302977/nitro-complete-launch-film-9x16-con-voz_jdqj5e",
    captions: "/videos/nitro-complete-film.es.vtt",
    duration: "1:26",
    posterAt: 15,
    name: "Nitro Complete film",
  },
  /** Cutdown de 15 s sin voz: bucle silencioso del hero de la home. */
  teaser: {
    landscape: "v1791302976/nitro-complete-15s-16x9-sin-narracion_ktnnhp",
    portrait: "v1791302975/nitro-complete-15s-9x16-sin-narracion_kkgvw0",
    duration: "0:15",
    posterAt: 7,
    name: "Nitro Complete 15s",
  },
  /** Cutdown de 30 s sin voz: /nitrobot. */
  cut30: {
    landscape: "v1791302977/nitro-complete-30s-16x9-sin-narracion_wzjsvd",
    duration: "0:30",
    posterAt: 14.5,
    name: "Nitro Complete 30s",
  },
} satisfies Record<string, NitroFilm>;

export type NitroFilmKey = keyof typeof NITRO_FILMS;

/** Versión que corresponde a la pantalla: vertical en móvil si existe; si falta una, la otra. */
export function filmIds(film: NitroFilm) {
  const landscape = film.landscape || film.portrait || "";
  const portrait = film.portrait || film.landscape;
  return { landscape, portrait, hasPortrait: Boolean(film.portrait), hasLandscape: Boolean(film.landscape) };
}

/**
 * URL del video. `muted` quita la pista de audio (bucles silenciosos: menos
 * peso). Cloudinary entrega WebM/H.265/H.264 según el navegador (f_auto).
 */
export function filmUrl(id: string, { portrait, muted = false }: { portrait: boolean; muted?: boolean }) {
  const size = portrait ? "w_720,br_1000k" : "w_1280,br_1600k";
  return `${BASE}/f_auto:video,q_auto:good,${size}${muted ? ",ac_none" : ""}/${id}.mp4`;
}

/** Fotograma del video como imagen de portada. */
export function filmPoster(id: string, at: number, { portrait }: { portrait: boolean }) {
  return `${BASE}/so_${at},f_auto,q_auto:good,w_${portrait ? 720 : 1280}/${id}.jpg`;
}
