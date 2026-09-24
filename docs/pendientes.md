# Pendientes

Estado vivo al 24 de septiembre de 2026. Lo terminado se elimina de aquí y se
registra en la bitácora correspondiente.

## Punto de reanudación para el siguiente agente

Estado al 24 de septiembre de 2026. Nitro Complete es el producto principal
del sitio (ver bitácora 2026-09). Por decisión del usuario, la reconstrucción
se consolida en commit y se publica en producción; la migración del
diagnóstico ya está aplicada en Supabase.

Pendiente inmediato:

1. Aprobación visual del usuario de `/` y `/nitro-complete` con la nueva
   paleta Nitro (`#B7FF2A`, `#111311`, `#FF6A13`, secciones claras).
2. Confirmar que `Nitro Complete` es el nombre comercial público y que los
   planes Nitro 5K/15K/30K y la implementación de $700.000 aplican a Nitro
   Complete (hoy `/nitrobot` y `/nitro-complete` comparten `nitroCompletePlans`).
3. Decidir el futuro de `/nitrobot`: mantenerla como página del asesor
   o redirigirla 301 a `/nitro-complete` después de revisar Search Console.
   `/nitrobot/conectar` y `/nitrobot/vsl` se conservan por campañas y contrato.
4. Llevar la paleta y la narrativa a `/soluciones`, NitroCommerce, Nitro
   Landing, `/sobre-mi`, `/nitrobot` y las plantillas del blog (tarjetas «Leer
   artículo» conservan un verde azulado heredado).
5. Sustituir las cifras de ejemplo de `NitroCompletePreview` por capturas reales
   del panel cuando haya permiso de un cliente, y sumar prueba verificable
   (casos con permiso y métricas).
6. Corregir el sitemap: incluye 26 `/blog/tags/*` que responden 404 (también
   en la versión anterior).
7. Tras el despliegue: comprobar canonical `www`, sitemap y Search Console.

Plan de reemplazo de `juanarangoecommerce.com`: consolidar commit en
`codex/reconstruccion-web`, preview por la integración Git de Vercel, revisar
las 25 rutas no-blog del sitemap actual y una muestra del blog en el preview,
merge a `master` y comprobar canonical `www`, sitemap y Search Console tras el
despliegue.

## Embudo comercial de NitroBot — antes de publicar

La landing, el calificador, la entrega firmada y el panel comercial ya están
implementados. El plan maestro sigue en
[`estrategia-nitrobot-embudo.md`](estrategia-nitrobot-embudo.md). Antes de
publicar hay que cerrar estas decisiones comerciales:

1. Aprobar nombres definitivos: `Nitro 5K`, `Nitro 15K`, `Nitro 30K` o nombres
   orientados a etapa. La recomendación del plan es conservar la capacidad en
   el nombre.
2. Confirmar las mensualidades propuestas: $590.000, $1.190.000 y $2.200.000
   COP.
3. Confirmar implementación estándar de $700.000 COP y qué condiciones sacan
   un caso de ese alcance.
4. Definir el nombre comercial exacto de la unidad que descuenta el contador.
5. Definir precio, vencimiento y comportamiento del bloque adicional de 2.000.

La tabla volvió a `/nitrobot` por decisión del usuario con las mensualidades y
la implementación propuestas. Antes del despliegue hay que ratificar nombres,
unidad de consumo, adicional y excepciones de alcance para que la información
pública coincida con el catálogo comercial definitivo. Estas decisiones no
cambian la seguridad ni la entrega del prospecto.

## Reconstrucción comercial — antes de integrar a `master`

La reconstrucción completa vive aislada en
`/home/juan/juanarangoecommerce-reconstruccion`, rama
`codex/reconstruccion-web`. No se ha creado commit, desplegado ni aplicado la
migración de Supabase.

1. Aprobar visualmente y ajustar el contenido de inicio, soluciones,
   industrias, casos y diagnóstico con datos comerciales reales.
   - La recuperación automatizada del 2 de septiembre verificó home,
     soluciones, industrias y las plantillas compartidas en escritorio y a
     390 px, sin overlays ni desbordamiento. Falta la aprobación perceptual del
     usuario en sus dispositivos.
   - Confirmar manualmente en escritorio y móvil el progreso ligado al scroll
     de `CommercialRouteVisual`; no reutilizar ese patrón hasta aprobarlo.
   - Probar la esfera de píxeles en un teléfono real y aprobar el ritmo de sus
     transformaciones, el guiño y el retorno al orbe.
2. Reemplazar las demostraciones declaradas por casos verificables solo cuando
   existan fuente, permiso y métricas comprobables.
3. Revisar Search Console y Analytics antes de retirar, redirigir o cambiar la
   indexación de rutas históricas. La reconstrucción conserva esas rutas.
4. Revisar y aprobar
   `supabase/migrations/20260826155922_commercial_diagnostics.sql` antes de
   aplicarla. Hasta entonces `ENABLE_DIAGNOSTIC_SUBMISSIONS` debe permanecer
   desactivada.
5. Rotar `NEXT_PUBLIC_SANITY_API_SECRET` y mover la autenticación de las
   herramientas internas de Sanity a código exclusivo del servidor. Un secreto
   nunca debe publicarse con el prefijo `NEXT_PUBLIC_`.
6. Resolver los hallazgos del audit de dependencias en una tarea separada y
   controlada; no ejecutar correcciones automáticas mayores junto con esta
   reconstrucción.
7. Integrar la rama únicamente después de revisar el diff contra el trabajo
   local de NitroBot que todavía no tiene commit.
8. Comprobar consumo y Web Vitals de la esfera en un build de producción y en
   un móvil de gama media o baja. El reposo a ~26 FPS, los 60 FPS reservados
   para las transformaciones y la pausa del `canvas` con la pestaña oculta ya
   están implementados en `src/components/commercial/pixel-sphere.tsx`; falta
   la medición en un dispositivo real.
   La medición local anterior mantuvo 60 FPS durante cinco segundos, sin
   fotogramas de más de 25 ms ni tareas largas. El chunk dinámico asociado pesa
   aproximadamente 5,6 KB comprimido y se carga 1,8 segundos después del
   contenido principal.
9. Decidir la segunda fase del asistente: mantenerlo como orientador de rutas o
   conectarlo a una conversación real. Hasta entonces no presentarlo como un
   agente de IA ni añadir un campo que simule enviar mensajes.

## Lanzamiento de NitroBot — sitio y campañas

1. Producir y aprobar el VSL de 55–70 segundos.
2. Subir el MP4 a Cloudinary y configurar `NEXT_PUBLIC_NITROBOT_VSL_ID`.
3. Configurar `NEXT_PUBLIC_META_PIXEL_ID`.
4. Confirmar que la Política de Privacidad cubra captación y contacto desde
   campañas de Meta.
5. Revisar el diff completo de `codex/reconstruccion-web`, crear un commit
   coherente y obtener un preview mediante la integración Git de Vercel.
6. En el preview, comprobar `/nitrobot`, `/nitrobot/conectar` y `/nitrobot/vsl`;
   el formulario puede permanecer en modo de revisión si las variables de
   captación existen únicamente en producción.
7. Fusionar a `master` solo después de aprobar el preview. No usar el CLI local
   ni publicar el árbol con cambios sin consolidar.
8. Después del despliegue real, enviar un único lead controlado y confirmar:
   - prospecto y timeline en `/admin/leads` de Nitro Bot;
   - atribución y resultado de calificación correctos;
   - ausencia de duplicado al reintentar la misma idempotencia;
   - función `nitrobot-lead-retry` sincronizada en Inngest;
   - evento estándar `Lead` en Meta cuando el Pixel esté activo.

El cierre técnico está en [`bitacora/2026-09.md`](bitacora/2026-09.md); el guion
del VSL y sus decisiones anteriores están en
[`bitacora/2026-08.md`](bitacora/2026-08.md).

## Mantenimiento técnico conocido

- Confirmar en Vercel que `AUDIO_GEN_USER` y `AUDIO_GEN_PASSWORD` estén
  definidas: `middleware.ts` cae a `admin/admin` cuando faltan.
- Depurar los hallazgos de `npm run lint` en el repositorio completo: 83
  errores y 19 avisos preexistentes, ninguno en los archivos nuevos de la
  reconstrucción. Va junto al mantenimiento de dependencias, no antes del
  lanzamiento.
- Actualizar `caniuse-lite` cuando se programe mantenimiento de dependencias.
- Migrar el uso obsoleto del export por defecto de `@sanity/image-url`.

Estos puntos no bloquean la landing: TypeScript, ESLint dirigido y build pasan.

## Pendientes heredados por revalidar

La antigua guía de Claude registraba estos puntos el 12 de junio. No se
comprobaron en la sesión de reorganización; verificar antes de ejecutarlos o
eliminarlos:

- `NEXT_PUBLIC_NITROBOT_WA` en Vercel.
- Cifras de la sección S2 de NitroBot únicamente con fuente verificable.
- Revisión de las conversaciones de ejemplo.
- Revisión visual de badges y espacios largos en clínicas, retail,
  inmobiliaria, guías y laboratorio.

El correo público ya fue confirmado como `juanarangoecommerce@gmail.com`; el
pendiente del antiguo buzón `hola@` queda cerrado para la interfaz. La ruta
`/laboratorio/nitro-dropshipping` requiere una ficha comercial propia antes de
publicarse: el 2 de septiembre se retiraron del recorrido comparativas,
testimonios y garantías no verificadas, pero precios, condiciones y alcance del
programa todavía deben contrastarse con una fuente autorizada.
