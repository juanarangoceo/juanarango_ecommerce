import { Stack, Button, Card, Text, TextArea, Label, Flex, Spinner } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { set, unset } from 'sanity'

export const GeneratePostInput = (props: any) => {
  const { elementProps, onChange, value } = props
  
  const [topic, setTopic] = useState('')
  const [isGeneratingText, setIsGeneratingText] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [generatedData, setGeneratedData] = useState<any>(null)

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
      if (!res.ok || json.error) throw new Error(json.error || 'Error desconocido')
      if (!json.data) throw new Error("No data returned from API")

      const { title, slug, content, imagePrompt } = json.data
      
      setGeneratedData(json.data) 

      // Safely update Sanity fields
      if (title) onChange(set(title, ['title']))
      if (slug) onChange(set({ _type: 'slug', current: slug }, ['slug']))
      if (content) onChange(set(content, ['content']))
      
      // Optional: Save the prompt to a hidden field if needed, or just keep in state
      // if (imagePrompt) onChange(set(imagePrompt, ['imagePrompt'])) 

      alert('✨ Texto Generado! Pasando a fase 2...')

    } catch (err: any) {
      console.error(err)
      alert(`Error Texto: ${err.message}`)
    } finally {
      setIsGeneratingText(false)
    }
  }, [topic, onChange])

  // 2. GENERATE IMAGE (DALL-E)
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
      if (!res.ok || json.error) throw new Error(json.error || 'Error imagen')
      
      if (json.imageAssetId) {
        // Patch the mainImage
        onChange(set({
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: json.imageAssetId
            }
        }, ['mainImage']))
        
        alert('🎨 Imagen Generada y Asignada!')
      } else {
        throw new Error("No asset ID returned")
      }

    } catch (err: any) {
      console.error(err)
      alert(`Error Imagen: ${err.message}`)
    } finally {
      setIsGeneratingImage(false)
    }
  }, [topic, generatedData, onChange])

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" border radius={2}>
        <Stack space={3}>
            <Label>Generador AI (Paso a Paso)</Label>
            <Text size={1} muted>Evita bloqueos generando en dos fases.</Text>
            
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
                    text={isGeneratingImage ? "Pintando..." : "2. Generar Imagen"}
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
