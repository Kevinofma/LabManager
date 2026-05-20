import { describe, it, expect } from 'vitest'
import { fetchOrders, createOrder, getOrder, updateOrderLogistics, getDashboardMetrics, getPendingActions } from '../utils/api'

describe('API utils', () => {
  it('fetchOrders returns array', async () => {
    const orders = await fetchOrders()
    expect(Array.isArray(orders)).toBe(true)
    expect(orders.length).toBeGreaterThan(0)
  })

  it('createOrder posts and returns created', async () => {
    const payload = { item_id: 'ITEM-1', grant_id: 'GRANT-1', quantity: 2 }
    const res = await createOrder(payload)
    expect(res).toHaveProperty('id')
  })

  it('getOrder returns order', async () => {
    const o = await getOrder('REQ-1')
    expect(o).toHaveProperty('id', 'REQ-1')
  })

  it('updateOrderLogistics patches successfully', async () => {
    const updated = await updateOrderLogistics('REQ-1', { item_cost: 10.5, shipping_cost: 2.25, expected_date: '2026-06-01' })
    expect(updated).toHaveProperty('id', 'REQ-1')
    expect(updated).toHaveProperty('item_cost')
  })

  it('getDashboardMetrics returns totals', async () => {
    const m = await getDashboardMetrics()
    expect(m).toHaveProperty('total_pending_value')
    expect(m).toHaveProperty('grant_distribution_percentages')
  })

  it('getPendingActions returns array', async () => {
    const p = await getPendingActions()
    expect(Array.isArray(p)).toBe(true)
  })
})
