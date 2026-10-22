# Desarrollo y despliegue

## Requisitos

- Node.js compatible con Next.js 16.
- Dependencias instaladas con `npm install`.
- `.env.local` obtenido por el canal autorizado. Nunca copiar sus valores a Git
  o documentación.

## Servidor local

Este workspace se consulta mediante túnel SSH en el puerto `4321`:

```bash
cd /home/juan/juanarangoecommerce
npm run dev -- -p 4321
```

No asumir el puerto por defecto `3000` al entregar enlaces al usuario.

## Validación

Para cambios localizados:

```bash
npx eslint <archivos-modificados>
npx tsc --noEmit
```

Para una entrega de aplicación o una nueva ruta:

```bash
npm run build
```

Después de iniciar el servidor, comprobar la ruta afectada en navegador cuando
el entorno disponga de automatización. Si no hay navegador, como mínimo validar
HTTP, contenido renderizado y logs del servidor, dejando explícita la limitación.

## Variables relevantes

### Base del sitio

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Landing NitroBot

- `NEXT_PUBLIC_NITROBOT_VSL_ID`: public ID del video en Cloudinary.
- `NEXT_PUBLIC_META_PIXEL_ID`: identificador público del Pixel.
- `NEXT_PUBLIC_NITROBOT_WA`: destino público de WhatsApp cuando aplique.
- `ENABLE_NITROBOT_LEAD_SUBMISSIONS`: solo `true` habilita entregas reales.
- `NITROBOT_API_URL`: origen HTTPS de la aplicación Nitro Bot.
- `NITROBOT_LEAD_INTAKE_SECRET`: secreto HMAC compartido, solo servidor.
- `INNGEST_EVENT_KEY` y `INNGEST_SIGNING_KEY`: entrega y ejecución de reintentos.

El lead ya no se escribe en el Supabase de este sitio. Se entrega mediante el
contrato `nitrobot-lead-v1` a Nitro Bot y aparece en `/admin/leads`. Los previews
pueden mantener `ENABLE_NITROBOT_LEAD_SUBMISSIONS` desactivada; producción debe
tener las tres variables Nitro configuradas y la función de Inngest sincronizada.

### Contacto empresarial de Nitro Complete (22-oct-2026)

- `SALES_ASSISTANT_API_URL`: origen HTTPS del vendedor `bot_super_admin`, solo servidor.
  Es distinto de `NITROBOT_API_URL`; no apuntar este formulario a NitroBot.
- `SALES_ASSISTANT_INTAKE_SECRET`: clave de la conexión empresarial, solo servidor.
  Debe coincidir con `NITROBOT_LEAD_INTAKE_SECRET` del vendedor. Esta variable
  de la web es independiente de su `NITROBOT_LEAD_INTAKE_SECRET`, que conserva
  el valor de la conexión de evaluación con NitroBot. El contrato usa el prefijo
  de firma `nitro-enterprise-v1`. No cambiar claves ni configuración de NitroBot.
- El vendedor necesita únicamente su base `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`
  para recibir estas solicitudes. No necesita acceso a la base de NitroBot.

Publicar primero el receptor del vendedor y configurar `SALES_ASSISTANT_API_URL`
y `SALES_ASSISTANT_INTAKE_SECRET` en producción de la web al publicar la landing. El entorno local habitual no tiene esa URL ni
la clave de captación de la web; no se copiaron secretos ni modificaron variables
remotas durante esta sesión. El ensayo usa credenciales ficticias y un PostgREST
en memoria; instrucciones y evidencia en `artifacts/activacion-recargas-2026-10-22/`.

Confío se comprueba, sin crear pagos, desde el vendedor:
`npx tsx scripts/verify-confio-readonly.ts`. Solo consulta `GET /v1/stores` y
confirma que la tienda configurada pertenece a la credencial. Los métodos
habilitados, el pago y la acreditación no se prueban con esa consulta.

### Diagnóstico comercial y CRM

- `ENABLE_DIAGNOSTIC_SUBMISSIONS`: solo el valor exacto `true` habilita el
  envío del diagnóstico fuera de producción.
- `ENABLE_CRM_WRITES`: fuera de producción `captureContact` no escribe en
  Supabase salvo con `true`. El entorno local apunta al proyecto productivo:
  para pruebas visuales, dejarla sin definir.
- `SUPABASE_SERVICE_ROLE_KEY`: solo servidor (Server Actions, rutas y panel).
- `RESEND_CRM_SYNC`: con `true` copia cada contacto a Resend y habilita
  «Enviar a Resend» en los segmentos del panel.
- `CAL_WEBHOOK_SECRET`: obligatoria en producción; sin ella el webhook de
  Cal.com responde 503 para que nadie inyecte contactos.

### Acceso interno

- `ADMIN_DASHBOARD_PASSWORD`: contraseña del panel `/admin`. Sin ella el panel
  queda cerrado. `ADMIN_SESSION_SECRET` (opcional) firma las sesiones; si no
  existe se deriva de la contraseña y cambiarla cierra todas las sesiones.

- `AUDIO_GEN_USER` y `AUDIO_GEN_PASSWORD`: Basic Auth de
  `/studio/audio-gen` y firma de la cookie que exigen `/api/audio/*`. Sin
  ellas, la herramienta queda cerrada (también en desarrollo).
- `INTERNAL_API_SECRET`: rutas de administración manual. Rotada el
  25-09-2026 porque la anterior estaba publicada en el Studio; en producción y
  preview está marcada como sensible.
- Deployment Protection de Vercel: «todo excepto dominios propios». Previews
  y URLs `*.vercel.app` requieren sesión de Vercel; para automatizaciones
  contra un preview usar el bypass de automatización, no desactivar la
  protección.
- Herramientas del Studio: sin secreto propio; usan el token de sesión de
  Sanity verificado en el servidor (`src/lib/sanity-editor-auth.ts`).

Hay más secretos para webhooks y generadores. Descubrir los nombres desde el
código, no sus valores, y documentarlos solo cuando la tarea lo requiera.

## Despliegue

El proyecto `seller360grados-projects/juanarango_ecommerce` se despliega
automáticamente en Vercel al hacer push a `master`. No desplegar con Docker ni
con Vercel CLI local salvo decisión explícita. Antes de llevar cambios a
producción:

1. Confirmar árbol y rama correctos.
2. Revisar que no se mezclen cambios ajenos.
3. Ejecutar TypeScript, ESLint y build.
4. Confirmar las variables requeridas en el entorno destino.
5. Por preferencia de Juan del 30-sep, publicar directamente `master` después
   de las pruebas locales; no crear previews por rama salvo solicitud expresa.
6. Desplegar solo con autorización explícita mediante merge/push a `master`.
7. Verificar la URL real y los flujos con efectos externos de forma controlada.
