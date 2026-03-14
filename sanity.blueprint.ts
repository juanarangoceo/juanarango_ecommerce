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
    defineDocumentFunction({
      name: 'createTagsOnPublish',
      src: './functions/createTagsOnPublish/index.ts',
      timeout: 60,
      event: {
        filter: "_type == 'post' && defined(tags) && length(tags) > 0",
        on: ['create', 'update'],
        // Sin includeDrafts → solo posts publicados
      }
    }),
  ],
})