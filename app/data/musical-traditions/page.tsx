'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { TRADITIONS, KEY_INSTRUMENTS, FESTIVALS, HERO_STATS, KEY_NUMBERS } from './data'

export default function MusicalTraditionsPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [expandedTradition, setExpandedTradition] = useState<string | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return
    const init = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      // @ts-ignore
      await import('mapbox-gl/dist/mapbox-gl.css')
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-5.5, 32.8],
        zoom: 5.0,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        TRADITIONS.forEach(t => {
          const el = document.createElement('div')
          el.style.cssText = `width:16px;height:16px;background:${t.color};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;`
          const popup = new mapboxgl.Popup({ offset: 12, maxWidth: '300px' })
            .setHTML(`
              <div style="font-family:IBM Plex Mono,monospace;padding:4px;">
                <div style="font-size:14px;font-weight:700;color:#f5f5f5;">${t.name}</div>
                <div style="font-size:11px;color:${t.color};margin-top:2px;">${t.arabicName}</div>
                <div style="font-size:11px;color:#aaa;margin-top:2px;">${t.region}</div>
                <div style="font-size:11px;color:#888;margin-top:4px;">${t.origin.slice(0, 120)}…</div>
              </div>
            `)
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([t.lng, t.lat])
            .setPopup(popup)
            .addTo(map)
          markersRef.current.push(marker)
        })
      })
    }
    init()
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Sound wave / rhythm lines */}
            {Array.from({ length: 12 }, (_, i) => {
              const y = 200 + i * 40
              const amp = 15 + (i % 3) * 10
              const d = `M 0 ${y} ${Array.from({ length: 60 }, (_, j) => `Q ${j * 20 + 10} ${y + Math.sin(j * 0.5 + i) * amp}, ${j * 20 + 20} ${y}`).join(' ')}`
              return <path key={i} d={d} fill="none" stroke="#8B5CF6" strokeWidth="0.3" />
            })}
          </svg>
        </div>

        <div className="max-w-wide mx-auto px-6 md:px-10 pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#8B5CF6', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 066 — Cultural Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            Musical<br />Traditions
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Gnawa trance from the slave routes. Andalusi suites from fallen
            Granada. Amazigh drums older than Islam. Chaabi from the markets.
            Raï from the border. Five traditions that map Morocco&rsquo;s soul
            across geography, history, and the body.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#8B5CF6', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#8B5CF6' }}>001 — Geography of Sound</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Where the Music Lives</h2>

          <div className="flex flex-wrap gap-4 mb-6">
            {TRADITIONS.map(t => (
              <div key={t.id} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                <span className="text-[11px]" style={{ color: '#aaa' }}>{t.name}</span>
              </div>
            ))}
          </div>

          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '480px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ FIVE TRADITIONS ═══ */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="micro-label mb-4">002 — Five Lineages</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-dwl-black leading-[1.05] mb-12">The Traditions</h2>

          <div className="space-y-0">
            {TRADITIONS.map((t, i) => {
              const isVisible = visibleSections.has(`trad-${i}`)
              const isExpanded = expandedTradition === t.id
              return (
                <div key={t.id} data-sid={`trad-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4 cursor-pointer" onClick={() => setExpandedTradition(isExpanded ? null : t.id)}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                        <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: t.color }}>{t.era}</span>
                      </div>
                      <h3 className="font-serif text-[28px] md:text-[36px] italic text-dwl-black leading-tight">{t.name}</h3>
                      <p className="text-[18px] mt-0.5" style={{ color: '#999' }}>{t.arabicName}</p>
                    </div>
                    <span className="text-[24px] mt-2 transition-transform" style={{ color: '#ccc', transform: isExpanded ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                  </div>

                  {/* Summary always visible */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-1" style={{ color: '#999' }}>Origin</p>
                      <p className="text-[13px] text-dwl-body leading-relaxed">{t.origin}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-1" style={{ color: '#999' }}>Region</p>
                      <p className="text-[13px] text-dwl-body leading-relaxed">{t.region}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.06em] mb-1" style={{ color: '#999' }}>Key Instruments</p>
                      <p className="text-[13px] text-dwl-body leading-relaxed">{t.instruments.slice(0, 4).join(', ')}</p>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8" style={{ animation: 'fadeUp 0.4s ease forwards' }}>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: t.color }}>History &amp; Structure</p>
                        <p className="text-[14px] text-dwl-body leading-relaxed mb-4">{t.detail}</p>
                        {t.unesco && <p className="text-[12px] font-medium" style={{ color: t.color }}>{t.unesco}</p>}

                        <p className="text-[11px] uppercase tracking-[0.06em] mb-2 mt-5" style={{ color: t.color }}>Ceremony / Context</p>
                        <p className="text-[13px] text-dwl-body leading-relaxed">{t.ritualOrContext}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: t.color }}>Key Figures</p>
                        <div className="space-y-1 mb-5">
                          {t.keyFigures.map((f, j) => (
                            <p key={j} className="text-[13px] text-dwl-body flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: t.color }} />
                              {f}
                            </p>
                          ))}
                        </div>

                        <p className="text-[11px] uppercase tracking-[0.06em] mb-2" style={{ color: t.color }}>Modern &amp; Fusion</p>
                        <p className="text-[13px] text-dwl-body leading-relaxed">{t.modernFusion}</p>

                        <p className="text-[11px] uppercase tracking-[0.06em] mb-2 mt-5" style={{ color: t.color }}>All Instruments</p>
                        <p className="text-[12px] text-dwl-muted">{t.instruments.join(' · ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-section flex items-center justify-center min-h-[38vh]" style={{ background: '#8B5CF6' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#ffffff' }}>
            Gnawa music is the sound of memory healing itself — born from
            trauma but sustained by joy.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>— Morocco World News (2025)</p>
        </div>
      </section>

      {/* ═══ INSTRUMENTS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#8B5CF6' }}>003 — The Instruments</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>Eight Core Voices</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#1a1a1a' }}>
            {KEY_INSTRUMENTS.map((inst, i) => {
              const isVisible = visibleSections.has(`inst-${i}`)
              const typeColors: Record<string, string> = { 'String': '#D4A373', 'Percussion': '#EF4444', 'Wind': '#22C55E', 'Vocal': '#8B5CF6' }
              return (
                <div key={inst.name} data-sid={`inst-${i}`} className="p-5 md:p-6 transition-all duration-700" style={{ background: '#0a0a0a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}>
                  <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: typeColors[inst.type] }}>{inst.type}</span>
                  <h3 className="text-[14px] font-medium mt-1 mb-1" style={{ color: '#f5f5f5' }}>{inst.name}</h3>
                  <p className="text-[11px] mb-2" style={{ color: '#666' }}>{inst.traditions.join(' · ')}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: '#888' }}>{inst.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ FESTIVALS ═══ */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="micro-label mb-4">004 — Where to Listen</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-dwl-black leading-[1.05] mb-10">Festivals</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {FESTIVALS.map((f, i) => {
              const isVisible = visibleSections.has(`fest-${i}`)
              return (
                <div key={f.name} data-sid={`fest-${i}`} className="bg-white p-6 md:p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}>
                  <h3 className="font-serif text-[16px] italic text-dwl-black mb-1">{f.name}</h3>
                  <p className="text-[12px] font-medium" style={{ color: '#8B5CF6' }}>{f.city} · {f.tradition}</p>
                  <p className="text-[12px] text-dwl-muted mt-2">{f.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-section flex items-center justify-center min-h-[35vh]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', color: '#8B5CF6' }}>
            Gnawa music, like the blues in America, has spread and attracted
            practitioners from other ethnic groups.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>— Afropop Worldwide</p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="micro-label mb-4">005 — Key Numbers</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-dwl-black leading-[1.05] mb-12">The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {KEY_NUMBERS.map((n) => (
              <div key={n.label} className="bg-white p-6 md:p-8">
                <p className="font-serif italic text-[28px] md:text-[36px] text-dwl-black leading-none">{n.value}</p>
                <p className="text-[12px] text-dwl-gray mt-2 font-medium">{n.label}</p>
                <p className="text-[11px] text-dwl-muted mt-1">{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ background: '#0a0a0a' }} className="py-section-sm">
        <div className="max-w-wide mx-auto px-6 md:px-10">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Sources</p>
          <div className="space-y-1">
            {[
              'Wikipedia — Music of Morocco: Regional distribution, Andalusi, Chaabi, Aita, Malhun, Nass El Ghiwane, Jil Jilala, Hoba Hoba Spirit',
              'Wikipedia — Gnawa music: Hausa/Fulani/Bambara origins, lila ceremony structure, maalem lineages, international collaborations',
              'Wikipedia — Andalusi nubah: 11 Moroccan nubat, 5 mizan structure, Al-Haik Kunnash, Gregorian/pentatonic/artificial modes',
              'Wikipedia — Berber music: Ahwash, ahidus, imdyazen troupes, rrways tradition, Ammouri Mbarek, Najat Aatabou, instruments',
              'UNESCO Intangible Cultural Heritage: Gnawa inscription 2019, definition as Sufi brotherhood music + healing ritual',
              'Afropop Worldwide: Gnawa-blues parallel, Essaouira/Marrakech as centres, Nass El Ghiwane drawing from Gnawa, Abd er-Rahman Paco',
              'World Music Network: Ziryab inventing nuba, Sufi tariqas, chaabi evolution, Berber imdyazen, rai scene in Oujda',
              'Morocco World News: Gnawa origins in Saadian Timbuktu campaigns, Sidi Bilal, zawayas in Marrakech/Essaouira, ahwash performance',
              'Melodigging: Amazigh music timeline, ahwash structure, chaabi definition, raï electrification 1970s–80s, Andalusi classification',
              'Bewildered in Morocco: Ziryab 9th C Cordoba, Morisco expulsion 1609, nuba preservation in Fez/Tetouan/Chefchaouen',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Dancing with Lions. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#8B5CF6' }}>Source: Dancing with Lions</p>
          </div>
          <div className="mt-6">
            <Link href="/data" className="text-[11px] uppercase tracking-[0.08em] font-medium pb-1 hover:opacity-60 transition-opacity" style={{ color: 'rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
              ← All Data Modules
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
