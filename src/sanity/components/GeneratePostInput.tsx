import { useState, useCallback } from 'react'
import { Stack, Button, Text, TextArea, Label, Card } from '@sanity/ui'
import { set, StringInputProps, useClient, useFormValue } from 'sanity'
import React from 'react'

export function GeneratePostInput(props: StringInputProps) {
  const { onChange, value } = props
  const [isGenerating, setIsGenerating] = useState(false)
  const [topic, setTopic] = useState(value || '')
  
  const client = useClient({apiVersion: '2023-05-03'})
  const documentId = useFormValue(['_id']) as string

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

      const { title, slug, body } = json.data

      await client
        .patch(documentId)
        .set({
            title: title,
            slug: { _type: 'slug', current: slug },
            body: [
                {
                    _type: "block",
                    children: [
                        {
                            _type: "span",
                            text: body, 
                        },
                    ],
                    markDefs: [],
                    style: "normal",
                },
            ]
        })
        .commit()

      alert('✨ Content Generated and Fields Updated!')

    } catch (error) {
      console.error(error)
      alert('Error generating content. Check console for details.')
    } finally {
      setIsGenerating(false)
    }
  }, [topic, client, documentId])

  return (
    <Card padding={4} tone="primary" shadow={1} radius={2} border>
        <Stack space={3}>
            <Label>Tema para Cerebro AI</Label>
            <Text size={1} muted>Escribe un tema y la IA completará el Título, Slug y Cuerpo por ti.</Text>
            
            <TextArea 
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setTopic(e.currentTarget.value)
                    onChange(set(e.currentTarget.value))
                }}
                value={topic} 
                rows={3} 
                placeholder="Ej: Estrategias de retención para e-commerce en 2024..." 
            />
            
            <Button 
                text={isGenerating ? 'Generando (esto toma ~10s)...' : '✨ Generar Blog Post'} 
                tone="primary"
                onClick={handleGenerate}
                disabled={isGenerating || !topic}
                fontSize={2}
                padding={3}
            />
        </Stack>
    </Card>
  )
}
