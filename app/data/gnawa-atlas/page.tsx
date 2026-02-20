'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { INSTRUMENTS, SEVEN_COLOURS, MAALEMS, LILA_PHASES, HISTORY, HERO_STATS, KEY_NUMBERS, REGIONAL_STYLES, KEY_VOCABULARY, BIBLIOGRAPHY } from './data'

const ACCENT = '#8B2FC9' // deep spiritual purple
const THREAD_COLORS: Record<string, string> = {
  origin: '#8B7355',
  formation: '#8B2FC9',
  modern: '#3B82F6',
  global: '#22C55E',
  festival: '#E8A94E',
  recognition: '#EF4444',
}

export default function GnawaAtlasPage() {
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeInstrument, setActiveInstrument] = useState(0)
  const [activeColour, setActiveColour] = useState(0)
  const [activeMaalem, setActiveMaalem] = useState(0)
  const [activePhase, setActivePhase] = useState(0)
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [expandedVocab, setExpandedVocab] = useState<number | null>(null)
  const [showAllMaalems, setShowAllMaalems] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const s = (id: string) => vis.has(id)
  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  const visibleMaalems = showAllMaalems ? MAALEMS : MAALEMS.slice(0, 4)

  return (
    <main className="min-h-screen bg-white text-[#1C1917]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Seven colour band */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          {SEVEN_COLOURS.map((c, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: c.hex === '#F5F5F5' ? '#cccccc' : c.hex === '#1a1a1a' ? '#333' : c.hex }} />
          ))}
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6">
            <Link href="/data" className="text-xs tracking-[0.3em] text-neutral-500 uppercase hover:text-neutral-600 transition-colors">← Data Index</Link>
          </div>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Module 083 · Musical &amp; Spiritual Intelligence</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            The Gnawa Atlas
          </h1>
          <p className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Descendants of West African slaves. Five hundred years of spiritual music.
            The guembri, the qraqeb, the seven colours, the all-night lila. Trance as therapy. Possession as negotiation. UNESCO, 2019.
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

      {/* ── INSTRUMENTS ── */}
      <section data-sid="instruments" className="py-24 px-6">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('instruments') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Instruments</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Three Voices</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-10 leading-relaxed">
            Guembri, qraqeb, tbel. Wood, skin, gut, iron. Everything from the animal and the earth.
          </p>

          <div className="flex gap-2 mb-8">
            {INSTRUMENTS.map((inst, i) => (
              <button key={i} onClick={() => setActiveInstrument(i)}
                className={`flex-1 text-left p-4 border transition-all duration-300 ${activeInstrument === i ? 'border-[#8B2FC9]/60 bg-[#8B2FC9]/5' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="text-sm font-medium">{inst.name}</div>
                <div className="text-[10px] text-neutral-600 mt-1">{inst.aliases.join(' / ')}</div>
              </button>
            ))}
          </div>

          <div className="border border-neutral-200 p-6 md:p-8">
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-2xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{INSTRUMENTS[activeInstrument].name}</h3>
              <span className="text-sm text-neutral-600" dir="rtl">{INSTRUMENTS[activeInstrument].arabic}</span>
            </div>
            <div className="text-xs text-neutral-500 italic mb-4">{INSTRUMENTS[activeInstrument].aliases.join(' · ')}</div>

            <div className="space-y-4 text-sm text-neutral-500 leading-relaxed">
              <p>{INSTRUMENTS[activeInstrument].description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-neutral-200">
                <div><span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Materials</span>{INSTRUMENTS[activeInstrument].materials}</div>
                <div><span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Construction</span>{INSTRUMENTS[activeInstrument].construction}</div>
                <div><span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Playing Technique</span>{INSTRUMENTS[activeInstrument].playing}</div>
                <div><span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Ritual Role</span>{INSTRUMENTS[activeInstrument].role}</div>
              </div>
              <div className="pt-3 border-t border-neutral-200">
                <span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">African Ancestor</span>
                <p className="text-neutral-600">{INSTRUMENTS[activeInstrument].ancestor}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE SEVEN COLOURS ── */}
      <section data-sid="colours" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('colours') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Seven Mluk</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Seven Colours, Seven Realms</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-10 leading-relaxed">
            The lila moves through seven spirit families — each identified by a colour, an incense, a rhythm, and a character.
            A prismatic decomposition of the original light.
          </p>

          {/* Colour selector — actual colours */}
          <div className="flex gap-1 mb-8">
            {SEVEN_COLOURS.map((c, i) => (
              <button key={i} onClick={() => setActiveColour(i)}
                className={`flex-1 h-14 relative transition-all duration-300 border ${activeColour === i ? 'border-neutral-400 scale-105 z-10' : 'border-transparent hover:border-neutral-300'}`}
                style={{ backgroundColor: c.hex === '#F5F5F5' ? '#e8e8e8' : c.hex === '#1a1a1a' ? '#222' : c.hex }}>
                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] tracking-wider ${c.hex === '#F5F5F5' || c.hex === '#87CEEB' || c.hex === '#F9A825' ? 'text-neutral-800' : 'text-white/80'}`}>
                  {c.colour}
                </span>
              </button>
            ))}
          </div>

          <div className="border border-neutral-200 p-6 md:p-8" style={{ borderLeftColor: SEVEN_COLOURS[activeColour].hex === '#F5F5F5' ? '#ccc' : SEVEN_COLOURS[activeColour].hex, borderLeftWidth: '3px' }}>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{SEVEN_COLOURS[activeColour].name}</h3>
              <span className="text-xs text-neutral-600" dir="rtl">{SEVEN_COLOURS[activeColour].arabic}</span>
            </div>
            <div className="text-xs text-neutral-500 mb-4">{SEVEN_COLOURS[activeColour].spirits}</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-500 leading-relaxed">
              <div><span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Character</span>{SEVEN_COLOURS[activeColour].character}</div>
              <div><span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Incense</span>{SEVEN_COLOURS[activeColour].incense}</div>
              <div className="md:col-span-2"><span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Domain</span>{SEVEN_COLOURS[activeColour].domain}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE LILA ── */}
      <section data-sid="lila" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('lila') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Ceremony</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Anatomy of a Lila</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-10 leading-relaxed">
            Dusk to dawn. Sacrifice, processional, the seven-colour journey, renaissance.
            Not a concert — a negotiation with the spirit world.
          </p>

          <div className="flex gap-2 mb-8">
            {LILA_PHASES.map((p, i) => (
              <button key={i} onClick={() => setActivePhase(i)}
                className={`flex-1 text-left p-3 border transition-all duration-300 ${activePhase === i ? 'border-[#8B2FC9]/60 bg-[#8B2FC9]/5' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-[10px] text-neutral-600 mt-1">{p.duration}</div>
              </button>
            ))}
          </div>

          <div className="border border-neutral-200 p-6 md:p-8">
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{LILA_PHASES[activePhase].name}</h3>
              {LILA_PHASES[activePhase].arabic && <span className="text-sm text-neutral-600" dir="rtl">{LILA_PHASES[activePhase].arabic}</span>}
            </div>
            <div className="text-xs text-neutral-500 mb-4">{LILA_PHASES[activePhase].duration}</div>
            <p className="text-sm text-neutral-500 leading-relaxed mb-3">{LILA_PHASES[activePhase].description}</p>
            <p className="text-xs text-neutral-500 italic">{LILA_PHASES[activePhase].music}</p>
          </div>
        </div>
      </section>

      {/* ── THE MAALEMS ── */}
      <section data-sid="maalems" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('maalems') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Masters</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Maalem Lineages</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-10 leading-relaxed">
            Eight masters. Essaouira, Marrakech, Tangier, Casablanca, New York.
            The title is earned after decades. The guembri is inherited.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {visibleMaalems.map((m, i) => (
              <button key={i} onClick={() => setActiveMaalem(i)}
                className={`text-left p-3 border transition-all duration-300 ${activeMaalem === i ? 'border-[#8B2FC9]/60 bg-[#8B2FC9]/5' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="text-xs font-medium leading-tight">{m.name}</div>
                <div className="text-[10px] text-neutral-600 mt-1">{m.city}</div>
              </button>
            ))}
          </div>

          {!showAllMaalems && MAALEMS.length > 4 && (
            <button onClick={() => setShowAllMaalems(true)}
              className="mb-8 text-xs tracking-[0.15em] uppercase hover:text-neutral-600 transition-colors" style={{ color: ACCENT }}>
              Show all {MAALEMS.length} masters →
            </button>
          )}

          {activeMaalem < visibleMaalems.length && (
            <div className="border border-neutral-200 p-6 md:p-8">
              <h3 className="text-xl font-light mb-0.5" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{MAALEMS[activeMaalem].name}</h3>
              <div className="text-xs text-neutral-500 mb-4">{MAALEMS[activeMaalem].years} · {MAALEMS[activeMaalem].city}</div>
              <div className="space-y-3 text-sm text-neutral-500 leading-relaxed">
                <div><span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Lineage</span>{MAALEMS[activeMaalem].lineage}</div>
                <div><span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Significance</span><span className="text-neutral-600">{MAALEMS[activeMaalem].significance}</span></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-neutral-200">
                  <div><span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Collaborations</span>{MAALEMS[activeMaalem].collaborations}</div>
                  <div><span className="text-neutral-500 text-xs uppercase tracking-wider block mb-1">Style</span>{MAALEMS[activeMaalem].style}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── REGIONAL STYLES ── */}
      <section data-sid="styles" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('styles') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Geography of Sound</p>
          <h2 className="text-3xl md:text-4xl font-light mb-10" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Five Regional Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGIONAL_STYLES.map((r, i) => (
              <div key={i} className="border border-neutral-200 p-5 hover:border-neutral-300 transition-colors">
                <div className="text-sm font-medium mb-0.5">{r.name}</div>
                <div className="text-xs mb-3" style={{ color: ACCENT }}>{r.city}</div>
                <p className="text-xs text-neutral-500 leading-relaxed">{r.character}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOCABULARY ── */}
      <section data-sid="vocab" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('vocab') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Language</p>
          <h2 className="text-3xl md:text-4xl font-light mb-10" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Gnawa Vocabulary</h2>
          <div className="space-y-2">
            {KEY_VOCABULARY.map((v, i) => (
              <button key={i} onClick={() => setExpandedVocab(expandedVocab === i ? null : i)}
                className={`w-full text-left border transition-all duration-300 ${expandedVocab === i ? 'border-neutral-300 bg-white/[0.01]' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{v.term}</span>
                    <span className="text-xs text-neutral-600" dir="rtl">{v.arabic}</span>
                  </div>
                  <span className="text-neutral-600 text-xs">{expandedVocab === i ? '−' : '+'}</span>
                </div>
                {expandedVocab === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-neutral-500 leading-relaxed">{v.definition}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section data-sid="timeline" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Chronology</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>From Slavery to UNESCO</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-8 leading-relaxed">
            Twelve centuries of survival, adaptation, and global recognition.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setActiveThread(null)}
              className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors ${!activeThread ? 'border-neutral-500 text-neutral-700' : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'}`}>
              All
            </button>
            {Object.entries(THREAD_COLORS).map(([t, c]) => (
              <button key={t} onClick={() => setActiveThread(activeThread === t ? null : t)}
                className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors ${activeThread === t ? 'text-neutral-700' : 'text-neutral-500 hover:border-neutral-300'}`}
                style={{ borderColor: activeThread === t ? c : undefined }}>
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredHistory.map((h, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-24 md:w-32 flex-shrink-0 text-right">
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
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${s('numbers') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${s('bib') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
            Module 083 · The Gnawa Atlas · © Dancing with Lions
          </p>
          <p className="text-[11px] text-white/35 mt-2">
            Data: UNESCO ICH, Deborah Kapchan, IEMed, Afropop Worldwide, Penn Museum, Wikipedia
          </p>
        </div>
      
        <div style={{ backgroundColor: '#161616' }} className="mt-12 -mx-6 -mb-16 py-3">
          <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>dancingwithlions.com</p>
        </div>
      </footer>
    </main>
  )
}
