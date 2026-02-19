'use client'

import Link from 'next/link'

// ═══ THE GEOMETRY OF CULTURE ═══
// The mathematics of Moroccan zellige and Islamic geometry.
// Compass-and-straightedge construction lines revealed.
// Star complexity mapped to regional data.
// 17 wallpaper groups × 12 regions × 4 dynasties × 6 star families.

const C = {
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  parchment: '#FAFAF5',
  cream: '#F5F0E8',
  construction: '#2D6E8E',  // compass/ruler lines
  star: '#C17F28',          // star pattern
  fill: '#8B6914',
  zellige: '#1E8C8C',
  dynasty: '#722F37',
  data: '#C54B3C',
  green: '#2D6E4F',
}

const W = 1200
const H = 3200

// ═══ HELPER: polar coordinates ═══
function pol(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = (deg - 90) * Math.PI / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

// ═══ Generate star polygon path ═══
function starPath(cx: number, cy: number, outerR: number, innerR: number, points: number): string {
  const pts: string[] = []
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * 360) / (points * 2)
    const r = i % 2 === 0 ? outerR : innerR
    const [x, y] = pol(cx, cy, r, angle)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
  }
  return pts.join(' ') + ' Z'
}

// ═══ Generate construction circles ═══
function constructionCircles(cx: number, cy: number, r: number, n: number): JSX.Element[] {
  const elements: JSX.Element[] = []
  // Main circle
  elements.push(
    <circle key="main" cx={cx} cy={cy} r={r} fill="none" stroke={C.construction} strokeWidth="0.3" strokeOpacity={0.3} />
  )
  // Division points and connecting lines
  for (let i = 0; i < n; i++) {
    const angle = (i * 360) / n
    const [x, y] = pol(cx, cy, r, angle)
    elements.push(
      <circle key={`pt-${i}`} cx={x} cy={y} r={1} fill={C.construction} fillOpacity={0.3} />
    )
    // Connect to next point (construction lines)
    const [nx, ny] = pol(cx, cy, r, ((i + 1) * 360) / n)
    elements.push(
      <line key={`ln-${i}`} x1={x} y1={y} x2={nx} y2={ny}
        stroke={C.construction} strokeWidth="0.2" strokeOpacity={0.15} />
    )
    // Connect to opposite points for star crossing
    if (n >= 6) {
      const skip = Math.floor(n / 3)
      const [sx, sy] = pol(cx, cy, r, ((i + skip) * 360) / n)
      elements.push(
        <line key={`sk-${i}`} x1={x} y1={y} x2={sx} y2={sy}
          stroke={C.construction} strokeWidth="0.15" strokeOpacity={0.1} />
      )
    }
  }
  return elements
}

// ═══ STAR FAMILIES ═══
interface StarFamily {
  n: number
  name: string
  arabicName: string
  wallpaperGroup: string
  prevalence: string
  dynasties: string
  construction: string
  innerRatio: number
  monuments: string[]
}

const STARS: StarFamily[] = [
  { n: 6, name: '6-Fold Star', arabicName: 'Najma Sudasia', wallpaperGroup: 'p6mm', prevalence: 'Very common', dynasties: 'All dynasties', construction: 'Two overlapping equilateral triangles', innerRatio: 0.5, monuments: ['Koutoubia Mosque (Marrakech)', 'Qarawiyyin Mosque (Fez)'] },
  { n: 8, name: '8-Fold Star', arabicName: 'Khatem Sulemani', wallpaperGroup: 'p4mm', prevalence: 'Most common', dynasties: 'Almoravid → present', construction: 'Two overlapping squares rotated 45°', innerRatio: 0.38, monuments: ['Ben Youssef Medersa (Marrakech)', 'Alhambra (Granada)'] },
  { n: 10, name: '10-Fold Star', arabicName: 'Najma Asharia', wallpaperGroup: 'p5m (quasi)', prevalence: 'Common in Marinid', dynasties: 'Marinid, Almohad', construction: 'Two overlapping pentagons', innerRatio: 0.35, monuments: ['Bou Inania Medersa (Fez)', 'Al Attarine Medersa (Fez)'] },
  { n: 12, name: '12-Fold Star', arabicName: 'Shamsa', wallpaperGroup: 'p6mm', prevalence: 'Elaborate works', dynasties: 'Marinid, Saadian', construction: 'Three overlapping squares at 30°', innerRatio: 0.4, monuments: ['Saadian Tombs (Marrakech)', 'Dar Batha (Fez)'] },
  { n: 16, name: '16-Fold Rosette', arabicName: 'Tastir', wallpaperGroup: 'p4mm', prevalence: 'Masterworks only', dynasties: 'Marinid, Alawite', construction: 'Two overlapping octagons', innerRatio: 0.42, monuments: ['Royal Palace doors (Fez)', 'Moulay Ismail Mausoleum (Meknès)'] },
  { n: 24, name: '24-Fold Rosette', arabicName: 'Shamsa Kubra', wallpaperGroup: 'p6mm', prevalence: 'Extremely rare', dynasties: 'Master craftsmen only', construction: 'Six overlapping squares at 15° intervals', innerRatio: 0.45, monuments: ['Public Fountain (Fez, 14th c.)', 'Mausoleum of Resistance (Fez)'] },
]

// ═══ 17 WALLPAPER GROUPS ═══
interface WallpaperGroup {
  notation: string
  name: string
  rotations: string
  reflections: boolean
  glideReflections: boolean
  moroccanUse: string
  frequency: 'dominant' | 'common' | 'rare' | 'absent'
}

const WALLPAPER_GROUPS: WallpaperGroup[] = [
  { notation: 'p1', name: 'Oblique', rotations: 'none', reflections: false, glideReflections: false, moroccanUse: 'Rare in zellige, found in textiles', frequency: 'rare' },
  { notation: 'p2', name: 'Oblique', rotations: '180°', reflections: false, glideReflections: false, moroccanUse: 'Brick patterns, border strips', frequency: 'rare' },
  { notation: 'pm', name: 'Rectangular', rotations: 'none', reflections: true, glideReflections: false, moroccanUse: 'Border friezes', frequency: 'rare' },
  { notation: 'pg', name: 'Rectangular', rotations: 'none', reflections: false, glideReflections: true, moroccanUse: 'Herringbone brick', frequency: 'rare' },
  { notation: 'cm', name: 'Rhombic', rotations: 'none', reflections: true, glideReflections: true, moroccanUse: 'Simple zellige borders', frequency: 'rare' },
  { notation: 'pmm', name: 'Rectangular', rotations: '180°', reflections: true, glideReflections: false, moroccanUse: 'Grid zellige, window grilles', frequency: 'common' },
  { notation: 'pmg', name: 'Rectangular', rotations: '180°', reflections: true, glideReflections: true, moroccanUse: 'Rare, some stucco work', frequency: 'rare' },
  { notation: 'pgg', name: 'Rectangular', rotations: '180°', reflections: false, glideReflections: true, moroccanUse: 'Brick facades', frequency: 'rare' },
  { notation: 'cmm', name: 'Rhombic', rotations: '180°', reflections: true, glideReflections: true, moroccanUse: 'Diamond zellige, wood panels', frequency: 'common' },
  { notation: 'p4', name: 'Square', rotations: '90°', reflections: false, glideReflections: false, moroccanUse: 'Some carved plaster', frequency: 'rare' },
  { notation: 'p4mm', name: 'Square', rotations: '90°', reflections: true, glideReflections: true, moroccanUse: '8-fold star patterns. DOMINANT in Moroccan woodwork.', frequency: 'dominant' },
  { notation: 'p4gm', name: 'Square', rotations: '90°', reflections: true, glideReflections: true, moroccanUse: 'Extremely rare in Morocco (found in 3 examples)', frequency: 'rare' },
  { notation: 'p3', name: 'Hexagonal', rotations: '120°', reflections: false, glideReflections: false, moroccanUse: 'Triangular zellige', frequency: 'rare' },
  { notation: 'p3m1', name: 'Hexagonal', rotations: '120°', reflections: true, glideReflections: false, moroccanUse: 'Some fountain panels', frequency: 'rare' },
  { notation: 'p31m', name: 'Hexagonal', rotations: '120°', reflections: true, glideReflections: false, moroccanUse: 'Interlocking zellige', frequency: 'common' },
  { notation: 'p6', name: 'Hexagonal', rotations: '60°', reflections: false, glideReflections: false, moroccanUse: 'Some star rosettes', frequency: 'rare' },
  { notation: 'p6mm', name: 'Hexagonal', rotations: '60°', reflections: true, glideReflections: true, moroccanUse: '6- and 12-fold stars. Second most common.', frequency: 'dominant' },
]

// ═══ REGIONAL DATA (star complexity = innovation composite) ═══
interface RegionData {
  name: string
  population: number  // millions
  literacy: number    // %
  internet: number    // %
  innovation: number  // composite 0–100
  starPoints: number  // mapped from innovation
  gdpPerCapita: number // USD
}

const REGIONS: RegionData[] = [
  { name: 'Casablanca-Settat', population: 7.05, literacy: 88, internet: 82, innovation: 78, starPoints: 16, gdpPerCapita: 5480 },
  { name: 'Rabat-Salé-Kénitra', population: 4.86, literacy: 85, internet: 79, innovation: 75, starPoints: 16, gdpPerCapita: 4610 },
  { name: 'Tanger-Tétouan-Al Hoceïma', population: 3.86, literacy: 76, internet: 71, innovation: 65, starPoints: 12, gdpPerCapita: 3320 },
  { name: 'Fès-Meknès', population: 4.43, literacy: 72, internet: 65, innovation: 58, starPoints: 12, gdpPerCapita: 2170 },
  { name: 'Marrakech-Safi', population: 4.75, literacy: 64, internet: 58, innovation: 52, starPoints: 10, gdpPerCapita: 2150 },
  { name: 'Souss-Massa', population: 2.94, literacy: 68, internet: 62, innovation: 55, starPoints: 10, gdpPerCapita: 2660 },
  { name: 'Béni Mellal-Khénifra', population: 2.59, literacy: 58, internet: 48, innovation: 42, starPoints: 8, gdpPerCapita: 1880 },
  { name: 'Oriental', population: 2.43, literacy: 70, internet: 60, innovation: 50, starPoints: 10, gdpPerCapita: 2420 },
  { name: 'Drâa-Tafilalet', population: 1.76, literacy: 52, internet: 42, innovation: 35, starPoints: 6, gdpPerCapita: 1640 },
  { name: 'Guelmim-Oued Noun', population: 0.44, literacy: 56, internet: 45, innovation: 38, starPoints: 8, gdpPerCapita: 1920 },
  { name: 'Laâyoune-Sakia El Hamra', population: 0.42, literacy: 74, internet: 64, innovation: 48, starPoints: 8, gdpPerCapita: 3850 },
  { name: 'Dakhla-Oued Ed-Dahab', population: 0.20, literacy: 72, internet: 60, innovation: 45, starPoints: 8, gdpPerCapita: 4200 },
]

// ═══ DYNASTY PROGRESSION ═══
const DYNASTIES = [
  { name: 'Almoravid', period: '1040–1147', style: '6- and 8-fold only. Austere. No colour.', complexity: 8, color: '#6B4226' },
  { name: 'Almohad', period: '1147–1269', style: '8- and 10-fold. Monochrome zellige. Mathematical rigour.', complexity: 10, color: '#4A6741' },
  { name: 'Marinid', period: '1244–1465', style: '10-, 12-, 16-fold. Polychrome zellige. Peak complexity.', complexity: 16, color: '#2D6E8E' },
  { name: 'Saadian', period: '1549–1659', style: '12-fold. Gold + colour. Decorative excess.', complexity: 12, color: '#C17F28' },
  { name: 'Alawite', period: '1631–present', style: '8- and 12-fold revival. Traditional forms preserved.', complexity: 12, color: '#722F37' },
]

export default function GeometryOfCulturePage() {
  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-36 pb-6">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 024 · Mathematical Cartography</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>The Geometry of Culture</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          Mathematics that became architecture
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4" style={{ color: C.text }}>
          Every zellige tile in Morocco encodes a mathematical theorem. The 8-pointed
          star is two squares rotated 45&deg; &mdash; wallpaper group p4mm, discovered by
          Moroccan craftsmen 800 years before crystallographers named it. The
          12-pointed star is three squares at 30&deg; intervals &mdash; group p6mm. The
          Alhambra contains patterns representing all 17 possible wallpaper groups,
          the complete mathematical classification of planar symmetry. Edith M&uuml;ller
          proved this in her 1944 PhD thesis. The craftsmen who made them never
          read a proof. They used a compass, a straightedge, and a method called
          Hasba. This module deconstructs their mathematics.
        </p>
      </section>

      {/* THE POSTER */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="border p-4 md:p-8" style={{ borderColor: C.border, background: C.parchment }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <rect width={W} height={H} fill={C.parchment} />

            <text x={W / 2} y={30} textAnchor="middle" fontSize="10" letterSpacing="4" fontWeight="600" fill={C.ink}>
              THE GEOMETRY OF CULTURE
            </text>
            <text x={W / 2} y={46} textAnchor="middle" fontSize="6" letterSpacing="2" fill={C.muted}>
              COMPASS AND STRAIGHTEDGE · 17 WALLPAPER GROUPS · 6 STAR FAMILIES · 5 DYNASTIES · 12 REGIONS
            </text>

            {/* ═══ SECTION 1: THE SIX STAR FAMILIES ═══ */}
            <text x={30} y={85} fontSize="8" fontWeight="600" fill={C.star} letterSpacing="2">
              THE SIX STAR FAMILIES
            </text>
            <text x={30} y={99} fontSize="5" fill={C.muted}>
              Construction lines (blue) reveal the compass-and-straightedge geometry. Star pattern (gold) emerges from intersections.
            </text>

            {STARS.map((star, i) => {
              const col = i % 3
              const row = Math.floor(i / 3)
              const cx = 130 + col * 350
              const cy = 200 + row * 320
              const r = 70

              return (
                <g key={star.n}>
                  {/* Construction lines */}
                  {constructionCircles(cx, cy, r, star.n)}
                  {/* Inner construction circle */}
                  <circle cx={cx} cy={cy} r={r * star.innerRatio} fill="none"
                    stroke={C.construction} strokeWidth="0.2" strokeOpacity={0.2} strokeDasharray="2,2" />
                  {/* Center point */}
                  <circle cx={cx} cy={cy} r={0.8} fill={C.construction} fillOpacity={0.5} />

                  {/* The star itself */}
                  <path d={starPath(cx, cy, r * 0.85, r * star.innerRatio, star.n)}
                    fill={C.star} fillOpacity={0.08} stroke={C.star} strokeWidth="0.8" />

                  {/* Outer ring for the interlace effect */}
                  <path d={starPath(cx, cy, r * 0.85, r * star.innerRatio, star.n)}
                    fill="none" stroke={C.fill} strokeWidth="0.3" strokeOpacity={0.3} />

                  {/* Labels */}
                  <text x={cx} y={cy + r + 20} textAnchor="middle" fontSize="7" fontWeight="700" fill={C.star}>
                    {star.n}-FOLD
                  </text>
                  <text x={cx} y={cy + r + 32} textAnchor="middle" fontSize="5" fontStyle="italic" fill={C.muted}>
                    {star.arabicName}
                  </text>
                  <text x={cx} y={cy + r + 44} textAnchor="middle" fontSize="4.5" fill={C.construction}>
                    Group: {star.wallpaperGroup}
                  </text>
                  <text x={cx} y={cy + r + 55} textAnchor="middle" fontSize="4" fill={C.muted}>
                    {star.construction}
                  </text>
                  <text x={cx} y={cy + r + 66} textAnchor="middle" fontSize="3.5" fill={C.dynasty}>
                    {star.prevalence} · {star.dynasties}
                  </text>
                  {star.monuments.map((m, j) => (
                    <text key={j} x={cx} y={cy + r + 76 + j * 10} textAnchor="middle" fontSize="3.5" fill={C.muted}>
                      {m}
                    </text>
                  ))}
                </g>
              )
            })}

            {/* ═══ SECTION 2: DYNASTY PROGRESSION ═══ */}
            {(() => {
              const secY = 760
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.dynasty} letterSpacing="2">
                    COMPLEXITY THROUGH TIME
                  </text>
                  <text x={30} y={secY + 44} fontSize="5" fill={C.muted}>
                    How star complexity evolved across five Moroccan dynasties. Max n-fold rosette per period.
                  </text>

                  {/* Timeline */}
                  <line x1={60} y1={secY + 80} x2={W - 60} y2={secY + 80}
                    stroke={C.border} strokeWidth="0.5" />

                  {DYNASTIES.map((d, i) => {
                    const x = 60 + (i / (DYNASTIES.length - 1)) * (W - 120)
                    const starR = d.complexity * 2.5
                    return (
                      <g key={d.name}>
                        {/* Star at this period */}
                        <path d={starPath(x, secY + 80 - starR - 15, starR, starR * 0.4, d.complexity)}
                          fill={d.color} fillOpacity={0.1} stroke={d.color} strokeWidth="0.5" />

                        {/* Timeline marker */}
                        <circle cx={x} cy={secY + 80} r={3} fill={d.color} fillOpacity={0.4}
                          stroke={d.color} strokeWidth="0.5" />

                        {/* Labels below */}
                        <text x={x} y={secY + 96} textAnchor="middle" fontSize="6" fontWeight="600" fill={d.color}>
                          {d.name}
                        </text>
                        <text x={x} y={secY + 108} textAnchor="middle" fontSize="4.5" fill={C.muted}>
                          {d.period}
                        </text>
                        <text x={x} y={secY + 118} textAnchor="middle" fontSize="4" fill={d.color}>
                          max {d.complexity}-fold
                        </text>
                        <text x={x} y={secY + 130} textAnchor="middle" fontSize="3.5" fill={C.muted}>
                          {d.style.slice(0, 45)}
                        </text>
                      </g>
                    )
                  })}

                  {/* Connecting line (complexity rise and fall) */}
                  <polyline
                    points={DYNASTIES.map((d, i) => {
                      const x = 60 + (i / (DYNASTIES.length - 1)) * (W - 120)
                      const y = secY + 80 - d.complexity * 2.5 - 15 - d.complexity * 2.5
                      return `${x},${y}`
                    }).join(' ')}
                    fill="none" stroke={C.dynasty} strokeWidth="0.5" strokeOpacity={0.3} strokeDasharray="4,4"
                  />
                </g>
              )
            })()}

            {/* ═══ SECTION 3: THE 17 WALLPAPER GROUPS ═══ */}
            {(() => {
              const secY = 940
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.construction} letterSpacing="2">
                    THE 17 WALLPAPER GROUPS
                  </text>
                  <text x={30} y={secY + 44} fontSize="5" fill={C.muted}>
                    Every possible planar symmetry. Edith M&uuml;ller found 11 in the Alhambra (1944). Morocco uses 5 predominantly.
                  </text>

                  {WALLPAPER_GROUPS.map((g, i) => {
                    const col = i % 6
                    const row = Math.floor(i / 6)
                    const x = 30 + col * 190
                    const y = secY + 65 + row * 52

                    const freqColor = g.frequency === 'dominant' ? C.star :
                      g.frequency === 'common' ? C.construction :
                      g.frequency === 'rare' ? C.muted : '#ccc'
                    const fillOp = g.frequency === 'dominant' ? 0.12 :
                      g.frequency === 'common' ? 0.06 : 0.02

                    return (
                      <g key={g.notation}>
                        <rect x={x} y={y} width={180} height={42}
                          fill={freqColor} fillOpacity={fillOp} stroke={freqColor} strokeWidth="0.3" rx={2} />
                        <text x={x + 6} y={y + 14} fontSize="8" fontWeight="700" fill={freqColor}>
                          {g.notation}
                        </text>
                        <text x={x + 55} y={y + 14} fontSize="4" fill={C.muted}>
                          {g.name} · rot: {g.rotations}
                        </text>
                        <text x={x + 55} y={y + 24} fontSize="4" fill={C.muted}>
                          {g.reflections ? '✓ reflect' : '✗ reflect'} · {g.glideReflections ? '✓ glide' : '✗ glide'}
                        </text>
                        <text x={x + 6} y={y + 36} fontSize="3.5" fill={freqColor}>
                          {g.moroccanUse.slice(0, 40)}
                        </text>
                      </g>
                    )
                  })}

                  {/* Legend */}
                  {[
                    { label: 'Dominant in Morocco', color: C.star },
                    { label: 'Common', color: C.construction },
                    { label: 'Rare', color: C.muted },
                  ].map((l, i) => (
                    <g key={l.label}>
                      <rect x={30 + i * 150} y={secY + 235} width={10} height={10}
                        fill={l.color} fillOpacity={0.2} stroke={l.color} strokeWidth="0.5" rx={1} />
                      <text x={46 + i * 150} y={secY + 243} fontSize="4.5" fill={l.color}>{l.label}</text>
                    </g>
                  ))}
                </g>
              )
            })()}

            {/* ═══ SECTION 4: REGIONAL DATA AS GEOMETRY ═══ */}
            {(() => {
              const secY = 1210
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.data} letterSpacing="2">
                    GEOMETRY OF MODERN MOROCCO
                  </text>
                  <text x={30} y={secY + 44} fontSize="5" fill={C.muted}>
                    Star complexity mapped to regional innovation index (literacy + internet + GDP per capita composite). More complex = more connected.
                  </text>

                  {REGIONS.map((reg, i) => {
                    const col = i % 4
                    const row = Math.floor(i / 4)
                    const cx = 110 + col * 270
                    const cy = secY + 130 + row * 220
                    const r = 40
                    const innerR = r * (0.3 + (1 - reg.innovation / 100) * 0.2)

                    return (
                      <g key={reg.name}>
                        {/* Construction circle (faint) */}
                        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.construction} strokeWidth="0.2" strokeOpacity={0.15} />

                        {/* The star — complexity = innovation */}
                        <path d={starPath(cx, cy, r * 0.85, innerR, reg.starPoints)}
                          fill={C.data} fillOpacity={0.04 + (reg.innovation / 100) * 0.12}
                          stroke={C.data} strokeWidth={0.3 + (reg.innovation / 100) * 0.7} />

                        {/* Population as circle size behind */}
                        <circle cx={cx} cy={cy} r={reg.population * 4}
                          fill={C.data} fillOpacity={0.02} />

                        {/* Region name */}
                        <text x={cx} y={cy + r + 16} textAnchor="middle" fontSize="5" fontWeight="600" fill={C.ink}>
                          {reg.name}
                        </text>

                        {/* Data */}
                        <text x={cx} y={cy + r + 28} textAnchor="middle" fontSize="4" fill={C.data}>
                          {reg.starPoints}-fold · Innovation: {reg.innovation}/100
                        </text>
                        <text x={cx} y={cy + r + 38} textAnchor="middle" fontSize="3.5" fill={C.muted}>
                          Pop: {reg.population}M · Literacy: {reg.literacy}% · Internet: {reg.internet}%
                        </text>
                        <text x={cx} y={cy + r + 48} textAnchor="middle" fontSize="3.5" fill={C.muted}>
                          GDP/cap: ${reg.gdpPerCapita.toLocaleString()}
                        </text>
                      </g>
                    )
                  })}
                </g>
              )
            })()}

            {/* ═══ SECTION 5: THE HASBA METHOD ═══ */}
            {(() => {
              const secY = 1960
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.ink} letterSpacing="2">
                    THE HASBA METHOD
                  </text>
                  <text x={30} y={secY + 44} fontSize="5" fill={C.muted}>
                    How Moroccan maâlam (master craftsmen) construct patterns using compass and straightedge. Five steps.
                  </text>

                  {[
                    { step: 1, title: 'Draw the Circle', desc: 'All geometry begins with a circle. The compass point is the center of the universe. The radius is arbitrary — it will determine scale, not form.' },
                    { step: 2, title: 'Divide the Circle', desc: 'Split into equal parts: 6, 8, 10, 12, or more. Each division creates a different star family. The maâlam uses compass-width to step off equal arcs.' },
                    { step: 3, title: 'Connect the Points', desc: 'Straight lines connect division points, skipping 1, 2, or 3 positions. The skip determines the star\'s interlace depth. Skip-2 on a 12-point circle = a 12-fold star.' },
                    { step: 4, title: 'Find the Intersections', desc: 'Where lines cross, new points emerge. These intersections define the inner geometry — the petals, kites, and rhombi that fill the negative space.' },
                    { step: 5, title: 'Extract the Pattern', desc: 'The construction lines vanish. Only the star and its interlace remain. The maâlam transfers this to wood, plaster, or tile. The mathematics disappears into beauty.' },
                  ].map((s, i) => {
                    const x = 30 + (i % 5) * 225
                    const y = secY + 70
                    const cx = x + 100
                    const cy = y + 50
                    const r = 35

                    return (
                      <g key={s.step}>
                        {/* Visual for each step */}
                        {s.step === 1 && (
                          <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.construction} strokeWidth="0.5" />
                        )}
                        {s.step === 2 && (
                          <g>
                            <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.construction} strokeWidth="0.3" strokeOpacity={0.3} />
                            {Array.from({ length: 8 }).map((_, j) => {
                              const [px, py] = pol(cx, cy, r, j * 45)
                              return <circle key={j} cx={px} cy={py} r={1.5} fill={C.construction} fillOpacity={0.5} />
                            })}
                          </g>
                        )}
                        {s.step === 3 && (
                          <g>
                            <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.construction} strokeWidth="0.2" strokeOpacity={0.2} />
                            {Array.from({ length: 8 }).map((_, j) => {
                              const [px, py] = pol(cx, cy, r, j * 45)
                              const [nx, ny] = pol(cx, cy, r, ((j + 3) % 8) * 45)
                              return <line key={j} x1={px} y1={py} x2={nx} y2={ny} stroke={C.construction} strokeWidth="0.3" strokeOpacity={0.3} />
                            })}
                          </g>
                        )}
                        {s.step === 4 && (
                          <g>
                            <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.construction} strokeWidth="0.15" strokeOpacity={0.15} />
                            {Array.from({ length: 8 }).map((_, j) => {
                              const [px, py] = pol(cx, cy, r, j * 45)
                              const [nx, ny] = pol(cx, cy, r, ((j + 3) % 8) * 45)
                              return <line key={j} x1={px} y1={py} x2={nx} y2={ny} stroke={C.construction} strokeWidth="0.15" strokeOpacity={0.15} />
                            })}
                            <path d={starPath(cx, cy, r * 0.85, r * 0.38, 8)}
                              fill="none" stroke={C.star} strokeWidth="0.3" strokeOpacity={0.4} />
                            <circle cx={cx} cy={cy} r={r * 0.38} fill="none" stroke={C.star} strokeWidth="0.2" strokeDasharray="1,2" strokeOpacity={0.3} />
                          </g>
                        )}
                        {s.step === 5 && (
                          <path d={starPath(cx, cy, r * 0.85, r * 0.38, 8)}
                            fill={C.star} fillOpacity={0.1} stroke={C.star} strokeWidth="0.8" />
                        )}

                        {/* Step number and text */}
                        <text x={x} y={y + 110} fontSize="8" fontWeight="700" fill={C.ink}>{s.step}</text>
                        <text x={x + 14} y={y + 110} fontSize="5" fontWeight="600" fill={C.ink}>{s.title}</text>
                        {/* Wrap text manually */}
                        {s.desc.match(/.{1,38}(\s|$)/g)?.map((line, j) => (
                          <text key={j} x={x} y={y + 122 + j * 10} fontSize="4" fill={C.muted}>
                            {line.trim()}
                          </text>
                        ))}
                      </g>
                    )
                  })}
                </g>
              )
            })()}

            {/* ═══ SECTION 6: THE ZELLIGE COLOUR TIMELINE ═══ */}
            {(() => {
              const secY = 2200
              const periods = [
                { era: '10th–13th c.', colors: ['#FFFFFF'], note: 'White only. Almoravid austerity.' },
                { era: '14th c.', colors: ['#FFFFFF', '#1B5E20', '#1565C0', '#F9A825'], note: 'Marinid. Blue, green, yellow added.' },
                { era: '17th c.', colors: ['#FFFFFF', '#1B5E20', '#1565C0', '#F9A825', '#B71C1C'], note: 'Red added. Alawite.' },
                { era: '20th c.', colors: ['#FFFFFF', '#1B5E20', '#1565C0', '#F9A825', '#B71C1C', '#000000', '#4A148C'], note: 'Modern enamels. Full palette.' },
              ]
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.zellige} letterSpacing="2">
                    THE COLOUR TIMELINE
                  </text>
                  <text x={30} y={secY + 44} fontSize="5" fill={C.muted}>
                    Zellige began white. Colour arrived slowly over 700 years.
                  </text>

                  {periods.map((p, i) => {
                    const x = 30 + i * 280
                    return (
                      <g key={p.era}>
                        <text x={x} y={secY + 70} fontSize="6" fontWeight="600" fill={C.zellige}>{p.era}</text>
                        <g>
                          {p.colors.map((c, j) => (
                            <rect key={j} x={x + j * 18} y={secY + 78} width={14} height={14}
                              fill={c} stroke={C.border} strokeWidth="0.5" rx={1} />
                          ))}
                        </g>
                        <text x={x} y={secY + 106} fontSize="4" fill={C.muted}>{p.note}</text>
                      </g>
                    )
                  })}
                </g>
              )
            })()}

            {/* ═══ KEY NUMBERS ═══ */}
            {(() => {
              const secY = 2340
              const nums = [
                { value: '17', label: 'wallpaper groups', sub: 'all possible planar symmetries' },
                { value: '5', label: 'used in Morocco', sub: 'p4mm, p6mm, cmm, pmm, p31m dominate' },
                { value: '48', label: 'highest fold rosette', sub: 'Public Fountain, Fez (14th century)' },
                { value: '800+', label: 'years of continuous practice', sub: 'Hasba method, master to apprentice' },
                { value: '360', label: 'zellige shapes', sub: 'in the traditional vocabulary' },
                { value: '0', label: 'proofs written', sub: 'all knowledge oral + manual' },
              ]
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  {nums.map((n, i) => {
                    const x = 30 + (i % 6) * 190
                    const y = secY + 25
                    return (
                      <g key={n.label}>
                        <text x={x} y={y + 20} fontSize="18" fontWeight="700" fill={C.star}>{n.value}</text>
                        <text x={x} y={y + 34} fontSize="5" fontWeight="600" fill={C.ink}>{n.label}</text>
                        <text x={x} y={y + 44} fontSize="4" fill={C.muted}>{n.sub}</text>
                      </g>
                    )
                  })}
                </g>
              )
            })()}

            {/* Colophon */}
            <text x={W / 2} y={H - 30} textAnchor="middle" fontSize="5" fill={C.muted} letterSpacing="1">
              SOURCES: ABOUFADIL ET AL. 2013 · M&Uuml;LLER 1944 · CASTERA 1999 · PACCARD 1980 · HCP 2024 · ANRT · © 2026 DANCING WITH LIONS
            </text>
            <text x={W / 2} y={H - 14} textAnchor="middle" fontSize="6" fontStyle="italic" fill={C.star}>
              Source: Dancing with Lions
            </text>
          </svg>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.star }}>The Oral Proof</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The Moroccan craftsmen who created patterns encoding all 17 wallpaper
                groups never wrote a mathematical proof. The knowledge was transmitted
                master to apprentice through the Hasba method &mdash; a system of
                compass-and-straightedge construction rules that generates correct
                symmetry groups without naming them. Edith M&uuml;ller, a Swiss
                mathematician, was the first to formally classify the Alhambra patterns
                in 1944. But the maâlam of Fez had been producing p4mm and p6mm
                patterns since the 12th century. The proof came 800 years after the
                practice. Mathematics verified what hands already knew.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.construction }}>The Five-Group Fingerprint</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Of the 17 possible wallpaper groups, Moroccan woodwork uses only five:
                p4mm (dominant &mdash; 8-fold stars), cmm (diamond lattices), p6mm (6- and
                12-fold stars), pmm (rectangular grids), and p4gm (extremely rare,
                only 3 documented examples). This is a cultural fingerprint. Turkish
                Islamic art favours different groups. Persian art favours still others.
                The distribution of symmetry groups across a civilisation&apos;s art is
                as distinctive as a dialect &mdash; it identifies origin, period, and
                artistic lineage. Morocco&apos;s fingerprint is overwhelmingly p4mm.
                The 8-pointed star is not just decoration. It is identity.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.data }}>The Innovation Map</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Mapping star complexity to regional innovation creates a provocative
                parallel. Casablanca-Settat (literacy 88%, internet 82%) renders as a
                16-fold rosette &mdash; the most complex form, historically reserved for
                masterworks. Drâa-Tafilalet (literacy 52%, internet 42%) renders as a
                6-fold star &mdash; the simplest, most ancient form. This is not a judgment.
                The 6-fold star is the foundation of all Islamic geometry. But the
                mapping reveals a truth about complexity: it requires infrastructure.
                The 16-fold rosette requires more education, more tools, more time.
                So does a modern economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            A circle. A compass. A straightedge. From these three things, a
            craftsman in 13th-century Fez produced patterns that encode the
            complete mathematical classification of planar symmetry &mdash; a
            classification that European mathematicians would not formalise
            until 1891. He did not know the word &ldquo;group theory.&rdquo; He knew
            the word Hasba. He did not write papers. He carved wood. And the
            wood is still standing in the Ben Youssef Medersa, still encoding
            p4mm, still waiting for someone to notice that the proof was
            there all along, hiding in plain sight, disguised as beauty.
          </p>
        </div>
      </section>

      {/* SOURCES */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: C.muted }}>
            Symmetry groups: Aboufadil, Thalal, &amp; Raghni (2013), &ldquo;Symmetry groups
            of Moroccan geometric woodwork patterns,&rdquo; J. Appl. Cryst. 46. Identified
            5 plane groups in ~1,000 Moroccan woodwork patterns (14th&ndash;19th c.). Alhambra
            classification: Edith M&uuml;ller, PhD thesis (1944), University of Zurich;
            identified 11 of 17 groups. Remaining groups debated &mdash; Grünbaum, Grünbaum
            &amp; Shephard (1986). 17 wallpaper groups first enumerated by Fedorov (1891).
            Star construction: Castera (1999), &ldquo;Arabesques: Decorative Art in Morocco&rdquo;;
            Paccard (1980), &ldquo;Traditional Islamic Craft in Moroccan Architecture&rdquo; (2 vols).
            Hasba method: oral tradition documented by Thalal et al. (2011). Zellige
            history: Morocco Travel Blog; Art of Islamic Pattern educational posters.
            Regional data: HCP 2024 Census; ANRT (telecom regulator, internet penetration);
            World Bank (GDP per capita 2023); Ministry of Education (literacy rates).
            Innovation index is a composite constructed by Dancing with Lions from
            literacy, internet penetration, and GDP per capita, normalised 0&ndash;100.
            Star-to-region mapping is editorial, not mathematical.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: C.border }}>
              &copy; {new Date().getFullYear()} Dancing with Lions. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.star }}>
              Source: Dancing with Lions
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
