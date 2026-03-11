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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_SECRET}`,
        },
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

      // Helper to sanitize slug — garantiza slugs limpios aunque la IA devuelva formato inesperado
      const sanitizeSlug = (text: string) => {
          return text
              .toString()
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')    // quita acentos
              .replace(/[^a-z0-9]+/g, '-')        // chars inválidos → guiones
              .replace(/(^-|-$)/g, '')             // sin guiones al inicio/final
              .slice(0, 96)
      }

      // 3. PREPARAR TAGS — crear documentos de etiqueta como BORRADORES
      // Se crean con el prefijo "drafts." para que sean invisibles al público
      // (no aparecen en el sitemap ni en páginas de etiquetas) hasta que el
      // usuario los revise y publique desde la sección "Etiqueta" en Studio.
      const tagsData = json.data.tags || []

      const validTags = tagsData.filter((tag: any) => {
          const name = (tag?.name || '').trim()
          const slug = sanitizeSlug(tag?.slug || tag?.name || '')
          return name.length > 0 && slug.length > 0
      })

      const tagSlugs: string[] = validTags.map((tag: any) =>
          sanitizeSlug(tag.slug || tag.name)
      )

      // Crear documentos de etiqueta como borradores (no publicados)
      await Promise.allSettled(
          validTags.map(async (tag: any) => {
              const cleanSlug = sanitizeSlug(tag.slug || tag.name)
              const cleanName = (tag.name || tag.slug || '').trim()
              const publishedId = `tag-${cleanSlug}`
              const draftTagId = `drafts.tag-${cleanSlug}`
              try {
                  // createIfNotExists no sobreescribe si ya existe
                  await client.createIfNotExists({
                      _id: draftTagId,
                      _type: 'tag',
                      name: cleanName,
                      slug: { _type: 'slug', current: cleanSlug },
                  })
              } catch (err) {
                  console.warn(`⚠️ Tag draft "${cleanName}" no se pudo crear:`, err)
              }
          })
      )


      const finalSlug = typeof slug === 'string' ? sanitizeSlug(slug) : (slug?.current ? sanitizeSlug(slug.current) : sanitizeSlug(title || currentTopic))

      // Patch the document (using docId which might be a draft)
      const attributes: any = {
          title: title || currentTopic,
          slug: { _type: 'slug', current: finalSlug },
          content: content,
          // Sanity requiere _key único por cada item del array para renderizarlos en Studio
          faq: (json.data.faq || []).map((item: any, index: number) => ({
              _key: `faq-${index}-${Date.now()}`,
              question: item.question || '',
              answer: item.answer || '',
          })),
          author: "Juan Arango",
          category: json.data.category || 'ecommerce',
          tags: tagSlugs,
      }

      // Also update the current field (Topic) in the form state
      onChange(set(currentTopic))

      // Perform the patch — always target the draft to avoid overwriting the published doc
      // NOTE: We do NOT call the revalidation webhook here because the post is still a draft.
      // Revalidation happens when the user clicks "Publish" in Sanity Studio.
      const draftId = docId.startsWith('drafts.') ? docId : `drafts.${docId}`
      toast.push({ title: "Actualizando documento...", status: 'info' })
      await client.patch(draftId).set(attributes).commit()

      // 4. HECHO (No publicar automáticamente)
      toast.push({ 
          title: "Borrador Generado Exitosamente", 
          description: "Revisa el contenido y publica cuando estés listo.", 
          status: 'success',
          duration: 5000
      })

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
