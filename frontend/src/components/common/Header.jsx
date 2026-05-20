import React from 'react'
import { NavLink } from 'react-router-dom'

const navLinkClasses = ({ isActive }) =>
  isActive
    ? 'font-headline tracking-tighter uppercase text-sm font-bold text-primary border-b-2 border-primary h-full flex items-center px-2 transition-none'
    : 'font-headline tracking-tighter uppercase text-sm font-bold text-on-background dark:text-slate-400 opacity-70 hover:bg-surface-container h-full flex items-center px-2 transition-none'

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-0 h-14 w-full bg-white border-b border-outline-variant sticky top-0 z-50">
      <div className="flex items-center gap-8 h-full">
        <NavLink to="/" className="text-xl font-black tracking-tighter text-on-background dark:text-white uppercase">
          LabFlow Pro
        </NavLink>
        <nav className="hidden md:flex h-full items-center gap-6">
          <NavLink to="/" className={navLinkClasses} end>
            Dashboard
          </NavLink>
          <NavLink to="/new-request" className={navLinkClasses}>
            New Request
          </NavLink>
          <NavLink to="/orders" className={navLinkClasses}>
            Orders
          </NavLink>
          <NavLink to="/orders" className={navLinkClasses}>
            Search
          </NavLink>
        </nav>
      </div>
      <div className="flex items-center gap-4 h-full">
        <div className="relative group">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">search</span>
        </div>
        <div className="hidden sm:flex flex-col items-end mr-2">
          <span className="data-font text-[9px] uppercase tracking-widest text-on-surface-variant leading-none">Current Lab</span>
          <span className="font-headline font-black text-[11px] uppercase tracking-tighter text-primary">Main Core Lab</span>
        </div>
        <img alt="Chief Scientist Profile" className="w-8 h-8 rounded-full border border-outline-variant grayscale hover:grayscale-0 transition-all cursor-pointer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrLPQE_p01n2wolkcimsHGr0pgi-VajoQQx7WWH2SuJhxGAwuHrEarDzuQerYPpEsgsgN4siSq8XuhbWttX6ZAoGkwFe7mv-4P9iK65wfOanjBmXZc5fiHUsTVDyIJPSvhDL_tUEUYE0cT7TDKjxNNLbJvfELDoeV-hskNh_vaYuma8anbDjgfcGJ9Vvg9iPi4W9L2hGWsow2fIgq20m0yqKUGra2EEljhoTJyFO6bqPFTGzczIIb2Jx9wro-ma_ofW1OskhQKErI" />
      </div>
    </header>
  )
}
