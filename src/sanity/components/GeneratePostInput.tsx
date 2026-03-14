import { Stack, Button, Card, Text, TextArea, Label, useToast } from '@sanity/ui'
import { useCallback } from 'react'
import { set, useFormValue, useClient } from 'sanity'

export const GeneratePostInput = (props: any) => {
  const { onChange, value } = props
  const toast = useToast()
  
  // Obtenemos del parent el estado actual y el id
  const docId = useFormValue(['_id']) as string
  const generationStatus = useFormValue(['generationStatus']) as string

  const isGenerating = generationStatus === 'generating'
  
  // Sanity Client
  const client = useClient({ apiVersion: '2024-03-01' })

  const handleGenerate = useCallback(async () => {
    const currentTopic = typeof value === 'string' ? value : (typeof value === 'object' ? JSON.stringify(value) : '')
    
    if (!currentTopic || currentTopic.length < 3) {
        toast.push({ title: "Escribe un tema válido primero.", status: 'warning' })
        return
    }

    try {
      toast.push({ title: "Iniciando IA en Sanity Cloud...", status: 'info' })
      
      // Update local value just in case
      onChange(set(currentTopic))

      const draftId = docId.startsWith('drafts.') ? docId : `drafts.${docId}`
      
      // SOLO parchamos el status a generating. La Document Function escucha esto remotamente.
      await client.patch(draftId)
          .set({ generationStatus: 'generating' })
          .commit()

      toast.push({ 
          title: "Generación en Progreso", 
          description: "La IA está escribiendo (puede tomar ~60s). La página se actualizará sola.", 
          status: 'success',
          duration: 5000
      })

    } catch (err: any) {
      console.error("Trigger Error:", err)
      toast.push({ 
          title: "Error de Sanity", 
          description: err.message || "No se pudo iniciar la generación", 
          status: 'error',
          duration: 5000
      })
    }
  }, [value, onChange, client, docId, toast])

  const handleTopicChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(set(e.currentTarget.value))
  }, [onChange])

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" border radius={2}>
        <Stack space={3}>
            <Label>Generador AI en Nube Sanity (Gemini 3 Flash)</Label>
            <Text size={1} muted>Introduce el tema y el Agente de IA generará el contenido en el servidor de Sanity (Sin límite de tiempo de Vercel). El borrador se actualizará mágicamente.</Text>
            
            {(generationStatus === 'completed') && (
               <Text size={1} weight="semibold" style={{color: 'green'}}>¡Última generación exitosa! Revisa el contenido abajo.</Text>
            )}

            {(generationStatus === 'failed') && (
               <Text size={1} weight="semibold" style={{color: 'red'}}>La última generación falló. Intenta de nuevo.</Text>
            )}

            <TextArea 
                value={typeof value === 'string' ? value : ''}
                onChange={handleTopicChange}
                placeholder="Ej: Beneficios del café para la salud..."
                rows={3}
                disabled={isGenerating}
            />

            <Button 
                text={isGenerating ? "Generando contenido (espera unos segundos)..." : "Generar Blog Post"}
                tone={isGenerating ? "caution" : "primary"}
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
