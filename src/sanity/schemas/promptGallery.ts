import { Rule } from 'sanity'
import { TelegramPromptButton } from '../components/TelegramPromptButton'

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
      name: 'instructions',
      title: 'Instrucciones de Uso (Opcional)',
      type: 'text',
      description: 'Breve explicación de cómo el usuario debe utilizar o modificar este prompt (ej: rellenar variables entre corchetes)',
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
          { title: 'Gemini', value: 'gemini' },
          { title: 'ChatGPT', value: 'chatgpt' },
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
      name: 'category',
      title: 'Categoría',
      type: 'string',
      description: 'Tipo de prompt — se mostrará como etiqueta en la tarjeta',
      options: {
        list: [
          { title: '🖼️ Imágenes', value: 'imagenes' },
          { title: '📱 Apps', value: 'apps' },
          { title: '💻 Desarrollo', value: 'desarrollo' },
          { title: '📣 Marketing', value: 'marketing' },
          { title: '🎬 Video', value: 'video' },
          { title: '✍️ Texto', value: 'texto' },
        ],
        layout: 'radio'
      }
    },
    {
      name: 'requiresLogin',
      title: 'Requiere inicio de sesión',
      type: 'boolean',
      initialValue: false,
      description: 'Activa para que este prompt solo sea visible para usuarios registrados (Premium)'
    },
    {
      name: 'isPublished',
      title: 'Publicado',
      type: 'boolean',
      initialValue: true,
      description: 'Apaga esto para ocultarlo de la galería'
    },
    // ── Telegram ─────────────────────────────────────────────────────────────
    {
      name: 'telegramPublish',
      title: 'Publicar en Telegram',
      type: 'string',
      components: {
        field: TelegramPromptButton,
      },
      description: 'Publica este prompt en el canal de Telegram con imagen y enlace',
    },
  ]
}
