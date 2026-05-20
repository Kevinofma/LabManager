import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { getDashboardMetrics } from '../../utils/api'

export default function MetricsPanel() {
  const { metrics: contextMetrics } = useAppContext()
  const [metrics, setMetrics] = useState(contextMetrics)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getDashboardMetrics()
      .then((m) => { if (mounted) setMetrics(m) })
      .catch((e) => {
        console.error('Failed to load metrics, using mock data', e)
        if (mounted) setMetrics(contextMetrics)
      })
      .finally(() => setLoading(false))
    return () => (mounted = false)
  }, [contextMetrics])

  const distribution = metrics?.grant_distribution_percentages || {}
  const total = metrics?.total_pending_value ?? 0

  return (
    <aside className="w-full md:w-80 flex flex-col gap-6">
      <div className="flex flex-col gap-6 p-4 border border-outline-variant bg-surface-container-low">
        <h2 className="font-headline text-lg font-black uppercase tracking-tighter text-on-background border-b border-outline-variant pb-2">Procurement Metrics</h2>
        <div className="flex flex-col mt-2 mb-4">
          <span className="data-font text-[10px] uppercase tracking-widest text-on-surface-variant leading-none">Current Lab</span>
          <span className="font-headline font-black text-[13px] uppercase tracking-tighter text-primary">Main Core Lab</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="data-font text-[10px] uppercase tracking-widest text-on-surface-variant">Total Value (Pending)</span>
          <span className="font-headline text-2xl font-black text-primary">${total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="data-font text-[10px] uppercase tracking-widest text-on-surface-variant">Grant Distribution</span>
          <div className="flex flex-col gap-2">
            {Object.entries(distribution).length === 0 && (
              <div className="text-sm text-gray-500">No distribution data</div>
            )}
            {Object.entries(distribution).map(([grant, pct]) => (
              <div key={grant}>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase"><span>{grant}</span><span className="data-font text-primary">{pct}%</span></div>
                <div className="w-full bg-surface-variant h-1"><div className="bg-primary h-full" style={{ width: `${pct}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative h-48 border border-outline-variant overflow-hidden flex items-end">
        <img alt="Lab Environment" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40" src="https://images.unsplash.com/photo-1581091012184-7a0c933ef3f2?auto=format&fit=crop&w=1200&q=80" />
        <div className="relative bg-white/90 w-full p-4 border-t border-outline-variant">
          <p className="data-font text-[10px] font-bold uppercase tracking-tighter">System Alert</p>
          <p className="text-xs font-bold">Maintenance scheduled for Node 4 at 23:00 EST.</p>
        </div>
      </div>
    </aside>
  )
}
