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
