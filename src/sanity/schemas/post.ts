import { GeneratePostInput } from '../components/GeneratePostInput'

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'topic',
      title: 'Topic (AI Generator)',
      type: 'string',
      components: {
        input: GeneratePostInput
      }
    },
    {
      name: 'topics',
      title: 'Temas/Categorías',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Etiquetas para relacionar posts similares (ej: Ecommerce, Marketing, Shopify)'
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
