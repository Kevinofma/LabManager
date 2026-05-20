import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import LogisticsModal from './LogisticsModal'

export default function OrdersTable() {
  const { orders, loading, reloadOrders } = useAppContext()
  const [openFor, setOpenFor] = useState(null)

  if (loading) return <div className="p-4">Loading orders...</div>
  if (!orders || orders.length === 0) return <div className="p-4 text-sm text-gray-500">No orders found.</div>

  return (
    <div className="bg-surface-container-lowest border border-outline-variant overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-surface-container-high border-b border-outline-variant">
            <tr>
              <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider border-r border-outline-variant w-32">Request ID</th>
              <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider border-r border-outline-variant">Item &amp; Description</th>
              <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider border-r border-outline-variant w-40">Vendor &amp; SKU</th>
              <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider border-r border-outline-variant w-28 text-center">Qty</th>
              <th className="px-3 py-2 font-headline text-[10px] font-black uppercase tracking-wider w-32 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-surface-container transition-none">
                <td className="px-3 py-2 border-r border-outline-variant"><div className="data-font text-[10px] font-bold">{o.id}</div></td>
                <td className="px-3 py-2 border-r border-outline-variant"><div className="font-bold text-xs uppercase">{o.item}</div><div className="text-[10px] text-on-surface-variant">{o.description || ''}</div></td>
                <td className="px-3 py-2 border-r border-outline-variant"><div className="text-xs">{o.vendor}</div><div className="data-font text-[10px] text-primary">{o.sku}</div></td>
                <td className="px-3 py-2 border-r border-outline-variant text-center"><div className="data-font text-xs">{o.qty}</div></td>
                <td className="px-3 py-2 text-center">
                  <button onClick={() => setOpenFor(o.id)} className="bg-primary text-on-primary text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">Place Order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openFor && (
        <LogisticsModal
          orderId={openFor}
          onClose={() => setOpenFor(null)}
          onSuccess={() => reloadOrders()}
        />
      )}
    </div>
  )
}
