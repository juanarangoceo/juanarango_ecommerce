import { Stack, Button, Card, Text, Flex, useToast } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { useFormValue, useClient } from 'sanity'

export const GenerateNewsletterFromPostButton = (props: any) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  // Obtener IDs de los campos
  const docId = useFormValue(['_id']) as string | undefined
  const sourcePost = useFormValue(['sourcePost']) as { _ref: string } | undefined
  const client = useClient({ apiVersion: '2024-03-01' })

  const handleGenerate = useCallback(async () => {
    if (!sourcePost?._ref) {
      toast.push({ title: 'Selecciona un artículo base primero', status: 'warning' })
      return
    }

    if (!docId) {
       toast.push({ title: 'Error: No se encontró el ID del documento', status: 'error' })
       return
    }

    setLoading(true)
    toast.push({ title: 'Generando contenido con IA...', status: 'info' })

    try {
      // Usar la ruta correcta sin drafts. prefix si es necesario, o enviarlo tal cual
      const cleanDocId = docId.replace('drafts.', '')
      
      const res = await fetch('/api/newsletter-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newsletterId: cleanDocId,
          postId: sourcePost._ref,
        }),
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.error || `Error ${res.status}`)
      }

      // Parchear el documento en Sanity con los resultados generados
      // Asegurarse de usar el ID del borrador para que los cambios se vean inmediatamente en la UI
      const draftId = docId.startsWith('drafts.') ? docId : `drafts.${docId}`
      
      await client.patch(draftId)
        .set({
           title: json.data.title,
           previewText: json.data.previewText,
           body: json.data.bodyBlocks
        })
        .commit()

      toast.push({
        title: '✅ Newsletter generado exitosamente',
        description: 'El asunto, preview y cuerpo han sido actualizados.',
        status: 'success',
        duration: 8000,
      })
    } catch (err: any) {
      toast.push({
        title: 'Error al generar',
        description: err.message ?? 'Revisa los logs de la consola',
        status: 'error',
        duration: 8000,
      })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [sourcePost, docId, client, toast])

  if (!sourcePost?._ref) {
    return null // Ocultar el botón si no hay un post seleccionado
  }

  return (
    <Stack space={3}>
      <Card padding={4} tone="primary" border radius={2}>
        <Stack space={4}>
          <Flex align="center" gap={2}>
            <span style={{ fontSize: 22 }}>✨</span>
            <Text weight="semibold" size={2}>
              Generador de IA
            </Text>
          </Flex>

          <Text size={1} muted>
            Crea un borrador automático para el newsletter basado en el artículo seleccionado.
            Utiliza un tono conversacional (estilo Juan Arango) y storytelling.
            Al generar, se sobrescribirá el Asunto, Preview Text y Contenido actual.
          </Text>

          <Button
            text={loading ? 'Generando (puede tardar ~1 min)...' : '🪄 Generar con IA (Tono Juan Arango)'}
            tone={loading ? 'caution' : 'primary'}
            onClick={handleGenerate}
            disabled={loading}
            loading={loading}
            fontSize={2}
            padding={4}
            style={{ width: '100%' }}
          />
        </Stack>
      </Card>
    </Stack>
  )
}
