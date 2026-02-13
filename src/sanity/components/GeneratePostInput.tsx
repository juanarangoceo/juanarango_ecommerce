import { Stack, Button, Card, Text, TextArea, Label, useToast } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { set, useDocumentOperation, useFormValue, useClient } from 'sanity'

export const GeneratePostInput = (props: any) => {
  const { onChange, value } = props
  const toast = useToast()
  
  const [isGenerating, setIsGenerating] = useState(false)

  // Retrieve Document ID and Type
  const docId = useFormValue(['_id']) as string
  const docType = useFormValue(['_type']) as string
  
  // Sanity Client
  const client = useClient({ apiVersion: '2024-01-01' })

  // Operation Hook - crucial: must use the "published" ID format (no 'drafts.' prefix) for useDocumentOperation
  const publishedId = (docId || '').replace('drafts.', '')
  const { publish } = useDocumentOperation(publishedId, docType || 'post')

  const handleGenerate = useCallback(async () => {
    // Robust value retrieval
    const currentTopic = typeof value === 'string' ? value : (typeof value === 'object' ? JSON.stringify(value) : '')
    
    if (!currentTopic || currentTopic.length < 3) {
        toast.push({ title: "Escribe un tema válido primero.", status: 'warning' })
        return
    }

    setIsGenerating(true)
    
    try {
      toast.push({ title: "Iniciando IA...", status: 'info' })

      // 1. CALL API
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: currentTopic }),
      })
      
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        throw new Error(errJson.error || `Error ${res.status}: ${res.statusText}`)
      }

      const json = await res.json()
      if (!json.success || !json.data) {
          throw new Error("Respuesta inválida de la API")
      }

      const { title, slug, content } = json.data

      // 2. VALIDATION
      if (!content || content.length < 50) {
          throw new Error(`Contenido generado insuficiente (${content?.length || 0} chars).`)
      }

      // 3. UPDATE SANITY DOCUMENT & CREATE TAGS
      const tagsData = json.data.tags || []
      const tagSlugs: string[] = []

      // Create missing tags (Fire & Forget for user experience, but await for consistency)
      // Since we are in Studio, we have write permissions via useClient
      toast.push({ title: "Procesando etiquetas...", status: 'info' })
      
      for (const tag of tagsData) {
          if (!tag.slug) continue
          
          tagSlugs.push(tag.slug)

          // Try to create the tag document if it doesn't exist
          try {
              // Deterministic ID based on slug to avoid duplicates
              const tagDocId = `tag-${tag.slug}`
              await client.createIfNotExists({
                  _id: tagDocId,
                  _type: 'tag',
                  name: tag.name, // "Next.js"
                  slug: { _type: 'slug', current: tag.slug }, // "next-js"
                  // description: Left empty for now as requested
              })
          } catch (err) {
              console.error("Error creating tag:", tag.name, err)
              // Continue even if tag creation fails, we still want to save the post
          }
      }

      // Helper to sanitize slug
      const sanitizeSlug = (text: string) => {
          return text
              .toString()
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with -
              .replace(/(^-|-$)/g, '')     // Remove leading/trailing -
              .slice(0, 96)                // Limit length
      }

      const finalSlug = typeof slug === 'string' ? sanitizeSlug(slug) : (slug?.current ? sanitizeSlug(slug.current) : sanitizeSlug(title || currentTopic))

      // Patch the document (using docId which might be a draft)
      const attributes: any = {
          title: title || currentTopic,
          slug: { _type: 'slug', current: finalSlug },
          content: content,
          faq: json.data.faq || [],
          author: "Juan Arango",
          category: json.data.category || 'ecommerce',
          tags: tagSlugs, // Now saving normalized slugs ["next-js"]
      }

      // Also update the current field (Topic) in the form state
      onChange(set(currentTopic))

      // Perform the patch
      toast.push({ title: "Actualizando documento...", status: 'info' })
      await client.patch(docId).set(attributes).commit()

      // 4. PUBLISH (Optional but requested)
      // Small delay to ensure patch is propagated before publish attempt
      setTimeout(() => {
        if (publish && !publish.disabled) {
            publish.execute()
            toast.push({ title: "¡Publicado exitosamente!", status: 'success' })
        } else {
            // Cannot publish mostly because of validation errors or permissions
            toast.push({ 
                title: "Post generado (Borrador)", 
                description: "Revisa y publica manualmente.", 
                status: 'success' 
            })
        }
      }, 1000)

    } catch (err: any) {
      console.error("Gen Error:", err)
      toast.push({ 
          title: "Error en Generación", 
          description: err.message || "Ocurrió un error inesperado", 
          status: 'error',
          duration: 5000
      })
    } finally {
      setIsGenerating(false)
    }
  }, [value, onChange, client, docId, publish, toast])

  // Handle local typing
  const handleTopicChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(set(e.currentTarget.value))
  }, [onChange])

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" border radius={2}>
        <Stack space={3}>
            <Label>Generador AI (Gemini 3 Flash)</Label>
            <Text size={1} muted>Introduce el tema y la IA escribirá y estructurará el post por ti.</Text>
            
            <TextArea 
                value={typeof value === 'string' ? value : ''}
                onChange={handleTopicChange}
                placeholder="Ej: Beneficios del café para la salud..."
                rows={3}
                disabled={isGenerating}
            />

            <Button 
                text={isGenerating ? "Generando contenido..." : "Generar Blog Post"}
                tone="primary"
                onClick={handleGenerate}
                loading={isGenerating}
                disabled={!value || isGenerating}
                fontSize={2}
                padding={3}
            />
        </Stack>
      </Card>
    </Stack>
  )
}
