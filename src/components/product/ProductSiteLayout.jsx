import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { wordsCut as site } from '../../data/product-sites/wordsCut.js'
import { useTheme } from '../../lib/useTheme.js'
import { ThemeToggle } from '../ThemeToggle.jsx'
import { DownloadButton } from './DownloadButton.jsx'
import './wordscut.css'

const items = [{ label: 'Overview', to: '/' }, { label: 'Privacy', to: '/privacy' }, { label: 'Terms', to: '/terms' }, { label: 'Support', to: '/support' }]

export function ProductSiteLayout() {
  const [open, setOpen] = useState(false)
  const dark = useTheme() === 'dark'
  const navLink = item => <NavLink end={item.to === '/'} key={item.to} to={item.to} onClick={() => setOpen(false)} className={({ isActive }) => `focus-ring rounded-sm text-sm font-medium ${isActive ? 'text-[var(--accent)]' : 'text-slate hover:text-ink'}`}>{item.label}</NavLink>
  return <div className="wc-product min-h-screen text-ink dark:text-white" style={{ '--accent': dark ? site.accentOnDark : site.accent, '--accent-dark': site.accentDark, '--accent-control': site.accent, '--accent-soft': site.accentSoft }}>
    <header className="sticky top-0 z-50">
      <nav className="section-shell flex h-16 items-center justify-between" aria-label="Main navigation">
        <Link className="focus-ring flex items-center gap-3" to="/"><img src={site.icon} alt="" width="36" height="36" /><span className="font-display text-lg font-semibold">WordsCut</span></Link>
        <div className="hidden items-center gap-7 md:flex">{items.map(navLink)}<ThemeToggle /><div><DownloadButton compact site={site} /></div></div>
        <div className="flex items-center gap-2 md:hidden"><ThemeToggle /><button className="focus-ring grid h-10 w-10 place-items-center" type="button" aria-label="Toggle navigation" aria-expanded={open} aria-controls="product-mobile-navigation" onClick={() => setOpen(value => !value)}>{open ? <X size={20} /> : <Menu size={20} />}</button></div>
      </nav>
      {open && <div id="product-mobile-navigation" className="section-shell grid gap-5 pb-6 md:hidden">{items.map(navLink)}<DownloadButton site={site} /></div>}
    </header>
    <main id="main-content"><Outlet context={site} /></main>
    <footer><div className="section-shell flex flex-wrap items-center justify-between gap-8 py-10"><div className="flex items-center gap-3"><img src={site.icon} alt="" width="36" height="36" /><div><p className="font-semibold">WordsCut</p><p className="text-sm text-slate">© 2026 Awais Jamil. All rights reserved.</p></div></div><nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-sm">{items.slice(1).map(navLink)}<a className="focus-ring text-slate" href="https://awaisjamil.com">Made by Awais Jamil</a></nav></div></footer>
  </div>
}
