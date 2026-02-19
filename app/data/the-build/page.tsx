'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

const C = {
  highway: '#A0522D',
  rail: '#2D6E4F',
  airport: '#5D3A5E',
  hotel: '#6B7F5E',
  tourism: '#C17F28',
  ink: '#0a0a0a',
  body: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  faint: '#f5f5f5',
  morocco: '#8B3A3A',
  worldcup: '#722F37',
}

// ═══ YEAR-BY-YEAR DATA ═══
// Compiled from ADM, ONCF, ONDA, Ministry of Tourism, World Bank, MASEN

interface YearData {
  year: number
  highway: number      // total km of autoroute
  rail: number         // total railway km (conventional + HSR)
  hsrKm: number        // HSR specifically
  airportCap: number   // annual passenger capacity (millions)
  hotelRooms: number   // thousands of rooms
  tourists: number     // millions of arrivals
  event?: string       // notable event
}

const DATA: YearData[] = [
  { year: 2004, highway: 560, rail: 2110, hsrKm: 0, airportCap: 12, hotelRooms: 120, tourists: 5.5 },
  { year: 2005, highway: 610, rail: 2110, hsrKm: 0, airportCap: 13, hotelRooms: 125, tourists: 5.8 },
  { year: 2006, highway: 750, rail: 2120, hsrKm: 0, airportCap: 15, hotelRooms: 132, tourists: 6.6, event: 'Vision 2010 tourism plan accelerates' },
  { year: 2007, highway: 870, rail: 2120, hsrKm: 0, airportCap: 16, hotelRooms: 140, tourists: 7.4 },
  { year: 2008, highway: 920, rail: 2130, hsrKm: 0, airportCap: 18, hotelRooms: 150, tourists: 7.9 },
  { year: 2009, highway: 1000, rail: 2130, hsrKm: 0, airportCap: 19, hotelRooms: 158, tourists: 8.3, event: 'National Energy Strategy launched. Noor solar plan announced.' },
  { year: 2010, highway: 1100, rail: 2140, hsrKm: 0, airportCap: 20, hotelRooms: 165, tourists: 9.3, event: '10M tourist target reached. Tanger-Med port opens.' },
  { year: 2011, highway: 1200, rail: 2150, hsrKm: 0, airportCap: 21, hotelRooms: 170, tourists: 9.3, event: 'Arab Spring protests. New constitution adopted.' },
  { year: 2012, highway: 1300, rail: 2150, hsrKm: 0, airportCap: 22, hotelRooms: 178, tourists: 9.4, event: 'HSR construction begins (Tangier-Kénitra)' },
  { year: 2013, highway: 1400, rail: 2160, hsrKm: 0, airportCap: 23, hotelRooms: 185, tourists: 10.0 },
  { year: 2014, highway: 1500, rail: 2170, hsrKm: 0, airportCap: 24, hotelRooms: 192, tourists: 10.3, event: 'Tarfaya wind farm opens — Africa\'s largest' },
  { year: 2015, highway: 1600, rail: 2170, hsrKm: 0, airportCap: 25, hotelRooms: 198, tourists: 10.2 },
  { year: 2016, highway: 1650, rail: 2180, hsrKm: 0, airportCap: 27, hotelRooms: 205, tourists: 10.3, event: 'Noor Ouarzazate I commissioned — world\'s largest CSP' },
  { year: 2017, highway: 1700, rail: 2200, hsrKm: 0, airportCap: 28, hotelRooms: 210, tourists: 11.3 },
  { year: 2018, highway: 1750, rail: 2400, hsrKm: 200, airportCap: 29, hotelRooms: 215, tourists: 12.3, event: 'Al Boraq HSR opens — Africa\'s first high-speed train' },
  { year: 2019, highway: 1800, rail: 2400, hsrKm: 200, airportCap: 31, hotelRooms: 225, tourists: 13.1 },
  { year: 2020, highway: 1810, rail: 2400, hsrKm: 200, airportCap: 31, hotelRooms: 228, tourists: 2.8, event: 'COVID-19. Borders close. Tourism collapses 79%.' },
  { year: 2021, highway: 1820, rail: 2400, hsrKm: 200, airportCap: 32, hotelRooms: 230, tourists: 3.7 },
  { year: 2022, highway: 1840, rail: 2400, hsrKm: 200, airportCap: 33, hotelRooms: 240, tourists: 11.0, event: 'World Cup semifinal in Qatar. Morocco makes history.' },
  { year: 2023, highway: 1860, rail: 2410, hsrKm: 200, airportCap: 35, hotelRooms: 255, tourists: 14.5, event: 'World Cup 2030 bid confirmed. Earthquake relief.' },
  { year: 2024, highway: 1880, rail: 2420, hsrKm: 200, airportCap: 38, hotelRooms: 270, tourists: 17.4, event: 'Record tourism: 17.4M. AFCON stadium construction begins.' },
  { year: 2025, highway: 1950, rail: 2450, hsrKm: 200, airportCap: 42, hotelRooms: 280, tourists: 19.8, event: 'AFCON 2025 hosted. 9 stadiums delivered. $41B infrastructure budget.' },
  // PROJECTIONS 2026-2030
  { year: 2026, highway: 2100, rail: 2550, hsrKm: 350, airportCap: 50, hotelRooms: 295, tourists: 21.0, event: 'HSR extension construction accelerates' },
  { year: 2027, highway: 2300, rail: 2650, hsrKm: 450, airportCap: 58, hotelRooms: 310, tourists: 22.5 },
  { year: 2028, highway: 2500, rail: 2800, hsrKm: 550, airportCap: 65, hotelRooms: 315, tourists: 23.5, event: 'Hassan II Stadium (115K) complete. HSR reaches Casablanca.' },
  { year: 2029, highway: 2750, rail: 2900, hsrKm: 600, airportCap: 72, hotelRooms: 322, tourists: 24.5, event: 'HSR reaches Marrakech. Tangier to Marrakech in 2h40m.' },
  { year: 2030, highway: 3000, rail: 3000, hsrKm: 630, airportCap: 80, hotelRooms: 330, tourists: 26.0, event: '2030 FIFA WORLD CUP. 52% renewable energy. 26M tourists.' },
]

const TRACKS = [
  { key: 'highway' as const, label: 'Highway (km)', color: C.highway, max: 3200, unit: 'km', format: (v: number) => `${v.toLocaleString()} km` },
  { key: 'rail' as const, label: 'Railway (km)', color: C.rail, max: 3200, unit: 'km', format: (v: number) => `${v.toLocaleString()} km` },
  { key: 'airportCap' as const, label: 'Airport Capacity (M pax/yr)', color: C.airport, max: 85, unit: 'M', format: (v: number) => `${v}M` },
  { key: 'hotelRooms' as const, label: 'Hotel Rooms (thousands)', color: C.hotel, max: 350, unit: 'K', format: (v: number) => `${v}K` },
  { key: 'tourists' as const, label: 'Tourist Arrivals (millions)', color: C.tourism, max: 28, unit: 'M', format: (v: number) => `${v.toFixed(1)}M` },
]

export default function TheBuildPage() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const play = useCallback(() => {
    setIsPlaying(true)
    setHasStarted(true)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const reset = useCallback(() => {
    setIsPlaying(false)
    setCurrentIdx(0)
    setHasStarted(false)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIdx(prev => {
          if (prev >= DATA.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 700)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const current = DATA[currentIdx]
  const isProjection = current.year >= 2026
  const isWorldCup = current.year === 2030
  const barW = 900 / DATA.length

  return (
    <div className="min-h-screen pt-16 bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 pb-8">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 013 · Infrastructure Timeline</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>The Build</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          Watch a country construct itself
        </p>
        <p className="text-[13px] max-w-[600px] leading-[1.7] mt-4 mb-8" style={{ color: C.body }}>
          Twenty-seven years of infrastructure. Highway kilometers, railway lines,
          airport capacity, hotel rooms, tourist arrivals — each year stacks on the last.
          Press play. Watch the bars accumulate. Then watch what happens when a
          country decides to host the World Cup.
        </p>

        {/* Play controls */}
        <div className="flex items-center gap-4 mb-6">
          {!hasStarted ? (
            <button onClick={play}
              className="px-6 py-2.5 text-[11px] uppercase tracking-widest transition-all"
              style={{ background: C.ink, color: '#fff', border: `1px solid ${C.ink}` }}>
              ▶ Play Timeline
            </button>
          ) : (
            <>
              <button onClick={isPlaying ? pause : play}
                className="px-4 py-2 text-[11px] uppercase tracking-widest transition-all"
                style={{ background: isPlaying ? C.worldcup : C.ink, color: '#fff', border: `1px solid ${isPlaying ? C.worldcup : C.ink}` }}>
                {isPlaying ? '❚❚ Pause' : '▶ Play'}
              </button>
              <button onClick={reset}
                className="px-4 py-2 text-[11px] uppercase tracking-widest"
                style={{ color: C.muted, border: `1px solid ${C.border}` }}>
                Reset
              </button>
            </>
          )}
        </div>

        {/* Year scrubber */}
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={DATA.length - 1}
            value={currentIdx}
            onChange={e => { setCurrentIdx(Number(e.target.value)); setHasStarted(true); setIsPlaying(false) }}
            className="flex-1 h-1 appearance-none bg-gray-200 rounded-full accent-black cursor-pointer"
          />
          <span className="font-serif italic text-[32px] w-[80px] text-right"
            style={{ color: isWorldCup ? C.worldcup : isProjection ? C.muted : C.ink }}>
            {current.year}
          </span>
        </div>

        {/* Event banner */}
        <div className="h-[40px] flex items-center mt-2">
          {current.event && (
            <p className="text-[11px] px-3 py-1.5" style={{
              color: isWorldCup ? '#fff' : isProjection ? C.muted : C.body,
              background: isWorldCup ? C.worldcup : isProjection ? C.faint : '#FEFAF5',
              border: `1px solid ${isWorldCup ? C.worldcup : C.border}`,
              transition: 'all 0.3s',
            }}>
              {current.event}
            </p>
          )}
        </div>
      </section>

      {/* ═══ THE FIVE TRACKS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mt-4">
        {TRACKS.map(track => {
          const val = current[track.key]
          return (
            <div key={track.key} className="mb-6">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[10px] uppercase tracking-widest" style={{ color: track.color }}>{track.label}</span>
                <span className="font-serif italic text-[20px]" style={{ color: track.color, transition: 'all 0.3s' }}>
                  {track.format(val)}
                </span>
              </div>

              {/* Accumulation bar */}
              <div className="relative h-[36px] w-full" style={{ background: C.faint }}>
                {/* Year bars */}
                <svg viewBox={`0 0 ${DATA.length * barW} 36`} className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  {DATA.map((d, i) => {
                    if (i > currentIdx) return null
                    const v = d[track.key]
                    const h = (v / track.max) * 36
                    const isProj = d.year >= 2026
                    const isCurrent = i === currentIdx

                    return (
                      <rect key={d.year}
                        x={i * barW + 0.5}
                        y={36 - h}
                        width={barW - 1}
                        height={h}
                        fill={track.color}
                        opacity={isProj ? 0.35 : isCurrent ? 0.9 : 0.65}
                        style={{ transition: 'all 0.3s' }}
                      />
                    )
                  })}
                  {/* 2030 World Cup marker */}
                  {currentIdx >= DATA.length - 1 && (
                    <rect x={(DATA.length - 1) * barW} y={0} width={barW} height={36}
                      fill="none" stroke={C.worldcup} strokeWidth="2" />
                  )}
                </svg>

                {/* COVID dip label for tourism */}
                {track.key === 'tourists' && currentIdx >= 16 && (
                  <div className="absolute text-[7px] pointer-events-none" style={{
                    left: `${(16 / DATA.length) * 100}%`,
                    top: '2px',
                    color: C.worldcup,
                  }}>
                    COVID
                  </div>
                )}
              </div>

              {/* Year axis */}
              <div className="flex justify-between mt-0.5">
                {DATA.filter((_, i) => i % 5 === 0 || i === DATA.length - 1).map(d => (
                  <span key={d.year} className="text-[7px]" style={{
                    color: d.year >= 2026 ? C.muted : '#a3a3a3',
                    fontWeight: d.year === 2030 ? 700 : 400,
                  }}>
                    {d.year}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* ═══ CURRENT YEAR DASHBOARD ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mt-4">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {TRACKS.map(track => {
              const start = DATA[0][track.key]
              const now = current[track.key]
              const growth = ((now - start) / start * 100).toFixed(0)
              return (
                <div key={track.key} className="p-3" style={{ borderLeft: `3px solid ${track.color}` }}>
                  <p className="text-[9px] uppercase tracking-widest" style={{ color: C.muted }}>{track.label.split('(')[0].trim()}</p>
                  <p className="font-serif italic text-[22px] mt-1" style={{ color: track.color }}>
                    {track.format(now)}
                  </p>
                  <p className="text-[9px] mt-0.5" style={{ color: C.muted }}>
                    +{growth}% since 2004
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTION NOTE ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mt-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 mt-1 rounded-sm" style={{ background: C.ink, opacity: 0.65 }} />
            <div>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>Historical data (2004–2025)</p>
              <p className="text-[10px] mt-1" style={{ color: C.muted }}>ADM, ONCF, ONDA, Ministry of Tourism, World Bank</p>
            </div>
          </div>
          <div className="flex items-start gap-4 mt-2">
            <div className="w-3 h-3 mt-1 rounded-sm" style={{ background: C.ink, opacity: 0.35 }} />
            <div>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>Projections (2026–2030)</p>
              <p className="text-[10px] mt-1" style={{ color: C.muted }}>Government targets. 2026 budget allocation. ONCF rail plan. Vision 2030 tourism strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE STORY ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8 grid grid-cols-1 md:grid-cols-3 gap-8" style={{ borderColor: C.border }}>
          <div>
            <p className="micro-label mb-2" style={{ color: C.highway }}>The Roads</p>
            <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
              In 2004, Morocco had 560 kilometres of autoroute. By 2025: nearly 2,000.
              By 2030: 3,000 — more than doubling from where it stands today.
              The Continental Rabat-Casablanca highway alone will connect the two
              largest cities to the world&apos;s largest stadium. Construction started
              in 1975. The ambition accelerated in 2024.
            </p>
          </div>
          <div>
            <p className="micro-label mb-2" style={{ color: C.rail }}>The Rails</p>
            <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
              In 2018, Africa&apos;s first high-speed train launched between Tangier and
              Kénitra: 200 kilometres at 320 km/h. By 2029, the line extends to
              Marrakech — 630 km total. 168 new trains ordered from France, Spain,
              and South Korea. The single largest rail investment in Moroccan history.
              Tangier to Marrakech in 2 hours 40 minutes.
            </p>
          </div>
          <div>
            <p className="micro-label mb-2" style={{ color: C.tourism }}>The Arrivals</p>
            <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
              5.5 million tourists in 2004. 17.4 million in 2024. 26 million targeted
              for 2030. The COVID cliff of 2020 — dropping to 2.8 million — made the
              recovery look vertical. The 2022 World Cup semifinal put Morocco in
              every living room on Earth. The infrastructure is built for what comes next.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            Every bar in this chart is concrete, steel, and asphalt.
            Every year is thousands of workers, billions of dirhams,
            and a country that decided to build before it was asked.
          </p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: C.muted }}>
            Highway data: Autoroutes du Maroc (ADM) annual reports 2004–2025;
            Morocco Ministry of Equipment &amp; Water.
            Railway: Office National des Chemins de Fer (ONCF); $9.6B rail plan (2025).
            Airport capacity: Office National des Aéroports (ONDA); Mohammed V Terminal 3 project.
            Hotel rooms: Ministry of Tourism; Vision 2020/2030 strategies; government loan program data.
            Tourist arrivals: UNWTO; Ministry of Tourism; Trading Economics.
            2026–2030 projections based on government budget allocations (2026 Finance Law),
            ONCF rail plan, ADM 3,000km target, Vision 2030 tourism strategy, and
            World Cup infrastructure commitments.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: C.border }}>
              © {new Date().getFullYear()} Dancing with Lions. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.rail }}>
              Source: Dancing with Lions
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
