import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Check your .env.local file.')
}

export default defineConfig({
  basePath: '/studio',
  name: 'JuanArango_Content_Studio',
  title: 'Juan Arango Content Studio',

  projectId,
  dataset,

  // Login por token: el cliente del Studio conoce el token de la sesión y las
  // herramientas propias lo envían a las APIs del sitio, que lo verifican con
  // Sanity (src/lib/sanity-editor-auth.ts). Evita secretos NEXT_PUBLIC_.
  auth: { loginMethod: 'token' },

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
