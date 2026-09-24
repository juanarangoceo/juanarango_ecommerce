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

## Relación entre páginas

- `/nitrobot` explica el producto con profundidad y está orientada a orgánico.
- `/nitrobot/conectar` filtra la viabilidad mediante cinco pasos y entrega el
  prospecto al panel comercial de Nitro Bot.
- `/nitrobot/vsl` es una landing breve de Meta Ads y está marcada `noindex`.
- El calificador y la VSL comparten formulario; plataforma, volumen, capacidad
  humana y plazo son señales de calificación. La decisión final siempre se
  recalcula en Nitro Bot y nunca se acepta desde el navegador.
