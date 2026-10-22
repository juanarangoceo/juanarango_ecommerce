# NitroBot — verdad de producto para el sitio

## Autoridad

El producto real vive en `/home/juan/nitro_bot`. Su `AGENTS.md`, código,
migraciones y servicios verificados son la autoridad. Esta ficha traduce esa
realidad a mensajes comerciales; debe actualizarse cuando el producto cambie.

## Qué es

SaaS multi-tenant de ventas y atención por WhatsApp para negocios con catálogo
de productos. Puede sincronizar catálogo y pedidos con Shopify o trabajar sin
una tienda online mediante el catálogo nativo de NitroBot. Cada negocio
conserva sus datos aislados y dispone de dashboard.

## Capacidades comprobadas que sí se pueden comunicar

- Atiende conversaciones de WhatsApp con IA.
- Consulta el catálogo real mediante RAG.
- Para negocios sin Shopify, permite crear y editar productos, subir fotos e
  importar el catálogo mediante CSV desde el dashboard.
- Recomienda productos y trabaja con imágenes, video y notas de voz.
- Calcula precios y totales server-side desde el catálogo.
- Recopila los datos necesarios para la entrega.
- Crea pedidos contraentrega en Shopify.
- Cuando el catálogo es nativo, registra el pedido y sus datos de entrega en el
  panel para que el equipo prepare el despacho.
- Escala casos que necesitan criterio humano y conserva el contexto.
- Ofrece dashboard de conversaciones, tickets, pedidos, CRM y métricas.
- Incluye funciones operativas como recordatorios, carritos, recuperación de
  ventas y módulos de confirmación o postventa según configuración del cliente.

## Voz, pagos y logística — verificados el 22-oct-2026

La revisión combinó documentación, código y consultas de solo lectura a la
configuración del producto. No se hicieron cobros, llamadas, clonaciones ni
guías reales. No se modificó NitroBot.

| Función | Promesa permitida | Condición y límite |
|---|---|---|
| Notas de voz | Responder audios con Sara, Carlos o voz propia clonada | Elegir voz; la propia requiere grabación, autorización y preparación/prueba por Nitro. No prometer clonación instantánea ni precio no verificado. |
| Nitro Call | Atender llamadas entrantes de WhatsApp | Habilitación, elección entre 8 voces y saldo propio en COP, consumido por segundos. No usa la voz clonada de los audios. Confirmación de compra por escrito. |
| Confío para compradores | Enviar enlace en el chat y recibir confirmación del pago | El negocio conecta su propia cuenta. Medios según lo habilitado en esa cuenta y las condiciones de Confío. Es distinto al cobro de activación/recargas de Nitro. |
| 17TRACK | Consultar guías y notificar hitos al habilitar avisos | Activación por tienda, saldo por guía, disponibilidad según guía/transportadora, configuración y plantillas para avisos. No crea guías. |
| Skydropx | Conexión en preparación | Creación de guías todavía no disponible. Las puertas de habilitación y validación siguen apagadas; una conexión sandbox pendiente no prueba producción. |
| Recuperación | Retomar conversaciones y acordar un día/franja con permiso | Horarios y consentimiento; fuera de ventana, plantilla aprobada por Meta. Reemplaza la descripción antigua de un segundo mensaje genérico con oferta. |
| Instagram | Atender mensajes con catálogo y llevar a WhatsApp para cerrar | Requiere conectar la cuenta. No anunciar cierre completo de compra dentro de Instagram. |

Medios del catálogo Confío: PSE, Nequi, Bancolombia, DaviPlata, Visa,
Mastercard y American Express; mostrar logos con la condición anterior.
Transportadoras contempladas en el catálogo de seguimiento: Inter Rapidísimo,
Coordinadora, Envía, Servientrega, TCC, Deprisa y 4-72. Sus logos identifican
transportadoras, no contratos propios ni cobertura garantizada. El código del
proveedor advierte que Servientrega está catalogada como Ecuador aunque apunta
a Colombia: revisar las primeras guías antes de prometer disponibilidad en un
caso concreto.

Fuentes de producto: `docs/modules/{voz-asesor,llamadas,confio,seguimientos,
skydropx,recovery,instagram}.md`, `lib/voice/{reply-voice,toggle}.ts`,
`lib/tracking/{provider,config}.ts`, `lib/skydropx/config.ts`,
`lib/payments/methods.ts` y `lib/complete/capabilities.ts` en NitroBot.
Las consultas leyeron configuración y resúmenes de disponibilidad; no se
copiaron datos de clientes ni identificadores de voces/proveedores a la web.
Marketing/respuestas de campañas no se venden como incluidos en Prepago;
Nitro Pixel sin despliegue verificado no se promociona como conexión disponible.

## Mensaje principal de la landing VSL

> Convierte chats de WhatsApp en pedidos listos para despachar.

Apoyo:

> Conecta Shopify o sube tu catálogo directo a NitroBot. El asesor recomienda,
> cotiza, pide los datos de entrega y deja el pedido listo para despacho. Si el
> caso necesita criterio, pasa el chat a tu equipo con todo el contexto.

## Lenguaje preferido

- Decir **«consulta tu catálogo real»**, no «se aprende tu catálogo».
- Mostrar el resultado concreto: **pedido creado en Shopify** cuando existe esa
  integración, o **pedido registrado para despacho** con catálogo nativo.
- Hablar de control humano y trazabilidad, no de reemplazar personas.
- Explicar que la implementación se adapta a la operación.
- Usar «contraentrega» cuando el contexto lo requiera; no insinuar que todos los
  métodos de pago tienen el mismo flujo.

## Afirmaciones que necesitan cuidado

- «Conserva tu número» depende del proceso concreto de conexión con Meta; no
  usar como garantía universal sin validar el caso.
- «24/7» describe disponibilidad técnica, no garantiza cierre de toda venta.
- No prometer tasas de conversión, ahorros o ingresos sin evidencia publicada.
- No presentar campañas masivas, Nitro Pixel o todos los subagentes como parte
  universal del plan: varios módulos dependen de configuración o rollout.
- La efectividad del escalado humano depende de que el equipo atienda tickets.
- WooCommerce y otras plataformas requieren revisar la integración automática.
  Como alternativa comprobada, el negocio puede administrar su catálogo en
  NitroBot y gestionar los pedidos desde el panel.

## Activación y recargas (22-oct-2026)

Decisión de Juan: la oferta pública se concentra en una activación inicial y
recargas posteriores. Se retiran los planes de la web y de la recomendación
automática del vendedor. No se cambian modalidades, planes históricos ni
facturación de NitroBot.

- **Activación: $199.000 COP una sola vez.** Es el kit existente del producto,
  presentado en la web como el pago de acceso e instalación: número gestionado
  por Nitro, 500 turnos y 100 plantillas. Instalación en máximo 48 horas desde
  pago y ficha completos. No es una primera recarga de $16.000 ni una prueba gratis.
- **Después: recargas desde $16.000 COP por 100 turnos.** Sin mensualidad,
  fecha de corte ni vencimiento del saldo comprado. Las plantillas tienen
  saldo separado y cuestan $70 cada una. Precios con IVA.
- Precios contrastados mediante una consulta de lectura de
  `platform_settings.outbound_pricing` el 22-oct: coinciden con el código de la web
  y el respaldo del vendedor. No se modificó NitroBot ni su base.
- Un turno es una respuesta enviada por el asesor. La calculadora usa 3 como
  referencia editable por conversación y presenta paquetes reales de compra;
  no promete una cantidad garantizada de conversaciones ni ventas.
- Número actual: revisar el proceso con Meta antes de pagar; no garantizarlo.
- Empresas con más capacidad o conexiones especiales solicitan revisión a Juan.
  El nuevo formulario llega al **panel del vendedor** (`bot_super_admin`), no
  al admin de NitroBot. No crea cuentas ni mensajes automáticos.
- Juan solicitó publicar el rediseño el 22-oct. Resultado y comprobaciones en
  `docs/bitacora/2026-10.md`; no se modifica NitroBot.

## Relación entre páginas

Actualización de contacto, 5-oct-2026 (publicación autorizada por Juan;
comprobación registrada en la bitácora): el recorrido principal de Nitro Complete comienza por WhatsApp con
el asistente de Juan, en **+57 311 300 5150**. Explica activación y recargas y facilita el enlace público de registro. La
ficha y el pago se completan en la cuenta; las altas manuales conservan la
autorización de Juan. La calculadora transmite
los datos elegidos como estimaciones en el mensaje editable. El contacto del
titular en los documentos legales se conserva separado del canal de ventas.

- `/nitrobot` explica el producto con profundidad y está orientada a orgánico.
- `/nitrobot/conectar` queda como alternativa para evaluar por formulario:
  filtra la viabilidad mediante cinco pasos, entrega el prospecto al panel
  comercial de Nitro Bot y permite continuar con el vendedor por WhatsApp.
- `/nitrobot/vsl` es una landing breve de Meta Ads y está marcada `noindex`.
- La VSL prioriza la conversación por WhatsApp y enlaza el formulario como
  alternativa; plataforma, volumen, capacidad
  humana y plazo son señales de calificación. La decisión final siempre se
  recalcula en Nitro Bot y nunca se acepta desde el navegador.
