'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GARDENS, ISLAMIC_GARDEN_PRINCIPLES, WATER_SYSTEMS, HISTORY, HERO_STATS, KEY_NUMBERS, THREAD_COLORS, BIBLIOGRAPHY } from './data'

const ACCENT = '#2E7D32' // garden green

const GARDEN_ACCENTS: Record<string, string> = {
  agdal: '#6B8E23',    // olive
  menara: '#2E7D32',    // green roof
  majorelle: '#6050DC', // Majorelle Blue
  'jnan-sbil': '#E8A94E', // Fez gold
}

export default function GardensOfMoroccoPage() {
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeGarden, setActiveGarden] = useState(0)
  const [activePrinciple, setActivePrinciple] = useState(0)
  const [activeWater, setActiveWater] = useState(0)
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [showAllHistory, setShowAllHistory] = useState(false)
  const [expandedGardenSection, setExpandedGardenSection] = useState<string | null>('water')

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const s = (id: string) => vis.has(id)
  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  const visibleHistory = showAllHistory ? filteredHistory : filteredHistory.slice(0, 8)
  const currentGarden = GARDENS[activeGarden]
  const gardenAccent = GARDEN_ACCENTS[currentGarden.id]

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Garden colour bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          {GARDENS.map((g, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: GARDEN_ACCENTS[g.id] }} />
          ))}
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6">
            <Link href="/data" className="text-xs tracking-[0.3em] text-neutral-500 uppercase hover:text-neutral-300 transition-colors">← Data Index</Link>
          </div>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Module 084 · Landscape &amp; Water Intelligence</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            The Gardens of Morocco
          </h1>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            In a city at the gateway to the Sahara, water is sacred luxury. Every garden is paradise made visible.
            Almohad engineers, Saadian pavilions, French painters, French couturiers.
            Nine centuries of channelling the Atlas Mountains into geometry and shade.
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

      {/* ── THE FOUR GARDENS ── */}
      <section data-sid="gardens" className="py-24 px-6">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('gardens') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Four Gardens</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>The Atlas of Gardens</h2>
          <p className="text-sm text-neutral-400 max-w-2xl mb-10 leading-relaxed">
            Twelve-century royal orchards. An eighteenth-century paradise in Fez. A cobalt blue mirage.
            Each a different answer to the same question: how to make water stay in the desert.
          </p>

          {/* Garden selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {GARDENS.map((g, i) => (
              <button key={i} onClick={() => { setActiveGarden(i); setExpandedGardenSection('water') }}
                className="text-left p-4 border transition-all duration-300"
                style={{
                  borderColor: activeGarden === i ? GARDEN_ACCENTS[g.id] + '99' : 'rgb(38,38,38)',
                  backgroundColor: activeGarden === i ? GARDEN_ACCENTS[g.id] + '08' : 'transparent',
                }}>
                <div className="text-sm font-medium">{g.name}</div>
                <div className="text-[10px] text-neutral-600 mt-1">{g.city} · {g.founded.split('(')[0].trim()}</div>
              </button>
            ))}
          </div>

          {/* Garden detail */}
          <div className="border border-neutral-800 p-6 md:p-8" style={{ borderLeftColor: gardenAccent, borderLeftWidth: '3px' }}>
            <div className="flex flex-wrap items-baseline gap-3 mb-1">
              <h3 className="text-2xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{currentGarden.name}</h3>
              <span className="text-sm text-neutral-600" dir="rtl">{currentGarden.arabic}</span>
            </div>
            <div className="flex flex-wrap gap-3 text-[10px] tracking-[0.15em] uppercase text-neutral-500 mb-4">
              <span>{currentGarden.city}</span>
              <span>·</span>
              <span>{currentGarden.area}</span>
              {currentGarden.unescoYear && <><span>·</span><span>UNESCO {currentGarden.unescoYear}</span></>}
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed mb-4">{currentGarden.description}</p>
            <p className="text-xs text-neutral-500 italic mb-6">{currentGarden.keyFact}</p>

            {/* Expandable sections */}
            {(['water', 'plants', 'architecture', 'visitors'] as const).map(section => (
              <div key={section} className="border-t border-neutral-800/50">
                <button onClick={() => setExpandedGardenSection(expandedGardenSection === section ? null : section)}
                  className="w-full flex items-center justify-between py-3 text-left">
                  <span className="text-xs tracking-[0.2em] uppercase text-neutral-400">{section === 'water' ? 'Water & Irrigation' : section === 'plants' ? 'Planting' : section === 'architecture' ? 'Architecture' : 'Visiting'}</span>
                  <span className="text-neutral-600 text-xs">{expandedGardenSection === section ? '−' : '+'}</span>
                </button>
                {expandedGardenSection === section && (
                  <div className="pb-4">
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {section === 'water' ? currentGarden.water : section === 'plants' ? currentGarden.plants : section === 'architecture' ? currentGarden.architecture : currentGarden.visitors}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* History timeline for this garden */}
            <div className="border-t border-neutral-800/50 mt-2 pt-4">
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-500 block mb-3">Timeline</span>
              <div className="space-y-2">
                {currentGarden.history.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: gardenAccent }} />
                    <p className="text-xs text-neutral-400 leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ISLAMIC GARDEN DESIGN PRINCIPLES ── */}
      <section data-sid="principles" className="py-24 px-6 border-t border-neutral-900">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('principles') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Design Philosophy</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Six Principles of the Islamic Garden</h2>
          <p className="text-sm text-neutral-400 max-w-2xl mb-10 leading-relaxed">
            Paradise on earth. Jannah — the word means both "garden" and "heaven."
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-8">
            {ISLAMIC_GARDEN_PRINCIPLES.map((p, i) => (
              <button key={i} onClick={() => setActivePrinciple(i)}
                className={`text-left p-3 border transition-all duration-300 ${activePrinciple === i ? 'border-[#2E7D32]/60 bg-[#2E7D32]/5' : 'border-neutral-800 hover:border-neutral-700'}`}>
                <div className="text-xs font-medium">{p.name}</div>
              </button>
            ))}
          </div>

          <div className="border border-neutral-800 p-6 md:p-8">
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{ISLAMIC_GARDEN_PRINCIPLES[activePrinciple].name}</h3>
              <span className="text-xs text-neutral-600" dir="rtl">{ISLAMIC_GARDEN_PRINCIPLES[activePrinciple].arabic}</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">{ISLAMIC_GARDEN_PRINCIPLES[activePrinciple].description}</p>
            <div className="pt-3 border-t border-neutral-800/50">
              <span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">In Morocco</span>
              <p className="text-sm text-neutral-300 leading-relaxed">{ISLAMIC_GARDEN_PRINCIPLES[activePrinciple].examples}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WATER SYSTEMS ── */}
      <section data-sid="water" className="py-24 px-6 border-t border-neutral-900">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('water') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#1E88E5' }}>Hydraulic Engineering</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Four Water Systems</h2>
          <p className="text-sm text-neutral-400 max-w-2xl mb-10 leading-relaxed">
            No pumps, no electricity, no fuel. Gravity, gradient, and 1,000 years of tunnelling.
          </p>

          <div className="flex gap-2 mb-8">
            {WATER_SYSTEMS.map((w, i) => (
              <button key={i} onClick={() => setActiveWater(i)}
                className={`flex-1 text-left p-3 border transition-all duration-300 ${activeWater === i ? 'border-[#1E88E5]/60 bg-[#1E88E5]/5' : 'border-neutral-800 hover:border-neutral-700'}`}>
                <div className="text-sm font-medium">{w.name}</div>
                <div className="text-[10px] text-neutral-600 mt-1" dir="rtl">{w.arabic}</div>
              </button>
            ))}
          </div>

          <div className="border border-neutral-800 p-6 md:p-8" style={{ borderLeftColor: '#1E88E5', borderLeftWidth: '3px' }}>
            <h3 className="text-xl font-light mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{WATER_SYSTEMS[activeWater].name}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">{WATER_SYSTEMS[activeWater].description}</p>
            <div className="pt-3 border-t border-neutral-800/50">
              <span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Engineering</span>
              <p className="text-sm text-neutral-300 leading-relaxed">{WATER_SYSTEMS[activeWater].engineering}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section data-sid="timeline" className="py-24 px-6 border-t border-neutral-900">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Chronology</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Nine Centuries of Gardens</h2>

          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setActiveThread(null)}
              className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors ${!activeThread ? 'border-neutral-500 text-neutral-200' : 'border-neutral-800 text-neutral-500 hover:border-neutral-700'}`}>
              All
            </button>
            {Object.entries(THREAD_COLORS).map(([t, c]) => (
              <button key={t} onClick={() => setActiveThread(activeThread === t ? null : t)}
                className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors ${activeThread === t ? 'text-neutral-200' : 'text-neutral-500 hover:border-neutral-700'}`}
                style={{ borderColor: activeThread === t ? c : undefined }}>
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {visibleHistory.map((h, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-24 md:w-32 flex-shrink-0 text-right">
                  <span className="text-xs text-neutral-500 font-mono">{h.year}</span>
                </div>
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: THREAD_COLORS[h.thread] || ACCENT }} />
                <p className="text-sm text-neutral-400 leading-relaxed">{h.event}</p>
              </div>
            ))}
          </div>
          {!showAllHistory && filteredHistory.length > 8 && (
            <button onClick={() => setShowAllHistory(true)}
              className="mt-6 text-xs tracking-[0.15em] uppercase hover:text-neutral-300 transition-colors" style={{ color: ACCENT }}>
              Show all {filteredHistory.length} events →
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
            Module 084 · The Gardens of Morocco · © Dancing with Lions
          </p>
          <p className="text-[10px] text-neutral-700 mt-2">
            Data: UNESCO, ArchNet, Med-O-Med, Fondation Bergé-YSL, Mohammed VI Foundation, Wikipedia
          </p>
        </div>
      </footer>
    </main>
  )
}
