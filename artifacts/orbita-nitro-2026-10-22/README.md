# Nitro orbital — 22-oct-2026 (descartado por Juan)

**Propuesta retirada.** Se restauró Nitro 3D original y se reemplazó esta
composición por la franja de logos. La imagen se archivó aquí como
`nitro-orbita-colombia-v1-descartada.webp`; ya no se sirve desde `public/`.
El ensayo orbital describe el estado anterior y no aplica a la landing actual.
Ver `../franja-logos-2026-10-22/` para la entrega vigente.

Pieza solicitada por Juan: un Saturno con identidad Nitro para comunicar
contraentrega, pago anticipado y transportadoras cerca del comienzo de la web.

## Resultado

- Imagen en `public/nitro/nitro-orbita-colombia-v1.webp`, con transparencia real,
  1268 × 920 px y 211.528 bytes. Se recortaron solo márgenes transparentes y se
  convirtió a WebP para la aplicación; el original generado se conserva.
- Generación con la herramienta integrada `image_gen`, sin CLI ni API propia.
  Referencia: `public/nitro/nitro-base-1024.webp`. Prompt exacto: `prompt.txt`.
- Original: `/home/juan/.codex/generated_images/01a1647d-1f04-7de1-b0de-5068e0155c3a/exec-f7cf6dd5-5fd9-4d89-ab27-6b20436c60d8.png`.
- `NitroOrbitHero` integra la pieza en el hero de `/nitro-complete`, antes del
  video; reemplaza allí el gráfico vivo con ejemplos del panel. No modifica
  la home, los assets oficiales originales ni el producto NitroBot.
- Los rótulos y logos son HTML y assets auténticos existentes, no texto generado
  dentro del bitmap. Enlazan al recorrido de integraciones. Pago anticipado con
  cuenta Confío del comercio; seguimiento con 17TRACK, sujeto a conexión/saldo y
  disponibilidad por guía/transportadora. No simula transacciones o contratos.
- Se retiró «Con sonido» del subtexto del film y se abrevia el párrafo del hero.

## Verificación

`verify-hero.mjs` usa Chrome real y CDP, en solo lectura. Revisa carga de imagen
con texto alternativo/logos, posición antes del video, ambos métodos de pago,
retiro del texto, enlaces reales, acceso al recorrido y ausencia de desbordamiento
entre 360 y 1440 px. Comprueba que los dos rótulos no se superpongan y captura
consola/excepciones. Capturas escritorio/móvil y JSON de cada modo de movimiento.

```bash
REVIEW_ORIGIN=http://localhost:4321 node artifacts/orbita-nitro-2026-10-22/verify-hero.mjs
REVIEW_ORIGIN=http://localhost:4321 NORMAL_MOTION=1 node artifacts/orbita-nitro-2026-10-22/verify-hero.mjs
```

Requiere Chrome en la ruta indicada en el script y el servidor local iniciado.
No envía formularios, abre conversaciones de WhatsApp ni realiza cobros.
ESLint dirigido, TypeScript, build y `git diff --check` se verifican localmente.
El build final se registra en `build-web.log`. No hubo commits ni publicación.


Resultado final: 17 comprobaciones por modo de movimiento (34 en total), sobre
el build de 4321, sin errores de consola ni excepciones. Build de 639 páginas,
ESLint y TypeScript correctos. El log `build-web-network-retry.log` conserva un
primer intento interrumpido por cierre de conexión externa al generar un
artículo de blog; el reintento final terminó correctamente sin cambios en el blog.
