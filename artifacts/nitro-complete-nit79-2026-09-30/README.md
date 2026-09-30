# /nitro-complete con Nitro — validación del 30-09-2026 (NIT-79)

Capturas del servidor de desarrollo local (`localhost:4321`) a 1280, 900 y
390 px, tomadas con el Chromium de Playwright vía CDP (`capturas-cdp.mjs`,
sin dependencias). `hero-1280.png` es anterior a un ajuste menor: el ícono de
Nitro del primer chip ya no va dentro de un círculo verde (ver `hero-900.png`).

Comprobaciones hechas en el navegador:

- `scrollWidth` = ancho de ventana a 390, 900 y 1280 px (sin scroll horizontal).
- CLS medido con `PerformanceObserver` durante la carga del hero: 0,0000.
- Enter y Espacio sobre Nitro muestran la burbuja de WhatsApp; `tabIndex=0`.
- Con `prefers-reduced-motion: reduce` emulado: flotación, sombra, pulso y
  flotación del CTA en `none`; la mirada no se mueve sola y no parpadea en
  7 s. Sin reduced motion, la mirada autónoma y las animaciones corren.
- Calculadora: 100 y 1.400 conversaciones → Nitro 5K; 1.500 y 4.300 → 15K;
  4.400 y 8.600 → 30K; 8.700 y 10.000 → «Hablemos de un plan a medida».
- «Ver plan» lleva a `#plan-nitro-15k`, la tarjeta queda bajo el header y
  `:target` le pone un contorno de 3 px `rgb(183, 255, 42)`.

Para repetir (con `npm run dev -- -p 4321` corriendo):

```bash
SHOTS='#planes .grid' node artifacts/nitro-complete-nit79-2026-09-30/capturas-cdp.mjs \
  http://localhost:4321/nitro-complete 390 844 /tmp/nitro 0 "document.documentElement.scrollWidth"
```

Argumentos: URL, ancho, alto, prefijo de salida (`-` sin capturas), `1` para
emular reduced motion y expresiones JS a evaluar.
