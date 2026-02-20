'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import SearchOverlay from './SearchOverlay'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="max-w-wide mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16 border-b border-dwl-border">
            {/* Masthead */}
            <Link href="/" className="flex items-baseline gap-3">
              <span className="text-[15px] font-black tracking-[-0.02em] text-dwl-black uppercase">
                Dancing with Lions
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/data" className="meta-text hover:text-dwl-black transition-colors">
                Data
              </Link>
              <Link href="/about" className="meta-text hover:text-dwl-black transition-colors">
                About
              </Link>
              <Link href="/intellectual-property" className="meta-text hover:text-dwl-black transition-colors">
                IP &amp; Licensing
              </Link>
              {/* Search icon */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1 hover:opacity-60 transition-opacity"
                aria-label="Search"
                title="Search (⌘K)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-dwl-gray">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </button>
            </nav>

            {/* Mobile: search + menu */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1"
                aria-label="Search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-dwl-gray">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col gap-[5px] p-2"
                aria-label="Toggle menu"
              >
                <span className={`block w-5 h-[1.5px] bg-dwl-black transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
                <span className={`block w-5 h-[1.5px] bg-dwl-black transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-[1.5px] bg-dwl-black transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-b border-dwl-border">
            <nav className="max-w-wide mx-auto px-6 py-8 flex flex-col gap-6">
              <Link href="/data" onClick={() => setMenuOpen(false)} className="meta-text">
                Data
              </Link>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="meta-text">
                About
              </Link>
              <Link href="/intellectual-property" onClick={() => setMenuOpen(false)} className="meta-text">
                IP &amp; Licensing
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
