'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BREADS, FERRAN, WHEAT_DEPENDENCY, ETIQUETTE, HISTORY, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const ACCENT = '#D4A053' // warm wheat gold
const THREAD_COLORS: Record<string, string> = {
  origin: '#A3A3A3',
  grain: '#D4A053',
  ferran: '#C2703E',
  modern: '#3B82F6',
  politics: '#EF4444',
  dependency: '#F59E0B',
}

export default function BreadOfMoroccoPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeBread, setActiveBread] = useState(0)
  const [expandedEtiquette, setExpandedEtiquette] = useState<number | null>(null)
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [showAllWheat, setShowAllWheat] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  const vis = (id: string) => visibleSections.has(id)
  const visibleWheat = showAllWheat ? WHEAT_DEPENDENCY : WHEAT_DEPENDENCY.slice(0, 6)

  return (
    <main className="min-h-screen bg-white text-[#1C1917]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%"><defs><pattern id="grain-dot" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="0.8" fill="#D4A053" /><circle cx="0" cy="0" r="0.4" fill="#D4A053" /><circle cx="16" cy="16" r="0.4" fill="#D4A053" /></pattern></defs><rect width="100%" height="100%" fill="url(#grain-dot)" /></svg>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6">
            <Link href="/data" className="text-xs tracking-[0.3em] text-neutral-500 uppercase hover:text-neutral-600 transition-colors">← Data Index</Link>
          </div>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Module 080 · Food &amp; Agricultural Intelligence</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            The Bread<br />of Morocco
          </h1>
          <p className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Khobz, msemen, baghrir, rghaif, harcha. Daily bread variations, communal ovens, wheat dependency.
            In Darija, bread and livelihood are the same word.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {HERO_STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-light mb-1" style={{ color: ACCENT, fontFamily: "'Instrument Serif', Georgia, serif" }}>{s.value}</div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-neutral-600" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-600">Scroll</span>
        </div>
      </section>

      {/* ── BREADS ── */}
      <section data-sid="breads" className="py-24 px-6">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('breads') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Breads</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Eight Breads of a Nation</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">From the daily round loaf to the sand-baked bread of the Sahara. Each one answers a different question: how much time do we have, what flour is in the house, is there an oven nearby.</p>

          {/* Bread selector — 2 rows of 4 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {BREADS.map((b, i) => (
              <button key={i} onClick={() => setActiveBread(i)}
                className={`text-left p-3 border transition-all duration-300 ${activeBread === i ? 'border-[#D4A053]/60 bg-[#D4A053]/5' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="text-sm font-medium">{b.name}</div>
                <div className="text-xs text-neutral-600 font-arabic mt-0.5" dir="rtl">{b.arabic}</div>
                <div className="text-[10px] text-neutral-600 mt-1 line-clamp-1">{b.type}</div>
              </button>
            ))}
          </div>

          {/* Active bread detail */}
          <div className="border border-neutral-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-xl md:text-2xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{BREADS[activeBread].name}</h3>
                  <span className="text-sm text-neutral-600 font-arabic" dir="rtl">{BREADS[activeBread].arabic}</span>
                </div>
                <div className="text-xs tracking-[0.15em] uppercase mb-4" style={{ color: ACCENT }}>{BREADS[activeBread].type}</div>

                <div className="space-y-3 text-sm text-neutral-500 leading-relaxed">
                  <p><span className="text-neutral-500 text-xs uppercase tracking-wider">Method</span><br />{BREADS[activeBread].method}</p>
                  <p><span className="text-neutral-500 text-xs uppercase tracking-wider">Flour</span><br />{BREADS[activeBread].flour}</p>
                  <p><span className="text-neutral-500 text-xs uppercase tracking-wider">When</span><br />{BREADS[activeBread].when}</p>
                  <p className="text-neutral-600 pt-2">{BREADS[activeBread].detail}</p>
                </div>
              </div>
              <div className="md:w-64 flex-shrink-0">
                <div className="border border-neutral-200 p-4 bg-[#D4A053]/[0.03]">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-2">Key Fact</div>
                  <p className="text-sm leading-relaxed" style={{ color: ACCENT }}>{BREADS[activeBread].keyFact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE FERRAN ── */}
      <section data-sid="ferran" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('ferran') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Communal Oven</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>The Ferran</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">فران — the neighbourhood oven. Where bread is baked, news is exchanged, and every family is known by the marks on their loaf.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FERRAN.map((f, i) => (
              <div key={i} className="border border-neutral-200 p-5 hover:border-neutral-300 transition-colors">
                <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: ACCENT }}>{f.aspect}</div>
                <p className="text-sm text-neutral-500 leading-relaxed">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ETIQUETTE ── */}
      <section data-sid="etiquette" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('etiquette') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Rules</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Bread Etiquette</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">Seven unwritten rules that every Moroccan learns before they learn to read.</p>

          <div className="space-y-2">
            {ETIQUETTE.map((e, i) => (
              <div key={i} className="border border-neutral-200 overflow-hidden">
                <button onClick={() => setExpandedEtiquette(expandedEtiquette === i ? null : i)}
                  className="w-full text-left p-4 md:p-5 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                  <span className="text-base font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{e.rule}</span>
                  <svg className={`w-4 h-4 text-neutral-600 transition-transform flex-shrink-0 ${expandedEtiquette === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {expandedEtiquette === i && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5">
                    <p className="text-sm text-neutral-500 leading-relaxed max-w-3xl">{e.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHEAT DEPENDENCY ── */}
      <section data-sid="wheat" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('wheat') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Dependency</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Wheat: The Structural Vulnerability</h2>
          <p className="text-sm text-neutral-500 max-w-3xl mb-12 leading-relaxed">
            Morocco exports $8 billion in agriculture — tomatoes, citrus, berries. Yet it imports 60%+ of the wheat its people eat.
            Two consecutive drought years have exposed the paradox: a nation that feeds Europe cannot feed itself bread.
          </p>

          <div className="space-y-3">
            {visibleWheat.map((w, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6 border border-neutral-200 p-4 hover:border-neutral-300 transition-colors">
                <div className="md:w-56 flex-shrink-0">
                  <span className="text-xs tracking-[0.15em] uppercase text-neutral-500">{w.metric}</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-neutral-600">{w.value}</span>
                </div>
                <div className="md:w-48 flex-shrink-0">
                  <span className="text-[10px] text-neutral-600">{w.source}</span>
                </div>
              </div>
            ))}
          </div>

          {WHEAT_DEPENDENCY.length > 6 && (
            <button onClick={() => setShowAllWheat(!showAllWheat)}
              className="mt-4 text-xs tracking-[0.15em] uppercase hover:text-neutral-600 transition-colors" style={{ color: ACCENT }}>
              {showAllWheat ? '← Show fewer' : `Show all ${WHEAT_DEPENDENCY.length} data points →`}
            </button>
          )}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section data-sid="timeline" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Chronology</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>From Embers to Imports</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-8 leading-relaxed">Bread riots, drought cycles, and the subsidy that holds a nation together.</p>

          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setActiveThread(null)}
              className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors ${!activeThread ? 'border-neutral-500 text-neutral-700' : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'}`}>
              All
            </button>
            {Object.entries(THREAD_COLORS).map(([thread, colour]) => (
              <button key={thread} onClick={() => setActiveThread(activeThread === thread ? null : thread)}
                className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors ${activeThread === thread ? 'text-neutral-700' : 'text-neutral-500 hover:border-neutral-300'}`}
                style={{ borderColor: activeThread === thread ? colour : undefined }}>
                {thread}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredHistory.map((h, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="w-20 flex-shrink-0 text-right">
                  <span className="text-xs text-neutral-500 font-mono">{h.year}</span>
                </div>
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: THREAD_COLORS[h.thread] || ACCENT }} />
                <p className="text-sm text-neutral-500 leading-relaxed">{h.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY NUMBERS ── */}
      <section data-sid="numbers" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('numbers') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>By the Numbers</p>
          <h2 className="text-3xl md:text-4xl font-light mb-12" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Key Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEY_NUMBERS.map((n, i) => (
              <div key={i} className="border border-neutral-200 p-5 hover:border-neutral-300 transition-colors">
                <div className="text-2xl md:text-3xl font-light mb-2" style={{ color: ACCENT, fontFamily: "'Instrument Serif', Georgia, serif" }}>{n.number}</div>
                <p className="text-xs text-neutral-500 leading-relaxed">{n.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIBLIOGRAPHY ── */}
      <section data-sid="bib" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${vis('bib') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Sources</p>
          <h2 className="text-2xl md:text-3xl font-light mb-8" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Bibliography</h2>
          <div className="space-y-4">
            {BIBLIOGRAPHY.map((b, i) => (
              <div key={i} className="border-l border-neutral-200 pl-4">
                <div className="text-sm text-neutral-600 mb-1">{b.source}</div>
                <div className="text-xs text-neutral-500 leading-relaxed">{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[11px] text-white/50 tracking-[0.15em] uppercase">
            Module 080 · The Bread of Morocco · © Dancing with Lions
          </p>
          <p className="text-[11px] text-white/35 mt-2">
            Data: USDA FAS, FAO, World Grain, ONICL, Milling MEA
          </p>
        </div>
      
        <div style={{ backgroundColor: '#161616' }} className="mt-12 -mx-6 -mb-16 py-3">
          <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>dancingwithlions.com</p>
        </div>
      </footer>
    </main>
  )
}
