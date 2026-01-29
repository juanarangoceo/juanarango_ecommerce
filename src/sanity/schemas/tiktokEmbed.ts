import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tiktokEmbed',
  title: 'TikTok Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
        name: 'url',
        title: 'TikTok URL',
        type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
    },
    prepare({ title }) {
        return {
            title: title || 'TikTok Embed',
        }
    }
  }
})
