import { Stack, Button, Card, Text, Label, useToast } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { set, useDocumentOperation, useFormValue, useClient } from 'sanity'

export const GenerateTagInput = (props: any) => {
  const { onChange, value } = props
  const toast = useToast()
  
  const [isGenerating, setIsGenerating] = useState(false)

  // Retrieve Document ID and Type
  const docId = useFormValue(['_id']) as string
  const docType = useFormValue(['_type']) as string
  const tagName = useFormValue(['name']) as string
  
  // Sanity Client
  const client = useClient({ apiVersion: '2024-01-01' })

  // Operation Hook
  const publishedId = (docId || '').replace('drafts.', '')
  const { publish } = useDocumentOperation(publishedId, docType || 'tag')

  const handleGenerate = useCallback(async () => {
    
    if (!tagName || tagName.length < 2) {
        toast.push({ title: "Primero escribe un nombre para la etiqueta.", status: 'warning' })
        return
    }

    setIsGenerating(true)
    
    try {
      toast.push({ title: "Iniciando IA (Gemini)...", status: 'info' })

      // 1. CALL API
      const res = await fetch('/api/generate-tag-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: tagName }),
      })
      
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        throw new Error(errJson.error || `Error ${res.status}: ${res.statusText}`)
      }

      const json = await res.json()
      if (!json.success || !json.data) {
          throw new Error("Respuesta inválida de la API")
      }

      const { h1, description, faq, seoTitle, seoDescription } = json.data

      // 2. UPDATE SANITY DOCUMENT (PATCH)
      const attributes: any = {
          h1: h1,
          description: description,
          faq: faq,
          seoTitle: seoTitle,
          seoDescription: seoDescription,
      }
      
      // We don't necessarily update the 'value' of this specific input field, 
      // primarily we update the document fields. 
      // But to satisfy the input component requirement, maybe we set a "last generated" timestamp?
      // For now, let's just patch the document fields.
      
      toast.push({ title: "Actualizando etiqueta...", status: 'info' })
      await client.patch(docId).set(attributes).commit()
      
      // Update this field to show done status or timestamp
      onChange(set(new Date().toISOString()))

      toast.push({ title: "¡Contenido generado exitosamente!", status: 'success' })

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
  }, [tagName, onChange, client, docId, toast])

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" border radius={2}>
        <Stack space={3}>
            <Label>Generador AI de Contenido Rico</Label>
            <Text size={1} muted>
                Genera descripción, título SEO y meta descripción basados en el nombre "{tagName || '...'}".
            </Text>
            
            <Button 
                text={isGenerating ? "Generando..." : "Generar Contenido IA"}
                tone="primary"
                onClick={handleGenerate}
                loading={isGenerating}
                disabled={!tagName || isGenerating}
                fontSize={2}
                padding={3}
            />
            {value && (
                <Text size={0} muted>Última generación: {new Date(value).toLocaleString()}</Text>
            )}
        </Stack>
      </Card>
    </Stack>
  )
}
