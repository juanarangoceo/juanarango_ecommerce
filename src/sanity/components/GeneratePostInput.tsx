import { Stack, Button, Card, Text, TextArea, Label, Flex, Spinner } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { set, unset, useDocumentOperation, useFormValue } from 'sanity'

export const GeneratePostInput = (props: any) => {
  const { elementProps, onChange, value } = props
  
  const [topic, setTopic] = useState('')
  const [isGeneratingText, setIsGeneratingText] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [generatedData, setGeneratedData] = useState<any>(null)

  // Retrieve Document ID (handling drafts)
  const docId = useFormValue(['_id']) as string
  const docType = useFormValue(['_type']) as string
  
  // FIXED: Ensure hooks always get strings, even if undefined initially
  const opId = (docId || '').replace('drafts.', '')
  const opType = docType || 'post'
  const { publish } = useDocumentOperation(opId, opType)

    // --- ACCIÓN 1: GENERAR TEXTO ---
    const handleGenerateText = useCallback(async () => {
    if (!topic) return
    setIsGeneratingText(true)
    
    try {
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, action: 'generate-text' }),
      })
      
      if (res.status === 504) {
          throw new Error("⏳ Timeout: El servidor tardó mucho (>10s). Intenta un tema más simple.")
      }

      const textBody = await res.text() 
      let json
      try {
          json = JSON.parse(textBody)
      } catch (e) {
          throw new Error(`Error Servidor (HTML): ${textBody.substring(0, 50)}...`)
      }

      if (!res.ok || json.error) throw new Error(JSON.stringify(json.error || 'Error desconocido'))
      if (!json.data) throw new Error("API devolvió datos vacíos")

      const { title, slug, content, imagePrompt } = json.data
      setGeneratedData(json.data) 

      const finalTitle = typeof title === 'string' ? title : topic;
      const slugString = typeof slug === 'string' ? slug : (slug?.current || topic.toLowerCase().replace(/\s+/g, '-').slice(0, 96));

      if (finalTitle) onChange(set(finalTitle, ['title']))
      if (slugString) onChange(set({ _type: 'slug', current: slugString }, ['slug']))
      if (content && typeof content === 'string') onChange(set(content, ['content']))

      alert('✨ Texto Generado (Rápido). Ahora genera la imagen.')

    } catch (err: any) {
      console.error("Text Gen Error:", err)
      // FIX CRITICO: Forzar stringify para evitar [object Object]
      const msg = err && typeof err === 'object' ? (err.message || JSON.stringify(err)) : String(err)
      alert(`⚠️ Error Texto: ${msg}`)
    } finally {
      setIsGeneratingText(false)
    }
  }, [topic, onChange])

  // --- ACCIÓN 2: GENERAR IMAGEN ---
  const handleGenerateImage = useCallback(async () => {
    setIsGeneratingImage(true)
    try {
      const titleToUse = generatedData?.title || topic
      const promptToUse = generatedData?.imagePrompt || ''
      
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            topic: titleToUse, 
            action: 'generate-image',
            imagePrompt: promptToUse 
        }),
      })
      
      if (res.status === 504) throw new Error("⏳ Timeout generando Imagen (>10s).")

      const json = await res.json()
      if (!res.ok || json.error) {
          throw new Error(JSON.stringify(json.error || 'Error imagen'))
      }
      
      if (json.imageAssetId) {
        onChange(set({
            _type: 'image',
            asset: { _type: 'reference', _ref: json.imageAssetId }
        }, ['mainImage']))
        
        setTimeout(() => {
            if (publish && !publish.disabled) {
                publish.execute()
                alert('🎨 Imagen (DALL-E 2) Generada y... ¡POST PUBLICADO! 🚀')
            } else {
                alert('🎨 Imagen Generada. (Publica manualmente)')
            }
        }, 1500) 

      } else {
        throw new Error("No asset ID returned")
      }

    } catch (err: any) {
      console.error("Image Gen Error:", err)
      const msg = err && typeof err === 'object' ? (err.message || JSON.stringify(err)) : String(err)
      alert(`⚠️ Error Imagen: ${msg}`)
    } finally {
      setIsGeneratingImage(false)
    }
  }, [topic, generatedData, onChange, publish])

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" border radius={2}>
        <Stack space={3}>
            <Label>Generador AI Ultra-Rápido (Sin Timeouts)</Label>
            <Text size={1} muted>Optimidazo para velocidad. 1. Texto (Sin búsqueda). 2. Imagen (DALL-E 2).</Text>
            
            <TextArea 
                value={topic}
                onChange={(e) => setTopic(e.currentTarget.value)}
                placeholder="Tema del post..."
                rows={2}
                disabled={isGeneratingText || isGeneratingImage}
            />

            <Flex gap={2} wrap="wrap">
                <Button 
                    text={isGeneratingText ? "Escribiendo..." : "1. Generar Texto"}
                    tone="primary"
                    onClick={handleGenerateText}
                    loading={isGeneratingText}
                    disabled={!topic || isGeneratingText || isGeneratingImage}
                />
                
                <Button 
                    text={isGeneratingImage ? "Pintando..." : "2. Generar Imagen y Publicar"}
                    tone="positive"
                    onClick={handleGenerateImage}
                    loading={isGeneratingImage}
                    disabled={isGeneratingImage || !generatedData || isGeneratingText} 
                    icon={isGeneratingImage ? Spinner : undefined}
                />
            </Flex>
        </Stack>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  )
}
