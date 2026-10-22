# Activación y recargas — revisión local del 22-oct-2026

Rediseño de `/nitro-complete`, portada, página orgánica, VSL, evaluación y Guía
Nitro, más el vendedor `bot_super_admin`. No hubo commits, despliegues,
formularios a servicios reales ni cambios en NitroBot.

- `verification.json` y `verification-normal-motion.json`: 21 comprobaciones
  cada uno, sin errores de JavaScript, con movimiento reducido y normal.
- PNG: landing, formulario, resultado y panel del vendedor, con datos ficticios.
- `verify-browser.mjs`: Chrome real por CDP. Prueba consumo, retiro de planes,
  consentimiento, error recuperable, envío, atribución, idempotencia, panel,
  escritorio/móvil y errores de JavaScript, incluyendo movimiento reducido.
- `mock-seller-db.mjs`: PostgREST en memoria, ligado a 127.0.0.1:4330.
- `local-sales-tls.mjs`: relay HTTPS local al vendedor, para probar el build
  sin permitir HTTP en la captación empresarial productiva.

## Reproducir el recorrido aislado

Requiere los builds en verde y Chrome en la ruta que usa el script (o ajustar
esa ruta a la instalación local). Ejecutar cada proceso por separado.

```bash
node artifacts/activacion-recargas-2026-10-22/mock-seller-db.mjs
```

Crear un certificado exclusivamente local (nunca usarlo en un servicio real):

```bash
openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout /tmp/nitro-local-sales.key -out /tmp/nitro-local-sales.crt \
  -days 1 -subj /CN=localhost \
  -addext 'subjectAltName=DNS:localhost,IP:127.0.0.1'
node artifacts/activacion-recargas-2026-10-22/local-sales-tls.mjs
```

En `/home/juan/bot_super_admin` (todos estos valores son ficticios):

```bash
SUPABASE_URL=http://127.0.0.1:4330 SUPABASE_SERVICE_ROLE_KEY=solo-local \
NITRO_SUPABASE_URL= NITRO_SUPABASE_SERVICE_ROLE_KEY= \
NITROBOT_LEAD_INTAKE_SECRET=solo-prueba-local \
PANEL_PASSWORD=revision-local \
PANEL_SESSION_SECRET=sesion-local-de-pruebas-32-caracteres \
CONFIO_ACCESS_TOKEN= CONFIO_STORE= TELEGRAM_BOT_TOKEN= TELEGRAM_CHAT_ID= \
ADMIN_WHATSAPP_NUMBERS= \
npm run start -- -H 127.0.0.1 -p 4323
```

En la web:

```bash
SALES_ASSISTANT_API_URL=https://127.0.0.1:4331 \
SALES_ASSISTANT_INTAKE_SECRET=solo-prueba-local \
NODE_EXTRA_CA_CERTS=/tmp/nitro-local-sales.crt \
ENABLE_CRM_WRITES=false VERCEL_ENV=development \
npm run start -- -H 0.0.0.0 -p 4321
node artifacts/activacion-recargas-2026-10-22/verify-browser.mjs
```

El ensayo reinicia exclusivamente la base en memoria antes de comenzar. No
copiar esas variables a Vercel. `SALES_ASSISTANT_API_URL` productiva debe ser
el origen HTTPS real del vendedor y la web debe configurar `SALES_ASSISTANT_INTAKE_SECRET` con el valor
existente del vendedor, conservando su otra clave de NitroBot. Publicar primero el receptor del vendedor.

## Comprobación real de lectura

Desde `bot_super_admin`: `npx tsx scripts/verify-confio-readonly.ts`.
`GET /v1/stores` dio HTTP 200 y encontró Nitro Ecom. `SERVICE` es el tipo
configurado; la consulta no prueba qué tipos o métodos están habilitados.
No hubo creación de cobros, pago, liberación, conciliación ni acreditación.

Una consulta de lectura a `platform_settings.outbound_pricing` confirmó
$199.000, 500 turnos, 100 plantillas, los ocho paquetes y $70 por plantilla.
NitroBot conservó su árbol de trabajo y sus datos sin modificaciones.
