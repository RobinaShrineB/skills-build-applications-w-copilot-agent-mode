import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function collectionFrom(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}

export function useApiCollection(resource, endpoint) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadResource() {
      try {
        const response = await fetch(endpoint || `${API_BASE_URL}/api/${resource}/`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        const payload = await response.json()
        setState({ data: collectionFrom(payload), loading: false, error: '' })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({ data: [], loading: false, error: error.message })
        }
      }
    }

    loadResource()
    return () => controller.abort()
  }, [endpoint, resource])

  return state
}

export function displayDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value))
}