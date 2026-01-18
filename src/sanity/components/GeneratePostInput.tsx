import { Stack, Button, Card, Text, TextArea, Label, Flex, Spinner } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { set, useDocumentOperation, useFormValue } from 'sanity'

export const GeneratePostInput = (props: any) => {
  const { elementProps, onChange, value } = props
  
  const [topic, setTopic] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Retrieve Document ID (handling drafts)
  const docId = useFormValue(['_id']) as string
  const docType = useFormValue(['_type']) as string
  
  // Ensure hook gets valid strings
  const opId = (docId || '').replace('drafts.', '')
  const opType = docType || 'post'
  const { publish } = useDocumentOperation(opId, opType)

  const handleGenerate = useCallback(async () => {
    if (!topic) return
    setIsGenerating(true)
    
    try {
      // 1. GENERATE CONTENT
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      })
      
      if (res.status === 504) throw new Error("⏳ Timeout: Reduce la complejidad del tema.")

      let json
      const textBody = await res.text()
      try {
          json = JSON.parse(textBody)
      } catch (e) {
          throw new Error(`Error Servidor (HTML): ${textBody.substring(0, 50)}...`)
      }

      if (!res.ok || json.error) throw new Error(JSON.stringify(json.error || 'Error desconocido'))
      if (!json.data) throw new Error("API vacía")

      const { title, slug, content } = json.data

      // 2. POPULATE FIELDS
      const finalTitle = typeof title === 'string' ? title : topic
      const slugString = typeof slug === 'string' ? slug : (slug?.current || topic.toLowerCase().replace(/\s+/g, '-').slice(0, 96))

      if (finalTitle) onChange(set(finalTitle, ['title']))
      if (slugString) onChange(set({ _type: 'slug', current: slugString }, ['slug']))
      if (content && typeof content === 'string') onChange(set(content, ['content']))

      // 3. AUTO PUBLISH
      setTimeout(() => {
        if (publish && !publish.disabled) {
            publish.execute()
            alert('✨ Post Generado y PUBLICADO AUTOMÁTICAMENTE 🚀')
        } else {
            alert('✨ Post Generado. (Publica manualmente)')
        }
      }, 500)

    } catch (err: any) {
      console.error("Gen Error:", err)
      const msg = err && typeof err === 'object' ? (err.message || JSON.stringify(err)) : String(err)
      alert(`⚠️ Error: ${msg}`)
    } finally {
      setIsGenerating(false)
    }
  }, [topic, onChange, publish])

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" border radius={2}>
        <Stack space={3}>
            <Label>Generador AI (Texto Express)</Label>
            <Text size={1} muted>Generación ultrarrápida (Gemini Flash). Sin imágenes.</Text>
            
            <TextArea 
                value={topic}
                onChange={(e) => setTopic(e.currentTarget.value)}
                placeholder="Tema del post..."
                rows={2}
                disabled={isGenerating}
            />

            <Button 
                text={isGenerating ? "Generando..." : "Generar y Publicar"}
                tone="primary"
                onClick={handleGenerate}
                loading={isGenerating}
                disabled={!topic || isGenerating}
            />
        </Stack>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  )
}
