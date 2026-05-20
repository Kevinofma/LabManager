import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrder } from '../../utils/api'

const FALLBACK_ORDER = {
  id: 'LFP-88291-TX',
  name: 'Taq Polymerase',
  description: 'High-Fidelity Thermostable DNA Polymerase Cluster',
  vendor: 'Biotech Precision Corp.',
  catalog: 'ENZ-0022-HF',
  grant: 'Research Grant #G-2281-V1',
  smallOrder: 'SO-99218-B',
  quantity: '12 Units',
  size: '500 U/vial',
  ordered: '2024.09.28 [15:45:00]',
  received: 'Awaiting Shipment',
  cost: '1,240.00',
  shipping: '85.00',
  total: '1,325.00',
  notes: 'Requirement for cold chain logistics verified. Item must be transferred directly to -20°C storage upon receipt. Material safety documentation (MSDS) has been attached to the internal repository.',
  attachments: ['MSDS_TAQ_HF.PDF', 'STRUC_VERIF.JPG'],
  statusLog: [
    { time: '2024.09.28 14:30', message: 'Draft initialized' },
    { time: '2024.09.28 15:20', message: 'Reviewed by purchasing manager' }
  ]
}

export default function OrderDetails() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(FALLBACK_ORDER)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getOrder(orderId)
      .then((data) => {
        if (mounted && data) {
          setOrder({ ...FALLBACK_ORDER, ...data })
        }
      })
      .catch((err) => {
        console.error(err)
        if (mounted) setError(null)
      })
      .finally(() => setLoading(false))
    return () => (mounted = false)
  }, [orderId])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-white border border-outline-variant p-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-primary-container text-white px-3 py-0.5 text-[10px] font-bold tracking-[0.2em] uppercase">ORDERED</span>
              <span className="data-font text-xs text-outline tracking-tighter">Order ID: {order.id}</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight uppercase">{order.name}</h1>
            <p className="data-font text-sm text-on-surface-variant mt-1">Description: {order.description}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="data-font text-[10px] uppercase text-outline">Expected</span>
            <span className="data-font text-xl font-bold text-primary">OCT 14 - OCT 16</span>
          </div>
        </div>

        <div className="bg-white border border-outline-variant overflow-hidden">
          <div className="bg-surface-container-high px-4 py-2 border-b border-outline-variant flex justify-between items-center">
            <span className="font-headline text-[10px] font-bold uppercase tracking-widest">Procurement Specifications</span>
            <span className="data-font text-[10px] uppercase text-outline">Date: 2024.09.28</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col border-b border-outline-variant/30 pb-2">
                <label className="data-font text-[10px] uppercase text-outline mb-1">Vendor</label>
                <span className="data-font text-sm font-bold">{order.vendor}</span>
              </div>
              <div className="flex flex-col border-b border-outline-variant/30 pb-2">
                <label className="data-font text-[10px] uppercase text-outline mb-1">Catalog #</label>
                <span className="data-font text-sm font-bold">{order.catalog}</span>
              </div>
              <div className="flex flex-col border-b border-outline-variant/30 pb-2">
                <label className="data-font text-[10px] uppercase text-outline mb-1">Grant to Charge</label>
                <span className="data-font text-sm font-bold">{order.grant}</span>
              </div>
              <div className="flex flex-col">
                <label className="data-font text-[10px] uppercase text-outline mb-1">Small Order #</label>
                <span className="data-font text-sm font-bold">{order.smallOrder}</span>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-6 bg-surface-container-low border-l border-outline-variant">
              <div className="grid grid-cols-2 gap-4 border-b border-outline-variant/30 pb-2">
                <div className="flex flex-col">
                  <label className="data-font text-[10px] uppercase text-outline mb-1">Quantity</label>
                  <span className="data-font text-sm font-bold">{order.quantity}</span>
                </div>
                <div className="flex flex-col">
                  <label className="data-font text-[10px] uppercase text-outline mb-1">Size</label>
                  <span className="data-font text-sm font-bold">{order.size}</span>
                </div>
              </div>
              <div className="flex flex-col border-b border-outline-variant/30 pb-2">
                <label className="data-font text-[10px] uppercase text-outline mb-1">Date Ordered by Manager</label>
                <span className="data-font text-sm font-bold">{order.ordered}</span>
              </div>
              <div className="flex flex-col">
                <label className="data-font text-[10px] uppercase text-outline mb-1">Received</label>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-sm">pending</span>
                  <span className="data-font text-sm font-bold text-outline uppercase italic">{order.received}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-outline-variant">
          <div className="bg-on-surface p-3">
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-white">Additional Information</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="p-4 bg-surface-container border border-outline-variant/50">
              <p className="data-font text-xs leading-relaxed text-on-surface">{order.notes}</p>
            </div>
            <div className="flex flex-col gap-3">
              {order.attachments.map((name) => (
                <div key={name} className="flex items-center gap-2 border border-outline-variant px-3 py-2 bg-white">
                  <span className="material-symbols-outlined text-primary text-sm">description</span>
                  <span className="data-font text-[10px] font-bold uppercase">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <aside className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-white border border-outline-variant overflow-hidden">
          <div className="bg-on-surface p-4">
            <span className="font-headline text-[10px] font-bold uppercase tracking-[0.3em] text-white">Fiscal Assessment</span>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="data-font text-xs text-on-surface-variant uppercase">Cost</span>
              <span className="data-font text-sm font-bold text-on-surface">{order.cost} USD</span>
            </div>
            <div className="flex justify-between items-center border-b border-outline-variant pb-4">
              <span className="data-font text-xs text-on-surface-variant uppercase">Shipping Cost</span>
              <span className="data-font text-sm font-bold text-on-surface">{order.shipping} USD</span>
            </div>
            <div className="pt-2">
              <label className="data-font text-[10px] uppercase text-outline block mb-1">Total Amount Payable</label>
              <div className="flex items-baseline justify-between">
                <span className="data-font text-4xl font-black text-primary tracking-tighter">{order.total}</span>
                <span className="data-font text-xs font-bold text-primary">USD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="w-full bg-on-surface text-white font-headline text-xs uppercase tracking-[0.2em] py-5 px-6 border border-on-surface hover:bg-on-surface-variant transition-none flex items-center justify-between group">
            <span>Log Post-Order Data</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">post_add</span>
          </button>
          <Link to="/post-order-entry" className="w-full bg-primary text-white font-headline text-xs uppercase tracking-widest py-4 px-6 border border-primary hover:bg-primary-container transition-none flex items-center justify-between group">
            <span>Confirm & Log Data</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">check</span>
          </Link>
          <button className="w-full bg-white text-on-surface font-headline text-xs uppercase tracking-widest py-4 px-6 border border-outline-variant hover:bg-surface-container transition-none flex items-center justify-between">
            <span>Duplicate Request</span>
            <span className="material-symbols-outlined text-sm">content_copy</span>
          </button>
          <button className="w-full bg-white text-error font-headline text-xs uppercase tracking-widest py-4 px-6 border border-error hover:bg-error-container/10 transition-none flex items-center justify-between">
            <span>Terminate Order</span>
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>

        <div className="bg-white border border-outline-variant p-6">
          <h5 className="font-headline text-[10px] font-black uppercase tracking-widest mb-4 border-b border-outline-variant pb-2">System Status Log</h5>
          <div className="space-y-4">
            {order.statusLog.map((log) => (
              <div key={log.time} className="relative pl-4 border-l border-primary">
                <div className="absolute -left-[4.5px] top-0 w-2 h-2 bg-primary rounded-full" />
                <span className="data-font text-[10px] text-outline block">{log.time}</span>
                <p className="data-font text-[11px] font-bold text-on-surface">{log.message}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
