import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

// We need to ensure we have these env vars exported from an env file or access them directly.
// To avoid cyclical deps or undefined vars if `env.ts` doesn't exist, we'll access process.env directly or 
// create a safely typed env file. For now, direct access as in client.ts is safest for this fix.

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
})

export const urlForImage = (source: any) => {
  return imageBuilder.image(source)
}
