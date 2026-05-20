import { rest } from 'msw'

const BASE = 'http://localhost:8000'

const sampleOrders = [
  { id: 'REQ-1', item: 'HEK293 Cells', vendor: 'Thermo', sku: 'R70507', qty: '3 x 1.0 mL', quantity: 3, status: 'To Order' },
  { id: 'REQ-2', item: 'Dulbecco Medium', vendor: 'Sigma', sku: 'D6429', qty: '24 Units', quantity: 24, status: 'Pending Receipt' },
]

export const handlers = [
  rest.get(`${BASE}/api/orders`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: sampleOrders, count: sampleOrders.length }))
  }),

  rest.post(`${BASE}/api/orders`, async (req, res, ctx) => {
    const body = await req.json()
    const newOrder = { id: 'REQ-NEW', ...body }
    return res(ctx.status(201), ctx.json(newOrder))
  }),

  rest.get(`${BASE}/api/orders/:orderId`, (req, res, ctx) => {
    const { orderId } = req.params
    const found = sampleOrders.find((o) => o.id === orderId) || { id: orderId, item: 'Unknown', quantity: 1 }
    return res(ctx.status(200), ctx.json(found))
  }),

  rest.patch(`${BASE}/api/orders/:orderId/logistics`, async (req, res, ctx) => {
    const { orderId } = req.params
    const body = await req.json()
    // return updated object
    return res(ctx.status(200), ctx.json({ id: orderId, ...body }))
  }),

  rest.get(`${BASE}/api/dashboard/metrics`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ total_pending_value: 1000, grant_distribution_percentages: { 'NIH-1': 60, 'NSF-2': 40 } }))
  }),

  rest.get(`${BASE}/api/dashboard/pending-actions`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleOrders.filter(o => ['To Order','Pending Receipt'].includes(o.status))))
  }),
]
