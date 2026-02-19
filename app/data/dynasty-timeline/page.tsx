'use client'

import Link from 'next/link'

// ═══ THE DYNASTY TIMELINE ═══
// 1,200 years. Seven dynasties. One horizontal composition.
// Each dynasty gets a proportional band, architectural illustration,
// key facts, and notable sultans. Dense, precise, poster-grade.

const C = {
  idrisid: '#2D6E4F',
  almoravid: '#8B6914',
  almohad: '#1A5276',
  marinid: '#7B2D8D',
  wattasid: '#5C4033',
  saadian: '#722F37',
  alaouite: '#8B3A3A',
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  parchment: '#FFFFFF',
  cream: '#FFFFFF',
  gap: '#D4C5B0',
}

// ═══ DYNASTY DATA ═══
interface Dynasty {
  name: string
  arabic: string
  start: number
  end: number
  color: string
  origin: string
  ethnicity: string
  capital: string
  territory: string
  keyRuler: string
  keyDate: string
  monument: string
  monumentNote: string
  legacy: string
  sultans: number
  fall: string
}

const DYNASTIES: Dynasty[] = [
  {
    name: 'Idrisids',
    arabic: 'الأدارسة',
    start: 789,
    end: 985,
    color: C.idrisid,
    origin: 'Fled Abbasid persecution',
    ethnicity: 'Arab (Sharifian)',
    capital: 'Fes (founded 808)',
    territory: 'Northern Morocco',
    keyRuler: 'Idris II (r. 808–828)',
    keyDate: '859: Al-Qarawiyyin founded — world\'s oldest university',
    monument: 'Al-Qarawiyyin Mosque',
    monumentNote: 'Founded by Fatima al-Fihri. Oldest degree-granting university.',
    legacy: 'First Islamic state in Morocco. Founded Fes. Established Sharifian legitimacy that persists 1,200 years later.',
    sultans: 12,
    fall: 'Fragmented into rival branches. Overthrown by Fatimids, then Umayyads of Córdoba.',
  },
  {
    name: 'Almoravids',
    arabic: 'المرابطون',
    start: 1040,
    end: 1147,
    color: C.almoravid,
    origin: 'Saharan ribat (fortress-monastery)',
    ethnicity: 'Sanhaja Berber',
    capital: 'Marrakech (founded ~1070)',
    territory: 'Morocco + Al-Andalus + Sahara',
    keyRuler: 'Yusuf ibn Tashfin (r. 1061–1106)',
    keyDate: '1070: Marrakech founded as imperial capital',
    monument: 'Koubba Almoravid',
    monumentNote: 'Only surviving Almoravid structure in Marrakech (1117). Ablutions pavilion.',
    legacy: 'Founded Marrakech. Built city walls (1126). United Maghreb and Iberia. Introduced Maliki jurisprudence.',
    sultans: 6,
    fall: 'Almohad rebellion from High Atlas. Marrakech fell 1147.',
  },
  {
    name: 'Almohads',
    arabic: 'الموحدون',
    start: 1121,
    end: 1269,
    color: C.almohad,
    origin: 'Tinmal, High Atlas Mountains',
    ethnicity: 'Masmuda Berber',
    capital: 'Marrakech (+ Rabat, Seville)',
    territory: 'Morocco + North Africa + Al-Andalus',
    keyRuler: 'Ya\'qub al-Mansur (r. 1184–1199)',
    keyDate: '1195: Battle of Alarcos — defeated Castile. Built Bab Agnaou, Hassan Tower, Koutoubia.',
    monument: 'Koutoubia Mosque',
    monumentNote: '77m minaret. Template for Giralda (Seville) and Hassan Tower (Rabat).',
    legacy: 'Largest Moroccan empire. Monumental architecture. Reformed theology (strict monotheism). Built Kasbah of Marrakech.',
    sultans: 12,
    fall: 'Defeat at Las Navas de Tolosa (1212). Fragmented. Marinids took Marrakech 1269.',
  },
  {
    name: 'Marinids',
    arabic: 'المرينيون',
    start: 1244,
    end: 1465,
    color: C.marinid,
    origin: 'Eastern Morocco / Rif Mountains',
    ethnicity: 'Zenata Berber',
    capital: 'Fes (Fes el-Jdid, 1276)',
    territory: 'Morocco (briefly Tlemcen, Tunis)',
    keyRuler: 'Abu Inan Faris (r. 1348–1358)',
    keyDate: '1276: Fes el-Jdid ("New Fes") built as royal city. Medersa Bou Inania completed 1356.',
    monument: 'Bou Inania Medersa',
    monumentNote: 'Masterpiece of Marinid architecture. Fes. The only medersa with its own minbar.',
    legacy: 'Golden age of medersas. Built 7+ medersas in Fes. Chellah necropolis. Patronised scholarship.',
    sultans: 21,
    fall: 'Weakened by plague, Portuguese expansion. Power seized by Wattasid viziers.',
  },
  {
    name: 'Wattasids',
    arabic: 'الوطاسيون',
    start: 1472,
    end: 1554,
    color: C.wattasid,
    origin: 'Wattasid branch of Marinid viziers',
    ethnicity: 'Zenata Berber',
    capital: 'Fes',
    territory: 'Northern Morocco only',
    keyRuler: 'Muhammad al-Shaykh al-Wattasi (r. 1472–1504)',
    keyDate: '1471: Portuguese take Tangier and Asilah. Wattasid control limited.',
    monument: 'No major new construction',
    monumentNote: 'Period of decline. Portuguese held 7 coastal cities.',
    legacy: 'Weakest dynasty. Lost southern Morocco to Saadians. Unable to stop Portuguese expansion.',
    sultans: 5,
    fall: 'Saadians conquered Fes in 1549. Last sultan deposed 1554.',
  },
  {
    name: 'Saadians',
    arabic: 'السعديون',
    start: 1549,
    end: 1659,
    color: C.saadian,
    origin: 'Draa Valley, southern Morocco',
    ethnicity: 'Arab (Sharifian)',
    capital: 'Marrakech',
    territory: 'Morocco + Songhai Empire (Timbuktu)',
    keyRuler: 'Ahmad al-Mansur (r. 1578–1603)',
    keyDate: '1578: Battle of Three Kings — defeated Portugal. 1591: Conquered Timbuktu.',
    monument: 'El Badi Palace + Saadian Tombs',
    monumentNote: '"The Incomparable" palace. Tombs hidden for 200 years, rediscovered 1917.',
    legacy: 'Defeated European powers. Trans-Saharan gold trade. Alliance with Elizabeth I. Sugar industry. Marrakech rebuilt.',
    sultans: 11,
    fall: 'Civil war after al-Mansur\'s death (1603). Fragmented until 1659.',
  },
  {
    name: 'Alaouites',
    arabic: 'العلويون',
    start: 1631,
    end: 2026,
    color: C.alaouite,
    origin: 'Tafilalet oasis, southeastern Morocco',
    ethnicity: 'Arab (Sharifian)',
    capital: 'Meknes → Fes → Rabat (1912–)',
    territory: 'Morocco (current borders)',
    keyRuler: 'Moulay Ismail (r. 1672–1727)',
    keyDate: '1672: Moulay Ismail builds Meknes as imperial capital. 1956: Mohammed V — independence.',
    monument: 'Meknes Imperial City + Hassan II Mosque',
    monumentNote: 'Moulay Ismail\'s Meknes: 45km of walls. Hassan II Mosque (1993): world\'s tallest minaret (210m).',
    legacy: 'Longest-reigning dynasty (395+ years). Independence from France (1956). Modern constitutional monarchy. Mohammed VI (2030 World Cup).',
    sultans: 17,
    fall: '— (reigning)',
  },
]

// ═══ SVG CONSTANTS ═══
const SVG_W = 1600
const SVG_H = 900
const TIMELINE_Y = 420 // vertical center of timeline band
const BAND_H = 80 // height of dynasty band
const YEAR_START = 750 // leftmost year
const YEAR_END = 2050 // rightmost year
const MARGIN_L = 80
const MARGIN_R = 40
const CHART_W = SVG_W - MARGIN_L - MARGIN_R

function yearToX(year: number): number {
  return MARGIN_L + ((year - YEAR_START) / (YEAR_END - YEAR_START)) * CHART_W
}

// ═══ ARCHITECTURAL MICRO-ILLUSTRATIONS ═══
function ArchIllustration({ dynasty, x, y, w }: { dynasty: Dynasty; x: number; y: number; w: number }) {
  const cx = x + w / 2
  const color = dynasty.color

  if (dynasty.name === 'Idrisids') {
    // Al-Qarawiyyin — arched courtyard
    return (
      <g>
        <path d={`M ${cx - 18},${y + 40} L ${cx - 18},${y + 15} A 18,15 0 0,1 ${cx + 18},${y + 15} L ${cx + 18},${y + 40}`}
          fill={color} fillOpacity={0.08} stroke={color} strokeWidth="0.8" />
        <path d={`M ${cx - 8},${y + 40} L ${cx - 8},${y + 22} A 8,8 0 0,1 ${cx + 8},${y + 22} L ${cx + 8},${y + 40}`}
          fill={C.parchment} stroke={color} strokeWidth="0.6" />
        <line x1={cx} y1={y + 22} x2={cx} y2={y + 40} stroke={color} strokeWidth="0.4" />
        <rect x={cx - 20} y={y + 40} width={40} height={2} fill={color} fillOpacity={0.3} />
      </g>
    )
  }

  if (dynasty.name === 'Almoravids') {
    // Koubba dome
    return (
      <g>
        <rect x={cx - 12} y={y + 25} width={24} height={18} fill={color} fillOpacity={0.06} stroke={color} strokeWidth="0.6" />
        <path d={`M ${cx - 14},${y + 25} Q ${cx},${y + 5} ${cx + 14},${y + 25}`}
          fill={color} fillOpacity={0.1} stroke={color} strokeWidth="0.8" />
        <circle cx={cx} cy={y + 5} r={2} fill={color} fillOpacity={0.3} />
        <rect x={cx - 1} y={y + 1} width={2} height={5} fill={color} fillOpacity={0.5} />
      </g>
    )
  }

  if (dynasty.name === 'Almohads') {
    // Koutoubia minaret
    return (
      <g>
        <rect x={cx - 8} y={y + 5} width={16} height={38} fill={color} fillOpacity={0.08} stroke={color} strokeWidth="0.8" />
        <rect x={cx - 5} y={y + 0} width={10} height={8} fill={color} fillOpacity={0.12} stroke={color} strokeWidth="0.6" />
        <rect x={cx - 2} y={y - 5} width={4} height={7} fill={color} fillOpacity={0.2} />
        <circle cx={cx} cy={y - 7} r={2} fill={color} fillOpacity={0.3} />
        {/* Decorative arches */}
        {[12, 22, 32].map(yy => (
          <path key={yy} d={`M ${cx - 5},${y + yy} A 5,4 0 0,1 ${cx + 5},${y + yy}`}
            fill="none" stroke={color} strokeWidth="0.4" />
        ))}
      </g>
    )
  }

  if (dynasty.name === 'Marinids') {
    // Medersa courtyard with zellige
    return (
      <g>
        <rect x={cx - 16} y={y + 10} width={32} height={32} fill={color} fillOpacity={0.06} stroke={color} strokeWidth="0.8" />
        {/* Inner courtyard */}
        <rect x={cx - 8} y={y + 18} width={16} height={16} fill={C.parchment} stroke={color} strokeWidth="0.4" />
        {/* Zellige band */}
        <rect x={cx - 16} y={y + 35} width={32} height={7} fill={color} fillOpacity={0.12} stroke={color} strokeWidth="0.4" />
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={cx - 15 + i * 4} y={y + 36} width={3} height={5}
            fill={color} fillOpacity={(i % 2 ? 0.2 : 0.08)} />
        ))}
        {/* Archway */}
        <path d={`M ${cx - 4},${y + 18} A 4,5 0 0,1 ${cx + 4},${y + 18}`}
          fill="none" stroke={color} strokeWidth="0.5" />
      </g>
    )
  }

  if (dynasty.name === 'Wattasids') {
    // Minimal — crumbling wall fragment
    return (
      <g>
        <rect x={cx - 14} y={y + 15} width={28} height={28} fill={color} fillOpacity={0.04} stroke={color} strokeWidth="0.5" strokeDasharray="2,2" />
        <line x1={cx - 10} y1={y + 25} x2={cx + 10} y2={y + 25} stroke={color} strokeWidth="0.3" />
        <text x={cx} y={y + 33} textAnchor="middle" fontSize="5" fill={color} fillOpacity={0.5} fontStyle="italic">
          no major
        </text>
        <text x={cx} y={y + 39} textAnchor="middle" fontSize="5" fill={color} fillOpacity={0.5} fontStyle="italic">
          monuments
        </text>
      </g>
    )
  }

  if (dynasty.name === 'Saadians') {
    // El Badi Palace — pool and pavilion
    return (
      <g>
        <rect x={cx - 18} y={y + 12} width={36} height={30} fill={color} fillOpacity={0.06} stroke={color} strokeWidth="0.8" />
        {/* Central pool */}
        <rect x={cx - 10} y={y + 20} width={20} height={10} fill={color} fillOpacity={0.08} stroke={color} strokeWidth="0.4" rx={1} />
        {/* Pavilions */}
        <rect x={cx - 16} y={y + 22} width={4} height={6} fill={color} fillOpacity={0.15} />
        <rect x={cx + 12} y={y + 22} width={4} height={6} fill={color} fillOpacity={0.15} />
        {/* Decorative top */}
        <path d={`M ${cx - 6},${y + 12} L ${cx - 6},${y + 8} L ${cx},${y + 4} L ${cx + 6},${y + 8} L ${cx + 6},${y + 12}`}
          fill={color} fillOpacity={0.1} stroke={color} strokeWidth="0.5" />
      </g>
    )
  }

  if (dynasty.name === 'Alaouites') {
    // Hassan II Mosque — tallest minaret
    return (
      <g>
        <rect x={cx - 4} y={y - 10} width={8} height={52} fill={color} fillOpacity={0.08} stroke={color} strokeWidth="0.8" />
        <rect x={cx - 2.5} y={y - 16} width={5} height={8} fill={color} fillOpacity={0.15} stroke={color} strokeWidth="0.5" />
        <rect x={cx - 1} y={y - 20} width={2} height={5} fill={color} fillOpacity={0.25} />
        <circle cx={cx} cy={y - 22} r={1.5} fill={color} fillOpacity={0.4} />
        {/* Base platform */}
        <rect x={cx - 18} y={y + 35} width={36} height={8} fill={color} fillOpacity={0.06} stroke={color} strokeWidth="0.5" />
        {/* Water line */}
        <line x1={cx - 25} y1={y + 43} x2={cx + 25} y2={y + 43} stroke={color} strokeWidth="0.3" strokeDasharray="3,2" />
        <text x={cx} y={y + 50} textAnchor="middle" fontSize="4" fill={color} fillOpacity={0.4}>210m</text>
      </g>
    )
  }

  return null
}

// ═══ CENTURY MARKERS ═══
const CENTURIES = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000]

// ═══ KEY EVENTS ═══
const EVENTS = [
  { year: 789, label: 'Idris I arrives', y: -40 },
  { year: 859, label: 'Al-Qarawiyyin', y: -55 },
  { year: 1070, label: 'Marrakech founded', y: -40 },
  { year: 1147, label: 'Almohads take Marrakech', y: -55 },
  { year: 1212, label: 'Las Navas de Tolosa', y: -40 },
  { year: 1276, label: 'Fes el-Jdid built', y: -55 },
  { year: 1415, label: 'Portuguese take Ceuta', y: -40 },
  { year: 1578, label: 'Battle of Three Kings', y: -55 },
  { year: 1672, label: 'Moulay Ismail — Meknes', y: -40 },
  { year: 1912, label: 'French Protectorate', y: -55 },
  { year: 1956, label: 'Independence', y: -40 },
  { year: 2030, label: 'World Cup', y: -55 },
]

export default function DynastyTimelinePage() {
  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-36 pb-6">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 017 · Historical Timeline</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>The Dynasty Timeline</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          1,237 years of rule on a single line
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4" style={{ color: C.text }}>
          Seven dynasties have ruled Morocco since 789 AD — Idrisid, Almoravid,
          Almohad, Marinid, Wattasid, Saadian, and Alaouite. Two were Arab Sharifian,
          five were Berber. Three made Fes their capital, three chose Marrakech, one
          built Meknes. The Alaouites have reigned since 1631 — 395 years and counting.
          Each dynasty left monuments that still stand.
        </p>
      </section>

      {/* ═══ THE TIMELINE ═══ */}
      <section className="max-w-[1600px] mx-auto px-2 md:px-4 overflow-x-auto">
        <div className="border" style={{ borderColor: C.border, background: C.parchment, minWidth: 1200 }}>
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <rect width={SVG_W} height={SVG_H} fill={C.parchment} />

            {/* Title */}
            <text x={SVG_W / 2} y={30} textAnchor="middle" fontSize="11" letterSpacing="4" fontWeight="600" fill={C.ink}>
              THE DYNASTIES OF MOROCCO
            </text>
            <text x={SVG_W / 2} y={45} textAnchor="middle" fontSize="6.5" letterSpacing="2" fill={C.muted}>
              789 AD — PRESENT · SEVEN DYNASTIES · FOUR IMPERIAL CITIES · 1,237 YEARS
            </text>

            {/* Century grid lines */}
            {CENTURIES.map(year => {
              const x = yearToX(year)
              return (
                <g key={year}>
                  <line x1={x} y1={TIMELINE_Y - 70} x2={x} y2={TIMELINE_Y + BAND_H + 10}
                    stroke={C.border} strokeWidth="0.3" />
                  <text x={x} y={TIMELINE_Y + BAND_H + 25} textAnchor="middle"
                    fontSize="7" fill={C.muted}>
                    {year}
                  </text>
                </g>
              )
            })}

            {/* ═══ DYNASTY BANDS ═══ */}
            {DYNASTIES.map(d => {
              const x1 = yearToX(d.start)
              const x2 = yearToX(Math.min(d.end, 2026))
              const w = x2 - x1
              const archY = TIMELINE_Y - 70

              return (
                <g key={d.name}>
                  {/* Dynasty band */}
                  <rect x={x1} y={TIMELINE_Y} width={w} height={BAND_H}
                    fill={d.color} fillOpacity={0.12}
                    stroke={d.color} strokeWidth="1"
                  />

                  {/* Hatching for density */}
                  {Array.from({ length: Math.floor(w / 4) }, (_, i) => (
                    <line key={i} x1={x1 + i * 4} y1={TIMELINE_Y}
                      x2={x1 + i * 4} y2={TIMELINE_Y + BAND_H}
                      stroke={d.color} strokeWidth="0.15" strokeOpacity="0.3" />
                  ))}

                  {/* Dynasty name in band */}
                  {w > 40 && (
                    <>
                      <text x={x1 + w / 2} y={TIMELINE_Y + 18}
                        textAnchor="middle" fontSize={w > 100 ? 9 : 7}
                        fontWeight="600" letterSpacing="1" fill={d.color}>
                        {d.name.toUpperCase()}
                      </text>
                      <text x={x1 + w / 2} y={TIMELINE_Y + 30}
                        textAnchor="middle" fontSize="5.5" fill={d.color} fillOpacity="0.7">
                        {d.arabic}
                      </text>
                      <text x={x1 + w / 2} y={TIMELINE_Y + 42}
                        textAnchor="middle" fontSize="5" fill={C.muted}>
                        {d.start}–{d.end === 2026 ? 'present' : d.end}
                      </text>
                      <text x={x1 + w / 2} y={TIMELINE_Y + 52}
                        textAnchor="middle" fontSize="5" fill={C.muted}>
                        {d.ethnicity}
                      </text>
                      <text x={x1 + w / 2} y={TIMELINE_Y + 62}
                        textAnchor="middle" fontSize="4.5" fill={d.color} fillOpacity="0.6">
                        Capital: {d.capital}
                      </text>
                      {w > 80 && (
                        <text x={x1 + w / 2} y={TIMELINE_Y + 72}
                          textAnchor="middle" fontSize="4" fill={C.muted}>
                          {d.sultans} rulers · {d.monument}
                        </text>
                      )}
                    </>
                  )}

                  {/* Architectural illustration above band */}
                  <ArchIllustration dynasty={d} x={x1} y={archY} w={w} />

                  {/* Monument label above illustration */}
                  {w > 60 && (
                    <text x={x1 + w / 2} y={archY - 5} textAnchor="middle"
                      fontSize="4.5" fill={d.color} fontStyle="italic">
                      {d.monument}
                    </text>
                  )}
                </g>
              )
            })}

            {/* ═══ EVENT MARKERS ═══ */}
            {EVENTS.map(ev => {
              const x = yearToX(ev.year)
              return (
                <g key={ev.year}>
                  <line x1={x} y1={TIMELINE_Y + ev.y + 15} x2={x} y2={TIMELINE_Y - 2}
                    stroke={C.muted} strokeWidth="0.4" strokeDasharray="2,2" />
                  <circle cx={x} cy={TIMELINE_Y - 2} r={2} fill={C.muted} />
                  <text x={x} y={TIMELINE_Y + ev.y + 12} textAnchor="middle"
                    fontSize="5" fontWeight="500" fill={C.ink}>
                    {ev.year}
                  </text>
                  <text x={x} y={TIMELINE_Y + ev.y + 3} textAnchor="middle"
                    fontSize="4.5" fill={C.muted}>
                    {ev.label}
                  </text>
                </g>
              )
            })}

            {/* ═══ INTERREGNUM / OVERLAP MARKERS ═══ */}
            {/* Gap: Idrisid → Almoravid (985–1040) */}
            <rect x={yearToX(985)} y={TIMELINE_Y + 10} width={yearToX(1040) - yearToX(985)} height={BAND_H - 20}
              fill={C.gap} fillOpacity={0.15} stroke={C.gap} strokeWidth="0.5" strokeDasharray="3,3" />
            <text x={(yearToX(985) + yearToX(1040)) / 2} y={TIMELINE_Y + BAND_H / 2 + 4}
              textAnchor="middle" fontSize="4.5" fill={C.muted} fontStyle="italic">
              Zenata period
            </text>

            {/* ═══ CAPITAL CITIES BAR ═══ */}
            <g transform={`translate(0, ${TIMELINE_Y + BAND_H + 35})`}>
              <text x={MARGIN_L - 10} y={4} textAnchor="end" fontSize="5" fill={C.muted} fontWeight="500">Capital</text>
              {/* Fes periods */}
              {[{ s: 789, e: 985, c: C.idrisid }, { s: 1244, e: 1554, c: C.marinid }].map((p, i) => (
                <g key={`fes-${i}`}>
                  <rect x={yearToX(p.s)} y={-4} width={yearToX(p.e) - yearToX(p.s)} height={8}
                    fill={p.c} fillOpacity={0.15} stroke={p.c} strokeWidth="0.5" />
                  <text x={(yearToX(p.s) + yearToX(p.e)) / 2} y={3} textAnchor="middle" fontSize="4" fill={p.c}>FES</text>
                </g>
              ))}
              {/* Marrakech periods */}
              {[{ s: 1040, e: 1269, c: C.almohad }, { s: 1549, e: 1659, c: C.saadian }].map((p, i) => (
                <g key={`mkch-${i}`}>
                  <rect x={yearToX(p.s)} y={-4} width={yearToX(p.e) - yearToX(p.s)} height={8}
                    fill={p.c} fillOpacity={0.15} stroke={p.c} strokeWidth="0.5" />
                  <text x={(yearToX(p.s) + yearToX(p.e)) / 2} y={3} textAnchor="middle" fontSize="4" fill={p.c}>MARRAKECH</text>
                </g>
              ))}
              {/* Meknes period */}
              <rect x={yearToX(1672)} y={-4} width={yearToX(1727) - yearToX(1672)} height={8}
                fill={C.alaouite} fillOpacity={0.15} stroke={C.alaouite} strokeWidth="0.5" />
              <text x={(yearToX(1672) + yearToX(1727)) / 2} y={3} textAnchor="middle" fontSize="3.5" fill={C.alaouite}>MEKNES</text>
              {/* Rabat period */}
              <rect x={yearToX(1912)} y={-4} width={yearToX(2026) - yearToX(1912)} height={8}
                fill={C.alaouite} fillOpacity={0.15} stroke={C.alaouite} strokeWidth="0.5" />
              <text x={(yearToX(1912) + yearToX(2026)) / 2} y={3} textAnchor="middle" fontSize="4" fill={C.alaouite}>RABAT</text>
            </g>

            {/* ═══ ETHNICITY BAR ═══ */}
            <g transform={`translate(0, ${TIMELINE_Y + BAND_H + 50})`}>
              <text x={MARGIN_L - 10} y={4} textAnchor="end" fontSize="5" fill={C.muted} fontWeight="500">Origin</text>
              {DYNASTIES.map(d => {
                const x1 = yearToX(d.start)
                const x2 = yearToX(Math.min(d.end, 2026))
                const isArab = d.ethnicity.includes('Arab')
                return (
                  <g key={`eth-${d.name}`}>
                    <rect x={x1} y={-3} width={x2 - x1} height={6}
                      fill={isArab ? '#8B3A3A' : '#2D6E4F'} fillOpacity={0.2}
                      stroke={isArab ? '#8B3A3A' : '#2D6E4F'} strokeWidth="0.3" />
                  </g>
                )
              })}
              <text x={SVG_W - 100} y={4} fontSize="4.5" fill={C.muted}>
                <tspan fill="#2D6E4F">■</tspan> Berber  <tspan fill="#8B3A3A">■</tspan> Arab Sharifian
              </text>
            </g>

            {/* ═══ COLOPHON ═══ */}
            <text x={SVG_W / 2} y={SVG_H - 25} textAnchor="middle" fontSize="5" letterSpacing="2" fill={C.muted}>
              COMPILED FROM WIKIPEDIA, BRITANNICA, FANACK, UNESCO WORLD HERITAGE DOCUMENTATION · © 2026 DANCING WITH LIONS
            </text>
            <text x={SVG_W / 2} y={SVG_H - 12} textAnchor="middle" fontSize="6" fontStyle="italic" fill={C.alaouite}>
              © Dancing with Lions
            </text>

          </svg>
        </div>
      </section>

      {/* ═══ DYNASTY CARDS ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>Dynasty Profiles</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {DYNASTIES.map(d => (
              <div key={d.name} className="border p-4" style={{ borderColor: C.border }}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: d.color, opacity: 0.6 }} />
                  <span className="text-[13px] font-semibold" style={{ color: d.color }}>{d.name}</span>
                  <span className="text-[10px]" style={{ color: d.color, opacity: 0.6 }}>{d.arabic}</span>
                </div>
                <p className="text-[11px] mb-2" style={{ color: C.muted }}>{d.start}–{d.end === 2026 ? 'present' : d.end} · {d.ethnicity} · {d.sultans} rulers</p>
                <p className="text-[10px] leading-[1.5] mb-1" style={{ color: C.text }}>
                  <strong>Capital:</strong> {d.capital}
                </p>
                <p className="text-[10px] leading-[1.5] mb-1" style={{ color: C.text }}>
                  <strong>Key ruler:</strong> {d.keyRuler}
                </p>
                <p className="text-[10px] leading-[1.5] mb-1" style={{ color: C.text }}>
                  <strong>Monument:</strong> {d.monumentNote}
                </p>
                <p className="text-[10px] leading-[1.5] mb-1 italic" style={{ color: C.muted }}>
                  {d.legacy}
                </p>
                <p className="text-[9px] leading-[1.4] mt-2 pt-1" style={{ color: C.muted, borderTop: `0.5px solid ${C.border}` }}>
                  Fall: {d.fall}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            Seven dynasties. Four imperial cities. Three of them Berber, two of them
            Arab, all of them Muslim. The Koutoubia still stands because the Almohads
            built to last. The Alaouites still reign because they learned from everyone
            who came before. Morocco is the only country in North Africa that was never
            part of the Ottoman Empire. This timeline is why.
          </p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: C.muted }}>
            Dynasty dates and profiles: C.R. Pennell, &quot;Morocco: From Empire to Independence&quot; (Oneworld, 2003);
            Wikipedia (&quot;History of Morocco&quot;, individual dynasty articles); Britannica; Fanack.com Morocco history series;
            UNESCO World Heritage nomination files; Archnet architectural documentation;
            Embassy of Morocco (Washington, D.C.) historical publications. Sultan counts from
            primary genealogical sources. Architectural monuments verified against standing structures.
            The Zenata period (985–1040) between Idrisids and Almoravids is simplified — it comprised
            multiple competing Berber factions including the Maghrawa and Banu Ifran.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: C.border }}>
              © {new Date().getFullYear()} Dancing with Lions. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.alaouite }}>
              © Dancing with Lions
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
