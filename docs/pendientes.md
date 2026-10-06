# Pendientes

Estado vivo al 30 de septiembre de 2026. Lo terminado se elimina de aquí y se
registra en la bitácora correspondiente.

## Film de Nitro Complete en la web — 6 de octubre de 2026

Integrado y publicado (detalle en `bitacora/2026-10.md`). Falta:

- Revisión visual en el teléfono y el computador de Juan: bucle del hero,
  ventana del film (ya sin el velo encima), video vertical en móvil,
  subtítulos y el ajuste del encabezado de `/nitro-complete`.
- Mirar en Meta los eventos `NitroFilmPlay` / `NitroFilmProgress` tras unos
  días para comparar el bucle de la home con el film de `/nitro-complete`.
- La VSL de campañas (`/nitrobot/vsl`) sigue sin video
  (`NEXT_PUBLIC_NITROBOT_VSL_ID` vacío); decidir si usa este film.
- Si se cambia el film, actualizar los public ids en `src/lib/nitro-film.ts` y
  copiar los subtítulos nuevos (`npm run captions` en `nitro_video_studio`).

## Contacto de Nitro Complete por WhatsApp — 5 de octubre de 2026

Implementado por pedido de Juan: portada, menú, producto, kit,
planes, calculadora, Guía Nitro, blog, resultado del diagnóstico, página
orgánica y VSL. Número de ventas: **+57 311 300 5150**. La evaluación en línea
queda como alternativa y su resultado continúa por WhatsApp. Revisión visual
en escritorio y móvil; detalles en `bitacora/2026-10.md`. Ajuste adicional
para el comprador colombiano: demo y precios antes de los detalles, pesos COP,
turnos, implementación junto a mensualidad y preguntas sobre número/ficha.
Se conserva el precio del kit y las reglas de recomendación.

Publicado por el camino habitual de `master` el 5-oct, commit `a2abd82`,
despliegue `dpl_HcqNe89sXi45ismr3a62J2uddRWL` en `READY`. Dominio, WhatsApp,
precios, móvil, calculadora, rutas alternativas y salud de NitroBot comprobados.
El diagnóstico conserva un evento reciente escalado que debe revisarse en el
panel de Salud de NitroBot; el equipo humano ya atendió ese chat. Si Vercel tiene `NEXT_PUBLIC_JUAN_WHATSAPP`,
verificar que valga `573113005150`; sin override, ese es el destino incorporado
al código. No aplicar el parche histórico de `bot_super_admin/docs/web` sobre
esta implementación. Resultado del despliegue y comprobaciones en `bitacora/2026-10.md`.

## Precios con entrada por recarga y correos del dominio — 1 de octubre de 2026

NIT-89 (entrada por el kit de arranque, con los precios de recarga plegados),
planes con la implementación como asesoría personalizada con Juan (sin meses
gratis: se retiró el mismo día), comparativo Prepago vs Plan,
sección «Empieza a tu medida» en la home y NIT-93 (ningún Gmail visible;
todo sale de `src/lib/contact-emails.ts`). Typecheck, ESLint y build en
verde; sin scroll horizontal a 390 px. Queda:

1. Aprobación visual de Juan en su teléfono (detalle en
   [`bitacora/2026-10.md`](bitacora/2026-10.md)).
2. `privacidad` apunta a contacto@ hasta que exista privacidad@ (NIT-92);
   también es el correo del titular que ve Meta en /nitro-complete/privacidad.
3. Los precios del kit y de los paquetes se copian a mano de nitro_bot
   (`platform_settings.outbound_pricing`); la implementación y lo que
   incluye, de `lib/commercial/plans.ts`.

## Punto de reanudación para el siguiente agente

### Home, landing, menú y soluciones — 30 de septiembre de 2026

En producción (ver bitácora). Queda: aprobar en el teléfono; si Juan quiere
que la IA ayude de verdad a cargar el catálogo (redactar descripciones desde
fotos, por ejemplo), es una función nueva de nitro_bot que hoy no existe y no
debe anunciarse antes; revisar si `/soluciones/nitro-commerce` necesita el
mismo tratamiento de nombre + slogan; conseguir capturas reales del panel con
permiso de un cliente.

### Nitro en /nitro-complete (NIT-79) — 30 de septiembre de 2026

En producción desde el 30-09 (`408fe7a`, PR #2), verificado en el dominio.
Detalle en [`bitacora/2026-09.md`](bitacora/2026-09.md);
capturas en `artifacts/nitro-complete-nit79-2026-09-30/`. Queda:

1. Aprobación visual de Juan en su teléfono (hero, tarjetas y CTA final).
2. Cuando existan los assets: logo «Nitro Complete» y `og-nitro.png` con Nitro
   (bloqueados en el issue).
3. Revisar `UNITS_PER_CONVERSATION = 3` cuando haya más tiendas en producción.
   El calificador de Nitro Bot (`lib/commercial/qualification.ts`) recomienda
   plan con otra escala (menos de 20 chats al día → 5K) y puede recomendar un
   plan distinto al de la calculadora de la web.
4. En Nitro Bot, marcar como hecho su pendiente «La web dice “unidades de
   consumo”: cambiarla a “turnos”» (no se tocó ese repositorio).

### Registro/login publicados — 29 de septiembre de 2026

Rediseño de registro/login de Nitro Complete y reemplazo de «Acceder» en el
menú por «Ingresar» y «Crear cuenta». El usuario autorizó expresamente incluir
`/home/juan/nitro_bot`. Publicados por solicitud del usuario: web `ab30249`
y Nitro Bot `70741a6`. Inventario y validaciones recuperadas al final de
[`bitacora/2026-09.md`](bitacora/2026-09.md).

Implementación y validación terminadas: 24 comprobaciones de registro/login
en navegador con respuestas simuladas, 13 pruebas existentes de autenticación
y activación, ESLint, TypeScript y build de Nitro Bot. Menú verificado en
escritorio y móvil. La web comercial pasó ESLint, TypeScript y build en la
sesión recuperada; se volvió a verificar su ESLint y el menú sobre ese build.
Capturas y ensayo reproducible en `artifacts/auth-ux-2026-09-29/`.
Producción revisada: menú a 1280/360 px, navegación de la web al registro,
24 comprobaciones de registro/login con POSTs simulados, smoke de salud/PWA/
autenticación de Nitro Bot y cero errores en los logs de los nuevos despliegues
durante la revisión. Nitro Bot pasó sus 1.102 pruebas antes de publicar.
Para validaciones locales, ejecutar build y navegador por separado; usar
`localhost` con Next dev.

### Estado de producción anterior

La reconstrucción está en producción desde el 24-25 de septiembre de 2026
(`master`, último commit de la sesión `24db9d0`). Se trabaja en
`/home/juan/juanarangoecommerce`, en `master`. Detalle de lo hecho en
[`bitacora/2026-09.md`](bitacora/2026-09.md).

Prioridad alta:

0. **CRM y panel `/admin` (en producción desde el 25-09, commit `b0725fd`).**
   Queda: instalar el panel en el teléfono y entrar con la contraseña
   `ADMIN_DASHBOARD_PASSWORD` ya existente en Vercel (si no se recuerda,
   rotarla allí); crear `CAL_WEBHOOK_SECRET` en Vercel y en Cal.com si se
   quieren registrar reservas (hoy el webhook responde 503); y activar
   `RESEND_CRM_SYNC=true` cuando se empiece con Resend. Respaldo de las tablas
   retiradas en `/home/juan/respaldos/juanarangoecommerce-supabase-2026-09-25/`.

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

4. Ratificar `Nitro Complete` como nombre público, los planes Nitro 5K/15K/30K
   y la implementación de $700.000 (hoy publicados). La unidad ya quedó
   definida: el turno (30-09).
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
4. ~~Definir el nombre comercial de la unidad~~: es el **turno** (30-09).
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
