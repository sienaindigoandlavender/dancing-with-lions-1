'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { TIMELINE, KEY_FIGURES, VILLES_NOUVELLES, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const CAT_COLORS: Record<string, string> = {
  conquest: '#EF4444',
  administration: '#3B82F6',
  resistance: '#F59E0B',
  independence: '#22C55E',
}

export default function FrenchProtectoratePage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Map
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
        center: [-6.2, 33.0],
        zoom: 5.5,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        VILLES_NOUVELLES.forEach(v => {
          const el = document.createElement('div')
          el.style.cssText = `width:16px;height:16px;background:${v.color};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;`
          const popup = new mapboxgl.Popup({ offset: 10, maxWidth: '280px' })
            .setHTML(`<div style="font-family:IBM Plex Mono,monospace;padding:4px;"><div style="font-size:13px;font-weight:700;color:#f5f5f5;">${v.city}</div><div style="font-size:10px;color:#888;margin-top:4px;">${v.detail}</div></div>`)
          const marker = new mapboxgl.Marker({ element: el }).setLngLat([v.lng, v.lat]).setPopup(popup).addTo(map)
          markersRef.current.push(marker)
        })
      })
    }
    init()
    return () => { markersRef.current.forEach(m => m.remove()); mapRef.current?.remove(); mapRef.current = null }
  }, [])

  const filteredTimeline = activeCategory ? TIMELINE.filter(t => t.category === activeCategory) : TIMELINE

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.03]" preserveAspectRatio="xMidYMid slice">
            {/* Grid lines — ville nouvelle grid imposed on land */}
            {Array.from({ length: 20 }, (_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 40} x2="1200" y2={i * 40} stroke="#3B82F6" strokeWidth="0.3" />
            ))}
            {Array.from({ length: 30 }, (_, i) => (
              <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="800" stroke="#3B82F6" strokeWidth="0.3" />
            ))}
          </svg>
        </div>

        <div className="max-w-wide mx-auto px-6 md:px-10 pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#3B82F6', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 073 — Political &amp; Historical Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The French<br />Protectorate
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[540px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            1912–1956. Forty-four years between the Treaty of Fez and
            the Joint Declaration. Lyautey built the villes nouvelles.
            Morocco built the resistance that dismantled them.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block tabular-nums" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#3B82F6', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="micro-label mb-4">001 — The Timeline</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-dwl-black leading-[1.05] mb-4">Forty-Four Years</h2>
          <p className="text-[14px] text-dwl-body max-w-[520px] leading-relaxed mb-6">
            From military occupation to diplomatic departure.
            Filter by thread.
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory(null)}
              className="text-[11px] uppercase tracking-[0.08em] px-3 py-1.5 rounded-sm transition-all"
              style={{ background: !activeCategory ? '#0a0a0a' : '#f5f5f5', color: !activeCategory ? '#fff' : '#888' }}
            >All</button>
            {['conquest', 'administration', 'resistance', 'independence'].map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(activeCategory === c ? null : c)}
                className="text-[11px] uppercase tracking-[0.08em] px-3 py-1.5 rounded-sm transition-all"
                style={{ background: activeCategory === c ? CAT_COLORS[c] : '#f5f5f5', color: activeCategory === c ? '#fff' : '#888' }}
              >{c}</button>
            ))}
          </div>

          <div className="space-y-0">
            {filteredTimeline.map((t, i) => {
              const isVisible = visibleSections.has(`tl-${t.year}-${i}`)
              return (
                <div key={`${t.year}-${i}`} data-sid={`tl-${t.year}-${i}`} className="py-5 transition-all duration-700" style={{
                  borderTop: '1px solid #e5e5e5',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-[90px_1fr] gap-3 md:gap-8">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: CAT_COLORS[t.category] }} />
                      <span className="font-serif italic text-[18px] text-dwl-black">{t.year}</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-dwl-black mb-1">{t.event}</p>
                      <p className="text-[12px] text-dwl-body leading-relaxed">{t.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-section flex items-center justify-center min-h-[36vh]" style={{ background: '#3B82F6' }}>
        <div className="max-w-[680px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', color: '#ffffff' }}>
            The more those at the top borrowed, the more
            those at the bottom were impoverished.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.55)' }}>— Abdallah Laroui, <em>The History of the Maghrib</em></p>
        </div>
      </section>

      {/* ═══ MAP — VILLES NOUVELLES ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#3B82F6' }}>002 — The Dual City</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Villes Nouvelles</h2>
          <p className="text-[13px] max-w-[540px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Prost designed European districts alongside existing medinas.
            Wide boulevards on one side of the wall. Narrow alleys on the other.
            Casablanca&rsquo;s medina reached 1,290 people per hectare.
            The European quarter across the road: 50.
          </p>
          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '420px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ KEY FIGURES ═══ */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="micro-label mb-4">003 — The Actors</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-dwl-black leading-[1.05] mb-10">Seven Figures</h2>

          <div className="space-y-0">
            {KEY_FIGURES.map((f, i) => {
              const isVisible = visibleSections.has(`fig-${i}`)
              return (
                <div key={f.name} data-sid={`fig-${i}`} className="py-6 transition-all duration-700" style={{
                  borderTop: '1px solid #e5e5e5',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-10">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 rounded-sm" style={{ background: f.side === 'french' ? '#3B82F620' : '#F59E0B20', color: f.side === 'french' ? '#3B82F6' : '#F59E0B' }}>
                        {f.side === 'french' ? 'French administration' : 'Moroccan resistance'}
                      </span>
                      <h3 className="text-[16px] font-medium text-dwl-black mt-2">{f.name}</h3>
                      <p className="text-[12px] text-dwl-gray mt-0.5">{f.role}</p>
                      <p className="text-[11px] font-mono mt-1" style={{ color: '#bbb' }}>{f.years}</p>
                    </div>
                    <p className="text-[13px] text-dwl-body leading-relaxed">{f.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-section flex items-center justify-center min-h-[34vh]" style={{ background: '#111' }}>
        <div className="max-w-[680px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', color: '#F59E0B' }}>
            Complete independence under the leadership of His Majesty
            Sidi Mohammed Ben Youssef.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>— Independence Manifesto, 11 January 1944</p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#3B82F6' }}>004 — Key Numbers</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {KEY_NUMBERS.map((n) => (
              <div key={n.label} className="p-6 md:p-8" style={{ background: '#0a0a0a' }}>
                <p className="font-serif italic text-[28px] md:text-[36px] leading-none" style={{ color: '#3B82F6' }}>{n.value}</p>
                <p className="text-[12px] mt-2 font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{n.label}</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="micro-label mb-4">005 — Bibliography</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-dwl-black leading-[1.05] mb-4">Further Reading</h2>
          <p className="text-[14px] text-dwl-body max-w-[480px] leading-relaxed mb-10">
            Eight books. Each one earned its place on this list.
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
      <section style={{ background: '#0a0a0a' }} className="py-section-sm">
        <div className="max-w-wide mx-auto px-6 md:px-10">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Sources</p>
          <div className="space-y-1">
            {[
              'Wikipedia — French protectorate in Morocco: Treaty of Fez 30 March 1912, Lyautey appointment, Fez riots 17 April 1912, Berber Dahir 1930, capital move to Rabat, 35% French-speaking (2019), 1.5M Moroccans in France',
              'Wikipedia — French conquest of Morocco: Oujda 1907, Casablanca bombardment, Agadir Crisis 1911, Treaty of Fez negotiation, Regnault, Bled el-Makhzen / Bled es-Siba distinction, Maroc utile',
              'Wikipedia — Treaty of Fez: signed at Mnebhi Palace, Sultan Abd al-Hafid abdication, Moulay Yusef succession, modelled on Treaty of Bardo (Tunisia), Abdelqader Benghabrit interpreter',
              'Wikipedia — Proclamation of Independence: 66 signatories, 11 January 1944, Ahmed el Hamiani Khatat & Ahmed Bahnini drafters, Malika al-Fassi only woman, 20 arrested, Balafrej to Corsica',
              'Grokipedia — French protectorate: Casablanca 12,000→110,934 (1912–1921), medina 1,290/ha vs European 50/ha, railway 1,700km narrow gauge, Berber Dahir analysis, Écochard era 1947–1953',
              'Morocco World News: urban development during protectorate, dual city policy, Beqqal & Chaoui (2020) on Lyautey preservation vs segregation debate, post-colonial urban legacy',
              'Morocco World News (2025/2026): Independence Manifesto 82nd anniversary, Anfa Conference, Mohammed V exile 20 Aug 1953, Tangier Speech 9 Apr 1947, Aix-les-Bains negotiations',
              'Tandfonline: Central Market Rabat (1922–1925), Habous district Casablanca (1917–1926), policy of association vs assimilation, Prost era, Service de l\'urbanisme (Écochard)',
              'Gulf News: Allal al-Fassi biography, exiled to Gabon/Congo 1937–1946, "Greater Morocco" movement, guerrilla negotiation, monarchist reformism',
              'Lumen Learning — Moroccan Independence: CAM founded 1934, Plan des Réformes, Rif War chronology, Mohammed Ben Aarafa replacement, Oujda violence 1953',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Dancing with Lions. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#3B82F6' }}>Sources: Historical archives</p>
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
