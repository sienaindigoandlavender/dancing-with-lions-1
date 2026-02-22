'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { GARDENS, ISLAMIC_GARDEN_PRINCIPLES, WATER_SYSTEMS, HISTORY, HERO_STATS, KEY_NUMBERS, THREAD_COLORS, BIBLIOGRAPHY, MAP_POINTS } from './data'

const ACCENT = '#2D6E4F'

export default function GardensPage() {
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function GardenMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-7.0, 32.8], zoom: 5.5, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map
      map.on('load', () => {
        MAP_POINTS.forEach(p => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${p.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;box-shadow:0 0 10px ${p.color}55;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => { map.flyTo({ center: [p.lng, p.lat], zoom: 14, duration: 1200 }) })
          new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat])
            .setPopup(new mapboxgl.Popup({ offset: 12, closeButton: false, maxWidth: '220px' })
              .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${p.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${p.detail}</p></div>`))
            .addTo(map)
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])
  return <div ref={mapContainer} className="w-full" style={{ height: '480px', background: '#0a0a0a' }} />
}

  const [vis, setVis] = useState<Set<string>>(new Set())
  const [activeGarden, setActiveGarden] = useState(0)
  const [activeThread, setActiveThread] = useState<string | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVis(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const v = (id: string) => vis.has(id)
  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY

  return (
    <main className="min-h-screen bg-white text-[#0a0a0a]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Chahar Bagh — four quadrant lines */}
            <line x1="600" y1="0" x2="600" y2="800" stroke={ACCENT} strokeWidth="0.3" />
            <line x1="0" y1="400" x2="1200" y2="400" stroke={ACCENT} strokeWidth="0.3" />
            <circle cx={600} cy={400} r={60} stroke={ACCENT} strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="relative z-10 px-8 md:px-[8%] lg:px-[12%] pb-20 md:pb-28">
          <Link href="/data" className="text-[10px] tracking-[0.25em] uppercase mb-10 block" style={{ color: 'rgba(255,255,255,0.5)' }}>← Data Index</Link>
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: ACCENT, animation: 'fadeUp 1s ease 0.3s forwards' }}>Module 084 · Landscape Intelligence</p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Gardens of<br />Morocco
          </h1>
          <p className="text-[15px] md:text-[17px] max-w-[520px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.7)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Four gardens. The chahar bagh principle. Khettara engineering. A thousand years of water, geometry, and paradise made visible.
          </p>
          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((st, i) => (
              <div key={i}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{st.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) }}`}</style>
      </section>

      {/* ═══ THE FOUR GARDENS — Each one a full editorial spread ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>001 — The Gardens</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Four Gardens</h2>
          <div className="flex gap-3 mb-12">
            {GARDENS.map((g, i) => (
              <button key={i} onClick={() => setActiveGarden(i)}
                className="transition-all duration-500 text-left"
                style={{ flex: activeGarden === i ? 3 : 1, padding: '20px', background: activeGarden === i ? '#0a0a0a' : '#fafafa', color: activeGarden === i ? '#fff' : '#999' }}>
                <span className="font-serif italic block" style={{ fontSize: activeGarden === i ? '24px' : '14px', transition: 'font-size 0.5s' }}>{g.name}</span>
                <span className="text-[10px] uppercase tracking-[0.06em] block mt-1 opacity-60">{g.city}</span>
              </button>
            ))}
          </div>
          <div data-sid="gardens" className={`transition-all duration-700 ${v('gardens') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <h3 className="font-serif italic text-[28px] md:text-[36px] text-[#0a0a0a]">{GARDENS[activeGarden].name}</h3>
                <p className="text-[14px] mt-1" dir="rtl" style={{ color: '#bbb' }}>{GARDENS[activeGarden].arabic}</p>
                <div className="mt-6 space-y-4">
                  {[['Founded', GARDENS[activeGarden].founded], ['Founder', GARDENS[activeGarden].founder], ['Area', GARDENS[activeGarden].area], ['Type', GARDENS[activeGarden].type]].map(([l, t]) => (
                    <div key={l}>
                      <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: ACCENT }}>{l}</span>
                      <p className="text-[13px] text-[#525252]">{t}</p>
                    </div>
                  ))}
                  {GARDENS[activeGarden].unescoYear && (
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: ACCENT }}>UNESCO</span>
                      <p className="text-[13px] text-[#525252]">{GARDENS[activeGarden].unescoYear}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-5">
                <p className="text-[15px] text-[#525252] leading-[1.75] mb-6">{GARDENS[activeGarden].description}</p>
                <div className="space-y-4">
                  {[['Water', GARDENS[activeGarden].water], ['Plants', GARDENS[activeGarden].plants], ['Architecture', GARDENS[activeGarden].architecture]].map(([l, t]) => (
                    <div key={l}>
                      <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: '#999' }}>{l}</span>
                      <p className="text-[13px] text-[#525252] leading-relaxed">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-3 flex flex-col justify-end">
                <div className="border-l-2 pl-6" style={{ borderColor: ACCENT }}>
                  <p className="text-[14px] leading-relaxed" style={{ color: ACCENT }}>{GARDENS[activeGarden].keyFact}</p>
                </div>
                {GARDENS[activeGarden].visitors && (
                  <p className="text-[12px] text-[#999] mt-4">{GARDENS[activeGarden].visitors}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: '#2D6E4F' }}>The Gardens — Mapped</p>
        <GardenMap />
      </div></section>

      {/* ═══ ISLAMIC GARDEN PRINCIPLES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>002 — The Geometry</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-16" style={{ color: '#fff' }}>Design Principles</h2>
          <div data-sid="principles" className={`transition-all duration-700 ${v('principles') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            {ISLAMIC_GARDEN_PRINCIPLES.map((p, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="md:col-span-4">
                  <h3 className="font-serif italic text-[22px] md:text-[26px]" style={{ color: '#fff' }}>{p.name}</h3>
                  <p className="text-[13px] mt-1" dir="rtl" style={{ color: 'rgba(255,255,255,0.25)' }}>{p.arabic}</p>
                </div>
                <div className="md:col-span-5">
                  <p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.description}</p>
                </div>
                <div className="md:col-span-3">
                  <span className="text-[10px] uppercase tracking-[0.1em] block mb-2" style={{ color: ACCENT }}>Examples</span>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{p.examples}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PULLQUOTE ═══ */}
      <section className="flex items-center justify-center min-h-[42vh]" style={{ background: ACCENT }}>
        <div className="max-w-[720px] px-8 text-center py-20">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)', color: '#fff' }}>
            The garden is not nature. It is nature submitted to geometry, and geometry submitted to water.
          </p>
        </div>
      </section>

      {/* ═══ WATER SYSTEMS — Sidebar + editorial ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>003 — The Engineering</p>
              <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05]">Water<br />Systems</h2>
            </div>
            <div className="md:col-span-8" data-sid="water">
              <div className={`transition-all duration-700 ${v('water') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                {WATER_SYSTEMS.map((w, i) => (
                  <div key={i} className="py-8" style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <div className="flex items-baseline gap-3 mb-3">
                      <h3 className="font-serif italic text-[20px] text-[#0a0a0a]">{w.name}</h3>
                      <span className="text-[14px]" dir="rtl" style={{ color: '#bbb' }}>{w.arabic}</span>
                    </div>
                    <p className="text-[14px] text-[#525252] leading-[1.75] mb-3">{w.description}</p>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.1em] block mb-1" style={{ color: ACCENT }}>Engineering</span>
                      <p className="text-[13px] text-[#737373] leading-relaxed">{w.engineering}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section style={{ background: '#fafafa' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>004 — Chronology</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-6">Twelve Centuries<br />of Gardens</h2>
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
          <div data-sid="timeline" className={`relative pl-8 md:pl-12 transition-all duration-700 ${v('timeline') ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
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
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: ACCENT }}>005 — By the Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-[#0a0a0a] leading-[1.05] mb-16">Key Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {KEY_NUMBERS.map((n, i) => (
              <div key={i} className="flex gap-6 items-start" style={{ paddingTop: i % 2 === 1 ? '40px' : '0' }}>
                <span className="font-serif italic flex-shrink-0" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: ACCENT, lineHeight: 1 }}>{n.number}</span>
                <p className="text-[13px] text-[#525252] leading-relaxed pt-2">{n.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES + FOOTER ═══ */}
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
      <footer>
        <div style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-8 md:px-[8%]">
          <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Module 084 · Gardens of Morocco · © Dancing with Lions</p>
        </div>
        <div style={{ backgroundColor: '#161616' }} className="py-3">
          <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.15)' }}>dancingwithlions.com</p>
        </div>
        <div style={{ backgroundColor: '#0e0e0e' }} className="py-2" />
      </footer>
    </main>
  )
}
