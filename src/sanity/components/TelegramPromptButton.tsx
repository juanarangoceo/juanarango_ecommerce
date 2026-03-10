import { Stack, Button, Card, Text, Spinner, Flex, Badge, useToast } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { useFormValue } from 'sanity'

type PublishState = 'idle' | 'loading' | 'success' | 'error'

export const TelegramPromptButton = (props: any) => {
  const toast = useToast()
  const [state, setState] = useState<PublishState>('idle')
  const [lastMessage, setLastMessage] = useState<string>('')

  // Read current document ID from Sanity form context
  const docId = useFormValue(['_id']) as string

  const handlePublish = useCallback(async () => {
    if (!docId) {
      toast.push({ title: 'No se encontró el ID del documento', status: 'warning' })
      return
    }

    const cleanId = docId.replace('drafts.', '')

    setState('loading')
    setLastMessage('')

    try {
      const res = await fetch('/api/telegram-prompt-publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_SECRET}`,
        },
        body: JSON.stringify({ promptId: cleanId }),
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.error || `Error ${res.status}`)
      }

      setState('success')
      setLastMessage(json.preview ?? '')
      toast.push({
        title: '¡Prompt publicado en Telegram! 🚀',
        description: json.message,
        status: 'success',
        duration: 6000,
      })
    } catch (err: any) {
      setState('error')
      toast.push({
        title: 'Error al publicar en Telegram',
        description: err.message ?? 'Error desconocido',
        status: 'error',
        duration: 8000,
      })
    }
  }, [docId, toast])

  return (
    <Stack space={3}>
      <Card padding={4} tone="primary" border radius={2}>
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <span style={{ fontSize: 22 }}>✈️</span>
            <Text weight="semibold" size={2}>
              Publicar Prompt en Telegram
            </Text>
          </Flex>

          <Text size={1} muted>
            Publica este prompt en <strong>@juanarangoecommerce</strong> con la imagen, el texto
            del prompt y el enlace a la galería de prompts.
          </Text>

          {state === 'success' && lastMessage && (
            <Card padding={3} tone="positive" border radius={2}>
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  <Badge tone="positive">Publicado</Badge>
                  <Text size={0} muted>Vista previa:</Text>
                </Flex>
                <Text size={1} style={{ whiteSpace: 'pre-wrap', opacity: 0.85 }}>
                  {lastMessage}
                </Text>
              </Stack>
            </Card>
          )}

          {state === 'error' && (
            <Card padding={3} tone="critical" border radius={2}>
              <Text size={1}>
                Error al publicar. Verifica que TELEGRAM_BOT_TOKEN y TELEGRAM_CHANNEL_ID estén
                configuradas y que el bot sea Administrador del canal.
              </Text>
            </Card>
          )}

          <Button
            text={
              state === 'loading'
                ? 'Publicando...'
                : state === 'success'
                ? '✅ Volver a publicar'
                : '📢 Publicar en Telegram'
            }
            tone={state === 'success' ? 'positive' : 'primary'}
            onClick={handlePublish}
            disabled={state === 'loading'}
            loading={state === 'loading'}
            fontSize={2}
            padding={4}
            style={{ width: '100%' }}
          />
        </Stack>
      </Card>
    </Stack>
  )
}
