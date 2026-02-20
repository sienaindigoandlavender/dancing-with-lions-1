'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { THREE_LANGUAGES, MINOR_LANGUAGES, THREE_CONFEDERATIONS, TIFINAGH_EVOLUTION, HISTORY, THREAD_META, CENSUS_DATA, HERO_STATS, KEY_NUMBERS, TIFINAGH_ALPHABET, BIBLIOGRAPHY } from './data'

const ACCENT = '#D97706' // amber — earth, desert, resistance
const LANG_COLORS = ['#22C55E', '#3B82F6', '#EF4444'] // Tashelhit green, Tamazight blue, Tarifit red
const CONFED_COLORS = ['#8B7355', '#3B82F6', '#D97706'] // Masmuda brown, Sanhaja blue, Zenata amber

export default function AmazighIdentityPage() {
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeLang, setActiveLang] = useState(0)
  const [activeConfed, setActiveConfed] = useState(0)
  const [activeScript, setActiveScript] = useState(0)
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [showMinor, setShowMinor] = useState(false)
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const s = (id: string) => vis.has(id)
  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  const lang = THREE_LANGUAGES[activeLang]
  const confed = THREE_CONFEDERATIONS[activeConfed]
  const script = TIFINAGH_EVOLUTION[activeScript]

  return (
    <main className="min-h-screen bg-white text-[#1C1917]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Three-language colour band */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="flex-1" style={{ backgroundColor: LANG_COLORS[0], opacity: 0.8 }} />
          <div className="flex-1" style={{ backgroundColor: LANG_COLORS[1], opacity: 0.8 }} />
          <div className="flex-1" style={{ backgroundColor: LANG_COLORS[2], opacity: 0.8 }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6">
            <Link href="/data" className="text-xs tracking-[0.3em] text-neutral-500 uppercase hover:text-neutral-600 transition-colors">← Data Index</Link>
          </div>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Module 011 · Cultural &amp; Linguistic Intelligence</p>

          {/* Giant Tifinagh Yaz */}
          <div className="text-8xl md:text-[10rem] leading-none mb-4 opacity-20" style={{ color: ACCENT }}>ⵣ</div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            Amazigh Identity Map
          </h1>
          <p className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            ⵉⵎⴰⵣⵉⵖⵏ — the free people. Three languages, three ancient confederations, one 3,000-year-old script.
            From 45% of Morocco at independence to 24.8% in 2024. The mathematics of erasure — and the persistence that defies it.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {HERO_STATS.map((st, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-light" style={{ color: ACCENT }}>{st.value}</p>
                <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE LANGUAGES ── */}
      <section data-sid="languages" className={`py-24 px-6 transition-all duration-1000 ${s('languages') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>01</p>
          <h2 className="text-3xl md:text-4xl font-light mb-3" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Three Languages</h2>
          <p className="text-sm text-neutral-500 mb-10 max-w-2xl">
            Not dialects. Three distinct languages forming a dialect continuum — Tashelhit and Tamazight are mutually intelligible, but neither can be understood by Tarifit speakers in the Rif.
          </p>

          {/* Language tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {THREE_LANGUAGES.map((l, i) => (
              <button key={i} onClick={() => setActiveLang(i)}
                className={`px-5 py-2.5 text-xs tracking-widest uppercase transition-all border ${activeLang === i ? 'text-white border-current' : 'text-neutral-500 border-neutral-200 hover:border-neutral-400'}`}
                style={activeLang === i ? { borderColor: LANG_COLORS[i], color: LANG_COLORS[i] } : {}}>
                {l.name}
                <span className="ml-2 opacity-60">{l.percentage2024}%</span>
              </button>
            ))}
          </div>

          {/* Language detail panel */}
          <div className="border border-neutral-200 p-8">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-light mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: LANG_COLORS[activeLang] }}>{lang.name}</h3>
                <p className="text-lg opacity-60 mb-1">{lang.tifinagh}</p>
                <p className="text-xs text-neutral-500">{lang.endonym}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-light" style={{ color: LANG_COLORS[activeLang] }}>{lang.speakers2024}</p>
                <p className="text-xs text-neutral-500">speakers (2024)</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Region</p>
                <p className="text-sm leading-relaxed">{lang.region}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Confederation Origin</p>
                <p className="text-sm leading-relaxed">{lang.confederationOrigin}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-neutral-600 mb-6">{lang.description}</p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Linguistic Features</p>
                <p className="text-sm leading-relaxed text-neutral-500">{lang.keyFeatures}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Urban/Rural Distribution</p>
                <p className="text-sm leading-relaxed text-neutral-500">{lang.urbanRural}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mb-4">
              {lang.majorCities.map((c, i) => (
                <span key={i} className="px-3 py-1 text-xs border border-neutral-200 text-neutral-500">{c}</span>
              ))}
            </div>
            {/* Census comparison mini bar */}
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <p className="text-xs text-neutral-500 mb-2">Census trajectory</p>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-neutral-500">1960: ~{lang.percentage1960}%</span>
                <span className="text-neutral-500">→ 2004: {lang.percentage2004}%</span>
                <span style={{ color: LANG_COLORS[activeLang] }}>→ 2024: {lang.percentage2024}%</span>
                <span className="text-neutral-600 ml-2">Status: {lang.status}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MINOR LANGUAGES ── */}
      <section data-sid="minor" className={`py-16 px-6 transition-all duration-1000 ${s('minor') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-5xl mx-auto">
          <button onClick={() => setShowMinor(!showMinor)} className="text-xs tracking-[0.3em] uppercase hover:opacity-80 transition-opacity flex items-center gap-2" style={{ color: ACCENT }}>
            {showMinor ? '▾' : '▸'} Five Languages on the Edge
          </button>
          {showMinor && (
            <div className="mt-6 space-y-4">
              {MINOR_LANGUAGES.map((ml, i) => (
                <div key={i} className="border border-neutral-200 p-6">
                  <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                    <h4 className="text-sm font-medium">{ml.name}</h4>
                    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-widest border ${ml.status.includes('Critically') ? 'border-red-800 text-red-400' : ml.status.includes('Nearly') ? 'border-red-900 text-red-500' : 'border-yellow-800 text-yellow-500'}`}>
                      {ml.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mb-2">{ml.region} · {ml.estimatedSpeakers} speakers</p>
                  <p className="text-sm text-neutral-500 leading-relaxed">{ml.note}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CENSUS DECLINE ── */}
      <section data-sid="census" className={`py-24 px-6 transition-all duration-1000 ${s('census') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>02</p>
          <h2 className="text-3xl md:text-4xl font-light mb-3" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>The Decline</h2>
          <p className="text-sm text-neutral-500 mb-10 max-w-2xl">
            From 45% at independence to 24.8% in 2024. The Amazigh Movement calls it "cultural and linguistic genocide."
            The government calls it a census.
          </p>

          {/* Bar chart */}
          <div className="space-y-6 mb-8">
            {CENSUS_DATA.map((cd, i) => (
              <div key={i} className="group">
                <div className="flex items-center gap-4 mb-1">
                  <span className="text-xs text-neutral-500 w-14 text-right">{cd.label}</span>
                  <div className="flex-1 relative h-8 bg-neutral-50 overflow-hidden">
                    <div className="absolute inset-y-0 left-0 flex transition-all duration-1000" style={{ width: `${cd.total * 2}%` }}>
                      {cd.tashelhit ? (
                        <>
                          <div style={{ width: `${(cd.tashelhit / cd.total) * 100}%`, backgroundColor: LANG_COLORS[0] }} className="opacity-80" />
                          <div style={{ width: `${((cd.tamazight || 0) / cd.total) * 100}%`, backgroundColor: LANG_COLORS[1] }} className="opacity-80" />
                          <div style={{ width: `${((cd.tarifit || 0) / cd.total) * 100}%`, backgroundColor: LANG_COLORS[2] }} className="opacity-80" />
                        </>
                      ) : (
                        <div className="w-full" style={{ backgroundColor: ACCENT, opacity: 0.6 }} />
                      )}
                    </div>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neutral-500">{cd.total}%</span>
                  </div>
                </div>
                <p className="text-[10px] text-neutral-600 ml-[4.5rem]">{cd.note}</p>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-6 text-xs text-neutral-500 ml-[4.5rem]">
            <span className="flex items-center gap-1"><span className="w-3 h-3 inline-block" style={{ backgroundColor: LANG_COLORS[0], opacity: 0.8 }} /> Tashelhit</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 inline-block" style={{ backgroundColor: LANG_COLORS[1], opacity: 0.8 }} /> Tamazight</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 inline-block" style={{ backgroundColor: LANG_COLORS[2], opacity: 0.8 }} /> Tarifit</span>
          </div>
        </div>
      </section>

      {/* ── THREE CONFEDERATIONS ── */}
      <section data-sid="confed" className={`py-24 px-6 transition-all duration-1000 ${s('confed') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>03</p>
          <h2 className="text-3xl md:text-4xl font-light mb-3" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Three Confederations</h2>
          <p className="text-sm text-neutral-500 mb-10 max-w-2xl">
            Ibn Khaldun divided the Berbers into Masmuda, Sanhaja, and Zenata. Mountains, deserts, plains. Farmers, nomads, horsemen.
            Between them, they built every dynasty Morocco has known.
          </p>

          {/* Confederation tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {THREE_CONFEDERATIONS.map((c, i) => (
              <button key={i} onClick={() => setActiveConfed(i)}
                className={`px-5 py-2.5 text-xs tracking-widest uppercase transition-all border ${activeConfed === i ? 'text-white border-current' : 'text-neutral-500 border-neutral-200 hover:border-neutral-400'}`}
                style={activeConfed === i ? { borderColor: CONFED_COLORS[i], color: CONFED_COLORS[i] } : {}}>
                {c.name}
                <span className="ml-2 opacity-40">{c.arabic}</span>
              </button>
            ))}
          </div>

          {/* Confederation detail */}
          <div className="border border-neutral-200 p-8">
            <h3 className="text-2xl font-light mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: CONFED_COLORS[activeConfed] }}>{confed.name}</h3>
            <p className="text-lg opacity-40 mb-4">{confed.arabic}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Territory</p>
                <p className="text-sm leading-relaxed">{confed.territory}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Today&apos;s Descendants</p>
                <p className="text-sm leading-relaxed text-neutral-500">{confed.descendants}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-neutral-600 mb-6">{confed.character}</p>

            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Dynasties Built</p>
              {confed.dynastiesBuilt.map((d, i) => (
                <p key={i} className="text-sm text-neutral-500 mb-1">• {d}</p>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              {confed.keyTribes.map((t, i) => (
                <span key={i} className="px-3 py-1 text-xs border border-neutral-200 text-neutral-500">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TIFINAGH EVOLUTION ── */}
      <section data-sid="tifinagh" className={`py-24 px-6 transition-all duration-1000 ${s('tifinagh') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>04</p>
          <h2 className="text-3xl md:text-4xl font-light mb-3" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>3,000 Years of Script</h2>
          <p className="text-sm text-neutral-500 mb-10 max-w-2xl">
            From rock carvings in the High Atlas to road signs on the autoroute.
            The alphabet that survived Rome, Islam, colonialism, and Arabization — by retreating into the Sahara.
          </p>

          {/* Script phase tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {TIFINAGH_EVOLUTION.map((t, i) => (
              <button key={i} onClick={() => setActiveScript(i)}
                className={`px-4 py-2 text-xs tracking-widest transition-all border ${activeScript === i ? 'text-white border-amber-600' : 'text-neutral-500 border-neutral-200 hover:border-neutral-400'}`}
                style={activeScript === i ? { borderColor: ACCENT, color: ACCENT } : {}}>
                {t.name.split('(')[0].trim()}
              </button>
            ))}
          </div>

          <div className="border border-neutral-200 p-8">
            <h3 className="text-xl font-light mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{script.name}</h3>
            <p className="text-sm mb-4" style={{ color: ACCENT }}>{script.period}</p>
            <p className="text-sm leading-relaxed text-neutral-600 mb-6">{script.description}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Geography</p>
                <p className="text-sm text-neutral-500">{script.geography}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Key Fact</p>
                <p className="text-sm text-neutral-500 italic">{script.keyFact}</p>
              </div>
            </div>
          </div>

          {/* Neo-Tifinagh alphabet display */}
          <div className="mt-10">
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">Neo-Tifinagh Alphabet (IRCAM Standard)</p>
            <div className="grid grid-cols-9 md:grid-cols-14 gap-1">
              {TIFINAGH_ALPHABET.map((ch, i) => (
                <button key={i}
                  onMouseEnter={() => setHoveredLetter(i)}
                  onMouseLeave={() => setHoveredLetter(null)}
                  className="aspect-square flex items-center justify-center text-2xl md:text-3xl border border-neutral-200 hover:border-neutral-400 transition-all relative"
                  style={hoveredLetter === i ? { borderColor: ACCENT, color: ACCENT } : { color: '#888' }}>
                  {ch.letter}
                  {hoveredLetter === i && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#fafafa] border border-neutral-300 px-2 py-1 text-[10px] text-neutral-600 whitespace-nowrap z-10">
                      {ch.name} /{ch.latin}/{ch.note ? ` — ${ch.note}` : ''}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section data-sid="timeline" className={`py-24 px-6 transition-all duration-1000 ${s('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>05</p>
          <h2 className="text-3xl md:text-4xl font-light mb-3" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Timeline</h2>
          <p className="text-sm text-neutral-500 mb-8 max-w-2xl">
            From the first rock inscription to the 2024 census. Script, decline, resistance, recognition.
          </p>

          {/* Thread filters */}
          <div className="flex gap-2 mb-8 flex-wrap">
            <button onClick={() => setActiveThread(null)}
              className={`px-3 py-1.5 text-xs tracking-widest uppercase border transition-all ${!activeThread ? 'text-white border-white' : 'text-neutral-500 border-neutral-200 hover:border-neutral-400'}`}>
              All
            </button>
            {Object.entries(THREAD_META).map(([key, meta]) => (
              <button key={key} onClick={() => setActiveThread(activeThread === key ? null : key)}
                className={`px-3 py-1.5 text-xs tracking-widest uppercase border transition-all ${activeThread === key ? 'text-white' : 'text-neutral-500 border-neutral-200 hover:border-neutral-400'}`}
                style={activeThread === key ? { borderColor: meta.color, color: meta.color } : {}}>
                {meta.label}
              </button>
            ))}
          </div>

          <div className="space-y-0">
            {filteredHistory.map((h, i) => {
              const meta = THREAD_META[h.thread]
              return (
                <div key={i} className="flex gap-6 py-4 border-b border-neutral-200 group">
                  <div className="w-20 shrink-0 text-right">
                    <p className="text-xs text-neutral-500">{h.year}</p>
                  </div>
                  <div className="w-1 shrink-0 relative">
                    <div className="absolute inset-0 w-px mx-auto" style={{ backgroundColor: meta.color, opacity: 0.4 }} />
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 border inline-block mb-2" style={{ borderColor: meta.color, color: meta.color, opacity: 0.7 }}>{meta.label}</span>
                    <p className="text-sm leading-relaxed text-neutral-600">{h.event}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── KEY NUMBERS ── */}
      <section data-sid="numbers" className={`py-24 px-6 transition-all duration-1000 ${s('numbers') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>06</p>
          <h2 className="text-3xl md:text-4xl font-light mb-10" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Key Numbers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KEY_NUMBERS.map((kn, i) => (
              <div key={i} className="border border-neutral-200 p-6">
                <p className="text-2xl font-light mb-2" style={{ color: ACCENT }}>{kn.value}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">{kn.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIBLIOGRAPHY ── */}
      <section data-sid="bib" className={`py-24 px-6 transition-all duration-1000 ${s('bib') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Sources</p>
          <h2 className="text-3xl md:text-4xl font-light mb-10" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Bibliography</h2>
          <div className="space-y-4">
            {BIBLIOGRAPHY.map(b => (
              <div key={b.id} className="flex gap-4 text-sm">
                <span className="text-neutral-600 w-6 shrink-0 text-right">{b.id}.</span>
                <div>
                  <span className="text-neutral-600">{b.source}.</span>
                  <span className="text-neutral-500 ml-1">{b.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-6">
        <p className="text-[11px] text-white/50 mb-2">Module 011 · Amazigh Identity Map</p>
        <p className="text-[11px] text-white/35">© Dancing with Lions · dancingwithlions.com</p>
      
        <div style={{ backgroundColor: '#161616' }} className="mt-12 -mx-6 -mb-16 py-3">
          <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>dancingwithlions.com</p>
        </div>
      </footer>
    </main>
  )
}
