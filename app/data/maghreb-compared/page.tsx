'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Data (World Bank, IMF, UN — 2024) ───

const COUNTRIES = {
  morocco: {
    name: 'Morocco',
    flag: '🇲🇦',
    color: '#0a0a0a',
    colorLight: '#d4d4d4',
    population: 38.7,
    gdp: 160.6,
    gdpPerCapita: 4153,
    gdpGrowth: 3.8,
    unemployment: 13.0,
    inflation: 1.1,
    touristArrivals: 14.5,
    tourismGdpPercent: 7,
    fdi: 1.0,
    internet: 91,
    medianAge: 30.0,
    urbanization: 65,
    remittances: 7.8,
    hdiScore: 0.698,
    hdiRank: 120,
    co2: 1.8,
    womenParliament: 24,
  },
  tunisia: {
    name: 'Tunisia',
    flag: '🇹🇳',
    color: '#525252',
    colorLight: '#e5e5e5',
    population: 12.4,
    gdp: 51.3,
    gdpPerCapita: 4142,
    gdpGrowth: 1.6,
    unemployment: 16.2,
    inflation: 7.2,
    touristArrivals: 10.3,
    tourismGdpPercent: 14,
    fdi: 1.5,
    internet: 72,
    medianAge: 33.4,
    urbanization: 70,
    remittances: 6.3,
    hdiScore: 0.731,
    hdiRank: 101,
    co2: 2.6,
    womenParliament: 16,
  },
  algeria: {
    name: 'Algeria',
    flag: '🇩🇿',
    color: '#737373',
    colorLight: '#f0f0f0',
    population: 46.8,
    gdp: 269.3,
    gdpPerCapita: 5753,
    gdpGrowth: 3.7,
    unemployment: 12.3,
    inflation: 4.3,
    touristArrivals: 0.2,
    tourismGdpPercent: 1,
    fdi: 0.5,
    internet: 77,
    medianAge: 28.9,
    urbanization: 75,
    remittances: 0.9,
    hdiScore: 0.745,
    hdiRank: 93,
    co2: 3.7,
    womenParliament: 8,
  },
}

const countries = [COUNTRIES.morocco, COUNTRIES.tunisia, COUNTRIES.algeria]

// ─── Utility: Proportional bar width ───
function barWidth(value: number, max: number): string {
  return `${Math.max((value / max) * 100, 2)}%`
}

// ─── Animate on scroll hook ───
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

// ─── Proportional Bar Chart Component ───
function ProportionalBars({
  label,
  unit,
  data,
  max,
  note,
}: {
  label: string
  unit: string
  data: { name: string; value: number; color: string }[]
  max: number
  note?: string
}) {
  const { ref, inView } = useInView()

  return (
    <div ref={ref} className="py-10 border-b border-dwl-border">
      <div className="flex items-baseline justify-between mb-6">
        <p className="text-[11px] uppercase tracking-[0.12em] text-dwl-gray font-medium">{label}</p>
        {note && <p className="text-[11px] text-dwl-muted">{note}</p>}
      </div>
      <div className="space-y-4">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-4">
            <div className="w-[80px] md:w-[100px] shrink-0 text-right">
              <span className="font-serif text-[24px] md:text-[32px] text-dwl-black italic leading-none">
                {typeof d.value === 'number' && d.value < 1
                  ? d.value.toFixed(1)
                  : d.value % 1 === 0
                    ? d.value.toFixed(0)
                    : d.value.toFixed(1)}
              </span>
              <span className="text-[11px] text-dwl-muted ml-1">{unit}</span>
            </div>
            <div className="flex-1 relative h-[40px] md:h-[48px] bg-dwl-light overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out"
                style={{
                  width: inView ? barWidth(d.value, max) : '0%',
                  backgroundColor: d.color,
                  transitionDelay: `${i * 150}ms`,
                }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-dwl-gray font-medium">
                {d.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Dot Matrix Component (for percentages) ───
function DotMatrix({
  label,
  data,
  note,
}: {
  label: string
  data: { name: string; value: number; color: string }[]
  note?: string
}) {
  const { ref, inView } = useInView()
  const totalDots = 20

  return (
    <div ref={ref} className="py-10 border-b border-dwl-border">
      <div className="flex items-baseline justify-between mb-6">
        <p className="text-[11px] uppercase tracking-[0.12em] text-dwl-gray font-medium">{label}</p>
        {note && <p className="text-[11px] text-dwl-muted">{note}</p>}
      </div>
      <div className="space-y-6">
        {data.map((d, countryIdx) => {
          const filledDots = Math.round((d.value / 100) * totalDots)
          return (
            <div key={d.name} className="flex items-center gap-4">
              <div className="w-[80px] md:w-[100px] shrink-0 text-right">
                <span className="font-serif text-[24px] md:text-[32px] text-dwl-black italic leading-none">
                  {d.value}
                </span>
                <span className="text-[11px] text-dwl-muted ml-1">%</span>
              </div>
              <div className="flex-1">
                <div className="flex gap-[3px] md:gap-1 items-center">
                  {Array.from({ length: totalDots }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[16px] md:h-[20px] flex-1 transition-all duration-500"
                      style={{
                        backgroundColor: i < filledDots ? d.color : '#f0f0f0',
                        opacity: inView ? 1 : 0,
                        transitionDelay: `${countryIdx * 100 + i * 30}ms`,
                      }}
                    />
                  ))}
                </div>
                <p className="text-[12px] text-dwl-gray mt-1">{d.name}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Stat Card Grid ───
function StatGrid({
  label,
  stats,
}: {
  label: string
  stats: { country: string; value: string; sub?: string }[]
}) {
  const { ref, inView } = useInView()

  return (
    <div ref={ref} className="py-10 border-b border-dwl-border">
      <p className="text-[11px] uppercase tracking-[0.12em] text-dwl-gray font-medium mb-6">{label}</p>
      <div className="grid grid-cols-3 gap-px bg-dwl-border">
        {stats.map((s, i) => (
          <div
            key={s.country}
            className="bg-white p-4 md:p-6 text-center transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(12px)',
              transitionDelay: `${i * 120}ms`,
            }}
          >
            <p className="font-serif text-[32px] md:text-[44px] text-dwl-black italic leading-none">
              {s.value}
            </p>
            {s.sub && <p className="text-[11px] text-dwl-muted mt-1">{s.sub}</p>}
            <p className="text-[12px] text-dwl-gray mt-2 font-medium">{s.country}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Page ───

export default function MaghrebComparedPage() {
  const maxPop = 46.8
  const maxGdp = 269.3
  const maxTourists = 14.5
  const maxGdpPc = 5753

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="max-w-wide mx-auto px-6 md:px-10 pt-section pb-8">
        <p className="micro-label mb-4">Data Module 001</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] text-dwl-black leading-[0.95]">
          The Maghreb<br /><em>Compared</em>
        </h1>
        <p className="text-[15px] text-dwl-body mt-6 max-w-[520px] leading-relaxed">
          Morocco, Tunisia, and Algeria — the overview that doesn&apos;t exist
          in one place. Every number from the World Bank, IMF, and UN (2024).
        </p>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* ═══ HEADLINE NUMBERS ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10 pt-section pb-4">
        <p className="micro-label mb-2">Combined Maghreb</p>
        <div className="flex flex-wrap items-baseline gap-x-12 gap-y-4">
          <div>
            <span className="font-serif text-[64px] md:text-[96px] text-dwl-black italic leading-none">97.9</span>
            <span className="text-[13px] text-dwl-muted ml-2">million people</span>
          </div>
          <div>
            <span className="font-serif text-[48px] md:text-[72px] text-dwl-black italic leading-none">$481</span>
            <span className="text-[13px] text-dwl-muted ml-2">billion GDP</span>
          </div>
        </div>
      </section>

      {/* ═══ POPULATION ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <ProportionalBars
          label="Population"
          unit="M"
          max={maxPop}
          data={countries.map(c => ({ name: c.name, value: c.population, color: c.color }))}
          note="2024 est."
        />
      </section>

      {/* ═══ GDP ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <ProportionalBars
          label="GDP (nominal)"
          unit="$B"
          max={maxGdp}
          data={countries.map(c => ({ name: c.name, value: c.gdp, color: c.color }))}
          note="2024, current US$"
        />
      </section>

      {/* ═══ GDP PER CAPITA ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <ProportionalBars
          label="GDP per capita"
          unit="$"
          max={maxGdpPc}
          data={countries.map(c => ({ name: c.name, value: c.gdpPerCapita, color: c.color }))}
        />
      </section>

      {/* ═══ GDP GROWTH + INFLATION + UNEMPLOYMENT ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <StatGrid
          label="GDP Growth"
          stats={countries.map(c => ({
            country: c.name,
            value: `${c.gdpGrowth}%`,
          }))}
        />
        <StatGrid
          label="Unemployment"
          stats={countries.map(c => ({
            country: c.name,
            value: `${c.unemployment}%`,
          }))}
        />
        <StatGrid
          label="Inflation"
          stats={countries.map(c => ({
            country: c.name,
            value: `${c.inflation}%`,
          }))}
        />
      </section>

      {/* ═══ TOURIST ARRIVALS ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <ProportionalBars
          label="Tourist Arrivals"
          unit="M"
          max={maxTourists}
          data={countries.map(c => ({ name: c.name, value: c.touristArrivals, color: c.color }))}
          note="2024 annual"
        />
      </section>

      {/* ═══ TOURISM % GDP ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <StatGrid
          label="Tourism as % of GDP"
          stats={countries.map(c => ({
            country: c.name,
            value: `~${c.tourismGdpPercent}%`,
          }))}
        />
      </section>

      {/* ═══ INTERNET PENETRATION ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <DotMatrix
          label="Internet Users"
          data={countries.map(c => ({ name: c.name, value: c.internet, color: c.color }))}
          note="% of population, 2023"
        />
      </section>

      {/* ═══ URBANIZATION ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <DotMatrix
          label="Urbanization"
          data={countries.map(c => ({ name: c.name, value: c.urbanization, color: c.color }))}
          note="% living in urban areas"
        />
      </section>

      {/* ═══ MEDIAN AGE ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <StatGrid
          label="Median Age"
          stats={countries.map(c => ({
            country: c.name,
            value: `${c.medianAge}`,
            sub: 'years',
          }))}
        />
      </section>

      {/* ═══ HDI ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <StatGrid
          label="Human Development Index"
          stats={countries.map(c => ({
            country: c.name,
            value: `${c.hdiScore}`,
            sub: `Rank ${c.hdiRank}`,
          }))}
        />
      </section>

      {/* ═══ REMITTANCES ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <ProportionalBars
          label="Remittances"
          unit="% GDP"
          max={7.8}
          data={countries.map(c => ({ name: c.name, value: c.remittances, color: c.color }))}
          note="Personal remittances received"
        />
      </section>

      {/* ═══ FDI ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <StatGrid
          label="Foreign Direct Investment (% of GDP)"
          stats={countries.map(c => ({
            country: c.name,
            value: `${c.fdi}%`,
          }))}
        />
      </section>

      {/* ═══ CO2 ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10">
        <StatGrid
          label="CO₂ Emissions per Capita"
          stats={countries.map(c => ({
            country: c.name,
            value: `${c.co2}t`,
          }))}
        />
      </section>

      {/* ═══ WOMEN IN PARLIAMENT ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10 mb-section">
        <StatGrid
          label="Women in Parliament"
          stats={countries.map(c => ({
            country: c.name,
            value: `${c.womenParliament}%`,
          }))}
        />
      </section>

      {/* ═══ SOURCES + COPYRIGHT ═══ */}
      <section className="bg-dwl-offwhite">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
          <div className="max-w-[640px]">
            <p className="micro-label mb-4">Sources</p>
            <div className="space-y-1">
              {[
                'World Bank Open Data (2024)',
                'IMF World Economic Outlook (October 2025)',
                'UNDP Human Development Report (2024)',
                'UN World Tourism Organization (2024)',
                'UN Population Division (2024 Revision)',
              ].map((source, i) => (
                <p key={i} className="text-[11px] text-dwl-gray">{source}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-dwl-border">
              <p className="text-[11px] text-dwl-black font-medium">
                &copy; {new Date().getFullYear()} Dancing with Lions. All rights reserved.
              </p>
              <p className="text-[11px] text-dwl-gray mt-1">
                This visualization may not be reproduced without visible attribution.
              </p>
              <p className="font-serif text-[16px] text-dwl-black italic mt-2">
                Source: Dancing with Lions
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="/data"
                className="text-[11px] uppercase tracking-[0.08em] font-medium text-dwl-black border-b border-dwl-black pb-1 hover:opacity-60 transition-opacity"
              >
                ← All Data Modules
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
