# CLAUDE.md

Guía para trabajar en este proyecto. Lee esto antes de hacer cambios.

## Qué es este proyecto

A pesar del nombre del repo (`juanarango_ecommerce`), **NO es una tienda online**. Es el
**sitio de marca personal + agencia de Juan Arango (seller360grados)**: un content hub con
fuerte automatización de contenido por IA. Incluye blog, galería de prompts, directorio de
herramientas, comparativas (pSEO), guías, sistema de newsletter, generador de propuestas B2B
y varias demos de soluciones.

## Stack

- **Next.js 16.1** (App Router) + **React 19** + **Turbopack**
- **Sanity** como CMS desacoplado (schemas en `src/sanity/schemas/`, Studio en `/studio`)
- **Supabase** para BD/Auth + embeddings (búsqueda semántica)
- **Inngest** para jobs asíncronos (newsletter dispatch, etc.)
- **Resend** + React Email para correos
- IA: **OpenAI** y **Google Gemini** (`@google/genai`)
- UI: **Tailwind 4** + Radix + **shadcn/ui** (estilo new-york) + Framer Motion
- Deploy: **Vercel** (proyecto `seller360grados-projects/juanarango_ecommerce`)

## Comandos

```bash
npm run dev     # dev server (Turbopack) en :3000
npm run build   # build de producción
npm run start   # servir build
npm run lint    # eslint (next lint)
```

No hay framework de tests configurado todavía.

## Convenciones

- **Alias de imports:** `@/*` → `./src/*`. Usa siempre el alias, no rutas relativas largas.
  - `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`
- **App Router con grupos de rutas:** `src/app/(main)`, `(marketing)`, `(demos)`. Mantén las
  páginas dentro del grupo que corresponda; cada grupo tiene su propio `layout.tsx`.
- **API routes** en `src/app/api/**/route.ts`. Webhooks bajo `api/webhooks/`.
- **Componentes shadcn/ui** van en `src/components/ui/` — no editarlos a mano salvo necesidad;
  preferir composición.
- **Datos de Sanity:** queries GROQ y helpers en `src/lib/` y `src/sanity/lib/`. Antes de
  escribir queries, revisar los schemas en `src/sanity/schemas/`.
- Idioma del producto y de los textos: **español**.

## Entorno y secretos

- Las variables viven en **Vercel**. Para sincronizarlas en local:
  `vercel env pull .env.local`
- **Nunca** commitear `.env*` (ya está en `.gitignore`). No imprimir secretos en logs.
- El despliegue a producción es **automático vía Vercel** (push a `master`). No desplegar con
  Docker ni con CLI local.

## Higiene del repo (importante)

El repositorio contiene carpetas que **NO son parte de la app** y son ruido (backups,
referencias y plantillas): `DEMO/`, `Landing_apps/`, `Landingpage_nitrocommerce/`,
`_luxe-estates-reference/`, `_Nitrostrategy_backup/`, `openclaw-ai/`, `plantillas/`,
`app_facial/`, `imagenes-demo/`, además de scripts sueltos en raíz (`debug-*.js`,
`test-*.mjs`, `list-models.js`, `verify-player.js`, `output.txt`, `build_output.log`).

- **El código vivo de la app está SOLO en `src/`** (más config en la raíz). Trabaja ahí.
- No agregar más archivos sueltos de debug/test a la raíz; usa `scripts/` o bórralo al terminar.

## Notas de seguridad

- `middleware.ts` protege `/studio/audio-gen` con basic-auth y cae a `admin/admin` si faltan
  `AUDIO_GEN_USER` / `AUDIO_GEN_PASSWORD`. Asegúrate de que esas vars estén definidas en prod.

## Estado actual / deuda conocida

- Sin tests (216 `.tsx`, 67 `.ts`).
- ~140 usos de `: any` y varios `console.log` en `src/` — limpiar gradualmente.
- Pendiente: limpieza de las carpetas-ruido del repo (ver "Higiene del repo").
