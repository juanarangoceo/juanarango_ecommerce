import { Stack, Button, Card, Text, TextInput, Label, useToast } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { set, useDocumentOperation, useFormValue, useClient } from 'sanity'

export const GenerateAppToolInput = (props: any) => {
  const { onChange, value } = props
  const toast = useToast()

  const [isGenerating, setIsGenerating] = useState(false)

  // Retrieve Document ID and Type
  const docId = useFormValue(['_id']) as string
  const docType = useFormValue(['_type']) as string
  const websiteUrl = useFormValue(['websiteUrl']) as string

  // Sanity Client
  const client = useClient({ apiVersion: '2024-01-01' })

  // Operation Hook
  const publishedId = (docId || '').replace('drafts.', '')
  const { publish } = useDocumentOperation(publishedId, docType || 'appTool')

  const handleGenerate = useCallback(async () => {
    const currentName = typeof value === 'string' ? value : ''

    if (!currentName || currentName.length < 2) {
      toast.push({ title: 'Escribe el nombre de la app primero.', status: 'warning' })
      return
    }

    if (!websiteUrl) {
      toast.push({ title: 'Agrega la URL del sitio web primero.', status: 'warning' })
      return
    }

    setIsGenerating(true)

    try {
      toast.push({ title: '🔍 Investigando la app con IA...', status: 'info' })

      // 1. CALL API
      const res = await fetch('/api/generate-app-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appName: currentName, websiteUrl }),
      })

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        throw new Error(errJson.error || `Error ${res.status}: ${res.statusText}`)
      }

      const json = await res.json()
      if (!json.success || !json.data) {
        throw new Error('Respuesta inválida de la API')
      }

      const data = json.data

      // 2. VALIDATION
      if (!data.description || data.description.length < 10) {
        throw new Error(`Contenido generado insuficiente.`)
      }

      // 3. Helper to sanitize slug
      const sanitizeSlug = (text: string) => {
        return text
          .toString()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
          .slice(0, 96)
      }

      const finalSlug = sanitizeSlug(data.slug || currentName)

      // 4. UPDATE SANITY DOCUMENT
      const attributes: any = {
        slug: { _type: 'slug', current: finalSlug },
        description: data.description || '',
        longDescription: data.longDescription || '',
        category: data.category || 'productivity',
        pricing: data.pricing || 'Freemium',
        features: data.features || [],
        pros: data.pros || [],
        cons: data.cons || [],
        platforms: data.platforms || [],
        iconBg: data.iconBg || 'bg-emerald-500',
      }

      // Update form state
      onChange(set(currentName))

      // Patch the document
      toast.push({ title: '💾 Guardando contenido generado...', status: 'info' })
      await client.patch(docId).set(attributes).commit()

      toast.push({
        title: '✅ Contenido generado exitosamente',
        description: 'Revisa los campos y publica cuando estés listo.',
        status: 'success',
        duration: 5000,
      })
    } catch (err: any) {
      console.error('Gen Error:', err)
      toast.push({
        title: 'Error en Generación',
        description: err.message || 'Ocurrió un error inesperado',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsGenerating(false)
    }
  }, [value, onChange, client, docId, websiteUrl, toast])

  // Handle local typing
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(set(e.currentTarget.value))
    },
    [onChange]
  )

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" border radius={2}>
        <Stack space={3}>
          <Label>Generador AI (Gemini 3 Flash)</Label>
          <Text size={1} muted>
            Ingresa el nombre de la app y asegúrate de haber llenado la URL. La IA investigará y generará todo el contenido automáticamente.
          </Text>

          <TextInput
            value={typeof value === 'string' ? value : ''}
            onChange={handleNameChange}
            placeholder="Ej: ChatGPT, Midjourney, Notion AI..."
            disabled={isGenerating}
          />

          <Button
            text={isGenerating ? 'Investigando y generando...' : '🚀 Crear Contenido'}
            tone="primary"
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
