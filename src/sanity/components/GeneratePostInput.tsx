import { Stack, Button, Card, Text, TextArea, Label, Flex } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { set, unset, useFormValue } from 'sanity'

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
        body: JSON.stringify({ topic, action: 'generate-text' }),
      })
      
      const json = await res.json()
      if (!res.ok || json.error) throw new Error(json.error || 'Error desconocido')

      const { title, slug, content, imagePrompt } = json.data
      setGeneratedData(json.data) // Guardamos para la imagen

      // Update Sanity fields
      onChange(set(title, ['title']))
      onChange(set({ _type: 'slug', current: slug }, ['slug']))
      onChange(set(content, ['content']))
      // Optional: if you had a field for the prompt, you could save it: 
      // onChange(set(imagePrompt, ['imagePrompt'])) 

      alert('✨ Texto Generado! Ahora puedes generar la imagen.')

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
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        body: JSON.stringify({ 
            topic: generatedData?.title || topic, 
            action: 'generate-image',
            imagePrompt: generatedData?.imagePrompt 
        }),
      })

      const json = await res.json()
      if (!res.ok || json.error) throw new Error(json.error || 'Error imagen')

      // Patch the mainImage with the new asset
      onChange(set({
        _type: 'image',
        asset: {
            _type: 'reference',
            _ref: json.imageAssetId
        }
      }, ['mainImage']))

      alert('🎨 Imagen Generada y Asignada!')

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
            <Text size={1} muted>1. Escribe el tema. 2. Genera Texto. 3. Genera Imagen. (Evita Timeouts)</Text>
            
            <TextArea 
                value={topic}
                onChange={(e) => setTopic(e.currentTarget.value)}
                placeholder="Tema: Ej. Estrategias de retención para e-commerce 2025"
                rows={3}
            />

            <Flex gap={2}>
                <Button 
                    text={isGeneratingText ? "Escribiendo..." : "1. Generar Contenido 📝"}
                    tone="primary"
                    onClick={handleGenerateText}
                    loading={isGeneratingText}
                    disabled={!topic || isGeneratingText}
                />
                
                {/* Solo mostramos el botón de imagen si ya hay texto generado o si el usuario quiere forzarlo */}
                <Button 
                    text={isGeneratingImage ? "Pintando..." : "2. Generar Imagen 🎨"}
                    tone="positive"
                    onClick={handleGenerateImage}
                    loading={isGeneratingImage}
                    disabled={isGeneratingImage || !generatedData} 
                />
            </Flex>
        </Stack>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  )
}
