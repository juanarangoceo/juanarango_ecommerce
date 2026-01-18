import { Stack, Button, Card, Text, TextArea, Label, Spinner } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { set, useDocumentOperation, useFormValue, useClient } from 'sanity'

export const GeneratePostInput = (props: any) => {
  const { onChange, value } = props // 'value' is the actual data in Sanity for this field (Topic)
  
  const [isGenerating, setIsGenerating] = useState(false)

  // Retrieve Document ID
  const docId = useFormValue(['_id']) as string
  const docType = useFormValue(['_type']) as string
  
  // Sanity Client for root-level patches
  const client = useClient({ apiVersion: '2024-01-01' })

  // Operation Hook
  const opId = (docId || '').replace('drafts.', '')
  const opType = docType || 'post'
  const { publish } = useDocumentOperation(opId, opType)

  const handleGenerate = useCallback(async () => {
    // Use the value from props (the field value) or fallback
    // If value is an object (corrupted), we try to recover or just send it as string
    const currentTopic = typeof value === 'string' ? value : (typeof value === 'object' ? JSON.stringify(value) : '')
    
    if (!currentTopic) {
        alert("Escribe un tema primero.")
        return
    }

    setIsGenerating(true)
    
    try {
      // 1. GENERATE CONTENT (TEXT ONLY - FAST)
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: currentTopic }),
      })
      
      if (res.status === 504) throw new Error("⏳ Timeout: Tema muy complejo. Simplifícalo.")

      const textBody = await res.text()
      let json
      try {
          json = JSON.parse(textBody)
      } catch (e) {
          throw new Error(`Error Formato (HTML): ${textBody.substring(0, 50)}...`)
      }

      if (!res.ok || json.error) throw new Error(JSON.stringify(json.error || 'Error desconocido'))
      if (!json.data) throw new Error("API vacía")

      const { title, slug, content } = json.data

      // 2. APPLY UPDATES
      // A) Update current field (Topic) to ensure it stays a string (fixes corruption)
      onChange(set(currentTopic)) 

      // B) Update Root fields (Title, Slug, Content) using Client Patch
      const finalTitle = typeof title === 'string' ? title : currentTopic
      
      // FORCE SANITIZATION OF SLUG
      const rawSlug = typeof slug === 'string' ? slug : (slug?.current || currentTopic);
      const slugString = rawSlug
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
          .slice(0, 96);
      
      // BUILD UPDATES OBJECT (Fixes Immutability Bug)
      const attributes: any = {
          title: finalTitle,
          slug: { _type: 'slug', current: slugString }
      };

      if (content && typeof content === 'string') {
          attributes.content = content;
      }

      // Commit one single atomic patch
      await client.patch(docId).set(attributes).commit();

      // 3. AUTO PUBLISH
      setTimeout(() => {
        if (publish && !publish.disabled) {
            publish.execute()
            alert('✨ Post Generado y PUBLICADO AUTOMÁTICAMENTE 🚀')
        } else {
            alert('✨ Post Generado. (Publica manualmente)')
        }
      }, 800)

    } catch (err: any) {
      console.error("Gen Error:", err)
      const msg = err && typeof err === 'object' ? (err.message || JSON.stringify(err)) : String(err)
      alert(`⚠️ Error: ${msg}`)
    } finally {
      setIsGenerating(false)
    }
  }, [value, onChange, client, docId, publish])

  // Handle local typing -> Sync to Sanity immediately
  const handleTopicChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(set(e.currentTarget.value))
  }, [onChange])

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" border radius={2}>
        <Stack space={3}>
            <Label>Generador AI (Texto Express)</Label>
            <Text size={1} muted>Generación ultrarrápida (Gemini Flash). Escribe el tema y dale al botón.</Text>
            
            <TextArea 
                value={typeof value === 'string' ? value : ''} // Bind to Sanity Value
                onChange={handleTopicChange}
                placeholder="Tema del post..."
                rows={2}
                disabled={isGenerating}
            />

            <Button 
                text={isGenerating ? "Generando..." : "Generar y Publicar"}
                tone="primary"
                onClick={handleGenerate}
                loading={isGenerating}
                disabled={!value || isGenerating}
            />
        </Stack>
      </Card>
      {/* Remove default render to avoid double inputs, since we are controlling the field */}
    </Stack>
  )
}
