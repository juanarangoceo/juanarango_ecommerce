import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'generateBlogContent',
      src: './functions/generateBlogContent/index.ts',
      timeout: 300,
      event: {
        filter: "_type == 'post' && generationStatus == 'generating'",
        on: ['create', 'update'],
        includeDrafts: true,
      }
    }),
  ],
})