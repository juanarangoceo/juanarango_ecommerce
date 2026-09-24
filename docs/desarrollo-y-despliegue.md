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

### Diagnóstico comercial

- `ENABLE_DIAGNOSTIC_SUBMISSIONS`: solo el valor exacto `true` habilita la
  escritura. Ausente o con cualquier otro valor, la interfaz funciona en modo
  de previsualización y no persiste datos.
- `SUPABASE_SERVICE_ROLE_KEY`: se usa exclusivamente en la Server Action para
  invocar la función transaccional. Nunca debe llegar al navegador.

Antes de activar la variable debe estar aplicada y verificada la migración
`20260826155922_commercial_diagnostics.sql`. El entorno local puede apuntar al
proyecto productivo de Supabase; por eso las pruebas visuales deben mantener la
escritura desactivada.

### Acceso interno

- `AUDIO_GEN_USER` y `AUDIO_GEN_PASSWORD`: Basic Auth de
  `/studio/audio-gen`. Son obligatorias en producción porque el middleware
  actual conserva un fallback inseguro para desarrollo.

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
5. Crear primero un preview desde Git y verificar las rutas afectadas.
6. Desplegar solo con autorización explícita mediante merge/push a `master`.
7. Verificar la URL real y los flujos con efectos externos de forma controlada.
