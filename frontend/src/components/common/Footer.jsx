import React from 'react'

export default function Footer() {
  return (
    <footer className="flex flex-row justify-between items-center px-6 py-4 w-full bg-surface dark:bg-slate-950 border-t border-outline-variant dark:border-slate-800">
      <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-on-background dark:text-white">© 2024 LABFLOW PRO | ARCHITECTURAL PRECISION</span>
      <div className="flex gap-6">
        <a href="#" className="font-mono text-[10px] tracking-widest uppercase text-on-background opacity-60 hover:text-primary hover:opacity-100 transition-none">System Status</a>
        <a href="#" className="font-mono text-[10px] tracking-widest uppercase text-on-background opacity-60 hover:text-primary hover:opacity-100 transition-none">Documentation</a>
        <a href="#" className="font-mono text-[10px] tracking-widest uppercase text-on-background opacity-60 hover:text-primary hover:opacity-100 transition-none">Privacy Protocol</a>
        <a href="#" className="font-mono text-[10px] tracking-widest uppercase text-on-background opacity-60 hover:text-primary hover:opacity-100 transition-none">Support</a>
      </div>
    </footer>
  )
}
