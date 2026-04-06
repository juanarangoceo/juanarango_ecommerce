export default {
  name: 'blogPdfConfig',
  title: '📄 PDF Summary Config',
  type: 'document',
  fields: [
    {
      name: 'post',
      title: 'Post del Blog',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'Selecciona el post al que quieres agregar la captura de email + PDF.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isActive',
      title: '¿Activo?',
      type: 'boolean',
      description: 'Si está activo, aparecerá el campo de email debajo de la imagen del post.',
      initialValue: false,
    },
    {
      name: 'hookTitle',
      title: 'Hook (Título del Banner)',
      type: 'string',
      description: 'Texto principal del banner de captura. Déjalo vacío para usar el texto por defecto.',
      placeholder: '¿Te parece largo este post?',
    },
    {
      name: 'hookDescription',
      title: 'Descripción del Banner',
      type: 'text',
      rows: 2,
      description: 'Subtítulo debajo del hook. Déjalo vacío para usar el texto por defecto.',
      placeholder: 'Recibe el resumen en PDF en tu bandeja de entrada para leerlo cuando quieras.',
    },
  ],
  preview: {
    select: {
      postTitle: 'post.title',
      isActive: 'isActive',
    },
    prepare({ postTitle, isActive }: any) {
      return {
        title: postTitle || 'Sin post seleccionado',
        subtitle: isActive ? '✅ Activo' : '⏸️ Inactivo',
      }
    },
  },
}
