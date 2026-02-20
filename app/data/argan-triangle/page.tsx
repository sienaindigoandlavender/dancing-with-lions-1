'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { BIOSPHERE_ZONES, PRODUCTS, COOPERATIVE_STATS, RECOGNITIONS, HERO_STATS, KEY_NUMBERS } from './data'

export default function ArganTrianglePage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
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
        center: [-9.35, 30.45],
        zoom: 7.6,
        interactive: true,
      })
      mapRef.current = map
      map.on('load', () => {
        BIOSPHERE_ZONES.forEach(z => {
          const el = document.createElement('div')
          el.style.cssText = `width:16px;height:16px;background:${z.color};border-radius:50%;border:2px solid #0a0a0a;cursor:pointer;box-shadow:0 0 10px ${z.color}44;`
          const popup = new mapboxgl.Popup({ offset: 10, maxWidth: '280px' })
            .setHTML(`
              <div style="font-family:IBM Plex Mono,monospace;padding:4px;">
                <div style="font-size:13px;font-weight:700;color:#f5f5f5;">${z.name}</div>
                <div style="font-size:10px;color:#888;margin-top:4px;">${z.detail}</div>
              </div>
            `)
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([z.lng, z.lat])
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
            {/* Tree branch patterns */}
            {Array.from({ length: 12 }, (_, i) => {
              const cx = 100 + i * 100
              const cy = 400
              return (
                <g key={i}>
                  <line x1={cx} y1={cy + 80} x2={cx} y2={cy - 20} stroke="#22C55E" strokeWidth="0.6" />
                  <line x1={cx} y1={cy} x2={cx - 25} y2={cy - 40} stroke="#22C55E" strokeWidth="0.4" />
                  <line x1={cx} y1={cy} x2={cx + 30} y2={cy - 35} stroke="#22C55E" strokeWidth="0.4" />
                  <line x1={cx} y1={cy - 20} x2={cx - 15} y2={cy - 50} stroke="#22C55E" strokeWidth="0.3" />
                  <line x1={cx} y1={cy - 20} x2={cx + 20} y2={cy - 55} stroke="#22C55E" strokeWidth="0.3" />
                  <circle cx={cx - 25} cy={cy - 42} r="4" fill="none" stroke="#22C55E" strokeWidth="0.3" />
                  <circle cx={cx + 30} cy={cy - 37} r="3.5" fill="none" stroke="#22C55E" strokeWidth="0.3" />
                </g>
              )
            })}
          </svg>
        </div>

        <div className="max-w-wide mx-auto px-6 md:px-10 pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#22C55E', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 070 — Agricultural &amp; Economic Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Argan<br />Triangle
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(255,255,255,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            The only place on earth argan trees grow. Twenty million
            trees across 830,000 hectares of UNESCO-protected biosphere,
            from Essaouira to Agadir to the Anti-Atlas. The women-led
            economy of Morocco&rsquo;s liquid gold.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#22C55E', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#22C55E' }}>001 — The Biosphere</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>Arganeraie Biosphere Reserve</h2>
          <p className="text-[13px] max-w-[600px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
            ~2.5 million hectares designated by UNESCO in 1998. Morocco&rsquo;s first Biosphere Reserve.
            Southern slopes of the High Atlas to the northern slopes of the Anti-Atlas.
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { label: 'Major production zones', color: '#22C55E' },
              { label: 'Heritage & conservation', color: '#F59E0B' },
              { label: 'Processing & export', color: '#9CA3AF' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
                <span className="text-[11px]" style={{ color: '#aaa' }}>{l.label}</span>
              </div>
            ))}
          </div>

          <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '460px', border: '1px solid #1a1a1a' }} />
        </div>
      </section>

      {/* ═══ THE TREE ═══ */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="micro-label mb-4">002 — The Tree</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-dwl-black leading-[1.05] mb-8">Argania spinosa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10" data-sid="tree" style={{ opacity: visibleSections.has('tree') ? 1 : 0, transform: visibleSections.has('tree') ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.7s ease' }}>
            <div>
              <p className="text-[14px] text-dwl-body leading-relaxed mb-4">
                Tashelhit name: <em>argan</em> (ⴰⵔⴳⴰⵏ). A thorny, gnarled tree native to the semi-arid Souss Valley,
                the Chiadma and Haha regions, and the Anti-Atlas foothills. Grows 8–10 metres high. Crown
                circumference up to 70 metres. Lives approximately 200 years. Deep roots reach 30 metres into
                underground aquifers. Small, waxy leaves minimise water loss. Thick bark protects against heat
                and wind. Withstands temperatures up to 50°C.
              </p>
              <p className="text-[14px] text-dwl-body leading-relaxed mb-4">
                Each tree produces ~8 kg of fruit per year. The fruit is olive-shaped, bitter, containing 1–3
                oil-rich kernels. Forty kilograms of dried fruit produces just one litre of oil. The most
                labour-intensive step: cracking the hard nut by hand between two stones. Attempts to cultivate
                argan in the US, Israel, and Mexico have largely failed.
              </p>
              <p className="text-[14px] text-dwl-body leading-relaxed">
                Morocco&rsquo;s second-largest forest resource after holm oak. A bastion against desertification:
                stabilises soil, shelters wildlife, prevents Saharan expansion. Goats famously climb argan trees
                to feed on fruit — their droppings leave shells intact while returning nutrients to the forest floor.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Scientific name', value: 'Sideroxylon spinosum (syn. Argania spinosa)' },
                { label: 'Endemic range', value: 'Southwestern Morocco (+ small populations: Tindouf/Algeria, Mauritania)' },
                { label: 'Total trees', value: '~20 million across 830,000 hectares' },
                { label: 'Lifespan', value: 'Up to 200 years' },
                { label: 'Root depth', value: 'Up to 30 metres' },
                { label: 'Heat tolerance', value: '50°C' },
                { label: 'Fruit yield', value: '~8 kg/tree/year → ~30 kg fruit per litre of oil' },
                { label: 'Kernel oil content', value: 'Comparable to olive — rich in oleic/linoleic acids' },
                { label: 'Forest decline', value: '~50% lost in 100 years. 100→30 trees/hectare density.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3" style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                  <span className="text-[11px] uppercase tracking-[0.04em] w-[120px] flex-shrink-0" style={{ color: '#22C55E' }}>{item.label}</span>
                  <span className="text-[12px] text-dwl-body">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="py-section flex items-center justify-center min-h-[36vh]" style={{ background: '#22C55E' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', color: '#0a0a0a' }}>
            The argan tree is a true bastion against desertification.
            It can reach 10 metres in height and live for 200 years.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(10,10,10,0.5)' }}>— United Nations, International Day of Argania</p>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#22C55E' }}>003 — What Argan Becomes</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>The Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#1a1a1a' }}>
            {PRODUCTS.map((p, i) => {
              const isVisible = visibleSections.has(`prod-${i}`)
              return (
                <div key={p.name} data-sid={`prod-${i}`} className="p-6 md:p-8 transition-all duration-700" style={{ background: '#0a0a0a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(8px)' }}>
                  <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: p.color }}>{p.type}</span>
                  <h3 className="text-[16px] font-medium mt-1 mb-2" style={{ color: '#f5f5f5' }}>{p.name}</h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: '#888' }}>{p.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ COOPERATIVES ═══ */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="micro-label mb-4">004 — The Women&rsquo;s Economy</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-dwl-black leading-[1.05] mb-4">Cooperatives</h2>
          <p className="text-[14px] text-dwl-body max-w-[600px] leading-relaxed mb-10">
            Rural Amazigh women lead the entire extraction process through knowledge transmitted
            across generations. Cooperatives provide fair wages, literacy training, healthcare access,
            and community reinvestment. But industrial-scale mechanical extraction and multinational
            sourcing are pushing artisanal producers to the margins.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {COOPERATIVE_STATS.map((c, i) => {
              const isVisible = visibleSections.has(`coop-${i}`)
              return (
                <div key={c.label} data-sid={`coop-${i}`} className="bg-white p-6 md:p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(6px)' }}>
                  <p className="font-serif italic text-[28px] md:text-[36px] text-dwl-black leading-none">{c.stat}</p>
                  <p className="text-[12px] text-dwl-gray mt-2 font-medium">{c.label}</p>
                  <p className="text-[11px] text-dwl-muted mt-1">{c.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ DARK QUOTE ═══ */}
      <section className="py-section flex items-center justify-center min-h-[35vh]" style={{ background: '#111' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', color: '#22C55E' }}>
            Everyone wants their share of the value chain and there is
            less and less room for women.
          </p>
          <p className="text-[12px] mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>— Jamila Idbourous, President, Union of Women&rsquo;s Cooperatives for Argan Oil Production (The Ecologist, 2025)</p>
        </div>
      </section>

      {/* ═══ RECOGNITIONS TIMELINE ═══ */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="micro-label mb-4">005 — Global Recognition</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-dwl-black leading-[1.05] mb-10">Five Designations</h2>

          <div className="space-y-0">
            {RECOGNITIONS.map((r, i) => {
              const isVisible = visibleSections.has(`recog-${i}`)
              return (
                <div key={i} data-sid={`recog-${i}`} className="py-5 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(6px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-3 md:gap-8">
                    <div>
                      <span className="font-serif italic text-[24px]" style={{ color: '#22C55E' }}>{r.year}</span>
                      <p className="text-[11px] mt-1" style={{ color: '#999' }}>{r.body}</p>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-dwl-black mb-1">{r.designation}</p>
                      <p className="text-[12px] text-dwl-body leading-relaxed">{r.detail}</p>
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
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#22C55E' }}>006 — Key Numbers</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>The Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#1a1a1a' }}>
            {KEY_NUMBERS.map((n) => (
              <div key={n.label} className="p-6 md:p-8" style={{ background: '#0a0a0a' }}>
                <p className="font-serif italic text-[28px] md:text-[36px] leading-none" style={{ color: '#22C55E' }}>{n.value}</p>
                <p className="text-[12px] mt-2 font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{n.label}</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{n.note}</p>
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
              'United Nations — International Day of Argania: 2021 resolution, 113 co-sponsors, tree biology (50°C, 200 years, 10m height), bastion against desertification',
              'UNESCO — Arganeraie Biosphere Reserve (1998): Morocco\'s first biosphere, ~2.5M hectares, 8 provinces, Man and Biosphere Programme',
              'UNESCO — Intangible Cultural Heritage (2014): "Argan, practices and know-how concerning the argan tree" inscribed on Representative List',
              'FAO — Globally Important Agricultural Heritage System (2018): Argan-based agro-sylvo-pastoral system, Ait Souab–Ait Mansour',
              'Wikipedia — Argan oil: 40 kg fruit per litre, UCFA 22 cooperatives, ~300 firms near Essaouira, mechanical $22/litre, production forecast',
              'Wikipedia — Sideroxylon spinosum: 8,280 km² forest, 50% loss in 100 years, 100→30 density, Tashelhit vocabulary, goat browsing, EU PGI application',
              'Morocco World News — "The Blessed Tree": 20M trees/830K hectares, roots 30m deep, crown 70m, ANDZOA founded 2010, RARBA antidesertification',
              'The Ecologist (Nov 2025): Jamila Idbourous quote, cooperative margins squeezed, Covid fruit price surge 2→12 MAD/kg, Sidi Yassine closure',
              'Springer Human Ecology (2023): UCFA/FIFARGANE/FNFARGNANE cooperative unions, 8 provinces of ABR, intermediary dominance, benefit sharing',
              'Market.us / IMARC / Persistence Market Research: Global market $370M (2024), CAGR 9–12%, cosmetic grade 66%, North America 33% share',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Dancing with Lions. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#22C55E' }}>Source: Dancing with Lions</p>
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
