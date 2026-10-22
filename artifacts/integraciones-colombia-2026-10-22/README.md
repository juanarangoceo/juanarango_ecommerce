# Integraciones, voz y Colombia — 22-oct-2026

Entrega local de `/nitro-complete`, complementaria al rediseño de activación y
recargas. No hubo commits, despliegues ni cambios en NitroBot. La revisión del
producto fue de solo lectura; no se crearon pagos, llamadas, clonaciones ni guías.

## Evidencia

- `verification.json`: 20 comprobaciones en navegador con movimiento reducido.
- `verification-normal-motion.json`: las mismas 20 con movimiento normal.
- Ambas sobre el build final en `http://localhost:4321`, sin excepciones JS.
- Capturas de hero, voz, llamadas, pagos, seguimiento y herramientas en móvil y
  escritorio. Logos originales y retratos cargados; vista sin desbordamiento
  a 360, 390, 768 y 1440 px.
- Audio real Sara/Carlos: reproduce, pausa la otra muestra, no arranca solo;
  un fallo simulado permite abrir el archivo original. Las muestras se sirven
  como archivos estáticos locales; no usan un proveedor de IA.
- Campaña conservada en el enlace de WhatsApp al pulsarlo, cancelando navegación:
  no se abrió una conversación ni se enviaron mensajes.
- `build-web.log`: build final de 639 páginas. ESLint dirigido, TypeScript y
  `git diff --check` también en verde.
- Vendedor: `npm run check` (TypeScript, ESLint y 121 pruebas) y build en verde.
  Se actualizaron conocimiento y guía comercial, sin modificar integraciones.
- Repetido el recorrido empresarial sobre ambos builds: 21 comprobaciones
  correctas, almacenamiento PostgREST en memoria, firma, atribución, error y
  reintento, idempotencia y panel. Resultado actualizado en el directorio
  `../activacion-recargas-2026-10-22/`. No hubo formularios a bases reales.

## Reproducir

Con el build local iniciado en 4321:

```bash
REVIEW_ORIGIN=http://localhost:4321 node artifacts/integraciones-colombia-2026-10-22/verify-browser.mjs
REVIEW_ORIGIN=http://localhost:4321 NORMAL_MOTION=1 node artifacts/integraciones-colombia-2026-10-22/verify-browser.mjs
```

El script necesita el Chrome instalado en la ruta indicada en su inicio.
Solo navega, carga imágenes/audios locales y prueba controles. Al final solicita
una muestra inexistente para verificar el fallo: ese 404 es intencional.
Las capturas se renuevan con la última ejecución y los dos JSON se conservan.

## Alcance de las comprobaciones de integración

La lectura de configuración confirma que 17TRACK está conectado y disponible
para habilitar por tienda; no certifica cada guía/transportadora ni avisos reales.
Skydropx conserva habilitación y validaciones apagadas: creación de guías no
vendible todavía. Confío del vendedor respondió HTTP 200 en listado de tiendas;
esa prueba no certifica métodos habilitados ni el ciclo de cobro del comercio.
La web comunica las dependencias y saldos separados.

Fuentes, salvedades y procedencia de assets en `docs/producto/nitrobot.md` y
`docs/diseno-y-narrativa.md`. El origen HTTPS y la firma del receptor empresarial
productivo deben configurarse antes de publicar; el preview usa servicios
locales aislados según el README del recorrido de activación.
