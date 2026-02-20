'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DESERT_TYPES, SAHARA_FACTS, MOROCCAN_ERGS, HISTORY, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const ACCENT = '#E8A94E' // sand gold
const TYPE_COLORS: Record<string, string> = {
  Erg: '#E8A94E',
  Reg: '#8B7355',
  Hammada: '#6B6B6B',
  Oued: '#5BA3CF',
}
const THREAD_COLORS: Record<string, string> = {
  geology: '#6B6B6B',
  trade: '#E8A94E',
  naming: '#A855F7',
  modern: '#3B82F6',
  tourism: '#22C55E',
  climate: '#EF4444',
}

export default function NotAllDesertIsSandPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeType, setActiveType] = useState(0)
  const [activeErg, setActiveErg] = useState(0)
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [showAllFacts, setShowAllFacts] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  const vis = (id: string) => visibleSections.has(id)
  const visibleFacts = showAllFacts ? SAHARA_FACTS : SAHARA_FACTS.slice(0, 5)

  return (
    <main className="min-h-screen bg-white text-[#1C1917]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Gradient band — sand to stone to rock to blue */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.06]"
          style={{ background: 'linear-gradient(to right, #E8A94E, #8B7355, #6B6B6B, #5BA3CF)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6">
            <Link href="/data" className="text-xs tracking-[0.3em] text-neutral-500 uppercase hover:text-neutral-600 transition-colors">← Data Index</Link>
          </div>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Module 082 · Geographic &amp; Environmental Intelligence</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            Not All Desert<br />Is Sand
          </h1>
          <p className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Erg, reg, hammada, oued. Four desert types that most travellers cannot name.
            Only 25% of the Sahara is the sand sea you imagine. The other 75% is stone, gravel, bedrock, and ghost rivers.
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

      {/* ── THE FOUR TYPES ── */}
      <section data-sid="types" className="py-24 px-6">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('types') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Four Landscapes</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Desert Vocabulary</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-10 leading-relaxed">
            Four Arabic words for four ways the Earth goes dry. Learn them once and you&rsquo;ll never see the desert the same way again.
          </p>

          {/* Type selector — colour-coded */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {DESERT_TYPES.map((t, i) => (
              <button key={i} onClick={() => setActiveType(i)}
                className={`text-left p-4 border transition-all duration-300 ${activeType === i ? 'bg-white/[0.02]' : 'hover:border-neutral-300'}`}
                style={{ borderColor: activeType === i ? TYPE_COLORS[t.name] + '80' : '#262626' }}>
                <div className="text-lg font-light mb-0.5" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: TYPE_COLORS[t.name] }}>{t.name}</div>
                <div className="text-xs text-neutral-600 mb-1" dir="rtl">{t.arabic}</div>
                <div className="text-[10px] text-neutral-500 line-clamp-1">{t.type}</div>
              </button>
            ))}
          </div>

          {/* Active type detail */}
          <div className="border border-neutral-200 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-2xl md:text-3xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: TYPE_COLORS[DESERT_TYPES[activeType].name] }}>{DESERT_TYPES[activeType].name}</h3>
                  <span className="text-sm text-neutral-600" dir="rtl">{DESERT_TYPES[activeType].arabic}</span>
                </div>
                <div className="text-xs text-neutral-500 italic mb-4">{DESERT_TYPES[activeType].pronunciation}</div>

                <div className="space-y-3 text-sm text-neutral-500 leading-relaxed">
                  <p><span className="text-neutral-500 text-xs uppercase tracking-wider">Type</span><br />{DESERT_TYPES[activeType].type}</p>
                  <p><span className="text-neutral-500 text-xs uppercase tracking-wider">Coverage</span><br />{DESERT_TYPES[activeType].coverage}</p>
                  <p className="text-neutral-600 pt-2 border-t border-neutral-200">{DESERT_TYPES[activeType].detail}</p>
                  <p><span className="text-neutral-500 text-xs uppercase tracking-wider">In Morocco</span><br />{DESERT_TYPES[activeType].morocco}</p>
                </div>
              </div>
              <div className="lg:w-72 flex-shrink-0">
                <div className="border border-neutral-200 p-4" style={{ backgroundColor: TYPE_COLORS[DESERT_TYPES[activeType].name] + '08' }}>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-2">Key Fact</div>
                  <p className="text-sm leading-relaxed" style={{ color: TYPE_COLORS[DESERT_TYPES[activeType].name] }}>{DESERT_TYPES[activeType].keyFact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOROCCO'S ERGS ── */}
      <section data-sid="ergs" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('ergs') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Morocco&rsquo;s Sand Seas</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Three Ergs</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-10 leading-relaxed">
            Chebbi, Chegaga, and Tinfou. The famous, the wild, and the taster.
          </p>

          <div className="flex gap-2 mb-8">
            {MOROCCAN_ERGS.map((e, i) => (
              <button key={i} onClick={() => setActiveErg(i)}
                className={`flex-1 text-left p-3 border transition-all duration-300 ${activeErg === i ? 'border-[#E8A94E]/60 bg-[#E8A94E]/5' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="text-sm font-medium">{e.name}</div>
                <div className="text-[10px] text-neutral-600 mt-1 line-clamp-1">{e.maxHeight} max</div>
              </button>
            ))}
          </div>

          <div className="border border-neutral-200 p-6 md:p-8">
            <h3 className="text-xl font-light mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{MOROCCAN_ERGS[activeErg].name}</h3>
            <div className="text-xs text-neutral-500 mb-4">{MOROCCAN_ERGS[activeErg].location}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-500 leading-relaxed">
              <div>
                <span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Dimensions</span>
                {MOROCCAN_ERGS[activeErg].dimensions}
              </div>
              <div>
                <span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Max Height</span>
                {MOROCCAN_ERGS[activeErg].maxHeight}
              </div>
              <div className="md:col-span-2">
                <span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Character</span>
                {MOROCCAN_ERGS[activeErg].character}
              </div>
              <div className="md:col-span-2">
                <span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Access</span>
                {MOROCCAN_ERGS[activeErg].access}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SAHARA IN NUMBERS ── */}
      <section data-sid="sahara" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('sahara') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Sahara</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Data Points</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">
            The desert in numbers. Most of them will surprise.
          </p>

          <div className="space-y-3">
            {visibleFacts.map((f, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6 border border-neutral-200 p-4 hover:border-neutral-300 transition-colors">
                <div className="md:w-48 flex-shrink-0">
                  <span className="text-xs tracking-[0.15em] uppercase text-neutral-500">{f.metric}</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm text-neutral-600">{f.value}</span>
                </div>
                <div className="md:w-40 flex-shrink-0">
                  <span className="text-[10px] text-neutral-600">{f.source}</span>
                </div>
              </div>
            ))}
          </div>

          {SAHARA_FACTS.length > 5 && (
            <button onClick={() => setShowAllFacts(!showAllFacts)}
              className="mt-4 text-xs tracking-[0.15em] uppercase hover:text-neutral-600 transition-colors" style={{ color: ACCENT }}>
              {showAllFacts ? '← Show fewer' : `Show all ${SAHARA_FACTS.length} data points →`}
            </button>
          )}
        </div>
      </section>

      {/* ── SURFACE COMPOSITION ── */}
      <section data-sid="composition" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('composition') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>What the Desert Is Made Of</p>
          <h2 className="text-3xl md:text-4xl font-light mb-10" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Surface Composition</h2>

          {/* Visual bar */}
          <div className="mb-8">
            <div className="flex h-12 overflow-hidden border border-neutral-200">
              <div className="flex items-center justify-center text-xs font-mono" style={{ width: '25%', backgroundColor: TYPE_COLORS.Erg + '30', color: TYPE_COLORS.Erg }}>
                Erg · 25%
              </div>
              <div className="flex items-center justify-center text-xs font-mono" style={{ width: '50%', backgroundColor: TYPE_COLORS.Reg + '20', color: TYPE_COLORS.Reg }}>
                Reg · ~50%
              </div>
              <div className="flex items-center justify-center text-xs font-mono" style={{ width: '20%', backgroundColor: TYPE_COLORS.Hammada + '20', color: '#999' }}>
                Hammada
              </div>
              <div className="flex items-center justify-center text-xs font-mono" style={{ width: '5%', backgroundColor: TYPE_COLORS.Oued + '20', color: TYPE_COLORS.Oued }}>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-neutral-600 tracking-wider">
              <span>Sand dunes</span>
              <span>Gravel plains</span>
              <span>Bedrock plateaus</span>
              <span>Valleys + oases</span>
            </div>
          </div>

          <p className="text-sm text-neutral-500 leading-relaxed max-w-3xl">
            The bar above is approximate — exact proportions vary by source and measurement method. But the message is consistent across all sources: sand is the minority.
            The Sahara is mainly rock. The desert you cross on every road trip — the flat, grey, featureless kilometres between the mountains and the dunes — that is the real Sahara.
            The erg is the exception. The hammada and reg are the rule.
          </p>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section data-sid="timeline" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Chronology</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>From Green to Gold</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-8 leading-relaxed">The desert is young. The landscape is ancient.</p>

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
                <div className="w-32 flex-shrink-0 text-right">
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
            Module 082 · Not All Desert Is Sand · © Dancing with Lions
          </p>
          <p className="text-[11px] text-white/35 mt-2">
            Data: Britannica, National Geographic, IFLScience, Wikipedia, Lonely Planet
          </p>
        </div>
      
        <div style={{ backgroundColor: '#161616' }} className="mt-12 -mx-6 -mb-16 py-3">
          <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>dancingwithlions.com</p>
        </div>
      </footer>
    </main>
  )
}
