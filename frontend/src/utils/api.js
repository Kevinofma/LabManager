const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

async function safeFetch(path, opts) {
  const res = await fetch(`${BASE}${path}`, opts)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API ${res.status}: ${text}`)
  }
  return res.json()
}

export async function fetchOrders({ limit = 25, offset = 0 } = {}) {
  const q = `?limit=${limit}&offset=${offset}`
  const data = await safeFetch(`/api/orders${q}`)
  // backend returns { data: [...], count }
  return data.data || []
}

export async function createOrder(payload) {
  return safeFetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export async function getOrder(orderId) {
  return safeFetch(`/api/orders/${orderId}`)
}

export async function getDashboardMetrics() {
  return safeFetch('/api/dashboard/metrics')
}

export async function getPendingActions() {
  return safeFetch('/api/dashboard/pending-actions')
}

export async function updateOrderLogistics(orderId, payload) {
  return safeFetch(`/api/orders/${orderId}/logistics`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

