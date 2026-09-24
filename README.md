# Juan Arango Ecommerce

Sitio comercial y editorial de **Juan Arango / Nitro Ecom**. Presenta las
soluciones Nitro, publica contenido sobre ecommerce e inteligencia artificial y
aloja landings específicas para adquisición de clientes.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Sanity, Supabase y
Vercel. Algunas funciones integran Cloudinary, Resend, Telegram, Meta, Cal.com,
Gemini, OpenAI e Inngest.

## Desarrollo local

Instala dependencias y abre el servidor en el puerto usado por el túnel SSH:

```bash
npm install
npm run dev -- -p 4321
```

Sitio principal: `http://localhost:4321`

Landing VSL de NitroBot: `http://localhost:4321/nitrobot/vsl`

## Validación

```bash
npx eslint <archivos-modificados>
npx tsc --noEmit
npm run build
```

El script `npm run lint` es heredado y aún apunta a `next lint`, retirado en la
versión actual de Next.js. Usa `npx eslint` hasta que se corrija explícitamente.

## Documentación

Empieza por [`AGENTS.md`](AGENTS.md) si eres un agente o por
[`docs/README.md`](docs/README.md) si buscas el mapa del proyecto.

- Estado vivo: [`docs/pendientes.md`](docs/pendientes.md)
- Arquitectura: [`docs/arquitectura.md`](docs/arquitectura.md)
- Desarrollo y despliegue: [`docs/desarrollo-y-despliegue.md`](docs/desarrollo-y-despliegue.md)
- Producto NitroBot: [`docs/producto/nitrobot.md`](docs/producto/nitrobot.md)
- Bitácora: [`docs/bitacora/`](docs/bitacora/)

Las variables de entorno son locales o de Vercel y nunca deben escribirse en la
documentación con sus valores.
