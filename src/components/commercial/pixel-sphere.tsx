"use client";

import { useEffect, useRef } from "react";

export type PixelSphereShape =
  | "bolt"
  | "orb"
  | "pulse"
  | "wink"
  | "network"
  | "chat"
  | "spark"
  | "close"
  | "typing"
  | "ticks"
  | "bars"
  | "question"
  | "eyes"
  | "sleep";

/** Desplazamiento normalizado (-1..1) hacia el puntero, para la forma `eyes`. */
export type LookTarget = { x: number; y: number };

type Point = { x: number; y: number; alpha?: number };
type Particle = Point & { alpha: number; velocityX: number; velocityY: number };

const SIZE = 88;
// La esfera pasa la mayor parte del tiempo en reposo: ahí basta con ~26 FPS.
// Los 60 FPS se reservan para las transformaciones, que sí necesitan fluidez.
const IDLE_FRAME_MS = 1000 / 26;
const MORPH_DURATION = 1400;
const REFERENCE_FRAME_MS = 1000 / 60;

function makeOrb(): Point[] {
  const points: Point[] = [];
  for (let row = -5; row <= 5; row += 1) {
    for (let column = -5; column <= 5; column += 1) {
      const distance = Math.sqrt(column ** 2 + row ** 2);
      if (distance <= 5.2) {
        points.push({
          x: 44 + column * 6.2,
          y: 44 + row * 6.2,
          alpha: 0.5 + (1 - distance / 5.2) * 0.5,
        });
      }
    }
  }
  return points;
}

function makePulse(): Point[] {
  const points: Point[] = [];
  for (let step = 0; step < 36; step += 1) {
    const angle = (step / 36) * Math.PI * 2;
    points.push({ x: 44 + Math.cos(angle) * 30, y: 44 + Math.sin(angle) * 30, alpha: 0.76 });
  }
  for (let step = 0; step < 24; step += 1) {
    const angle = (step / 24) * Math.PI * 2;
    points.push({ x: 44 + Math.cos(angle) * 18, y: 44 + Math.sin(angle) * 18 });
  }
  points.push({ x: 40, y: 40 }, { x: 48, y: 40 }, { x: 40, y: 48 }, { x: 48, y: 48 });
  return points;
}

function makeWink(): Point[] {
  const points: Point[] = [];
  for (let step = 0; step < 32; step += 1) {
    const angle = (step / 32) * Math.PI * 2;
    points.push({ x: 44 + Math.cos(angle) * 29, y: 44 + Math.sin(angle) * 29, alpha: 0.68 });
  }
  for (let step = -2; step <= 2; step += 1) points.push({ x: 31 + step * 3.4, y: 35 + Math.abs(step) * 1.4 });
  for (let y = -1; y <= 1; y += 1) {
    for (let x = -1; x <= 1; x += 1) points.push({ x: 57 + x * 3, y: 36 + y * 3 });
  }
  for (let step = -5; step <= 5; step += 1) {
    points.push({ x: 44 + step * 4, y: 60 - (step ** 2) * 0.32 });
  }
  return points;
}

function addLine(points: Point[], from: Point, to: Point, steps: number) {
  for (let step = 0; step <= steps; step += 1) {
    const progress = step / steps;
    points.push({
      x: from.x + (to.x - from.x) * progress,
      y: from.y + (to.y - from.y) * progress,
      alpha: 0.72,
    });
  }
}

function makeNetwork(): Point[] {
  const points: Point[] = [];
  const nodes = [{ x: 25, y: 29 }, { x: 63, y: 29 }, { x: 44, y: 63 }];
  addLine(points, nodes[0], nodes[1], 9);
  addLine(points, nodes[1], nodes[2], 9);
  addLine(points, nodes[2], nodes[0], 9);
  nodes.forEach((node) => {
    for (let y = -1; y <= 1; y += 1) {
      for (let x = -1; x <= 1; x += 1) points.push({ x: node.x + x * 4, y: node.y + y * 4 });
    }
  });
  return points;
}

function makeChat(): Point[] {
  const points: Point[] = [];
  for (let x = 24; x <= 64; x += 5) points.push({ x, y: 25 }, { x, y: 53 });
  for (let y = 30; y <= 48; y += 5) points.push({ x: 22, y }, { x: 66, y });
  addLine(points, { x: 48, y: 54 }, { x: 57, y: 66 }, 4);
  addLine(points, { x: 57, y: 66 }, { x: 59, y: 53 }, 4);
  points.push({ x: 33, y: 39 }, { x: 44, y: 39 }, { x: 55, y: 39 });
  return points;
}

function makeSpark(): Point[] {
  const points: Point[] = [];
  const rays = [
    [{ x: 44, y: 13 }, { x: 44, y: 75 }],
    [{ x: 13, y: 44 }, { x: 75, y: 44 }],
    [{ x: 23, y: 23 }, { x: 65, y: 65 }],
    [{ x: 65, y: 23 }, { x: 23, y: 65 }],
  ] as const;
  rays.forEach(([from, to]) => addLine(points, from, to, 8));
  return points;
}

function makeClose(): Point[] {
  const points: Point[] = [];
  addLine(points, { x: 25, y: 25 }, { x: 63, y: 63 }, 12);
  addLine(points, { x: 63, y: 25 }, { x: 25, y: 63 }, 12);
  return points;
}

// Tres puntos de «escribiendo…». El rebote se aplica al dibujar.
function makeTyping(): Point[] {
  const points: Point[] = [];
  [28, 44, 60].forEach((cx) => {
    for (let y = -1; y <= 1; y += 1) {
      for (let x = -1; x <= 1; x += 1) points.push({ x: cx + x * 3.6, y: 46 + y * 3.6, alpha: x === 0 && y === 0 ? 1 : 0.8 });
    }
  });
  return points;
}

// Doble check de WhatsApp.
function makeTicks(): Point[] {
  const points: Point[] = [];
  addLine(points, { x: 16, y: 46 }, { x: 27, y: 57 }, 4);
  addLine(points, { x: 27, y: 57 }, { x: 50, y: 31 }, 8);
  addLine(points, { x: 36, y: 53 }, { x: 40, y: 57 }, 2);
  addLine(points, { x: 40, y: 57 }, { x: 70, y: 31 }, 9);
  return points;
}

// Barras que crecen: la calculadora.
function makeBars(): Point[] {
  const points: Point[] = [];
  [[24, 3], [36, 5], [48, 7], [60, 9]].forEach(([x, height]) => {
    for (let row = 0; row < height; row += 1) {
      points.push({ x: x - 2, y: 66 - row * 5 }, { x: x + 2.5, y: 66 - row * 5, alpha: 0.75 });
    }
  });
  return points;
}

function makeQuestion(): Point[] {
  const points: Point[] = [];
  for (let step = 0; step <= 12; step += 1) {
    const angle = Math.PI * 1.05 + (step / 12) * Math.PI * 1.45;
    points.push({ x: 44 + Math.cos(angle) * 12, y: 32 + Math.sin(angle) * 12 });
  }
  addLine(points, { x: 47, y: 43 }, { x: 44, y: 49 }, 2);
  addLine(points, { x: 44, y: 49 }, { x: 44, y: 55 }, 2);
  points.push({ x: 44, y: 65 }, { x: 47.5, y: 65, alpha: 0.7 }, { x: 44, y: 68.5, alpha: 0.7 });
  return points;
}

// Dos ojos. Las pupilas (los últimos 8 puntos) se desplazan hacia el puntero.
const EYE_CENTERS = [{ x: 30, y: 44 }, { x: 58, y: 44 }] as const;
function makeEyes(): Point[] {
  const points: Point[] = [];
  EYE_CENTERS.forEach((center) => {
    for (let step = 0; step < 14; step += 1) {
      const angle = (step / 14) * Math.PI * 2;
      points.push({ x: center.x + Math.cos(angle) * 11, y: center.y + Math.sin(angle) * 13, alpha: 0.6 });
    }
  });
  EYE_CENTERS.forEach((center) => {
    for (let y = 0; y <= 1; y += 1) {
      for (let x = 0; x <= 1; x += 1) points.push({ x: center.x - 1.7 + x * 3.4, y: center.y - 1.7 + y * 3.4 });
    }
  });
  return points;
}
const EYE_PUPIL_COUNT = 8;

// Rayo de Nitro (mismo contorno que nitro-mark.tsx) relleno de píxeles. Es el
// estado de reposo del asistente, a petición del usuario (25-09-2026).
const BOLT_POLYGON = [
  [18.4, 2.8], [5.9, 21.1], [14.7, 21.1], [12.4, 37.2], [26.1, 16.4], [17.1, 16.4], [20.3, 2.8],
] as const;

function insideBolt(x: number, y: number) {
  let inside = false;
  for (let i = 0, j = BOLT_POLYGON.length - 1; i < BOLT_POLYGON.length; j = i, i += 1) {
    const [xi, yi] = BOLT_POLYGON[i];
    const [xj, yj] = BOLT_POLYGON[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function makeBolt(scale = 1.95, offsetX = 44 - 16 * 1.95, offsetY = 44 - 20 * 1.95, alpha = 1): Point[] {
  const points: Point[] = [];
  const step = 2.2;
  for (let y = 1; y <= 39; y += step) {
    for (let x = 3; x <= 29; x += step) {
      if (insideBolt(x, y)) {
        points.push({ x: offsetX + x * scale, y: offsetY + y * scale, alpha: alpha * (0.72 + (1 - y / 40) * 0.28) });
      }
    }
  }
  return points;
}

// Rayo pequeño y tenue con una «z»: el asistente descansa.
function makeSleep(): Point[] {
  const points: Point[] = makeBolt(1.25, 26, 30, 0.45);
  addLine(points, { x: 58, y: 18 }, { x: 68, y: 18 }, 3);
  addLine(points, { x: 68, y: 18 }, { x: 58, y: 28 }, 3);
  addLine(points, { x: 58, y: 28 }, { x: 68, y: 28 }, 3);
  return points;
}

const ORB_POINTS = makeOrb();
const SHAPES: Record<PixelSphereShape, Point[]> = {
  bolt: makeBolt(),
  orb: ORB_POINTS,
  pulse: makePulse(),
  wink: makeWink(),
  network: makeNetwork(),
  chat: makeChat(),
  spark: makeSpark(),
  close: makeClose(),
  typing: makeTyping(),
  ticks: makeTicks(),
  bars: makeBars(),
  question: makeQuestion(),
  eyes: makeEyes(),
  sleep: makeSleep(),
};

// Formas que se animan por sí mismas o que descansan: no necesitan 60 FPS
// salvo durante la transformación.
const CALM_SHAPES = new Set<PixelSphereShape>(["bolt", "orb", "sleep"]);

export function PixelSphere({
  shape,
  className = "",
  lookRef,
}: {
  shape: PixelSphereShape;
  className?: string;
  lookRef?: React.RefObject<LookTarget | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapeRef = useRef(shape);
  const redrawRef = useRef<(() => void) | null>(null);
  const morphStartedRef = useRef(0);

  useEffect(() => {
    shapeRef.current = shape;
    morphStartedRef.current = performance.now();
    redrawRef.current?.();
  }, [shape]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles: Particle[] = ORB_POINTS.map((point) => ({
      ...point,
      alpha: 0,
      velocityX: 0,
      velocityY: 0,
    }));
    let frameId = 0;
    let width = SIZE;
    let lastDrawn = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || SIZE;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(width * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time: number) => {
      const scale = width / SIZE;
      const targets = SHAPES[shapeRef.current];
      const current = shapeRef.current;
      const isOrb = current === "orb" || current === "bolt";
      const pulse = reducedMotion.matches || !isOrb ? 1 : 1 + Math.sin(time / 720) * 0.035;
      const look = lookRef?.current;
      const pupilStart = targets.length - EYE_PUPIL_COUNT;
      const morphElapsed = time - morphStartedRef.current;
      // El paso de integración se escala con el tiempo real entre fotogramas
      // para que el reposo a 26 FPS conserve el mismo ritmo que a 60 FPS.
      const step = lastDrawn ? Math.min((time - lastDrawn) / REFERENCE_FRAME_MS, 4) : 1;
      lastDrawn = time;

      context.clearRect(0, 0, width, width);
      particles.forEach((particle, index) => {
        const hasTarget = index < targets.length;
        const target = targets[index % targets.length];
        let targetX = 44 + (target.x - 44) * pulse;
        let targetY = 44 + (target.y - 44) * pulse;
        if (hasTarget && !reducedMotion.matches) {
          if (current === "typing") {
            // Cada punto rebota con un desfase, como en WhatsApp.
            targetY -= Math.max(0, Math.sin(time / 170 - Math.floor(index / 9) * 0.9)) * 6;
          } else if (current === "eyes" && look && index >= pupilStart) {
            targetX += look.x * 5.5;
            targetY += look.y * 6.5;
          } else if (current === "sleep") {
            targetY += Math.sin(time / 1400) * 1.2;
          }
        }
        const targetAlpha = hasTarget ? (target.alpha ?? 1) : 0;
        const stagger = (index * 47) % 320;

        if (reducedMotion.matches) {
          particle.x = targetX;
          particle.y = targetY;
          particle.alpha = targetAlpha;
        } else if (morphElapsed >= stagger) {
          const damping = 0.84 ** step;
          particle.velocityX = (particle.velocityX + (targetX - particle.x) * 0.026 * step) * damping;
          particle.velocityY = (particle.velocityY + (targetY - particle.y) * 0.026 * step) * damping;
          particle.x += particle.velocityX * step;
          particle.y += particle.velocityY * step;
          particle.alpha += (targetAlpha - particle.alpha) * Math.min(0.065 * step, 1);
        }
        if (particle.alpha < 0.02) return;

        const x = particle.x * scale;
        const y = particle.y * scale;
        const pixelSize = (index % 7 === 0 ? 4.2 : 3.2) * scale;
        const brightness = Math.max(0, Math.min(1, (68 - particle.y) / 45));

        context.fillStyle = `rgba(183,255,42, ${particle.alpha * 0.13})`;
        context.fillRect(x - pixelSize, y - pixelSize, pixelSize * 2.2, pixelSize * 2.2);
        context.fillStyle = `rgba(${75 + brightness * 45}, 255, ${20 + brightness * 75}, ${particle.alpha})`;
        context.fillRect(x - pixelSize / 2, y - pixelSize / 2, pixelSize, pixelSize);
      });

      if (!reducedMotion.matches) frameId = window.requestAnimationFrame(loop);
    };

    // En reposo saltamos fotogramas; durante una transformación dibujamos todos.
    const loop = (time: number) => {
      const morphing = !CALM_SHAPES.has(shapeRef.current) || time - morphStartedRef.current < MORPH_DURATION;
      if (!morphing && lastDrawn && time - lastDrawn < IDLE_FRAME_MS) {
        frameId = window.requestAnimationFrame(loop);
        return;
      }
      draw(time);
    };

    const start = () => {
      if (frameId || reducedMotion.matches) return;
      lastDrawn = 0;
      frameId = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    // El canvas no gasta nada mientras la pestaña está oculta.
    const handleVisibility = () => {
      if (document.hidden) {
        stop();
        return;
      }
      // Al volver, la transformación en curso se reanuda desde cero para no
      // recuperar de golpe el tiempo transcurrido en segundo plano.
      morphStartedRef.current = performance.now();
      start();
    };

    resize();
    redrawRef.current = reducedMotion.matches ? () => draw(performance.now()) : null;
    draw(0);
    start();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      redrawRef.current = null;
    };
  }, [lookRef]);

  return <canvas ref={canvasRef} data-shape={shape} className={`block size-full ${className}`} aria-hidden="true" />;
}
