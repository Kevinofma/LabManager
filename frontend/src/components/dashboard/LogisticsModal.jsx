import React, { useState } from 'react'
import { updateOrderLogistics } from '../../utils/api'

export default function LogisticsModal({ orderId, onClose, onSuccess }) {
  const [itemCost, setItemCost] = useState('')
  const [shippingCost, setShippingCost] = useState('')
  const [expectedDate, setExpectedDate] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        item_cost: parseFloat(itemCost) || 0,
        shipping_cost: parseFloat(shippingCost) || 0,
        expected_date: expectedDate || null,
      }
      await updateOrderLogistics(orderId, payload)
      if (onSuccess) onSuccess()
      onClose()
    } catch (err) {
      console.error(err)
      alert('Failed to update logistics: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-2xl bg-white border border-outline-variant shadow-lg">
        <div className="bg-surface-container-high border-b border-outline-variant px-6 py-4 flex items-center justify-between">
          <div>
            <p className="font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Post-Order Logistical Entry</p>
            <h2 className="text-xl font-black uppercase tracking-tighter">Confirm shipment data for {orderId}</h2>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">Close</button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[11px] uppercase text-outline">Item Cost</label>
              <div className="flex border border-outline-variant bg-surface-container-low focus-within:border-primary-container">
                <span className="px-3 py-2 text-sm text-on-surface">$</span>
                <input value={itemCost} onChange={(e) => setItemCost(e.target.value)} className="w-full bg-transparent px-3 py-2 text-sm outline-none" placeholder="0.00" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[11px] uppercase text-outline">Shipping Cost</label>
              <div className="flex border border-outline-variant bg-surface-container-low focus-within:border-primary-container">
                <span className="px-3 py-2 text-sm text-on-surface">$</span>
                <input value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} className="w-full bg-transparent px-3 py-2 text-sm outline-none" placeholder="0.00" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[11px] uppercase text-outline">Expected Delivery</label>
              <div className="relative">
                <input value={expectedDate} onChange={(e) => setExpectedDate(e.target.value)} className="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-sm outline-none" type="date" />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline">calendar_today</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 bg-surface-container-lowest border border-outline-variant p-4 flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase text-on-surface-variant mb-2">Reminder</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">Shipping details should be validated against the vendor confirmation number and internal reference before the order can be marked complete.</p>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-[10px] uppercase text-outline mb-2">
                <span>Total</span>
                <span className="font-bold">${(parseFloat(itemCost || 0) + parseFloat(shippingCost || 0)).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col sm:flex-row gap-3 justify-end">
            <button type="button" onClick={onClose} className="w-full sm:w-auto px-6 py-3 border border-outline-variant text-on-surface uppercase tracking-widest text-[10px] font-bold">Cancel</button>
            <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-3 bg-primary text-white uppercase tracking-widest text-[10px] font-bold">
              {submitting ? 'Saving...' : 'Confirm & Log Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}