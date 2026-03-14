import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'generateBlogContent',
      src: './functions/generateBlogContent/index.ts',
      event: {
        filter: "_type == 'post'",
        on: ['create', 'update'],
      }
    }),
  ],
})