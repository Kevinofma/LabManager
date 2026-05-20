import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const ROWS = [
  {
    ledgerId: 'TXN-8829-001',
    ordered: '2024-10-24',
    expected: '2024-10-28',
    received: 'Pending',
    item: 'Eppendorf Research Plus Pipette',
    description: 'Adjustable volume, 100-1000 µL.',
    vendor: 'Thermo Fisher',
    catalog: '#14-282-100',
    grant: 'NIH-R01-2024',
    cost: '382.50',
    shipping: '15.00',
    total: '397.50'
  },
  {
    ledgerId: 'TXN-8827-442',
    ordered: '2024-10-21',
    expected: '2024-10-23',
    received: '2024-10-23',
    item: 'Agarose, Molecular Biology Grade',
    description: '500g, DNA Electrophoresis.',
    vendor: 'Sigma-Aldrich',
    catalog: '#A9539-500G',
    grant: 'NSF-BIO-CORE',
    cost: '1245.00',
    shipping: '45.00',
    total: '1290.00'
  },
  {
    ledgerId: 'TXN-8812-901',
    ordered: '2024-10-20',
    expected: '2024-10-25',
    received: 'Pending',
    item: 'Nitril Examination Gloves',
    description: 'Powder-free, 100 box set.',
    vendor: 'VWR International',
    catalog: '#45215-078',
    grant: 'NIH-R01-2024',
    cost: '98.60',
    shipping: '12.00',
    total: '110.60'
  }
]

export default function Orders() {
  const { loading } = useAppContext()
  const [search, setSearch] = useState('')
  const [grant, setGrant] = useState('All Active Grants')
  const [vendor, setVendor] = useState('All Vendors')

  if (loading) return <div className="p-6 text-sm text-on-surface-variant">Loading order history...</div>

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-6 border-b border-outline-variant pb-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="data-font text-[10px] uppercase tracking-widest text-outline mb-1">System / Archive / Ledger</p>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-on-surface">Order History</h1>
          </div>
          <button className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 font-headline text-xs uppercase tracking-widest border border-primary hover:bg-primary-container transition-none">
            <span className="material-symbols-outlined text-sm">download</span>
            Export to CSV
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          <div className="flex flex-col gap-1.5">
            <label className="data-font text-[10px] uppercase text-outline font-bold">Search Catalog/Vendor</label>
            <div className="relative">
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant p-2 text-xs data-font focus:border-primary-container outline-none"
                placeholder="REF-000000"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="data-font text-[10px] uppercase text-outline font-bold">Filter By Grant</label>
            <select className="w-full bg-surface-container-lowest border border-outline-variant p-2 text-xs appearance-none focus:border-primary-container outline-none font-body" value={grant} onChange={(e) => setGrant(e.target.value)}>
              <option>All Active Grants</option>
              <option>NIH-R01-2024</option>
              <option>NSF-BIO-CORE</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="data-font text-[10px] uppercase text-outline font-bold">Filter By Vendor</label>
            <select className="w-full bg-surface-container-lowest border border-outline-variant p-2 text-xs appearance-none focus:border-primary-container outline-none font-body" value={vendor} onChange={(e) => setVendor(e.target.value)}>
              <option>All Vendors</option>
              <option>Thermo Fisher</option>
              <option>Sigma-Aldrich</option>
              <option>VWR International</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="data-font text-[10px] uppercase text-outline font-bold">Date Range (Start)</label>
            <input className="w-full bg-surface-container-lowest border border-outline-variant p-2 text-xs data-font focus:border-primary-container outline-none" type="date" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="data-font text-[10px] uppercase text-outline font-bold">Date Range (End)</label>
            <input className="w-full bg-surface-container-lowest border border-outline-variant p-2 text-xs data-font focus:border-primary-container outline-none" type="date" />
          </div>
        </div>
      </header>

      <div className="bg-surface-container-lowest border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-surface-container-high border-b border-outline-variant">
              <tr>
                <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider border-r border-outline-variant w-32">Date & Ledger ID</th>
                <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider border-r border-outline-variant w-28">Ordered</th>
                <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider border-r border-outline-variant w-28">Expected</th>
                <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider border-r border-outline-variant w-28">Received</th>
                <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider border-r border-outline-variant">Item Description</th>
                <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider border-r border-outline-variant w-40">Vendor & Catalog</th>
                <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider border-r border-outline-variant w-32">Grant Reference</th>
                <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider w-40 text-right">Cost + Shipping (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {ROWS.map((row) => (
                <tr key={row.ledgerId} className="hover:bg-surface-container transition-none">
                  <td className="px-3 py-1.5 border-r border-outline-variant">
                    <div className="data-font text-[11px] font-bold">{row.ordered}</div>
                    <div className="data-font text-[10px] text-outline">{row.ledgerId}</div>
                  </td>
                  <td className="px-3 py-1.5 border-r border-outline-variant">
                    <div className="data-font text-[11px]">{row.ordered}</div>
                  </td>
                  <td className="px-3 py-1.5 border-r border-outline-variant">
                    <div className="data-font text-[11px]">{row.expected}</div>
                  </td>
                  <td className="px-3 py-1.5 border-r border-outline-variant">
                    <div className={`data-font text-[11px] ${row.received === 'Pending' ? 'text-outline italic' : ''}`}>{row.received}</div>
                  </td>
                  <td className="px-3 py-1.5 border-r border-outline-variant">
                    <div className="font-bold text-xs uppercase">{row.item}</div>
                    <div className="text-[10px] text-on-surface-variant">{row.description}</div>
                  </td>
                  <td className="px-3 py-1.5 border-r border-outline-variant">
                    <div className="text-xs">{row.vendor}</div>
                    <div className="data-font text-[10px] text-primary">{row.catalog}</div>
                  </td>
                  <td className="px-3 py-1.5 border-r border-outline-variant">
                    <span className="data-font text-[10px] px-1 bg-surface-container border border-outline-variant">{row.grant}</span>
                  </td>
                  <td className="px-3 py-1.5 text-right">
                    <div className="data-font text-[11px] font-bold">{row.cost} + {row.shipping}</div>
                    <div className="data-font text-[9px] text-outline">TOTAL: {row.total}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-3 text-[10px] data-font text-on-surface-variant">
        <NavLink to="/new-request" className="uppercase tracking-widest font-bold text-primary">Create New Request</NavLink>
        <NavLink to="/post-order-entry" className="uppercase tracking-widest font-bold text-primary">Open Post-Order Log</NavLink>
      </div>
    </div>
  )
}
