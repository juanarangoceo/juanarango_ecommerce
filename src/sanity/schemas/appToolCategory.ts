export default {
  name: 'appToolCategory',
  title: 'App Tool - Categoría',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 50,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Ícono (Lucide)',
      type: 'string',
      options: {
        list: [
          { title: 'MessageSquare (Chatbots)', value: 'MessageSquare' },
          { title: 'PenTool (Escritura)', value: 'PenTool' },
          { title: 'Image (Imagen)', value: 'Image' },
          { title: 'Clapperboard (Video)', value: 'Clapperboard' },
          { title: 'Music (Audio)', value: 'Music' },
          { title: 'Code (Código)', value: 'Code' },
          { title: 'Zap (Productividad)', value: 'Zap' },
          { title: 'Palette (Diseño)', value: 'Palette' },
          { title: 'Megaphone (Marketing)', value: 'Megaphone' },
        ],
      },
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Emerald', value: 'emerald' },
          { title: 'Fuchsia', value: 'fuchsia' },
          { title: 'Violet', value: 'violet' },
          { title: 'Orange', value: 'orange' },
          { title: 'Rose', value: 'rose' },
          { title: 'Sky', value: 'sky' },
          { title: 'Amber', value: 'amber' },
          { title: 'Cyan', value: 'cyan' },
          { title: 'Lime', value: 'lime' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición en los filtros',
    },
  ],
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'icon',
    },
  },
}
