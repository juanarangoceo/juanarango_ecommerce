import { Stack, Button, Card, Text, Label, useToast } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { set, useFormValue, useClient } from 'sanity'

export const GenerateComparisonInput = (props: any) => {
  const { onChange, value } = props
  const toast = useToast()

  const [isGenerating, setIsGenerating] = useState(false)

  const docId = useFormValue(['_id']) as string
  const app1Ref = useFormValue(['app1']) as any
  const app2Ref = useFormValue(['app2']) as any

  const client = useClient({ apiVersion: '2024-01-01' })

  const handleGenerate = useCallback(async () => {
    if (!app1Ref?._ref || !app2Ref?._ref) {
      toast.push({ title: 'Selecciona las dos apps primero.', status: 'warning' })
      return
    }

    if (app1Ref._ref === app2Ref._ref) {
      toast.push({ title: 'Selecciona dos apps diferentes.', status: 'warning' })
      return
    }

    setIsGenerating(true)

    try {
      toast.push({ title: 'Obteniendo datos de las apps...', status: 'info' })

      // Fetch both apps' full data
      const [app1Data, app2Data] = await Promise.all([
        client.fetch(`*[_type == "appTool" && _id == $id][0]{
          appName, slug, description, longDescription, category, pricing, priceDetail, rating,
          features, pros, cons, platforms, websiteUrl
        }`, { id: app1Ref._ref }),
        client.fetch(`*[_type == "appTool" && _id == $id][0]{
          appName, slug, description, longDescription, category, pricing, priceDetail, rating,
          features, pros, cons, platforms, websiteUrl
        }`, { id: app2Ref._ref }),
      ])

      if (!app1Data?.appName || !app2Data?.appName) {
        throw new Error('No se pudieron obtener los datos de las apps. Asegúrate de que ambas apps tengan contenido generado.')
      }

      toast.push({ title: `Generando comparación: ${app1Data.appName} vs ${app2Data.appName}...`, status: 'info' })

      // Call the comparison API
      const res = await fetch('/api/generate-comparison', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ app1: app1Data, app2: app2Data }),
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

      // Sanitize slug
      const sanitizeSlug = (text: string) => {
        return text
          .toString()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
          .slice(0, 96)
      }

      const finalSlug = sanitizeSlug(data.slug || `${app1Data.appName}-vs-${app2Data.appName}`)

      // Patch the document
      const attributes: any = {
        title: data.title || `${app1Data.appName} vs ${app2Data.appName}`,
        slug: { _type: 'slug', current: finalSlug },
        metaDescription: data.metaDescription || '',
        introText: data.introText || '',
        app1Summary: data.app1Summary || '',
        app2Summary: data.app2Summary || '',
        app1BestFor: data.app1BestFor || '',
        app2BestFor: data.app2BestFor || '',
        content: data.content || '',
        comparisonTable: (data.comparisonTable || []).map((row: any, i: number) => ({
          _type: 'object',
          _key: `row-${i}`,
          feature: row.feature || '',
          app1Value: row.app1Value || '',
          app2Value: row.app2Value || '',
        })),
        verdict: data.verdict || '',
        faq: (data.faq || []).map((item: any, i: number) => ({
          _type: 'object',
          _key: `faq-${i}`,
          question: item.question || '',
          answer: item.answer || '',
        })),
        publishedAt: new Date().toISOString(),
      }

      onChange(set(value || 'generated'))

      toast.push({ title: 'Actualizando documento...', status: 'info' })
      await client.patch(docId).set(attributes).commit()

      toast.push({
        title: 'Comparación Generada',
        description: 'Revisa el contenido y publica cuando estés listo.',
        status: 'success',
        duration: 5000,
      })
    } catch (err: any) {
      console.error('Comparison Gen Error:', err)
      toast.push({
        title: 'Error en Generación',
        description: err.message || 'Ocurrió un error inesperado',
        status: 'error',
        duration: 5000,
      })
    } finally {
      setIsGenerating(false)
    }
  }, [app1Ref, app2Ref, client, docId, onChange, value, toast])

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" border radius={2}>
        <Stack space={3}>
          <Label>Generador de Comparación AI</Label>
          <Text size={1} muted>
            Selecciona las dos apps arriba y haz clic para generar la comparación completa.
          </Text>

          <Button
            text={isGenerating ? 'Generando comparación...' : '⚔️ Generar Comparación con IA'}
            tone="primary"
            onClick={handleGenerate}
            loading={isGenerating}
            disabled={isGenerating || !app1Ref?._ref || !app2Ref?._ref}
            fontSize={2}
            padding={3}
          />
        </Stack>
      </Card>
    </Stack>
  )
}
