import { GeneratePostInput } from '../components/GeneratePostInput'
import { TelegramPublishButton } from '../components/TelegramPublishButton'

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    // ══ TELEGRAM PUBLISHER ══
    {
      name: 'telegramPublish',
      title: '📢 Publicar en Telegram',
      type: 'string',
      components: {
        input: TelegramPublishButton,
      },
      readOnly: false,
      // This field stores no data — it's purely a UI action button
      hidden: false,
    },
    // ══ AI GENERATOR ══
    {
      name: 'topic',
      title: 'Topic (AI Generator)',
      type: 'string',
      components: {
        input: GeneratePostInput
      }
    },
    // Categoría principal (define la URL: /blog/[category]/[slug])
    {
      name: 'category',
      title: 'Categoría Principal',
      type: 'string',
      options: {
        list: [
          { title: 'Ecommerce', value: 'ecommerce' },
          { title: 'Estrategia de Marketing', value: 'estrategia-marketing' },
          { title: 'IA y Automatización', value: 'ia-automatizacion' },
          { title: 'Headless Commerce', value: 'headless-commerce' },
          { title: 'Prompts', value: 'prompts' },
        ],
      },
      description: 'Se asigna automáticamente por la IA. Define la URL del post.',
    },
    // Etiquetas (tags) para filtrado y SEO
    {
      name: 'tags',
      title: 'Etiquetas (Tags)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Se asignan automáticamente por la IA. Presiona Enter para agregar manualmente.',
    },
    {
      name: 'keywordFocus',
      title: 'Palabra Clave Principal (SEO)',
      type: 'string',
      description: 'Keyword principal del post. Usada para Linkbuilding automático.',
    },
    {
      name: 'secondaryKeywords',
      title: 'Palabras Clave Secundarias',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Otras keywords relevantes generadas por IA.',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Texto alternativo (ALT)',
          type: 'string',
          description: 'Describe la imagen para accesibilidad y SEO. Ej: "Estrategia de ecommerce con IA para tiendas Shopify"',
          validation: (Rule: any) => Rule.warning('Agrega un texto ALT para mejorar el SEO.'),
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
      readOnly: true,
      initialValue: "Juan Arango",
    },
    {
      name: 'youtubeVideo',
      title: 'Video de YouTube (Apoyo)',
      type: 'object',
      description: 'Video relacionado para mejorar el SEO y tiempo en página.',
      fields: [
        {
          name: 'url',
          title: 'URL del Video',
          type: 'url',
          description: 'Ej: https://www.youtube.com/watch?v=...'
        },
        {
          name: 'summary',
          title: 'Resumen del Video (SEO)',
          type: 'text',
          rows: 3,
          description: 'Breve descripción de lo que se habla en el video para el Schema de Google.'
        }
      ]
    },
    {
      name: 'affiliateBanner',
      title: 'Banner de Afiliado (Sidebar/Final)',
      type: 'object',
      description: 'Banner publicitario que aparecerá en el Sidebar (PC) y al final del post (Móvil).',
      fields: [
        {
          name: 'title',
          title: 'Título (Alt Text)',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Imagen del Banner',
          type: 'image',
          options: { hotspot: true },
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'url',
          title: 'Link de Afiliado',
          type: 'url',
          validation: (Rule: any) => Rule.required(),
        }
      ]
    },
    {
      name: 'featuredPromoBlock',
      title: '🚀 Bloque de Recomendación Destacada',
      type: 'object',
      description: 'Aparece al final del post (después de compartir en redes). Solo se muestra si tiene imagen configurada.',
      fields: [
        {
          name: 'image',
          title: 'Imagen del Bloque',
          type: 'image',
          options: { hotspot: true },
          description: 'Imagen principal del bloque. Opcional: si no se sube, el bloque no aparece.',
        },
        {
          name: 'title',
          title: 'Título del Bloque',
          type: 'string',
          description: 'Ej: "¿Listo para llevar tu tienda al siguiente nivel?"',
        },
        {
          name: 'description',
          title: 'Descripción Corta',
          type: 'text',
          rows: 2,
          description: 'Texto de apoyo visible debajo del título (1-2 líneas).',
        },
        {
          name: 'linkUrl',
          title: 'URL de Destino',
          type: 'string',
          description: 'Ruta interna (ej: /blog, /cursos) o URL externa completa.',
        },
        {
          name: 'linkText',
          title: 'Texto del Botón CTA',
          type: 'string',
          description: 'Ej: "Ver cursos", "Ir al blog", "Conoce más"',
          initialValue: 'Conoce más',
        },
      ],
    },
    {
      name: 'faq',
      title: 'FAQ (Preguntas Frecuentes)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Pregunta', type: 'string' },
            { name: 'answer', title: 'Respuesta', type: 'text' }
          ]
        }
      ]
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [{title: 'Bullet', value: 'bullet'}],
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
        {
          type: 'tiktokEmbed', 
        },
        {
          type: 'object',
          name: 'comparisonTable',
          title: 'Tabla Comparativa',
          fields: [
            {
              name: 'title',
              title: 'Título de la Tabla',
              type: 'string'
            },
            {
              name: 'headers',
              title: 'Encabezados',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Columnas de la tabla'
            },
            {
              name: 'rows',
              title: 'Filas',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'cells',
                      title: 'Celdas',
                      type: 'array',
                      of: [{ type: 'string' }]
                    },
                    {
                      name: 'highlight',
                      title: 'Destacar fila',
                      type: 'boolean',
                      description: 'Resaltar esta fila con color verde'
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title'
            },
            prepare({ title }: any) {
              return {
                title: title || 'Tabla Comparativa',
                subtitle: 'Comparación estructurada'
              }
            }
          }
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Bloque de Código/Prompt',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
              description: 'Opcional: descripción del código'
            },
            {
              name: 'language',
              title: 'Lenguaje',
              type: 'string',
              options: {
                list: [
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'Python', value: 'python' },
                  { title: 'HTML', value: 'html' },
                  { title: 'CSS', value: 'css' },
                  { title: 'JSON', value: 'json' },
                  { title: 'Bash', value: 'bash' },
                  { title: 'Prompt', value: 'prompt' },
                  { title: 'Texto', value: 'text' }
                ]
              },
              initialValue: 'text'
            },
            {
              name: 'code',
              title: 'Código',
              type: 'text',
              description: 'El código o prompt a mostrar'
            }
          ],
          preview: {
            select: {
              title: 'title',
              language: 'language'
            },
            prepare({ title, language }: any) {
              return {
                title: title || 'Bloque de Código',
                subtitle: language || 'text'
              }
            }
          }
        }
      ],
    },
    {
      name: 'content',
      title: 'Contenido IA (Markdown)',
      type: 'text', 
      description: 'Contenido generado por IA en formato Markdown. Si existe, tiene prioridad sobre Body.'
    },
  ],
}
