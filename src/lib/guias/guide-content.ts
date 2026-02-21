
export type Prompt = {
  title: string;
  content: string;
};

export type Step = {
  id: string;
  title: string;
  description: string;
  content: string;
  prompts: Prompt[];
  affiliateLink?: string;
  affiliateText?: string;
};

export const guideSteps: Step[] = [
  {
    id: "intro",
    title: "Introducción",
    description: "Por qué Shopify es la mejor opción para tu negocio.",
    content: `
# Bienvenido a tu guía interactiva

Estás a punto de construir un imperio en e-commerce. Esta no es una guía cualquiera; es tu mapa de ruta paso a paso.

**¿Por qué Shopify?**
Shopify no es solo una plataforma; es el sistema operativo del comercio moderno. Desde pequeñas startups hasta marcas globales como Gymshark o Kylie Cosmetics, todos confían en su robustez.

**En esta guía encontrarás:**
- Pasos técnicos simplificados con **rutas exactas**.
- **Prompts de IA (Sidekick)** para generar contenido en segundos.
- Estrategias de marketing probadas.

*¿Listo para empezar? [Crea tu tienda por $1 USD aquí](https://shopify.pxf.io/aNREdo).*
    `,
    prompts: [],
    affiliateLink: "https://shopify.pxf.io/aNREdo",
    affiliateText: "🔥 Oferta exclusiva: Comienza tu prueba libre y obtén tu primer mes de Shopify por solo $1 USD. ¡No pierdas esta oportunidad!"
  },
  {
    id: "setup",
    title: "1. Configuración Inicial",
    description: "Creando tu cuenta y definiendo tu identidad.",
    content: `
## El primer paso hacia el éxito

Lo primero es lo primero: necesitas una cuenta. No te preocupes por el nombre perfecto de la tienda todavía, puedes cambiarlo después, pero intenta que sea algo memorable.

**Pasos clave:**
1. Ve a **Shopify** a través de [este enlace promocional (Primer mes a $1 USD)](https://shopify.pxf.io/aNREdo) y regístrate con tu correo electrónico.
2. Completa el cuestionario de inicio (ayuda a Shopify a personalizar tu panel).
3. Verifica tu correo electrónico para asegurar tu cuenta.

### ⚙️ Configuración Técnica Manual (No se puede hacer con IA)
Aunque la IA te ayude con los nombres, hay cosas que debes configurar manualmente siguiendo estas rutas exactas:

- **Datos de Facturación:**
  - **Ruta:** \`Configuración > Facturación\`
  - **Acción:** Añade tu tarjeta de crédito o PayPal. Sin esto, no podrás seleccionar un plan ni quitar la contraseña de la tienda.

- **Moneda de la Tienda:**
  - **Ruta:** \`Configuración > Información de la tienda > Moneda de la tienda\`
  - **Acción:** Asegúrate de que sea la correcta para tu público objetivo (ej. USD, EUR, MXN). **Advertencia:** Es difícil de cambiar después de la primera venta.

- **Zona Horaria:**
  - **Ruta:** \`Configuración > Información de la tienda > Zona horaria\`
  - **Acción:** Configúrala correctamente para que tus reportes de ventas sean precisos y coincidan con tu hora local.
    `,
    prompts: [
      {
        title: "Prompt para Generar Nombres de Marca",
        content: "Actúa como un experto en branding. Dame 10 ideas de nombres para una tienda online de [TU NICHO] que sean cortos, memorables y disponibles como .com. Evita nombres genéricos."
      },
      {
        title: "Prompt para Misión y Visión",
        content: "Escribe una misión y visión inspiradora para una marca de [TU NICHO] que se centre en la sostenibilidad y la calidad. El tono debe ser aspiracional pero cercano."
      }
    ],
    affiliateLink: "https://shopify.pxf.io/aNREdo",
    affiliateText: "⚡ Activa ahora tu promoción especial: Primer mes de Shopify por solo $1 USD."
  },
  {
    id: "products",
    title: "2. Productos Ganadores",
    description: "Agregando inventario que vende.",
    content: `
## El corazón de tu tienda

Un buen producto con una mala descripción no vende. Un producto normal con una historia increíble, sí.

**Al agregar un producto, céntrate en:**
- **Ruta:** \`Productos > Agregar producto\`

- **Título:** Claro, conciso y con palabras clave principales.
- **Descripción:** No solo digas qué es, di *qué hace* por el cliente. Usa viñetas para facilitar la lectura.
- **Imágenes:** Alta calidad, fondo blanco para el catálogo y fotos de estilo de vida (lifestyle) para mostrar el uso.

### ⚙️ Configuración Técnica Manual
- **SKU (Stock Keeping Unit):**
  - **Ubicación:** Sección *Inventario* dentro de la página del producto.
  - **Acción:** Asigna un código único a cada variante para gestionar el inventario.

- **Peso del Producto:**
  - **Ubicación:** Sección *Envío*.
  - **Acción:** ¡Crucial! Ingresa el peso exacto. Si esto está mal, los cálculos de envío automáticos fallarán y perderás dinero.

- **Rastreo de Inventario:**
  - **Ubicación:** Sección *Inventario*.
  - **Acción:** Marca la casilla "Rastrear cantidad" si tienes stock limitado.

- **Colecciones:**
  - **Ruta:** \`Productos > Colecciones\`
  - **Tip Pro:** Usa condiciones automáticas (ej. "Etiqueta de producto es igual a 'Verano'") para que los productos se organicen solos.
    `,
    prompts: [
      {
        title: "Prompt para Descripción de Producto (AIDA)",
        content: "Escribe una descripción de producto persuasiva para [NOMBRE DEL PRODUCTO]. Utiliza el marco AIDA (Atención, Interés, Deseo, Acción) y enfócate en los beneficios emocionales más que en las características técnicas."
      },
      {
        title: "Prompt para Títulos SEO",
        content: "Genera 5 títulos SEO-friendly para un [TIPO DE PRODUCTO] que incluyan las palabras clave: [LISTA DE KEYWORDS]. Mantén los títulos bajo 60 caracteres."
      }
    ]
  },
  {
    id: "theme",
    title: "3. Diseño y Tema",
    description: "Tu escaparate digital.",
    content: `
## Diseña sin ser diseñador

No necesitas código. La tienda de temas de Shopify es increíble y el editor visual es "arrastrar y soltar".

**Recomendación:** Empieza con el tema **Dawn**. Es gratuito, creado por Shopify (OS 2.0), extremadamente rápido y flexible.

### ⚙️ Configuración Técnica Manual
- **Personalizar Tema:**
  - **Ruta:** \`Tienda online > Temas > Personalizar\`
  - **Acción:** Aquí es donde editas visualmente tu tienda.

- **Favicon:**
  - **Ruta:** Dentro del editor: \`Configuración del tema > Logo > Imagen de favicon\`
  - **Acción:** Sube tu logo en versión pequeña (32x32px).

- **Redes Sociales:**
  - **Ruta:** Dentro del editor: \`Configuración del tema > Redes sociales\`
  - **Acción:** Pega los enlaces de tus perfiles para que aparezcan en el pie de página.

- **Checkout (Pantalla de Pago):**
  - **Ruta:** Dentro del editor: \`Configuración del tema > Pantalla de pago\`
  - **Acción:** Sube tu logo y ajusta los colores para que coincidan con tu marca. Esto aumenta drásticamente la confianza del comprador.
    `,
    prompts: [
      {
        title: "Prompt para Paleta de Colores",
        content: "Sugiere una paleta de colores de 4 tonos para una marca de [TU NICHO] que quiera transmitir [EMOCIÓN: ej. confianza, energía, lujo]. Dame los códigos HEX y explica por qué elegiste cada uno."
      },
      {
        title: "Prompt para Copywriting del Banner",
        content: "Escribe 3 opciones de texto (título y subtítulo) para el banner principal de la home que invite a los visitantes a ver la colección de verano. El tono debe ser urgente pero elegante."
      }
    ]
  },
  {
    id: "pages",
    title: "4. Páginas Esenciales",
    description: "Contacto, Sobre Nosotros y Legales.",
    content: `
## Generando Confianza

Una tienda necesita credibilidad. Las páginas estáticas son donde construyes esa confianza con el cliente.

### ⚙️ Configuración Técnica Manual
- **Crear Páginas:**
  - **Ruta:** \`Tienda online > Páginas > Agregar página\`
  - **Acción:** Crea "Sobre Nosotros", "Contacto", "Preguntas Frecuentes".

- **Formulario de Contacto:**
  - **Ruta:** Al crear la página de contacto, busca el cuadro "Plantilla de tema" a la derecha y selecciona \`contact\`.
  - **Email del Remitente:** Ve a \`Configuración > Notificaciones\` y asegúrate de que el correo sea profesional (no gmail.com) para evitar caer en SPAM.

- **Menús de Navegación:**
  - **Ruta:** \`Tienda online > Navegación\`
  - **Acción:** Entra en "Menú principal" para añadir tus nuevas páginas al encabezado. Entra en "Menú inferior" para añadir las políticas al pie de página.

- **Plantillas Legales:**
  - **Ruta:** \`Configuración > Políticas\`
  - **Acción:** Usa el botón "Crear a partir de plantilla" para generar textos legales base. **Importante:** Revisa y reemplaza los [CORCHETES] con tus datos reales.
    `,
    prompts: [
      {
        title: "Prompt para Página 'Sobre Nosotros'",
        content: "Escribe una historia para la página 'Sobre Nosotros' de una tienda fundada por [TU NOMBRE] que nació de la frustración por [PROBLEMA QUE RESUELVES]. Usa un tono cercano, honesto y storytelling emotivo."
      },
      {
        title: "Prompt para Política de Devoluciones",
        content: "Redacta una política de devoluciones clara y justa para una tienda de ropa, ofreciendo 30 días de garantía y cambios gratuitos. Usa un lenguaje sencillo y tranquilizador."
      }
    ]
  },
  {
    id: "payments",
    title: "5. Pagos y Envíos",
    description: "Cómo te pagan y cómo entregas.",
    content: `
## La logística del éxito

Esta es la parte "aburrida" pero vital para que el dinero fluya.

### ⚙️ Configuración Técnica Manual
- **Pasarelas de Pago:**
  - **Ruta:** \`Configuración > Pagos\`
  - **Shopify Payments:** Si está disponible, actívalo. Requiere verificación de identidad (DNI/Pasaporte) y cuenta bancaria. Hazlo antes de lanzar.
  - **PayPal:** Actívalo como método secundario para mayor conversión.

- **Impuestos:**
  - **Ruta:** \`Configuración > Impuestos y aranceles\`
  - **Acción:** En la mayoría de casos, marca "Cobrar impuestos". Shopify calcula las tasas automáticamente según la ubicación del cliente.

- **Perfiles de Envío:**
  - **Ruta:** \`Configuración > Envío y entrega\`
  - **Acción:** Configura tus tarifas.
    - *General:* Para todos los productos.
    - *Personalizado:* Crea un nuevo perfil si tienes productos muy pesados o frágiles que cuestan más enviar.
    - *Envío Gratis:* Configura una tarifa de precio $0 cuando el pedido supere X cantidad (ej. $50).
    `,
    prompts: [
      {
        title: "Prompt para Estrategia de Precios",
        content: "Calcula una estrategia de precios para un producto que me cuesta $10, el envío es $5 y quiero un margen del 40%. ¿A cuánto debo venderlo y cómo puedo estructurar una oferta de 'Envío Gratis' sin perder dinero?"
      }
    ]
  },
  {
    id: "launch",
    title: "6. El Gran Lanzamiento",
    description: "Abriendo las puertas al mundo.",
    content: `
## ¡Es hora del show!

Estás listo. Pero antes de cortar la cinta roja y anunciar tu tienda al mundo:

### ⚙️ Configuración Técnica Manual
- **Dominio:**
  - **Ruta:** \`Configuración > Dominios\`
  - **Acción:** Conecta tu dominio existente o compra uno nuevo. Si es externo, configura los registros DNS (A Record y CNAME) en tu proveedor.

- **Quitar Contraseña:**
  - **Ruta:** \`Tienda online > Preferencias > Protección con contraseña\`
  - **Acción:** Desmarca "Restringir el acceso a los visitantes con la contraseña". **Nota:** Necesitas haber seleccionado un plan de pago para hacer esto.

- **Google Analytics 4:**
  - **Ruta:** \`Canales de ventas > Google & YouTube\` (Instala la app si no la tienes).
  - **Acción:** Conecta tu cuenta de Google para rastrear visitas.

- **Pixel de Meta:**
  - **Ruta:** \`Canales de ventas > Facebook & Instagram\`
  - **Acción:** Configura el píxel para rastrear conversiones de tus anuncios.
    `,
    prompts: [
      {
        title: "Prompt para Calendario de Contenidos",
        content: "Crea un plan de lanzamiento de 5 días para redes sociales (Instagram y TikTok) para anunciar la apertura de mi tienda. Incluye ideas de contenido para cada día (Reels, Stories, Posts) y los ganchos visuales."
      },
      {
        title: "Prompt para Email de Lanzamiento",
        content: "Redacta un email de anuncio de lanzamiento para mi lista de espera. El asunto debe ser irresistible. El cuerpo debe ofrecer un código de descuento del 10% por tiempo limitado y crear urgencia."
      }
    ],
    affiliateLink: "https://shopify.pxf.io/aNREdo",
    affiliateText: "🚀 Es el momento de vender. Lanza tu tienda hoy aprovechando la promoción especial de Shopify por $1 USD."
  },
  {
    id: "advanced",
    title: "7. Nivel Avanzado",
    description: "Apps y Marketing para escalar.",
    content: `
## Escalar al siguiente nivel

Tu tienda está viva. Ahora toca crecer y optimizar.

### ⚙️ Configuración Técnica Manual
- **Automatizaciones (Email):**
  - **Ruta:** \`Marketing > Automatizaciones\`
  - **Acción:** Activa el flujo de "Carrito abandonado". Es la automatización más rentable.

- **Velocidad del Sitio:**
  - **Ruta:** \`Tienda online > Temas\`
  - **Acción:** Revisa el "Informe de velocidad". Si es bajo, comprime imágenes (usa apps como TinyIMG) o elimina apps que no uses.

- **SEO (Blog):**
  - **Ruta:** \`Tienda online > Blog\`
  - **Acción:** Crea tu primer artículo para empezar a atraer tráfico orgánico de Google.
    `,
    prompts: [
      {
        title: "Prompt para Ideas de Blog (SEO)",
        content: "Dame 5 ideas de artículos de blog para atraer tráfico orgánico a una tienda de [TU NICHO]. Para cada idea, sugiere la palabra clave principal y una estructura básica del artículo."
      },
      {
        title: "Prompt para Anuncios de Facebook (Ads)",
        content: "Escribe 3 variaciones de ad copy para Facebook Ads promocionando [PRODUCTO], enfocándote en 3 ángulos distintos: 1) Dolor/Solución, 2) Prueba Social (Testimonios), 3) Oferta/Urgencia."
      }
    ]
  }
];
