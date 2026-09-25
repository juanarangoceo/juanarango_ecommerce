# Pendientes

Estado vivo al 25 de septiembre de 2026. Lo terminado se elimina de aquí y se
registra en la bitácora correspondiente.

## Punto de reanudación para el siguiente agente

La reconstrucción está en producción desde el 24-25 de septiembre de 2026
(`master`, último commit de la sesión `24db9d0`). Se trabaja en
`/home/juan/juanarangoecommerce`, en `master`. Detalle de lo hecho en
[`bitacora/2026-09.md`](bitacora/2026-09.md).

Prioridad alta:

1. **Seguridad (tras el cierre del 25-09):** probar en el Studio real, con
   sesión iniciada, los seis botones (etiquetas, comparativas, Telegram de
   posts y prompts, newsletter y correo de prueba) y el generador de audio.
   Revisar en Resend, OpenAI y Google si hubo consumo anómalo antes del 25-09,
   cuando esas rutas estaban abiertas.
2. Borrar el lead de prueba `fd421cd7-28e9-4d9e-9355-464b921314ff`
   («PRUEBA - Claude») de `platform_sales_leads` en Nitro Bot, desde
   `/admin/leads`. Confirmó que `/nitrobot/conectar` entrega a Nitro Complete.
3. Search Console: reenviar el sitemap (540 URLs, todas 200), vigilar la
   cobertura tras retirar 670 etiquetas `noindex`/404 del sitemap y comprobar
   el favicon nuevo.

Decisiones comerciales del usuario:

4. Ratificar `Nitro Complete` como nombre público, los planes Nitro 5K/15K/30K,
   la unidad de consumo y la implementación de $700.000 (hoy publicados).
5. Decidir el futuro de `/nitrobot`: repite planes y buena parte de la
   narrativa de `/nitro-complete`. Mantenerla o redirigirla 301 tras revisar
   Search Console. `/nitrobot/conectar` y `/nitrobot/vsl` se conservan.
6. Sumar prueba verificable (casos, capturas reales del panel, métricas) solo
   con permiso del cliente. Las métricas del sitio son una calculadora con
   supuestos; los datos de producción de Nitro Bot no prueban uplift.

Validación en dispositivos reales:

7. Aprobar en el teléfono del usuario la Guía Nitro (rayo en reposo, ojos al
   hacer scroll, mensajes proactivos) y las conversaciones de WhatsApp.
8. Medir FPS y Web Vitals del asistente en un móvil de gama media o baja.

Mantenimiento:

9. Resolver el audit de dependencias en una tarea separada.
10. Cuando el usuario lo decida, borrar la carpeta
    `/home/juan/juanarangoecommerce-reconstruccion` y la rama local
    `respaldo/checkout-principal-2026-09-25` (13 archivos antiguos ya
    superados por `master`).
11. Segunda fase del asistente: seguir como guía de respuestas predefinidas o
    conectarlo a una conversación real. No presentarlo como IA mientras tanto.

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
