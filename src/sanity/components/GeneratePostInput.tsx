import { useState, useCallback } from 'react'
import { Stack, Button, Text, TextArea, Label, Card, Box } from '@sanity/ui'
import { set, StringInputProps, useClient, useFormValue, useDocumentOperation } from 'sanity'
import React from 'react'

export function GeneratePostInput(props: StringInputProps) {
  const { onChange, value } = props
  const [isGenerating, setIsGenerating] = useState(false)
  const [topic, setTopic] = useState(value || '')
  
  const client = useClient({apiVersion: '2023-05-03'})
  const documentId = useFormValue(['_id']) as string
  const documentType = useFormValue(['_type']) as string
  
  // Hook for document operations (publish)
  // We must pass the published ID (without drafts.) for the publish operation to work correctly
  const publishedId = documentId?.replace(/^drafts\./, '')
  const ops = useDocumentOperation(publishedId, documentType)
  const publish = ops.publish

  const handleGenerate = useCallback(async () => {
    if (!topic) return
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            topic,
            generateOnly: true 
        }),
      })

      const json = await response.json()

      if (!json.success || !json.data) {
        throw new Error(json.error || 'Failed to generate content')
      }

      const { title, slug, body, excerpt } = json.data
      
      // Map API blocks to Portable Text
      const portableTextBody = body.map((block: any) => ({
        _type: "block",
        style: block.style || "normal",
        children: [
            {
                _type: "span",
                text: block.content, 
                marks: block.content.includes('**') ? [] : [], // Basic handling, ideally we parse markdown marks here if needed
            },
        ],
        markDefs: [],
      }))

      // 1. Update Document Content
      await client
        .patch(documentId)
        .set({
            title: title,
            slug: { _type: 'slug', current: slug },
            excerpt: excerpt,
            body: portableTextBody
        })
        .commit()

      // 2. Auto-Publish
      if (publish && !publish.disabled) {
          publish.execute()
          alert('✨ Blog Generated & PUBLISHED Successfully!')
      } else {
          alert('✨ Blog Generated! (Could not auto-publish, please check permissions or status)')
      }

    } catch (error) {
      console.error(error)
      alert('Error generating content. Check console for details.')
    } finally {
      setIsGenerating(false)
    }
  }, [topic, client, documentId, publish, documentType])

  return (
    <Card padding={4} tone="primary" shadow={1} radius={2} border>
        <Stack space={3}>
            <Label>Generador Nitro AI (Hispano)</Label>
            <Text size={1} muted>
                Ingresa un tema. La IA creará un artículo optimizado para SEO, con H1/H2 estructura H3 y Storytelling. 
                <strong style={{color: 'green'}}> Se publicará automáticamente.</strong>
            </Text>
            
            <TextArea 
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setTopic(e.currentTarget.value)
                    onChange(set(e.currentTarget.value))
                }}
                value={topic} 
                rows={3} 
                placeholder="Ej: Estrategias de retención para e-commerce en 2025..." 
            />
            
            <Button 
                text={isGenerating ? 'Generando y Publicando...' : '✨ Generar & Publicar'} 
                tone="primary"
                mode="ghost"
                onClick={handleGenerate}
                disabled={isGenerating || !topic}
                fontSize={2}
                padding={3}
                style={{ background: isGenerating ? '#ccc' : '#22c55e', color: 'white', fontWeight: 'bold' }}
            />
        </Stack>
    </Card>
  )
}
