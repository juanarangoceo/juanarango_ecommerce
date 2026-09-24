# Arquitectura

## Resumen

Aplicación Next.js 16 con App Router. El sitio combina páginas estáticas,
contenido editorial desde Sanity, rutas dinámicas, Server Actions y Route
Handlers para integraciones externas.

## Grupos de rutas

| Grupo | Propósito |
|---|---|
| `src/app/(main)` | Sitio público, navegación, footer, blog, guías y soluciones |
| `src/app/(landing)` | Campañas pagadas sin enlaces de salida ni componentes globales de conversión secundaria |
| `src/app/(demos)` | Demostraciones de producto aisladas |
| `src/app/(marketing)` | Herramientas internas de marketing |
| `src/app/api` | Webhooks, generación, newsletter, revalidación y automatizaciones |
| `src/app/studio` | Sanity Studio embebido |

Los paréntesis son route groups: no aparecen en la URL.

## Recorrido comercial principal

La reconstrucción organiza la navegación pública alrededor de estas rutas:

- `/`: entrada comercial y explicación del sistema Nitro.
- `/soluciones`: comparación de Nitro Landing, NitroCommerce y NitroBot.
- `/soluciones/nitro-landing`, `/soluciones/nitro-commerce` y `/nitrobot`:
  fichas de solución con límites y llamada al diagnóstico.
- `/industrias`: problemas y recorridos sugeridos por tipo de negocio.
- `/casos`: demostraciones transparentes; no se presentan como clientes ni
  resultados reales.
- `/diagnostico`: asistente de seis preguntas con recomendación y captación
  opcional de contacto.

El diagnóstico usa una Server Action. En modo local de previsualización no
escribe ni llama a servicios externos. Su persistencia futura se concentra en
la función PostgreSQL `submit_commercial_diagnostic`, que inserta lead y sesión
en una sola transacción usando credenciales exclusivas del servidor.

## Contenido y datos

- **Sanity:** blog, contenido editorial, Studio y funciones de generación.
- **Supabase:** leads, autenticación y datos de herramientas específicas.
- **Cloudinary:** imágenes de marca y video VSL.
- **Notion:** fuentes usadas por algunos flujos editoriales.

## Servicios externos

- Resend para correo.
- Telegram para avisos y publicación.
- Meta Pixel para medición de campañas.
- Cal.com para webhooks y agenda.
- Inngest para trabajos asíncronos.
- Gemini y OpenAI para funciones generativas.

## NitroBot en este repositorio

Hay tres experiencias diferentes:

- `/nitrobot`: página orgánica extensa dentro de `(main)`.
- `/nitrobot/conectar`: calificador de cinco pasos dentro de `(landing)`.
- `/nitrobot/vsl`: landing de adquisición dentro de `(landing)`.

El calificador y la VSL reutilizan `src/components/nitrobot/nitrobot-form.tsx` y
la Server Action `src/app/actions/submit-nitrobot-lead.ts`. La acción valida el
contrato, firma el body con HMAC y lo envía al plano de plataforma de Nitro Bot.
Los errores transitorios pasan a Inngest para reintento durable. No hay escritura
directa desde el navegador ni acceso público a la base de Nitro Bot.

La aplicación real de NitroBot vive en `/home/juan/nitro_bot`. Consultarla para
validar capacidades y límites, pero no modificarla desde una tarea de este sitio
sin autorización explícita.

## Seguridad

- Las variables `NEXT_PUBLIC_*` llegan al navegador y solo pueden contener
  valores publicables.
- `SUPABASE_SERVICE_ROLE_KEY`, tokens de APIs y secretos de webhooks son solo
  servidor.
- Las Server Actions públicas deben validar entradas y no confiar en campos de
  atribución enviados por el navegador para decisiones de autorización.
- No enviar formularios reales durante pruebas técnicas sin considerar sus
  efectos: persistencia, Telegram y correo.
- La tabla `diagnostic_sessions` y la función de escritura solo existen después
  de aplicar su migración. `ENABLE_DIAGNOSTIC_SUBMISSIONS` funciona como seguro
  adicional y debe estar ausente o en `false` durante revisión local.
