'use client'

import Link from 'next/link'

// ═══ THE MOROCCAN CALENDAR ═══
// Four overlapping time systems on a single radial year-wheel.
// Ring 1 (outer): Gregorian — business, national holidays
// Ring 2: Islamic lunar — Ramadan, Eids, Mawlid (shifts ~11 days/year)
// Ring 3: Amazigh agricultural — yennayer, seasons, harvest
// Ring 4 (inner): French school calendar — rentrée, vacances, exams
// Where they align = chaos. Where they diverge = Morocco.

const C = {
  gregorian: '#8B3A3A',
  islamic: '#2D6E4F',
  amazigh: '#8B6914',
  school: '#1A5276',
  overlap: '#722F37',
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  parchment: '#FAFAF5',
  cream: '#F5F0E8',
}

// ═══ MONTH DATA ═══
const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
]

const MONTH_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// ═══ AMAZIGH MONTHS (Berber calendar, offset ~14 days from Gregorian) ═══
const AMAZIGH_MONTHS = [
  { name: 'Yennayer', start: 'Jan 14', season: 'Tagrest (Winter)', activity: 'Ploughing, sowing' },
  { name: 'Furar', start: 'Feb 14', season: 'Tagrest', activity: 'Pruning trees' },
  { name: 'Meghres', start: 'Mar 14', season: 'Tafsut (Spring)', activity: 'Spring planting' },
  { name: 'Ibrir', start: 'Apr 14', season: 'Tafsut', activity: 'Irrigation' },
  { name: 'Mayyu', start: 'May 14', season: 'Tafsut', activity: 'Weeding, tending' },
  { name: 'Yunyu', start: 'Jun 14', season: 'Iwilen (Summer)', activity: 'Grain harvest begins' },
  { name: 'Yulyuz', start: 'Jul 14', season: 'Iwilen', activity: 'Threshing, winnowing' },
  { name: 'Ghusht', start: 'Aug 14', season: 'Iwilen', activity: 'Fruit harvest, heat peak' },
  { name: 'Shutanbir', start: 'Sep 14', season: 'Amewan (Autumn)', activity: 'Date harvest, olives begin' },
  { name: 'Ktuber', start: 'Oct 14', season: 'Amewan', activity: 'Olive harvest' },
  { name: 'Nwanbir', start: 'Nov 14', season: 'Amewan', activity: 'Ploughing returns' },
  { name: 'Dujanbir', start: 'Dec 14', season: 'Tagrest (Winter)', activity: 'Sowing winter wheat' },
]

// ═══ EVENTS BY CALENDAR SYSTEM ═══
interface CalEvent {
  month: number  // 0–11
  dayStart: number
  dayEnd?: number
  name: string
  system: 'gregorian' | 'islamic' | 'amazigh' | 'school'
  note?: string
  color: string
  fixed: boolean  // true = same date every year
}

const EVENTS: CalEvent[] = [
  // ── GREGORIAN / NATIONAL HOLIDAYS (fixed) ──
  { month: 0, dayStart: 1, name: 'New Year\'s Day', system: 'gregorian', color: C.gregorian, fixed: true },
  { month: 0, dayStart: 11, name: 'Manifesto of Independence', system: 'gregorian', color: C.gregorian, fixed: true, note: '1944' },
  { month: 4, dayStart: 1, name: 'Labour Day', system: 'gregorian', color: C.gregorian, fixed: true },
  { month: 6, dayStart: 30, name: 'Throne Day', system: 'gregorian', color: C.gregorian, fixed: true, note: 'Biggest national holiday' },
  { month: 7, dayStart: 14, name: 'Oued Ed-Dahab Day', system: 'gregorian', color: C.gregorian, fixed: true },
  { month: 7, dayStart: 20, name: 'Revolution Day', system: 'gregorian', color: C.gregorian, fixed: true, note: '1953' },
  { month: 7, dayStart: 21, name: 'Youth Day', system: 'gregorian', color: C.gregorian, fixed: true },
  { month: 10, dayStart: 6, name: 'Green March', system: 'gregorian', color: C.gregorian, fixed: true, note: '1975' },
  { month: 10, dayStart: 18, name: 'Independence Day', system: 'gregorian', color: C.gregorian, fixed: true, note: '1956' },

  // ── ISLAMIC (lunar — these are 2026 approximate positions, shifts ~11 days/year) ──
  { month: 2, dayStart: 1, dayEnd: 30, name: 'Ramadan', system: 'islamic', color: C.islamic, fixed: false, note: 'Feb 28 – Mar 29, 2026 (approx). Shifts 11 days earlier each year.' },
  { month: 2, dayStart: 30, name: 'Eid al-Fitr', system: 'islamic', color: C.islamic, fixed: false, note: '~Mar 30, 2026. End of Ramadan. 2 days.' },
  { month: 5, dayStart: 6, dayEnd: 8, name: 'Eid al-Adha', system: 'islamic', color: C.islamic, fixed: false, note: '~Jun 6, 2026. Sacrifice feast. Biggest family gathering.' },
  { month: 5, dayStart: 27, name: 'Islamic New Year', system: 'islamic', color: C.islamic, fixed: false, note: '1 Muharram ~Jun 27, 2026' },
  { month: 8, dayStart: 5, dayEnd: 6, name: 'Eid al-Mawlid', system: 'islamic', color: C.islamic, fixed: false, note: 'Prophet\'s birthday ~Sep 5, 2026' },

  // ── AMAZIGH AGRICULTURAL ──
  { month: 0, dayStart: 13, name: 'Yennayer (Amazigh New Year)', system: 'amazigh', color: C.amazigh, fixed: true, note: '2976. National holiday since 2024. Couscous with 7 vegetables.' },
  { month: 2, dayStart: 20, name: 'Spring Equinox', system: 'amazigh', color: C.amazigh, fixed: true, note: 'Tafsut begins. Planting season opens.' },
  { month: 5, dayStart: 21, name: 'Summer Solstice', system: 'amazigh', color: C.amazigh, fixed: true, note: 'Longest day. Grain harvest peaks.' },
  { month: 5, dayStart: 14, dayEnd: 31, name: 'Grain Harvest', system: 'amazigh', color: C.amazigh, fixed: true, note: 'Barley + wheat. Threshing floors active.' },
  { month: 8, dayStart: 22, name: 'Autumn Equinox', system: 'amazigh', color: C.amazigh, fixed: true, note: 'Amewan begins. Olive + date harvest.' },
  { month: 9, dayStart: 1, dayEnd: 30, name: 'Olive Harvest', system: 'amazigh', color: C.amazigh, fixed: true, note: 'Major agricultural event. Oct–Nov.' },
  { month: 11, dayStart: 21, name: 'Winter Solstice', system: 'amazigh', color: C.amazigh, fixed: true, note: 'Shortest day. New ploughing cycle.' },

  // ── FRENCH SCHOOL CALENDAR (2025–2026) ──
  { month: 8, dayStart: 8, name: 'Rentrée scolaire', system: 'school', color: C.school, fixed: true, note: 'School year begins. National event.' },
  { month: 9, dayStart: 18, dayEnd: 31, name: 'Autumn Break', system: 'school', color: C.school, fixed: true, note: 'Vacances d\'automne. Oct 18 – Nov 3.' },
  { month: 11, dayStart: 20, dayEnd: 31, name: 'Winter Break', system: 'school', color: C.school, fixed: true, note: 'Dec 20 – Jan 5. Overlaps New Year + Yennayer.' },
  { month: 1, dayStart: 21, dayEnd: 28, name: 'February Break', system: 'school', color: C.school, fixed: true, note: 'Vacances d\'hiver. Feb 21 – Mar 9.' },
  { month: 3, dayStart: 25, dayEnd: 30, name: 'Spring Break', system: 'school', color: C.school, fixed: true, note: 'Apr 25 – May 11.' },
  { month: 5, dayStart: 30, name: 'End of School Year', system: 'school', color: C.school, fixed: true, note: 'Bac students finish. Others Jun 30.' },
]

// ═══ SVG CONSTANTS ═══
const W = 1200
const H = 1200
const CX = W / 2
const CY = 500 // center of wheel
// Ring radii (outer to inner)
const R_OUT = 380 // Gregorian outer edge
const R_GREG = [340, 380] // Gregorian band
const R_ISLAM = [290, 335] // Islamic band
const R_AMAZ = [240, 285] // Amazigh band
const R_SCHOOL = [190, 235] // School band
const R_INNER = 185 // inner edge

// Convert month + day to angle (0 = top, clockwise)
function dateToAngle(month: number, day: number): number {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let totalDays = 0
  for (let m = 0; m < month; m++) totalDays += daysInMonth[m]
  totalDays += (day - 1)
  return (totalDays / 365) * Math.PI * 2 - Math.PI / 2 // -90° so Jan starts at top
}

// Polar to cartesian
function polar(cx: number, cy: number, r: number, angle: number): [number, number] {
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)]
}

// SVG arc path
function arcPath(cx: number, cy: number, r1: number, r2: number, a1: number, a2: number): string {
  const largeArc = (a2 - a1) > Math.PI ? 1 : 0
  const [ox1, oy1] = polar(cx, cy, r2, a1)
  const [ox2, oy2] = polar(cx, cy, r2, a2)
  const [ix2, iy2] = polar(cx, cy, r1, a2)
  const [ix1, iy1] = polar(cx, cy, r1, a1)
  return `M ${ox1},${oy1} A ${r2},${r2} 0 ${largeArc},1 ${ox2},${oy2} L ${ix2},${iy2} A ${r1},${r1} 0 ${largeArc},0 ${ix1},${iy1} Z`
}

export default function MoroccanCalendarPage() {
  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-36 pb-6">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 019 · Temporal Cartography</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>The Moroccan Calendar</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          Four time systems on a single wheel
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4" style={{ color: C.text }}>
          Morocco runs on four overlapping calendars. The Gregorian for business and
          national holidays. The Islamic lunar calendar for Ramadan, Eids, and the
          rhythm of spiritual life — shifting 11 days earlier each year. The Amazigh
          agricultural calendar for ploughing, harvest, and Yennayer. And the French-inherited
          school calendar for rentrée, vacances, and the baccalauréat. When they
          align — Ramadan during harvest during exam season — the country buckles
          and bends. Nobody has ever visualised all four at once. This is why Morocco
          feels the way it does.
        </p>
      </section>

      {/* ═══ THE RADIAL YEAR-WHEEL ═══ */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="border p-4 md:p-6" style={{ borderColor: C.border, background: C.parchment }}>
          <svg viewBox={`0 0 ${W} ${H + 200}`} className="w-full h-auto"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <rect width={W} height={H + 200} fill={C.parchment} />

            {/* Title */}
            <text x={CX} y={30} textAnchor="middle" fontSize="11" letterSpacing="4" fontWeight="600" fill={C.ink}>
              THE FOUR CALENDARS OF MOROCCO
            </text>
            <text x={CX} y={46} textAnchor="middle" fontSize="6.5" letterSpacing="2" fill={C.muted}>
              GREGORIAN · ISLAMIC LUNAR · AMAZIGH AGRICULTURAL · SCHOOL YEAR · OVERLAID ON A SINGLE RADIAL WHEEL
            </text>

            {/* ═══ MONTH SPOKES ═══ */}
            {MONTHS.map((m, i) => {
              const a = dateToAngle(i, 1)
              const [x1, y1] = polar(CX, CY, R_INNER - 5, a)
              const [x2, y2] = polar(CX, CY, R_OUT + 8, a)
              const [xl, yl] = polar(CX, CY, R_OUT + 22, a)
              return (
                <g key={m}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={C.border} strokeWidth="0.4" />
                  <text x={xl} y={yl + 3} textAnchor="middle"
                    fontSize="8" fontWeight="600" fill={C.ink}
                    transform={`rotate(${(a * 180 / Math.PI) + 90}, ${xl}, ${yl})`}>
                    {m}
                  </text>
                </g>
              )
            })}

            {/* ═══ RING BACKGROUNDS ═══ */}
            {/* Gregorian ring */}
            <circle cx={CX} cy={CY} r={(R_GREG[0] + R_GREG[1]) / 2} fill="none"
              stroke={C.gregorian} strokeWidth={R_GREG[1] - R_GREG[0]} strokeOpacity={0.04} />
            {/* Islamic ring */}
            <circle cx={CX} cy={CY} r={(R_ISLAM[0] + R_ISLAM[1]) / 2} fill="none"
              stroke={C.islamic} strokeWidth={R_ISLAM[1] - R_ISLAM[0]} strokeOpacity={0.04} />
            {/* Amazigh ring */}
            <circle cx={CX} cy={CY} r={(R_AMAZ[0] + R_AMAZ[1]) / 2} fill="none"
              stroke={C.amazigh} strokeWidth={R_AMAZ[1] - R_AMAZ[0]} strokeOpacity={0.04} />
            {/* School ring */}
            <circle cx={CX} cy={CY} r={(R_SCHOOL[0] + R_SCHOOL[1]) / 2} fill="none"
              stroke={C.school} strokeWidth={R_SCHOOL[1] - R_SCHOOL[0]} strokeOpacity={0.04} />

            {/* Ring borders */}
            {[R_GREG[0], R_GREG[1], R_ISLAM[0], R_AMAZ[0], R_SCHOOL[0], R_SCHOOL[1]].map((r, i) => (
              <circle key={i} cx={CX} cy={CY} r={r} fill="none"
                stroke={C.border} strokeWidth="0.3" />
            ))}

            {/* Ring labels (rotated on left side) */}
            {[
              { label: 'GREGORIAN', r: (R_GREG[0] + R_GREG[1]) / 2, color: C.gregorian },
              { label: 'ISLAMIC LUNAR', r: (R_ISLAM[0] + R_ISLAM[1]) / 2, color: C.islamic },
              { label: 'AMAZIGH AGRICULTURAL', r: (R_AMAZ[0] + R_AMAZ[1]) / 2, color: C.amazigh },
              { label: 'SCHOOL CALENDAR', r: (R_SCHOOL[0] + R_SCHOOL[1]) / 2, color: C.school },
            ].map(ring => {
              const a = Math.PI // left side (180°)
              const [x, y] = polar(CX, CY, ring.r, a)
              return (
                <text key={ring.label} x={x} y={y} textAnchor="middle" fontSize="5" letterSpacing="2"
                  fill={ring.color} fillOpacity={0.5} fontWeight="600"
                  transform={`rotate(90, ${x}, ${y})`}>
                  {ring.label}
                </text>
              )
            })}

            {/* ═══ AMAZIGH SEASONS (background arcs) ═══ */}
            {[
              { name: 'TAGREST (Winter)', start: dateToAngle(11, 21), end: dateToAngle(2, 20), color: '#6B8CAE' },
              { name: 'TAFSUT (Spring)', start: dateToAngle(2, 20), end: dateToAngle(5, 21), color: '#7BA05B' },
              { name: 'IWILEN (Summer)', start: dateToAngle(5, 21), end: dateToAngle(8, 22), color: '#C4956A' },
              { name: 'AMEWAN (Autumn)', start: dateToAngle(8, 22), end: dateToAngle(11, 21), color: '#B07D4B' },
            ].map(season => {
              let end = season.end
              if (end < season.start) end += Math.PI * 2
              return (
                <path key={season.name}
                  d={arcPath(CX, CY, R_AMAZ[0], R_AMAZ[1], season.start, end)}
                  fill={season.color} fillOpacity={0.08} stroke={season.color} strokeWidth="0.3" />
              )
            })}

            {/* ═══ EVENT MARKERS ═══ */}
            {EVENTS.map((ev, idx) => {
              const a1 = dateToAngle(ev.month, ev.dayStart)
              const a2 = ev.dayEnd ? dateToAngle(ev.month, ev.dayEnd) : a1 + 0.02
              const isRange = !!ev.dayEnd

              // Which ring?
              let r1: number, r2: number
              if (ev.system === 'gregorian') { r1 = R_GREG[0]; r2 = R_GREG[1] }
              else if (ev.system === 'islamic') { r1 = R_ISLAM[0]; r2 = R_ISLAM[1] }
              else if (ev.system === 'amazigh') { r1 = R_AMAZ[0]; r2 = R_AMAZ[1] }
              else { r1 = R_SCHOOL[0]; r2 = R_SCHOOL[1] }

              const midR = (r1 + r2) / 2
              const midA = isRange ? (a1 + a2) / 2 : a1
              const [tx, ty] = polar(CX, CY, midR, midA)

              // Short name for display
              const shortName = ev.name.length > 20 ? ev.name.slice(0, 18) + '…' : ev.name

              return (
                <g key={`${ev.name}-${idx}`}>
                  {isRange ? (
                    <path d={arcPath(CX, CY, r1 + 2, r2 - 2, a1, a2)}
                      fill={ev.color} fillOpacity={ev.fixed ? 0.2 : 0.15}
                      stroke={ev.color} strokeWidth="0.5"
                      strokeDasharray={ev.fixed ? 'none' : '3,2'} />
                  ) : (
                    (() => {
                      const [lx1, ly1] = polar(CX, CY, r1, a1)
                      const [lx2, ly2] = polar(CX, CY, r2, a1)
                      return <line x1={lx1} y1={ly1} x2={lx2} y2={ly2}
                        stroke={ev.color} strokeWidth={1.2}
                        strokeDasharray={ev.fixed ? 'none' : '2,2'} />
                    })()
                  )}
                  {/* Label — only for non-range or important events */}
                  {(!isRange || ev.name.includes('Ramadan') || ev.name.includes('Harvest') || ev.name.includes('Break') || ev.name.includes('Rentrée')) && (
                    <text x={tx} y={ty + 2} textAnchor="middle" fontSize="4"
                      fill={ev.color} fontWeight="500"
                      transform={`rotate(${(midA * 180 / Math.PI) + 90}, ${tx}, ${ty})`}>
                      {shortName}
                    </text>
                  )}
                </g>
              )
            })}

            {/* ═══ CENTER ═══ */}
            <circle cx={CX} cy={CY} r={R_INNER} fill={C.cream} stroke={C.border} strokeWidth="0.5" />
            <text x={CX} y={CY - 30} textAnchor="middle" fontSize="9" fontWeight="600" fill={C.ink} letterSpacing="2">
              MOROCCO
            </text>
            <text x={CX} y={CY - 18} textAnchor="middle" fontSize="6" fill={C.muted} letterSpacing="1">
              FOUR CALENDARS
            </text>
            <text x={CX} y={CY - 6} textAnchor="middle" fontSize="5" fill={C.muted}>
              ONE COUNTRY
            </text>
            {/* Year markers */}
            <text x={CX} y={CY + 12} textAnchor="middle" fontSize="7" fill={C.gregorian}>2026 CE</text>
            <text x={CX} y={CY + 24} textAnchor="middle" fontSize="7" fill={C.islamic}>1447–1448 AH</text>
            <text x={CX} y={CY + 36} textAnchor="middle" fontSize="7" fill={C.amazigh}>2976 Amazigh</text>
            <text x={CX} y={CY + 48} textAnchor="middle" fontSize="6" fill={C.school}>Academic 2025–26</text>

            {/* ═══ RAMADAN DRIFT ILLUSTRATION ═══ */}
            {/* Show Ramadan's position across 5 years to illustrate the drift */}
            <g>
              {[
                { year: 2024, month: 2, day: 12 },
                { year: 2025, month: 2, day: 1 },
                { year: 2026, month: 1, day: 18 },
                { year: 2027, month: 1, day: 8 },
                { year: 2028, month: 0, day: 28 },
              ].map((r, i) => {
                const a = dateToAngle(r.month, r.day)
                const [x, y] = polar(CX, CY, R_ISLAM[1] + 3 + i * 4, a)
                return (
                  <g key={r.year}>
                    <circle cx={x} cy={y} r={1.5}
                      fill={C.islamic} fillOpacity={0.3 + i * 0.15} />
                    <text x={x + 4} y={y + 2} fontSize="3.5" fill={C.islamic} fillOpacity={0.5}>
                      {r.year}
                    </text>
                  </g>
                )
              })}
              <text x={CX + R_ISLAM[1] + 30} y={CY - R_ISLAM[1] + 55} fontSize="4.5" fill={C.islamic}
                fontStyle="italic" fillOpacity="0.6">
                Ramadan drifts ← 11 days/year
              </text>
            </g>

            {/* ═══ LEGEND ═══ */}
            <g transform={`translate(50, ${H + 10})`}>
              {[
                { name: 'Gregorian (business + national)', color: C.gregorian, desc: 'Fixed dates. Throne Day, Independence, Labour Day. Governs commerce, government, international relations.' },
                { name: 'Islamic Lunar (spiritual life)', color: C.islamic, desc: 'Shifts 11 days earlier each year. Ramadan, Eid al-Fitr, Eid al-Adha, Mawlid. Governs fasting, prayer, sacrifice, family gathering.' },
                { name: 'Amazigh Agricultural (land + seasons)', color: C.amazigh, desc: 'Solar, fixed. Yennayer (Jan 13–14), equinoxes, solstices, harvest cycles. Governs ploughing, sowing, harvest. National holiday since 2024.' },
                { name: 'School Calendar (family life)', color: C.school, desc: 'French-inherited structure. Rentrée (Sep), autumn/winter/spring breaks, baccalauréat (June). Governs family travel, domestic tourism, childcare.' },
              ].map((leg, i) => (
                <g key={leg.name} transform={`translate(${i * 275}, 0)`}>
                  <rect width={12} height={12} fill={leg.color} fillOpacity={0.3} stroke={leg.color} strokeWidth="0.5" rx={2} />
                  <text x={17} y={10} fontSize="6.5" fontWeight="600" fill={leg.color}>{leg.name}</text>
                  <text x={17} y={22} fontSize="5" fill={C.muted}>
                    {leg.desc.slice(0, 80)}
                  </text>
                  <text x={17} y={30} fontSize="5" fill={C.muted}>
                    {leg.desc.slice(80)}
                  </text>
                </g>
              ))}
            </g>

            {/* Dashed = shifts / Solid = fixed */}
            <g transform={`translate(50, ${H + 55})`}>
              <line x1={0} y1={5} x2={20} y2={5} stroke={C.ink} strokeWidth="1" />
              <text x={25} y={8} fontSize="5" fill={C.muted}>Solid = fixed date</text>
              <line x1={120} y1={5} x2={140} y2={5} stroke={C.ink} strokeWidth="1" strokeDasharray="3,2" />
              <text x={145} y={8} fontSize="5" fill={C.muted}>Dashed = shifts annually (Islamic lunar)</text>
            </g>

            {/* Colophon */}
            <text x={CX} y={H + 85} textAnchor="middle" fontSize="5" fill={C.muted} letterSpacing="1.5">
              ISLAMIC DATES APPROXIMATE FOR 2026 · SHIFTS ~11 DAYS EARLIER EACH GREGORIAN YEAR · AMAZIGH CALENDAR OFFSET 13 DAYS FROM GREGORIAN (JULIAN LEGACY)
            </text>
            <text x={CX} y={H + 100} textAnchor="middle" fontSize="5" fill={C.muted} letterSpacing="1">
              SOURCES: MOROCCAN MINISTRY OF HABOUS · MINISTRY OF NATIONAL EDUCATION · HCP · IRCAM · © 2026 DANCING WITH LIONS
            </text>
            <text x={CX} y={H + 115} textAnchor="middle" fontSize="6" fontStyle="italic" fill={C.islamic}>
              Source: Dancing with Lions
            </text>
          </svg>
        </div>
      </section>

      {/* ═══ THE AMAZIGH MONTHS ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.amazigh }}>The Amazigh Agricultural Year (2976)</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {AMAZIGH_MONTHS.map((m, i) => (
              <div key={m.name} className="border p-3" style={{ borderColor: C.border }}>
                <p className="text-[11px] font-semibold" style={{ color: C.amazigh }}>{m.name}</p>
                <p className="text-[8px]" style={{ color: C.muted }}>starts {m.start} · {MONTH_FULL[i]}</p>
                <p className="text-[8px] mt-1" style={{ color: C.text }}>{m.season}</p>
                <p className="text-[8px] italic" style={{ color: C.muted }}>{m.activity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COLLISIONS — WHERE CALENDARS OVERLAP ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.overlap }}>Collisions</p>
          <p className="text-[13px] font-serif italic mb-4" style={{ color: C.ink }}>
            When calendars overlap, Morocco bends
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-2 pl-4" style={{ borderColor: C.overlap }}>
              <p className="text-[11px] font-semibold mb-1" style={{ color: C.overlap }}>
                Ramadan + School Exams
              </p>
              <p className="text-[11px] leading-[1.6]" style={{ color: C.text }}>
                When Ramadan falls during May–June (as it did in 2018–2019),
                students fast from dawn while preparing for the baccalauréat.
                Cafés close during daylight. Productivity drops. School hours
                shorten. The entire country runs on a different clock — rising
                later, eating at sunset, staying up until 2am. Exams happen
                anyway.
              </p>
            </div>
            <div className="border-l-2 pl-4" style={{ borderColor: C.overlap }}>
              <p className="text-[11px] font-semibold mb-1" style={{ color: C.overlap }}>
                Eid al-Adha + Summer Holidays
              </p>
              <p className="text-[11px] leading-[1.6]" style={{ color: C.text }}>
                The sacrifice feast requires a sheep for every household —
                prices spike, roads fill, every family travels to their
                hometown. When this collides with the July–August school
                break (as in 2026), the transport system maxes out.
                Marrakech empties of tourists. Butchers work around the clock.
                The entire country smells of grilled meat for three days.
              </p>
            </div>
            <div className="border-l-2 pl-4" style={{ borderColor: C.overlap }}>
              <p className="text-[11px] font-semibold mb-1" style={{ color: C.overlap }}>
                Yennayer + Winter Break + New Year
              </p>
              <p className="text-[11px] leading-[1.6]" style={{ color: C.text }}>
                Three new years in two weeks. Gregorian January 1 (celebrated
                in cities). Yennayer January 13 (national holiday since 2024).
                The school winter break spans both. For Amazigh families,
                this is a triple alignment — the Western calendar, the
                ancestral calendar, and the children&apos;s freedom all arrive at once.
                Couscous with seven vegetables on the 13th. The wheel turns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ READING NOTES ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.islamic }}>The Lunar Drift</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The Islamic calendar is purely lunar — 354 days, 11 days shorter than
                the solar year. This means Ramadan, Eid al-Adha, and every Islamic
                holiday migrates backward through the Gregorian calendar, completing
                a full cycle every 33 years. A Moroccan born in 1990 has experienced
                Ramadan in every season. The practical consequence is that no fixed
                planning is possible: a restaurant that thrives in a summer Ramadan
                (tourists eat, locals don&apos;t) will struggle in a winter one (shorter
                fasting hours, but tourism also drops). The government announces each
                month&apos;s start by physical moon sighting, sometimes just hours in advance.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.amazigh }}>The Julian Legacy</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The Amazigh calendar is a surviving form of the Julian calendar,
                introduced by Rome 2,000 years ago and never replaced. It runs 13
                days behind the Gregorian (which reformed away the Julian drift in 1582).
                This means Yennayer falls on January 13–14 instead of January 1.
                The month names are Latin — Yennayer from Januarius, Furar from
                Februarius, Meghres from Martius. The year count (2976 in 2026) was
                invented in 1980 by Ammar Negadi, pegged to 950 BCE when the Amazigh
                king Shoshenq I took the Egyptian throne. A political date for a
                practical calendar.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.school }}>La Rentrée</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The school year begins in early September — la rentrée scolaire —
                and this single date structures more of Moroccan life than any
                government decree. It sets the rhythm of family travel (July–August
                is vacation, September is back to school). It creates the tourist
                seasons (summer = Moroccan domestic tourism, autumn–spring = international).
                It determines when parents can and cannot leave work. French schools,
                Spanish schools, American schools, and Moroccan public schools all
                follow slightly different calendars, adding yet another layer.
                A Moroccan family with children in a French school lives on French time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            Ask a Moroccan what year it is and you will get three answers. Ask when
            the holiday starts and you will get four. The Gregorian calendar pays the
            bills. The Islamic calendar feeds the soul. The Amazigh calendar reads the
            soil. The school calendar raises the children. None of them agree with each
            other. All of them are running simultaneously, in the same family, in the
            same house, on the same Tuesday afternoon. This is not confusion. This is
            Morocco&apos;s operating system.
          </p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: C.muted }}>
            Gregorian national holidays: Official Moroccan government calendar. Islamic dates:
            approximate Hijri-Gregorian conversions for 1447–1448 AH; exact dates determined by
            moon sighting and announced by the Ministry of Habous and Islamic Affairs. Amazigh
            calendar: Wikipedia &quot;Berber calendar&quot;; Life in Morocco (2024); Morocco World News
            Yennayer 2976 coverage (January 2026); IRCAM. School calendar: Ministry of National
            Education Ministerial Decision 051.25 (July 2025); Médias24 school calendar 2025–2026;
            French Embassy school holiday schedule. Ramadan drift positions calculated from standard
            Hijri-Gregorian offset of 10.875 days per year. Yennayer declared national holiday by
            Royal decree, May 3, 2023, effective 2024.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: C.border }}>
              © {new Date().getFullYear()} Dancing with Lions. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.islamic }}>
              Source: Dancing with Lions
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
