'use client'

import Link from 'next/link'

// ═══ LANGUAGES OF MOROCCO ═══
// Who speaks what where. Census data made visual.
// Choropleth map by region showing Amazigh mother-tongue %.
// Three Amazigh zones (Tashelhit, Tamazight, Tarifit) mapped.
// Timeline: the shift since independence (1960–2024).
// French, Spanish, Hassaniya overlay layers.
// Nobody has made this visual. Until now.

const C = {
  // Languages
  darija: '#B8705A',
  tashelhit: '#2D6E4F',
  tamazight: '#4A6741',
  tarifit: '#1A5276',
  hassaniya: '#C17F28',
  french: '#5D3A5E',
  spanish: '#722F37',
  english: '#4A5568',
  msa: '#8B6914',
  // UI
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  parchment: '#FFFFFF',
  cream: '#FFFFFF',
  sea: '#E8EEF2',
}

// ═══ REGION DATA — 2024 CENSUS (HCP) ═══
interface Region {
  id: string
  name: string
  amazighPct: number  // Tamazight mother tongue %
  primaryAmazigh: string  // dominant Amazigh language
  darija: number  // Darija use %
  population: number  // thousands
  urban: number  // urbanization %
  // SVG path approximate centroid for label placement
  cx: number
  cy: number
  // Simplified SVG path
  path: string
  notes?: string
}

const REGIONS: Region[] = [
  {
    id: 'tanger-tetouan',
    name: 'Tanger-Tétouan-\nAl Hoceïma',
    amazighPct: 24.5,
    primaryAmazigh: 'Tarifit',
    darija: 88,
    population: 3860,
    urban: 62,
    cx: 248, cy: 62,
    path: 'M 215,20 L 290,15 L 310,35 L 295,75 L 275,95 L 235,90 L 210,70 L 195,45 Z',
    notes: 'Spanish widely spoken. Tarifit in Al Hoceïma.'
  },
  {
    id: 'oriental',
    name: 'Oriental',
    amazighPct: 32.3,
    primaryAmazigh: 'Tarifit',
    darija: 82,
    population: 2430,
    urban: 68,
    cx: 370, cy: 90,
    path: 'M 295,15 L 420,20 L 435,65 L 430,130 L 370,145 L 310,120 L 295,75 L 310,35 Z',
    notes: 'Tarifit + Eastern Zenati. Border with Algeria.'
  },
  {
    id: 'fes-meknes',
    name: 'Fès-Meknès',
    amazighPct: 16.2,
    primaryAmazigh: 'Tamazight',
    darija: 92,
    population: 4430,
    urban: 60,
    cx: 295, cy: 145,
    path: 'M 235,90 L 275,95 L 310,120 L 370,145 L 355,185 L 315,200 L 265,195 L 235,170 L 220,130 Z',
    notes: 'Tamazight in Middle Atlas foothills.'
  },
  {
    id: 'rabat-sale',
    name: 'Rabat-Salé-\nKénitra',
    amazighPct: 5.8,
    primaryAmazigh: 'Mixed',
    darija: 96,
    population: 4860,
    urban: 73,
    cx: 200, cy: 145,
    path: 'M 175,100 L 210,70 L 235,90 L 220,130 L 235,170 L 210,180 L 175,165 L 165,130 Z',
    notes: 'Administrative capital. French dominant L2.'
  },
  {
    id: 'beni-mellal',
    name: 'Béni Mellal-\nKhénifra',
    amazighPct: 34.3,
    primaryAmazigh: 'Tamazight',
    darija: 80,
    population: 2590,
    urban: 49,
    cx: 275, cy: 230,
    path: 'M 235,170 L 265,195 L 315,200 L 330,230 L 315,265 L 275,270 L 235,255 L 220,220 L 210,180 Z',
    notes: 'Heart of Central Atlas Tamazight zone.'
  },
  {
    id: 'casablanca',
    name: 'Casablanca-\nSettat',
    amazighPct: 3.6,
    primaryAmazigh: 'Mixed',
    darija: 97,
    population: 7050,
    urban: 81,
    cx: 180, cy: 210,
    path: 'M 155,175 L 175,165 L 210,180 L 220,220 L 200,250 L 165,245 L 150,215 Z',
    notes: 'Lowest Amazigh %. Economic capital. French business language.'
  },
  {
    id: 'marrakech-safi',
    name: 'Marrakech-Safi',
    amazighPct: 14.1,
    primaryAmazigh: 'Tashelhit',
    darija: 90,
    population: 4750,
    urban: 46,
    cx: 210, cy: 290,
    path: 'M 135,255 L 165,245 L 200,250 L 235,255 L 275,270 L 260,310 L 225,330 L 175,325 L 135,300 Z',
    notes: 'Tashelhit in High Atlas hinterland. Tourism hub.'
  },
  {
    id: 'draa-tafilalet',
    name: 'Drâa-Tafilalet',
    amazighPct: 64.0,
    primaryAmazigh: 'Tamazight / Tashelhit',
    darija: 68,
    population: 1760,
    urban: 37,
    cx: 345, cy: 300,
    path: 'M 275,270 L 315,265 L 355,185 L 370,145 L 430,130 L 445,200 L 440,290 L 420,350 L 360,370 L 300,350 L 260,310 Z',
    notes: 'Highest Amazigh % in Morocco. Oasis communities.'
  },
  {
    id: 'souss-massa',
    name: 'Souss-Massa',
    amazighPct: 53.2,
    primaryAmazigh: 'Tashelhit',
    darija: 72,
    population: 2940,
    urban: 52,
    cx: 195, cy: 365,
    path: 'M 135,300 L 175,325 L 225,330 L 260,310 L 300,350 L 275,385 L 220,395 L 160,380 L 130,345 Z',
    notes: 'Core Tashelhit zone. Agadir capital. Argan country.'
  },
  {
    id: 'guelmim',
    name: 'Guelmim-\nOued Noun',
    amazighPct: 40.2,
    primaryAmazigh: 'Tashelhit',
    darija: 75,
    population: 440,
    urban: 52,
    cx: 185, cy: 430,
    path: 'M 130,345 L 160,380 L 220,395 L 275,385 L 260,430 L 210,450 L 145,445 L 115,405 Z',
    notes: 'Transition zone. Tashelhit and Hassaniya overlap.'
  },
  {
    id: 'laayoune',
    name: 'Laâyoune-\nSakia El Hamra',
    amazighPct: 2.1,
    primaryAmazigh: 'Hassaniya zone',
    darija: 85,
    population: 420,
    urban: 94,
    cx: 175, cy: 510,
    path: 'M 115,405 L 145,445 L 210,450 L 260,430 L 275,480 L 250,550 L 165,560 L 100,520 L 85,460 Z',
    notes: 'Hassaniya Arabic spoken. Saharan region.'
  },
  {
    id: 'dakhla',
    name: 'Dakhla-\nOued Ed-Dahab',
    amazighPct: 1.4,
    primaryAmazigh: 'Hassaniya zone',
    darija: 80,
    population: 200,
    urban: 79,
    cx: 155, cy: 630,
    path: 'M 85,460 L 100,520 L 165,560 L 250,550 L 235,620 L 200,680 L 130,700 L 75,650 L 60,560 Z',
    notes: 'Southernmost. Hassaniya dominant. Saharan fishing.'
  },
]

// ═══ CENSUS TIMELINE DATA ═══
// Amazigh speakers as % of total population across census years
interface CensusYear {
  year: number
  amazighTotal: number
  tashelhit: number
  tamazight: number
  tarifit: number
  source: string
}

const CENSUS_DATA: CensusYear[] = [
  { year: 1960, amazighTotal: 32, tashelhit: 15, tamazight: 10, tarifit: 7, source: 'First post-independence census' },
  { year: 1994, amazighTotal: 28, tashelhit: 14, tamazight: 8, tarifit: 6, source: 'Estimate (no language question)' },
  { year: 2004, amazighTotal: 28.2, tashelhit: 14.6, tamazight: 8.8, tarifit: 4.8, source: 'HCP Census (first with language q.)' },
  { year: 2014, amazighTotal: 26.0, tashelhit: 14.1, tamazight: 7.9, tarifit: 4.0, source: 'HCP Census' },
  { year: 2024, amazighTotal: 24.8, tashelhit: 14.2, tamazight: 7.4, tarifit: 3.2, source: 'HCP Census (contested by Amazigh assoc.)' },
]

// Pre-colonial estimate
const PRE_COLONIAL = { year: 1912, amazighTotal: 43, source: 'Colonial estimate: 40–45%' }

// ═══ NATIONAL LANGUAGE STATS (2024) ═══
const NATIONAL = [
  { lang: 'Darija (Moroccan Arabic)', pct: 91.9, color: C.darija, note: '96.3% urban, 84.5% rural' },
  { lang: 'Tashelhit', pct: 14.2, color: C.tashelhit, note: 'Souss, High Atlas, Anti-Atlas' },
  { lang: 'Central Atlas Tamazight', pct: 7.4, color: C.tamazight, note: 'Middle Atlas, eastern High Atlas' },
  { lang: 'Tarifit', pct: 3.2, color: C.tarifit, note: 'Rif Mountains, northeastern Morocco' },
  { lang: 'Hassaniya', pct: 0.8, color: C.hassaniya, note: 'Southern provinces, Sahara' },
  { lang: 'French (L2)', pct: 33, color: C.french, note: 'Business, education, elite. ~36% of workforce' },
  { lang: 'Spanish', pct: 10, color: C.spanish, note: 'Northern regions, declining. Was ~20% in 1990' },
  { lang: 'English', pct: 14, color: C.english, note: 'Rising fast. 17% among under-34s' },
  { lang: 'Modern Standard Arabic', pct: 2, color: C.msa, note: 'Oral use only 2%. 99.2% literate pop. reads it' },
]

// ═══ KEY EVENTS TIMELINE ═══
const LANG_EVENTS = [
  { year: 1912, label: 'French Protectorate begins. French becomes admin language.' },
  { year: 1930, label: 'Berber Dahir: French attempt to separate Berber/Arab legal systems. Sparks nationalist backlash.' },
  { year: 1956, label: 'Independence. Arabization policy begins. Arabic replaces French in schools.' },
  { year: 1960, label: 'First census: 32% speak Amazigh.' },
  { year: 1994, label: 'Hassan II: "Berber dialect will acquire formal status." TV broadcasts begin in 3 Amazigh languages.' },
  { year: 2001, label: 'IRCAM (Royal Institute of Amazigh Culture) created. Tifinagh script standardized.' },
  { year: 2011, label: 'Constitutional reform: Amazigh becomes official language alongside Arabic.' },
  { year: 2019, label: 'Parliament votes to expand Amazigh classes to all schools.' },
  { year: 2024, label: 'Census: 24.8% Amazigh speakers. Contested by Amazigh associations claiming 85%.' },
]

// ═══ COLOUR SCALE FOR CHOROPLETH ═══
function amazighColor(pct: number): string {
  if (pct >= 50) return '#1a5c38'
  if (pct >= 30) return '#2D6E4F'
  if (pct >= 15) return '#5A9A74'
  if (pct >= 5) return '#98C5A8'
  return '#D4E8DA'
}

// ═══ CHART DIMENSIONS ═══
const TL_W = 700
const TL_H = 280
const TL_ML = 50
const TL_MR = 20
const TL_MT = 30
const TL_MB = 35
const TL_CW = TL_W - TL_ML - TL_MR
const TL_CH = TL_H - TL_MT - TL_MB

function yearToX(year: number): number {
  return TL_ML + ((year - 1910) / (2030 - 1910)) * TL_CW
}

function pctToY(pct: number): number {
  return TL_MT + TL_CH - (pct / 50) * TL_CH
}

export default function LanguagesPage() {
  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-36 pb-6">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 018 · Linguistic Cartography</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>Languages of Morocco</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          Who speaks what where — and how the map is shifting
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4" style={{ color: C.text }}>
          Morocco has two official languages, five vernaculars, and three colonial
          inheritances competing for space in 37 million mouths. Arabic dominates
          the plains. Amazigh holds the mountains. French runs the boardrooms.
          Spanish lingers in the north. Hassaniya whispers across the Sahara.
          The 2024 census counted them all — and the numbers are contested.
          This is the map nobody made.
        </p>
      </section>

      {/* ═══ THE MAP ═══ */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="border p-4 md:p-6" style={{ borderColor: C.border, background: C.parchment }}>
          <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-6">

            {/* SVG Map */}
            <div className="flex justify-center">
              <svg viewBox="0 0 500 740" className="w-full max-w-[500px] h-auto"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                <rect width={500} height={740} fill={C.parchment} />

                {/* Title */}
                <text x={250} y={18} textAnchor="middle" fontSize="8" letterSpacing="3" fontWeight="600" fill={C.ink}>
                  AMAZIGH MOTHER TONGUE BY REGION
                </text>
                <text x={250} y={30} textAnchor="middle" fontSize="5.5" fill={C.muted} letterSpacing="1.5">
                  2024 GENERAL CENSUS · HIGH COMMISSION FOR PLANNING (HCP)
                </text>

                {/* Sea background */}
                <rect x={0} y={0} width={130} height={740} fill={C.sea} fillOpacity={0.3} />
                <text x={40} y={300} fontSize="6" fill={C.tarifit} fillOpacity={0.25} letterSpacing="4"
                  transform="rotate(-90, 40, 300)">ATLANTIC OCEAN</text>

                {/* Mediterranean */}
                <rect x={180} y={0} width={320} height={20} fill={C.sea} fillOpacity={0.2} />
                <text x={350} y={12} textAnchor="middle" fontSize="5" fill={C.tarifit} fillOpacity={0.25} letterSpacing="2">
                  MEDITERRANEAN
                </text>

                {/* Algeria border */}
                <text x={460} y={200} fontSize="5" fill={C.muted} fillOpacity={0.3} letterSpacing="2"
                  transform="rotate(80, 460, 200)">ALGERIA</text>

                {/* Regions — choropleth */}
                {REGIONS.map(r => (
                  <g key={r.id}>
                    <path d={r.path}
                      fill={amazighColor(r.amazighPct)}
                      fillOpacity={0.6}
                      stroke={C.ink}
                      strokeWidth="0.6"
                    />
                    {/* Region label */}
                    <text x={r.cx} y={r.cy - 5} textAnchor="middle" fontSize="4.5"
                      fontWeight="600" fill={C.ink}>
                      {r.amazighPct}%
                    </text>
                    <text x={r.cx} y={r.cy + 3} textAnchor="middle" fontSize="3.5"
                      fill={C.ink} fillOpacity="0.6">
                      {r.name.split('\n').map((line, i) => (
                        <tspan key={i} x={r.cx} dy={i === 0 ? 0 : 4.5}>{line}</tspan>
                      ))}
                    </text>
                  </g>
                ))}

                {/* ═══ LINGUISTIC ZONE OVERLAYS ═══ */}
                {/* Tarifit zone — Rif */}
                <ellipse cx={320} cy={70} rx={80} ry={40} fill="none" stroke={C.tarifit}
                  strokeWidth="1.2" strokeDasharray="4,3" opacity={0.7} />
                <text x={320} y={35} textAnchor="middle" fontSize="6" fontWeight="600"
                  fill={C.tarifit} letterSpacing="1">TARIFIT</text>
                <text x={320} y={42} textAnchor="middle" fontSize="4" fill={C.tarifit} fillOpacity="0.7">
                  3.2% national · Rif Mountains
                </text>

                {/* Central Atlas Tamazight zone */}
                <ellipse cx={310} cy={220} rx={65} ry={55} fill="none" stroke={C.tamazight}
                  strokeWidth="1.2" strokeDasharray="4,3" opacity={0.7} />
                <text x={310} y={168} textAnchor="middle" fontSize="6" fontWeight="600"
                  fill={C.tamazight} letterSpacing="1">TAMAZIGHT</text>
                <text x={310} y={176} textAnchor="middle" fontSize="4" fill={C.tamazight} fillOpacity="0.7">
                  7.4% national · Middle + High Atlas
                </text>

                {/* Tashelhit zone — Souss, Anti-Atlas, western High Atlas */}
                <ellipse cx={210} cy={350} rx={90} ry={60} fill="none" stroke={C.tashelhit}
                  strokeWidth="1.2" strokeDasharray="4,3" opacity={0.7} />
                <text x={135} y={345} textAnchor="start" fontSize="6" fontWeight="600"
                  fill={C.tashelhit} letterSpacing="1">TASHELHIT</text>
                <text x={135} y={354} textAnchor="start" fontSize="4" fill={C.tashelhit} fillOpacity="0.7">
                  14.2% national · Souss, Anti-Atlas
                </text>

                {/* Hassaniya zone — southern provinces */}
                <path d="M 85,460 L 250,440 L 235,620 L 60,560 Z" fill="none"
                  stroke={C.hassaniya} strokeWidth="1" strokeDasharray="6,4" opacity={0.5} />
                <text x={160} y={480} textAnchor="middle" fontSize="5.5" fontWeight="600"
                  fill={C.hassaniya} letterSpacing="1">HASSANIYA</text>
                <text x={160} y={488} textAnchor="middle" fontSize="3.5" fill={C.hassaniya} fillOpacity="0.7">
                  0.8% national · Saharan provinces
                </text>

                {/* Spanish overlay — northern strip */}
                <path d="M 195,45 L 310,35 L 295,75 L 210,70 Z" fill="none"
                  stroke={C.spanish} strokeWidth="0.8" strokeDasharray="2,2" opacity={0.5} />
                <text x={246} y={50} textAnchor="middle" fontSize="3.5"
                  fill={C.spanish} fillOpacity="0.8">Spanish zone (10%)</text>

                {/* French overlay — Atlantic urban corridor */}
                <circle cx={180} cy={210} r={5} fill={C.french} fillOpacity={0.25} />
                <circle cx={195} cy={145} r={4} fill={C.french} fillOpacity={0.25} />
                <circle cx={295} cy={145} r={3.5} fill={C.french} fillOpacity={0.25} />
                <text x={155} y={200} textAnchor="end" fontSize="3" fill={C.french}>Casa</text>
                <text x={175} y={140} textAnchor="end" fontSize="3" fill={C.french}>Rabat</text>
                <text x={278} y={140} textAnchor="end" fontSize="3" fill={C.french}>Fès</text>

                {/* City dots */}
                {[
                  { x: 180, y: 210, name: 'Casablanca' },
                  { x: 195, y: 145, name: 'Rabat' },
                  { x: 210, y: 290, name: 'Marrakech' },
                  { x: 295, y: 140, name: 'Fès' },
                  { x: 200, y: 365, name: 'Agadir' },
                  { x: 250, y: 40, name: 'Tanger' },
                  { x: 370, y: 90, name: 'Oujda' },
                  { x: 310, y: 60, name: 'Al Hoceïma' },
                  { x: 270, y: 55, name: 'Tétouan' },
                  { x: 145, y: 500, name: 'Laâyoune' },
                  { x: 130, y: 640, name: 'Dakhla' },
                ].map(c => (
                  <g key={c.name}>
                    <circle cx={c.x} cy={c.y} r={2} fill={C.ink} fillOpacity={0.5} />
                  </g>
                ))}

                {/* Colour scale legend */}
                <g transform="translate(15, 650)">
                  <text x={0} y={0} fontSize="5" fontWeight="600" fill={C.ink}>Amazigh Mother Tongue %</text>
                  {[
                    { label: '< 5%', color: '#D4E8DA' },
                    { label: '5–15%', color: '#98C5A8' },
                    { label: '15–30%', color: '#5A9A74' },
                    { label: '30–50%', color: '#2D6E4F' },
                    { label: '50%+', color: '#1a5c38' },
                  ].map((s, i) => (
                    <g key={i} transform={`translate(${i * 50}, 8)`}>
                      <rect width={12} height={8} fill={s.color} fillOpacity={0.6} stroke={C.ink} strokeWidth="0.3" />
                      <text x={15} y={7} fontSize="4" fill={C.muted}>{s.label}</text>
                    </g>
                  ))}
                </g>

                {/* Linguistic zone legend */}
                <g transform="translate(15, 690)">
                  {[
                    { name: 'Tashelhit zone', color: C.tashelhit },
                    { name: 'Tamazight zone', color: C.tamazight },
                    { name: 'Tarifit zone', color: C.tarifit },
                    { name: 'Hassaniya zone', color: C.hassaniya },
                    { name: 'Spanish zone', color: C.spanish },
                  ].map((z, i) => (
                    <g key={i} transform={`translate(${i * 85}, 0)`}>
                      <line x1={0} y1={3} x2={12} y2={3} stroke={z.color} strokeWidth="1.2" strokeDasharray="3,2" />
                      <text x={15} y={6} fontSize="4" fill={z.color}>{z.name}</text>
                    </g>
                  ))}
                </g>

                {/* Colophon */}
                <text x={250} y={720} textAnchor="middle" fontSize="4" fill={C.muted}>
                  Source: HCP 2024 General Census · Yabiladi analysis · © 2026 Dancing with Lions
                </text>
              </svg>
            </div>

            {/* Right side: data panel */}
            <div className="flex flex-col gap-4">

              {/* National language bars */}
              <div>
                <p className="micro-label mb-3" style={{ color: C.muted }}>National Language Use (2024)</p>
                {NATIONAL.map(l => (
                  <div key={l.lang} className="flex items-center gap-2 mb-1.5">
                    <div className="w-[100px] text-[9px] text-right truncate" style={{ color: l.color }}>
                      {l.lang}
                    </div>
                    <div className="flex-1 h-[12px] relative" style={{ background: C.cream }}>
                      <div
                        className="h-full"
                        style={{
                          width: `${Math.min(l.pct, 100)}%`,
                          background: l.color,
                          opacity: 0.35,
                        }}
                      />
                      <span className="absolute left-1 top-0 text-[7px] font-semibold leading-[12px]" style={{ color: l.color }}>
                        {l.pct}%
                      </span>
                    </div>
                    <div className="w-[180px] text-[7px]" style={{ color: C.muted }}>
                      {l.note}
                    </div>
                  </div>
                ))}
                <p className="text-[8px] mt-2 italic" style={{ color: C.muted }}>
                  Note: Percentages overlap — most Moroccans speak 2–4 languages. Darija + French is the most common combination in cities.
                  Amazigh figures are &quot;mother tongue&quot; (first language learned at home). Amazigh associations contest the 24.8% figure, claiming up to 85%.
                </p>
              </div>

              {/* Regional table */}
              <div className="overflow-x-auto">
                <p className="micro-label mb-2" style={{ color: C.muted }}>Amazigh Mother Tongue by Region</p>
                <table className="w-full text-[8px]" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      <th className="text-left py-1 pr-2" style={{ color: C.muted }}>Region</th>
                      <th className="text-right py-1 px-1" style={{ color: C.tashelhit }}>Amazigh %</th>
                      <th className="text-left py-1 px-1" style={{ color: C.muted }}>Primary</th>
                      <th className="text-right py-1 px-1" style={{ color: C.darija }}>Darija %</th>
                      <th className="text-right py-1 px-1" style={{ color: C.muted }}>Pop. (K)</th>
                      <th className="text-right py-1 pl-1" style={{ color: C.muted }}>Urban %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...REGIONS]
                      .sort((a, b) => b.amazighPct - a.amazighPct)
                      .map(r => (
                        <tr key={r.id} style={{ borderBottom: `0.5px solid ${C.border}` }}>
                          <td className="py-1 pr-2" style={{ color: C.text }}>{r.name.replace('\n', ' ')}</td>
                          <td className="text-right py-1 px-1 font-semibold" style={{ color: amazighColor(r.amazighPct) }}>
                            {r.amazighPct}%
                          </td>
                          <td className="py-1 px-1" style={{ color: C.muted }}>{r.primaryAmazigh}</td>
                          <td className="text-right py-1 px-1" style={{ color: C.darija }}>{r.darija}%</td>
                          <td className="text-right py-1 px-1" style={{ color: C.muted }}>{r.population.toLocaleString()}</td>
                          <td className="text-right py-1 pl-1" style={{ color: C.muted }}>{r.urban}%</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Source */}
          <p className="text-[7px] mt-4 text-center" style={{ color: C.muted }}>
            Map: simplified regional boundaries. Linguistic zones approximate — boundaries are blurred, not sharp.
            Sources: HCP 2024 Census; Yabiladi regional analysis (Dec 2024); Wikipedia &quot;Languages of Morocco&quot;; Ethnologue.
          </p>
        </div>
      </section>

      {/* ═══ THE TIMELINE: AMAZIGH DECLINE SINCE INDEPENDENCE ═══ */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 mt-10">
        <div className="border p-4 md:p-6" style={{ borderColor: C.border, background: C.parchment }}>
          <p className="micro-label mb-1" style={{ color: C.muted }}>The Shift</p>
          <p className="text-[13px] font-serif italic mb-4" style={{ color: C.ink }}>
            Amazigh speakers as percentage of population, 1912–2024
          </p>

          <svg viewBox={`0 0 ${TL_W} ${TL_H}`} className="w-full h-auto max-w-[800px]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <rect width={TL_W} height={TL_H} fill={C.parchment} />

            {/* Grid */}
            {[0, 10, 20, 30, 40, 50].map(p => (
              <g key={p}>
                <line x1={TL_ML} y1={pctToY(p)} x2={TL_W - TL_MR} y2={pctToY(p)}
                  stroke={C.border} strokeWidth={p === 0 ? 0.8 : 0.3} />
                <text x={TL_ML - 5} y={pctToY(p) + 2.5} textAnchor="end" fontSize="6" fill={C.muted}>
                  {p}%
                </text>
              </g>
            ))}

            {/* Year labels */}
            {[1920, 1940, 1960, 1980, 2000, 2020].map(y => (
              <g key={y}>
                <line x1={yearToX(y)} y1={TL_MT} x2={yearToX(y)} y2={TL_MT + TL_CH}
                  stroke={C.border} strokeWidth="0.3" />
                <text x={yearToX(y)} y={TL_H - 10} textAnchor="middle" fontSize="6" fill={C.muted}>{y}</text>
              </g>
            ))}

            {/* Pre-colonial estimate marker */}
            <circle cx={yearToX(PRE_COLONIAL.year)} cy={pctToY(PRE_COLONIAL.amazighTotal)} r={4}
              fill={C.tashelhit} fillOpacity={0.15} stroke={C.tashelhit} strokeWidth="0.8" strokeDasharray="2,2" />
            <text x={yearToX(PRE_COLONIAL.year) + 8} y={pctToY(PRE_COLONIAL.amazighTotal) + 2}
              fontSize="5" fill={C.tashelhit} fillOpacity="0.7">~43% (colonial est.)</text>

            {/* ═══ STACKED AREA — three Amazigh languages ═══ */}
            {/* Combined line first */}
            <polyline
              points={[PRE_COLONIAL, ...CENSUS_DATA].map(d =>
                `${yearToX(d.year)},${pctToY(d.amazighTotal || (d as typeof PRE_COLONIAL).amazighTotal)}`
              ).join(' ')}
              fill="none" stroke={C.tashelhit} strokeWidth="1.5" />

            {/* Individual language lines */}
            {/* Tashelhit */}
            <polyline
              points={CENSUS_DATA.map(d => `${yearToX(d.year)},${pctToY(d.tashelhit)}`).join(' ')}
              fill="none" stroke={C.tashelhit} strokeWidth="0.8" strokeDasharray="4,2" />
            {/* Tamazight */}
            <polyline
              points={CENSUS_DATA.map(d => `${yearToX(d.year)},${pctToY(d.tamazight)}`).join(' ')}
              fill="none" stroke={C.tamazight} strokeWidth="0.8" strokeDasharray="4,2" />
            {/* Tarifit */}
            <polyline
              points={CENSUS_DATA.map(d => `${yearToX(d.year)},${pctToY(d.tarifit)}`).join(' ')}
              fill="none" stroke={C.tarifit} strokeWidth="0.8" strokeDasharray="4,2" />

            {/* Data points with labels */}
            {CENSUS_DATA.map(d => (
              <g key={d.year}>
                <circle cx={yearToX(d.year)} cy={pctToY(d.amazighTotal)} r={3}
                  fill={C.tashelhit} fillOpacity={0.2} stroke={C.tashelhit} strokeWidth="0.8" />
                <text x={yearToX(d.year)} y={pctToY(d.amazighTotal) - 7}
                  textAnchor="middle" fontSize="6" fontWeight="600" fill={C.tashelhit}>
                  {d.amazighTotal}%
                </text>
                <text x={yearToX(d.year)} y={TL_H - 3} textAnchor="middle" fontSize="5" fill={C.ink}>
                  {d.year}
                </text>
              </g>
            ))}

            {/* Tarifit labels at 2024 */}
            <text x={yearToX(2024) + 12} y={pctToY(14.2)} fontSize="5" fill={C.tashelhit}>Tashelhit 14.2%</text>
            <text x={yearToX(2024) + 12} y={pctToY(7.4)} fontSize="5" fill={C.tamazight}>Tamazight 7.4%</text>
            <text x={yearToX(2024) + 12} y={pctToY(3.2)} fontSize="5" fill={C.tarifit}>Tarifit 3.2%</text>

            {/* Key event markers */}
            {[
              { year: 1956, label: 'Independence\nArabization begins', y: -10 },
              { year: 2001, label: 'IRCAM\ncreated', y: -10 },
              { year: 2011, label: 'Amazigh\nofficial', y: -18 },
            ].map(ev => (
              <g key={ev.year}>
                <line x1={yearToX(ev.year)} y1={TL_MT} x2={yearToX(ev.year)} y2={TL_MT + TL_CH}
                  stroke={C.muted} strokeWidth="0.4" strokeDasharray="2,3" />
                {ev.label.split('\n').map((line, i) => (
                  <text key={i} x={yearToX(ev.year)} y={TL_MT + ev.y + i * 7}
                    textAnchor="middle" fontSize="4.5" fill={C.muted}>{line}</text>
                ))}
              </g>
            ))}

            {/* Annotation arrow: the decline */}
            <text x={yearToX(1975)} y={pctToY(38)} fontSize="5.5" fill={C.muted} fontStyle="italic">
              43% → 24.8%
            </text>
            <text x={yearToX(1975)} y={pctToY(36)} fontSize="4.5" fill={C.muted}>
              in 112 years
            </text>

          </svg>

          {/* Census source notes */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4">
            {CENSUS_DATA.map(d => (
              <div key={d.year} className="text-center p-2" style={{ borderTop: `2px solid ${C.tashelhit}`, borderTopColor: amazighColor(d.amazighTotal) }}>
                <p className="text-[11px] font-semibold" style={{ color: C.ink }}>{d.year}</p>
                <p className="text-[18px] font-serif italic" style={{ color: amazighColor(d.amazighTotal) }}>{d.amazighTotal}%</p>
                <p className="text-[7px] italic" style={{ color: C.muted }}>{d.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KEY EVENTS ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.muted }}>Language Policy Timeline</p>
          <div className="space-y-3 max-w-[700px]">
            {LANG_EVENTS.map(ev => (
              <div key={ev.year} className="flex gap-3 items-baseline">
                <span className="text-[12px] font-semibold shrink-0 w-[40px]" style={{ color: C.tashelhit }}>
                  {ev.year}
                </span>
                <span className="text-[11px] leading-[1.5]" style={{ color: C.text }}>
                  {ev.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ READING NOTES ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.tashelhit }}>The Three Amazighs</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Tashelhit, Tamazight, and Tarifit are not dialects of one language — they are
                three distinct languages of the Berber family, roughly as different as French,
                Spanish, and Italian. Tashelhit covers the Souss and Anti-Atlas (14.2% of
                Moroccans). Central Atlas Tamazight fills the Middle Atlas (7.4%). Tarifit
                occupies the Rif (3.2%). A Tashelhit speaker and a Tarifit speaker will
                struggle to understand each other. The standardised &ldquo;Amazigh&rdquo;
                taught in schools since 2011 is an artificial composite of all three — a
                political solution to a linguistic reality.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.french }}>The French Paradox</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                French is not an official language in Morocco. It appears nowhere in the
                constitution. Yet it runs business, medicine, science, higher education,
                and much of government communication. Around 33% of Moroccans speak
                French — more than speak any Amazigh language. In the workplace, 31% use
                French for speaking and 32% for writing, nearly matching Darija. The
                paradox: the post-independence Arabization policy was meant to replace French.
                Seven decades later, French is more entrenched in the economy than ever.
                English is rising (14%, and 17% among under-34s), but is still decades
                from displacing French in boardrooms.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.spanish }}>The Contested Census</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The 2024 census figure of 24.8% Amazigh speakers is violently contested.
                Amazigh associations claim the real number is closer to 85% — arguing that
                the census question asks about &ldquo;mother tongue&rdquo; (first language
                at home), which excludes millions who speak Amazigh but reported Darija as
                their primary language due to urbanisation and social pressure. The HCP was
                also criticised for excluding Amazigh civil society from questionnaire design.
                The truth likely falls between 25% and 50% — depending on whether you count
                only mother-tongue speakers or include anyone with conversational ability.
                Every number on this page is the official floor, not the ceiling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            In Drâa-Tafilalet, 64% of the population wakes up speaking a language
            that 96% of Casablanca does not. In Tangier, shopkeepers switch between
            Arabic, Spanish, and French in a single sentence. In the Rif, a language
            spoken since before the Phoenicians is losing a percentage point per
            decade. These are not just numbers. This is the sound of a country
            deciding, generation by generation, what it wants to remember.
          </p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: C.muted }}>
            2024 census data: Haut-Commissariat au Plan (HCP), General Census of Population and Housing 2024,
            presented by Chakib Benmoussa (December 2024). Regional Amazigh mother-tongue percentages:
            Yabiladi analysis of 2024 HCP data (December 18, 2024). Historical census comparison: Wikipedia
            &quot;Berber languages&quot; and &quot;Languages of Morocco&quot;, citing HCP 2004 and 2014 census
            reports. Pre-colonial estimate (40–45%): A. Basset (1952), cited in Ethnologue. French proficiency
            (33%): 2012 Government of Spain study. Spanish speakers: Cervantes Institute data. English (14%):
            2024 survey data. Sunergia workplace language study cited via Life in Morocco (2025). Amazigh
            association contestation (85% claim): Morocco World News (December 2024). IRCAM founding: Royal
            Dahir 1-01-299, October 17, 2001. Constitutional officialisation: Moroccan constitutional
            referendum, July 1, 2011.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: C.border }}>
              © {new Date().getFullYear()} Dancing with Lions. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.tashelhit }}>
              © Dancing with Lions
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
