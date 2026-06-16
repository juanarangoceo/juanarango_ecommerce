import { Stack, Button, Card, Text, Label, useToast } from '@sanity/ui'
import { useCallback } from 'react'
import { useFormValue, useClient } from 'sanity'

export const RefinePostInput = () => {
  const toast = useToast()

  // Estado e id del documento actual
  const docId = useFormValue(['_id']) as string
  const title = useFormValue(['title']) as string
  const refineStatus = useFormValue(['refineStatus']) as string

  const isRefining = refineStatus === 'refining'

  // Sanity Client
  const client = useClient({ apiVersion: '2024-03-01' })

  const handleRefine = useCallback(async () => {
    if (!title || title.length < 3) {
      toast.push({ title: 'Este post necesita un título antes de refinarse.', status: 'warning' })
      return
    }

    try {
      toast.push({ title: 'Iniciando refinado en Sanity Cloud...', status: 'info' })

      const draftId = docId.startsWith('drafts.') ? docId : `drafts.${docId}`

      // Solo parchamos el status a refining. La Document Function escucha esto remotamente.
      await client.patch(draftId)
        .set({ refineStatus: 'refining' })
        .commit()

      toast.push({
        title: 'Refinado en Progreso',
        description: 'La IA está mejorando título, meta description y contenido (~60s). El borrador se actualizará solo. La URL no cambia.',
        status: 'success',
        duration: 5000,
      })
    } catch (err: any) {
      console.error('Trigger Error:', err)
      toast.push({
        title: 'Error de Sanity',
        description: err.message || 'No se pudo iniciar el refinado',
        status: 'error',
        duration: 5000,
      })
    }
  }, [client, docId, title, toast])

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" border radius={2}>
        <Stack space={3}>
          <Label>Refinar para CTR (Gemini 3.5 Flash)</Label>
          <Text size={1} muted>
            Para posts con muchas impresiones en Google pero pocos clics. Mejora el título, genera una
            meta description optimizada y pule el contenido conservando lo que ya funciona.
            <strong> No cambia la URL (slug).</strong> Escribe sobre el borrador para que lo revises antes de publicar.
          </Text>

          {refineStatus === 'completed' && (
            <Text size={1} weight="semibold" style={{ color: 'green' }}>¡Último refinado exitoso! Revisa título, meta description y contenido.</Text>
          )}

          {refineStatus === 'failed' && (
            <Text size={1} weight="semibold" style={{ color: 'red' }}>El último refinado falló. Intenta de nuevo.</Text>
          )}

          <Button
            text={isRefining ? 'Refinando (espera unos segundos)...' : 'Refinar para CTR'}
            tone={isRefining ? 'caution' : 'primary'}
            onClick={handleRefine}
            loading={isRefining}
            disabled={isRefining}
            fontSize={2}
            padding={3}
          />
        </Stack>
      </Card>
    </Stack>
  )
}
