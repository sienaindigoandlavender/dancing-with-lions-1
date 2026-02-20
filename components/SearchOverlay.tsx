'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { SEARCH_INDEX, type SearchEntry } from '@/lib/search-index'

// ─────────────────────────────────────────────────
// Extract unique categories for filter
// ─────────────────────────────────────────────────
const ALL_CATEGORIES = Array.from(new Set(SEARCH_INDEX.map(e => e.category))).sort()

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveCategory(null)
      setHighlightedIndex(0)
      // Small delay to ensure DOM is ready
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // ─────────────────────────────────────────────────
  // SEARCH LOGIC
  // ─────────────────────────────────────────────────

  const results = useMemo(() => {
    let filtered = SEARCH_INDEX

    // Category filter
    if (activeCategory) {
      filtered = filtered.filter(e => e.category === activeCategory)
    }

    // Text search
    if (query.trim()) {
      const terms = query.toLowerCase().trim().split(/\s+/)
      filtered = filtered.filter(entry => {
        const searchable = [
          entry.title,
          entry.category,
          entry.description,
          entry.number,
          ...entry.tags,
        ].join(' ').toLowerCase()
        return terms.every(term => searchable.includes(term))
      })
    }

    return filtered
  }, [query, activeCategory])

  // Reset highlight when results change
  useEffect(() => {
    setHighlightedIndex(0)
  }, [results])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(prev => Math.min(prev + 1, results.length - 1))
      // Scroll into view
      const el = resultsRef.current?.children[Math.min(highlightedIndex + 1, results.length - 1)] as HTMLElement
      el?.scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prev => Math.max(prev - 1, 0))
      const el = resultsRef.current?.children[Math.max(highlightedIndex - 1, 0)] as HTMLElement
      el?.scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'Enter' && results[highlightedIndex]) {
      const entry = results[highlightedIndex]
      if (entry.href !== '#') {
        onClose()
        window.location.href = entry.href
      }
    }
  }, [results, highlightedIndex, onClose])

  if (!isOpen) return null

  const resultCount = results.length
  const totalCount = SEARCH_INDEX.length

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)' }}
    >
      {/* ═══ TOP BAR ═══ */}
      <div className="max-w-wide mx-auto w-full px-6 md:px-10">
        <div className="flex items-center justify-between h-16" style={{ borderBottom: '1px solid #e5e5e5' }}>
          <span className="text-[15px] font-black tracking-[-0.02em] text-dwl-black uppercase">
            Search
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-dwl-gray hover:text-dwl-black transition-colors"
          >
            Close
            <span className="text-[10px] px-1.5 py-0.5" style={{ background: '#f5f5f5', border: '1px solid #e5e5e5' }}>
              ESC
            </span>
          </button>
        </div>
      </div>

      {/* ═══ SEARCH INPUT ═══ */}
      <div className="max-w-wide mx-auto w-full px-6 md:px-10 py-8">
        <div className="relative">
          {/* Search icon */}
          <svg
            className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search 61 data stories..."
            className="w-full pl-8 pr-4 py-2 text-[24px] md:text-[32px] font-serif italic text-dwl-black bg-transparent outline-none placeholder:text-dwl-muted"
            style={{ borderBottom: '1px solid #e5e5e5' }}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setActiveCategory(null)}
            className="text-[10px] uppercase tracking-[0.08em] px-3 py-1.5 transition-all duration-200"
            style={{
              background: !activeCategory ? '#0a0a0a' : 'transparent',
              color: !activeCategory ? '#ffffff' : '#737373',
              border: `1px solid ${!activeCategory ? '#0a0a0a' : '#e5e5e5'}`,
            }}
          >
            All ({totalCount})
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const count = SEARCH_INDEX.filter(e => e.category === cat).length
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? null : cat)}
                className="text-[10px] uppercase tracking-[0.08em] px-3 py-1.5 transition-all duration-200"
                style={{
                  background: isActive ? '#0a0a0a' : 'transparent',
                  color: isActive ? '#ffffff' : '#737373',
                  border: `1px solid ${isActive ? '#0a0a0a' : '#e5e5e5'}`,
                }}
              >
                {cat} ({count})
              </button>
            )
          })}
        </div>

        {/* Result count */}
        <p className="text-[11px] text-dwl-muted mt-4">
          {query.trim() || activeCategory
            ? `${resultCount} result${resultCount !== 1 ? 's' : ''}`
            : `${totalCount} data stories`
          }
          {query.trim() && ` for "${query}"`}
        </p>
      </div>

      {/* ═══ RESULTS ═══ */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="max-w-wide mx-auto w-full px-6 md:px-10 pb-16" ref={resultsRef}>
          {results.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif italic text-[24px] text-dwl-muted">No results</p>
              <p className="text-[13px] text-dwl-muted mt-2">
                Try different keywords or clear the category filter.
              </p>
            </div>
          ) : (
            results.map((entry, i) => (
              <SearchResult
                key={entry.id}
                entry={entry}
                index={i}
                isHighlighted={i === highlightedIndex}
                query={query}
                onClose={onClose}
                onHover={() => setHighlightedIndex(i)}
              />
            ))
          )}
        </div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="max-w-wide mx-auto w-full px-6 md:px-10">
        <div className="flex items-center justify-between py-4" style={{ borderTop: '1px solid #e5e5e5' }}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[10px] text-dwl-muted">
              <span className="px-1 py-0.5 text-[9px]" style={{ background: '#f5f5f5', border: '1px solid #e5e5e5' }}>↑↓</span>
              Navigate
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-dwl-muted">
              <span className="px-1 py-0.5 text-[9px]" style={{ background: '#f5f5f5', border: '1px solid #e5e5e5' }}>↵</span>
              Open
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-dwl-muted">
              <span className="px-1.5 py-0.5 text-[9px]" style={{ background: '#f5f5f5', border: '1px solid #e5e5e5' }}>ESC</span>
              Close
            </span>
          </div>
          <p className="text-[10px] text-dwl-muted">
            Dancing with Lions
          </p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// SEARCH RESULT ROW
// ─────────────────────────────────────────────────

function SearchResult({
  entry,
  index,
  isHighlighted,
  query,
  onClose,
  onHover,
}: {
  entry: SearchEntry
  index: number
  isHighlighted: boolean
  query: string
  onClose: () => void
  onHover: () => void
}) {
  const isExternal = entry.href === '#'

  const content = (
    <div
      className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-5 transition-all duration-200 cursor-pointer"
      style={{
        borderBottom: '1px solid #e5e5e5',
        background: isHighlighted ? '#fafafa' : 'transparent',
        paddingLeft: isHighlighted ? '12px' : '0',
      }}
      onMouseEnter={onHover}
    >
      {/* Left: number + category */}
      <div className="md:col-span-3 flex items-baseline gap-3">
        <span className="text-[11px] text-dwl-muted font-medium tabular-nums w-8 flex-shrink-0">
          {entry.number}
        </span>
        <span className="text-[11px] uppercase tracking-[0.06em] text-dwl-gray">
          {entry.category}
        </span>
      </div>

      {/* Right: title + description */}
      <div className="md:col-span-9">
        <p className="font-serif text-[20px] md:text-[24px] text-dwl-black leading-[1.15]">
          {entry.title}
        </p>
        <p className="text-[13px] text-dwl-gray mt-1 leading-relaxed max-w-[560px]">
          {entry.description}
        </p>
        {isExternal && (
          <span className="text-[10px] uppercase tracking-[0.08em] text-dwl-muted mt-2 inline-block">
            External dataset
          </span>
        )}
      </div>
    </div>
  )

  if (isExternal) {
    return content
  }

  return (
    <Link href={entry.href} onClick={onClose}>
      {content}
    </Link>
  )
}
