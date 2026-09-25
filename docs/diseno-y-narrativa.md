# Diseño y narrativa de Nitro Ecom

Guía viva para extender la reconstrucción comercial a nuevas páginas y
secciones. Resume decisiones aprobadas durante la revisión de la home hasta el
31 de agosto de 2026. No reemplaza las fichas de producto: toda promesa debe
seguir contrastándose con `docs/producto/` y, para NitroBot, con
`/home/juan/nitro_bot`.

## Idea rectora

Nitro Ecom no debe verse como una colección de herramientas aisladas. La marca
presenta sistemas que conectan captación, conversación, conversión y mejora.
La interfaz debe sentirse técnica, rápida y precisa, pero continuar siendo
humana y fácil de entender para un negocio latinoamericano.

La home actual es la referencia de dirección visual, no una plantilla para
copiar literalmente. Las páginas orgánicas pueden desarrollar más contexto;
las landings de campaña deben seguir siendo más breves y sin salidas.

## Identidad visual

### Color (actualizado el 24 de septiembre de 2026)

El sitio adopta la identidad oficial de Nitro definida en
`/home/juan/nitro_bot/docs/brand/identidad-nitro.md`. Los tokens viven en
`src/app/globals.css`:

| Token | Hex | Uso en el sitio |
|---|---|---|
| `primary` / `verde-nitro` | `#B7FF2A` | Acción principal, una frase por titular sobre fondo oscuro |
| `nitro-text` | `#3A6200` | Verde como texto sobre fondos claros (nunca `primary` sobre blanco) |
| `nitro-soft` | `#F1FFD6` | Fondo de chips positivos en secciones claras |
| `ink` | `#111311` | Texto y botones en secciones claras; bloque de resultado |
| `ground` / `line` | `#F6F8F1` / `#E2E6DA` | Secciones claras («negro y blancos») y sus bordes |
| `alert` / `alert-soft` / `alert-text` | `#FF6A13` / `#FFF1E7` / `#B84500` | Acento naranja: algo espera o pide atención |
| `background` / `superficie-nitro` | `#0B0D0B` / `#131613` | Lienzo oscuro y superficies |

Reglas:

- El naranja es acento del sistema Nitro completo, con el mismo significado que
  en el producto: señala lo que espera o lo que se pierde. No decora.
- Alternar secciones oscuras con secciones claras `bg-ground text-ink` para dar
  ritmo; nunca secciones completas en verde intenso.
- En un titular, resaltar como máximo una frase corta.

### Tipografía

Geist para titulares y cuerpo (semibold, `tracking-[-0.035em]` en titulares),
Geist Mono para rótulos pequeños. Syne quedó retirada de los titulares; su
variable `--font-wordmark` solo se conserva por compatibilidad.

### Símbolo

El símbolo de Nitro Ecom es un rayo verde, reconstruido como SVG en
`src/components/commercial/nitro-mark.tsx`.

Uso aprobado:

- rayo libre, sin círculo, placa ni fondo;
- junto a `JUAN ARANGO / NITRO ECOM` en el header;
- resplandor breve únicamente al interactuar.

No usarlo como viñeta, decoración repetida, icono de tarjeta ni señal dentro
de un motion graphic. La revisión de la home rechazó específicamente su uso en
el recorrido comercial. La escasez protege su valor como firma de marca.

## Narrativa

### Principios

1. Abrir con el resultado o la decisión, no con jerga técnica.
2. **Nitro Complete es el producto principal** (decisión del 24 de septiembre
   de 2026). La home y el header llevan hacia `/nitro-complete` y su
   calificador `/nitrobot/conectar`. Consultoría (NitroCommerce) y Nitro
   Landing son la alternativa para quien todavía no debe automatizar. Esto
   reemplaza la regla anterior de tres soluciones con igual jerarquía.
3. Usar el problema solo cuando ayuda a reconocerse; no sostener toda la página
   sobre palabras como «fuga», «pérdida» o «fallo».
4. Mantener una idea principal por sección y evitar explicar lo mismo en un
   subtítulo, un párrafo y una lista.
5. No inventar métricas, resultados, clientes, testimonios ni universalizar
   capacidades que dependen de configuración.
6. Preferir verbos concretos: captar, atender, cotizar, medir, implementar,
   priorizar y mejorar.

### Patrones aprobados

- Titular principal: promesa directa y concreta.
- Sección de soluciones: explicar que se puede elegir una, sumar otra después
  o conectar las tres con acompañamiento.
- Calificación dentro de tarjetas: `Puede ayudarte si...` seguido por tres
  situaciones breves y verificables.
- Puente al diagnóstico: ofrecer ayuda para encontrar la opción que mejor
  encaja con el momento del negocio, sin decidir una secuencia universal.
- CTA: nombrar el siguiente paso real, por ejemplo
  `Encontrar mi mejor opción`.

### Patrones descartados

- Eyebrows al inicio de cada sección como `El problema`, `Tres soluciones`,
  `Diagnóstico gratuito`, `Evidencia` o `Siguiente paso`.
- Estadísticas decorativas sin función narrativa bajo el hero.
- Subrayados animados invasivos sobre palabras del titular.
- Bloques laterales que repiten en pasos lo que ya dice el texto principal.
- Secciones completas en verde intenso.
- Presentar todos los sistemas únicamente como respuesta a «fugas».
- Numerar las soluciones o convertirlas en etapas obligatorias de un embudo.
- Usar Aura Stetic y Luxe Estates como prueba principal del ecosistema actual:
  pertenecen a un contexto B2B anterior y se conservan fuera de la home.
- Convertir la esfera del asistente en una flecha, una onda o cualquier símbolo
  que pueda confundirse con un control de navegación.

## Composición y ritmo

Cada sección debe justificar el espacio horizontal que ocupa:

- Texto + gráfico, imagen o interfaz: usar una retícula de dos columnas.
- Título sin contrapunto: centrarlo cuando la composición lo pida; en móvil se
  permite centrar titulares breves, introducciones y CTA.
- Título + acción secundaria: distribuirlos en extremos de una misma cabecera.
- No dejar un `max-w-3xl` a la izquierda de una sección de ancho completo sin un
  elemento que compense el vacío derecho.
- Las tarjetas principales pueden ser completamente clicables; deben tener foco
  visible y una reacción equivalente a hover.

Ritmo orientativo de la home:

- sección estándar: `py-16 lg:py-24`;
- sección principal de sistemas: `py-20 lg:py-28`;
- puente o CTA entre secciones: `py-8 lg:py-14`;
- reducir espacio no significa eliminar respiración alrededor del hero, una
  decisión principal o una interfaz compleja.

En móvil, el contenido esencial y el gráfico que explica el hero deben entrar
lo antes posible. El centrado es selectivo: titulares, introducciones y CTA
pueden centrarse, pero párrafos largos, listas y tarjetas conservan alineación
izquierda. Evitar alturas mínimas decorativas y revisar siempre que no haya
desbordamiento horizontal. En anchos menores de 360 px, ajustar la escala del
titular antes de ocultar o recortar palabras largas.

## Tarjetas de soluciones

La home trata las tres soluciones como núcleo comercial:

- misma jerarquía visual y tarjetas completas clicables;
- borde sutil, profundidad oscura y una línea verde superior;
- icono con entrada breve y reacción al interactuar;
- resultado primero, descripción después;
- separación simple antes de `Puede ayudarte si...`, con tres bullets y sin
  añadir otro contenedor dentro de la tarjeta;
- CTA visible, aunque toda la tarjeta navegue.

La cabecera de la sección explica que se puede elegir una solución, sumar otra
más adelante o conectar las tres. No numerar las tarjetas ni presentarlas como
pasos de un recorrido obligatorio. El texto debe ser cercano, describir una
necesidad reconocible y recordar el acompañamiento hasta dejar la solución
funcionando.

Los bullets describen contexto y necesidades, no resultados prometidos. Los
datos viven en `src/lib/commercial-content.ts`; si cambian, comprobar también
`/soluciones`, que consume la misma fuente.

## Motion y microinteracciones

El movimiento debe explicar flujo, estado o interacción. No se añade solo para
llenar espacio.

Reglas:

- priorizar `transform` y `opacity`;
- observar visibilidad o progreso sin provocar renders React por cada frame;
- usar listeners de scroll pasivos y agrupar cambios con
  `requestAnimationFrame`;
- detener animaciones fuera del viewport cuando sean continuas;
- respetar `prefers-reduced-motion`;
- reservar el espacio final para evitar saltos de layout;
- mantener texto completo para lectores de pantalla cuando una frase se escribe
  carácter por carácter.

Patrones actuales:

- `HeroTypewriter`: escritura inicial del titular con espacio reservado.
- `SystemVisual`: selector interactivo del ecosistema Nitro. NitroCommerce,
  Nitro Landing y NitroBot permanecen visibles con la misma jerarquía; al elegir
  una se muestra su explicación y enlace sin mover el layout. El mensaje debe
  comunicar que el negocio puede usar una solución o conectar las tres, sin un
  orden obligatorio.
- `IconMotionObserver`: entrada única de iconos; hover/focus dispara un pulso
  breve. Vive en el layout principal para activarse también al navegar entre
  soluciones, productos e industrias; las páginas marcan cada unidad con
  `nitro-icon-mark` y `nitro-icon-glyph`.
- `CommercialRouteVisual`: recorrido Tráfico → Conversación → Venta ligado al
  scroll y representado por un punto verde, no por el rayo de marca.
- `PixelSphere`: asistente de píxeles dibujado en `canvas`. Desde el 25-09-2026
  su reposo es el rayo de Nitro en píxeles (`bolt`), por decisión del usuario:
  sustituye al orbe y es la única excepción a no usar el rayo en motion. Al
  hacer scroll muestra ojos que miran hacia donde va la página; los gestos son temporales y siempre regresan a él. Estados: latido
  (`pulse`) al hacer scroll, guiño (`wink`) en hover o foco, ojos que siguen al
  puntero (`eyes`) cuando el ratón se acerca, `typing` antes de un mensaje
  proactivo, `sleep` tras 25 s sin actividad, `X` con el panel abierto y formas
  de contexto por sección: red, diálogo, chispa, doble check (`ticks`) en
  conversaciones, barras (`bars`) en la calculadora e interrogante (`question`)
  en FAQ. Las secciones se marcan con `data-nitro-orb`.
- `ChatWidget` (Guía Nitro): panel cargado de forma diferida con respuestas
  guiadas y predefinidas, rotulado como tal. Burbujas estilo WhatsApp, indicador
  «escribiendo…» y enlaces solo a rutas reales; no simula una IA ni envía datos.
  En conversación, calculadora, precios y FAQ puede mostrar como máximo dos
  mensajes proactivos por página (uno por página y contexto en la sesión) con
  punto naranja de no leído.
- `NitroCompletePreview`: hero con una conversación ilustrativa de WhatsApp que
  se reproduce sola y, al lado, lo que registra el panel. Sustituye a la tarjeta
  de «valor vendido», que no se entendía.
- `WhatsAppStory`: venta completa en cinco capítulos (asesor, pedido,
  confirmación, postventa y caso para el equipo). Avanza sola o por clic.
- `whatsapp-ui.tsx`: teléfono, burbujas, tarjeta de producto, botones de
  respuesta y `WaTicks` (trazo de WhatsApp Web). Las conversaciones se ven
  desde el teléfono del comprador: la tienda con su logo arriba y a la
  izquierda; el comprador a la derecha con doble check gris que pasa a azul
  cuando la tienda responde. Tiendas ficticias en `demo-stores.tsx`: Alma
  Botánica (hero, clienta Sara) y Paso Urbano (historia, clienta Luisa). Cada
  sección usa un ejemplo distinto.
- `.nitro-hl` / `.nitro-hl-ink`: resaltado tipo marcador para los beneficios
  (atiende, crea el pedido, confirma, avisa el envío) dentro de párrafos.
- `SalesCalculator`: estima conversaciones delegables, horas liberadas y ventas
  que se pierden fuera de horario. Solo usa datos del visitante y supuestos
  visibles y editables; nunca resultados de clientes. Nitro Bot tiene
  mediciones reales, pero su propio diagnóstico aclara que no prueban uplift.
- `brand-logos.tsx`: logotipos de WhatsApp y Shopify (Simple Icons) para indicar
  compatibilidad, en su color oficial y sin combinarlos con la marca Nitro.
- `NewsletterSection`: bloque editorial estable de la home. Presenta una idea
  por envío, reutiliza el flujo real de suscripción y enlaza la Política de
  Privacidad; no debe convertirse en un popup invasivo ni prometer una
  frecuencia que no se pueda sostener.
- `LanguageToggle`: selector ES/EN del header principal conectado a Google
  Translate. Debe conservar la apariencia Nitro, mostrar siempre la sigla del
  idioma disponible y limitar los reintentos si el script externo no carga.
- `NavUserButton`: acceso a la autenticación existente. Se muestra directamente
  en escritorio y dentro del menú en móvil; no compite en jerarquía con el CTA
  de diagnóstico.

La ruta `/casos` se conserva por compatibilidad editorial y para revisar su
analítica, pero no ocupa navegación principal ni footer hasta replantear su
función con evidencia verificable.

## Contacto aprobado

El correo público de contacto es `juanarangoecommerce@gmail.com`. El remitente
técnico de Resend se trata por separado: no debe cambiarse a una dirección de
Gmail sin verificar antes las restricciones del proveedor y el dominio de
envío.

`CommercialRouteVisual` y los nuevos estados de `PixelSphere` continúan
**pendientes de confirmación visual final** en los dispositivos del usuario. Ambos pasaron pruebas
automatizadas en escritorio y móvil, pero no deben reutilizarse en otras páginas
hasta confirmar su percepción, ritmo y consumo en hardware real.

La esfera se carga 1,8 segundos después del contenido principal. La medición
local mantuvo 60 FPS durante cinco segundos, sin tareas largas ni fotogramas de
más de 25 ms, y su chunk dinámico midió aproximadamente 5,6 KB comprimido. Aun
así, antes de producción se debe bajar el reposo a 24–30 FPS, reservar 60 FPS
para transformaciones y pausar el canvas cuando la pestaña no esté visible.

## Componentes de referencia

- `src/app/(main)/page.tsx`: composición aprobada hasta la revisión actual.
- `src/components/commercial/site-header.tsx`: lockup Juan Arango / Nitro Ecom.
- `src/components/commercial/nitro-mark.tsx`: símbolo vectorial.
- `src/components/commercial/hero-typewriter.tsx`: escritura del hero.
- `src/components/commercial/system-visual.tsx`: selector interactivo de las
  tres soluciones en el hero.
- `src/components/commercial/commercial-route-visual.tsx`: gráfico de recorrido.
- `src/components/commercial/icon-motion-observer.tsx`: entrada de iconos.
- `src/components/commercial/pixel-sphere.tsx`: motor de partículas y formas.
- `src/components/chat-widget.tsx`: comportamiento contextual y panel del
  asistente.
- `src/components/dynamic-chat-widget.tsx`: carga diferida en el layout público.
- `src/lib/commercial-content.ts`: mensajes y calificación de soluciones.

## Lista de revisión para nuevas páginas

Antes de aprobar una sección nueva:

1. ¿Comunica una idea diferente a las secciones vecinas?
2. ¿El texto ocupa el ancho con intención o necesita un contrapunto visual?
3. ¿Hay una sola frase verde realmente importante?
4. ¿El contenedor ayuda a comprender una unidad o solo añade decoración?
5. ¿La narrativa presenta valor sin inventar resultados?
6. ¿El CTA describe exactamente lo que ocurre después?
7. ¿La experiencia sigue siendo clara en móvil y sin hover?
8. ¿El motion aporta significado y respeta movimiento reducido?
9. ¿Se probó foco de teclado, desbordamiento y altura reservada?
10. ¿La promesa coincide con la ficha y el producto real?

## Reversibilidad local

Durante la revisión se guardaron blobs en
`refs/codex/checkpoints/2026-08-27-*` antes de cambios materiales. Se pueden
consultar con `git show-ref | rg refs/codex/checkpoints`. Son referencias
locales de este worktree y no sustituyen un commit: normalmente no viajan al
hacer push ni deben asumirse disponibles en otro clon.
