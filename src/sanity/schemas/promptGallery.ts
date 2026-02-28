import { Rule } from 'sanity'

export default {
  name: 'promptGallery',
  title: 'Galería de Prompts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Nombre descriptivo (ej: Gato cyberpunk neón)',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'prompt',
      title: 'Texto del Prompt',
      type: 'text',
      description: 'El prompt exacto utilizado',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'image',
      title: 'Imagen Generada (1:1)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'tool',
      title: 'Herramienta de IA',
      type: 'string',
      options: {
        list: [
          { title: 'Midjourney v6', value: 'midjourney' },
          { title: 'DALL·E 3', value: 'dalle' },
          { title: 'Stable Diffusion', value: 'stable-diffusion' },
          { title: 'Sora', value: 'sora' },
          { title: 'Otra', value: 'otra' }
        ]
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'isPublished',
      title: 'Publicado',
      type: 'boolean',
      initialValue: true,
      description: 'Apaga esto para ocultarlo de la galería'
    }
  ]
}
