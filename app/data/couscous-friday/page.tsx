'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { VARIATIONS, TECHNIQUE, FRIDAY_RITUAL, LIFE_EVENTS, MAGHREB_STYLES, VOCABULARY, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const ACCENT = '#D97706'

export default function CouscousFridayPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeVariation, setActiveVariation] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const vis = (id: string) => visibleSections.has(id)

  return (
    <main className="min-h-screen bg-white text-[#1C1917]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%"><defs><pattern id="grain-dot" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="0.8" fill="#D97706" /></pattern></defs><rect width="100%" height="100%" fill="url(#grain-dot)" /></svg>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6">
            <Link href="/data" className="text-xs tracking-[0.3em] text-neutral-500 uppercase hover:text-neutral-600 transition-colors">&#8592; Data Index</Link>
          </div>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Module 080 &#183; Culinary &amp; Social Intelligence</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            Couscous Friday
          </h1>
          <p className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            The sacred Friday meal. Seven regional variations, a three-steam technique, and the social contract
            around a shared dish. UNESCO Intangible Cultural Heritage since December 2020.
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

      {/* VARIATIONS */}
      <section data-sid="variations" className="py-24 px-6">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('variations') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Versions</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Seven Ways to Friday</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">Every region, every season, every family has its own couscous. The Amazigh foundation adapts to local identity while maintaining its communal core.</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {VARIATIONS.map((v, i) => (
              <button key={i} onClick={() => setActiveVariation(i)}
                className={`px-3 py-2 text-xs border transition-all duration-300 ${activeVariation === i ? 'border-[#D97706]/60 bg-[#D97706]/5 text-neutral-700' : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'}`}>
                {v.name}
              </button>
            ))}
          </div>

          <div className="border border-neutral-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-xl md:text-2xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{VARIATIONS[activeVariation].name}</h3>
                  <span className="text-sm text-neutral-600 font-arabic" dir="rtl">{VARIATIONS[activeVariation].arabic}</span>
                </div>
                <div className="text-xs tracking-[0.15em] uppercase text-neutral-500 mb-4">{VARIATIONS[activeVariation].region}</div>
                <p className="text-sm text-neutral-600 leading-relaxed">{VARIATIONS[activeVariation].detail}</p>
              </div>
              <div className="md:w-56 flex-shrink-0">
                <div className="border border-neutral-200 p-4 bg-[#D97706]/[0.03]">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-2">Key Ingredient</div>
                  <p className="text-sm leading-relaxed" style={{ color: ACCENT }}>{VARIATIONS[activeVariation].keyIngredient}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNIQUE */}
      <section data-sid="technique" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('technique') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Process</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Six Steps, Three Hours, One Dish</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">Proper couscous is never instant. The grain is steamed, broken, oiled, steamed again, broken again, buttered. Each grain separate, tender, light.</p>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
            {TECHNIQUE.map((t, i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                className={`p-3 text-center border transition-all duration-300 ${activeStep === i ? 'border-[#D97706]/60 bg-[#D97706]/5' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="text-lg font-light mb-1" style={{ color: activeStep === i ? ACCENT : '#737373', fontFamily: "'Instrument Serif', Georgia, serif" }}>{t.step}</div>
                <div className="text-[10px] text-neutral-500 leading-tight">{t.name}</div>
              </button>
            ))}
          </div>

          <div className="border border-neutral-200 p-6 md:p-8">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-2xl font-light" style={{ color: ACCENT, fontFamily: "'Instrument Serif', Georgia, serif" }}>{TECHNIQUE[activeStep].step}.</span>
              <h3 className="text-lg md:text-xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{TECHNIQUE[activeStep].name}</h3>
              <span className="text-sm text-neutral-600 font-arabic" dir="rtl">{TECHNIQUE[activeStep].arabic}</span>
            </div>
            <div className="flex items-center gap-2 mb-4 mt-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span className="text-xs text-neutral-500">{TECHNIQUE[activeStep].duration}</span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-3xl">{TECHNIQUE[activeStep].detail}</p>
          </div>
        </div>
      </section>

      {/* FRIDAY RITUAL */}
      <section data-sid="ritual" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('ritual') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Day</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Anatomy of a Friday</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">Yawm al-Jumu&#x27;ah. The holiest day of the week. Schools close. Streets empty for prayer. The country gathers around one dish.</p>

          <div className="relative">
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#D97706]/40 via-[#D97706]/20 to-[#D97706]/5" />
            <div className="space-y-6">
              {FRIDAY_RITUAL.map((r, i) => (
                <div key={i} className="relative pl-10 md:pl-14">
                  <div className="absolute left-[11px] md:left-[19px] top-[6px] w-2.5 h-2.5 rounded-full border-2 border-[#D97706] bg-white" />
                  <div className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: ACCENT }}>{r.moment}</div>
                  <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">{r.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIFE EVENTS */}
      <section data-sid="life" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('life') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Occasions</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>From Birth to Burial</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">Couscous marks every threshold of Moroccan life. It is never absent from the moments that matter.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {LIFE_EVENTS.map((e, i) => (
              <div key={i} className="border border-neutral-200 p-5 hover:border-neutral-300 transition-colors cursor-pointer"
                onClick={() => setExpandedEvent(expandedEvent === i ? null : i)}>
                <div className="text-sm font-medium mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{e.occasion}</div>
                <p className={`text-xs text-neutral-500 leading-relaxed transition-all ${expandedEvent === i ? '' : 'line-clamp-2'}`}>{e.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACROSS THE MAGHREB */}
      <section data-sid="maghreb" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('maghreb') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Region</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Five Countries, One Grain</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">
            The UNESCO inscription was a joint nomination &#8212; four countries setting aside the &#8220;couscous wars&#8221; to declare it shared heritage.
          </p>

          <div className="space-y-3">
            {MAGHREB_STYLES.map((s, i) => (
              <div key={i} className="border border-neutral-200 p-5 flex flex-col md:flex-row md:items-start gap-3">
                <div className="md:w-32 flex-shrink-0">
                  <span className="text-sm font-medium" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{s.country}</span>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed">{s.character}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOCABULARY */}
      <section data-sid="vocab" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('vocab') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Language</p>
          <h2 className="text-3xl md:text-4xl font-light mb-12" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Vocabulary of the Table</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {VOCABULARY.map((v, i) => (
              <div key={i} className="border border-neutral-200 p-4 hover:border-neutral-300 transition-colors">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-sm font-medium">{v.term}</span>
                  <span className="text-xs text-neutral-600 font-arabic" dir="rtl">{v.arabic}</span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">{v.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY NUMBERS */}
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

      {/* BIBLIOGRAPHY */}
      <section data-sid="bib" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${vis('bib') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Sources</p>
          <h2 className="text-2xl md:text-3xl font-light mb-8" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Bibliography</h2>
          <div className="space-y-4">
            {BIBLIOGRAPHY.map((b, i) => (
              <div key={i} className="border-l border-neutral-200 pl-4">
                <div className="text-sm text-neutral-600 mb-1">{b.source}</div>
                <div className="text-xs text-neutral-500 leading-relaxed">{b.detail}</div>
                {'url' in b && b.url && <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-[10px] hover:underline mt-1 inline-block" style={{ color: ACCENT }}>{b.url}</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[11px] text-white/50 tracking-[0.15em] uppercase">Module 080 &#183; Couscous Friday &#183; &#169; Dancing with Lions</p>
          <p className="text-[11px] text-white/35 mt-2">Data: UNESCO Decision 15.COM/8.b.14, Taste of Maroc, NPR, Morocco World News</p>
        </div>
      
        <div style={{ backgroundColor: '#161616' }} className="mt-12 -mx-6 -mb-16 py-3">
          <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>dancingwithlions.com</p>
        </div>
      </footer>
    </main>
  )
}
