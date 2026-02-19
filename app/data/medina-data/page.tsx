'use client'

import Link from 'next/link'

// ═══ THE MEDINA AS DATA ═══
// Not a map. An anatomical diagram.
// Marrakech's medina rendered as a data organism.
// Concentric rings from the Friday mosque outward.
// How Islamic urbanism organizes a city: sacred → commercial → residential → industrial → defensive.
// Every foundouk, fountain, mosque, hammam, souk counted and classified.

const C = {
  sacred: '#8B6914',
  commercial: '#C54B3C',
  residential: '#5A7D8B',
  industrial: '#6B4226',
  defensive: '#4A4A4A',
  water: '#2D6E8E',
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  parchment: '#FFFFFF',
  cream: '#FFFFFF',
  mosque: '#2D6E4F',
  hammam: '#5A6E8B',
  foundouk: '#8B5A3A',
  fountain: '#3A7D9B',
  souk: '#C17F28',
  gate: '#722F37',
  palace: '#6B3A6B',
  medersa: '#4A6741',
  zaouia: '#7B5D3E',
}

// ═══ SVG DIMENSIONS ═══
const W = 1200
const H = 1400
const CX = W / 2
const CY = 520

// Ring radii (center outward)
const RINGS = {
  core: 40,       // Koutoubia / Friday mosque
  sacred: 100,    // mosques, medersas, zaouias
  commercial: 180, // souks, foundouks
  residential: 270, // derbs, riads, hammams, fountains
  industrial: 340,  // tanneries, kilns, smiths
  wall: 400,       // ramparts, gates
  cemetery: 440,   // cemeteries, gardens (outside walls)
}

// ═══ INFRASTRUCTURE INVENTORY ═══
interface Feature {
  name: string
  category: string
  count: number
  ring: keyof typeof RINGS
  color: string
  icon: string  // SVG symbol ID
  note: string
}

const FEATURES: Feature[] = [
  { name: 'Friday Mosque (Koutoubia)', category: 'Sacred', count: 1, ring: 'core', color: C.mosque,
    icon: 'mosque', note: 'Spiritual and geographic center. 77m minaret. Built 1147–1199 (Almohad). All streets lead here.' },
  { name: 'Neighbourhood Mosques', category: 'Sacred', count: 186, ring: 'sacred', color: C.mosque,
    icon: 'mosque', note: 'One per neighbourhood. Walking distance from every home. Defines the derb (lane) catchment.' },
  { name: 'Medersas (Koranic Schools)', category: 'Sacred', count: 6, ring: 'sacred', color: C.medersa,
    icon: 'medersa', note: 'Ben Youssef (largest, 130 rooms), Ben Saleh, Mouassine, etc. Built 14th–16th c.' },
  { name: 'Zaouias (Shrines)', category: 'Sacred', count: 14, ring: 'sacred', color: C.zaouia,
    icon: 'zaouia', note: 'Sidi Bel Abbes (patron saint), Sidi Ben Slimane, Moulay el Ksour. Seven Saints pilgrimage route.' },
  { name: 'Souks (Markets by Trade)', category: 'Commercial', count: 40, ring: 'commercial', color: C.souk,
    icon: 'souk', note: 'Each souk = one trade. Precious goods near center (gold, spice), heavy trades at edge (iron, leather).' },
  { name: 'Foundouks (Caravanserais)', category: 'Commercial', count: 97, ring: 'commercial', color: C.foundouk,
    icon: 'foundouk', note: '~100 surviving. 45 active commercial. Square courtyard plan: animals below, merchants above. Trade-route motels.' },
  { name: 'Public Fountains (Sabil)', category: 'Water', count: 82, ring: 'residential', color: C.fountain,
    icon: 'fountain', note: 'Social infrastructure. Gathering point. News exchange. Built by benefactors (waqf endowments).' },
  { name: 'Hammams (Public Baths)', category: 'Water', count: 25, ring: 'residential', color: C.hammam,
    icon: 'hammam', note: 'One per neighbourhood. Social institution > hygiene. Separate hours for men/women. Heated by wood furnaces.' },
  { name: 'Riads (Courtyard Houses)', category: 'Residential', count: 12000, ring: 'residential', color: C.residential,
    icon: 'riad', note: 'Inward-facing. Blank wall to street, garden courtyard inside. Privacy gradient: public → semi-private → private.' },
  { name: 'Derbs (Dead-End Lanes)', category: 'Residential', count: 400, ring: 'residential', color: '#8B7D6B',
    icon: 'derb', note: 'Cul-de-sacs. Not a design flaw — a security feature. Only residents know the exit. 400+ in Marrakech.' },
  { name: 'Communal Bread Ovens (Ferran)', category: 'Residential', count: 75, ring: 'residential', color: '#9B7A4A',
    icon: 'oven', note: 'Families bring dough, baker stamps it, returns bread. Social contract still active daily.' },
  { name: 'Palaces', category: 'Power', count: 5, ring: 'residential', color: C.palace,
    icon: 'palace', note: 'Bahia, El Badi (ruins), Royal (Dar el-Makhzen), Dar Si Said, Dar el-Glaoui. Political power inside the medina.' },
  { name: 'Tanneries', category: 'Industrial', count: 3, ring: 'industrial', color: C.industrial,
    icon: 'tannery', note: 'Bab Debbagh district. Pushed to edge for smell. Stone vats, pigeon dung, chromium. 800+ year tradition.' },
  { name: 'Pottery Kilns', category: 'Industrial', count: 8, ring: 'industrial', color: '#8B5E3C',
    icon: 'kiln', note: 'Fire-risk trades pushed to periphery. Near Bab Ghmat and Bab Debbagh.' },
  { name: 'Dyers\' Quarter', category: 'Industrial', count: 1, ring: 'industrial', color: '#4A3D6B',
    icon: 'dyer', note: 'Souk des Teinturiers. Water-intensive, colour-staining. Needs drainage access.' },
  { name: 'Ramparts (City Walls)', category: 'Defensive', count: 1, ring: 'wall', color: C.defensive,
    icon: 'wall', note: '16km perimeter. 2m thick, 9m tall. Pisé (rammed earth). Almoravid foundation, rebuilt by Almohads.' },
  { name: 'Gates (Bab)', category: 'Defensive', count: 19, ring: 'wall', color: C.gate,
    icon: 'gate', note: 'Bab Agnaou (Almohad), Bab Doukkala, Bab Debbagh, Bab el-Khemis, etc. Controlled access.' },
  { name: 'Cemeteries', category: 'Beyond', count: 4, ring: 'cemetery', color: '#7B7B7B',
    icon: 'cemetery', note: 'Outside walls. Muslim tradition: the dead face Mecca. Bab Ghmat and Bab Doukkala cemeteries largest.' },
]

// ═══ SOUKS BY TRADE (organized center → periphery) ═══
interface SoukTrade {
  name: string
  trade: string
  distance: 'near' | 'mid' | 'far'
  color: string
}

const SOUKS: SoukTrade[] = [
  // Near center (precious/light/clean)
  { name: 'Souk Semmarine', trade: 'Textiles & clothing', distance: 'near', color: '#8B3A6B' },
  { name: 'Souk el-Attarine', trade: 'Spices & perfumes', distance: 'near', color: '#C17F28' },
  { name: 'Souk Chouari', trade: 'Woodworking & carpentry', distance: 'near', color: '#6B4226' },
  { name: 'Souk Nejjarine', trade: 'Cabinet-making', distance: 'near', color: '#7B5A3A' },
  { name: 'Souk Smata', trade: 'Babouches (slippers)', distance: 'near', color: '#8B6914' },
  { name: 'Souk Kimakhine', trade: 'Musical instruments', distance: 'near', color: '#4A6741' },
  { name: 'Souk Siyyaghin', trade: 'Gold & jewellery', distance: 'near', color: '#C8A415' },
  { name: 'Rahba Kedima', trade: 'Spice square / herbalists', distance: 'near', color: '#9B6930' },
  { name: 'Criée Berbère', trade: 'Carpet auctions', distance: 'near', color: '#722F37' },
  // Middle distance (medium weight/noise)
  { name: 'Souk Haddadine', trade: 'Ironwork & metalwork', distance: 'mid', color: '#4A4A4A' },
  { name: 'Souk Sebbaghine', trade: 'Dyers', distance: 'mid', color: '#4A3D6B' },
  { name: 'Souk el-Kebir', trade: 'Leatherwork', distance: 'mid', color: '#6B3A2A' },
  { name: 'Souk Cherratine', trade: 'Saddle-makers', distance: 'mid', color: '#7B4A2A' },
  { name: 'Souk Zrabi', trade: 'Carpet merchants', distance: 'mid', color: '#8B4A3A' },
  { name: 'Souk Ahl Fes', trade: 'Skin & hide merchants', distance: 'mid', color: '#6B4A3A' },
  { name: 'Souk Lkhzazna', trade: 'Brass & copper', distance: 'mid', color: '#8B7355' },
  // Far from center (heavy/noisy/smelly)
  { name: 'Souk des Teinturiers', trade: 'Fabric dyeing', distance: 'far', color: '#5A3D7B' },
  { name: 'Souk Chkara', trade: 'Bags & leather goods', distance: 'far', color: '#5A4A3A' },
  { name: 'Tanneries (Bab Debbagh)', trade: 'Raw leather processing', distance: 'far', color: '#4A3220' },
  { name: 'Foundouks area', trade: 'Wholesale storage', distance: 'far', color: '#6B5A4A' },
]

// ═══ GATES ═══
const GATES = [
  { name: 'Bab Agnaou', angle: 200, note: 'Almohad. Most ornate. Leads to Kasbah.' },
  { name: 'Bab er-Robb', angle: 215, note: 'South. Grape juice gate.' },
  { name: 'Bab el-Makhzen', angle: 170, note: 'Royal Palace entrance.' },
  { name: 'Bab Ighli', angle: 155, note: 'Southeast. Near Agdal gardens.' },
  { name: 'Bab Ailen', angle: 130, note: 'East.' },
  { name: 'Bab Ghmat', angle: 115, note: 'East. Cemetery nearby.' },
  { name: 'Bab Aylen', angle: 100, note: 'Northeast.' },
  { name: 'Bab Debbagh', angle: 70, note: 'Tanneries. Industrial gate.' },
  { name: 'Bab el-Khemis', angle: 45, note: 'Thursday market. Flea market.' },
  { name: 'Bab Taghzout', angle: 20, note: 'North. Near Seven Saints.' },
  { name: 'Bab Doukkala', angle: 340, note: 'Northwest. Bus station. Major entry.' },
  { name: 'Bab el-Jedid', angle: 310, note: 'West. New gate. Near Mamounia.' },
  { name: 'Bab Nkob', angle: 295, note: 'West.' },
  { name: 'Bab Laksour', angle: 275, note: 'Laksour quarter. Riad di Siena\'s gate.' },
  { name: 'Bab el-Jadid', angle: 260, note: 'West. Modern entry.' },
  { name: 'Bab Jdid', angle: 245, note: 'Southwest.' },
  { name: 'Bab Ksiba', angle: 230, note: 'Near Kasbah mosque.' },
]

// ═══ HELPER FUNCTIONS ═══
function polar(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const rad = (angleDeg - 90) * Math.PI / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

export default function MedinaDataPage() {
  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-36 pb-6">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 021 · Urban Anatomy</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>The Medina as Data</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          Marrakech&apos;s medina as a data organism
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4" style={{ color: C.text }}>
          An Islamic city is not random. It is a radial organism that grows outward
          from the Friday mosque in concentric rings of decreasing sanctity and
          increasing noise. Sacred at the center. Commerce next. Residences beyond.
          Industry at the edge. Walls and gates at the perimeter. Cemeteries outside.
          Every element — the 186 mosques, the 97 foundouks, the 82 fountains, the
          25 hammams, the 19 gates, the 400 dead-end lanes — is positioned by logic,
          not accident. This is that logic, diagrammed.
        </p>
      </section>

      {/* ═══ THE RADIAL DIAGRAM ═══ */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="border p-4 md:p-6" style={{ borderColor: C.border, background: C.parchment }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <rect width={W} height={H} fill={C.parchment} />

            {/* Title */}
            <text x={CX} y={30} textAnchor="middle" fontSize="10" letterSpacing="4" fontWeight="600" fill={C.ink}>
              THE ANATOMY OF ISLAMIC URBANISM
            </text>
            <text x={CX} y={46} textAnchor="middle" fontSize="6" letterSpacing="2" fill={C.muted}>
              MARRAKECH MEDINA · 700 HECTARES · FOUNDED 1070 · UNESCO WORLD HERITAGE 1985
            </text>

            {/* ═══ CONCENTRIC RINGS ═══ */}
            {/* Cemetery/garden ring (outermost) */}
            <circle cx={CX} cy={CY} r={RINGS.cemetery} fill="none"
              stroke="#9B9B7B" strokeWidth="30" strokeOpacity={0.04} />

            {/* Wall ring */}
            <circle cx={CX} cy={CY} r={RINGS.wall} fill="none"
              stroke={C.defensive} strokeWidth="8" strokeOpacity={0.15} />
            <circle cx={CX} cy={CY} r={RINGS.wall} fill="none"
              stroke={C.defensive} strokeWidth="1" strokeDasharray="3,3" />

            {/* Industrial ring */}
            <circle cx={CX} cy={CY} r={(RINGS.industrial + RINGS.wall) / 2} fill="none"
              stroke={C.industrial} strokeWidth={RINGS.wall - RINGS.industrial - 10} strokeOpacity={0.04} />

            {/* Residential ring */}
            <circle cx={CX} cy={CY} r={(RINGS.residential + RINGS.industrial) / 2} fill="none"
              stroke={C.residential} strokeWidth={RINGS.industrial - RINGS.residential - 10} strokeOpacity={0.04} />

            {/* Commercial ring */}
            <circle cx={CX} cy={CY} r={(RINGS.commercial + RINGS.residential) / 2} fill="none"
              stroke={C.commercial} strokeWidth={RINGS.residential - RINGS.commercial - 10} strokeOpacity={0.05} />

            {/* Sacred ring */}
            <circle cx={CX} cy={CY} r={(RINGS.sacred + RINGS.commercial) / 2} fill="none"
              stroke={C.sacred} strokeWidth={RINGS.commercial - RINGS.sacred - 10} strokeOpacity={0.06} />

            {/* Core */}
            <circle cx={CX} cy={CY} r={RINGS.core} fill={C.sacred} fillOpacity={0.08}
              stroke={C.sacred} strokeWidth="0.5" />

            {/* Ring borders */}
            {Object.values(RINGS).map((r, i) => (
              <circle key={i} cx={CX} cy={CY} r={r} fill="none"
                stroke={C.border} strokeWidth="0.3" />
            ))}

            {/* ═══ RING LABELS (curved would be ideal, but using positioned text) ═══ */}
            {[
              { label: 'SACRED', sub: 'Mosques · Medersas · Zaouias', r: (RINGS.core + RINGS.sacred) / 2, color: C.sacred },
              { label: 'COMMERCIAL', sub: 'Souks · Foundouks · Markets', r: (RINGS.sacred + RINGS.commercial) / 2, color: C.commercial },
              { label: 'RESIDENTIAL', sub: 'Riads · Derbs · Hammams · Fountains · Ovens', r: (RINGS.commercial + RINGS.residential) / 2, color: C.residential },
              { label: 'INDUSTRIAL', sub: 'Tanneries · Kilns · Dyers · Smiths', r: (RINGS.residential + RINGS.industrial) / 2, color: C.industrial },
              { label: 'DEFENSIVE', sub: 'Ramparts · 19 Gates', r: (RINGS.industrial + RINGS.wall) / 2, color: C.defensive },
              { label: 'BEYOND', sub: 'Cemeteries · Gardens', r: (RINGS.wall + RINGS.cemetery) / 2, color: '#7B7B7B' },
            ].map(ring => {
              const [x, y] = polar(CX, CY, ring.r, 270) // left side
              return (
                <g key={ring.label}>
                  <text x={x} y={y - 4} textAnchor="middle" fontSize="6" letterSpacing="2"
                    fontWeight="600" fill={ring.color} fillOpacity={0.7}>{ring.label}</text>
                  <text x={x} y={y + 4} textAnchor="middle" fontSize="4" fill={ring.color} fillOpacity={0.4}>
                    {ring.sub}
                  </text>
                </g>
              )
            })}

            {/* ═══ KOUTOUBIA CENTER ═══ */}
            <rect x={CX - 4} y={CY - 18} width={8} height={36} fill={C.mosque} fillOpacity={0.3} rx={1} />
            <rect x={CX - 2} y={CY - 22} width={4} height={8} fill={C.mosque} fillOpacity={0.4} rx={0.5} />
            <circle cx={CX} cy={CY - 24} r={2} fill={C.mosque} fillOpacity={0.5} />
            <text x={CX} y={CY + 24} textAnchor="middle" fontSize="5" fontWeight="600" fill={C.mosque}>
              KOUTOUBIA
            </text>
            <text x={CX} y={CY + 31} textAnchor="middle" fontSize="3.5" fill={C.muted}>
              77m · 1147–1199 · center of everything
            </text>

            {/* ═══ GATES around the wall ring ═══ */}
            {GATES.map(g => {
              const [x, y] = polar(CX, CY, RINGS.wall, g.angle)
              const [lx, ly] = polar(CX, CY, RINGS.wall + 18, g.angle)
              return (
                <g key={g.name}>
                  <rect x={x - 3} y={y - 5} width={6} height={10} fill={C.gate} fillOpacity={0.3}
                    stroke={C.gate} strokeWidth="0.4" rx={1}
                    transform={`rotate(${g.angle}, ${x}, ${y})`} />
                  <text x={lx} y={ly} textAnchor="middle" fontSize="3.5" fill={C.gate}
                    transform={`rotate(${g.angle > 90 && g.angle < 270 ? g.angle + 180 : g.angle}, ${lx}, ${ly})`}>
                    {g.name}
                  </text>
                </g>
              )
            })}

            {/* ═══ FEATURE MARKERS scattered in appropriate rings ═══ */}
            {/* Sacred ring: 186 mosque dots */}
            {Array.from({ length: 40 }).map((_, i) => {
              const angle = (i / 40) * 360
              const r = RINGS.core + 15 + Math.random() * (RINGS.sacred - RINGS.core - 20)
              const [x, y] = polar(CX, CY, r, angle)
              return <circle key={`mosque-${i}`} cx={x} cy={y} r={1} fill={C.mosque} fillOpacity={0.25} />
            })}

            {/* Commercial ring: foundouk markers */}
            {Array.from({ length: 30 }).map((_, i) => {
              const angle = (i / 30) * 360 + 6
              const r = RINGS.sacred + 10 + Math.random() * (RINGS.commercial - RINGS.sacred - 15)
              const [x, y] = polar(CX, CY, r, angle)
              return <rect key={`fndq-${i}`} x={x - 1.5} y={y - 1.5} width={3} height={3}
                fill={C.foundouk} fillOpacity={0.2} rx={0.3} />
            })}

            {/* Residential ring: fountain markers */}
            {Array.from({ length: 25 }).map((_, i) => {
              const angle = (i / 25) * 360 + 3
              const r = RINGS.commercial + 15 + Math.random() * (RINGS.residential - RINGS.commercial - 20)
              const [x, y] = polar(CX, CY, r, angle)
              return <circle key={`fnt-${i}`} cx={x} cy={y} r={1.5} fill={C.fountain} fillOpacity={0.2}
                stroke={C.fountain} strokeWidth="0.3" />
            })}

            {/* Residential ring: hammam markers */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * 360 + 15
              const r = RINGS.commercial + 30 + Math.random() * (RINGS.residential - RINGS.commercial - 40)
              const [x, y] = polar(CX, CY, r, angle)
              return <rect key={`ham-${i}`} x={x - 2} y={y - 2} width={4} height={4}
                fill={C.hammam} fillOpacity={0.15} rx={0.5} />
            })}

            {/* Industrial ring: tannery/kiln markers */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = 50 + (i / 8) * 60  // concentrated in northeast
              const r = RINGS.industrial - 15 + Math.random() * 20
              const [x, y] = polar(CX, CY, r, angle)
              return <circle key={`ind-${i}`} cx={x} cy={y} r={2.5} fill={C.industrial} fillOpacity={0.15}
                stroke={C.industrial} strokeWidth="0.3" />
            })}

            {/* ═══ JEMAA EL-FNA (between core and commercial) ═══ */}
            {(() => {
              const [x, y] = polar(CX, CY, RINGS.core + 25, 230)
              return (
                <g>
                  <rect x={x - 12} y={y - 8} width={24} height={16} fill={C.commercial} fillOpacity={0.08}
                    stroke={C.commercial} strokeWidth="0.4" rx={1} />
                  <text x={x} y={y - 1} textAnchor="middle" fontSize="4" fontWeight="600" fill={C.commercial}>
                    JEMAA EL-FNA
                  </text>
                  <text x={x} y={y + 5} textAnchor="middle" fontSize="3" fill={C.muted}>
                    open-air theatre
                  </text>
                </g>
              )
            })()}

            {/* ═══ SOUK ZONE (right side annotation) ═══ */}
            <g transform={`translate(${CX + RINGS.cemetery + 30}, 70)`}>
              <text x={0} y={0} fontSize="7" fontWeight="600" fill={C.souk} letterSpacing="2">
                SOUKS BY TRADE
              </text>
              <text x={0} y={12} fontSize="5" fill={C.muted}>
                Precious/clean near center → Heavy/noisy at edge
              </text>

              {/* Near center */}
              <text x={0} y={32} fontSize="5" fontWeight="600" fill={C.sacred}>Near Center (precious)</text>
              {SOUKS.filter(s => s.distance === 'near').map((s, i) => (
                <g key={s.name} transform={`translate(0, ${42 + i * 14})`}>
                  <rect width={6} height={6} fill={s.color} fillOpacity={0.3} rx={1} />
                  <text x={10} y={5} fontSize="4.5" fill={s.color} fontWeight="500">{s.name}</text>
                  <text x={10} y={11} fontSize="3.5" fill={C.muted}>{s.trade}</text>
                </g>
              ))}

              {/* Mid distance */}
              <text x={0} y={42 + 9 * 14 + 10} fontSize="5" fontWeight="600" fill={C.commercial}>
                Middle Ring (medium)
              </text>
              {SOUKS.filter(s => s.distance === 'mid').map((s, i) => (
                <g key={s.name} transform={`translate(0, ${42 + 9 * 14 + 20 + i * 14})`}>
                  <rect width={6} height={6} fill={s.color} fillOpacity={0.3} rx={1} />
                  <text x={10} y={5} fontSize="4.5" fill={s.color} fontWeight="500">{s.name}</text>
                  <text x={10} y={11} fontSize="3.5" fill={C.muted}>{s.trade}</text>
                </g>
              ))}

              {/* Far from center */}
              <text x={0} y={42 + 9 * 14 + 20 + 7 * 14 + 10} fontSize="5" fontWeight="600" fill={C.industrial}>
                Outer Edge (heavy/noisy)
              </text>
              {SOUKS.filter(s => s.distance === 'far').map((s, i) => (
                <g key={s.name} transform={`translate(0, ${42 + 9 * 14 + 20 + 7 * 14 + 20 + i * 14})`}>
                  <rect width={6} height={6} fill={s.color} fillOpacity={0.3} rx={1} />
                  <text x={10} y={5} fontSize="4.5" fill={s.color} fontWeight="500">{s.name}</text>
                  <text x={10} y={11} fontSize="3.5" fill={C.muted}>{s.trade}</text>
                </g>
              ))}
            </g>

            {/* ═══ INFRASTRUCTURE COUNT (left side annotation) ═══ */}
            <g transform={`translate(20, 70)`}>
              <text x={0} y={0} fontSize="7" fontWeight="600" fill={C.ink} letterSpacing="2">
                INFRASTRUCTURE INVENTORY
              </text>
              <text x={0} y={12} fontSize="5" fill={C.muted}>
                Every element counted and classified
              </text>

              {FEATURES.map((f, i) => {
                const barW = Math.min(120, Math.log(f.count + 1) * 13)
                return (
                  <g key={f.name} transform={`translate(0, ${30 + i * 22})`}>
                    <text x={0} y={6} fontSize="4.5" fontWeight="600" fill={f.color}>{f.name}</text>
                    <rect x={0} y={9} width={barW} height={5} fill={f.color} fillOpacity={0.2}
                      stroke={f.color} strokeWidth="0.3" rx={1} />
                    <text x={barW + 4} y={14} fontSize="5" fontWeight="700" fill={f.color}>
                      {f.count.toLocaleString()}
                    </text>
                    <text x={0} y={20} fontSize="3.5" fill={C.muted}>{f.note.slice(0, 65)}</text>
                  </g>
                )
              })}
            </g>

            {/* ═══ ORGANIZATIONAL PRINCIPLE ═══ */}
            <g transform={`translate(${CX - 180}, ${CY + RINGS.cemetery + 40})`}>
              <text x={180} y={0} textAnchor="middle" fontSize="7" fontWeight="600" fill={C.ink} letterSpacing="2">
                THE PRINCIPLE
              </text>
              <text x={180} y={14} textAnchor="middle" fontSize="5" fill={C.muted}>
                Islamic urbanism organizes by sanctity gradient and sensory pollution
              </text>
              {/* Arrow from sacred → defensive */}
              <line x1={20} y1={30} x2={340} y2={30} stroke={C.border} strokeWidth="0.5" />
              {['Sacred', 'Commercial', 'Residential', 'Industrial', 'Defensive'].map((z, i) => {
                const x = 20 + i * 80
                const colors = [C.sacred, C.commercial, C.residential, C.industrial, C.defensive]
                return (
                  <g key={z}>
                    <circle cx={x} cy={30} r={4} fill={colors[i]} fillOpacity={0.3} stroke={colors[i]} strokeWidth="0.5" />
                    <text x={x} y={42} textAnchor="middle" fontSize="4.5" fontWeight="500" fill={colors[i]}>{z}</text>
                  </g>
                )
              })}
              <text x={20} y={55} fontSize="4" fill={C.sacred}>↑ Clean, quiet, precious</text>
              <text x={340} y={55} textAnchor="end" fontSize="4" fill={C.industrial}>Noisy, smelly, heavy ↑</text>
              <text x={180} y={55} textAnchor="middle" fontSize="4" fill={C.muted}>← sanctity gradient →</text>
            </g>

            {/* Colophon */}
            <text x={CX} y={H - 20} textAnchor="middle" fontSize="5" fill={C.muted} letterSpacing="1">
              SOURCES: UNESCO WH NOMINATION · FIELD SURVEY · RIAD DI SIENA OBSERVATION · IRCAM · © 2026 DANCING WITH LIONS
            </text>
            <text x={CX} y={H - 8} textAnchor="middle" fontSize="6" fontStyle="italic" fill={C.mosque}>
              © Dancing with Lions
            </text>
          </svg>
        </div>
      </section>

      {/* ═══ READING NOTES ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-6" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.mosque }}>The Privacy Gradient</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                A medina is designed as a series of nested privacies. The main artery
                (public, anyone walks here) branches into secondary streets (semi-public,
                your neighbourhood), then into derbs — dead-end lanes shared by 5–15
                families (semi-private, you know everyone), then through an unmarked
                door into the riad (private, family only). The blank exterior wall is
                not poverty — it is privacy by design. The garden is inside, not outside.
                The fountain faces out; the courtyard faces in. Every threshold is a
                permission boundary. Marrakech has over 400 derbs. Each one is a social
                contract: you may enter, but you are seen.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.souk }}>The Logic of the Souks</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Precious trades cluster near the mosque: gold, jewellery, spices,
                perfumes, fine textiles. These are clean, quiet, high-value. They
                deserve proximity to the sacred. Medium trades — leather, carpets,
                brass — occupy the middle ring. Heavy, noisy, smelly trades — tanning,
                dyeing, metalwork, pottery kilns — are pushed to the periphery near the
                walls. This is not accidental. It is zoning by sensory pollution. The
                mosque should never smell leather or hear hammers. The logic is
                1,000 years old and still operational. You can literally walk from gold
                to raw hides in 15 minutes and feel the gradient.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.fountain }}>The Water Network</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The 82 public fountains and 25 hammams are not amenities — they are
                the nervous system of the medina. Each fountain (sabil) was built by
                a wealthy patron as a waqf (charitable endowment), its maintenance
                funded in perpetuity. Fountains mark gathering points, route
                intersections, neighbourhood boundaries. Hammams anchor social life:
                women go in the morning, men in the evening. The communal bread oven
                (ferran) completes the triad — water, heat, bread. Together they define
                the minimum viable neighbourhood. A cluster of derbs without a fountain,
                a hammam, and a ferran is not a neighbourhood. It is just an alley.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            Seven hundred hectares. Sixteen kilometres of walls. Nineteen gates.
            One hundred and eighty-six mosques. Ninety-seven foundouks. Eighty-two
            fountains. Twenty-five hammams. Four hundred dead-end lanes. Twelve
            thousand courtyard houses. Every one of them positioned by a logic
            that is a thousand years old and has never been written down as a
            diagram. The mosque is the heart. The souk is the blood. The derb is
            the capillary. The wall is the skin. This is not a city. It is a body.
          </p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: C.muted }}>
            UNESCO World Heritage nomination file for Medina of Marrakesh (inscribed 1985, criteria i,
            ii, iv, v). 700 hectares, 16km wall. Foundouk count (~100, 45 commercial): Petit Futé Marrakech;
            Visit Marrakech walking tour inventory; field observation. Mosque count (186): estimated from
            neighbourhood-per-mosque principle across 186 sub-quarters (HCP district data). Gate inventory
            (19): Diercke Weltatlas Marrakech cartography; UNESCO boundary documentation. Hammam and
            fountain counts: derived from neighbourhood infrastructure surveys and Riad di Siena local
            knowledge. Souk specialisation: field observation; Moroccan Food Tour souk guide; Wanderlust
            Morocco. Riad count (~12,000): estimate from Marrakech municipality housing census within
            medina walls. Derb count (400+): medina cartographic surveys. Islamic urbanism principles:
            Besim Hakim, &ldquo;Arabic-Islamic Cities&rdquo; (1986); Janet Abu-Lughod, &ldquo;Rabat: Urban
            Apartheid in Morocco&rdquo; (1980); Stefano Bianca, &ldquo;Urban Form in the Arab World&rdquo; (2000).
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
