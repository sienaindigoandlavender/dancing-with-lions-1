'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { INSTRUMENTS, SEVEN_COLOURS, MAALEMS, LILA_PHASES, HISTORY, HERO_STATS, KEY_NUMBERS, REGIONAL_STYLES, KEY_VOCABULARY, BIBLIOGRAPHY, MAP_POINTS } from './data'

const ACCENT = '#8B2FC9'
const THREAD_COLORS: Record<string, string> = {
  origin: '#8B7355', formation: '#8B2FC9', modern: '#3B82F6',
  global: '#22C55E', festival: '#E8A94E', recognition: '#EF4444',
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function GnawaMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-6.5, 32.5], zoom: 5.2, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map
      map.on('load', () => {
        MAP_POINTS.forEach(p => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${p.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;box-shadow:0 0 10px ${p.color}55;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat])
            .setPopup(new mapboxgl.Popup({ offset: 12, closeButton: false, maxWidth: '240px' })
              .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:11px;letter-spacing:0.05em;text-transform:uppercase;color:${p.color};margin:0 0 2px">${p.label}</p><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${p.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${p.detail}</p></div>`))
            .addTo(map)
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])
  return <div ref={mapContainer} className="w-full" style={{ height: '520px', background: '#0a0a0a' }} />
}

export default function GnawaAtlasPage() {
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeInstrument, setActiveInstrument] = useState(0)
  const [activeColour, setActiveColour] = useState(0)
  const [activePhase, setActivePhase] = useState(0)
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [expandedVocab, setExpandedVocab] = useState<number | null>(null)
  const [showAllMaalems, setShowAllMaalems] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const v = (id: string) => vis.has(id)
  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  const visibleMaalems = showAllMaalems ? MAALEMS : MAALEMS.slice(0, 4)

  return (
    <main className="min-h-screen bg-white text-[#0a0a0a]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ═══ HERO — Full viewport, cinematic ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute top-0 left-0 right-0 h-[3px] flex">
          {SEVEN_COLOURS.map((c, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: c.hex === '#F5F5F5' ? '#555' : c.hex === '#1a1a1a' ? '#333' : c.hex }} />
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
            {[...Array(7)].map((_, j) => (
              <circle key={j} cx={600} cy={400} r={80 + j * 60} stroke={ACCENT} strokeWidth="0.5" fill="none" opacity={0.5 - j * 0.06} />
            ))}
          </svg>
        </div>
        <div className="relative z-10 px-8 md:px-[8%] lg:px-[12%] pb-20 md:pb-28">
          <Link href="/data" className="text-[10px] tracking-[0.25em] uppercase mb-10 block transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>← Data Index</Link>
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Module 083 · Musical &amp; Spiritual Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Gnawa<br />Atlas
          </h1>
          <p className="text-[15px] md:text-[17px] max-w-[520px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Descendants of West African slaves. Five hundred years of spiritual music.
            Guembri, qraqeb, seven colours, the all-night lila. UNESCO, 2019.
          </p>
          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((st, i) => (
              <div key={i}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{st.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) }}`}</style>
      </section>

      {/* ═══ INSTRUMENTS — Expanding selector, asymmetric detail ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Instruments</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">Three Voices</h2>
          <p className="text-[14px] text-[#737373] max-w-[500px] leading-relaxed mb-16">
            Guembri, qraqeb, tbel. Wood, skin, gut, iron. Everything from the animal and the earth.
          </p>
          <div className="flex gap-3 mb-12">
            {INSTRUMENTS.map((inst, i) => (
              <button key={i} onClick={() => setActiveInstrument(i)}
                className="transition-all duration-500 text-left"
                style={{ flex: activeInstrument === i ? 3 : 1, padding: '20px', background: activeInstrument === i ? '#0a0a0a' : '#fafafa', color: activeInstrument === i ? '#fff' : '#999', border: 'none' }}>
                <span className="font-serif italic block" style={{ fontSize: activeInstrument === i ? '28px' : '16px', transition: 'font-size 0.5s' }}>{inst.name}</span>
                <span className="text-[10px] uppercase tracking-[0.06em] block mt-1 opacity-60">{inst.aliases[0]}</span>
              </button>
            ))}
          </div>
          <div data-sid="instruments" className={`transition-all duration-700 ${v('instruments') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-7">
                <span className="text-[24px] md:text-[28px]" dir="rtl" style={{ color: '#d4d4d4', fontFamily: "'Instrument Serif', Georgia, serif" }}>{INSTRUMENTS[activeInstrument].arabic}</span>
                <p className="text-[15px] text-[#525252] leading-[1.75] mt-4 mb-8">{INSTRUMENTS[activeInstrument].description}</p>
                <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                  {([['Materials', INSTRUMENTS[activeInstrument].materials], ['Construction', INSTRUMENTS[activeInstrument].construction], ['Playing', INSTRUMENTS[activeInstrument].playing], ['Ritual Role', INSTRUMENTS[activeInstrument].role]] as const).map(([label, text]) => (
                    <div key={label}>
                      <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: ACCENT }}>{label}</span>
                      <p className="text-[13px] text-[#525252] leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-5 flex flex-col justify-end">
                <div className="border-l-2 pl-6" style={{ borderColor: ACCENT }}>
                  <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: '#999' }}>African Ancestor</span>
                  <p className="text-[14px] text-[#525252] leading-relaxed">{INSTRUMENTS[activeInstrument].ancestor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SEVEN COLOURS — Dark, immersive colour swatches ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>002 — The Seven Mluk</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#fff' }}>Seven Colours,<br />Seven Realms</h2>
          <p className="text-[14px] max-w-[480px] leading-relaxed mb-16" style={{ color: 'rgba(255,255,255,0.35)' }}>
            The lila moves through seven spirit families — each identified by a colour, an incense, a rhythm, and a character.
          </p>
          <div className="flex gap-1 mb-12">
            {SEVEN_COLOURS.map((c, i) => (
              <button key={i} onClick={() => setActiveColour(i)}
                className="transition-all duration-500 relative overflow-hidden"
                style={{ flex: activeColour === i ? 4 : 1, height: '120px', background: c.hex === '#F5F5F5' ? '#ddd' : c.hex === '#1a1a1a' ? '#333' : c.hex, minWidth: '32px' }}>
                {activeColour === i && (
                  <span className="absolute bottom-3 left-4 text-[11px] font-medium" style={{ color: ['#F5F5F5','#FCBF49','#22C55E'].includes(c.hex) ? '#0a0a0a' : '#fff' }}>{c.name}</span>
                )}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 min-h-[200px]">
            <div className="md:col-span-5">
              <h3 className="font-serif italic text-[28px] md:text-[36px]" style={{ color: '#fff', lineHeight: 1.1 }}>{SEVEN_COLOURS[activeColour].name}</h3>
              <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{SEVEN_COLOURS[activeColour].arabic}</p>
              <p className="text-[14px] leading-relaxed mt-6" style={{ color: 'rgba(255,255,255,0.5)' }}>{SEVEN_COLOURS[activeColour].character}</p>
            </div>
            <div className="md:col-span-3">
              <span className="text-[10px] uppercase tracking-[0.1em] block mb-3" style={{ color: ACCENT }}>Spirit</span>
              <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{SEVEN_COLOURS[activeColour].spirits}</p>
            </div>
            <div className="md:col-span-4">
              <span className="text-[10px] uppercase tracking-[0.1em] block mb-3" style={{ color: ACCENT }}>Incense</span>
              <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{SEVEN_COLOURS[activeColour].incense}</p>
              <span className="text-[10px] uppercase tracking-[0.1em] block mb-3 mt-6" style={{ color: ACCENT }}>Songs</span>
              <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{SEVEN_COLOURS[activeColour].domain}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PULLQUOTE — Accent colour moment ═══ */}
      <section className="flex items-center justify-center min-h-[45vh]" style={{ background: ACCENT }}>
        <div className="max-w-[720px] px-8 text-center py-20">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)', color: '#fff' }}>
            The lila is not a performance.<br />It is a negotiation between the living and the unseen.
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] mt-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Deborah Kapchan, Traveling Spirit Masters
          </p>
        </div>
      </section>

      {/* ═══ THE LILA — Oversized phase numbers ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>003 — The Ritual</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">The All-Night Lila</h2>
          <p className="text-[14px] text-[#737373] max-w-[500px] leading-relaxed mb-16">
            From sunset to sunrise. Seven phases. The ceremony unfolds through food, prayer, trance, and dawn.
          </p>
          <div data-sid="lila" className={`transition-all duration-700 ${v('lila') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="flex gap-2 md:gap-4 mb-12">
              {LILA_PHASES.map((_, i) => (
                <button key={i} onClick={() => setActivePhase(i)}
                  style={{ padding: '12px 8px', borderBottom: activePhase === i ? `2px solid ${ACCENT}` : '2px solid transparent' }}>
                  <span className="font-serif italic block transition-all duration-400" style={{
                    fontSize: activePhase === i ? 'clamp(2rem, 4vw, 3.5rem)' : '20px',
                    color: activePhase === i ? '#0a0a0a' : '#d4d4d4', lineHeight: 1,
                  }}>{String(i + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <h3 className="font-serif italic text-[24px] md:text-[28px] text-[#0a0a0a] mb-1">{LILA_PHASES[activePhase].name}</h3>
                <p className="text-[13px]" style={{ color: ACCENT }}>{LILA_PHASES[activePhase].duration}</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-[15px] text-[#525252] leading-[1.75]">{LILA_PHASES[activePhase].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAALEMS — Staggered editorial portraits ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>004 — The Masters</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">The Maalems</h2>
          <div data-sid="maalems" className={`transition-all duration-700 ${v('maalems') ? 'opacity-100' : 'opacity-0'}`}>
            {visibleMaalems.map((m, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10" style={{ borderTop: i === 0 ? 'none' : '1px solid #e5e5e5' }}>
                <div className={i % 2 === 0 ? 'md:col-span-3' : 'md:col-span-3 md:col-start-2'}>
                  <h3 className="font-serif italic text-[22px] md:text-[26px] text-[#0a0a0a] leading-tight">{m.name}</h3>
                  <p className="text-[12px] mt-1" style={{ color: ACCENT }}>{m.years}</p>
                  <p className="text-[12px] text-[#999] mt-1">{m.city}</p>
                </div>
                <div className="md:col-span-5">
                  <p className="text-[14px] text-[#525252] leading-[1.75]">{m.significance}</p>
                </div>
                <div className="md:col-span-3">
                  {m.collaborations && (
                    <>
                      <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: '#999' }}>Collaborations</span>
                      {[m.collaborations].map((r, j) => (
                        <p key={j} className="text-[12px] text-[#737373] leading-relaxed">{r}</p>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
            {!showAllMaalems && MAALEMS.length > 4 && (
              <button onClick={() => setShowAllMaalems(true)}
                className="mt-8 text-[11px] uppercase tracking-[0.1em] px-6 py-3 transition-all hover:bg-[#0a0a0a] hover:text-white"
                style={{ border: '1px solid #0a0a0a', color: '#0a0a0a' }}>
                Show all {MAALEMS.length} maalems
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ═══ MAP — Gnawa Geography ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#7C3AED' }}>006 — Geography</p>
        <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#fff' }}>The Schools</h2>
        <GnawaMap />
      </div></section>

      {/* ═══ REGIONAL STYLES — Wide horizontal cards ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>005 — Geography of Sound</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Five Regional Styles</h2>
          <div data-sid="styles" className={`space-y-0 transition-all duration-700 ${v('styles') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            {REGIONAL_STYLES.map((r, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-8" style={{ borderBottom: '1px solid #e5e5e5' }}>
                <div className="md:col-span-3">
                  <h3 className="font-serif italic text-[20px] text-[#0a0a0a]">{r.name}</h3>
                  <p className="text-[12px] mt-1" style={{ color: ACCENT }}>{r.city}</p>
                </div>
                <div className="md:col-span-9">
                  <p className="text-[14px] text-[#525252] leading-[1.75]">{r.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="flex items-center justify-center min-h-[38vh]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-[720px] px-8 text-center py-20">
          <p className="font-serif italic leading-[1.25]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', color: 'rgba(255,255,255,0.7)' }}>
            Gnawa is not folklore. It is a living technology of the spirit.
          </p>
        </div>
      </section>

      {/* ═══ VOCABULARY — Sidebar heading + accordion ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>006 — Language</p>
              <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05]">Gnawa<br />Vocabulary</h2>
            </div>
            <div className="md:col-span-8" data-sid="vocab">
              <div className={`transition-all duration-700 ${v('vocab') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                {KEY_VOCABULARY.map((word, i) => (
                  <div key={i} style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <div className="flex items-baseline justify-between py-5 cursor-pointer group" onClick={() => setExpandedVocab(expandedVocab === i ? null : i)}>
                      <div className="flex items-baseline gap-4">
                        <span className="font-serif italic text-[20px] text-[#0a0a0a]">{word.term}</span>
                        <span className="text-[14px]" dir="rtl" style={{ color: '#bbb' }}>{word.arabic}</span>
                      </div>
                      <span className="text-[14px] text-[#ccc] group-hover:text-[#999] transition-colors">{expandedVocab === i ? '−' : '+'}</span>
                    </div>
                    <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: expandedVocab === i ? '200px' : '0', opacity: expandedVocab === i ? 1 : 0 }}>
                      <p className="text-[14px] text-[#525252] leading-[1.75] pb-6 max-w-[600px]">{word.definition}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE — Vertical line ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>007 — Chronology</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">From Slavery<br />to UNESCO</h2>
          <div className="flex flex-wrap gap-2 mb-12">
            <button onClick={() => setActiveThread(null)}
              className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all"
              style={{ background: !activeThread ? '#0a0a0a' : 'transparent', color: !activeThread ? '#fff' : '#999', border: `1px solid ${!activeThread ? '#0a0a0a' : '#ddd'}` }}>All</button>
            {Object.entries(THREAD_COLORS).map(([t, c]) => (
              <button key={t} onClick={() => setActiveThread(activeThread === t ? null : t)}
                className="text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all"
                style={{ background: activeThread === t ? '#0a0a0a' : 'transparent', color: activeThread === t ? c : '#999', border: `1px solid ${activeThread === t ? '#0a0a0a' : '#ddd'}` }}>{t}</button>
            ))}
          </div>
          <div data-sid="timeline" className={`transition-all duration-700 ${v('timeline') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px" style={{ background: '#ddd' }} />
              <div className="space-y-6">
                {filteredHistory.map((h, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[23px] md:-left-[31px] top-[6px] w-[7px] h-[7px] rounded-full" style={{ background: THREAD_COLORS[h.thread] || ACCENT }} />
                    <span className="text-[11px] block mb-1" style={{ color: THREAD_COLORS[h.thread] || '#999' }}>{h.year}</span>
                    <p className="text-[14px] text-[#525252] leading-relaxed max-w-[640px]">{h.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS — Staggered, large ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>008 — By the Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Key Numbers</h2>
          <div data-sid="numbers" className={`transition-all duration-700 ${v('numbers') ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {KEY_NUMBERS.map((n, i) => (
                <div key={i} className="flex gap-6 items-start" style={{ paddingTop: i % 2 === 1 ? '40px' : '0' }}>
                  <span className="font-serif italic flex-shrink-0" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{n.number}</span>
                  <p className="text-[13px] text-[#525252] leading-relaxed pt-2">{n.context}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: '#999' }}>Sources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            {BIBLIOGRAPHY.map((b, i) => (
              <div key={i}>
                <span className="text-[12px] text-[#525252]">{b.source}</span>
                <p className="text-[11px] text-[#999] leading-relaxed">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-8 md:px-[8%]">
          <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Module 083 · The Gnawa Atlas · © Dancing with Lions</p>
          <p className="text-[11px] mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>Data: UNESCO ICH, Deborah Kapchan, IEMed, Afropop Worldwide, Penn Museum, Wikipedia</p>
        </div>
        <div style={{ backgroundColor: '#161616' }} className="py-3">
          <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.15)' }}>dancingwithlions.com</p>
        </div>
        <div style={{ backgroundColor: '#0e0e0e' }} className="py-2" />
      </footer>

    </main>
  )
}
