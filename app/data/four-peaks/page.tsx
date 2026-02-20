'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  toubkal: '#A0452E', saghro: '#C8A415', kili: '#2D6E4F', everest: '#1A4B8A',
}

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

// ═══ MOUNTAIN DATA ═══
interface Mountain {
  name: string; alt: string; elevation: number; prominence: number
  range: string; country: string; continent: string; color: string
  firstAscent: string; coordinates: string; climate: string
  trekDays: string; difficulty: string; bestSeason: string
  basecamp: number; deathZone: number | null; snowLine: number
  annualClimbers: string; successRate: string; fatalities: string
  geology: string; ecosystem: string[]; nearestCity: string
  distance: string; uniqueFact: string
}

const MOUNTAINS: Mountain[] = [
  {
    name: 'Jbel Saghro', alt: 'Amalou n\'Mansour', elevation: 2712, prominence: 1200,
    range: 'Anti-Atlas', country: 'Morocco', continent: 'Africa', color: C.saghro,
    firstAscent: 'Unknown (Aït Atta Berbers)', coordinates: '31°15\'N, 5°50\'W',
    climate: 'Semi-arid / Continental', trekDays: '5–8 days circuit', difficulty: 'Moderate trek',
    bestSeason: 'Oct–Apr (summer too hot)', basecamp: 1900, deathZone: null, snowLine: 2500,
    annualClimbers: '~2,000', successRate: '~95%', fatalities: 'Extremely rare',
    geology: 'Volcanic — igneous (granite, basalt). 120km massif sculpted over millions of years.',
    ecosystem: ['Desert scrub', 'Date palms in oases', 'Barbary macaque', 'Raptors', 'Goats'],
    nearestCity: 'Ouarzazate (100km)', distance: '~350km from Marrakech',
    uniqueFact: 'Driest range in the Atlas system. Only 100mm rain/year on southern slopes. The name "Saghro" means "drought" in Tamazight. Home of the Aït Atta — most powerful Berber tribe in southern Morocco from 17th–19th centuries.',
  },
  {
    name: 'Jbel Toubkal', alt: '', elevation: 4167, prominence: 3755,
    range: 'High Atlas', country: 'Morocco', continent: 'Africa', color: C.toubkal,
    firstAscent: '12 June 1923 (Marquis de Segonzac)', coordinates: '31°03\'N, 7°54\'W',
    climate: 'Mediterranean mountain / Alpine', trekDays: '2–3 days', difficulty: 'Non-technical (summer)',
    bestSeason: 'Apr–Jun, Sep–Nov', basecamp: 3207, deathZone: null, snowLine: 3500,
    annualClimbers: '~30,000', successRate: '~85%', fatalities: 'Rare (~1–2/year)',
    geology: 'Volcanic rock (within mostly sedimentary Atlas). Alpine crests, deep narrow valleys.',
    ecosystem: ['Holm oak forests', 'Atlas cedar', 'Red juniper', 'Alpine meadows', '150+ endemic flowers', 'Barbary macaque', 'Barbary sheep', 'Bearded vulture', 'Golden eagle'],
    nearestCity: 'Marrakech (60km)', distance: '~60km south of Marrakech',
    uniqueFact: 'Highest peak in North Africa, the Atlas Mountains, and the Arab world. Visible from Marrakech on clear days. A metal pyramidal trigonometric marker crowns the summit. Guide mandatory since 2019 following the Imlil incident.',
  },
  {
    name: 'Mount Kilimanjaro', alt: 'Uhuru Peak', elevation: 5895, prominence: 5885,
    range: 'Standalone (volcanic)', country: 'Tanzania', continent: 'Africa', color: C.kili,
    firstAscent: '6 Oct 1889 (Hans Meyer, Ludwig Purtscheller)', coordinates: '3°04\'S, 37°21\'E',
    climate: 'Five climate zones (tropical base to arctic summit)', trekDays: '5–9 days', difficulty: 'Non-technical (altitude is the challenge)',
    bestSeason: 'Jan–Mar, Jun–Oct', basecamp: 4703, deathZone: null, snowLine: 5000,
    annualClimbers: '~35,000–50,000', successRate: '~65%', fatalities: '~10/year',
    geology: 'Stratovolcano (dormant). Three volcanic cones: Kibo, Mawenzi, Shira. Last eruption ~360,000 years ago.',
    ecosystem: ['Tropical rainforest', 'Heath & moorland', 'Alpine desert', 'Arctic zone', 'Colobus monkey', 'Elephant', 'Buffalo (lower slopes)'],
    nearestCity: 'Moshi (30km)', distance: '~130km from Arusha',
    uniqueFact: 'Highest freestanding mountain on Earth (not part of a range). Five climate zones from base to summit. Glaciers retreating — may vanish by 2040s. Africa\'s highest point at 5,895m.',
  },
  {
    name: 'Mount Everest', alt: 'Sagarmatha / Chomolungma', elevation: 8849, prominence: 8849,
    range: 'Himalayas', country: 'Nepal / China', continent: 'Asia', color: C.everest,
    firstAscent: '29 May 1953 (Edmund Hillary, Tenzing Norgay)', coordinates: '27°59\'N, 86°55\'E',
    climate: 'Arctic / Extreme alpine', trekDays: '~60 days (expedition)', difficulty: 'Extreme (supplemental O₂ required)',
    bestSeason: 'Apr–May window', basecamp: 5364, deathZone: 8000, snowLine: 5500,
    annualClimbers: '~800–1,000 summiteers', successRate: '~55%', fatalities: '~5–10/year; ~310 total',
    geology: 'Marine limestone and metamorphic rock. Summit fossils from ancient Tethys Sea floor. Still rising ~4mm/year.',
    ecosystem: ['Barren above 6,000m', 'Alpine grassland (lower)', 'Snow leopard (rare)', 'Himalayan tahr', 'Bar-headed goose (migrating over summit)'],
    nearestCity: 'Namche Bazaar (trek); Lukla (flight)', distance: '~140km from Kathmandu',
    uniqueFact: 'Highest point on Earth. Summit fossils are from an ancient ocean floor. The "death zone" above 8,000m gives climbers hours, not days. Over 310 people have died on its slopes. More than 200 bodies remain on the mountain.',
  },
]

const maxElev = 8849

// ═══ ELEVATION PROFILE — SVG ═══
function ElevationProfile() {
  const [hovered, setHovered] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  const W = 800, H = 420
  const padL = 55, padR = 20, padT = 20, padB = 50
  const plotH = H - padT - padB
  const colW = (W - padL - padR) / 4

  const toY = (m: number) => padT + plotH - (m / (maxElev * 1.08)) * plotH

  // Altitude lines
  const altLines = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 8849]

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 500 }}
        onMouseLeave={() => setHovered(null)}>

        {/* Grid */}
        {altLines.map(a => {
          const y = toY(a)
          return (
            <g key={a}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke={C.border} strokeWidth="0.5" strokeDasharray={a === 8000 ? '4,2' : 'none'} />
              <text x={padL - 5} y={y + 3} textAnchor="end" className="font-mono"
                style={{ fontSize: 8, fill: a === 8000 ? C.everest : C.muted }}>
                {a === 8000 ? '8,000m ☠' : `${(a / 1000).toFixed(0)}k`}
              </text>
            </g>
          )
        })}

        {/* Death zone band */}
        <rect x={padL} y={toY(8849)} width={W - padL - padR} height={toY(8000) - toY(8849)}
          fill={C.everest} opacity="0.04" />
        <text x={W - padR - 5} y={toY(8400)} textAnchor="end" className="font-mono"
          style={{ fontSize: 7, fill: C.everest, fontStyle: 'italic', opacity: 0.5 }}>Death Zone</text>

        {/* Mountain silhouettes */}
        {MOUNTAINS.map((m, i) => {
          const cx = padL + colW * i + colW / 2
          const summitY = toY(m.elevation)
          const baseY = toY(0)
          const halfW = 40 + (m.elevation / maxElev) * 50
          const isHov = hovered === m.name

          // Snow line
          const snowY = toY(m.snowLine)

          // Simple triangular mountain profile
          const path = `M${cx - halfW},${baseY} L${cx - halfW * 0.3},${summitY + (baseY - summitY) * 0.35} L${cx},${summitY} L${cx + halfW * 0.25},${summitY + (baseY - summitY) * 0.3} L${cx + halfW},${baseY} Z`

          return (
            <g key={m.name}
              onMouseEnter={() => setHovered(m.name)} onMouseLeave={() => setHovered(null)}
              className="cursor-pointer">

              {/* Mountain body */}
              <path d={path} fill={m.color}
                opacity={isHov ? 0.18 : hovered ? 0.04 : 0.1}
                style={{ transition: 'opacity 0.4s, transform 0.8s',
                  transform: drawn ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: `${cx}px ${baseY}px` }} />
              <path d={path} fill="none" stroke={m.color}
                strokeWidth={isHov ? 1.5 : 0.8}
                opacity={isHov ? 0.8 : 0.3}
                style={{ transition: 'opacity 0.4s' }} />

              {/* Snow cap */}
              {m.snowLine < m.elevation && (
                <line x1={cx - 15} y1={snowY} x2={cx + 15} y2={snowY}
                  stroke="white" strokeWidth="1" opacity="0.6" strokeDasharray="2,2" />
              )}

              {/* Basecamp marker */}
              <circle cx={cx - halfW * 0.15} cy={toY(m.basecamp)} r={2.5}
                fill="white" stroke={m.color} strokeWidth="1" opacity="0.7" />
              {isHov && (
                <text x={cx - halfW * 0.15 - 5} y={toY(m.basecamp) - 5} textAnchor="end"
                  className="font-mono" style={{ fontSize: 6, fill: m.color }}>
                  Base {m.basecamp.toLocaleString()}m
                </text>
              )}

              {/* Summit label */}
              <text x={cx} y={summitY - 12} textAnchor="middle" className="font-mono"
                style={{ fontSize: isHov ? 14 : 11, fill: m.color, fontWeight: 700,
                  transition: 'font-size 0.3s' }}>
                {m.elevation.toLocaleString()}m
              </text>
              <text x={cx} y={summitY - 3} textAnchor="middle" className="font-mono"
                style={{ fontSize: 7, fill: m.color, opacity: 0.7 }}>
                {m.name}
              </text>

              {/* Name below */}
              <text x={cx} y={baseY + 14} textAnchor="middle" className="font-mono"
                style={{ fontSize: 9, fill: isHov ? m.color : C.muted, fontWeight: isHov ? 700 : 400 }}>
                {m.name}
              </text>
              <text x={cx} y={baseY + 24} textAnchor="middle" className="font-mono"
                style={{ fontSize: 7, fill: C.muted }}>
                {m.country}
              </text>
            </g>
          )
        })}

        {/* Marrakech sea level reference */}
        <text x={padL + 5} y={toY(0) - 4} className="font-mono" style={{ fontSize: 7, fill: C.muted, fontStyle: 'italic' }}>
          Sea level
        </text>
      </svg>
    </div>
  )
}

// ═══ COMPARISON BARS ═══
function CompBar({ label, values, unit, maxV }: { label: string; values: { name: string; v: number; color: string }[]; unit: string; maxV: number }) {
  const r = useReveal()
  return (
    <div ref={r.ref} className="mb-4">
      <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: C.muted }}>{label}</p>
      {values.map(v => (
        <div key={v.name} className="flex items-center gap-2 mb-0.5">
          <span className="font-mono text-[8px] w-20 shrink-0 text-right" style={{ color: v.color }}>{v.name}</span>
          <div className="flex-1 h-2.5 rounded-sm" style={{ background: `${C.border}30` }}>
            <div className="h-full rounded-sm transition-all duration-1000"
              style={{ width: r.vis ? `${(v.v / maxV) * 100}%` : '0%', background: v.color, opacity: 0.5 }} />
          </div>
          <span className="font-mono text-[9px] w-20 shrink-0" style={{ color: v.color }}>{v.v.toLocaleString()}{unit}</span>
        </div>
      ))}
    </div>
  )
}

// ═══ PAGE ═══
export default function FourPeaksPage() {
  const heroR = useReveal()
  const profR = useReveal()
  const cardR = useReveal()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 pt-36 pb-16">
        <Link href="/data" className="font-mono text-[10px] uppercase tracking-[0.12em] hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>← All Data Modules</Link>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Geography · Mountains · Scale Comparison</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.88] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>Four Peaks</em></h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] leading-[1.3]" style={{ color: C.muted }}>
            Morocco&apos;s mountains in the context of the world. From the drought-sculpted Saghro to the summit of Everest — four peaks, four scales of ambition.</p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Jbel Toubkal rises 4,167 metres above sea level — the highest point in North Africa,
          the Atlas Mountains, and the Arab world. Sixty kilometres from Marrakech, visible on
          clear days. Jbel Saghro, in the Anti-Atlas, reaches 2,712m — lower but wilder, drier,
          volcanic. Put them next to Kilimanjaro (5,895m, highest in Africa, a freestanding
          giant with five climate zones) and Everest (8,849m, highest on Earth, where the summit
          is made of fossilised ocean floor) and you begin to understand what mountains mean
          at different scales. Toubkal is a weekend from Marrakech. Kilimanjaro is a week-long
          expedition. Everest is a two-month campaign that kills people. The chart below draws
          them to scale.
        </p>
      </section>

      {/* ELEVATION PROFILE */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 py-8">
        <div ref={profR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.muted }}>Elevation Profile — To Scale</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            All four peaks drawn to the same vertical scale. Hover for details. Triangle markers show basecamp altitude.
          </p>
          <ElevationProfile />
        </div>
      </section>

      {/* COMPARISON BARS */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Comparative Data</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <CompBar label="Summit Elevation (metres)" unit="m"
              values={MOUNTAINS.map(m => ({ name: m.name.replace('Mount ', ''), v: m.elevation, color: m.color }))} maxV={maxElev} />
            <CompBar label="Topographic Prominence (metres)" unit="m"
              values={MOUNTAINS.map(m => ({ name: m.name.replace('Mount ', ''), v: m.prominence, color: m.color }))} maxV={8849} />
            <CompBar label="Basecamp Elevation (metres)" unit="m"
              values={MOUNTAINS.map(m => ({ name: m.name.replace('Mount ', ''), v: m.basecamp, color: m.color }))} maxV={5500} />
            <CompBar label="Trek Duration (days)" unit=" days"
              values={[
                { name: 'Saghro', v: 6, color: C.saghro },
                { name: 'Toubkal', v: 2, color: C.toubkal },
                { name: 'Kilimanjaro', v: 7, color: C.kili },
                { name: 'Everest', v: 60, color: C.everest },
              ]} maxV={60} />
            <CompBar label="Annual Climbers (approx)" unit=""
              values={[
                { name: 'Saghro', v: 2000, color: C.saghro },
                { name: 'Toubkal', v: 30000, color: C.toubkal },
                { name: 'Kilimanjaro', v: 40000, color: C.kili },
                { name: 'Everest', v: 900, color: C.everest },
              ]} maxV={40000} />
            <CompBar label="Success Rate (%)" unit="%"
              values={[
                { name: 'Saghro', v: 95, color: C.saghro },
                { name: 'Toubkal', v: 85, color: C.toubkal },
                { name: 'Kilimanjaro', v: 65, color: C.kili },
                { name: 'Everest', v: 55, color: C.everest },
              ]} maxV={100} />
          </div>
        </div>
      </section>

      {/* MOUNTAIN CARDS */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 py-8">
        <div ref={cardR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Mountain Profiles — Click to expand</p>
          <div className="space-y-3">
            {MOUNTAINS.map((m, i) => {
              const isExp = expanded === m.name
              return (
                <div key={m.name}
                  className="rounded-sm overflow-hidden cursor-pointer transition-all duration-500"
                  style={{ border: `1px solid ${isExp ? m.color : C.border}40`, background: isExp ? `${m.color}03` : 'white',
                    opacity: cardR.vis ? 1 : 0, transitionDelay: `${i * 80}ms` }}
                  onClick={() => setExpanded(isExp ? null : m.name)}>
                  <div className="p-4 flex flex-wrap items-baseline gap-3">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: m.color }} />
                    <span className="font-serif italic text-[18px]" style={{ color: m.color }}>{m.name}</span>
                    {m.alt && <span className="font-mono text-[9px]" style={{ color: C.muted }}>{m.alt}</span>}
                    <span className="font-mono text-[14px] font-bold" style={{ color: m.color }}>{m.elevation.toLocaleString()}m</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>{m.range} · {m.country}</span>
                    <span className="font-mono text-[9px] ml-auto" style={{ color: C.muted }}>{isExp ? '−' : '+'}</span>
                  </div>
                  {isExp && (
                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        {[
                          { l: 'Prominence', v: `${m.prominence.toLocaleString()}m` },
                          { l: 'First ascent', v: m.firstAscent },
                          { l: 'Trek duration', v: m.trekDays },
                          { l: 'Difficulty', v: m.difficulty },
                          { l: 'Best season', v: m.bestSeason },
                          { l: 'Basecamp', v: `${m.basecamp.toLocaleString()}m` },
                          { l: 'Snow line', v: `~${m.snowLine.toLocaleString()}m` },
                          { l: 'Climate', v: m.climate },
                          { l: 'Annual climbers', v: m.annualClimbers },
                          { l: 'Success rate', v: m.successRate },
                          { l: 'Fatalities', v: m.fatalities },
                          { l: 'Nearest city', v: m.nearestCity },
                        ].map(d => (
                          <div key={d.l}>
                            <p className="font-mono text-[8px] uppercase" style={{ color: C.muted }}>{d.l}</p>
                            <p className="font-mono text-[10px]" style={{ color: C.text }}>{d.v}</p>
                          </div>
                        ))}
                      </div>
                      <p className="font-mono text-[8px] uppercase mb-1" style={{ color: C.muted }}>Geology</p>
                      <p className="text-[11px] leading-[1.6] mb-2" style={{ color: C.text }}>{m.geology}</p>
                      <p className="font-mono text-[8px] uppercase mb-1" style={{ color: C.muted }}>Ecosystem</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {m.ecosystem.map(e => (
                          <span key={e} className="font-mono text-[8px] px-1.5 py-0.5 rounded-sm" style={{ background: `${m.color}08`, color: m.color }}>{e}</span>
                        ))}
                      </div>
                      <p className="text-[12px] leading-[1.6] mt-3 p-3 rounded-sm" style={{ background: `${m.color}05`, color: C.text }}>
                        {m.uniqueFact}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.toubkal }}>The Weekend Mountain</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Toubkal is 60km from Marrakech. You can leave a riad at dawn, reach Imlil by
                mid-morning, sleep at the refuge (3,207m), summit the next day, and be back in
                the medina for dinner. No other 4,000m peak on earth sits this close to a major
                tourist city. That accessibility is its gift and its curse — 30,000 people summit
                annually, and the scree slopes show it.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.saghro }}>The Forgotten Range</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Saghro gets 2,000 trekkers a year. Toubkal gets 30,000. Kilimanjaro gets 40,000.
                Yet Saghro offers something none of the others can: volcanic lunar landscapes, Aït
                Atta nomads, 100mm of annual rainfall, and not a single soul on the trail for days.
                It is lower (2,712m) but wilder. The mountain that rewards those who chose difficulty
                over altitude.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.everest }}>The Scale of Things</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Toubkal&apos;s summit is below Everest&apos;s basecamp. That single fact reframes
                everything. The highest point in North Africa — 4,167m of volcanic rock, snow, and
                alpine meadow — would not even qualify as a staging post for the Himalayas. Kilimanjaro
                sits between them: higher than Toubkal by 1,728m, lower than Everest by 2,954m. Africa&apos;s
                tallest mountain is two-thirds of the way to the roof of the world. Morocco&apos;s is
                less than half.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="max-w-[1000px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            The summit of Toubkal is crowned with a metal pyramid. The summit of Everest is
            crowned with the fossilised floor of an ocean that no longer exists. Between them:
            4,682 metres of altitude, 7,000 kilometres of distance, and the entire difference
            between a weekend and a lifetime. What they share is simpler. Both are made of
            stone. Both were pushed up from below. Both will outlast everyone who stands on them.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Jbel Toubkal (4,167m): Wikipedia; Britannica; Grokipedia; Adventure Alternative;
            Cicerone Press. First ascent 1923: Wikipedia. Toubkal National Park (380 km²):
            Grokipedia. Jbel Saghro (2,712m Amalou n&apos;Mansour): Wikipedia; Lonely Planet;
            MoroccoGoNow; Experience Morocco. Saghro rainfall (100mm/yr south, 300mm summits):
            Wikipedia. Aït Atta tribe: Wikipedia &ldquo;Jbel Saghro.&rdquo; Kilimanjaro (5,895m):
            Wikipedia; general mountaineering sources. Five climate zones, glacier retreat
            predictions: widely reported. Everest (8,849m): Survey of Nepal / China 2020
            agreed height. First ascent 1953: Hillary and Norgay. Death zone, fatality
            statistics: Himalayan Database; widely reported. Summit fossils (Tethys Sea):
            geological consensus. Annual climber estimates are editorial approximations from
            multiple trekking sources. Prominence figures from peakbagger.com conventions.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.toubkal }}>© Dancing with Lions</p>
        </div>
      </section>
    </div>
  )
}
