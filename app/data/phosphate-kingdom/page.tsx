'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MINES, PROCESSING, TIMELINE, EXPORT_FLOWS, GLOBAL_POSITION, VALUE_CHAIN, HERO_STATS, KEY_NUMBERS } from './data'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

function PhosphateMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN!
      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-7.5, 31.0],
        zoom: 5,
        pitch: 0,
        attributionControl: false,
      })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map

      map.on('load', () => {
        // Mines
        MINES.forEach((m) => {
          const el = document.createElement('div')
          const size = m.id === 'khouribga' ? 20 : 14
          el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:${m.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.3)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => {
            setSelected(m.id)
            map.flyTo({ center: m.coords, zoom: 8, duration: 1200 })
          })
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat(m.coords)
            .setPopup(
              new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '280px' })
                .setHTML(`<div style="font-family:var(--font-mono);padding:4px 0"><p style="font-size:10px;letter-spacing:0.05em;text-transform:uppercase;color:${m.color};margin:0 0 2px">Mine — ${m.basin}</p><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${m.name}</p><p style="font-size:12px;color:#aaa;margin:0"><span style="color:${m.color}">${m.reserveShare}</span> of reserves · <span style="color:${m.color}">${m.outputShare}</span> of output</p></div>`)
            )
            .addTo(map)
          markersRef.current.push(marker)
        })

        // Processing plants
        PROCESSING.forEach((p) => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;background:${p.color};cursor:pointer;transition:transform 0.2s;transform:rotate(45deg);border:2px solid rgba(255,255,255,0.8);`
          el.addEventListener('mouseenter', () => { el.style.transform = 'rotate(45deg) scale(1.3)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'rotate(45deg) scale(1)' })
          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat(p.coords)
            .setPopup(
              new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '260px' })
                .setHTML(`<div style="font-family:var(--font-mono);padding:4px 0"><p style="font-size:10px;letter-spacing:0.05em;text-transform:uppercase;color:${p.color};margin:0 0 2px">Processing Plant</p><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${p.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${p.role}</p></div>`)
            )
            .addTo(map)
          markersRef.current.push(marker)
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  const selectedMine = MINES.find(m => m.id === selected)

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-white/60" style={{ background: '#F59E0B' }} />
          <span className="text-[11px]" style={{ color: '#888' }}>Mine</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-white/60" style={{ background: '#2D5F8A', transform: 'rotate(45deg)' }} />
          <span className="text-[11px]" style={{ color: '#888' }}>Processing plant</span>
        </div>
      </div>
      <div ref={mapContainer} className="w-full rounded-sm overflow-hidden" style={{ height: '520px', background: '#0a0a0a' }} />
      {selectedMine && (
        <div className="mt-4 p-6 rounded-sm" style={{ background: '#111', border: `1px solid ${selectedMine.color}30` }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ background: selectedMine.color }} />
            <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: selectedMine.color }}>{selectedMine.basin}</span>
          </div>
          <h3 className="font-serif text-[24px] italic mb-1" style={{ color: '#f5f5f5' }}>{selectedMine.name}</h3>
          <div className="grid grid-cols-3 gap-4 mt-3 mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.08em]" style={{ color: '#666' }}>Opened</p>
              <p className="text-[16px] font-serif italic" style={{ color: selectedMine.color }}>{selectedMine.opened}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.08em]" style={{ color: '#666' }}>Reserve share</p>
              <p className="text-[16px] font-serif italic" style={{ color: selectedMine.color }}>{selectedMine.reserveShare}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.08em]" style={{ color: '#666' }}>Output share</p>
              <p className="text-[16px] font-serif italic" style={{ color: selectedMine.color }}>{selectedMine.outputShare}</p>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: '#ccc' }}>{selectedMine.note}</p>
        </div>
      )}
    </div>
  )
}

export default function PhosphateKingdomPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="-mt-16">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1200 800" className="w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            {/* Geological strata layers */}
            {Array.from({ length: 12 }, (_, i) => (
              <path key={i} d={`M0 ${200 + i * 50} Q${300 + i * 20} ${180 + i * 50} 600 ${210 + i * 50} T1200 ${195 + i * 50}`} fill="none" stroke="#F59E0B" strokeWidth="0.3" />
            ))}
          </svg>
        </div>

        <div className="px-8 md:px-[8%] lg:px-[12%] pb-20 pt-32 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-6 opacity-0" style={{ color: '#F59E0B', animation: 'fadeUp 1s ease 0.3s forwards' }}>
            Data Module 052 — Industrial Intelligence
          </p>
          <h1 className="font-serif leading-[0.92] tracking-[-0.03em] opacity-0" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#ffffff', fontStyle: 'italic', animation: 'fadeUp 1s ease 0.5s forwards' }}>
            The Phosphate<br />Kingdom
          </h1>
          <p className="text-[16px] md:text-[18px] max-w-[580px] leading-relaxed mt-8 opacity-0" style={{ color: 'rgba(0,0,0,0.4)', animation: 'fadeUp 1s ease 0.7s forwards' }}>
            Morocco sits on 70% of the world&rsquo;s phosphate reserves — 50 billion tonnes
            buried in four basins. One state-owned company, OCP Group, controls the entire
            chain from mine to fertilizer to port. This is the geology that feeds the planet.
          </p>

          <div className="flex flex-wrap gap-10 md:gap-16 mt-12 opacity-0" style={{ animation: 'fadeUp 1s ease 0.9s forwards' }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <span className="font-serif italic block" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F59E0B', lineHeight: 1 }}>{s.value}</span>
                <span className="text-[10px] tracking-[0.1em] uppercase block mt-2" style={{ color: 'rgba(0,0,0,0.3)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GLOBAL POSITION ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">001 — Global Position</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Morocco vs. The World</h2>

          <div className="space-y-0">
            {GLOBAL_POSITION.map((g, i) => {
              const isVisible = visibleSections.has(`global-${i}`)
              return (
                <div key={g.metric} data-sid={`global-${i}`} className="py-7 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-3">
                      <p className="text-[11px] text-dwl-muted uppercase tracking-[0.08em]">{g.metric}</p>
                      <p className="font-serif italic text-[36px] md:text-[48px] text-dwl-black leading-none mt-1">{g.value}</p>
                    </div>
                    <div className="md:col-span-9 flex items-center">
                      <p className="text-[14px] text-dwl-body leading-relaxed">{g.context}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>002 — The Infrastructure</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-8" style={{ color: '#ffffff' }}>Mines &amp; Processing Plants</h2>
          <PhosphateMap />
        </div>
      </section>

      {/* ═══ MINE CARDS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">003 — Five Mining Operations</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">From Khouribga to Boucraa</h2>

          <div className="space-y-0">
            {MINES.map((m, i) => {
              const isVisible = visibleSections.has(`mine-${i}`)
              return (
                <div key={m.id} data-sid={`mine-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #e5e5e5', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: m.color }} />
                        <span className="text-[10px] uppercase tracking-[0.08em] tabular-nums text-dwl-muted">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="font-serif text-[28px] italic text-dwl-black">{m.name}</h3>
                      <p className="text-[12px] text-dwl-muted mt-1">{m.basin}</p>
                      <div className="flex gap-6 mt-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">Reserves</p>
                          <p className="font-serif italic text-[18px]" style={{ color: m.color }}>{m.reserveShare}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">Output</p>
                          <p className="font-serif italic text-[18px]" style={{ color: m.color }}>{m.outputShare}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">Since</p>
                          <p className="font-serif italic text-[18px] text-dwl-black">{m.opened}</p>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-[14px] text-dwl-body leading-relaxed">{m.note}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE 1 ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[40vh]" style={{ background: '#F59E0B' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 3rem)', color: '#0a0a0a' }}>
            China produces more phosphate. But China&rsquo;s reserves are 3.7 billion tonnes.
            Morocco&rsquo;s are 50 billion. The short game belongs to Beijing.
            The long game belongs to Rabat.
          </p>
        </div>
      </section>

      {/* ═══ VALUE CHAIN ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#5C7C3E' }}>004 — The Value Chain</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-4" style={{ color: '#ffffff' }}>From Rock to Fertilizer to Port</h2>
          <p className="text-[16px] max-w-[560px] leading-relaxed mb-12" style={{ color: 'rgba(0,0,0,0.4)' }}>OCP doesn&rsquo;t just mine phosphate. It extracts, processes, customizes, and ships. The integrated model is the competitive advantage.</p>

          <div className="space-y-0">
            {VALUE_CHAIN.map((v, i) => {
              const isVisible = visibleSections.has(`chain-${i}`)
              return (
                <div key={v.step} data-sid={`chain-${i}`} className="py-8 transition-all duration-700" style={{ borderTop: '1px solid #1a1a1a', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                    <div className="md:col-span-3">
                      <span className="font-serif italic" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#5C7C3E', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
                      <p className="font-serif text-[20px] italic mt-2" style={{ color: '#f5f5f5' }}>{v.step}</p>
                      <p className="text-[11px] mt-1" style={{ color: '#666' }}>{v.location}</p>
                    </div>
                    <div className="md:col-span-9 flex items-center">
                      <p className="text-[15px] leading-relaxed" style={{ color: '#ccc' }}>{v.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ EXPORT FLOWS ═══ */}
      <section style={{ background: '#fafafa' }} className="">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">005 — Global Fertilizer Flows</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">Where the Phosphate Goes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e5e5e5' }}>
            {EXPORT_FLOWS.map((e, i) => {
              const isVisible = visibleSections.has(`flow-${i}`)
              return (
                <div key={e.region} data-sid={`flow-${i}`} className="bg-white p-8 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <p className="font-serif italic text-[36px] leading-none" style={{ color: e.color }}>{e.share}</p>
                  <p className="font-serif text-[20px] italic text-dwl-black mt-2">{e.region}</p>
                  <p className="text-[11px] text-dwl-muted mt-1 mb-3">{e.keyMarkets}</p>
                  <p className="text-[13px] text-dwl-body leading-relaxed">{e.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE 2 ═══ */}
      <section className="py-24 md:py-40 flex items-center justify-center min-h-[42vh]" style={{ background: '#5C7C3E' }}>
        <div className="max-w-[720px] px-6 md:px-10 text-center">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', color: '#ffffff' }}>
            When China restricted phosphate fertilizer exports in 2024 to secure domestic
            food supply, the world turned to Morocco. There is no Plan B for phosphate.
            There is only OCP.
          </p>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section style={{ background: '#0a0a0a' }}>
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: '#F59E0B' }}>006 — Timeline</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic leading-[1.05] mb-12" style={{ color: '#ffffff' }}>105 Years of Phosphate</h2>

          <div className="relative">
            <div className="absolute left-[20px] md:left-[40px] top-0 bottom-0 w-px" style={{ background: '#1a1a1a' }} />
            {TIMELINE.map((t, i) => {
              const isVisible = visibleSections.has(`time-${i}`)
              return (
                <div key={t.year} data-sid={`time-${i}`} className="relative pl-12 md:pl-20 pb-10 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(12px)' }}>
                  <div className="absolute left-[16px] md:left-[36px] top-1 w-2 h-2 rounded-full" style={{ background: '#F59E0B' }} />
                  <p className="font-serif italic text-[24px]" style={{ color: '#F59E0B', lineHeight: 1 }}>{t.year}</p>
                  <p className="font-serif text-[18px] italic mt-2 mb-1" style={{ color: '#f5f5f5' }}>{t.event}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#888' }}>{t.significance}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="bg-white">
        <div className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-4">007 — Key Numbers</p>
          <h2 className="font-serif text-[32px] md:text-[44px] italic text-dwl-black leading-[1.05] mb-12">The Scale of the Kingdom</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: '#e5e5e5' }}>
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
      <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>Sources</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
            {[
              'USGS — Mineral Commodity Summaries 2025: phosphate rock reserves and production',
              'OCP Group — Industrial Operations (ocpgroup.ma): mine sites, processing platforms, pipeline',
              'OCP Group — Wikipedia: corporate history, revenue, timeline, Khouribga, Jorf Lasfar',
              'Deloitte — Phosphates and the Future of Energy Transition (2025): revenue breakdown, market share, TSP expansion',
              'African Development Bank — Phosphate Critical Mineral Insights (2025): HHI concentration, value chain, employment',
              'BC Insight — Phosphate Production in North Africa (2025): production volumes, Jordan comparison, TSP capacity',
              'USGS — The Mineral Industry of Morocco 2020–2021: reserves 70%, world ranking, mining centers',
              'Frontiers in Environmental Science — Phosphate Mined Lands Restoration (2025): basin reserve distribution',
              'Bus Ex — Phosphate Forward: Khouribga Mine (2024): 26 Bt Ouled Abdoun, slurry pipeline, Fortescue JV',
              'Investing News — Top 10 Phosphate Countries by Production (2025): 30 Mt production, 50 Bt reserves',
            ].map((s, i) => (
              <p key={i} className="text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</p>
            ))}
          </div>
          <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
            <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} Dancing with Lions. All rights reserved.</p>
            <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>This visualization may not be reproduced without visible attribution.</p>
            <p className="font-serif text-[18px] italic mt-2" style={{ color: '#F59E0B' }}>Sources: OCP Group, USGS, World Bank</p>
          </div>
          <div className="mt-6">
            <Link href="/data" className="text-[11px] uppercase tracking-[0.08em] font-medium pb-1 hover:opacity-60 transition-opacity" style={{ color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
              ← All Data Modules
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
