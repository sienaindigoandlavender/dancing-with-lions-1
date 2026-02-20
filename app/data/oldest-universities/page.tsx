'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { INSTITUTIONS, SCHOLARS, THE_DEBATE, LIBRARY, HISTORY, COMPARISONS, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const ACCENT = '#B08D57' // aged gold / manuscript colour
const THREAD_COLORS: Record<string, string> = {
  founding: '#B08D57',
  growth: '#22C55E',
  scholars: '#A855F7',
  library: '#3B82F6',
  benyoussef: '#C2703E',
  modern: '#6B7280',
}

export default function OldestUniversitiesPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeInstitution, setActiveInstitution] = useState(0)
  const [expandedDebate, setExpandedDebate] = useState<number | null>(null)
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [showAllLibrary, setShowAllLibrary] = useState(false)
  const [activeScholar, setActiveScholar] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  const vis = (id: string) => visibleSections.has(id)
  const visibleLibrary = showAllLibrary ? LIBRARY : LIBRARY.slice(0, 5)

  return (
    <main className="min-h-screen bg-white text-[#1C1917]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%"><defs><pattern id="ms-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="40" height="40" fill="none" stroke="#B08D57" strokeWidth="0.3" /><circle cx="20" cy="20" r="1" fill="#B08D57" /></pattern></defs><rect width="100%" height="100%" fill="url(#ms-grid)" /></svg>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6">
            <Link href="/data" className="text-xs tracking-[0.3em] text-neutral-500 uppercase hover:text-neutral-600 transition-colors">← Data Index</Link>
          </div>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Module 081 · Educational &amp; Cultural Intelligence</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            The World&rsquo;s Oldest<br />Universities
          </h1>
          <p className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Al-Qarawiyyin. 859 CE. Founded by a woman from Kairouan.
            229 years before Bologna. 237 before Oxford. Morocco&rsquo;s claim to the oldest continuously operating university in the world.
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

      {/* ── INSTITUTIONS ── */}
      <section data-sid="institutions" className="py-24 px-6">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('institutions') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Institutions</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Morocco&rsquo;s Two Great Schools</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-10 leading-relaxed">One still teaches. One stands as monument. Both shaped the intellectual history of the Islamic world.</p>

          <div className="flex gap-2 mb-8">
            {INSTITUTIONS.map((inst, i) => (
              <button key={i} onClick={() => setActiveInstitution(i)}
                className={`flex-1 text-left p-4 border transition-all duration-300 ${activeInstitution === i ? 'border-[#B08D57]/60 bg-[#B08D57]/5' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="text-base md:text-lg font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{inst.name}</div>
                <div className="text-xs text-neutral-600 mt-0.5" dir="rtl">{inst.arabic}</div>
                <div className="text-[10px] text-neutral-500 mt-1">{inst.location} · {inst.founded.split('(')[0].trim()}</div>
              </button>
            ))}
          </div>

          <div className="border border-neutral-200 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-xl md:text-2xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{INSTITUTIONS[activeInstitution].name}</h3>
                </div>
                <div className="text-xs tracking-[0.15em] uppercase mb-5" style={{ color: ACCENT }}>{INSTITUTIONS[activeInstitution].location}</div>

                <div className="space-y-3 text-sm text-neutral-500 leading-relaxed">
                  <p><span className="text-neutral-500 text-xs uppercase tracking-wider">Founded</span><br />{INSTITUTIONS[activeInstitution].founded}</p>
                  <p><span className="text-neutral-500 text-xs uppercase tracking-wider">Founder</span><br />{INSTITUTIONS[activeInstitution].founder}</p>
                  <p><span className="text-neutral-500 text-xs uppercase tracking-wider">Status</span><br />{INSTITUTIONS[activeInstitution].status}</p>
                  <p className="text-neutral-600 pt-2 border-t border-neutral-200">{INSTITUTIONS[activeInstitution].detail}</p>
                </div>
              </div>
              <div className="lg:w-72 flex-shrink-0">
                <div className="border border-neutral-200 p-4 bg-[#B08D57]/[0.03]">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-2">Key Fact</div>
                  <p className="text-sm leading-relaxed" style={{ color: ACCENT }}>{INSTITUTIONS[activeInstitution].keyFact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHOLARS ── */}
      <section data-sid="scholars" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('scholars') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Alumni</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Scholars of Al-Qarawiyyin</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-10 leading-relaxed">A Jewish philosopher. A future Pope. The father of sociology. The mapmaker who guided Columbus. They all passed through Fez.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {SCHOLARS.map((s, i) => (
              <button key={i} onClick={() => setActiveScholar(i)}
                className={`text-left p-3 border transition-all duration-300 ${activeScholar === i ? 'border-[#B08D57]/60 bg-[#B08D57]/5' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="text-sm font-medium leading-snug">{s.name}</div>
                <div className="text-[10px] text-neutral-600 mt-1">{s.lifespan}</div>
              </button>
            ))}
          </div>

          <div className="border border-neutral-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-light mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{SCHOLARS[activeScholar].name}</h3>
                <div className="text-xs text-neutral-500 mb-1">{SCHOLARS[activeScholar].lifespan} · {SCHOLARS[activeScholar].field}</div>
                <div className="text-xs mb-4" style={{ color: ACCENT }}>{SCHOLARS[activeScholar].connection}</div>
                <p className="text-sm text-neutral-500 leading-relaxed">{SCHOLARS[activeScholar].contribution}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE LIBRARY ── */}
      <section data-sid="library" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('library') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Library</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Behind the Copper Door</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">
            Four locks. Four keys. Four officials. One of the oldest working libraries on earth.
          </p>

          <div className="space-y-3">
            {visibleLibrary.map((item, i) => (
              <div key={i} className="flex items-start gap-4 border border-neutral-200 p-4 hover:border-neutral-300 transition-colors">
                <div className="w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px]" style={{ borderColor: ACCENT, color: ACCENT }}>{i + 1}</div>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          {LIBRARY.length > 5 && (
            <button onClick={() => setShowAllLibrary(!showAllLibrary)}
              className="mt-4 text-xs tracking-[0.15em] uppercase hover:text-neutral-600 transition-colors" style={{ color: ACCENT }}>
              {showAllLibrary ? '← Show fewer' : `Show all ${LIBRARY.length} facts →`}
            </button>
          )}
        </div>
      </section>

      {/* ── THE DEBATE ── */}
      <section data-sid="debate" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('debate') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Debate</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Is It Really a University?</h2>
          <p className="text-sm text-neutral-500 max-w-3xl mb-12 leading-relaxed">
            The question depends on what you mean by &ldquo;university.&rdquo; If education — yes, since 859. If the European institutional model — that&rsquo;s Bologna, 1088. The debate itself reveals more about the politics of knowledge than about knowledge itself.
          </p>

          <div className="space-y-3">
            {THE_DEBATE.map((d, i) => (
              <div key={i} className="border border-neutral-200 overflow-hidden">
                <button onClick={() => setExpandedDebate(expandedDebate === i ? null : i)}
                  className="w-full text-left p-4 md:p-5 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                  <span className="text-base font-light pr-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{d.claim}</span>
                  <svg className={`w-4 h-4 text-neutral-600 transition-transform flex-shrink-0 ${expandedDebate === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {expandedDebate === i && (
                  <div className="px-4 md:px-5 pb-5 space-y-4">
                    <div className="border-l-2 pl-4" style={{ borderColor: '#22C55E' }}>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-1">Morocco&rsquo;s case</div>
                      <p className="text-sm text-neutral-500 leading-relaxed">{d.forMorocco}</p>
                    </div>
                    <div className="border-l-2 border-neutral-300 pl-4">
                      <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-1">Counter-argument</div>
                      <p className="text-sm text-neutral-500 leading-relaxed">{d.counterArgument}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section data-sid="compare" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('compare') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Global Context</p>
          <h2 className="text-3xl md:text-4xl font-light mb-10" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>The World&rsquo;s Oldest</h2>

          <div className="space-y-2">
            {COMPARISONS.map((c, i) => (
              <div key={i} className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border p-4 transition-colors ${i === 0 ? 'border-[#B08D57]/40 bg-[#B08D57]/[0.03]' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="md:w-16 flex-shrink-0">
                  <span className="text-lg font-light" style={{ color: i === 0 ? ACCENT : '#737373', fontFamily: "'Instrument Serif', Georgia, serif" }}>{c.founded.split(' ')[0]}</span>
                </div>
                <div className="flex-1">
                  <span className={`text-sm ${i === 0 ? 'text-neutral-700' : 'text-neutral-500'}`}>{c.institution}</span>
                  <span className="text-xs text-neutral-600 ml-2">{c.location}</span>
                </div>
                <div className="md:w-80 flex-shrink-0">
                  <span className="text-[10px] text-neutral-500 leading-relaxed">{c.claim}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section data-sid="timeline" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Chronology</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>1,166 Years</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-8 leading-relaxed">From Fatima&rsquo;s inheritance to Aziza&rsquo;s restoration.</p>

          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setActiveThread(null)}
              className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors ${!activeThread ? 'border-neutral-500 text-neutral-700' : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'}`}>
              All
            </button>
            {Object.entries(THREAD_COLORS).map(([thread, colour]) => (
              <button key={thread} onClick={() => setActiveThread(activeThread === thread ? null : thread)}
                className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors ${activeThread === thread ? 'text-neutral-700' : 'text-neutral-500 hover:border-neutral-300'}`}
                style={{ borderColor: activeThread === thread ? colour : undefined }}>
                {thread === 'benyoussef' ? 'ben youssef' : thread}
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
            Module 081 · The World&rsquo;s Oldest Universities · © Dancing with Lions
          </p>
          <p className="text-[11px] text-white/35 mt-2">
            Data: Guinness World Records, UNESCO, World History Encyclopedia, Ibn Abi Zar, Abdelhadi Tazi
          </p>
        </div>
      
        <div style={{ backgroundColor: '#161616' }} className="mt-12 -mx-6 -mb-16 py-3">
          <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>dancingwithlions.com</p>
        </div>
      </footer>
    </main>
  )
}
