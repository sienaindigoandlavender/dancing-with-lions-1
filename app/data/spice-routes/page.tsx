'use client'

import Link from 'next/link'

// ═══ THE SPICE ROUTES ═══
// Origin → Hub → Souk → Dish
// 14 spices. 60,000 tons. Rivers of colour.
// The supply chain that turns a $3 spice at source into a $40 jar in Paris.

const C = {
  // Spice colours
  saffron: '#C8A415',
  cumin: '#8B6914',
  cinnamon: '#7B3F00',
  pepper: '#2D2D2D',
  paprika: '#C54B3C',
  turmeric: '#D4A017',
  ginger: '#C9A84C',
  coriander: '#6B8E23',
  cloves: '#4A2C2A',
  nutmeg: '#8B7355',
  anise: '#7D8471',
  fenugreek: '#9B7B2C',
  caraway: '#5C4033',
  mint: '#2E8B57',
  // Categories
  local: '#2D6E4F',
  imported: '#722F37',
  composite: '#4A3C6E',
  // UI
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  parchment: '#FFFFFF',
  cream: '#FFFFFF',
}

// ═══ SPICE DATA ═══
interface Spice {
  name: string
  darija: string
  color: string
  origin: string  // where it grows/is sourced
  type: 'local' | 'imported' | 'composite'
  volume: number  // estimated tons/year consumed in Morocco
  priceOrigin: number  // $/kg at source
  priceSouk: number  // $/kg in Moroccan souk
  priceEurope: number  // $/kg retail in Paris/Europe
  season: string
  hub: string  // main trade hub
  dishes: string[]
  note?: string
}

const SPICES: Spice[] = [
  {
    name: 'Saffron',
    darija: 'Zaâfrane',
    color: C.saffron,
    origin: 'Taliouine, Anti-Atlas',
    type: 'local',
    volume: 7,  // Morocco produces ~6.8 tons
    priceOrigin: 2000,
    priceSouk: 3000,
    priceEurope: 5000,
    season: 'Oct–Nov harvest',
    hub: 'Taliouine → Marrakech',
    dishes: ['Tagine', 'Rfissa', 'Seffa', 'Mint tea (Fassi)'],
    note: '200,000 flowers = 1kg. 90% from Taliouine. PDO protected.'
  },
  {
    name: 'Cumin',
    darija: 'Kamoun',
    color: C.cumin,
    origin: 'Alnif, Anti-Atlas + Meknes',
    type: 'local',
    volume: 8500,
    priceOrigin: 4,
    priceSouk: 8,
    priceEurope: 25,
    season: 'Apr–May harvest',
    hub: 'Alnif → Meknes → Marrakech',
    dishes: ['Kefta', 'Harira', 'Grilled sardines', 'Couscous'],
    note: 'Most-used spice in Morocco. Hand-harvested by women in Alnif.'
  },
  {
    name: 'Paprika',
    darija: 'Felfla Hlouwa',
    color: C.paprika,
    origin: 'Tadla-Azilal + Marrakech-Safi',
    type: 'local',
    volume: 12000,
    priceOrigin: 3,
    priceSouk: 6,
    priceEurope: 18,
    season: 'Aug–Oct harvest',
    hub: 'Béni Mellal → Marrakech',
    dishes: ['Chermoula', 'Tagine', 'Tomato salads', 'Mechoui rub'],
    note: 'Sweet variety (tahmira). No additives. Rich in Vitamin C.'
  },
  {
    name: 'Turmeric',
    darija: 'Quekoum',
    color: C.turmeric,
    origin: 'India → Casablanca port',
    type: 'imported',
    volume: 6000,
    priceOrigin: 2,
    priceSouk: 5,
    priceEurope: 20,
    season: 'Year-round import',
    hub: 'India → Casablanca → Fes/Marrakech',
    dishes: ['Yellow tagine', 'Rice dishes', 'Preserved lemons'],
    note: 'Natural colouring agent. Often confused with saffron by tourists.'
  },
  {
    name: 'Ginger',
    darija: 'Skinjbir',
    color: C.ginger,
    origin: 'Nigeria/India → Casablanca',
    type: 'imported',
    volume: 5000,
    priceOrigin: 3,
    priceSouk: 7,
    priceEurope: 22,
    season: 'Year-round import',
    hub: 'West Africa/India → Casablanca → all cities',
    dishes: ['Tagine', 'Harira', 'Sellou', 'Tea blends'],
    note: 'Key to "yellow sauce" family with turmeric. Warming spice.'
  },
  {
    name: 'Cinnamon',
    darija: 'Karfa',
    color: C.cinnamon,
    origin: 'Sri Lanka / Indonesia → Casablanca',
    type: 'imported',
    volume: 4500,
    priceOrigin: 8,
    priceSouk: 15,
    priceEurope: 35,
    season: 'Year-round import',
    hub: 'Indian Ocean → Casablanca → Fes',
    dishes: ['Pastilla', 'Lamb with prunes', 'Seffa', 'Desserts'],
    note: 'Arrived via Arab traders. True Ceylon vs cassia distinction matters.'
  },
  {
    name: 'Black Pepper',
    darija: 'Elbezar',
    color: C.pepper,
    origin: 'Vietnam / India → Casablanca',
    type: 'imported',
    volume: 7000,
    priceOrigin: 5,
    priceSouk: 12,
    priceEurope: 30,
    season: 'Year-round import',
    hub: 'Indian Ocean → Casablanca → all cities',
    dishes: ['Lamb tagine', 'Brochettes', 'Salads', 'Harira'],
    note: 'Indian Ocean trade since Phoenicians. White pepper also used.'
  },
  {
    name: 'Coriander',
    darija: 'Kozbor',
    color: C.coriander,
    origin: 'Meknes-Fes + Gharb plains',
    type: 'local',
    volume: 5500,
    priceOrigin: 2,
    priceSouk: 4,
    priceEurope: 15,
    season: 'May–Jun seed harvest',
    hub: 'Meknes → all cities',
    dishes: ['Chermoula', 'Lentil soup', 'Pastilla filling', 'Briouats'],
    note: 'Seeds (dried) and fresh leaves both essential. Sweet, lemony.'
  },
  {
    name: 'Cloves',
    darija: 'Qronfel',
    color: C.cloves,
    origin: 'Zanzibar / Madagascar → Casablanca',
    type: 'imported',
    volume: 800,
    priceOrigin: 12,
    priceSouk: 25,
    priceEurope: 45,
    season: 'Year-round import',
    hub: 'East Africa → Casablanca → Fes',
    dishes: ['Ras el hanout', 'Mrouzia', 'Preserved meat', 'Tea'],
    note: 'East African spice trade. Essential in ras el hanout blends.'
  },
  {
    name: 'Nutmeg',
    darija: 'Gouza',
    color: C.nutmeg,
    origin: 'Indonesia → Casablanca',
    type: 'imported',
    volume: 600,
    priceOrigin: 15,
    priceSouk: 30,
    priceEurope: 55,
    season: 'Year-round import',
    hub: 'Indonesia → Casablanca → Fes/Marrakech',
    dishes: ['Ras el hanout', 'Pastilla', 'Sellou', 'Milk drinks'],
    note: 'Banda Islands → Morocco via Arab maritime trade.'
  },
  {
    name: 'Anise',
    darija: 'Nafaâ',
    color: C.anise,
    origin: 'Meknes-Fes region',
    type: 'local',
    volume: 2000,
    priceOrigin: 3,
    priceSouk: 6,
    priceEurope: 18,
    season: 'Jul–Aug harvest',
    hub: 'Meknes → all cities',
    dishes: ['Bread', 'Tea', 'Chebakia', 'Digestive drinks'],
    note: 'Sweet, aromatic. Grown locally. Used in Ramadan pastries.'
  },
  {
    name: 'Fenugreek',
    darija: 'Helba',
    color: C.fenugreek,
    origin: 'Eastern Morocco + India import',
    type: 'local',
    volume: 1500,
    priceOrigin: 3,
    priceSouk: 6,
    priceEurope: 16,
    season: 'Mar–Apr harvest',
    hub: 'Oujda + Casablanca → all cities',
    dishes: ['Saharan tagines', 'Bread', 'Rfissa', 'Medicinal teas'],
    note: 'Stronger in southern/Saharan cooking. Warming, slightly bitter.'
  },
  {
    name: 'Caraway',
    darija: 'Karwiya',
    color: C.caraway,
    origin: 'Middle Atlas foothills',
    type: 'local',
    volume: 1800,
    priceOrigin: 4,
    priceSouk: 8,
    priceEurope: 22,
    season: 'Jun–Jul harvest',
    hub: 'Azrou/Ifrane → Fes/Meknes',
    dishes: ['Khobz (bread)', 'Harira', 'Lentils', 'Khlii seasoning'],
    note: 'Often confused with cumin. Essential in Fassi bread baking.'
  },
  {
    name: 'Mint',
    darija: 'Naânaâ',
    color: C.mint,
    origin: 'Meknes (capital of mint)',
    type: 'local',
    volume: 15000,
    priceOrigin: 1,
    priceSouk: 2,
    priceEurope: 12,
    season: 'Mar–Nov (peak summer)',
    hub: 'Meknes → every city, daily',
    dishes: ['Mint tea (atay)', 'Salads', 'Garnish'],
    note: 'Not a spice — but Morocco\'s most consumed aromatic. Daily ritual.'
  },
]

// ═══ RAS EL HANOUT COMPONENTS ═══
const RAS_EL_HANOUT = [
  { name: 'Cumin', pct: 12, color: C.cumin },
  { name: 'Coriander', pct: 10, color: C.coriander },
  { name: 'Turmeric', pct: 10, color: C.turmeric },
  { name: 'Paprika', pct: 10, color: C.paprika },
  { name: 'Black Pepper', pct: 8, color: C.pepper },
  { name: 'Ginger', pct: 8, color: C.ginger },
  { name: 'Cinnamon', pct: 8, color: C.cinnamon },
  { name: 'Nutmeg', pct: 5, color: C.nutmeg },
  { name: 'Cloves', pct: 5, color: C.cloves },
  { name: 'Cardamom', pct: 5, color: '#6B7D5C' },
  { name: 'Allspice', pct: 4, color: '#6B4226' },
  { name: 'Anise', pct: 4, color: C.anise },
  { name: 'Fenugreek', pct: 3, color: C.fenugreek },
  { name: 'Rose petals', pct: 3, color: '#C27D8E' },
  { name: 'Lavender', pct: 2, color: '#7B68AE' },
  { name: 'Long pepper', pct: 1.5, color: '#555' },
  { name: 'Mace', pct: 1.5, color: '#A0522D' },
]

// ═══ SVG FLOW DIAGRAM ═══
const FW = 1400
const FH = 900

// Column X positions
const COL = {
  origin: 60,
  originW: 120,
  hub: 380,
  hubW: 100,
  souk: 620,
  soukW: 100,
  dish: 860,
  dishW: 120,
  export: 1100,
  exportW: 120,
}

// Node data for Sankey
interface FlowNode {
  id: string
  label: string
  x: number
  w: number
  color: string
  y?: number
  h?: number
}

// Build flow nodes
const ORIGINS: FlowNode[] = [
  { id: 'taliouine', label: 'Taliouine', x: COL.origin, w: COL.originW, color: C.saffron },
  { id: 'alnif', label: 'Alnif / Anti-Atlas', x: COL.origin, w: COL.originW, color: C.cumin },
  { id: 'tadla', label: 'Tadla-Azilal', x: COL.origin, w: COL.originW, color: C.paprika },
  { id: 'meknes', label: 'Meknes-Fes', x: COL.origin, w: COL.originW, color: C.coriander },
  { id: 'atlas', label: 'Middle Atlas', x: COL.origin, w: COL.originW, color: C.caraway },
  { id: 'east', label: 'Eastern Morocco', x: COL.origin, w: COL.originW, color: C.fenugreek },
  { id: 'indian', label: 'Indian Ocean Trade', x: COL.origin, w: COL.originW, color: C.cinnamon },
  { id: 'westafrica', label: 'West / East Africa', x: COL.origin, w: COL.originW, color: C.ginger },
  { id: 'indonesia', label: 'Indonesia', x: COL.origin, w: COL.originW, color: C.nutmeg },
]

// Volume scale: 1 ton = 0.0045 pixels height (to fit ~60K tons in ~280px)
const SCALE = 0.0045

export default function SpiceRoutesPage() {
  // Calculate node heights based on volume
  const localSpices = SPICES.filter(s => s.type === 'local')
  const importedSpices = SPICES.filter(s => s.type === 'imported')
  const totalVolume = SPICES.reduce((sum, s) => sum + s.volume, 0)

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-36 pb-6">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 020 · Supply Chain Cartography</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>The Spice Routes</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          Origin → Hub → Souk → Dish → Export
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4" style={{ color: C.text }}>
          Sixty thousand tons of spices flow through Morocco every year. Seven are
          home-grown — saffron from Taliouine, cumin from Alnif, paprika from
          Tadla-Azilal, mint from Meknes. Seven arrive on ships from the Indian Ocean,
          West Africa, and Indonesia — cinnamon, pepper, turmeric, ginger, cloves,
          nutmeg — the same trade routes that have fed Moroccan cooking since the
          Idrissids founded Fes in 789. They all converge in the souk. They all flow
          into the same dishes. And they all multiply in price between the field where
          they were picked and the jar on a shelf in Paris.
        </p>
      </section>

      {/* ═══ FLOW DIAGRAM ═══ */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="border p-4 md:p-6 overflow-x-auto" style={{ borderColor: C.border, background: C.parchment }}>
          <svg viewBox={`0 0 ${FW} ${FH}`} className="w-full h-auto min-w-[900px]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <rect width={FW} height={FH} fill={C.parchment} />

            {/* Column headers */}
            {[
              { x: COL.origin + COL.originW / 2, label: 'ORIGIN', sub: 'Where it grows' },
              { x: COL.hub + COL.hubW / 2, label: 'TRADE HUB', sub: 'Where it collects' },
              { x: COL.souk + COL.soukW / 2, label: 'SOUK', sub: 'Where it\'s sold' },
              { x: COL.dish + COL.dishW / 2, label: 'DISH', sub: 'Where it\'s eaten' },
              { x: COL.export + COL.exportW / 2, label: 'EXPORT', sub: 'Where it goes' },
            ].map(col => (
              <g key={col.label}>
                <text x={col.x} y={30} textAnchor="middle" fontSize="8" fontWeight="600"
                  fill={C.ink} letterSpacing="2">{col.label}</text>
                <text x={col.x} y={42} textAnchor="middle" fontSize="5.5" fill={C.muted}>
                  {col.sub}
                </text>
              </g>
            ))}

            {/* ═══ SPICE FLOW RIBBONS ═══ */}
            {/* Each spice gets a flowing ribbon from origin through to dish */}
            {(() => {
              // Compact vertical layout
              let yOriginLocal = 65
              let yOriginImport = 65
              let yHub = 65
              let ySouk = 65
              let yDish = 65
              let yExport = 65
              const gap = 4
              const minH = 8

              // Sort: highest volume first for visual impact
              const sorted = [...SPICES].sort((a, b) => b.volume - a.volume)

              // Pre-calculate hub aggregation points
              const hubMap: Record<string, { y: number, h: number }> = {}
              const soukMap: Record<string, { y: number, h: number }> = {}

              // Hubs
              const hubs = ['Meknes', 'Marrakech', 'Casablanca', 'Fes', 'Taliouine', 'Oujda']
              let hubY = 65
              hubs.forEach(hub => {
                const volume = sorted.filter(s => s.hub.includes(hub.slice(0, 4))).reduce((sum, s) => sum + s.volume, 0)
                const h = Math.max(minH, volume * SCALE)
                hubMap[hub] = { y: hubY, h }
                hubY += h + gap
              })

              // Souks
              const souks = ['Marrakech Souk', 'Fes Souk', 'Casablanca', 'Meknes Souk', 'Other Souks']
              let soukY = 65
              souks.forEach(souk => {
                const h = Math.max(minH, totalVolume / souks.length * SCALE)
                soukMap[souk] = { y: soukY, h }
                soukY += h + gap
              })

              // Dishes
              const dishes = [
                { name: 'Tagine', pct: 30 },
                { name: 'Couscous', pct: 15 },
                { name: 'Harira', pct: 12 },
                { name: 'Mint Tea', pct: 20 },
                { name: 'Pastilla', pct: 5 },
                { name: 'Bread', pct: 8 },
                { name: 'Grilled Meats', pct: 10 },
              ]
              const dishPositions: Record<string, { y: number, h: number }> = {}
              let dishY = 65
              dishes.forEach(d => {
                const h = Math.max(minH, totalVolume * d.pct / 100 * SCALE)
                dishPositions[d.name] = { y: dishY, h }
                dishY += h + gap
              })

              // Export destinations
              const exports = [
                { name: 'France', pct: 35 },
                { name: 'Spain', pct: 15 },
                { name: 'EU Other', pct: 20 },
                { name: 'Middle East', pct: 10 },
                { name: 'Domestic (37M)', pct: 20 },
              ]
              const exportPositions: Record<string, { y: number, h: number }> = {}
              let exportY = 65
              exports.forEach(e => {
                const h = Math.max(minH, totalVolume * e.pct / 100 * SCALE * 0.3)
                exportPositions[e.name] = { y: exportY, h }
                exportY += h + gap
              })

              // Draw each spice as a flowing path
              let currentY = 65

              return sorted.map((spice, i) => {
                const h = Math.max(minH, spice.volume * SCALE)
                const y = currentY
                currentY += h + gap

                // Origin x depends on local vs imported
                const origX = spice.type === 'imported' ? COL.origin + COL.originW : COL.origin + COL.originW
                const hubX = COL.hub
                const hubXEnd = COL.hub + COL.hubW
                const soukX = COL.souk
                const soukXEnd = COL.souk + COL.soukW
                const dishX = COL.dish
                const dishXEnd = COL.dish + COL.dishW
                const exportX = COL.export

                // Smooth cubic bezier path from origin → hub
                const midX1 = (origX + hubX) / 2
                const path1 = `M ${origX},${y} C ${midX1},${y} ${midX1},${y} ${hubX},${y}
                               L ${hubX},${y + h} C ${midX1},${y + h} ${midX1},${y + h} ${origX},${y + h} Z`

                // Hub → souk
                const midX2 = (hubXEnd + soukX) / 2
                const path2 = `M ${hubXEnd},${y} C ${midX2},${y} ${midX2},${y} ${soukX},${y}
                               L ${soukX},${y + h} C ${midX2},${y + h} ${midX2},${y + h} ${hubXEnd},${y + h} Z`

                // Souk → dish
                const midX3 = (soukXEnd + dishX) / 2
                const path3 = `M ${soukXEnd},${y} C ${midX3},${y} ${midX3},${y} ${dishX},${y}
                               L ${dishX},${y + h} C ${midX3},${y + h} ${midX3},${y + h} ${soukXEnd},${y + h} Z`

                // Dish → export (thinner)
                const midX4 = (dishXEnd + exportX) / 2
                const eh = h * 0.3  // only ~30% exported
                const path4 = `M ${dishXEnd},${y} C ${midX4},${y} ${midX4},${y} ${exportX},${y}
                               L ${exportX},${y + eh} C ${midX4},${y + eh} ${midX4},${y + eh} ${dishXEnd},${y + eh} Z`

                return (
                  <g key={spice.name}>
                    {/* Origin node */}
                    <rect x={COL.origin} y={y} width={COL.originW} height={h}
                      fill={spice.color} fillOpacity={0.25} stroke={spice.color} strokeWidth="0.5" />
                    <text x={COL.origin + 4} y={y + h / 2 + 2} fontSize={h > 12 ? '5.5' : '4'}
                      fontWeight="600" fill={spice.color}>{spice.name}</text>
                    {h > 15 && (
                      <text x={COL.origin + 4} y={y + h / 2 + 10} fontSize="3.5" fill={C.muted}>
                        {spice.origin.length > 25 ? spice.origin.slice(0, 22) + '…' : spice.origin}
                      </text>
                    )}

                    {/* Flow ribbons */}
                    <path d={path1} fill={spice.color} fillOpacity={0.12} />
                    <path d={path2} fill={spice.color} fillOpacity={0.12} />
                    <path d={path3} fill={spice.color} fillOpacity={0.12} />
                    <path d={path4} fill={spice.color} fillOpacity={0.08} />

                    {/* Hub node */}
                    <rect x={COL.hub} y={y} width={COL.hubW} height={h}
                      fill={spice.color} fillOpacity={0.15} />

                    {/* Souk node */}
                    <rect x={COL.souk} y={y} width={COL.soukW} height={h}
                      fill={spice.color} fillOpacity={0.15} />

                    {/* Dish node */}
                    <rect x={COL.dish} y={y} width={COL.dishW} height={h}
                      fill={spice.color} fillOpacity={0.15} />
                    {h > 12 && (
                      <text x={COL.dish + 4} y={y + h / 2 + 2} fontSize="4" fill={spice.color}>
                        {spice.dishes[0]}
                      </text>
                    )}

                    {/* Export node (thinner) */}
                    <rect x={COL.export} y={y} width={COL.exportW} height={h * 0.3}
                      fill={spice.color} fillOpacity={0.1} />

                    {/* Volume annotation */}
                    {h > 10 && (
                      <text x={COL.hub + COL.hubW / 2} y={y + h / 2 + 2} textAnchor="middle"
                        fontSize="4" fill={spice.color} fontWeight="500">
                        {spice.volume >= 1000 ? `${(spice.volume / 1000).toFixed(1)}K t` : `${spice.volume} t`}
                      </text>
                    )}
                  </g>
                )
              })
            })()}

            {/* ═══ PRICE ESCALATION SCALE ═══ */}
            <g transform="translate(60, 740)">
              <text x={0} y={0} fontSize="7" fontWeight="600" fill={C.ink} letterSpacing="2">
                PRICE ESCALATION: FIELD → SOUK → PARIS
              </text>
              {SPICES.filter(s => s.name !== 'Mint').map((s, i) => {
                const barY = 15 + i * 14
                const maxPrice = Math.max(...SPICES.map(sp => sp.priceEurope))
                const scaleX = 900 / maxPrice
                return (
                  <g key={s.name} transform={`translate(0, ${barY})`}>
                    <text x={0} y={8} fontSize="5" fill={s.color} fontWeight="500" textAnchor="start">
                      {s.name}
                    </text>
                    {/* Origin price */}
                    <rect x={80} y={1} width={Math.max(2, s.priceOrigin * scaleX)} height={8}
                      fill={s.color} fillOpacity={0.25} />
                    <text x={80 + s.priceOrigin * scaleX + 3} y={8} fontSize="3.5" fill={C.muted}>
                      ${s.priceOrigin}/kg
                    </text>
                    {/* Souk price */}
                    <rect x={80} y={1} width={s.priceSouk * scaleX} height={8}
                      fill={s.color} fillOpacity={0.15} />
                    {/* Europe price */}
                    <rect x={80} y={1} width={s.priceEurope * scaleX} height={8}
                      fill={s.color} fillOpacity={0.08} stroke={s.color} strokeWidth="0.3" />
                    <text x={80 + s.priceEurope * scaleX + 3} y={8} fontSize="3.5" fill={s.color} fontWeight="500">
                      ${s.priceEurope}/kg Paris
                    </text>
                    {/* Multiplier */}
                    <text x={80 + s.priceEurope * scaleX + 80} y={8} fontSize="3.5" fill={C.muted}>
                      ×{(s.priceEurope / s.priceOrigin).toFixed(0)}
                    </text>
                  </g>
                )
              })}
              {/* Scale label */}
              <g transform={`translate(80, ${15 + 13 * 14 + 5})`}>
                <rect x={0} y={0} width={10} height={6} fill={C.ink} fillOpacity={0.25} />
                <text x={14} y={5} fontSize="4" fill={C.muted}>Origin</text>
                <rect x={60} y={0} width={10} height={6} fill={C.ink} fillOpacity={0.15} />
                <text x={74} y={5} fontSize="4" fill={C.muted}>Souk</text>
                <rect x={110} y={0} width={10} height={6} fill={C.ink} fillOpacity={0.08} stroke={C.ink} strokeWidth="0.3" />
                <text x={124} y={5} fontSize="4" fill={C.muted}>Paris retail</text>
              </g>
            </g>

            {/* ═══ LOCAL vs IMPORTED legend ═══ */}
            <g transform={`translate(${FW - 300}, 65)`}>
              <rect width={12} height={8} fill={C.local} fillOpacity={0.3} stroke={C.local} strokeWidth="0.3" rx={1} />
              <text x={16} y={7} fontSize="5" fill={C.local}>Grown in Morocco (7 spices)</text>
              <rect y={14} width={12} height={8} fill={C.imported} fillOpacity={0.3} stroke={C.imported} strokeWidth="0.3" rx={1} />
              <text x={16} y={21} fontSize="5" fill={C.imported}>Imported (7 spices)</text>
              <text x={0} y={38} fontSize="4.5" fill={C.muted}>Total: ~60,000 tons/year</text>
              <text x={0} y={47} fontSize="4.5" fill={C.muted}>14 spices tracked</text>
              <text x={0} y={56} fontSize="4.5" fill={C.muted}>Flow width ∝ volume</text>
            </g>

            {/* Colophon */}
            <text x={FW / 2} y={FH - 10} textAnchor="middle" fontSize="5" fill={C.muted}>
              Sources: Morocco Ministry of Agriculture · FranceAgriMer · Slow Food Foundation · Souktana Cooperative · Souk field pricing · © 2026 Dancing with Lions
            </text>
          </svg>
        </div>
      </section>

      {/* ═══ RAS EL HANOUT DECOMPOSITION ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.composite }}>The Composite</p>
          <p className="text-[18px] font-serif italic mb-4" style={{ color: C.ink }}>
            Ras el Hanout — &ldquo;Head of the Shop&rdquo; — deconstructed
          </p>
          <p className="text-[12px] leading-[1.6] mb-4 max-w-[640px]" style={{ color: C.text }}>
            Every spice vendor makes their own. Recipes range from 12 to 100 ingredients.
            There is no standard. The name means &ldquo;the best the shop has to offer&rdquo; — it is
            the shopkeeper&apos;s signature, their reputation ground into powder. This is a
            representative blend.
          </p>
          <div className="flex flex-wrap gap-1">
            {RAS_EL_HANOUT.map(r => (
              <div key={r.name} className="flex items-center gap-1 px-2 py-1 border"
                style={{
                  borderColor: r.color,
                  flex: `0 0 ${Math.max(6, r.pct * 3)}%`,
                  background: `${r.color}08`,
                }}>
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: r.color, opacity: 0.5 }} />
                <span className="text-[9px]" style={{ color: r.color }}>{r.name}</span>
                <span className="text-[7px] ml-auto" style={{ color: C.muted }}>{r.pct}%</span>
              </div>
            ))}
          </div>
          <p className="text-[9px] mt-2 italic" style={{ color: C.muted }}>
            Representative blend only. Every attarine (spice merchant) guards their own recipe.
            May also include: galangal, dried rosebuds, cubeb pepper, grains of paradise, orris root, monk&apos;s pepper, ash berries.
            Some historical recipes included cantharides (Spanish fly) — now illegal.
          </p>
        </div>
      </section>

      {/* ═══ SPICE CARDS — FULL DATA ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="micro-label mb-4" style={{ color: C.muted }}>The Fourteen Spices</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {SPICES.map(s => (
              <div key={s.name} className="border p-3" style={{ borderColor: C.border, borderTop: `3px solid ${s.color}` }}>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="text-[13px] font-semibold" style={{ color: s.color }}>{s.name}</p>
                  <p className="text-[9px] italic" style={{ color: C.muted }}>{s.darija}</p>
                </div>
                <p className="text-[9px] mb-2" style={{ color: C.muted }}>
                  <span className="inline-block w-[8px] h-[8px] rounded-full mr-1" style={{ background: s.type === 'local' ? C.local : C.imported, opacity: 0.4, verticalAlign: 'middle' }} />
                  {s.origin}
                </p>
                {/* Price chain */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="text-center">
                    <p className="text-[8px]" style={{ color: C.muted }}>Origin</p>
                    <p className="text-[11px] font-semibold" style={{ color: s.color }}>${s.priceOrigin}</p>
                  </div>
                  <span className="text-[8px]" style={{ color: C.border }}>→</span>
                  <div className="text-center">
                    <p className="text-[8px]" style={{ color: C.muted }}>Souk</p>
                    <p className="text-[11px] font-semibold" style={{ color: s.color }}>${s.priceSouk}</p>
                  </div>
                  <span className="text-[8px]" style={{ color: C.border }}>→</span>
                  <div className="text-center">
                    <p className="text-[8px]" style={{ color: C.muted }}>Paris</p>
                    <p className="text-[11px] font-semibold" style={{ color: s.color }}>${s.priceEurope}</p>
                  </div>
                  <div className="ml-auto px-1.5 py-0.5 text-[8px] font-semibold" style={{ background: `${s.color}12`, color: s.color }}>
                    ×{(s.priceEurope / s.priceOrigin).toFixed(0)}
                  </div>
                </div>
                <p className="text-[8px]" style={{ color: C.muted }}>
                  {s.volume >= 1000 ? `${(s.volume / 1000).toFixed(1)}K` : s.volume} tons/yr · {s.season}
                </p>
                <p className="text-[8px] mt-1" style={{ color: C.text }}>
                  → {s.dishes.join(', ')}
                </p>
                {s.note && <p className="text-[7px] mt-1 italic" style={{ color: C.muted }}>{s.note}</p>}
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
              <p className="micro-label mb-2" style={{ color: C.saffron }}>The Red Gold Markup</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Saffron is the extreme case: $2,000/kg at the cooperative in Taliouine
                becomes $3,000 in a Marrakech souk and $5,000 in a Paris épicerie. The
                markup is less than you think — the real multiplier is at the tourist jar
                level. A souk vendor sells 1 gram for 30–50 MAD ($3–5). That same gram
                appears in a 1g glass jar in a French supermarket for €4–5. The difference
                is packaging, transport, certification, and the word &ldquo;Moroccan&rdquo; on
                the label. Counterfeiting is rampant: safflower, turmeric, and chemical
                dyes are sold as saffron. Buy threads, not powder. Buy PDO, not bulk.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.cinnamon }}>The Indian Ocean Ghosts</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Half of Morocco&apos;s essential spices — cinnamon, black pepper, turmeric,
                ginger, cloves, nutmeg — arrive on the same maritime routes that have
                connected the Indian Ocean to North Africa since the Phoenicians. They
                enter through Casablanca port, get repackaged in industrial zones, and
                disappear into the souk system looking indistinguishable from local
                produce. A tourist buying &ldquo;Moroccan cinnamon&rdquo; is buying Sri Lankan
                bark. A &ldquo;Moroccan turmeric&rdquo; is Indian root. This is not fraud — it is
                the trade. Morocco is a blender, not a grower, for half its spice rack.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.cumin }}>The Two Spice Families</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Moroccan cooks operate with two distinct flavour families that rarely
                mix. The &ldquo;yellow sauce&rdquo; (ginger + turmeric + saffron) and the &ldquo;red sauce&rdquo;
                (paprika + cumin). Fes leans yellow — saffron and cinnamon dominate, elegant
                and restrained. Marrakech leans red — cumin, turmeric, and ras el hanout,
                earthy and bold. The south and Sahara go hotter — fenugreek, chilli, dried
                herbs. The north prefers herbs over heat — oregano, bay, Andalusian
                echoes. Every family has their own proportions. No two tagines taste alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            Cumin costs four dollars a kilo in the dusty fields of Alnif, where Amazigh
            women harvest it by hand in April. It costs eight dollars in a Marrakech souk,
            weighed out on a brass scale. It costs twenty-five dollars in a glass jar
            in a Parisian épicerie, with a label that says &ldquo;Cumin du Maroc.&rdquo; The spice
            is the same. The hands that picked it do not appear on the jar. Sixty
            thousand tons flow through this country every year and nobody has drawn the
            rivers. Until now.
          </p>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: C.muted }}>
            Production volume: ReportLinker Morocco Spice Industry Outlook 2024–2028 (60,000 metric tons
            production, 64,000 consumption). Saffron data: Slow Food Foundation Taliouine Presidium;
            Souktana Cooperative; Villa Marrakech saffron farming guide; Morocco World News saffron coverage.
            Cumin: TasteAtlas Alnif cumin entry; field observation. Pricing: Selina Wamucii Morocco
            commodity tracker; Tripadvisor market reports; souk vendor surveys; French retail comparison
            (Carrefour, Biocoop pricing 2024–2025). Regional spice profiles: Moroccan Food Tour guide
            (May 2025); Ksar Ighnda spice guide; Wikipedia &ldquo;Moroccan cuisine.&rdquo; Ras el hanout
            composition: composite of published recipes and vendor interviews. Import routes:
            FranceAgriMer; Casablanca port authority trade statistics. All prices in USD equivalent.
            Volume estimates are approximate — Morocco does not publish granular spice-by-spice production data.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: C.border }}>
              © {new Date().getFullYear()} Dancing with Lions. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.saffron }}>
              © Dancing with Lions
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
