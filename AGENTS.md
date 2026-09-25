# Juan Arango Ecommerce

> Fuente de verdad para Codex, Claude Code y cualquier agente que trabaje en
> este repositorio. `CLAUDE.md` importa este archivo; no dupliques instrucciones
> allí.

Aunque el repositorio se llama `juanarango_ecommerce`, **no es una tienda
online**. Es el sitio web comercial y editorial de **Nitro Ecom / Juan Arango**:
marca personal, agencia, contenidos, comparativas, guías, herramientas y
landings de las soluciones Nitro. Está construido con Next.js App Router y
consume contenido de Sanity, datos de Supabase y varios servicios externos.

## Antes de trabajar

1. Lee [`docs/pendientes.md`](docs/pendientes.md) para conocer el estado vivo.
2. Si la tarea toca un producto, lee su ficha en [`docs/producto/`](docs/producto/).
3. Para decisiones recientes, consulta [`docs/bitacora/`](docs/bitacora/).
4. Revisa `git status`: el árbol puede contener trabajo del usuario sin commit.
5. El código y los servicios verificados mandan sobre documentación antigua.

## Mapa documental

| Necesitas | Documento |
|---|---|
| Índice y política documental | [`docs/README.md`](docs/README.md) |
| Qué falta y qué bloquea el lanzamiento | [`docs/pendientes.md`](docs/pendientes.md) |
| Arquitectura, rutas e integraciones | [`docs/arquitectura.md`](docs/arquitectura.md) |
| Diseño, narrativa y motion aprobados | [`docs/diseno-y-narrativa.md`](docs/diseno-y-narrativa.md) |
| Desarrollo, variables y validación | [`docs/desarrollo-y-despliegue.md`](docs/desarrollo-y-despliegue.md) |
| Verdad comercial y técnica de NitroBot | [`docs/producto/nitrobot.md`](docs/producto/nitrobot.md) |
| Historia de sesiones | [`docs/bitacora/`](docs/bitacora/) |

## Reglas no negociables

1. No inventar cifras, clientes, resultados, testimonios ni capacidades.
2. Toda afirmación sobre NitroBot debe contrastarse con
   `/home/juan/nitro_bot`; ese repositorio es la autoridad del producto.
3. No modificar `/home/juan/nitro_bot` salvo que el usuario lo incluya
   explícitamente en el alcance.
4. Mantener separados los layouts: `(main)` incluye navegación del sitio;
   `(landing)` elimina salidas para campañas; `(demos)` y `(marketing)` tienen
   objetivos propios.
5. Nunca exponer claves secretas en variables `NEXT_PUBLIC_*` ni en componentes
   cliente. `SUPABASE_SERVICE_ROLE_KEY`, tokens y secretos son solo servidor.
6. Preservar los cambios sin commit del usuario y evitar operaciones destructivas.
7. No desplegar, crear commits ni enviar formularios reales sin solicitud
   explícita. Un lead de prueba escribe en Supabase y puede disparar Telegram y
   correo.
8. Las landings de captación deben enlazar la Política de Privacidad y conservar
   atribución de campaña.
9. Documentar decisiones y pendientes al cerrar una sesión material.

## Stack

- Next.js 16.1.1 App Router, React 19, TypeScript y Tailwind CSS 4.
- Sanity para contenido editorial y Studio.
- Supabase para leads, autenticación y datos de algunas herramientas.
- Cloudinary para imágenes y video.
- Resend, Telegram, Meta Pixel, Cal.com e Inngest según el flujo.
- Gemini y OpenAI en generadores y herramientas internas.
- Vercel como plataforma de despliegue.
- Radix, shadcn/ui y Framer Motion para interfaz y animación.

## Convenciones de código

- Alias de imports: `@/*` apunta a `./src/*`; preferirlo frente a rutas
  relativas largas.
- Componentes shadcn viven en `src/components/ui`; preferir composición y no
  editar primitives sin necesidad.
- Antes de escribir GROQ o cambiar contenido de Sanity, revisar
  `src/sanity/schemas` y `src/sanity/lib`.
- API routes viven en `src/app/api/**/route.ts`; webhooks bajo `api/webhooks`.
- Idioma de producto, interfaz y documentación: español.

## Rutas y límites importantes

- `src/app/(main)`: sitio público con navegación, footer y contenidos.
- `src/app/(landing)`: landings de campaña sin navegación ni distracciones.
- `src/app/(demos)`: demostraciones aisladas.
- `src/app/(marketing)`: herramientas internas de marketing.
- `src/app/api`: webhooks, generación, newsletter y automatizaciones.
- `src/components/nitrobot`: página orgánica, formulario y embudo VSL.
- `src/components/analytics`: analítica condicionada por variables públicas.
- `src/lib`: configuración e integraciones compartidas.

El código vivo de la aplicación está en `src/` más configuración, `functions/`,
`supabase/` y `scripts/`. Directorios raíz como `DEMO/`, `Landing_apps/`,
`Landingpage_nitrocommerce/`, `_luxe-estates-reference/`,
`_Nitrostrategy_backup/`, `openclaw-ai/`, `plantillas/`, `app_facial/` e
`imagenes-demo/` son referencias, respaldos o proyectos auxiliares. No asumir
que forman parte de la app ni añadir más archivos de depuración sueltos a raíz.

## Comandos de trabajo

El acceso local habitual usa un túnel SSH por el puerto `4321`:

```bash
npm run dev -- -p 4321
```

Validación proporcional antes de entregar cambios:

```bash
npx eslint <archivos-modificados>
npx tsc --noEmit
npm run build
```

`npm run lint` todavía apunta al comando retirado `next lint`; usa ESLint
directamente hasta corregir el script en una tarea separada.

Las variables viven en Vercel; para sincronizarlas localmente se usa
`vercel env pull .env.local`. Producción corresponde a `master` y el despliegue
normal es automático por Vercel al hacer push. No usar Docker ni un deploy local
de CLI como camino alternativo sin una decisión explícita.

`middleware.ts` protege `/studio/audio-gen` con Basic Auth, pero conserva un
fallback `admin/admin` si faltan `AUDIO_GEN_USER` y `AUDIO_GEN_PASSWORD`. Esas
variables son obligatorias en producción; no tratar el fallback como seguro.

## Estado actual — 25 de septiembre de 2026

**La reconstrucción ya está en producción.** `codex/reconstruccion-web` se
fusionó por avance rápido en `master` y Vercel sirve juanarangoecommerce.com
desde ahí. La carpeta principal `/home/juan/juanarangoecommerce` vuelve a ser
el lugar de trabajo (en `master`); `/home/juan/juanarangoecommerce-reconstruccion`
queda como copia prescindible. Las notas siguientes, incluidas las de «Contexto
previo», describen decisiones de diseño vigentes; donde hablen de «sin commit ni
despliegue» están superadas.

### 24 de septiembre de 2026

**Nitro Complete es el producto principal del sitio.** La home y el header
llevan a `/nitro-complete` y al calificador `/nitrobot/conectar`; consultoría
(NitroCommerce) y Nitro Landing son alternativas. La paleta sigue la identidad
oficial de Nitro (`/home/juan/nitro_bot/docs/brand/identidad-nitro.md`): verde
`#B7FF2A`, tinta `#111311`, naranja `#FF6A13` como acento de atención y
secciones claras `ground`. Los titulares usan Geist. Detalle en la bitácora
2026-09 y en `docs/diseno-y-narrativa.md`. Las notas siguientes, del 2 de
septiembre, siguen vigentes salvo donde esto las contradice.

### Contexto previo — 2 de septiembre de 2026

La reconstrucción comercial continúa aislada en
`/home/juan/juanarangoecommerce-reconstruccion`, rama
`codex/reconstruccion-web`, con un árbol de trabajo amplio y sin commit ni
despliegue. No descartar cambios locales: incluyen trabajo acumulado del usuario
y de varias sesiones. La revisión visual usa el túnel SSH del puerto `4321`;
el comando de recuperación es `npm run dev -- -H 0.0.0.0 -p 4321`.

La dirección aprobada hasta ahora usa grafito y verde Nitro, narrativa cercana,
un solo énfasis verde por titular, rayo de marca libre junto al nombre, motion
ligero y secciones sin eyebrows decorativos. Las tres soluciones son el núcleo
comercial y tienen la misma jerarquía: un negocio puede empezar por la asesoría
personalizada de NitroCommerce o implementar Nitro Landing o NitroBot según su
necesidad. Las tarjetas usan `Puede ayudarte si...` y el puente al diagnóstico
ayuda a encontrar la opción adecuada sin imponer una secuencia.

La home declara acompañamiento de principio a fin, retiró de su narrativa
principal los trabajos B2B históricos de Aura Stetic y Luxe Estates y usa
centrado selectivo en móvil: titulares y CTA centrados, párrafos largos, listas
y tarjetas alineados a la izquierda. Los casos y sus rutas se conservan fuera
de la home hasta revisar su función editorial y la analítica. `Casos` tampoco
aparece ya en el header ni en el footer; no eliminar, redirigir ni desindexar
`/casos` sin revisar antes Search Console y Analytics.

El layout principal incorpora una esfera de píxeles como entrada al asistente
Nitro. El orbe es siempre su estado base; responde con gestos temporales
—latido circular, guiño, red, diálogo o chispa— y vuelve a ser esfera. El panel
solo orienta hacia rutas reales y no simula todavía una conversación con IA.
Se carga de forma diferida y pasó las pruebas locales, pero antes de producción
queda optimizar su animación continua en reposo y validarla en un móvil real.

La segunda pasada reorganizó `/soluciones`, NitroCommerce, Nitro Landing y
NitroBot. Sus heroes usan ahora dos columnas equilibradas y una escala menor;
los laterales deben explicar una decisión o mostrar una interfaz comprensible,
no rellenar espacio. La animación de iconos se monta globalmente mediante
`IconMotionObserver`. El header incluye ES/EN, `Acceder` y el CTA de diagnóstico.
La home y `/newsletter` ya incorporan el formulario editorial con enlace a
Privacidad. El correo público aprobado es `juanarangoecommerce@gmail.com`.

Aplicar estas decisiones a futuras páginas siguiendo
[`docs/diseno-y-narrativa.md`](docs/diseno-y-narrativa.md), no copiando la home
de forma literal. El recorrido comercial ligado al scroll y la esfera siguen
pendientes de confirmación visual final en los dispositivos del usuario; no
propagar esos patrones a otras páginas antes de aprobarlos.

NitroBot ya tiene página orgánica, calificador en `/nitrobot/conectar` y VSL.
El formulario entrega un contrato firmado al nuevo panel `/admin/leads` de
Nitro Bot y usa Inngest como respaldo durable. El recorrido local completo,
TypeScript, ESLint, build y vistas móvil/escritorio quedaron verificados. La
reconstrucción sigue sin commit, merge ni despliegue; antes de producción quedan
el preview desde Git, la prueba controlada en el dominio real y, para campañas,
el video definitivo y Meta Pixel. La tabla orgánica vuelve a mostrar Nitro 5K,
Nitro 15K y Nitro 30K con las mensualidades e implementación propuestas por
instrucción del usuario; nombres, unidad de consumo, adicional y excepciones de
alcance deben ratificarse antes de producción. El cierre completo vive en
[`docs/bitacora/2026-09.md`](docs/bitacora/2026-09.md).

Al cierre del 2 de septiembre pasaron TypeScript, ESLint dirigido,
`git diff --check` y el build de 633 páginas. Se verificaron las páginas
comerciales principales a 1280 px y 390 px sin overlays ni desbordamiento. Las
capturas están en `artifacts/design-pass-2026-09-02/` y el punto de reanudación
detallado está al inicio de [`docs/pendientes.md`](docs/pendientes.md).

## Mantenimiento documental

- `AGENTS.md` conserva reglas estables y un resumen del estado actual.
- `docs/pendientes.md` es vivo: lo terminado se elimina o se mueve a bitácora.
- `docs/bitacora/YYYY-MM.md` conserva decisiones y validaciones por fecha.
- Las fichas de `docs/producto/` describen promesas permitidas y límites; no son
  una lista de tareas.
- Si cambia una ruta, integración o comando, actualiza también el documento
  estable correspondiente.
