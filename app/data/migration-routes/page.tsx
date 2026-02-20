'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ROUTES, TRANSIT_CITIES, POLICY_TIMELINE, HERO_STATS, KEY_NUMBERS, KEY_CONCEPTS, TYPE_COLORS, BIBLIOGRAPHY } from './data'

const ACCENT = '#EF4444' // migration red — urgency, blood, danger

export default function MigrationRoutesPage() {
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeRoute, setActiveRoute] = useState(0)
  const [activeCity, setActiveCity] = useState(0)
  const [activeConcept, setActiveConcept] = useState(0)
  const [activeType, setActiveType] = useState<string | null>(null)
  const [showAllTimeline, setShowAllTimeline] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>('dangers')

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const s = (id: string) => vis.has(id)
  const filteredTimeline = activeType ? POLICY_TIMELINE.filter(t => t.type === activeType) : POLICY_TIMELINE
  const visibleTimeline = showAllTimeline ? filteredTimeline : filteredTimeline.slice(0, 10)

  const ROUTE_COLORS: Record<string, string> = {
    'western-med': '#3B82F6',
    'atlantic': '#EF4444',
    'overland-east': '#E8A94E',
    'overland-south': '#22C55E',
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-900/40 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6">
            <Link href="/data" className="text-xs tracking-[0.3em] text-neutral-500 uppercase hover:text-neutral-300 transition-colors">← Data Index</Link>
          </div>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Module 085 · Human Mobility Intelligence</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            Migration Routes<br className="hidden md:block" /> Through Morocco
          </h1>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Thirteen kilometres of water between two continents. Fences six metres tall.
            Forests where people wait for months.
            A country that is simultaneously origin, transit, and destination.
            The human geography of crossing.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {HERO_STATS.map((st, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-light mb-1" style={{ color: ACCENT, fontFamily: "'Instrument Serif', Georgia, serif" }}>{st.value}</div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 leading-snug">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-neutral-600" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-600">Scroll</span>
        </div>
      </section>

      {/* ── FOUR ROUTES ── */}
      <section data-sid="routes" className="py-24 px-6">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('routes') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Routes</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Four Paths to Europe</h2>
          <p className="text-sm text-neutral-400 max-w-2xl mb-10 leading-relaxed">
            Each route is a geography of risk. Each has its own history, its own dangers, its own economics.
            Only 10–15% of migrants who reach North Africa ultimately attempt the Mediterranean crossing.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {ROUTES.map((r, i) => (
              <button key={i} onClick={() => { setActiveRoute(i); setExpandedSection('dangers') }}
                className="text-left p-4 border transition-all duration-300"
                style={{
                  borderColor: activeRoute === i ? ROUTE_COLORS[r.id] + '99' : 'rgb(38,38,38)',
                  backgroundColor: activeRoute === i ? ROUTE_COLORS[r.id] + '08' : 'transparent',
                }}>
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-[10px] text-neutral-600 mt-1">{r.distance}</div>
              </button>
            ))}
          </div>

          <div className="border border-neutral-800 p-6 md:p-8" style={{ borderLeftColor: ROUTE_COLORS[ROUTES[activeRoute].id], borderLeftWidth: '3px' }}>
            <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{ROUTES[activeRoute].name}</h3>
            <p className="text-sm text-neutral-300 leading-relaxed mb-4">{ROUTES[activeRoute].description}</p>

            {(['origin', 'entry', 'path', 'destination', 'dangers', 'status'] as const).map(section => (
              <div key={section} className="border-t border-neutral-800/50">
                <button onClick={() => setExpandedSection(expandedSection === section ? null : section)}
                  className="w-full flex items-center justify-between py-3 text-left">
                  <span className="text-xs tracking-[0.2em] uppercase text-neutral-400">
                    {section === 'origin' ? 'Countries of Origin' : section === 'entry' ? 'Entry Point' : section === 'path' ? 'Path Through Morocco' : section === 'destination' ? 'Destination' : section === 'dangers' ? 'Dangers' : 'Current Status'}
                  </span>
                  <span className="text-neutral-600 text-xs">{expandedSection === section ? '−' : '+'}</span>
                </button>
                {expandedSection === section && (
                  <div className="pb-4">
                    <p className="text-sm text-neutral-400 leading-relaxed">{ROUTES[activeRoute][section]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSIT CITIES ── */}
      <section data-sid="cities" className="py-24 px-6 border-t border-neutral-900">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('cities') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Geography of Waiting</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Eight Transit Cities</h2>
          <p className="text-sm text-neutral-400 max-w-2xl mb-10 leading-relaxed">
            Not waypoints — worlds. Migrants live in these cities for months, years, sometimes permanently.
            Each city has a different character: how hostile the police are, how available work is,
            how close the border.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {TRANSIT_CITIES.map((c, i) => (
              <button key={i} onClick={() => setActiveCity(i)}
                className={`text-left p-3 border transition-all duration-300 ${activeCity === i ? 'border-red-900/60 bg-red-900/5' : 'border-neutral-800 hover:border-neutral-700'}`}>
                <div className="text-sm font-medium">{c.name}</div>
                <div className="text-[10px] text-neutral-600 mt-1">{c.role}</div>
              </button>
            ))}
          </div>

          <div className="border border-neutral-800 p-6 md:p-8" style={{ borderLeftColor: ACCENT, borderLeftWidth: '3px' }}>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{TRANSIT_CITIES[activeCity].name}</h3>
              <span className="text-xs text-neutral-500 uppercase tracking-wider">{TRANSIT_CITIES[activeCity].role}</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed mb-3">{TRANSIT_CITIES[activeCity].description}</p>
            <p className="text-xs text-neutral-500 italic">{TRANSIT_CITIES[activeCity].detail}</p>
          </div>
        </div>
      </section>

      {/* ── KEY CONCEPTS ── */}
      <section data-sid="concepts" className="py-24 px-6 border-t border-neutral-900">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('concepts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Language & Policy</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Key Concepts</h2>
          <p className="text-sm text-neutral-400 max-w-2xl mb-10 leading-relaxed">
            The vocabulary of borders. The words that frame who moves, who stays, who lives, who dies.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {KEY_CONCEPTS.map((c, i) => (
              <button key={i} onClick={() => setActiveConcept(i)}
                className={`text-left p-3 border transition-all duration-300 ${activeConcept === i ? 'border-red-900/60 bg-red-900/5' : 'border-neutral-800 hover:border-neutral-700'}`}>
                <div className="text-xs font-medium leading-snug">{c.term}</div>
              </button>
            ))}
          </div>

          <div className="border border-neutral-800 p-6 md:p-8">
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-lg font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{KEY_CONCEPTS[activeConcept].term}</h3>
              <span className="text-xs text-neutral-600" dir="rtl">{KEY_CONCEPTS[activeConcept].arabic}</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">{KEY_CONCEPTS[activeConcept].definition}</p>
          </div>
        </div>
      </section>

      {/* ── POLICY TIMELINE ── */}
      <section data-sid="timeline" className="py-24 px-6 border-t border-neutral-900">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Chronology</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Three Decades of Border Politics</h2>

          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setActiveType(null)}
              className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors ${!activeType ? 'border-neutral-500 text-neutral-200' : 'border-neutral-800 text-neutral-500 hover:border-neutral-700'}`}>
              All
            </button>
            {Object.entries(TYPE_COLORS).map(([t, c]) => (
              <button key={t} onClick={() => setActiveType(activeType === t ? null : t)}
                className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors ${activeType === t ? 'text-neutral-200' : 'text-neutral-500 hover:border-neutral-700'}`}
                style={{ borderColor: activeType === t ? c : undefined }}>
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {visibleTimeline.map((t, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-20 md:w-28 flex-shrink-0 text-right">
                  <span className="text-xs text-neutral-500 font-mono">{t.year}</span>
                </div>
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: TYPE_COLORS[t.type] }} />
                <p className="text-sm text-neutral-400 leading-relaxed">{t.event}</p>
              </div>
            ))}
          </div>
          {!showAllTimeline && filteredTimeline.length > 10 && (
            <button onClick={() => setShowAllTimeline(true)}
              className="mt-6 text-xs tracking-[0.15em] uppercase hover:text-neutral-300 transition-colors" style={{ color: ACCENT }}>
              Show all {filteredTimeline.length} events →
            </button>
          )}
        </div>
      </section>

      {/* ── KEY NUMBERS ── */}
      <section data-sid="numbers" className="py-24 px-6 border-t border-neutral-900">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('numbers') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>By the Numbers</p>
          <h2 className="text-3xl md:text-4xl font-light mb-12" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Key Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEY_NUMBERS.map((n, i) => (
              <div key={i} className="border border-neutral-800 p-5 hover:border-neutral-700 transition-colors">
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-2xl md:text-3xl font-light" style={{ color: ACCENT, fontFamily: "'Instrument Serif', Georgia, serif" }}>{n.number}</span>
                  {n.unit && <span className="text-sm text-neutral-500">{n.unit}</span>}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{n.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIBLIOGRAPHY ── */}
      <section data-sid="bib" className="py-24 px-6 border-t border-neutral-900">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${s('bib') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Sources</p>
          <h2 className="text-2xl md:text-3xl font-light mb-8" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Bibliography</h2>
          <div className="space-y-4">
            {BIBLIOGRAPHY.map((b, i) => (
              <div key={i} className="border-l border-neutral-800 pl-4">
                <div className="text-sm text-neutral-300 mb-1">{b.source}</div>
                <div className="text-xs text-neutral-500 leading-relaxed">{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-neutral-600 tracking-[0.15em] uppercase">
            Module 085 · Migration Routes Through Morocco · © Dancing with Lions
          </p>
          <p className="text-[10px] text-neutral-700 mt-2">
            Data: Africa Center, MPI, Carnegie, UNHCR, Global Detention Project, GADEM, World Bank, Caminando Fronteras
          </p>
        </div>
      </footer>
    </main>
  )
}
