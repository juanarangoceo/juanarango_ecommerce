# Nitro 3D original y fila de logos — 22-oct-2026

Entrega vigente tras el rechazo de la composición tipo Saturno.

- Se restaura `NitroHero`/`NitroLive` con sus assets, capas, mirada, flotación y
  saludo originales; no se modificaron esos componentes ni sus imágenes.
- Se retira la composición orbital y su imagen de la aplicación. Su evidencia
  queda archivada en `../orbita-nitro-2026-10-22/`, marcada como descartada.
- Debajo del header de `/nitro-complete` se incorpora una fila de 18 logos
  existentes: canales, Confío, siete medios de pago, 17TRACK y siete
  transportadoras contempladas para seguimiento. No son clientes ni alianzas
  comerciales propias. Las condiciones siguen en el recorrido de integraciones.
- Todos caben en escritorio ancho. En móvil la fila se desliza horizontalmente,
  con foco y acceso por teclado, sin encoger los logos hasta hacerlos ilegibles.
- Sin carrusel automático, nuevas dependencias, generación de imagen o APIs.
- «Con sonido» continúa retirado del film.

## Verificación

`verify-browser.mjs`: Chrome real por CDP; solo lectura, sin formularios ni
mensajes. Revisa 18 logos en una fila, su posición justo bajo el header,
ausencia de desbordamiento entre 360 y 1440 px, acceso al último logo en móvil,
carga de imágenes, Nitro original y saludo funcional, preferencias de movimiento,
retiro de Saturno y texto del film, consola y excepciones.

```bash
REVIEW_ORIGIN=http://localhost:4321 node artifacts/franja-logos-2026-10-22/verify-browser.mjs
REVIEW_ORIGIN=http://localhost:4321 NORMAL_MOTION=1 node artifacts/franja-logos-2026-10-22/verify-browser.mjs
```

Requiere Chrome en la ruta del script y servidor local iniciado. Capturas y
JSON de verificación se guardan aquí. `build-web.log` contiene el build final.
ESLint dirigido, TypeScript y `git diff --check` se verificaron localmente.
No hubo pagos, mensajes, formularios reales, commits, despliegues ni cambios en
NitroBot. El preview conserva los receptores de prueba aislados de la sesión.


Resultado final sobre el build de 4321: 19 comprobaciones con movimiento
reducido y otras 19 normal (38 total), sin errores de consola ni excepciones.
Build de 639 páginas, ESLint y TypeScript correctos. NitroBot conserva su árbol
sin cambios; no se consultaron ni modificaron sus servicios en este ajuste.
