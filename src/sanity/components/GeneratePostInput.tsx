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
  
  // Use correct ID for ops (id usually starts with drafts. if draft)
  // useDocumentOperation automatically handles the draft prefix logic if we pass the raw ID?
  // Actually, useDocumentOperation(id, type) expects the "published" ID or the ID currently in URL.
  // The hook documentation says it takes (id, type).
  // Safest is to pass the docId we have and let Sanity resolve.
  const { publish } = useDocumentOperation(docId?.replace('drafts.', ''), docType)

  // 1. GENERATE TEXT (Gemini)
  const handleGenerateText = useCallback(async () => {
    if (!topic) return
    setIsGeneratingText(true)
    
    try {
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, action: 'generate-text' }),
      })
      
      const json = await res.json()
      if (!res.ok || json.error) throw new Error(typeof json.error === 'object' ? JSON.stringify(json.error) : (json.error || 'Error desconocido'))
      if (!json.data) throw new Error("No data returned from API")

      const { title, slug, content, imagePrompt } = json.data
      setGeneratedData(json.data) 

      // TYPE CORRECTION
      const finalTitle = typeof title === 'string' ? title : topic;
      // Extract just the string for the slug current value
      const slugString = typeof slug === 'string' ? slug : (slug?.current || topic.toLowerCase().replace(/\s+/g, '-').slice(0, 96));

      // Safely update Sanity fields
      if (finalTitle) onChange(set(finalTitle, ['title']))
      // Set the slug object
      if (slugString) onChange(set({ _type: 'slug', current: slugString }, ['slug']))
      if (content && typeof content === 'string') onChange(set(content, ['content']))

      alert('✨ Paso 1 Completo: Texto Generado. Ahora genera la imagen.')

    } catch (err: any) {
      console.error(err)
      const msg = typeof err.message === 'object' ? JSON.stringify(err.message) : err.message
      alert(`Error Texto: ${msg}`)
    } finally {
      setIsGeneratingText(false)
    }
  }, [topic, onChange])

  // 2. GENERATE IMAGE (DALL-E) + AUTO PUBLISH
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

      const json = await res.json()
      if (!res.ok || json.error) {
          throw new Error(typeof json.error === 'object' ? JSON.stringify(json.error) : (json.error || 'Error imagen'))
      }
      
      if (json.imageAssetId) {
        // Patch the mainImage
        onChange(set({
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: json.imageAssetId
            }
        }, ['mainImage']))
        
        // AUTO PUBLISH
        setTimeout(() => {
            if (publish && !publish.disabled) {
                publish.execute()
                alert('🎨 Imagen Generada y... ¡POST PUBLICADO AUTOMÁTICAMENTE! 🚀')
            } else {
                console.warn("Publish action disabled or missing", publish)
                alert('🎨 Imagen Generada. (No se pudo publicar automático - Acción no disponible)')
            }
        }, 1000) // Small delay to ensure patch is applied

      } else {
        throw new Error("No asset ID returned")
      }

    } catch (err: any) {
      console.error(err)
      const msg = typeof err.message === 'object' ? JSON.stringify(err.message) : err.message
      alert(`Error Imagen: ${msg}`)
    } finally {
      setIsGeneratingImage(false)
    }
  }, [topic, generatedData, onChange, publish])

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" border radius={2}>
        <Stack space={3}>
            <Label>Generador AI (Paso a Paso)</Label>
            <Text size={1} muted>Evita bloqueos generando en dos fases. Al finalizar la imagen, se publicará solo.</Text>
            
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
