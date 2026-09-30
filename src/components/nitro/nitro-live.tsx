"use client";

/* Las capas son PNG/WebP locales con posiciones exactas en % del lienzo;
   next/image no aporta nada aquí y rompería el apilado absoluto. */
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./nitro-live.module.css";

// NitroLive — Nitro, el personaje de Nitro Complete, en el hero (NIT-79).
// Capas en /public/nitro/live, lienzo cuadrado 980×980:
//   shadow          sombra de contacto (fuera del flotado)
//   body            Nitro con las cuencas vacías
//   iris-l / iris-r iris que se mueven dentro de cada cuenca (clip-path elíptico)
//   sheen           reflejos del vidrio (screen), fijos sobre los iris
//   glow            brillo de la banda (screen), pulsa
// Se renderiza en el servidor con los ojos al centro: el HTML inicial ya ocupa
// su tamaño final y la hidratación solo añade el movimiento (CLS 0).

const LINES = [
  "¡Hola! Soy Nitro.",
  "Respondo tus chats 24/7.",
  "Confirmo pedidos antes del despacho.",
  "Retomo las ventas que quedaron pendientes.",
] as const;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

type Props = {
  className?: string;
  /** Hora que se muestra en la burbuja de WhatsApp. */
  time?: string;
  /** Saludo automático al montar. */
  greetOnMount?: boolean;
};

export function NitroLive({ className, time = "10:14 p. m.", greetOnMount = true }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const irisL = useRef<HTMLDivElement>(null);
  const irisR = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  const [blink, setBlink] = useState(false);
  const [happy, setHappy] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const lineIdx = useRef(0);
  const target = useRef({ x: 0, y: 0, last: 0 });
  const reduce = useRef(false);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  // setTimeout que se cancela solo al desmontar.
  const later = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
    return id;
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  // Mirada: sigue al cursor o al dedo. El loop solo corre mientras los ojos se
  // mueven y el hero está en pantalla; en reposo no consume frames.
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let running = false;
    let visible = true;

    const tick = () => {
      const t = target.current;
      cx += (t.x - cx) * 0.14;
      cy += (t.y - cy) * 0.14;
      if (irisL.current) irisL.current.style.transform = `translate(${(cx * 10.6).toFixed(2)}%, ${(cy * 10.2).toFixed(2)}%)`;
      if (irisR.current) irisR.current.style.transform = `translate(${(cx * 12.4).toFixed(2)}%, ${(cy * 8.5).toFixed(2)}%)`;
      if (headRef.current) headRef.current.style.transform = `translate(${(cx * 1.2).toFixed(2)}%, ${(cy * 0.8).toFixed(2)}%) rotate(${(cx * 3).toFixed(2)}deg)`;
      const settled = Math.abs(t.x - cx) < 0.001 && Math.abs(t.y - cy) < 0.001;
      running = visible && !settled;
      if (running) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (running || !visible) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const aim = (clientX: number, clientY: number) => {
      const r = stageRef.current?.getBoundingClientRect();
      if (!r) return;
      const ox = r.left + r.width * 0.5;
      const oy = r.top + r.height * 0.42;
      const dx = (clientX - ox) / (Math.max(window.innerWidth, 600) * 0.45);
      const dy = (clientY - oy) / (Math.max(window.innerHeight, 500) * 0.45);
      const m = Math.hypot(dx, dy);
      const k = m > 1 ? 1 / m : 1;
      target.current = { x: dx * k, y: dy * k, last: performance.now() };
      kick();
    };
    const onPointer = (e: PointerEvent) => aim(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) aim(t.clientX, t.clientY);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
      else {
        cancelAnimationFrame(raf);
        running = false;
      }
    });
    if (stageRef.current) io.observe(stageRef.current);

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    // Mirada autónoma cuando nadie interactúa (nunca con reduced motion).
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const idle = () => {
      if (visible && performance.now() - target.current.last > 2500) {
        if (Math.random() < 0.3) target.current = { ...target.current, x: 0, y: 0 };
        else {
          const a = Math.random() * Math.PI * 2;
          const d = 0.3 + Math.random() * 0.6;
          target.current = { ...target.current, x: Math.cos(a) * d, y: Math.sin(a) * d * 0.7 };
        }
        kick();
      }
      idleTimer = setTimeout(idle, 1400 + Math.random() * 1800);
    };
    if (!reduce.current) idle();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  const doBlink = useCallback(() => {
    setBlink(true);
    later(() => setBlink(false), 130);
  }, [later]);

  // Parpadeo periódico (nunca con reduced motion).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      doBlink();
      if (Math.random() < 0.2) later(doBlink, 260);
      t = setTimeout(loop, 2600 + Math.random() * 3600);
    };
    t = setTimeout(loop, 1800);
    return () => clearTimeout(t);
  }, [doBlink, later]);

  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const greet = useCallback(() => {
    setBubble(LINES[lineIdx.current % LINES.length]);
    lineIdx.current += 1;
    setHappy(true);
    if (!reduce.current) doBlink();
    const f = floatRef.current;
    if (f && !reduce.current) {
      f.classList.remove(styles.hop);
      void f.offsetWidth; // reinicia la animación
      f.classList.add(styles.hop);
      later(() => f.classList.remove(styles.hop), 620);
    }
    clearTimeout(hideTimer.current);
    hideTimer.current = later(() => {
      setBubble(null);
      setHappy(false);
    }, 2600);
  }, [doBlink, later]);

  useEffect(() => {
    if (!greetOnMount) return;
    const t = setTimeout(greet, 900);
    return () => clearTimeout(t);
  }, [greet, greetOnMount]);

  return (
    <div
      ref={stageRef}
      className={[styles.stage, blink && styles.blink, happy && styles.happy, className].filter(Boolean).join(" ")}
      role="button"
      tabIndex={0}
      aria-label="Nitro, tu asesor de ventas. Tócalo para saludar."
      onClick={greet}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          greet();
        }
      }}
    >
      <img className={styles.shadow} src="/nitro/live/shadow.webp" alt="" width={980} height={980} decoding="async" />
      <div ref={floatRef} className={styles.float}>
        <div ref={headRef} className={styles.head}>
          <img src="/nitro/live/body.webp" alt="" width={980} height={980} fetchPriority="high" />
          <div className={`${styles.socket} ${styles.socketL}`}>
            <div className={styles.lid}>
              <div ref={irisL} className={styles.iris}><img src="/nitro/live/iris-l.webp" alt="" /></div>
            </div>
          </div>
          <div className={`${styles.socket} ${styles.socketR}`}>
            <div className={styles.lid}>
              <div ref={irisR} className={styles.iris}><img src="/nitro/live/iris-r.webp" alt="" /></div>
            </div>
          </div>
          <img className={styles.sheen} src="/nitro/live/sheen.webp" alt="" width={980} height={980} decoding="async" />
          <img className={styles.glow} src="/nitro/live/glow.webp" alt="" width={980} height={980} decoding="async" />
        </div>
      </div>

      <div className={`${styles.bubble} ${bubble ? styles.show : ""}`} aria-live="polite">
        <div className={styles.bubbleHead}><WhatsAppIcon className={styles.wa} /><span>WhatsApp</span></div>
        <p>{bubble ?? ""}</p>
        <span className={styles.meta}>
          {time}
          <svg className={styles.ticks} viewBox="0 0 16 11" aria-hidden="true">
            <path d="M11.07.65 4.6 7.12 2.02 4.54.96 5.6l3.64 3.64 7.53-7.53L11.07.65Zm3.87 0L8.47 7.12l-.6-.6-1.06 1.06 1.66 1.66L16 1.71 14.94.65Z" fill="#53BDEB" />
          </svg>
        </span>
      </div>
    </div>
  );
}
