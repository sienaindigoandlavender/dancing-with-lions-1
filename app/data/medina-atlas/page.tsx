'use client'

import Link from 'next/link'

// ═══ THE MEDINA ATLAS ═══
// A static SVG composition — not interactive, not animated.
// A single dense illustrated map meant to be studied, printed, framed.
// Every element hand-placed. Poster-grade density.

const C = {
  // Craft zone fills
  leather: '#8B4513',
  metal: '#4A5568',
  textile: '#7B2D8D',
  food: '#B8860B',
  wood: '#6B4226',
  pottery: '#C2703E',
  dye: '#4A1A6B',
  spice: '#C17F28',
  carpet: '#8B2252',
  // Landmarks
  mosque: '#2D6E4F',
  palace: '#722F37',
  gate: '#8B3A3A',
  fountain: '#1A5276',
  hammam: '#5D3A5E',
  garden: '#4A6741',
  tomb: '#5C4033',
  museum: '#6B5B3E',
  riad: '#C4956A',
  // Wall + structure
  wall: '#B8705A',
  wallDark: '#8B5A42',
  road: '#D4C5B0',
  soukRoof: '#C9B896',
  water: '#7BAEC4',
  // UI
  ink: '#0a0a0a',
  body: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  parchment: '#FFFFFF',
  parchmentDark: '#E8DFD0',
}

// ═══ MEDINA DATA ═══
// All positions in SVG viewBox coordinates (0-1200 x 0-1600)
// Medina roughly centered, walls forming irregular polygon
// North is UP. Jemaa el-Fna at center-south.

// WALL POLYGON — simplified medina outline (19 km perimeter)
const WALL_PATH = `
  M 340,180 L 460,140 L 580,120 L 700,125 L 800,160 L 880,220
  L 920,320 L 940,440 L 950,560 L 940,680 L 920,780 L 890,860
  L 840,940 L 760,1000 L 680,1040 L 600,1060
  L 520,1080 L 440,1080 L 360,1060 L 300,1020
  L 260,960 L 240,880 L 230,780 L 240,680
  L 250,580 L 260,480 L 270,380 L 290,280 L 340,180
  Z
`

// KASBAH EXTENSION (south)
const KASBAH_PATH = `
  M 440,1080 L 440,1200 L 520,1240 L 640,1240 L 680,1200 L 680,1040
`

// ═══ GATES (Babs) ═══
interface Gate {
  name: string
  x: number
  y: number
  angle: number // rotation of label
  period: string
  note: string
}

const GATES: Gate[] = [
  { name: 'Bab el-Khemis', x: 580, y: 118, angle: 0, period: 'Almoravid', note: 'Thursday market gate' },
  { name: 'Bab Debbagh', x: 880, y: 230, angle: -70, period: 'Almoravid', note: 'Tanners\' gate' },
  { name: 'Bab Aylan', x: 940, y: 450, angle: -90, period: 'Almoravid', note: 'Berber tribe gate' },
  { name: 'Bab Aghmat', x: 940, y: 680, angle: -90, period: 'Almoravid', note: 'Eastern route gate' },
  { name: 'Bab er-Robb', x: 360, y: 1060, angle: 0, period: 'Almohad', note: '"Grape juice" gate' },
  { name: 'Bab Agnaou', x: 520, y: 1082, angle: 0, period: 'Almohad 1188', note: 'Kasbah entrance — carved stone' },
  { name: 'Bab el-Makhzen', x: 300, y: 1020, angle: 30, period: 'Almoravid', note: 'Palace gate' },
  { name: 'Bab Doukkala', x: 260, y: 480, angle: 90, period: 'Almohad', note: 'Western plains route' },
  { name: 'Bab el-Jedid', x: 240, y: 780, angle: 90, period: 'Modern', note: 'La Mamounia entrance' },
  { name: 'Bab Taghzout', x: 410, y: 155, angle: 20, period: 'Almoravid', note: 'Sidi Bel Abbes quarter' },
  { name: 'Bab Nkob', x: 270, y: 360, angle: 80, period: 'Modern', note: 'Gueliz connection' },
  { name: 'Bab Laksour', x: 340, y: 185, angle: 40, period: 'Post-Almoravid', note: 'Northern entry' },
]

// ═══ QUARTERS / NEIGHBOURHOODS ═══
interface Quarter {
  name: string
  x: number
  y: number
  w: number
  h: number
}

const QUARTERS: Quarter[] = [
  { name: 'Mouassine', x: 380, y: 480, w: 140, h: 120 },
  { name: 'Riad Laarous', x: 420, y: 360, w: 120, h: 100 },
  { name: 'Sidi Bel Abbès', x: 400, y: 200, w: 160, h: 120 },
  { name: 'Bab Doukkala', x: 280, y: 420, w: 120, h: 130 },
  { name: 'Kennaria', x: 530, y: 520, w: 100, h: 80 },
  { name: 'Dabachi', x: 560, y: 660, w: 100, h: 80 },
  { name: 'Arset el-Maach', x: 700, y: 400, w: 120, h: 100 },
  { name: 'Riad Zitoun Jdid', x: 600, y: 800, w: 130, h: 100 },
  { name: 'Riad Zitoun Kdim', x: 480, y: 800, w: 120, h: 100 },
  { name: 'Mellah', x: 680, y: 900, w: 140, h: 110 },
  { name: 'Kasbah', x: 500, y: 1100, w: 160, h: 120 },
  { name: 'Berrima', x: 340, y: 700, w: 110, h: 90 },
  { name: 'Laksour', x: 350, y: 560, w: 80, h: 80 },
  { name: 'Hart Soura', x: 780, y: 500, w: 120, h: 100 },
  { name: 'Sidi Moussa', x: 800, y: 300, w: 100, h: 90 },
  { name: 'Azbezt', x: 660, y: 300, w: 100, h: 80 },
]

// ═══ SOUKS (Craft Zones) ═══
interface Souk {
  name: string
  craft: string
  x: number
  y: number
  w: number
  h: number
  color: string
}

const SOUKS: Souk[] = [
  { name: 'Souk Semmarine', craft: 'textile', x: 500, y: 530, w: 30, h: 120, color: C.textile },
  { name: 'Souk el-Kebir', craft: 'textile', x: 540, y: 500, w: 25, h: 80, color: C.textile },
  { name: 'Souk Attarine', craft: 'spice', x: 530, y: 460, w: 60, h: 25, color: C.spice },
  { name: 'Souk Haddadine', craft: 'metal', x: 590, y: 440, w: 50, h: 30, color: C.metal },
  { name: 'Souk Chouari', craft: 'wood', x: 570, y: 400, w: 40, h: 30, color: C.wood },
  { name: 'Souk Cherratine', craft: 'leather', x: 610, y: 380, w: 50, h: 25, color: C.leather },
  { name: 'Souk Sebbaghine', craft: 'dye', x: 530, y: 380, w: 35, h: 30, color: C.dye },
  { name: 'Souk des Teinturiers', craft: 'dye', x: 480, y: 430, w: 40, h: 30, color: C.dye },
  { name: 'Souk el-Btana', craft: 'leather', x: 540, y: 580, w: 40, h: 25, color: C.leather },
  { name: 'Souk Smata', craft: 'leather', x: 560, y: 530, w: 40, h: 20, color: C.leather },
  { name: 'Rahba Kedima', craft: 'spice', x: 560, y: 600, w: 50, h: 40, color: C.spice },
  { name: 'Criée Berbère', craft: 'carpet', x: 570, y: 560, w: 40, h: 30, color: C.carpet },
  { name: 'Souk des Babouches', craft: 'leather', x: 520, y: 490, w: 30, h: 30, color: C.leather },
  { name: 'Souk Zrabi', craft: 'carpet', x: 600, y: 490, w: 45, h: 25, color: C.carpet },
  { name: 'Souk Siyyaghin', craft: 'metal', x: 520, y: 620, w: 30, h: 20, color: C.metal },
  { name: 'Kissaria', craft: 'textile', x: 540, y: 480, w: 40, h: 40, color: C.textile },
  { name: 'Souk Fekharine', craft: 'pottery', x: 650, y: 350, w: 40, h: 25, color: C.pottery },
  { name: 'Tanneries', craft: 'leather', x: 820, y: 260, w: 60, h: 50, color: C.leather },
]

// ═══ MOSQUES ═══
interface Mosque {
  name: string
  x: number
  y: number
  period: string
  note?: string
}

const MOSQUES: Mosque[] = [
  { name: 'Koutoubia', x: 380, y: 720, period: 'Almohad 1147', note: '77m minaret — city landmark' },
  { name: 'Ben Youssef', x: 540, y: 340, period: 'Almoravid 1070', note: 'Largest mosque in medina' },
  { name: 'Mouassine', x: 440, y: 500, period: 'Saadian 1562', note: 'Part of larger complex' },
  { name: 'Bab Doukkala', x: 320, y: 460, period: 'Saadian 1557', note: 'Western quarter' },
  { name: 'Kasbah', x: 560, y: 1140, period: 'Almohad 1190', note: 'El Mansour mosque' },
  { name: 'Ben Salah', x: 720, y: 640, period: 'Marinid 14thC', note: 'Only Marinid monument' },
  { name: 'Sidi Bel Abbès', x: 460, y: 240, period: 'Saadian', note: 'Patron saint of Marrakech' },
  { name: 'Sidi ben Slimane', x: 380, y: 340, period: 'Almoravid', note: 'Northern medina' },
]

// ═══ FOUNTAINS ═══
interface Fountain {
  name: string
  x: number
  y: number
}

const FOUNTAINS: Fountain[] = [
  { name: 'Mouassine', x: 450, y: 510 },
  { name: 'Chrob ou Chouf', x: 560, y: 360 },
  { name: 'Sidi Bel Abbès', x: 450, y: 250 },
  { name: 'Bab Doukkala', x: 330, y: 470 },
  { name: 'Sidi Abdel Aziz', x: 430, y: 400 },
  { name: 'El Moukef', x: 600, y: 500 },
  { name: 'Kennaria', x: 540, y: 540 },
]

// ═══ HAMMAMS ═══
interface Hammam {
  name: string
  x: number
  y: number
}

const HAMMAMS: Hammam[] = [
  { name: 'Hammam Mouassine', x: 460, y: 530 },
  { name: 'Hammam el-Bacha', x: 410, y: 380 },
  { name: 'Hammam Bab Doukkala', x: 310, y: 490 },
  { name: 'Hammam de la Rose', x: 480, y: 600 },
  { name: 'Dar el-Bacha', x: 420, y: 360 },
]

// ═══ PALACES & LANDMARKS ═══
interface Landmark {
  name: string
  x: number
  y: number
  type: 'palace' | 'museum' | 'garden' | 'tomb' | 'school' | 'square'
  period?: string
  note?: string
}

const LANDMARKS: Landmark[] = [
  { name: 'Jemaa el-Fna', x: 500, y: 680, type: 'square', period: 'UNESCO 2001', note: 'The great plaza — heart of the medina' },
  { name: 'Bahia Palace', x: 620, y: 860, type: 'palace', period: '1866', note: 'Grand Vizier\'s palace' },
  { name: 'El Badi Palace', x: 660, y: 1000, type: 'palace', period: 'Saadian 1578', note: 'Ruins of "The Incomparable"' },
  { name: 'Royal Palace', x: 600, y: 1160, type: 'palace', period: 'Alaouite', note: 'Dar el-Makhzen — still in use' },
  { name: 'Ben Youssef Medersa', x: 560, y: 350, type: 'school', period: 'Saadian 1565', note: 'Largest medersa in Morocco' },
  { name: 'Saadian Tombs', x: 580, y: 1120, type: 'tomb', period: 'Saadian 1557', note: 'Hidden for 200 years' },
  { name: 'Koubba Almoravid', x: 550, y: 330, period: 'Almoravid 1117', type: 'museum', note: 'Oldest structure in Marrakech' },
  { name: 'Dar el-Bacha', x: 400, y: 370, type: 'museum', period: '17thC', note: 'Musée des Confluences' },
  { name: 'Maison Photographie', x: 550, y: 370, type: 'museum', period: '2009', note: 'Vintage Moroccan photos 1870–1950' },
  { name: 'Le Jardin Secret', x: 440, y: 470, type: 'garden', period: 'Saadian/2016', note: 'Restored riad garden' },
  { name: 'Marrakech Museum', x: 540, y: 360, type: 'museum', period: 'Dar Menebhi', note: '19th century palace' },
  { name: 'Musée Boucharouite', x: 490, y: 630, type: 'museum' },
  { name: 'Lazama Synagogue', x: 700, y: 920, type: 'museum', period: '1492', note: 'Slat al-Azama — Mellah' },
  { name: 'Jewish Cemetery', x: 740, y: 960, type: 'tomb', period: 'Oldest in Morocco' },
  { name: 'Agdal Gardens', x: 600, y: 1280, type: 'garden', period: 'Almohad 12thC', note: 'Royal orchards — 400 hectares' },
]

// ═══ MAIN ROADS ═══
interface Road {
  path: string
  name: string
}

const ROADS: Road[] = [
  { name: 'Rue Semmarine', path: 'M 500,680 L 510,630 L 520,560 L 530,500' },
  { name: 'Rue Mouassine', path: 'M 480,680 L 460,600 L 440,520 L 430,460' },
  { name: 'Rue Bab Doukkala', path: 'M 430,460 L 370,450 L 310,460 L 260,480' },
  { name: 'Rue Riad Zitoun Jdid', path: 'M 520,700 L 560,770 L 600,840 L 620,880' },
  { name: 'Rue Riad Zitoun Kdim', path: 'M 490,700 L 480,780 L 480,840 L 490,900' },
  { name: 'Rue Bab Agnaou', path: 'M 480,720 L 460,800 L 440,900 L 440,1000 L 520,1082' },
  { name: 'Ave Mohammed V', path: 'M 380,720 L 310,680 L 260,640 L 230,590' },
  { name: 'Rue Assouel', path: 'M 540,340 L 580,400 L 600,460 L 590,520' },
]

// ═══ FONDOUKS (Caravanserais) ═══
const FONDOUKS = [
  { name: 'Fondouk el-Amri', x: 480, y: 460 },
  { name: 'Fondouk Tazi', x: 530, y: 410 },
  { name: 'Fondouk Ouarzazi', x: 570, y: 430 },
]

export default function MedinaAtlasPage() {
  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-36 pb-8">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 014 · Cartographic Atlas</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>The Medina Atlas</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          A cartographic survey of the oldest living city in North Africa
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4 mb-4" style={{ color: C.body }}>
          Founded in 1070 by the Almoravids. Walls built in 1126 — nine kilometres of
          rammed earth enclosing 150 hectares of labyrinth. Nineteen gates. Seven patron
          saints. Hundreds of derbs too narrow for a car. Every souk, mosque, fountain,
          hammam, gate, and craft zone mapped on a single plate. Study it. Print it. Get lost in it.
        </p>
      </section>

      {/* ═══ THE MAP ═══ */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="border overflow-hidden" style={{ borderColor: C.border, background: C.parchment }}>
          <svg
            viewBox="0 0 1200 1500"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {/* Parchment background */}
            <rect width="1200" height="1500" fill={C.parchment} />

            {/* Title cartouche */}
            <g transform="translate(50, 40)">
              <rect x="0" y="0" width="340" height="90" fill="none" stroke={C.wallDark} strokeWidth="1.5" />
              <rect x="3" y="3" width="334" height="84" fill="none" stroke={C.wallDark} strokeWidth="0.5" />
              <text x="170" y="32" textAnchor="middle" fontSize="14" fontWeight="600" letterSpacing="4" fill={C.ink}>THE MEDINA OF</text>
              <text x="170" y="62" textAnchor="middle" fontSize="28" fontWeight="300" letterSpacing="6" fill={C.ink} fontStyle="italic">MARRAKECH</text>
              <text x="170" y="80" textAnchor="middle" fontSize="7" letterSpacing="3" fill={C.muted}>FOUNDED 1070 CE · UNESCO WORLD HERITAGE SITE · 150 HECTARES</text>
            </g>

            {/* Compass rose */}
            <g transform="translate(1080, 80)">
              <circle cx="0" cy="0" r="30" fill="none" stroke={C.wallDark} strokeWidth="0.5" />
              <circle cx="0" cy="0" r="20" fill="none" stroke={C.wallDark} strokeWidth="0.3" />
              <line x1="0" y1="-28" x2="0" y2="28" stroke={C.wallDark} strokeWidth="0.5" />
              <line x1="-28" y1="0" x2="28" y2="0" stroke={C.wallDark} strokeWidth="0.5" />
              <polygon points="0,-30 -4,-10 4,-10" fill={C.wallDark} />
              <text x="0" y="-35" textAnchor="middle" fontSize="8" fontWeight="600" fill={C.ink}>N</text>
              <text x="0" y="42" textAnchor="middle" fontSize="6" fill={C.muted}>S</text>
              <text x="38" y="3" textAnchor="middle" fontSize="6" fill={C.muted}>E</text>
              <text x="-38" y="3" textAnchor="middle" fontSize="6" fill={C.muted}>W</text>
            </g>

            {/* ═══ CITY WALLS ═══ */}
            <path d={WALL_PATH} fill="none" stroke={C.wall} strokeWidth="8" strokeLinejoin="round" />
            <path d={WALL_PATH} fill="none" stroke={C.wallDark} strokeWidth="2" strokeLinejoin="round" strokeDasharray="2,6" />

            {/* Wall towers (200 towers along 9km) — show ~40 representative */}
            {Array.from({ length: 40 }, (_, i) => {
              const t = i / 40
              const angle = t * Math.PI * 2
              // Approximate wall polygon as ellipse for tower placement
              const cx = 590, cy = 600, rx = 350, ry = 480
              const x = cx + rx * Math.sin(angle)
              const y = cy - ry * Math.cos(angle)
              return (
                <rect key={`tower-${i}`} x={x - 3} y={y - 3} width={6} height={6}
                  fill={C.wall} stroke={C.wallDark} strokeWidth="0.5"
                  transform={`rotate(${(angle * 180 / Math.PI)}, ${x}, ${y})`}
                />
              )
            })}

            {/* Kasbah walls */}
            <path d={KASBAH_PATH} fill="none" stroke={C.wall} strokeWidth="6" strokeLinejoin="round" />

            {/* ═══ QUARTER FILLS ═══ */}
            {QUARTERS.map(q => (
              <g key={q.name}>
                <rect x={q.x} y={q.y} width={q.w} height={q.h}
                  fill={C.parchmentDark} fillOpacity={0.3}
                  stroke={C.border} strokeWidth="0.3" strokeDasharray="3,3"
                />
                <text x={q.x + q.w / 2} y={q.y + q.h / 2}
                  textAnchor="middle" fontSize="7" letterSpacing="2"
                  fill={C.muted} fontWeight="400" textDecoration="none">
                  {q.name.toUpperCase()}
                </text>
              </g>
            ))}

            {/* ═══ MAIN ROADS ═══ */}
            {ROADS.map(road => (
              <g key={road.name}>
                <path d={road.path} fill="none" stroke={C.road} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d={road.path} fill="none" stroke={C.parchmentDark} strokeWidth="0.5" strokeLinecap="round" strokeDasharray="2,4" />
              </g>
            ))}

            {/* ═══ SOUK ZONES ═══ */}
            {SOUKS.map(souk => (
              <g key={souk.name}>
                <rect x={souk.x} y={souk.y} width={souk.w} height={souk.h}
                  fill={souk.color} fillOpacity={0.2}
                  stroke={souk.color} strokeWidth="0.8"
                />
                {/* Hatching pattern for density */}
                {Array.from({ length: Math.floor(souk.h / 3) }, (_, i) => (
                  <line key={i}
                    x1={souk.x} y1={souk.y + i * 3}
                    x2={souk.x + souk.w} y2={souk.y + i * 3}
                    stroke={souk.color} strokeWidth="0.2" strokeOpacity="0.4"
                  />
                ))}
                <text x={souk.x + souk.w / 2} y={souk.y - 3}
                  textAnchor="middle" fontSize="5" fill={souk.color} fontWeight="500">
                  {souk.name}
                </text>
              </g>
            ))}

            {/* ═══ JEMAA EL-FNA ═══ */}
            <rect x={470} y={660} width={80} height={50} rx={2}
              fill={C.spice} fillOpacity={0.1}
              stroke={C.spice} strokeWidth="1.5"
            />
            <text x={510} y={680} textAnchor="middle" fontSize="8" fontWeight="600" fill={C.spice}>
              JEMAA EL-FNA
            </text>
            <text x={510} y={690} textAnchor="middle" fontSize="5" fill={C.muted}>
              UNESCO Intangible Heritage 2001
            </text>

            {/* ═══ GATES ═══ */}
            {GATES.map(gate => (
              <g key={gate.name}>
                {/* Gate symbol: double arch */}
                <rect x={gate.x - 8} y={gate.y - 6} width={16} height={12}
                  fill={C.gate} fillOpacity={0.8} rx={3}
                />
                <rect x={gate.x - 6} y={gate.y - 4} width={5} height={8}
                  fill={C.parchment} rx={2.5}
                />
                <rect x={gate.x + 1} y={gate.y - 4} width={5} height={8}
                  fill={C.parchment} rx={2.5}
                />
                {/* Label */}
                <text
                  x={gate.x}
                  y={gate.y - 12}
                  textAnchor="middle"
                  fontSize="6.5"
                  fontWeight="600"
                  fill={C.gate}
                >
                  {gate.name}
                </text>
                <text
                  x={gate.x}
                  y={gate.y - 5}
                  textAnchor="middle"
                  fontSize="4"
                  fill={C.muted}
                  transform={`translate(0, -8)`}
                >
                </text>
              </g>
            ))}

            {/* ═══ MOSQUES ═══ */}
            {MOSQUES.map(m => (
              <g key={m.name}>
                {/* Mosque symbol: crescent + minaret */}
                <rect x={m.x - 2} y={m.y - 8} width={4} height={12}
                  fill={C.mosque} rx={1}
                />
                <circle cx={m.x} cy={m.y - 10} r={2.5} fill="none" stroke={C.mosque} strokeWidth="1" />
                <circle cx={m.x + 1} cy={m.y - 10} r={2} fill={C.parchment} />
                {/* Label */}
                <text x={m.x + 8} y={m.y - 2} fontSize="6" fontWeight="500" fill={C.mosque}>
                  {m.name === 'Koutoubia' ? 'KOUTOUBIA MOSQUE' : m.name}
                </text>
                {m.note && (
                  <text x={m.x + 8} y={m.y + 5} fontSize="4" fill={C.muted}>
                    {m.note}
                  </text>
                )}
              </g>
            ))}

            {/* ═══ FOUNTAINS ═══ */}
            {FOUNTAINS.map(f => (
              <g key={f.name}>
                <circle cx={f.x} cy={f.y} r={3} fill={C.fountain} fillOpacity={0.3} stroke={C.fountain} strokeWidth="0.8" />
                <circle cx={f.x} cy={f.y} r={1} fill={C.fountain} />
                <text x={f.x + 6} y={f.y + 2} fontSize="4.5" fill={C.fountain}>
                  {f.name}
                </text>
              </g>
            ))}

            {/* ═══ HAMMAMS ═══ */}
            {HAMMAMS.map(h => (
              <g key={h.name}>
                {/* Steam symbol */}
                <path d={`M ${h.x - 3},${h.y} Q ${h.x - 1},${h.y - 4} ${h.x + 1},${h.y} Q ${h.x + 3},${h.y - 4} ${h.x + 5},${h.y}`}
                  fill="none" stroke={C.hammam} strokeWidth="0.8" />
                <circle cx={h.x + 1} cy={h.y + 2} r={2.5} fill={C.hammam} fillOpacity={0.2} stroke={C.hammam} strokeWidth="0.5" />
                <text x={h.x + 8} y={h.y + 3} fontSize="4.5" fill={C.hammam}>
                  {h.name}
                </text>
              </g>
            ))}

            {/* ═══ LANDMARKS ═══ */}
            {LANDMARKS.map(l => {
              const sym = l.type === 'palace' ? C.palace :
                          l.type === 'garden' ? C.garden :
                          l.type === 'tomb' ? C.tomb :
                          l.type === 'museum' ? C.museum :
                          l.type === 'school' ? C.mosque :
                          C.spice
              return (
                <g key={l.name}>
                  {l.type === 'palace' && (
                    <rect x={l.x - 4} y={l.y - 4} width={8} height={8} fill={sym} fillOpacity={0.2} stroke={sym} strokeWidth="0.8" />
                  )}
                  {l.type === 'garden' && (
                    <circle cx={l.x} cy={l.y} r={4} fill={sym} fillOpacity={0.15} stroke={sym} strokeWidth="0.8" />
                  )}
                  {l.type === 'tomb' && (
                    <polygon points={`${l.x},${l.y - 5} ${l.x - 4},${l.y + 3} ${l.x + 4},${l.y + 3}`} fill={sym} fillOpacity={0.3} stroke={sym} strokeWidth="0.6" />
                  )}
                  {l.type === 'museum' && (
                    <circle cx={l.x} cy={l.y} r={3} fill="none" stroke={sym} strokeWidth="1" />
                  )}
                  {l.type === 'school' && (
                    <rect x={l.x - 3} y={l.y - 3} width={6} height={6} fill={sym} fillOpacity={0.3} stroke={sym} strokeWidth="0.6" rx={1} />
                  )}
                  {l.type === 'square' && (
                    <rect x={l.x - 5} y={l.y - 5} width={10} height={10} fill={sym} fillOpacity={0.15} stroke={sym} strokeWidth="1" />
                  )}
                  <text x={l.x + 8} y={l.y} fontSize="5.5" fontWeight="500" fill={sym}>
                    {l.name}
                  </text>
                  {l.note && (
                    <text x={l.x + 8} y={l.y + 7} fontSize="3.8" fill={C.muted}>
                      {l.note}
                    </text>
                  )}
                </g>
              )
            })}

            {/* ═══ FONDOUKS ═══ */}
            {FONDOUKS.map(f => (
              <g key={f.name}>
                <rect x={f.x - 2} y={f.y - 2} width={4} height={4} fill="none" stroke={C.museum} strokeWidth="0.6" strokeDasharray="1,1" />
                <text x={f.x + 5} y={f.y + 1} fontSize="4" fill={C.museum} fontStyle="italic">{f.name}</text>
              </g>
            ))}

            {/* ═══ KOUTOUBIA MINARET (special treatment) ═══ */}
            <g transform="translate(380, 700)">
              <rect x="-5" y="-25" width="10" height="30" fill={C.mosque} fillOpacity={0.4} stroke={C.mosque} strokeWidth="1" />
              <rect x="-3" y="-30" width="6" height="8" fill={C.mosque} fillOpacity={0.6} />
              <rect x="-1.5" y="-34" width="3" height="5" fill={C.mosque} />
              <circle cx="0" cy="-36" r="1.5" fill={C.mosque} />
            </g>

            {/* ═══ TANNERIES (special treatment) ═══ */}
            <g>
              {Array.from({ length: 12 }, (_, i) => {
                const row = Math.floor(i / 4)
                const col = i % 4
                return (
                  <circle key={`vat-${i}`}
                    cx={825 + col * 12} cy={268 + row * 12} r={4}
                    fill={['#8B4513', '#C2703E', '#DAA520', '#2D6E4F', '#4A1A6B', '#C17F28',
                           '#7B2D8D', '#8B2252', '#1A5276', '#B8860B', '#6B4226', '#722F37'][i]}
                    fillOpacity={0.5}
                    stroke={C.leather} strokeWidth="0.5"
                  />
                )
              })}
              <text x="850" y="310" textAnchor="middle" fontSize="6" fontWeight="600" fill={C.leather}>
                TANNERIES
              </text>
              <text x="850" y="318" textAnchor="middle" fontSize="4" fill={C.muted}>
                Leather dyeing since 11th century
              </text>
            </g>

            {/* ═══ LEGEND ═══ */}
            <g transform="translate(50, 1300)">
              <rect x="0" y="0" width="360" height="170" fill={C.parchment} stroke={C.wallDark} strokeWidth="1" />
              <rect x="3" y="3" width="354" height="164" fill="none" stroke={C.wallDark} strokeWidth="0.3" />
              <text x="180" y="20" textAnchor="middle" fontSize="8" fontWeight="600" letterSpacing="3" fill={C.ink}>LEGEND</text>

              {/* Craft zones */}
              <text x="15" y="38" fontSize="6" fontWeight="500" fill={C.ink}>CRAFT ZONES</text>
              {[
                { label: 'Leather & Hides', color: C.leather },
                { label: 'Metalwork', color: C.metal },
                { label: 'Textiles & Silk', color: C.textile },
                { label: 'Dyers', color: C.dye },
                { label: 'Carpets & Rugs', color: C.carpet },
                { label: 'Spices & Food', color: C.spice },
                { label: 'Woodwork', color: C.wood },
                { label: 'Pottery', color: C.pottery },
              ].map((item, i) => (
                <g key={item.label} transform={`translate(${15 + (i % 2) * 85}, ${48 + Math.floor(i / 2) * 12})`}>
                  <rect x="0" y="0" width="8" height="8" fill={item.color} fillOpacity={0.3} stroke={item.color} strokeWidth="0.6" />
                  <text x="12" y="7" fontSize="5" fill={C.body}>{item.label}</text>
                </g>
              ))}

              {/* Landmarks */}
              <text x="200" y="38" fontSize="6" fontWeight="500" fill={C.ink}>LANDMARKS</text>
              {[
                { label: 'Mosque', color: C.mosque, sym: 'crescent' },
                { label: 'Gate (Bab)', color: C.gate, sym: 'arch' },
                { label: 'Fountain', color: C.fountain, sym: 'circle' },
                { label: 'Hammam', color: C.hammam, sym: 'steam' },
                { label: 'Palace', color: C.palace, sym: 'square' },
                { label: 'Garden', color: C.garden, sym: 'circle' },
                { label: 'Tomb / Shrine', color: C.tomb, sym: 'triangle' },
                { label: 'Museum', color: C.museum, sym: 'ring' },
              ].map((item, i) => (
                <g key={item.label} transform={`translate(200, ${48 + i * 12})`}>
                  {item.sym === 'circle' && <circle cx="4" cy="4" r="3" fill={item.color} fillOpacity={0.3} stroke={item.color} strokeWidth="0.6" />}
                  {item.sym === 'square' && <rect x="1" y="1" width="6" height="6" fill={item.color} fillOpacity={0.3} stroke={item.color} strokeWidth="0.6" />}
                  {item.sym === 'triangle' && <polygon points="4,0 0,7 8,7" fill={item.color} fillOpacity={0.3} stroke={item.color} strokeWidth="0.5" />}
                  {item.sym === 'ring' && <circle cx="4" cy="4" r="3" fill="none" stroke={item.color} strokeWidth="0.8" />}
                  {item.sym === 'crescent' && <><circle cx="4" cy="3" r="2.5" fill="none" stroke={item.color} strokeWidth="0.8" /><circle cx="5" cy="3" r="2" fill={C.parchment} /></>}
                  {item.sym === 'arch' && <rect x="1" y="0" width="6" height="7" fill={item.color} fillOpacity={0.6} rx="3" />}
                  {item.sym === 'steam' && <path d="M 0,6 Q 2,2 4,6 Q 6,2 8,6" fill="none" stroke={item.color} strokeWidth="0.8" />}
                  <text x="12" y="7" fontSize="5" fill={C.body}>{item.label}</text>
                </g>
              ))}

              {/* Wall */}
              <g transform="translate(15, 105)">
                <line x1="0" y1="4" x2="30" y2="4" stroke={C.wall} strokeWidth="4" />
                <text x="38" y="7" fontSize="5" fill={C.body}>City wall (9km, rammed earth, 1126 CE)</text>
              </g>
              <g transform="translate(15, 120)">
                <line x1="0" y1="4" x2="30" y2="4" stroke={C.road} strokeWidth="3" />
                <text x="38" y="7" fontSize="5" fill={C.body}>Main derb / road</text>
              </g>
              <g transform="translate(15, 135)">
                <rect x="0" y="0" width="30" height="8" fill={C.parchmentDark} fillOpacity={0.3} stroke={C.border} strokeWidth="0.3" strokeDasharray="2,2" />
                <text x="38" y="7" fontSize="5" fill={C.body}>Quarter / neighbourhood boundary</text>
              </g>
              <g transform="translate(15, 150)">
                <rect x="0" y="0" width="8" height="8" fill="none" stroke={C.museum} strokeWidth="0.5" strokeDasharray="1,1" />
                <text x="38" y="7" fontSize="5" fill={C.body}>Fondouk (caravanserai)</text>
              </g>
            </g>

            {/* ═══ SCALE BAR ═══ */}
            <g transform="translate(900, 1390)">
              <line x1="0" y1="0" x2="120" y2="0" stroke={C.ink} strokeWidth="1" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke={C.ink} strokeWidth="0.5" />
              <line x1="60" y1="-4" x2="60" y2="4" stroke={C.ink} strokeWidth="0.5" />
              <line x1="120" y1="-4" x2="120" y2="4" stroke={C.ink} strokeWidth="0.5" />
              <text x="0" y="12" textAnchor="middle" fontSize="5" fill={C.muted}>0</text>
              <text x="60" y="12" textAnchor="middle" fontSize="5" fill={C.muted}>250m</text>
              <text x="120" y="12" textAnchor="middle" fontSize="5" fill={C.muted}>500m</text>
            </g>

            {/* ═══ COLOPHON ═══ */}
            <g transform="translate(500, 1430)">
              <text x="0" y="0" textAnchor="middle" fontSize="6" letterSpacing="2" fill={C.muted}>
                SURVEYED AND COMPILED BY DANCING WITH LIONS · MARRAKECH · 2026
              </text>
              <text x="0" y="14" textAnchor="middle" fontSize="5" fill={C.muted}>
                Sources: MédinaCarte, Archnet, UNESCO, Walls of Marrakesh (Wikipedia), Ministry of Culture
              </text>
              <text x="0" y="26" textAnchor="middle" fontSize="5" fill={C.muted}>
                Positions approximate. Not all derbs shown. For navigation, consult local guides.
              </text>
              <text x="0" y="42" textAnchor="middle" fontSize="7" fontStyle="italic" fill={C.wallDark}>
                © 2026 Dancing with Lions. This map may not be reproduced without written permission and visible attribution.
              </text>
              <text x="0" y="56" textAnchor="middle" fontSize="7" fontStyle="italic" fill={C.mosque}>
                © Dancing with Lions
              </text>
            </g>

          </svg>
        </div>
      </section>

      {/* ═══ READING NOTES ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.gate }}>The Walls</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
                Nine kilometres of rammed earth, built in eight months in 1126 CE by
                the Almoravid sultan Ali ibn Yusuf. 200 towers. 19 gates. The walls stand
                up to 6 metres high and 2 metres thick. The red-ochre clay gives
                Marrakech its name: the Red City. The Almohads added the Kasbah to the
                south. The Alaouites extended north to enclose the shrine of Sidi Bel Abbès.
                The walls survived the 2023 earthquake with visible but limited damage.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.textile }}>The Souks</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
                The largest traditional market in Morocco, covering the entire northern half
                of the medina. Organised by guild: tanners in the northeast (since the 11th
                century), dyers in the centre, metalworkers clustered together so the sound
                of hammering stays in one quarter, leather and babouches near the Kissaria.
                Rue Semmarine is the main artery from Jemaa el-Fna into the souk
                labyrinth. The covered wooden-slat roofs create the shifting light-and-shadow
                that defines the souk experience.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.fountain }}>The Water</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.body }}>
                Every neighbourhood in the medina has its fountain — not decorative, but
                functional. The Mouassine Fountain (Saadian, 1562) is the most ornate,
                with carved cedar canopy and zellige tilework. Chrob ou Chouf (&quot;Drink and
                Look&quot;) near Ben Youssef features a carved wooden lintel and gives water
                to the northern quarter. The Koubba Almoravid (1117) — the oldest
                surviving structure in Marrakech — was itself part of an ablutions
                complex. Water is architecture here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MEDINA FACTS ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>By the Numbers</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { n: '1070', label: 'Founded', unit: 'CE' },
              { n: '150', label: 'Hectares', unit: 'ha' },
              { n: '9', label: 'Wall length', unit: 'km' },
              { n: '19', label: 'Historic gates', unit: 'babs' },
              { n: '200+', label: 'Wall towers', unit: '' },
              { n: '400+', label: 'Named derbs', unit: '' },
              { n: '7', label: 'Patron saints', unit: '' },
              { n: '18', label: 'Distinct souks', unit: '' },
              { n: '1985', label: 'UNESCO listed', unit: '' },
              { n: '20km', label: 'Wall perimeter', unit: 'total' },
              { n: '6m', label: 'Wall height', unit: 'max' },
              { n: '4', label: 'Dynasties', unit: 'built it' },
            ].map(stat => (
              <div key={stat.label} className="text-center p-2">
                <p className="font-serif italic text-[22px]" style={{ color: C.wallDark }}>{stat.n}</p>
                <p className="text-[8px] uppercase tracking-widest mt-1" style={{ color: C.muted }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            Nine hundred years of continuous habitation. The streets have no names
            that outsiders can follow. The gates still close at night. The tanneries
            still smell like the 12th century. This is not a museum.
            It is the oldest living city in North Africa, and people are home for dinner.
          </p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: C.muted }}>
            Gate positions and historical dating: &quot;Walls of Marrakesh&quot; (Wikipedia/Archnet); Deverdun,
            &quot;Marrakech, des origines à 1912&quot; (2004). Souk layout: MédinaCarte 1:4,900 medina map
            (400+ derbs mapped). Mosque and palace data: UNESCO World Heritage nomination file (1985);
            Lonely Planet Morocco; Marrakech Ministry of Culture. Craft zone classification based on
            traditional guild organisation documented in ethnographic surveys. Quarter names from
            local usage and cadastral records. All positions approximate —
            the medina resists precise cartography by design.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: C.border }}>
              © {new Date().getFullYear()} Dancing with Lions. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.mosque }}>
              © Dancing with Lions
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
