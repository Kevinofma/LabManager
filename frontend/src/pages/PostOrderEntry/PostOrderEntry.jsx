import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PostOrderEntry() {
  const [vendorConfirmation, setVendorConfirmation] = useState('')
  const [deliveryNotes, setDeliveryNotes] = useState('')
  const [receivedBy, setReceivedBy] = useState('')
  const [receivedDate, setReceivedDate] = useState('')
  const [status, setStatus] = useState('In Transit')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitting(true)
    setTimeout(() => setSubmitting(false), 800)
  }

  return (
    <main className="py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="data-font text-[10px] uppercase tracking-widest text-outline mb-2">Operations / Post-Order Entry</p>
            <h1 className="text-4xl font-black uppercase tracking-tight text-on-surface">Post-Order Logistical Entry</h1>
          </div>
          <Link to="/orders" className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-low px-4 py-3 text-[11px] uppercase tracking-widest text-on-surface-variant">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Orders
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-6">
          <section className="bg-white border border-outline-variant p-8 space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase text-outline">Order Reference</label>
                <p className="text-sm font-bold">TXN-8829-001</p>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase text-outline">Current Status</label>
                <p className="text-sm font-bold text-primary">{status}</p>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase text-outline">Vendor</label>
                <p className="text-sm font-bold">Thermo Fisher</p>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase text-outline">Expected Delivery</label>
                <p className="text-sm font-bold">2024-10-28</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-headline text-[11px] uppercase tracking-[0.35em] text-on-surface-variant">Update Field Log</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase text-outline">Vendor Confirmation #</label>
                    <input value={vendorConfirmation} onChange={(e) => setVendorConfirmation(e.target.value)} className="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-sm focus:border-primary-container outline-none" placeholder="VC-4493-221" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase text-outline">Received Date</label>
                    <input value={receivedDate} onChange={(e) => setReceivedDate(e.target.value)} className="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-sm focus:border-primary-container outline-none" type="date" />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase text-outline">Received By</label>
                    <input value={receivedBy} onChange={(e) => setReceivedBy(e.target.value)} className="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-sm focus:border-primary-container outline-none" placeholder="Dr. A. Monroe" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase text-outline">Delivery Notes</label>
                    <textarea value={deliveryNotes} onChange={(e) => setDeliveryNotes(e.target.value)} className="w-full min-h-[120px] border border-outline-variant bg-surface-container-low px-3 py-2 text-sm focus:border-primary-container outline-none resize-none" placeholder="Enter condition, temperature, or documentation details..." />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 justify-end">
                  <button type="button" onClick={() => setStatus('Received')} className="px-6 py-3 border border-primary text-primary uppercase tracking-[0.2em] text-xs font-bold transition-none">Mark Received</button>
                  <button type="submit" disabled={submitting} className="px-8 py-3 bg-primary text-white uppercase tracking-[0.2em] text-xs font-bold transition-none">
                    {submitting ? 'Saving...' : 'Save Entry'}
                  </button>
                </div>
              </form>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="bg-white border border-outline-variant p-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Shipment Checklist</p>
                <span className="text-xs text-green-700 font-bold uppercase">Complete</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary">task_alt</span>
                  <span>Cold chain compliance verified</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary">task_alt</span>
                  <span>Vendor confirmation attached</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary">task_alt</span>
                  <span>Receiving signature recorded</span>
                </li>
              </ul>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-5">
              <p className="font-headline text-[10px] uppercase tracking-widest text-on-surface-variant mb-3">Cost Outline</p>
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] text-on-surface-variant"><span>Item Cost</span><span>$382.50</span></div>
                <div className="flex justify-between text-[11px] text-on-surface-variant"><span>Shipping</span><span>$15.00</span></div>
                <div className="border-t border-outline-variant pt-3 flex justify-between font-bold"><span>Total</span><span>$397.50</span></div>
              </div>
            </div>
            <div className="bg-white border border-outline-variant p-5">
              <p className="font-headline text-[10px] uppercase tracking-widest text-on-surface-variant mb-3">Reference Notes</p>
              <p className="text-sm leading-relaxed text-on-surface-variant">Ensure the order is moved to secure cold storage immediately after sign-off. Log any deviation from the expected delivery window in the departmental incident tracker.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
