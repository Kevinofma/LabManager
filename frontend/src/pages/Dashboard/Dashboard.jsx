import React from 'react'
import OrdersTable from '../../components/dashboard/OrdersTable'
import MetricsPanel from '../../components/dashboard/MetricsPanel'

export default function Dashboard() {
  return (
    <div className="flex-grow flex flex-col md:flex-row gap-6">
      <section className="flex-grow flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="font-headline text-5xl font-extrabold tracking-tighter uppercase text-on-background">Procurement Dashboard</h1>
          <div className="flex border-b border-[#c3c6d6]">
            <button className="px-6 py-2 font-headline font-bold text-sm tracking-widest uppercase border-b-2 border-primary text-primary">To Order</button>
            <button className="px-6 py-2 font-headline font-bold text-sm tracking-widest uppercase text-on-surface-variant opacity-60">Pending Receipt</button>
            <button className="px-6 py-2 font-headline font-bold text-sm tracking-widest uppercase text-on-surface-variant opacity-60">All Orders</button>
          </div>
        </div>

        <OrdersTable />
      </section>

      <MetricsPanel />
    </div>
  )
}
