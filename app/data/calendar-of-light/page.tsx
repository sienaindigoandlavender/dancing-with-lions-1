'use client'

import Link from 'next/link'

// ═══ THE CALENDAR OF LIGHT ═══
// A single radial illustration — sunrise, sunset, and daylight hours
// across 12 months for Morocco's six 2030 World Cup host cities.
// Each city gets a ring. The shape IS the data.
// Tangier (35.8°N) has wider seasonal swing than Agadir (30.4°N).
// Static SVG. Poster-grade. Print at A2.

const C = {
  tangier: '#1A5276',
  rabat: '#2D6E4F',
  casablanca: '#4A6741',
  fes: '#8B6914',
  marrakech: '#8B3A3A',
  agadir: '#C17F28',
  ink: '#0a0a0a',
  body: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  sunlight: '#F5E6C8',
  twilight: '#E8D5B8',
  night: '#1A1A2E',
  nightMid: '#2D2D44',
  dawn: '#C4956A',
  parchment: '#FFFFFF',
}

// ═══ CITY DATA ═══
interface City {
  name: string
  lat: number
  lon: number
  color: string
  stadiums: string
}

const CITIES: City[] = [
  { name: 'Tangier', lat: 35.77, lon: -5.80, color: C.tangier, stadiums: 'Ibn Batouta (75,600)' },
  { name: 'Rabat', lat: 34.01, lon: -6.84, color: C.rabat, stadiums: 'Prince Moulay Abdellah (68,700)' },
  { name: 'Casablanca', lat: 33.57, lon: -7.59, color: C.casablanca, stadiums: 'Hassan II (115,000)' },
  { name: 'Fes', lat: 34.03, lon: -4.98, color: C.fes, stadiums: 'Fes Stadium (55,800)' },
  { name: 'Marrakech', lat: 31.63, lon: -8.01, color: C.marrakech, stadiums: 'Marrakech Stadium (70,000)' },
  { name: 'Agadir', lat: 30.42, lon: -9.60, color: C.agadir, stadiums: 'Agadir Stadium (70,000)' },
]

// ═══ ASTRONOMICAL CALCULATIONS ═══
// Day of year midpoints for each month
const MONTH_DAYS = [15, 46, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349]
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Calculate daylight hours for a given latitude and day of year
function daylightHours(lat: number, dayOfYear: number): number {
  const declination = 23.45 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81))
  const latRad = (lat * Math.PI) / 180
  const decRad = (declination * Math.PI) / 180
  const hourAngle = Math.acos(-Math.tan(latRad) * Math.tan(decRad))
  return (2 * hourAngle * 180) / (15 * Math.PI)
}

// Calculate sunrise time (hours after midnight, solar time)
function sunriseTime(lat: number, dayOfYear: number): number {
  const hours = daylightHours(lat, dayOfYear)
  return 12 - hours / 2
}

// Calculate sunset time
function sunsetTime(lat: number, dayOfYear: number): number {
  const hours = daylightHours(lat, dayOfYear)
  return 12 + hours / 2
}

// Precompute all data
const cityData = CITIES.map(city => ({
  ...city,
  months: MONTH_DAYS.map(day => ({
    daylight: daylightHours(city.lat, day),
    sunrise: sunriseTime(city.lat, day),
    sunset: sunsetTime(city.lat, day),
  })),
}))

// ═══ SVG GEOMETRY ═══
const CX = 600 // center x
const CY = 620 // center y
const RING_BASE = 140 // innermost ring radius
const RING_GAP = 58 // gap between rings
const RING_WIDTH = 44 // width of each ring band

// Convert month index + value to polar coordinates
function polarToXY(monthIdx: number, radius: number): [number, number] {
  // Month 0 (Jan) at top, clockwise
  const angle = ((monthIdx / 12) * 2 * Math.PI) - Math.PI / 2
  return [
    CX + radius * Math.cos(angle),
    CY + radius * Math.sin(angle),
  ]
}

// Create a closed radial path for daylight band
function createRadialBand(
  monthData: { daylight: number; sunrise: number; sunset: number }[],
  innerRadius: number,
  maxDaylight: number,
  minDaylight: number,
): string {
  const outerPoints: string[] = []
  const innerPoints: string[] = []

  for (let i = 0; i <= 12; i++) {
    const idx = i % 12
    const angle = ((i / 12) * 2 * Math.PI) - Math.PI / 2
    const daylightNorm = (monthData[idx].daylight - minDaylight) / (maxDaylight - minDaylight)
    const outerR = innerRadius + daylightNorm * RING_WIDTH
    const innerR = innerRadius

    outerPoints.push(`${CX + outerR * Math.cos(angle)},${CY + outerR * Math.sin(angle)}`)
    innerPoints.unshift(`${CX + innerR * Math.cos(angle)},${CY + innerR * Math.sin(angle)}`)
  }

  return `M ${outerPoints[0]} ${outerPoints.slice(1).map(p => `L ${p}`).join(' ')} ${innerPoints.map(p => `L ${p}`).join(' ')} Z`
}

// Create smooth radial path using daylight hours mapped to radius
function createDaylightPath(
  monthData: { daylight: number }[],
  baseRadius: number,
  scale: number,
): string {
  const points: [number, number][] = []
  // Generate 360 points for smooth curve (interpolating between months)
  for (let deg = 0; deg < 360; deg++) {
    const monthFrac = (deg / 360) * 12
    const m0 = Math.floor(monthFrac) % 12
    const m1 = (m0 + 1) % 12
    const t = monthFrac - Math.floor(monthFrac)
    const daylight = monthData[m0].daylight * (1 - t) + monthData[m1].daylight * t
    const r = baseRadius + (daylight - 9.5) * scale
    const angle = ((deg / 360) * 2 * Math.PI) - Math.PI / 2
    points.push([CX + r * Math.cos(angle), CY + r * Math.sin(angle)])
  }
  return `M ${points[0][0]},${points[0][1]} ${points.slice(1).map(p => `L ${p[0]},${p[1]}`).join(' ')} Z`
}

export default function CalendarOfLightPage() {
  // Find global min/max daylight across all cities
  const allDaylight = cityData.flatMap(c => c.months.map(m => m.daylight))
  const minDL = Math.min(...allDaylight) // ~9.5h (Tangier, Dec)
  const maxDL = Math.max(...allDaylight) // ~14.5h (Tangier, Jun)

  // Scale: 1 hour of daylight = how many pixels of radius
  const hourScale = RING_WIDTH / (maxDL - minDL)

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-36 pb-8">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 015 · Astronomical Chart</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>The Calendar of Light</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          How the sun moves across six cities and twelve months
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4 mb-4" style={{ color: C.body }}>
          Morocco&apos;s six 2030 World Cup host cities span five degrees of latitude —
          from Agadir at 30.4°N to Tangier at 35.8°N. That difference reshapes the year.
          Tangier gets 14 hours 28 minutes of light in June but only 9 hours 33 minutes
          in December — a swing of nearly five hours. Agadir&apos;s swing is gentler:
          13 hours 52 minutes to 10 hours 10 minutes. Each ring on this chart is one city.
          The shape is the daylight. The further the curve bulges from centre, the longer the day.
        </p>
      </section>

      {/* ═══ THE RADIAL CHART ═══ */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="border overflow-hidden" style={{ borderColor: C.border, background: C.parchment }}>
          <svg
            viewBox="0 0 1200 1280"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <rect width="1200" height="1280" fill={C.parchment} />

            {/* Title */}
            <text x="600" y="45" textAnchor="middle" fontSize="12" letterSpacing="5" fontWeight="600" fill={C.ink}>
              THE CALENDAR OF LIGHT
            </text>
            <text x="600" y="62" textAnchor="middle" fontSize="7" letterSpacing="3" fill={C.muted}>
              DAYLIGHT HOURS ACROSS TWELVE MONTHS · SIX HOST CITIES · 2030 FIFA WORLD CUP
            </text>

            {/* Month axis lines (12 spokes) */}
            {MONTH_NAMES.map((name, i) => {
              const angle = ((i / 12) * 2 * Math.PI) - Math.PI / 2
              const innerR = RING_BASE - 20
              const outerR = RING_BASE + CITIES.length * RING_GAP + 30
              const x1 = CX + innerR * Math.cos(angle)
              const y1 = CY + innerR * Math.sin(angle)
              const x2 = CX + outerR * Math.cos(angle)
              const y2 = CY + outerR * Math.sin(angle)
              const labelR = outerR + 18
              const lx = CX + labelR * Math.cos(angle)
              const ly = CY + labelR * Math.sin(angle)
              return (
                <g key={name}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={C.border} strokeWidth="0.5" />
                  <text x={lx} y={ly + 3} textAnchor="middle"
                    fontSize="8" fontWeight="500" letterSpacing="2" fill={C.muted}>
                    {name.toUpperCase()}
                  </text>
                </g>
              )
            })}

            {/* Solstice / Equinox markers */}
            {[
              { month: 2, label: 'SPRING EQUINOX', sub: 'Mar 20' },
              { month: 5, label: 'SUMMER SOLSTICE', sub: 'Jun 21' },
              { month: 8, label: 'AUTUMN EQUINOX', sub: 'Sep 22' },
              { month: 11, label: 'WINTER SOLSTICE', sub: 'Dec 21' },
            ].map(eq => {
              const angle = ((eq.month / 12) * 2 * Math.PI) - Math.PI / 2
              const r = RING_BASE + CITIES.length * RING_GAP + 50
              const x = CX + r * Math.cos(angle)
              const y = CY + r * Math.sin(angle)
              return (
                <g key={eq.label}>
                  <text x={x} y={y} textAnchor="middle" fontSize="5.5" fontWeight="600"
                    letterSpacing="1.5" fill={C.dawn}>
                    {eq.label}
                  </text>
                  <text x={x} y={y + 9} textAnchor="middle" fontSize="4.5" fill={C.muted}>
                    {eq.sub}
                  </text>
                </g>
              )
            })}

            {/* ═══ CITY RINGS ═══ */}
            {cityData.map((city, cityIdx) => {
              const baseR = RING_BASE + cityIdx * RING_GAP

              // Draw the ring base circle (faint)
              return (
                <g key={city.name}>
                  {/* Base circle */}
                  <circle cx={CX} cy={CY} r={baseR}
                    fill="none" stroke={C.border} strokeWidth="0.3" />

                  {/* Daylight shape — the bloom */}
                  <path
                    d={createDaylightPath(city.months, baseR, hourScale * 1.1)}
                    fill={city.color}
                    fillOpacity={0.12}
                    stroke={city.color}
                    strokeWidth="1.5"
                  />

                  {/* Monthly data points */}
                  {city.months.map((m, mi) => {
                    const r = baseR + (m.daylight - minDL) * hourScale * 1.1
                    const [px, py] = polarToXY(mi, r)
                    return (
                      <circle key={mi} cx={px} cy={py} r={2}
                        fill={city.color} fillOpacity={0.8}
                      />
                    )
                  })}

                  {/* Hour labels at Jun and Dec (max/min) */}
                  {(() => {
                    const junData = city.months[5] // June
                    const decData = city.months[11] // December
                    const junR = baseR + (junData.daylight - minDL) * hourScale * 1.1
                    const decR = baseR + (decData.daylight - minDL) * hourScale * 1.1
                    const [jx, jy] = polarToXY(5, junR + 10)
                    const [dx, dy] = polarToXY(11, decR - 10)
                    const junH = Math.floor(junData.daylight)
                    const junM = Math.round((junData.daylight - junH) * 60)
                    const decH = Math.floor(decData.daylight)
                    const decM = Math.round((decData.daylight - decH) * 60)
                    return (
                      <>
                        <text x={jx} y={jy} textAnchor="middle" fontSize="5" fill={city.color} fontWeight="500">
                          {junH}h{junM.toString().padStart(2, '0')}
                        </text>
                        <text x={dx} y={dy} textAnchor="middle" fontSize="5" fill={city.color} fontWeight="500">
                          {decH}h{decM.toString().padStart(2, '0')}
                        </text>
                      </>
                    )
                  })()}

                  {/* City name label (at March position, outside) */}
                  {(() => {
                    const marData = city.months[2]
                    const r = baseR + (marData.daylight - minDL) * hourScale * 1.1
                    // Place label at ~1 o'clock position
                    const labelAngle = ((1.5 / 12) * 2 * Math.PI) - Math.PI / 2
                    const lx = CX + (baseR + RING_WIDTH / 2) * Math.cos(labelAngle)
                    const ly = CY + (baseR + RING_WIDTH / 2) * Math.sin(labelAngle)
                    return (
                      <text x={lx} y={ly} textAnchor="start" fontSize="7"
                        fontWeight="600" letterSpacing="1.5" fill={city.color}
                        transform={`rotate(${(1.5 / 12) * 360 - 90}, ${lx}, ${ly})`}
                      >
                        {city.name.toUpperCase()} · {city.lat.toFixed(1)}°N
                      </text>
                    )
                  })()}
                </g>
              )
            })}

            {/* ═══ CENTER LABEL ═══ */}
            <circle cx={CX} cy={CY} r={RING_BASE - 30} fill="none" stroke={C.border} strokeWidth="0.5" />
            <text x={CX} y={CY - 20} textAnchor="middle" fontSize="9" fontWeight="600" letterSpacing="2" fill={C.ink}>
              MOROCCO
            </text>
            <text x={CX} y={CY - 6} textAnchor="middle" fontSize="6" fill={C.muted}>
              30.4°N — 35.8°N
            </text>
            <text x={CX} y={CY + 8} textAnchor="middle" fontSize="6" fill={C.muted}>
              Six host cities
            </text>
            <text x={CX} y={CY + 20} textAnchor="middle" fontSize="6" fill={C.muted}>
              2030 World Cup
            </text>

            {/* ═══ HOUR RINGS (concentric reference) ═══ */}
            {[10, 11, 12, 13, 14].map(h => {
              const r = RING_BASE + (h - minDL) * hourScale * 1.1
              if (r < RING_BASE - 10 || r > RING_BASE + CITIES.length * RING_GAP + 20) return null
              return (
                <g key={h}>
                  <circle cx={CX} cy={CY} r={r}
                    fill="none" stroke={C.border} strokeWidth="0.2" strokeDasharray="2,4" />
                  <text x={CX + r + 3} y={CY - 3} fontSize="4" fill={C.border}>
                    {h}h
                  </text>
                </g>
              )
            })}

            {/* ═══ LEGEND ═══ */}
            <g transform="translate(40, 1100)">
              <rect x="0" y="0" width="320" height="140" fill={C.parchment} stroke={C.border} strokeWidth="0.5" />
              <text x="160" y="18" textAnchor="middle" fontSize="7" fontWeight="600" letterSpacing="2" fill={C.ink}>
                HOST CITIES BY LATITUDE
              </text>

              {cityData.map((city, i) => {
                const junH = city.months[5].daylight
                const decH = city.months[11].daylight
                const swing = junH - decH
                return (
                  <g key={city.name} transform={`translate(15, ${30 + i * 17})`}>
                    <rect x="0" y="0" width="10" height="10" fill={city.color} fillOpacity={0.3} stroke={city.color} strokeWidth="0.8" />
                    <text x="16" y="8" fontSize="6" fontWeight="500" fill={city.color}>
                      {city.name}
                    </text>
                    <text x="80" y="8" fontSize="5" fill={C.muted}>
                      {city.lat.toFixed(1)}°N
                    </text>
                    <text x="120" y="8" fontSize="5" fill={C.muted}>
                      Jun: {Math.floor(junH)}h{Math.round((junH % 1) * 60).toString().padStart(2, '0')}
                    </text>
                    <text x="180" y="8" fontSize="5" fill={C.muted}>
                      Dec: {Math.floor(decH)}h{Math.round((decH % 1) * 60).toString().padStart(2, '0')}
                    </text>
                    <text x="240" y="8" fontSize="5" fill={C.dawn}>
                      Swing: {Math.floor(swing)}h{Math.round((swing % 1) * 60).toString().padStart(2, '0')}
                    </text>
                  </g>
                )
              })}
            </g>

            {/* ═══ READING GUIDE ═══ */}
            <g transform="translate(520, 1100)">
              <rect x="0" y="0" width="280" height="140" fill={C.parchment} stroke={C.border} strokeWidth="0.5" />
              <text x="140" y="18" textAnchor="middle" fontSize="7" fontWeight="600" letterSpacing="2" fill={C.ink}>
                HOW TO READ THIS CHART
              </text>
              <text x="15" y="36" fontSize="5.5" fill={C.body}>
                Each ring represents one city, ordered by latitude.
              </text>
              <text x="15" y="48" fontSize="5.5" fill={C.body}>
                Innermost ring = Tangier (northernmost, 35.8°N).
              </text>
              <text x="15" y="60" fontSize="5.5" fill={C.body}>
                Outermost ring = Agadir (southernmost, 30.4°N).
              </text>
              <text x="15" y="76" fontSize="5.5" fill={C.body}>
                The curve bulges outward where days are longest (June).
              </text>
              <text x="15" y="88" fontSize="5.5" fill={C.body}>
                It contracts inward where days are shortest (December).
              </text>
              <text x="15" y="100" fontSize="5.5" fill={C.body}>
                Tangier&apos;s ring has the widest swing — its shape is
              </text>
              <text x="15" y="112" fontSize="5.5" fill={C.body}>
                most elongated. Agadir&apos;s ring is rounder — closer to
              </text>
              <text x="15" y="124" fontSize="5.5" fill={C.body}>
                the equator, its seasons are more even.
              </text>
            </g>

            {/* ═══ WORLD CUP NOTE ═══ */}
            <g transform="translate(860, 1100)">
              <rect x="0" y="0" width="290" height="140" fill={C.parchment} stroke={C.border} strokeWidth="0.5" />
              <text x="145" y="18" textAnchor="middle" fontSize="7" fontWeight="600" letterSpacing="2" fill={C.ink}>
                WORLD CUP LIGHT
              </text>
              <text x="15" y="36" fontSize="5.5" fill={C.body}>
                The 2030 World Cup runs June–July — the peak of
              </text>
              <text x="15" y="48" fontSize="5.5" fill={C.body}>
                Morocco&apos;s light year. Matches in Tangier will have
              </text>
              <text x="15" y="60" fontSize="5.5" fill={C.body}>
                14h28m of daylight. Agadir: 13h52m. Evening
              </text>
              <text x="15" y="72" fontSize="5.5" fill={C.body}>
                kickoffs at 21:00 will begin in golden light — sunset
              </text>
              <text x="15" y="84" fontSize="5.5" fill={C.body}>
                arrives at 21:38 in Tangier, 21:24 in Agadir.
              </text>
              <text x="15" y="100" fontSize="5.5" fill={C.body}>
                The 14-minute sunset difference between north
              </text>
              <text x="15" y="112" fontSize="5.5" fill={C.body}>
                and south is the latitude gap made visible —
              </text>
              <text x="15" y="124" fontSize="5.5" fill={C.body}>
                five degrees reshaping every evening.
              </text>
            </g>

            {/* ═══ COLOPHON ═══ */}
            <text x="600" y="1260" textAnchor="middle" fontSize="5" letterSpacing="2" fill={C.muted}>
              CALCULATED FROM SOLAR DECLINATION EQUATIONS · LATITUDES VIA GOOGLE EARTH · © 2026 DANCING WITH LIONS
            </text>
            <text x="600" y="1272" textAnchor="middle" fontSize="6" fontStyle="italic" fill={C.dawn}>
              © Dancing with Lions
            </text>

          </svg>
        </div>
      </section>

      {/* ═══ DATA TABLE ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.muted }}>Daylight Hours by City and Month (hours:minutes)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th className="text-left py-2 pr-4 font-medium" style={{ color: C.muted, borderBottom: `1px solid ${C.border}` }}>City</th>
                  <th className="text-left py-2 px-1 font-medium" style={{ color: C.muted, borderBottom: `1px solid ${C.border}` }}>Lat</th>
                  {MONTH_NAMES.map(m => (
                    <th key={m} className="text-center py-2 px-1 font-medium" style={{ color: C.muted, borderBottom: `1px solid ${C.border}` }}>{m}</th>
                  ))}
                  <th className="text-center py-2 px-1 font-medium" style={{ color: C.dawn, borderBottom: `1px solid ${C.border}` }}>Swing</th>
                </tr>
              </thead>
              <tbody>
                {cityData.map(city => {
                  const maxH = Math.max(...city.months.map(m => m.daylight))
                  const minH = Math.min(...city.months.map(m => m.daylight))
                  const swing = maxH - minH
                  return (
                    <tr key={city.name}>
                      <td className="py-1.5 pr-4 font-medium" style={{ color: city.color, borderBottom: `1px solid ${C.border}` }}>{city.name}</td>
                      <td className="py-1.5 px-1" style={{ color: C.muted, borderBottom: `1px solid ${C.border}` }}>{city.lat.toFixed(1)}°</td>
                      {city.months.map((m, i) => {
                        const h = Math.floor(m.daylight)
                        const min = Math.round((m.daylight - h) * 60)
                        const isMax = m.daylight === maxH
                        const isMin = m.daylight === minH
                        return (
                          <td key={i} className="py-1.5 px-1 text-center" style={{
                            color: isMax ? city.color : isMin ? C.muted : C.body,
                            fontWeight: isMax || isMin ? 600 : 400,
                            borderBottom: `1px solid ${C.border}`,
                          }}>
                            {h}:{min.toString().padStart(2, '0')}
                          </td>
                        )
                      })}
                      <td className="py-1.5 px-1 text-center font-medium" style={{ color: C.dawn, borderBottom: `1px solid ${C.border}` }}>
                        {Math.floor(swing)}:{Math.round((swing % 1) * 60).toString().padStart(2, '0')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            Five degrees of latitude. Fourteen minutes of sunset. The difference between
            Tangier and Agadir isn&apos;t just geography — it&apos;s the shape of every
            evening, the rhythm of every Ramadan fast, the colour of the light on
            the stadium wall at the moment the whistle blows.
          </p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources &amp; Method</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: C.muted }}>
            Daylight hours calculated from standard solar declination equations using
            city latitudes (Google Earth). Sunrise/sunset times are solar (local apparent) time;
            actual clock times vary with longitude within the Morocco time zone (GMT+1).
            Cross-referenced with timeanddate.com and worlddata.info sunrise/sunset tables.
            Stadium capacities from FIFA 2030 bid documentation. Morocco operates on
            GMT+1 year-round (no daylight saving time as of 2024).
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: C.border }}>
              © {new Date().getFullYear()} Dancing with Lions. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.dawn }}>
              © Dancing with Lions
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
