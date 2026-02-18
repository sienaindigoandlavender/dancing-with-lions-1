'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── Morocco 2024 Census Data by Region ───
// Source: Haut-Commissariat au Plan (HCP), Census 2024

interface RegionData {
  id: string
  name: string
  capital: string
  population: number
  area: number
  density: number
  growthRate: number
}

const REGIONS: RegionData[] = [
  { id: 'tanger', name: 'Tanger-Tétouan-Al Hoceima', capital: 'Tanger', population: 4030, area: 17262, density: 233.5, growthRate: 1.25 },
  { id: 'oriental', name: 'Oriental', capital: 'Oujda', population: 2295, area: 66608, density: 34.5, growthRate: 0.42 },
  { id: 'fes', name: 'Fès-Meknès', capital: 'Fès', population: 4468, area: 38744, density: 115.3, growthRate: 0.54 },
  { id: 'rabat', name: 'Rabat-Salé-Kénitra', capital: 'Rabat', population: 5133, area: 17831, density: 287.8, growthRate: 1.14 },
  { id: 'beni', name: 'Béni Mellal-Khénifra', capital: 'Béni Mellal', population: 2526, area: 26984, density: 93.6, growthRate: 0.34 },
  { id: 'casa', name: 'Casablanca-Settat', capital: 'Casablanca', population: 7689, area: 20111, density: 382.3, growthRate: 1.08 },
  { id: 'marrakech', name: 'Marrakech-Safi', capital: 'Marrakech', population: 4893, area: 39058, density: 125.3, growthRate: 0.79 },
  { id: 'draa', name: 'Drâa-Tafilalet', capital: 'Errachidia', population: 1656, area: 87703, density: 18.9, growthRate: 0.48 },
  { id: 'souss', name: 'Souss-Massa', capital: 'Agadir', population: 3020, area: 53444, density: 56.5, growthRate: 1.21 },
  { id: 'guelmim', name: 'Guelmim-Oued Noun', capital: 'Guelmim', population: 449, area: 50245, density: 8.9, growthRate: 0.95 },
  { id: 'laayoune', name: 'Laâyoune-Sakia El Hamra', capital: 'Laâyoune', population: 442, area: 140018, density: 3.2, growthRate: 2.54 },
  { id: 'dakhla', name: 'Dakhla-Oued Ed-Dahab', capital: 'Dakhla', population: 220, area: 142865, density: 1.5, growthRate: 4.13 },
]

const totalPopulation = REGIONS.reduce((sum, r) => sum + r.population, 0)
const maxDensity = Math.max(...REGIONS.map(r => r.density))

// Color scale: sand → amber → rust → deep brown
function densityColor(density: number): string {
  const logMin = Math.log(1)
  const logMax = Math.log(400)
  const t = Math.max(0, Math.min(1, (Math.log(Math.max(density, 1)) - logMin) / (logMax - logMin)))

  if (t < 0.25) {
    const s = t / 0.25
    return `rgb(${Math.round(245 - s * 20)},${Math.round(235 - s * 50)},${Math.round(220 - s * 80)})`
  } else if (t < 0.5) {
    const s = (t - 0.25) / 0.25
    return `rgb(${Math.round(225 - s * 30)},${Math.round(185 - s * 45)},${Math.round(140 - s * 50)})`
  } else if (t < 0.75) {
    const s = (t - 0.5) / 0.25
    return `rgb(${Math.round(195 - s * 50)},${Math.round(140 - s * 50)},${Math.round(90 - s * 40)})`
  } else {
    const s = (t - 0.75) / 0.25
    return `rgb(${Math.round(145 - s * 85)},${Math.round(90 - s * 55)},${Math.round(50 - s * 25)})`
  }
}

// Simplified SVG paths for Morocco's 12 regions
const REGION_PATHS: Record<string, string> = {
  tanger:    'M 160,20 L 280,15 310,45 320,90 280,120 230,130 180,110 140,85 130,55 Z',
  oriental:  'M 310,45 L 420,30 500,60 520,150 490,220 430,230 370,200 320,160 320,90 Z',
  fes:       'M 230,130 L 280,120 320,160 370,200 350,260 290,270 240,240 200,200 190,160 Z',
  rabat:     'M 130,55 L 180,110 230,130 190,160 170,200 140,220 100,190 90,140 100,90 Z',
  beni:      'M 200,200 L 240,240 290,270 310,320 270,350 220,340 180,300 170,250 Z',
  casa:      'M 100,190 L 140,220 170,250 180,300 160,340 120,350 80,310 60,260 70,220 Z',
  marrakech: 'M 80,310 L 120,350 160,340 220,340 240,380 220,430 170,450 110,430 60,390 50,340 Z',
  draa:      'M 290,270 L 350,260 430,230 490,220 500,300 480,400 430,450 350,440 300,400 280,340 310,320 Z',
  souss:     'M 50,340 L 110,430 170,450 200,490 180,540 130,560 80,530 40,470 30,400 Z',
  guelmim:   'M 30,400 L 80,530 130,560 140,610 100,640 50,630 20,580 10,500 Z',
  laayoune:  'M 10,500 L 50,630 100,640 150,660 160,720 170,800 120,830 60,810 20,750 0,650 Z',
  dakhla:    'M 0,650 L 60,810 120,830 140,900 120,960 80,980 40,950 10,880 0,780 Z',
}

const LABEL_POSITIONS: Record<string, { x: number; y: number }> = {
  tanger:    { x: 230, y: 65 },
  oriental:  { x: 420, y: 130 },
  fes:       { x: 280, y: 195 },
  rabat:     { x: 135, y: 155 },
  beni:      { x: 235, y: 280 },
  casa:      { x: 115, y: 270 },
  marrakech: { x: 150, y: 385 },
  draa:      { x: 395, y: 340 },
  souss:     { x: 110, y: 480 },
  guelmim:   { x: 70, y: 570 },
  laayoune:  { x: 90, y: 720 },
  dakhla:    { x: 75, y: 880 },
}

export default function MoroccoPopulationPage() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hoveredData = hoveredRegion ? REGIONS.find(r => r.id === hoveredRegion) : null

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="max-w-wide mx-auto px-6 md:px-10 pt-section pb-8">
        <p className="micro-label mb-4">Data Module 002</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] text-dwl-black leading-[0.95]">
          Population<br /><em>Density</em>
        </h1>
        <p className="text-[15px] text-dwl-body mt-6 max-w-[520px] leading-relaxed">
          Where Morocco&apos;s 36.8 million people actually live.
          Hover over each region for census data from the 2024 national count.
        </p>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* Headline */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <div>
            <span className="font-serif text-[56px] md:text-[72px] text-dwl-black italic leading-none">36.8</span>
            <span className="text-[13px] text-dwl-muted ml-2">million</span>
          </div>
          <div>
            <span className="font-serif text-[56px] md:text-[72px] text-dwl-black italic leading-none">12</span>
            <span className="text-[13px] text-dwl-muted ml-2">regions</span>
          </div>
          <div>
            <span className="font-serif text-[56px] md:text-[72px] text-dwl-black italic leading-none">382</span>
            <span className="text-[13px] text-dwl-muted ml-2">peak density/km²</span>
          </div>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* Map + Tooltip */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section" ref={mapRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <svg viewBox="-20 -10 560 1010" className="w-full h-auto" style={{ maxHeight: '75vh' }}>
              {REGIONS.map((region, i) => {
                const path = REGION_PATHS[region.id]
                if (!path) return null
                const isHovered = hoveredRegion === region.id
                return (
                  <g key={region.id}>
                    <path
                      d={path}
                      fill={densityColor(region.density)}
                      stroke="#ffffff"
                      strokeWidth={isHovered ? 2.5 : 1.2}
                      className="transition-all duration-300 cursor-pointer"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transitionDelay: `${i * 80}ms`,
                        filter: isHovered ? 'brightness(0.85)' : 'none',
                      }}
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => setHoveredRegion(hoveredRegion === region.id ? null : region.id)}
                    />
                    {LABEL_POSITIONS[region.id] && (
                      <text
                        x={LABEL_POSITIONS[region.id].x}
                        y={LABEL_POSITIONS[region.id].y}
                        textAnchor="middle"
                        className="pointer-events-none select-none"
                        style={{
                          fontSize: '11px',
                          fontFamily: 'IBM Plex Mono, monospace',
                          fill: region.density > 100 ? '#ffffff' : '#525252',
                          opacity: isVisible ? (isHovered ? 1 : 0.7) : 0,
                          fontWeight: isHovered ? 600 : 400,
                          transitionDelay: `${i * 80 + 200}ms`,
                          transition: 'opacity 0.5s ease, font-weight 0.2s ease',
                        }}
                      >
                        {region.capital}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            {hoveredData ? (
              <div className="transition-all duration-300">
                <p className="text-[11px] uppercase tracking-[0.12em] text-dwl-gray font-medium mb-2">
                  {hoveredData.name}
                </p>
                <p className="font-serif text-[64px] text-dwl-black italic leading-none">
                  {hoveredData.density.toFixed(1)}
                </p>
                <p className="text-[13px] text-dwl-muted mt-1 mb-8">people per km²</p>

                <div className="space-y-4">
                  {[
                    ['Population', `${(hoveredData.population / 1000).toFixed(1)}M`],
                    ['Area', `${hoveredData.area.toLocaleString()} km²`],
                    ['Capital', hoveredData.capital],
                    ['Growth rate', `${hoveredData.growthRate}% /yr`],
                    ['Share of national', `${((hoveredData.population / totalPopulation) * 100).toFixed(1)}%`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between border-b border-dwl-border pb-3">
                      <span className="text-[13px] text-dwl-gray">{label}</span>
                      <span className="text-[13px] text-dwl-black font-medium tabular-nums">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="h-[6px] bg-dwl-light w-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${(hoveredData.density / maxDensity) * 100}%`,
                        backgroundColor: densityColor(hoveredData.density),
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-dwl-muted">0</span>
                    <span className="text-[10px] text-dwl-muted">{maxDensity.toFixed(0)}/km²</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center lg:text-left py-12 lg:py-24">
                <p className="text-[13px] text-dwl-muted">Hover or tap a region</p>
                <p className="font-serif text-[22px] text-dwl-black italic mt-2">to explore the data</p>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 max-w-[400px]">
          <p className="text-[11px] uppercase tracking-[0.12em] text-dwl-gray font-medium mb-3">
            Density (people per km²)
          </p>
          <div className="flex h-[12px] overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => {
              const density = Math.exp(Math.log(1) + (i / 39) * (Math.log(400) - Math.log(1)))
              return <div key={i} className="flex-1" style={{ backgroundColor: densityColor(density) }} />
            })}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-dwl-muted">1.5</span>
            <span className="text-[10px] text-dwl-muted">50</span>
            <span className="text-[10px] text-dwl-muted">100</span>
            <span className="text-[10px] text-dwl-muted">200</span>
            <span className="text-[10px] text-dwl-muted">382</span>
          </div>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* Top 5 Ranking */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <p className="micro-label mb-8">By Population</p>
        {[...REGIONS]
          .sort((a, b) => b.population - a.population)
          .slice(0, 5)
          .map((region, i) => (
            <div key={region.id} className="flex items-center gap-4 py-4 border-b border-dwl-border">
              <span className="text-[11px] text-dwl-muted font-medium w-[24px] tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <p className="text-[14px] text-dwl-black font-medium">{region.name}</p>
                  <p className="font-serif text-[24px] text-dwl-black italic leading-none">
                    {(region.population / 1000).toFixed(1)}M
                  </p>
                </div>
                <div className="mt-2 h-[4px] bg-dwl-light overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: `${(region.population / 7689) * 100}%`,
                      backgroundColor: densityColor(region.density),
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
      </section>

      {/* Sources */}
      <section className="bg-dwl-offwhite">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
          <div className="max-w-[640px]">
            <p className="micro-label mb-4">Source</p>
            <p className="text-[11px] text-dwl-gray">
              Haut-Commissariat au Plan (HCP), Recensement Général de la Population et de l&apos;Habitat 2024
            </p>
            <div className="mt-8 pt-6 border-t border-dwl-border">
              <p className="text-[11px] text-dwl-black font-medium">
                &copy; {new Date().getFullYear()} Dancing with Lions. All rights reserved.
              </p>
              <p className="text-[11px] text-dwl-gray mt-1">
                This visualization may not be reproduced without visible attribution.
              </p>
              <p className="font-serif text-[16px] text-dwl-black italic mt-2">Source: Dancing with Lions</p>
            </div>
            <div className="mt-6">
              <Link href="/data" className="text-[11px] uppercase tracking-[0.08em] font-medium text-dwl-black border-b border-dwl-black pb-1 hover:opacity-60 transition-opacity">
                ← All Data Modules
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
