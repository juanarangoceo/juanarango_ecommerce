# NitroBot — estrategia del embudo comercial y panel de prospectos

> Estado: estrategia previa a implementación.
> Fecha: 1 de septiembre de 2026.
> Alcance: `juanarangoecommerce.com` + panel de plataforma de Nitro Bot.
>
> Este documento decide el recorrido, la arquitectura y los límites. No prueba
> que las rutas, tablas o integraciones descritas ya existan. Código,
> migraciones y servicios verificados siguen siendo la autoridad.

## 1. Objetivo

Convertir la presencia comercial de NitroBot en un embudo medible que haga
cuatro cosas sin intervención manual:

1. Explicar con precisión qué resultado produce NitroBot.
2. Mostrar evidencia del recorrido conversación → pedido → operación.
3. Calificar si el negocio tiene condiciones para implementarlo.
4. Entregar el prospecto, con contexto y próxima acción, al panel de plataforma
   de Nitro Bot.

El éxito no es “recibir formularios”. Es generar conversaciones comerciales con
negocios que venden productos, tienen catálogo y reciben suficiente demanda por
WhatsApp para justificar el sistema.

## 2. Decisiones cerradas

- La landing se construye dentro de
  `/home/juan/juanarangoecommerce-reconstruccion`; no se abre un tercer repo ni
  un tercer proyecto de Vercel.
- La aplicación operativa continúa en `/home/juan/nitro_bot`, con su despliegue
  y su Supabase independientes.
- La web pública presenta y captura; Nitro Bot califica definitivamente,
  persiste y administra el prospecto.
- La comunicación entre proyectos es servidor a servidor. El navegador nunca
  conoce el secreto de integración ni una `service_role`.
- NitroBot es un producto de la familia Juan Arango / Nitro Ecom, no una marca
  visual desconectada.
- `/nitrobot` será la página orgánica y comercial principal.
- `/nitrobot/conectar` será el embudo de calificación sin navegación ni salidas
  secundarias.
- `/nitrobot/vsl` se conserva para campañas cuyo anuncio dependa del video; no
  será la única puerta comercial del producto.
- El resultado positivo se denomina **“Precalificado para implementar
  NitroBot”**. Un formulario no puede afirmar que una tienda está conectada ni
  crear un tenant.
- La calificación es determinística, versionada y calculada en servidor. No se
  usa un modelo de IA para aceptar, rechazar o recomendar un plan.
- El objeto se llama `platform_sales_leads`. Se reserva `leads` para un futuro
  objeto operativo de los tenants y se evita mezclar prospectos de Nitro Ecom
  con compradores atendidos por sus clientes.
- Los prospectos pertenecen al plano de plataforma, no a un tenant. Las tablas
  quedan cerradas a `anon` y `authenticated` y solo se usan después del gate de
  `platform_admins`.
- No se crea tenant, usuario, número de WhatsApp, conexión Shopify ni ficha de
  onboarding sin una acción explícita del superadministrador.
- Los módulos reales se describen como dependientes de plan o configuración
  cuando corresponda. No se universalizan Aria, Nora, Marketing, carritos ni
  otras capacidades opcionales.

## 3. Posicionamiento

### Promesa principal

> Convierte chats de WhatsApp en pedidos listos para despachar.

### Explicación corta

> NitroBot consulta tu catálogo, recomienda productos, calcula precios desde la
> fuente real, recopila los datos del comprador y deja la venta registrada para
> que tu equipo continúe la operación.

### Categoría comercial

NitroBot se vende como **sistema de ventas por WhatsApp**, no como chatbot, CRM
ni generador de respuestas. La comparación relevante es la operación necesaria
para atender, cotizar, hacer seguimiento y registrar pedidos; no una herramienta
gratuita de chat.

### Límites de la promesa

- “Disponible para atender” no equivale a prometer que cerrará todas las ventas.
- “Shopify o catálogo directo” sí es una capacidad vigente.
- No se garantiza conservar el número actual antes de revisar su estado en Meta.
- No se publican porcentajes de conversión, ingresos o ahorro sin fuente,
  periodo, permiso y método de cálculo.
- Las demostraciones se llaman demostraciones. Elegance solo se usa como caso
  cuando el dato mostrado pueda verificarse y exista permiso para publicarlo.

## 4. Arquitectura de marca

### Marca madre

**Juan Arango / Nitro Ecom** aporta criterio, confianza e implementación. Su
lenguaje visual permanece en negro y grafito, con verde Nitro `#39FF14` para
decisiones, acciones y estados positivos.

### Producto

**NitroBot** conserva esa base y usa naranja como firma secundaria escasa: un
indicador de conversación, una señal dentro del producto o un detalle de marca.
El CTA principal y el estado “precalificado” permanecen verdes. Naranja y verde
no compiten como dos llamadas a la acción.

### Presencia de Juan

Juan aparece después de que el producto se entiende, como responsable de la
implementación y la revisión comercial. No ocupa el hero ni convierte la página
de producto en una página personal.

### Regla visual

La prueba principal es interfaz real: conversación, catálogo, cálculo, pedido y
panel. No se usa una mascota, un render abstracto de IA ni una conversación
larga como sustituto del resultado operativo.

## 5. Mapa de rutas

```text
juanarangoecommerce.com
├── /nitrobot
│   └── página orgánica, indexable, producto + planes + evidencia + FAQ
├── /nitrobot/conectar
│   └── calificación enfocada, sin navegación ni conversiones secundarias
└── /nitrobot/vsl
    └── campaña pagada, noindex, video opcional + acceso al mismo embudo

nitro_bot
├── POST /api/platform/sales-leads
│   └── entrada privada y firmada desde la web comercial
├── /admin/leads
│   └── bandeja comercial de la plataforma
└── /admin/leads/[id]
    └── ficha, recorrido, notas, próxima acción y conversión a onboarding
```

`/nitrobot` usa el layout público `(main)`. `/nitrobot/conectar` y
`/nitrobot/vsl` usan `(landing)`: sin header general, newsletter, chat flotante
ni enlaces que compitan con la conversión.

## 6. Recorrido de `/nitrobot`

### 6.1 Hero

- Promesa fija, legible sin esperar una animación.
- Soporte: Shopify o catálogo directo en NitroBot.
- CTA principal: **“Evaluar mi tienda”**.
- CTA secundario: **“Ver cómo convierte una conversación”**.
- Tres señales verificables: catálogo real, cifras calculadas en servidor y
  escalamiento a una persona cuando hace falta.
- Contrapunto visual: una conversación corta que termina en una tarjeta de
  pedido, no dos teléfonos altos llenos de mensajes.

### 6.2 El resultado completo

Una secuencia visual de cuatro estados:

1. El comprador pregunta por una necesidad.
2. NitroBot encuentra una opción en el catálogo.
3. El servidor calcula precio, envío o total cuando aplique.
4. El pedido queda visible y trazable para el equipo.

Cada estado debe usar datos ficticios claramente identificables durante el
desarrollo. La demostración no se presenta como una venta real.

### 6.3 Dos formas de conectar el catálogo

- **Shopify:** sincronización y creación del pedido en la tienda.
- **Catálogo NitroBot:** carga y administración directa para negocios sin
  Shopify.

WooCommerce y otras plataformas se muestran como “requiere revisión de
integración”, no como conexión disponible.

### 6.4 Operación alrededor de la venta

Mostrar el sistema, sin una cuadrícula interminable de funciones:

- continuidad de la conversación;
- datos del pedido;
- escalamiento a humano;
- trazabilidad en el panel;
- módulos de seguimiento disponibles según configuración.

### 6.5 Evidencia

Orden de preferencia:

1. Capturas reales anonimizadas del producto.
2. Una venta reconstruida con fuente verificable.
3. Métricas de operación con periodo y definición visibles.
4. Testimonio únicamente con permiso.

No usar cifras ornamentales ni logos de negocios como prueba implícita.

### 6.6 Planes

La página explica primero que la mensualidad paga por el sistema operando todo
el ciclo; el cupo es una capacidad incluida, no un cobro por consumo exacto.
Consumir la mitad no convierte el servicio en “medio sistema”.

Base comercial recomendada para aprobación final:

| Plan | Capacidad incluida | Mensualidad propuesta | Uso orientativo |
|---|---:|---:|---|
| Nitro 5K | 5.000 unidades de consumo | $590.000 COP | operación pequeña con volumen estable |
| Nitro 15K | 15.000 unidades de consumo | $1.190.000 COP | equipo comercial en crecimiento |
| Nitro 30K | 30.000 unidades de consumo | $2.200.000 COP | operación intensiva como Elegance |

Implementación propuesta: **$700.000 COP una sola vez**, sujeta a alcance
estándar. Costos de plantillas de Meta, campañas, Nitro Wallet, desarrollos a la
medida o integraciones no soportadas se explican aparte.

Antes de publicar esta tabla se deben cerrar dos definiciones:

1. El nombre comercial exacto de la unidad incluida. El contador actual mide
   turnos procesados por el sistema y ciertos mensajes automáticos; la landing
   no debe llamarlos de una forma que contradiga el producto.
2. La regla y el precio del bloque adicional de 2.000. No se publica “ilimitado”
   ni se deja el excedente a negociación después del consumo.

Los tres planes conservan el mismo núcleo de venta. La diferencia principal es
capacidad y nivel operativo; no se mutila el cierre de pedidos para fabricar un
plan barato.

### 6.7 Calificación y FAQ

La tabla de planes termina en **“Encontrar mi plan”**. El FAQ resuelve integración,
catálogo, número de WhatsApp, implementación, soporte, consumo y qué ocurre
cuando el bot entrega una conversación a una persona.

## 7. Embudo `/nitrobot/conectar`

Duración objetivo: 60–90 segundos. Cinco pasos, una decisión por pantalla.

### Paso 1 — Negocio y catálogo

- tipo de negocio: venta de productos / servicios / otro;
- plataforma: Shopify / catálogo directo / WooCommerce / otra;
- tamaño aproximado del catálogo.

### Paso 2 — Demanda

- conversaciones nuevas de WhatsApp en un día normal;
- pedidos mensuales aproximados;
- volumen mensual de mensajes, solo si el prospecto lo conoce.

### Paso 3 — Operación actual

- quién responde hoy;
- principal fricción: demora, cotización, datos incompletos, seguimiento o
  capacidad del equipo;
- si una persona puede recibir los casos escalados.

### Paso 4 — Preparación

- plazo esperado de implementación;
- capacidad para entregar catálogo, políticas y accesos;
- país y ciudad de operación.

### Paso 5 — Contacto y autorización

- nombre;
- empresa;
- WhatsApp;
- correo opcional;
- autorización expresa para evaluar el caso y contactar por WhatsApp o correo;
- vínculo visible a la política de privacidad.

No se solicitan contraseñas, tokens, acceso a Shopify, códigos de Meta, datos de
compradores ni medios de pago.

## 8. Motor de calificación

La puntuación es interna. El prospecto ve la categoría, el plan sugerido y las
razones; no un número que pueda intentar optimizar.

### Señales y peso inicial

| Señal | Peso máximo | Qué evalúa |
|---|---:|---|
| Compatibilidad de catálogo | 25 | Shopify o capacidad real de usar catálogo Nitro |
| Demanda por WhatsApp | 30 | volumen suficiente para generar valor recurrente |
| Operación de ventas | 20 | pedidos existentes y proceso que NitroBot pueda asumir |
| Dolor operativo | 15 | respuesta, cotización, seguimiento o capacidad |
| Preparación temporal | 10 | intención y recursos para implementar |

Versión inicial: `qualification_v1`. Toda fila conserva la versión, el puntaje,
las razones positivas y los riesgos detectados.

### Resultados

- **75–100 · Precalificado:** presenta plan, razones y agenda.
- **50–74 · Revisión necesaria:** existe encaje, pero se debe validar volumen,
  integración o preparación.
- **0–49 · Aún no recomendado:** explica con respeto qué condición falta y
  ofrece contenido o diagnóstico, sin fingir escasez ni cerrar la puerta.

### Reglas duras

- Un negocio que no vende productos no se precalifica para la versión actual.
- Shopify y catálogo Nitro son compatibles.
- WooCommerce u otra plataforma pasan a revisión, no a rechazo automático.
- Volumen bajo no se disfraza como cliente ideal solo porque el prospecto puede
  pagar.
- El plan se recomienda por capacidad estimada, separado del puntaje de encaje.
- Cuando el volumen no permite estimar capacidad con confianza, se recomienda
  medición, no un plan artificialmente grande.

## 9. Resultado que ve el prospecto

### Precalificado

- “Tu operación tiene condiciones para implementar NitroBot”.
- Plan recomendado y capacidad.
- Dos o tres razones concretas.
- Qué se validará en la llamada.
- CTA para agendar y alternativa para hablar por WhatsApp.

### Revisión necesaria

- Condición que sí encaja.
- Punto específico que debe revisarse.
- CTA “Revisar compatibilidad con Juan”.

### Aún no recomendado

- Explicación directa de la condición faltante.
- Recomendación útil: ordenar catálogo, medir conversaciones o consolidar el
  canal.
- Opción de recibir una guía; no empujar una llamada de venta sin encaje.

El resultado nunca afirma que una integración está habilitada, que el número fue
aprobado por Meta ni que el negocio tendrá un resultado financiero determinado.

## 10. Flujo técnico entre proyectos

```text
Navegador
  → Server Action de juanarangoecommerce.com
    → valida y normaliza
    → firma el cuerpo exacto
      → POST privado a Nitro Bot
        → valida firma, tiempo, versión e idempotencia
        → recalcula calificación
        → inserta lead + evento inicial
        → responde resultado público
    ← muestra recomendación
  ← registra analítica sin datos personales
```

### Firma

Cabeceras propuestas:

- `X-Nitro-Timestamp`
- `X-Nitro-Idempotency-Key`
- `X-Nitro-Signature`
- `X-Nitro-Contract-Version`

`X-Nitro-Signature` usa HMAC-SHA256 sobre `timestamp + "." + rawBody`. Nitro
rechaza firmas inválidas, cuerpos alterados, timestamps fuera de una ventana de
cinco minutos y versiones no soportadas. La comparación es constante.

El secreto existe únicamente como variable server-side en los dos proyectos y
puede rotarse con una ventana corta de secreto actual + anterior.

### Idempotencia y duplicados

- La llave de idempotencia es única en base de datos.
- Un retry devuelve el mismo lead y resultado; no crea otra notificación.
- El teléfono normalizado no es `unique`: una persona puede volver desde otra
  campaña o con nueva información.
- Se calcula una llave de contacto para señalar posibles duplicados en el
  panel, sin borrar atribución ni sobrescribir silenciosamente una solicitud.

### Disponibilidad

La llamada directa se reintenta una vez con la misma llave. Si Nitro Bot no está
disponible, la web entrega el sobre a un evento durable de Inngest y muestra
“Recibimos tus datos; estamos terminando la evaluación”. Inngest reintenta con
backoff y la misma llave; Nitro Bot sigue siendo la única base y fuente de
verdad. No existe una segunda tabla de leads ni una outbox que mantener.

## 11. Modelo de datos en Nitro Bot

### `platform_sales_leads`

Grupos de campos:

- identidad: `id`, `idempotency_key`, `contract_version`;
- contacto: nombre, empresa, teléfono normalizado, correo y ubicación;
- negocio: plataforma, tamaño de catálogo, conversaciones, pedidos, equipo,
  dolor, objetivo y plazo;
- calificación: puntaje, versión, estado, razones y riesgos;
- oferta: plan recomendado y versión de precios;
- adquisición: fuente, landing, UTM estructuradas, `fbclid` si aplica;
- operación: etapa, responsable, próxima acción, último contacto y motivo de
  pérdida;
- conversión: `converted_tenant_id` nullable;
- privacidad: fecha de autorización y versión del texto/política;
- sistema: `is_test`, timestamps y posible duplicado.

Etapas propuestas:

`nuevo → por_contactar → contactado → reunión_agendada → propuesta → ganado`

Salidas laterales: `nutricion`, `no_califica`, `perdido`.

### `platform_sales_lead_events`

Timeline inmutable para creación, cambio de etapa, nota, contacto, agenda,
recomendación actualizada y conversión a tenant. El actor puede ser un
`platform_admin` o el sistema. No almacena secretos ni cuerpos completos de
errores externos.

### Seguridad de base

- RLS activa desde la migración.
- Sin políticas para `anon` o `authenticated`.
- `revoke all` explícito y acceso por `service_role` únicamente después del
  gate de plataforma.
- Índices por etapa/fecha, próxima acción, calificación y llave de contacto.
- Las mutaciones del panel revalidan `platform_admins` en cada Server Action y
  escriben auditoría.
- Esta es una tabla del plano de control, como `platform_admins` y `audit_log`;
  no pertenece a un tenant antes de la venta. Al ganar, enlaza el tenant creado
  sin mover ni reinterpretar el histórico.

## 12. Panel `/admin/leads`

No se construye un CRM genérico. El panel hace lo necesario para vender
NitroBot:

1. Ver.
2. Filtrar.
3. Contactar.
4. Anotar.
5. Programar próxima acción.
6. Convertir o cerrar.

### Bandeja

- Métrica principal: prospectos precalificados nuevos.
- Vistas rápidas: nuevos, por contactar, vencidos, reuniones y cerrados.
- Filtros: calificación, plan, plataforma, fuente, etapa, fecha y responsable.
- Columnas: negocio/contacto, señal de encaje, plan, origen, antigüedad y próxima
  acción.
- Badge de nuevos en el sidebar.
- En móvil, `Leads` pasa a la navegación primaria junto a `Clientes` y
  `Solicitudes`; `Salud` queda dentro de “Más”.

### Ficha

- respuestas estructuradas;
- calificación con razones, no solo puntaje;
- plan sugerido y versión;
- atribución;
- botones de WhatsApp, correo y agenda;
- timeline de eventos y notas;
- etapa, responsable y próxima acción;
- detección visible de solicitudes relacionadas;
- acción **“Convertir en cliente”** que inicia el flujo existente de alta y
  `client_onboarding`, con confirmación explícita.

Convertir no debe copiar datos de forma invisible ni activar el bot. Crea o
enlaza un tenant inactivo y deja que el onboarding existente mantenga sus
aprobaciones.

## 13. Notificaciones y seguimiento

- Telegram solo se dispara después de persistir el lead.
- La alerta muestra categoría, negocio, volumen, plataforma, plan y vínculo
  directo a `/admin/leads/[id]`; evita cuerpos libres extensos.
- El correo de confirmación resume lo recibido y el próximo paso real.
- El fallo de Telegram o correo no invalida la captación.
- Notificaciones repetidas respetan la idempotencia.
- Primera versión: aviso inmediato de lead precalificado y badge en el panel.
  Automatizaciones de seguimiento quedan fuera hasta medir el proceso manual.

## 14. Analítica

Eventos mínimos:

- `nitrobot_landing_view`
- `nitrobot_primary_cta`
- `nitrobot_demo_complete`
- `nitrobot_pricing_view`
- `nitrobot_qualification_start`
- `nitrobot_qualification_step`
- `nitrobot_lead_submitted`
- `nitrobot_result_viewed`
- `nitrobot_calendar_click`
- `nitrobot_meeting_booked`

Meta recibe el evento estándar `Lead` únicamente después de persistencia
confirmada. Los eventos no llevan nombre, teléfono, correo, respuestas libres ni
otra información personal. Las UTM se guardan como campos separados; no como una
cadena dentro de `message`.

Embudo de negocio:

```text
sesión → CTA → formulario iniciado → formulario enviado
       → precalificado → reunión → propuesta → cliente
```

No se abre un A/B test hasta tener una línea base suficiente para interpretar el
resultado. Primero se mide caída por paso, calidad por fuente y tasa de contacto.

## 15. Privacidad y retención

El formulario requiere autorización previa, expresa e informada y la conserva
de forma consultable. La Ley 1581 de 2012 exige autorización previa e informada
para el tratamiento, y la SIC insiste en que la organización pueda demostrar
cómo la obtuvo:

- [Ley 1581 de 2012 — Función Pública](https://www1.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981)
- [Política y principios de tratamiento — SIC](https://sedeelectronica.sic.gov.co/politica-de-tratamiento-de-datos-personales)

La implementación guarda `consented_at`, versión del texto, versión de la
política, finalidad y ruta de origen. El checkbox no nace marcado.

La política actual debe actualizar su lista de encargados y el flujo de datos:
la captación se origina en `juanarangoecommerce.com`, se transmite a Nitro Bot y
puede generar comunicaciones por WhatsApp, correo y agenda. No se recolectan
datos sensibles ni datos de los compradores del prospecto.

Antes de producción se define una retención para prospectos no convertidos y un
procedimiento de consulta, corrección, revocación y supresión. La estrategia no
sustituye revisión jurídica del texto final.

## 16. Protección contra abuso

- Validación estricta de enums, tamaños y formatos en ambos servidores.
- Honeypot y tiempo mínimo razonable de llenado.
- Límite de solicitudes por señal técnica sin persistir IP cruda más tiempo del
  necesario.
- HMAC y control de replay en el endpoint de Nitro Bot.
- Respuestas de error genéricas al público y detalle sanitizado en telemetría.
- No confiar en `Origin`, UTM, campos ocultos ni puntajes enviados por el
  navegador.
- Ningún dato del formulario se inserta mediante acceso directo de `anon`.

## 17. Fases de implementación

### Fase 0 — Protección del trabajo actual

- Revisar y guardar un punto de restauración de la reconstrucción, hoy sin
  commit y con muchos archivos nuevos.
- Preservar los scripts temporales no relacionados del repo Nitro Bot.
- Confirmar las cinco decisiones comerciales pendientes de la sección 20.

### Fase 1 — Contrato y núcleo de plataforma

- Spec antes de código.
- Migración aditiva de `platform_sales_leads` y eventos.
- Motor de calificación y catálogo de planes versionados.
- Endpoint firmado, idempotencia y pruebas de seguridad.
- Consulta SQL de verificación y ampliación de `npm run verify`.

### Fase 2 — Panel comercial

- Bandeja `/admin/leads`.
- Ficha, timeline y Server Actions auditadas.
- Badge y navegación móvil.
- Puente explícito al onboarding existente.

### Fase 3 — Embudo público

- `/nitrobot/conectar`.
- Server Action, firma, resultado y reintento durable con Inngest.
- Consentimiento versionado y analítica.
- Pruebas de teclado, lector, móvil, errores y recuperación.

### Fase 4 — Página orgánica

- Reconstruir `/nitrobot` con el sistema visual aprobado.
- Planes, prueba operativa, evidencia y FAQ.
- Metadata, canonical, OG, datos estructurados y sitemap.
- No retirar contenido histórico sin revisar Search Console y redirecciones.

### Fase 5 — VSL y campañas

- Reducir la dramatización de las conversaciones.
- Llevar la demostración hasta el pedido y el panel.
- Permitir acceso al embudo sin obligar a terminar el video.
- Configurar video, Pixel y eventos de prueba.

### Fase 6 — Verificación y salida controlada

- Nitro Bot: pruebas, typecheck, `npm run verify`, build, migración ensayada,
  deploy únicamente desde `main` mediante `npm run deploy` y SQL en producción.
- Web: typecheck, ESLint dirigido, build y revisión visual; merge a `master`
  únicamente después de aprobar el árbol actual.
- Lead de prueba etiquetado `is_test` de punta a punta.
- Segundo lead controlado real, con consentimiento, Telegram, correo, panel,
  resultado y atribución verificados.
- Activar tráfico orgánico antes de campañas pagadas.

## 18. Criterios de aceptación

### Negocio

- Una persona entiende qué produce NitroBot antes de hacer scroll completo.
- Los planes explican por qué la mensualidad no baja si se usa medio cupo.
- El resultado del formulario nunca promete una conexión ya realizada.
- Cada promesa coincide con la ficha de producto y producción.

### Experiencia

- Formulario completado en menos de 90 segundos en móvil.
- Resultado usable sin correo obligatorio.
- Navegación por teclado, foco visible y movimiento reducido.
- Sin desbordamiento a 320 px.
- La página conserva estabilidad visual y objetivo de LCP menor a 2,5 s en una
  medición realista de producción.

### Integración

- Un retry con la misma llave crea una sola fila y una sola alerta.
- Firma inválida, timestamp viejo y versión desconocida se rechazan.
- Ningún usuario de tenant puede leer o escribir prospectos.
- Un fallo de Telegram o Resend no pierde el lead.
- Un fallo temporal de Nitro Bot deja el sobre recuperable en Inngest.

### Panel

- El lead aparece con todas sus respuestas y atribución estructuradas.
- Juan puede contactarlo, anotar, mover etapa y fijar próxima acción desde
  móvil.
- La conversión genera o enlaza un tenant inactivo y abre el onboarding; nunca
  activa servicios automáticamente.

## 19. Riesgos y mitigación

| Riesgo | Mitigación |
|---|---|
| Dos bases se convierten en dos CRM | Nitro Bot es la única autoridad; Inngest solo transporta reintentos sin almacenar un CRM paralelo |
| Los planes públicos se desalinean del panel | catálogo y versión de precios canónicos en Nitro Bot; contrato verificable |
| Spam o abuso del endpoint | validación, rate limit, honeypot, HMAC, replay e idempotencia |
| Se publica una capacidad condicional como universal | copy contrastado contra `docs/producto/nitrobot.md` y producción |
| La landing parece otro template de IA | identidad de la reconstrucción + interfaces reales + movimiento funcional |
| El formulario filtra demasiado y baja conversión | cinco pasos cortos; medir abandono por paso antes de quitar preguntas |
| El panel crece hasta ser CRM | seis acciones cerradas y sin automatizaciones configurables en v1 |
| Un submit exitoso se pierde por una caída | persistencia canónica + evento durable + retry idempotente |
| Se rompe el trabajo local sin commit | punto de restauración antes de la primera edición |

## 20. Decisiones comerciales pendientes antes de código

La lista viva y única está en [`pendientes.md`](pendientes.md), sección “Embudo
comercial de NitroBot”. Incluye nombres, mensualidades, implementación, unidad
de consumo y regla del adicional. Nada de esa lista se codifica como precio
público hasta quedar aprobado. El resto de la arquitectura no depende de esos
valores.

## 21. Fuentes internas

- `docs/diseno-y-narrativa.md`
- `docs/producto/nitrobot.md`
- `docs/arquitectura.md`
- `docs/pendientes.md`
- `/home/juan/nitro_bot/AGENTS.md`
- `/home/juan/nitro_bot/docs/architecture.md`
- `/home/juan/nitro_bot/docs/security-and-tenancy.md`
- `/home/juan/nitro_bot/docs/modules/client-onboarding.md`
