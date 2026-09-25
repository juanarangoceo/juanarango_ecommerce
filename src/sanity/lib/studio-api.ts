import { useCallback } from 'react'
import { useClient } from 'sanity'

/**
 * `fetch` para las APIs internas del sitio desde el Studio. Añade el token de
 * la sesión del usuario; el servidor lo valida con `requireSanityEditor`.
 */
export function useStudioApiFetch() {
  const client = useClient({ apiVersion: '2024-01-01' })

  return useCallback(
    (input: string, init: RequestInit = {}) => {
      const token = client.config().token
      const headers = new Headers(init.headers)
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return fetch(input, { ...init, headers })
    },
    [client],
  )
}
