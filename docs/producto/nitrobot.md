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

## Claridad de precios y activación (5-oct-2026)

- Kit: $199.000 COP, 500 turnos y 100 plantillas, con número gestionado por
  Nitro. Instalación en máximo 48 h desde pago y ficha completos.
- Plan: mensualidad del plan más $700.000 COP de implementación, una sola
  vez. La mensualidad no está incluida en ese pago; ambas aparecen juntas.
- Conservar el número actual depende del proceso con Meta. Se revisa por
  WhatsApp antes del pago, sin prometer compatibilidad universal.
- Cada respuesta del asesor cuenta como un turno; conversaciones equivalentes
  y resultados de la calculadora son estimaciones. Los importes y la fórmula
  de recomendación se conservan, sin modificar NitroBot.

## Relación entre páginas

Actualización de contacto, 5-oct-2026 (publicación autorizada por Juan;
comprobación registrada en la bitácora): el recorrido principal de Nitro Complete comienza por WhatsApp con
el asistente de Juan, en **+57 311 300 5150**. Orienta sobre kit/planes y recoge
la ficha para preparar el alta que Juan autoriza. La calculadora transmite
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
