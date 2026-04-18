import {
  Stack,
  Button,
  Card,
  Text,
  Flex,
  Badge,
  useToast,
  TextInput,
} from '@sanity/ui'
import { useCallback, useState, useRef } from 'react'
import { useFormValue } from 'sanity'

type SendState = 'idle' | 'loading' | 'success' | 'error'

export const SendTestEmailButton = (props: any) => {
  const toast = useToast()
  const [state, setState] = useState<SendState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [testEmail, setTestEmail] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Leer datos del documento actual desde el contexto del formulario de Sanity
  const docId = useFormValue(['_id']) as string | undefined
  const title = useFormValue(['title']) as string | undefined
  const previewText = useFormValue(['previewText']) as string | undefined
  const body = useFormValue(['body']) as unknown[] | undefined
  const ctaButton = useFormValue(['ctaButton']) as { text?: string; url?: string } | undefined

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail)

  const handleSend = useCallback(async () => {
    if (!isEmailValid) {
      toast.push({ title: 'Ingresa un email válido', status: 'warning' })
      inputRef.current?.focus()
      return
    }

    if (!title) {
      toast.push({ title: 'El newsletter necesita un asunto antes de enviar la prueba', status: 'warning' })
      return
    }

    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter-test-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testEmail,
          title,
          previewText,
          body: body ?? [],
          ctaButton,
        }),
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.error || `Error ${res.status}`)
      }

      setState('success')
      toast.push({
        title: `✅ Email de prueba enviado a ${testEmail}`,
        description: 'Revisa tu bandeja de entrada (y spam)',
        status: 'success',
        duration: 8000,
      })
    } catch (err: any) {
      setState('error')
      setErrorMsg(err.message ?? 'Error desconocido')
      toast.push({
        title: 'Error al enviar el email de prueba',
        description: err.message ?? 'Revisa los logs',
        status: 'error',
        duration: 8000,
      })
    }
  }, [testEmail, title, previewText, body, ctaButton, isEmailValid, toast])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <Stack space={3}>
      <Card padding={4} tone="primary" border radius={2}>
        <Stack space={4}>

          {/* Header */}
          <Flex align="center" gap={2}>
            <span style={{ fontSize: 22 }}>🧪</span>
            <Text weight="semibold" size={2}>
              Enviar email de prueba
            </Text>
          </Flex>

          <Text size={1} muted>
            Envía una vista previa del newsletter a un email específico para verificar
            el diseño y el contenido antes de programar el envío masivo.
          </Text>

          {/* Email input */}
          <Stack space={2}>
            <Text size={1} weight="semibold" style={{ color: 'var(--card-muted-fg-color)' }}>
              Email de destino
            </Text>
            <TextInput
              ref={inputRef}
              value={testEmail}
              onChange={(e) => {
                setState('idle')
                setTestEmail((e.target as HTMLInputElement).value)
              }}
              onKeyDown={handleKeyDown}
              placeholder="tu@email.com"
              type="email"
              disabled={state === 'loading'}
            />
          </Stack>

          {/* Success state */}
          {state === 'success' && (
            <Card padding={3} tone="positive" border radius={2}>
              <Flex align="center" gap={2}>
                <Badge tone="positive">Enviado</Badge>
                <Text size={1} muted>
                  Revisa la bandeja de entrada de <strong>{testEmail}</strong>
                </Text>
              </Flex>
            </Card>
          )}

          {/* Error state */}
          {state === 'error' && errorMsg && (
            <Card padding={3} tone="critical" border radius={2}>
              <Stack space={2}>
                <Text size={1} weight="semibold">Error al enviar</Text>
                <Text size={1}>{errorMsg}</Text>
              </Stack>
            </Card>
          )}

          {/* Send button */}
          <Button
            text={
              state === 'loading'
                ? 'Enviando...'
                : state === 'success'
                ? '✅ Enviar de nuevo'
                : '📨 Enviar email de prueba'
            }
            tone={
              state === 'success'
                ? 'positive'
                : state === 'error'
                ? 'critical'
                : 'primary'
            }
            onClick={handleSend}
            disabled={state === 'loading' || !isEmailValid}
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
