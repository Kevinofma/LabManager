import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../utils/api'

export default function NewRequest() {
  const [vendor, setVendor] = useState('')
  const [description, setDescription] = useState('')
  const [catalog, setCatalog] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState('ml')
  const [grant, setGrant] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        item_id: catalog || 'CAT-000-00',
        grant_id: grant || 'NIH-R01-2024',
        quantity: Number(quantity)
      }
      const created = await createOrder(payload)
      navigate(`/orders/${created.id}`)
    } catch (err) {
      console.error(err)
      alert('Failed to create request: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex justify-center py-12 px-6">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        <div className="flex-grow bg-surface-container-lowest border border-outline-variant">
          <div className="bg-surface-container-high border-b border-outline-variant px-6 py-2">
            <h1 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant">Procurement Requisition Form / REF-2024-PR</h1>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-l-4 border-primary pl-4">
                <h2 className="font-headline text-lg font-extrabold uppercase tracking-tight text-on-surface">Vendor Information</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 pt-2">
                <div className="space-y-1">
                  <label className="font-label text-[10px] text-outline uppercase">Preferred Vendor</label>
                  <input className="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-sm focus:border-primary-container focus:ring-0 transition-none" placeholder="Enter vendor name..." value={vendor} onChange={(e) => setVendor(e.target.value)} />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2 border-l-4 border-primary pl-4">
                <h2 className="font-headline text-lg font-extrabold uppercase tracking-tight text-on-surface">Item Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-6 space-y-1">
                  <label className="font-label text-[10px] text-outline uppercase">Description</label>
                  <input className="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-sm focus:border-primary-container focus:ring-0 transition-none" placeholder="Technical descriptor..." value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="md:col-span-3 space-y-1">
                  <label className="font-label text-[10px] text-outline uppercase">Catalog #</label>
                  <input className="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-sm font-mono focus:border-primary-container focus:ring-0 transition-none uppercase" placeholder="CAT-000-00" value={catalog} onChange={(e) => setCatalog(e.target.value)} />
                </div>
                <div className="md:col-span-1 space-y-1">
                  <label className="font-label text-[10px] text-outline uppercase">Qty</label>
                  <input className="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-sm font-mono focus:border-primary-container focus:ring-0 transition-none" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="font-label text-[10px] text-outline uppercase">Size/Unit</label>
                  <div className="flex items-center border border-outline-variant bg-surface-container-low focus-within:border-primary-container">
                    <input className="w-full border-none bg-transparent px-3 py-2 text-sm focus:ring-0 transition-none" placeholder="e.g. 500" value={unit} onChange={(e) => setUnit(e.target.value)} />
                    <select className="border-none bg-transparent py-2 pr-8 text-xs font-label focus:ring-0 text-outline uppercase cursor-pointer" value={unit} onChange={(e) => setUnit(e.target.value)}>
                      <option>ml</option>
                      <option>μl</option>
                      <option>g</option>
                      <option>mg</option>
                      <option>pk</option>
                      <option>cs</option>
                      <option>ea</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-2 border-l-4 border-primary pl-4">
                <h2 className="font-headline text-lg font-extrabold uppercase tracking-tight text-on-surface">Submission Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="font-label text-[10px] text-outline uppercase">Grant Selection</label>
                    <select className="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-sm focus:border-primary-container focus:ring-0 transition-none" value={grant} onChange={(e) => setGrant(e.target.value)}>
                      <option value="">Select Active Grant...</option>
                      <option>NIH-R01-CA123456 - Oncology Research</option>
                      <option>NSF-BIO-789012 - Cellular Pathways</option>
                      <option>INT-PH-334455 - Internal Pilot</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-label text-[10px] text-outline uppercase">Additional Info for Manager</label>
                  <textarea className="w-full min-h-[120px] border border-outline-variant bg-surface-container-low px-3 py-2 text-sm focus:border-primary-container focus:ring-0 transition-none resize-none" placeholder="Specify any urgent deadlines, alternative substitutions, or storage requirements..." value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
              </div>
            </section>

            <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-3 bg-secondary-container/10 p-4 border-l-2 border-secondary">
                <span className="material-symbols-outlined text-secondary text-lg">verified_user</span>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-secondary uppercase tracking-tighter">Researcher Protocol</p>
                  <p className="text-[11px] text-on-surface-variant leading-tight">By submitting, you confirm these items are necessary for the selected grant objectives. Approvals are routed via the departmental manager.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button type="button" className="px-6 py-3 border border-primary text-primary font-headline text-xs font-bold uppercase tracking-widest hover:bg-surface-container transition-none">Save Draft</button>
                <button type="submit" disabled={submitting} className="px-10 py-3 bg-gradient-to-t from-[#003d9b] to-[#0052cc] text-white font-headline text-xs font-bold uppercase tracking-widest hover:brightness-110 active:border-inset active:border-primary border border-transparent shadow-none">
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          </form>
        </div>

        <aside className="w-full lg:w-80 space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant">
            <div className="bg-surface-container-high border-b border-outline-variant px-4 py-2">
              <span className="font-headline text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">System Status</span>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-label text-outline uppercase">Workflow Status</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                  OPERATIONAL
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-label text-outline uppercase">Server Timestamp</span>
                <p className="font-mono text-[11px] text-on-surface">2024-10-24 14:22:09 UTC</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant overflow-hidden">
            <div className="h-40 bg-slate-200">
              <img className="w-full h-full object-cover grayscale opacity-50 contrast-125" alt="Laboratory Instrumentation" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfgj3ta6UppZRoHeRayNpliZ5NnmjA_nSlxumDxhlY7ic6_tLbDw-V95wJSUDKo9MARquQpDTdb1bfI54ZVVgV3RFQhAOezK7ruWMVrZ7M_13POU-W27hKYB3U0xMZNec7iIJyXcrhthf2-ivr_oxO0gmjWkgl5SWliDQJ62l40NVz6v1Y5gMmLmRdRwU5ycf04pboeS4BZeU0ONOrTbCWxB8zN2ma6meWA-wK7P9oNa167HkLv0-fv6LKc7tHNwfPSgHlh_ygaL0" />
            </div>
            <div className="p-4">
              <h3 className="font-headline text-xs font-bold uppercase mb-2">Compliance Reminder</h3>
              <p className="text-[11px] text-on-surface-variant">All biological reagents must include an updated MSDS sheet upon delivery to Central Receiving.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
