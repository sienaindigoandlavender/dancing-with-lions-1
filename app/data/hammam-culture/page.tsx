'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ROOMS, RITUAL, PRODUCTS, FIVE_ELEMENTS, HISTORY, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const ACCENT = '#D97706' // warm amber

export default function HammamCulturePage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // scroll observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // ritual auto-advance
  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(() => {
      setActiveStep(prev => (prev + 1) % RITUAL.length)
    }, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPaused])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        {/* Steam-drift SVG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 12 }, (_, i) => (
              <circle key={i} cx={100 + i * 100} cy={400 + Math.sin(i) * 120} r={60 + i * 8} fill="none" stroke={ACCENT} strokeWidth="0.5" opacity={0.3 + (i % 3) * 0.15}>
                <animate attributeName="cy" values={`${400 + Math.sin(i) * 120};${320 + Math.sin(i) * 80};${400 + Math.sin(i) * 120}`} dur={`${8 + i * 0.7}s`} repeatCount="indefinite" />
                <animate attributeName="r" values={`${60 + i * 8};${80 + i * 8};${60 + i * 8}`} dur={`${10 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 074 — Cultural Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Hammam<br />Culture
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[520px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Three rooms of ascending heat. Six ritual steps. One of five elements that
            define every neighbourhood in the medina. The hammam is not a spa.
            It is social infrastructure.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map(s => (
              <div key={s.label}>
                <span className="font-serif italic block tabular-nums" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE ROOMS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — The Architecture</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Four Rooms</h2>
          <p className="text-[14px] text-dwl-body max-w-[520px] leading-relaxed mb-10">
            From the changing room to the furnace. Each chamber exists at a different
            temperature. You move inward. The heat rises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: '#e5e5e5' }}>
            {ROOMS.map((r, i) => {
              const isVisible = visibleSections.has(`room-${i}`)
              const intensity = i / (ROOMS.length - 1)
              return (
                <div key={r.name} data-sid={`room-${i}`} className="p-6 transition-all duration-700" style={{
                  background: `rgb(${255 - intensity * 30}, ${255 - intensity * 45}, ${255 - intensity * 50})`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                }}>
                  <p className="text-[10px] uppercase tracking-[0.08em] mb-3" style={{ color: ACCENT }}>{r.phase}</p>
                  <h3 className="text-[16px] font-medium text-dwl-black">{r.name}</h3>
                  <p className="text-[12px] mt-0.5 font-mono" style={{ color: '#999' }}>{r.arabic} — {r.temp}</p>
                  <p className="text-[12px] text-dwl-body mt-3 leading-relaxed">{r.detail}</p>
                </div>
              )
            })}
          </div>

          <p className="text-[11px] mt-4" style={{ color: '#bbb' }}>
            No pools. No showerheads. Islam considers still water unclean.
            Running water drawn from taps into buckets. Rinsed, never submerged.
          </p>
        </div>
      </section>

      {/* ═══ THE RITUAL — auto-advancing cycle ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>002 — The Ritual</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Six Steps</h2>
          <p className="text-[13px] max-w-[500px] leading-relaxed mb-10" style={{ color: 'rgba(0,0,0,0.4)' }}>
            The order has not changed. Click any step to hold.
          </p>

          {/* Step indicators */}
          <div className="flex gap-2 mb-8">
            {RITUAL.map((s, i) => (
              <button
                key={i}
                onClick={() => { setActiveStep(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 8000) }}
                className="relative flex-1 h-1 rounded-full overflow-hidden transition-all"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                {i === activeStep && (
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{
                    background: ACCENT,
                    animation: isPaused ? 'none' : `progress-bar ${5}s linear forwards`,
                    width: isPaused ? '100%' : undefined,
                  }} />
                )}
                {i < activeStep && (
                  <div className="absolute inset-0 rounded-full" style={{ background: ACCENT, opacity: 0.4 }} />
                )}
              </button>
            ))}
          </div>

          {/* Active step */}
          <div className="min-h-[180px]">
            <p className="text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: ACCENT }}>
              Step {activeStep + 1} of {RITUAL.length} — {RITUAL[activeStep].duration}
            </p>
            <h3 className="font-serif italic text-[28px] md:text-[36px] mb-3" style={{ color: '#ffffff' }}>
              {RITUAL[activeStep].name}
            </h3>
            <p className="text-[13px] max-w-[600px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.5)' }}>
              {RITUAL[activeStep].detail}
            </p>
          </div>

          {/* Step names row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {RITUAL.map((s, i) => (
              <button
                key={i}
                onClick={() => { setActiveStep(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 8000) }}
                className="text-[11px] uppercase tracking-[0.06em] transition-all"
                style={{ color: i === activeStep ? ACCENT : 'rgba(255,255,255,0.25)' }}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[32vh]" style={{ background: ACCENT }}>
        <div className="max-w-[640px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)', color: '#ffffff' }}>
            Even the act of performing the scrub for one another
            is considered an expression of habibi.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.55)' }}>Love.</p>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — The Products</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Six Ingredients</h2>
          <p className="text-[14px] text-dwl-body max-w-[480px] leading-relaxed mb-10">
            Every product comes from somewhere. Olive groves. Atlas mines.
            Argan forests. Rose valleys. Each one earned its place in the ritual.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#e5e5e5' }}>
            {PRODUCTS.map((p, i) => {
              const isVisible = visibleSections.has(`prod-${i}`)
              return (
                <div key={p.name} data-sid={`prod-${i}`} className="p-6 md:p-8 bg-white transition-all duration-700" style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <p className="text-[10px] uppercase tracking-[0.08em] mb-2" style={{ color: ACCENT }}>{p.origin}</p>
                  <h3 className="text-[15px] font-medium text-dwl-black">{p.name}</h3>
                  <p className="text-[12px] font-mono mt-0.5" style={{ color: '#bbb' }}>{p.arabic}</p>
                  <p className="text-[12px] text-dwl-body mt-3 leading-relaxed">{p.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ FIVE ELEMENTS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>004 — The Neighbourhood</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Five Elements</h2>
          <p className="text-[13px] max-w-[520px] leading-relaxed mb-10" style={{ color: 'rgba(0,0,0,0.4)' }}>
            Every neighbourhood in the medina contains these five structures.
            The hammam does not stand alone. It is part of a system.
          </p>

          <div className="space-y-0">
            {FIVE_ELEMENTS.map((el, i) => {
              const isVisible = visibleSections.has(`elem-${i}`)
              return (
                <div key={el.name} data-sid={`elem-${i}`} className="flex gap-6 md:gap-10 py-5 transition-all duration-700" style={{
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <div className="flex items-center gap-3 min-w-[160px]">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                    <span className="text-[14px] font-medium" style={{ color: '#ffffff' }}>{el.name}</span>
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{el.role}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 p-6 rounded-sm" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <span className="font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>The farnatchi</span> — the man who tends the furnace beneath the hammam — also cooks the neighbourhood&rsquo;s tangia. Women drop off the clay urn on their way in. Mutton, preserved lemon, saffron, cumin. The stew slow-cooks in the hammam&rsquo;s coals for hours. When she leaves, clean and renewed, dinner is ready.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ HISTORY ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — The History</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-10">From Rome to Now</h2>

          <div className="space-y-0">
            {HISTORY.map((h, i) => {
              const isVisible = visibleSections.has(`hist-${i}`)
              return (
                <div key={i} data-sid={`hist-${i}`} className="py-5 transition-all duration-700" style={{
                  borderTop: '1px solid #e5e5e5',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-3 md:gap-8">
                    <span className="font-serif italic text-[18px] text-dwl-black">{h.year}</span>
                    <div>
                      <p className="text-[14px] font-medium text-dwl-black mb-1">{h.event}</p>
                      <p className="text-[12px] text-dwl-body leading-relaxed">{h.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>006 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {KEY_NUMBERS.map(n => (
              <div key={n.unit} className="p-6 md:p-8" style={{ background: '#0a0a0a' }}>
                <p className="font-serif italic text-[32px] md:text-[44px] leading-none" style={{ color: ACCENT }}>{n.value}</p>
                <p className="text-[12px] mt-2 font-medium" style={{ color: 'rgba(0,0,0,0.6)' }}>{n.unit}</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">007 — Bibliography</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-4">Further Reading</h2>
          <p className="text-[14px] text-dwl-body max-w-[480px] leading-relaxed mb-10">
            Six works. Architectural, theological, ethnographic.
          </p>
          <div className="space-y-0">
            {BIBLIOGRAPHY.map((b, i) => {
              const isVisible = visibleSections.has(`bib-${i}`)
              return (
                <div key={i} data-sid={`bib-${i}`} className="py-5 transition-all duration-700" style={{
                  borderTop: '1px solid #e5e5e5',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(4px)',
                }}>
                  <p className="text-[14px] text-dwl-black">
                    <span className="font-medium">{b.author}</span>
                    <span className="font-serif italic ml-2">{b.title}</span>
                    <span className="text-[12px] ml-2" style={{ color: '#999' }}>({b.year})</span>
                  </p>
                  <p className="text-[12px] text-dwl-body mt-1">{b.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>Sources</p>
          <div className="space-y-1">
            {[
              'Wikipedia — Hammam: Roman origins, Umayyad period (661–750), Volubilis Idrisid-era hammam (8th C), Al-Ghazali "Mysteries of Purity," ghusl/wudu requirements, hypocaust heating, Valerie Staats on women\'s hammams, Magda Sibley on mosque-hammam proximity',
              'The Culture Trip: Mouassine hammam 1572 (oldest in Marrakech), five neighbourhood elements (mosque, hammam, fountain, madrasa, bakery), farnatchi fire-keeper, tangia cooked in hammam coals, Volubilis 8th C ruins, Thursday/Friday busiest days, 10 dirhams entry',
              'Metropolitan Museum of Art (Elizabeth Williams): Hilal al-Sabi\' Baghdad 60,000 bathhouses, medieval hammam as civic pride, regional architectural variation, Orientalist painters',
              'Morocco World News: Roman influence on Moroccan hammam, three/four room layout, no pools (Islamic preference for running water), located near mosques, Mouassine hammam Sultan Abdellah al-Ghalib 1572 Saadian era',
              'Saveur: Tangia cooked beneath the hammam by mul farnatchi, mutton/beef + preserved lemon + saffron + cumin in clay urn, parchment lid, men\'s dish, underground furnace behind unmarked entrance',
              'Sarah Tours: Al-Jawwani furnace room, hypocaust underfloor heating, sloped floors for drainage, domed ceilings with steam vents, marble heat-retention floors, farnatchi also cooks tangia and koreenes (cow feet)',
              'BeautyMatter: Roman/Byzantine/Central Asian origins, Ottoman architects 14th–20th C, geometric tile work, domed ceilings with glass oculi, functional arched doorways',
              'EurekAlert (Prof. Idriz research): Ghusl after sexual intercourse/menstruation/childbirth, Quran emphasis on water as source of life, wudu institutionalised hammam as communal space, Ottoman hammams as essential as schools',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Dancing with Lions. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: ACCENT }}>Sources: Ethnographic research</p>
          </div>
          <div className="mt-6">
            <Link href="/data" className="text-[11px] uppercase tracking-[0.08em] font-medium pb-1 hover:opacity-60 transition-opacity" style={{ color: 'rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
              ← All Data Modules
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes progress-bar {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  )
}
