'use client'

import Link from 'next/link'

// ═══ ROAD TO 2030: THE WORLD CUP BLUEPRINT ═══
// Not the stadiums (that's Module 010). The economic architecture.
// How $41 billion reshapes a country's skeleton.
// Travel time compression, investment rivers, GDP spillovers, reachability zones.
// Before/After: what the World Cup actually builds.

const C = {
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  bg: '#FFFFFF',
  bgAlt: '#FFFFFF',
  rail: '#2D6E4F',
  railLight: '#4AAF7A',
  road: '#A0522D',
  airport: '#5D3A5E',
  stadium: '#C54B3C',
  hotel: '#6B7F5E',
  port: '#2D4A6E',
  gdp: '#C17F28',
  tourism: '#8B3A6B',
  jobs: '#4A6741',
  before: '#737373',
  after: '#C54B3C',
}

const W = 1200
const H = 2600

// ═══ INVESTMENT SECTORS ═══
interface Sector {
  name: string
  budget: number // USD billions
  color: string
  items: string[]
}

const SECTORS: Sector[] = [
  { name: 'High-Speed Rail (LGV)', budget: 9.6, color: C.rail,
    items: ['Kénitra → Marrakech extension (430km)', '168 new trains (Alstom, Talgo, Hyundai Rotem)', 'Conventional line upgrades', 'Future: Marrakech → Agadir, Rabat → Fez → Oujda'] },
  { name: 'Ports', budget: 7.5, color: C.port,
    items: ['27 port upgrades', 'Nador West Med mega-port', 'Tanger Med expansion', 'Atlantic hub strategy'] },
  { name: 'Airports', budget: 2.8, color: C.airport,
    items: ['Mohammed V (Casa) new terminal', 'Rabat-Salé expansion', 'Marrakech, Agadir, Fez, Tangier upgrades', 'Target: 38M → 80M passengers/year'] },
  { name: 'Stadiums & Training', budget: 2.5, color: C.stadium,
    items: ['Grand Stade Hassan II (115K, $500M)', '5 stadium renovations', '60 training centres', '80% already funded by AFCON revenue'] },
  { name: 'Highways', budget: 1.3, color: C.road,
    items: ['Continental Rabat-Casa Highway (60km)', 'Tit Mellil-Berrechid (30km)', 'Ain Harrouda & Sidi Maarouf junctions', 'Grand Stadium access roads'] },
  { name: 'Tourism & Hotels', budget: 1.0, color: C.hotel,
    items: ['+40,000 rooms (290K → 330K total)', '25,000 rooms renovated ($400M programme)', 'RAM fleet: 50 → 200+ aircraft', 'Target: 17.4M → 26M visitors'] },
]

const TOTAL_BUDGET = SECTORS.reduce((s, sec) => s + sec.budget, 0)

// ═══ TRAVEL TIME COMPRESSION (the reachability story) ═══
interface Route {
  from: string
  to: string
  before: number // minutes (current)
  after: number // minutes (2029 LGV)
  distance: number // km
  mode: string
}

const ROUTES: Route[] = [
  { from: 'Tangier', to: 'Casablanca', before: 130, after: 90, distance: 340, mode: 'Al Boraq HSR' },
  { from: 'Tangier', to: 'Rabat', before: 100, after: 60, distance: 250, mode: 'LGV Extension' },
  { from: 'Tangier', to: 'Marrakech', before: 420, after: 160, distance: 580, mode: 'LGV Extension' },
  { from: 'Casablanca', to: 'Marrakech', before: 180, after: 75, distance: 240, mode: 'LGV Extension' },
  { from: 'Casablanca', to: 'Rabat', before: 50, after: 40, distance: 90, mode: 'LGV Upgrade' },
  { from: 'Rabat', to: 'Marrakech', before: 240, after: 100, distance: 330, mode: 'LGV Extension' },
  { from: 'Rabat', to: 'CMN Airport', before: 75, after: 35, distance: 80, mode: 'LGV Airport Link' },
  { from: 'Marrakech', to: 'Agadir', before: 210, after: 90, distance: 260, mode: 'New Rail Line' },
]

// ═══ HOST CITIES: Before/After GDP Spillover ═══
interface HostCity {
  name: string
  population: string
  stadiumCapacity: string
  regionGDP2024: number // billion USD
  regionGDPProjected2030: number
  spilloverZone: string // surrounding areas
  jobs: string
  hotelRooms: string
  y: number // SVG position
}

const HOST_CITIES: HostCity[] = [
  { name: 'Casablanca', population: '3.7M', stadiumCapacity: '115,000', regionGDP2024: 38.5, regionGDPProjected2030: 48.2, spilloverZone: 'Berrechid, Benslimane, Mohammedia, Settat', jobs: '65,000', hotelRooms: '+12,000', y: 0 },
  { name: 'Rabat', population: '1.9M', stadiumCapacity: '68,700', regionGDP2024: 22.4, regionGDPProjected2030: 28.8, spilloverZone: 'Salé, Kénitra, Témara, Skhirat', jobs: '35,000', hotelRooms: '+8,000', y: 1 },
  { name: 'Tangier', population: '1.2M', stadiumCapacity: '75,600', regionGDP2024: 12.8, regionGDPProjected2030: 17.5, spilloverZone: 'Tétouan, Fnideq, Al Hoceïma, Chefchaouen', jobs: '28,000', hotelRooms: '+5,000', y: 2 },
  { name: 'Marrakech', population: '1.0M', stadiumCapacity: '70,000', regionGDP2024: 10.2, regionGDPProjected2030: 14.8, spilloverZone: 'Essaouira, Ouarzazate, Beni Mellal, Safi', jobs: '32,000', hotelRooms: '+10,000', y: 3 },
  { name: 'Agadir', population: '0.6M', stadiumCapacity: '70,000', regionGDP2024: 7.8, regionGDPProjected2030: 11.2, spilloverZone: 'Tiznit, Taroudant, Inezgane, Guelmim', jobs: '18,000', hotelRooms: '+6,000', y: 4 },
  { name: 'Fes', population: '1.2M', stadiumCapacity: '55,800', regionGDP2024: 9.6, regionGDPProjected2030: 12.8, spilloverZone: 'Meknès, Ifrane, Sefrou, Taza', jobs: '22,000', hotelRooms: '+4,000', y: 5 },
]

// ═══ ECONOMIC PROJECTIONS ═══
const PROJECTIONS = {
  gdpImpact: '1–2.5% GDP growth',
  gdpValue: '$130B → $260B (Vision 2035)',
  totalJobs: '200,000–250,000',
  tourismTarget: '26M visitors by 2030',
  tourismRevenue: 'MAD 120B ($12B)',
  matchRevenue: '$25–37.5M per match',
  directBenefit: '$1.2B direct economic benefit',
  afconRecovered: '€1.5B recovered from AFCON hosting',
  debtRisk: 'Morocco regained investment-grade 2024',
}

export default function WorldCupBlueprintPage() {
  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-36 pb-6">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 023 · Infrastructure Economics</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>Road to 2030</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          The World Cup Blueprint
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4" style={{ color: C.text }}>
          Morocco approved MAD 380 billion ($41 billion) in infrastructure spending
          for the 2030 FIFA World Cup. The stadiums are the headline. The real story
          is the $9.6 billion high-speed rail extension that will shrink Tangier-to-Marrakech
          from 7 hours to 2 hours 40 minutes. The 27 port upgrades. The airport system
          designed to handle 80 million passengers. The 200,000 new jobs. The target
          of 26 million tourists. This is not a sporting event. It is a country
          rebuilding its skeleton in five years.
        </p>
      </section>

      {/* ═══ THE $41 BILLION ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="border p-6 md:p-10" style={{ borderColor: C.border }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <rect width={W} height={H} fill="white" />

            {/* Title block */}
            <text x={W / 2} y={35} textAnchor="middle" fontSize="10" letterSpacing="4" fontWeight="600" fill={C.ink}>
              THE $41 BILLION BLUEPRINT
            </text>
            <text x={W / 2} y={52} textAnchor="middle" fontSize="6" letterSpacing="2" fill={C.muted}>
              MAD 380 BILLION · APPROVED IN 2026 BUDGET · SIX HOST CITIES · 2030 CENTENARY WORLD CUP
            </text>

            {/* ═══ SECTION 1: INVESTMENT RIVERS ═══ */}
            <text x={30} y={90} fontSize="8" fontWeight="600" fill={C.ink} letterSpacing="2">
              WHERE THE MONEY FLOWS
            </text>
            <text x={30} y={104} fontSize="5" fill={C.muted}>
              Investment by sector (USD billions). Width = budget share.
            </text>

            {/* Horizontal stacked bar */}
            {(() => {
              const barY = 120
              const barH = 50
              const barW = 900
              let xOffset = 30
              return (
                <g>
                  {SECTORS.map(sec => {
                    const w = (sec.budget / (TOTAL_BUDGET + 16.5)) * barW // +16.5 for "other"
                    const x = xOffset
                    xOffset += w
                    return (
                      <g key={sec.name}>
                        <rect x={x} y={barY} width={w} height={barH}
                          fill={sec.color} fillOpacity={0.2} stroke={sec.color} strokeWidth="0.5" />
                        <text x={x + w / 2} y={barY + 20} textAnchor="middle" fontSize="9" fontWeight="700" fill={sec.color}>
                          ${sec.budget}B
                        </text>
                        <text x={x + w / 2} y={barY + 33} textAnchor="middle" fontSize="4.5" fill={sec.color}>
                          {sec.name}
                        </text>
                      </g>
                    )
                  })}
                  {/* Other/unclassified */}
                  <rect x={xOffset} y={barY} width={(16.5 / (TOTAL_BUDGET + 16.5)) * barW} height={barH}
                    fill="#999" fillOpacity={0.08} stroke="#999" strokeWidth="0.5" />
                  <text x={xOffset + ((16.5 / (TOTAL_BUDGET + 16.5)) * barW) / 2} y={barY + 20}
                    textAnchor="middle" fontSize="9" fontWeight="700" fill={C.muted}>$16.5B</text>
                  <text x={xOffset + ((16.5 / (TOTAL_BUDGET + 16.5)) * barW) / 2} y={barY + 33}
                    textAnchor="middle" fontSize="4.5" fill={C.muted}>Urban, Digital, Other</text>
                </g>
              )
            })()}

            {/* Sector detail cards */}
            {SECTORS.map((sec, i) => {
              const col = i % 3
              const row = Math.floor(i / 3)
              const x = 30 + col * 310
              const y = 200 + row * 110
              return (
                <g key={sec.name}>
                  <rect x={x} y={y} width={290} height={95}
                    fill="white" stroke={sec.color} strokeWidth="0.5" rx={2} />
                  <rect x={x} y={y} width={4} height={95} fill={sec.color} fillOpacity={0.4} rx={1} />
                  <text x={x + 14} y={y + 16} fontSize="6" fontWeight="600" fill={sec.color} letterSpacing="1">
                    {sec.name.toUpperCase()}
                  </text>
                  <text x={x + 14} y={y + 28} fontSize="12" fontWeight="700" fill={sec.color}>
                    ${sec.budget}B
                  </text>
                  {sec.items.map((item, j) => (
                    <text key={j} x={x + 14} y={y + 42 + j * 12} fontSize="5" fill={C.text}>
                      {item}
                    </text>
                  ))}
                </g>
              )
            })}

            {/* ═══ SECTION 2: TRAVEL TIME COMPRESSION ═══ */}
            <line x1={30} y1={440} x2={W - 30} y2={440} stroke={C.border} strokeWidth="0.5" />
            <text x={30} y={470} fontSize="8" fontWeight="600" fill={C.rail} letterSpacing="2">
              THE SHRINKING COUNTRY
            </text>
            <text x={30} y={484} fontSize="5" fill={C.muted}>
              How high-speed rail compresses Morocco. Before (current) vs After (2029 LGV). Minutes saved.
            </text>

            {/* Route comparison bars */}
            {ROUTES.map((route, i) => {
              const y = 510 + i * 55
              const maxMin = 420
              const scale = 700 / maxMin
              const bW = route.before * scale
              const aW = route.after * scale
              const saved = route.before - route.after
              const pct = Math.round((saved / route.before) * 100)

              return (
                <g key={`${route.from}-${route.to}`}>
                  <text x={30} y={y + 8} fontSize="5" fontWeight="600" fill={C.ink}>
                    {route.from} → {route.to}
                  </text>
                  <text x={30} y={y + 18} fontSize="4" fill={C.muted}>
                    {route.distance}km · {route.mode}
                  </text>
                  {/* Before bar */}
                  <rect x={200} y={y} width={bW} height={10}
                    fill={C.before} fillOpacity={0.15} stroke={C.before} strokeWidth="0.3" />
                  <text x={200 + bW + 4} y={y + 8} fontSize="5" fill={C.before}>
                    {Math.floor(route.before / 60)}h{route.before % 60 > 0 ? `${route.before % 60}m` : ''}
                  </text>
                  <text x={195} y={y + 8} textAnchor="end" fontSize="4" fill={C.before}>NOW</text>

                  {/* After bar */}
                  <rect x={200} y={y + 14} width={aW} height={10}
                    fill={C.rail} fillOpacity={0.25} stroke={C.rail} strokeWidth="0.5" />
                  <text x={200 + aW + 4} y={y + 22} fontSize="5" fontWeight="600" fill={C.rail}>
                    {route.after >= 60 ? `${Math.floor(route.after / 60)}h${route.after % 60 > 0 ? `${route.after % 60}m` : ''}` : `${route.after}m`}
                  </text>
                  <text x={195} y={y + 22} textAnchor="end" fontSize="4" fill={C.rail}>2029</text>

                  {/* Saved */}
                  <text x={W - 60} y={y + 16} textAnchor="end" fontSize="8" fontWeight="700" fill={C.after}>
                    &minus;{pct}%
                  </text>
                  <text x={W - 30} y={y + 16} fontSize="5" fill={C.muted}>
                    ({saved}m)
                  </text>
                </g>
              )
            })}

            {/* ═══ SECTION 3: HOST CITY GDP SPILLOVERS ═══ */}
            {(() => {
              const secY = 960
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.gdp} letterSpacing="2">
                    THE SPILLOVER EFFECT
                  </text>
                  <text x={30} y={secY + 44} fontSize="5" fill={C.muted}>
                    Six host cities. Regional GDP before (2024) vs projected (2030). Spillover zones = surrounding cities that benefit.
                  </text>

                  {HOST_CITIES.map((city, i) => {
                    const y = secY + 70 + i * 110
                    const maxGDP = 50
                    const barScale = 500 / maxGDP
                    const bW = city.regionGDP2024 * barScale
                    const aW = city.regionGDPProjected2030 * barScale
                    const growth = Math.round(((city.regionGDPProjected2030 - city.regionGDP2024) / city.regionGDP2024) * 100)

                    return (
                      <g key={city.name}>
                        {/* City header */}
                        <text x={30} y={y} fontSize="7" fontWeight="700" fill={C.ink}>{city.name.toUpperCase()}</text>
                        <text x={30} y={y + 12} fontSize="4.5" fill={C.muted}>
                          Pop: {city.population} · Stadium: {city.stadiumCapacity} · Jobs: {city.jobs} · Hotels: {city.hotelRooms}
                        </text>

                        {/* GDP bars */}
                        <rect x={220} y={y - 5} width={bW} height={10}
                          fill={C.before} fillOpacity={0.12} stroke={C.before} strokeWidth="0.3" />
                        <text x={220 + bW + 4} y={y + 3} fontSize="5" fill={C.before}>
                          ${city.regionGDP2024}B (2024)
                        </text>

                        <rect x={220} y={y + 9} width={aW} height={10}
                          fill={C.gdp} fillOpacity={0.2} stroke={C.gdp} strokeWidth="0.5" />
                        <text x={220 + aW + 4} y={y + 17} fontSize="5" fontWeight="600" fill={C.gdp}>
                          ${city.regionGDPProjected2030}B (2030)
                        </text>

                        {/* Growth percentage */}
                        <text x={W - 50} y={y + 10} textAnchor="end" fontSize="12" fontWeight="700" fill={C.gdp}>
                          +{growth}%
                        </text>

                        {/* Spillover zone */}
                        <text x={30} y={y + 28} fontSize="4" fill={C.rail}>
                          Spillover → {city.spilloverZone}
                        </text>

                        {/* Spillover dots */}
                        {city.spilloverZone.split(', ').map((town, j) => (
                          <g key={town}>
                            <circle cx={220 + j * 75} cy={y + 38} r={3}
                              fill={C.rail} fillOpacity={0.15} stroke={C.rail} strokeWidth="0.3" />
                            <text x={220 + j * 75} y={y + 48} textAnchor="middle" fontSize="3.5" fill={C.rail}>
                              {town}
                            </text>
                          </g>
                        ))}

                        {/* Connecting lines (spillover arcs) */}
                        {city.spilloverZone.split(', ').map((_, j) => (
                          <line key={j} x1={120} y1={y + 2} x2={220 + j * 75} y2={y + 35}
                            stroke={C.rail} strokeWidth="0.2" strokeOpacity={0.2} />
                        ))}
                      </g>
                    )
                  })}
                </g>
              )
            })()}

            {/* ═══ SECTION 4: ECONOMIC PROJECTIONS ═══ */}
            {(() => {
              const secY = 1650
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.ink} letterSpacing="2">
                    THE RETURN
                  </text>
                  <text x={30} y={secY + 44} fontSize="5" fill={C.muted}>
                    What $41 billion is expected to generate
                  </text>

                  {/* Big number cards */}
                  {[
                    { label: 'GDP IMPACT', value: '+1 to 2.5%', sub: 'annual growth contribution 2024–2030', color: C.gdp },
                    { label: 'JOBS CREATED', value: '200,000–250,000', sub: 'direct and indirect employment', color: C.jobs },
                    { label: 'TOURISM TARGET', value: '26 MILLION', sub: 'visitors by 2030 (from 17.4M in 2024)', color: C.tourism },
                    { label: 'DIRECT BENEFIT', value: '$1.2 BILLION', sub: 'direct economic benefit from matches', color: C.stadium },
                    { label: 'PER MATCH', value: '$25–37.5M', sub: 'economic contribution per World Cup match', color: C.after },
                    { label: 'TOURISM REVENUE', value: '$12 BILLION', sub: 'MAD 120 billion projected for 2030', color: C.gdp },
                    { label: 'AFCON RECOVERED', value: '€1.5 BILLION', sub: 'direct revenue from hosting AFCON 2025', color: C.rail },
                    { label: 'VISION 2035', value: '$130B → $260B', sub: 'national GDP doubling target', color: C.ink },
                  ].map((card, i) => {
                    const col = i % 4
                    const row = Math.floor(i / 4)
                    const x = 30 + col * 280
                    const y = secY + 65 + row * 90
                    return (
                      <g key={card.label}>
                        <rect x={x} y={y} width={260} height={75}
                          fill="white" stroke={card.color} strokeWidth="0.5" rx={2} />
                        <text x={x + 12} y={y + 16} fontSize="5" letterSpacing="2" fontWeight="600" fill={card.color}>
                          {card.label}
                        </text>
                        <text x={x + 12} y={y + 42} fontSize="14" fontWeight="700" fill={card.color}>
                          {card.value}
                        </text>
                        <text x={x + 12} y={y + 58} fontSize="4.5" fill={C.muted}>
                          {card.sub}
                        </text>
                      </g>
                    )
                  })}
                </g>
              )
            })()}

            {/* ═══ SECTION 5: THE AFCON PROOF ═══ */}
            {(() => {
              const secY = 1890
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.rail} letterSpacing="2">
                    THE AFCON PROOF OF CONCEPT
                  </text>
                  <text x={30} y={secY + 44} fontSize="5" fill={C.muted}>
                    2025 Africa Cup of Nations as the dress rehearsal — what Morocco already delivered
                  </text>

                  {/* AFCON stats */}
                  {[
                    { label: 'Invested', value: '€2.3B', note: 'sovereign investment in lasting infrastructure' },
                    { label: 'Recovered', value: '€1.5B', note: 'direct revenue — 80% of WC sports costs funded' },
                    { label: 'Stadiums', value: '9', note: 'built or rehabilitated in 24 months' },
                    { label: 'Jobs', value: '100,000+', note: 'created during AFCON preparation' },
                    { label: 'Companies', value: '3,000+', note: 'industrial companies participated in construction' },
                    { label: 'Sponsors', value: '23', note: 'up from 9 (Cameroon 2021) and 17 (Ivory Coast 2023)' },
                  ].map((stat, i) => {
                    const x = 30 + (i % 3) * 350
                    const y = secY + 65 + Math.floor(i / 3) * 55
                    return (
                      <g key={stat.label}>
                        <text x={x} y={y} fontSize="5" letterSpacing="2" fontWeight="600" fill={C.rail}>
                          {stat.label.toUpperCase()}
                        </text>
                        <text x={x} y={y + 20} fontSize="16" fontWeight="700" fill={C.rail}>{stat.value}</text>
                        <text x={x} y={y + 34} fontSize="4.5" fill={C.muted}>{stat.note}</text>
                      </g>
                    )
                  })}

                  {/* Quote */}
                  <text x={30} y={secY + 200} fontSize="6" fontStyle="italic" fill={C.text}>
                    &ldquo;We gained a decade of development in 24 months and provided the kingdom with
                  </text>
                  <text x={30} y={secY + 212} fontSize="6" fontStyle="italic" fill={C.text}>
                    infrastructure that will serve citizens for the next 50 years.&rdquo;
                  </text>
                  <text x={30} y={secY + 226} fontSize="5" fill={C.muted}>
                    — Ryad Mezzour, Minister of Industry and Commerce, January 2026
                  </text>
                </g>
              )
            })()}

            {/* ═══ SECTION 6: THE LGV NETWORK MAP (Schematic) ═══ */}
            {(() => {
              const secY = 2140
              const cities = [
                { name: 'TANGIER', x: 480, y: secY + 40, pop: '1.2M', status: 'existing' as const },
                { name: 'KÉNITRA', x: 440, y: secY + 100, pop: '0.5M', status: 'existing' as const },
                { name: 'RABAT', x: 420, y: secY + 140, pop: '1.9M', status: 'existing' as const },
                { name: 'CASABLANCA', x: 380, y: secY + 200, pop: '3.7M', status: 'building' as const },
                { name: 'CMN AIRPORT', x: 310, y: secY + 230, pop: '', status: 'building' as const },
                { name: 'BENSLIMANE', x: 340, y: secY + 250, pop: 'Stadium', status: 'building' as const },
                { name: 'MARRAKECH', x: 350, y: secY + 330, pop: '1.0M', status: 'building' as const },
                { name: 'AGADIR', x: 250, y: secY + 390, pop: '0.6M', status: 'planned' as const },
                { name: 'FES', x: 600, y: secY + 130, pop: '1.2M', status: 'planned' as const },
              ]
              const lines: Array<{ from: number; to: number; type: 'existing' | 'building' | 'planned' }> = [
                { from: 0, to: 1, type: 'existing' },  // Tangier-Kénitra
                { from: 1, to: 2, type: 'building' },   // Kénitra-Rabat
                { from: 2, to: 3, type: 'building' },   // Rabat-Casa
                { from: 3, to: 4, type: 'building' },   // Casa-Airport
                { from: 4, to: 5, type: 'building' },   // Airport-Benslimane
                { from: 3, to: 6, type: 'building' },   // Casa-Marrakech
                { from: 6, to: 7, type: 'planned' },    // Marrakech-Agadir
                { from: 2, to: 8, type: 'planned' },    // Rabat-Fes
              ]

              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.rail} letterSpacing="2">
                    THE LGV NETWORK
                  </text>

                  {/* Legend */}
                  {[
                    { label: 'Operational (2018)', dash: '', color: C.rail, opacity: 0.8 },
                    { label: 'Under construction (2029)', dash: '6,3', color: C.rail, opacity: 0.5 },
                    { label: 'Planned (2030+)', dash: '2,4', color: C.muted, opacity: 0.4 },
                  ].map((l, i) => (
                    <g key={l.label}>
                      <line x1={700} y1={secY + 20 + i * 14} x2={740} y2={secY + 20 + i * 14}
                        stroke={l.color} strokeWidth="2" strokeDasharray={l.dash} strokeOpacity={l.opacity} />
                      <text x={748} y={secY + 24 + i * 14} fontSize="4.5" fill={l.color}>{l.label}</text>
                    </g>
                  ))}

                  {/* Lines */}
                  {lines.map((ln, i) => {
                    const f = cities[ln.from], t = cities[ln.to]
                    const dash = ln.type === 'existing' ? '' : ln.type === 'building' ? '6,3' : '2,4'
                    const op = ln.type === 'existing' ? 0.8 : ln.type === 'building' ? 0.5 : 0.3
                    const col = ln.type === 'planned' ? C.muted : C.rail
                    return (
                      <line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                        stroke={col} strokeWidth={ln.type === 'existing' ? 3 : 2}
                        strokeDasharray={dash} strokeOpacity={op} />
                    )
                  })}

                  {/* Cities */}
                  {cities.map(c => {
                    const col = c.status === 'existing' ? C.rail : c.status === 'building' ? C.gdp : C.muted
                    const r = c.name === 'CASABLANCA' ? 8 : c.name === 'CMN AIRPORT' || c.name === 'BENSLIMANE' ? 4 : 6
                    return (
                      <g key={c.name}>
                        <circle cx={c.x} cy={c.y} r={r} fill={col} fillOpacity={0.15} stroke={col} strokeWidth="1" />
                        <circle cx={c.x} cy={c.y} r={2} fill={col} fillOpacity={0.6} />
                        <text x={c.x + r + 4} y={c.y + 2} fontSize="5" fontWeight="600" fill={col}>
                          {c.name}
                        </text>
                        {c.pop && (
                          <text x={c.x + r + 4} y={c.y + 10} fontSize="3.5" fill={C.muted}>{c.pop}</text>
                        )}
                      </g>
                    )
                  })}

                  {/* Speed annotation */}
                  <text x={540} y={secY + 75} fontSize="5" fill={C.rail} fontStyle="italic">
                    320 km/h · Operational since 2018
                  </text>
                  <text x={440} y={secY + 270} fontSize="5" fill={C.gdp} fontStyle="italic">
                    350 km/h · Under construction · Completion 2029
                  </text>
                </g>
              )
            })()}

            {/* Colophon */}
            <text x={W / 2} y={H - 30} textAnchor="middle" fontSize="5" fill={C.muted} letterSpacing="1">
              SOURCES: AGBI · MOROCCO WORLD NEWS · ONCF · MIPA INSTITUTE · VALORIS SECURITIES · FIFA · UNESCO · WEETRACKER · © 2026 DANCING WITH LIONS
            </text>
            <text x={W / 2} y={H - 14} textAnchor="middle" fontSize="6" fontStyle="italic" fill={C.rail}>
              © Dancing with Lions
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
              <p className="micro-label mb-2" style={{ color: C.rail }}>The Shrinking Country</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                In 2018, the Al Boraq cut Tangier-to-Casablanca from 4h45m to 2h10m.
                By 2029, the Kénitra-Marrakech extension will shrink Tangier-to-Marrakech
                from 7 hours to 2h40m &mdash; a 62% compression. Casablanca-to-Marrakech
                drops from 3 hours to 1h15m. Rabat to the airport in 35 minutes. The
                economic consequence: Marrakech, Rabat, and Casablanca become a single
                commutable corridor. A businessperson in Rabat can have lunch in Marrakech.
                A tourist landing at CMN airport can reach any host city by dinner. The
                LGV does not just move people faster. It merges economies.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.gdp }}>The Spillover Geometry</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Every host city has a halo. Casablanca&apos;s investment spills into
                Berrechid, Benslimane, Mohammedia. Marrakech&apos;s spills into Essaouira,
                Ouarzazate, Safi. Tangier&apos;s spills into Tétouan, Chefchaouen, Al
                Hoceïma. These secondary cities get road upgrades, hotel capacity,
                service jobs &mdash; without hosting a single match. The question is whether
                this halo is permanent or temporary. South Africa 2010 and Brazil 2014
                suggest the answer depends on whether the infrastructure was designed
                for the tournament or for the country. Morocco&apos;s answer: every stadium
                is multifunctional, every rail line serves commuters, every airport
                serves tourists year-round.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.stadium }}>The AFCON Test</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Hosting AFCON 2025 was not a consolation prize. It was a proof of
                concept. €2.3 billion invested, €1.5 billion recovered in direct
                revenue. Nine stadiums built or rebuilt in 24 months. 100,000 jobs
                created. 3,000 industrial companies mobilised. Morocco&apos;s Industry
                Minister called it &ldquo;a decade of development in 24 months.&rdquo; More
                importantly, 80% of the World Cup&apos;s sports infrastructure costs
                are now funded. The remaining 20% is the LGV extension, hotel
                capacity, and the Grand Stadium in Casablanca. The dress rehearsal
                paid for the main act.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            Forty-one billion dollars is an abstraction. Here is what it looks like
            on the ground: a 430-kilometre high-speed rail line stitching five
            cities into one corridor. Eighty million airport passengers where there
            were thirty-eight million. Twenty-six million tourists where there were
            seventeen million. Two hundred thousand jobs that did not exist. A stadium
            that seats 115,000 people in a country that has never hosted a World Cup.
            And in the secondary cities &mdash; the Berrechids and Tiznits and Sefrous
            that will never appear in a FIFA broadcast &mdash; new roads, new hotels,
            new reasons to stay. The World Cup lasts 30 days. The skeleton lasts
            50 years. That is the blueprint.
          </p>
        </div>
      </section>

      {/* SOURCES */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: C.muted }}>
            Budget: AGBI (Oct 2025) &mdash; MAD 380B ($41B) approved in 2026 budget. Sector
            breakdown: WeeTracker (Oct 2025) &mdash; rail $9.6B, airports $2.8B, highways $1.3B,
            ports $7.5B. LGV extension: Wikipedia &ldquo;High-speed rail in Morocco&rdquo;; Morocco
            World News (Dec 2024) &mdash; 430km Kénitra-Marrakech, completion 2029, Tangier-Marrakech
            2h40m. Travel times: Morocco World News (Apr 2025) &mdash; Macron ceremony article
            confirming Tangier-Rabat 1h, Casa-Marrakech 1h15m. AFCON economics: Morocco World
            News (Jan 2026) &mdash; €1.5B revenue, 80% of WC costs covered, Mezzour quote.
            Stadium costs: Module 010 data (Populous design, $500M Grand Stade). Economic
            projections: Valoris Securities cost-benefit analysis; MIPA Institute; Morocco
            World News (Dec 2024) &mdash; $25-37.5M per match, $1.2B direct benefit, 200-250K
            jobs, GDP +1-2.5%. Tourism targets: ONCF 2023 annual report; government 26M visitor
            target. Regional GDP estimates: HCP regional accounts 2023-2024, projected using
            Atlas Capital growth modelling (+1-2.5% annual). Hotel data: MAD 4B renovation
            programme; +40,000 rooms target. All figures approximate; government budgets shift
            between announcement and execution.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: C.border }}>
              &copy; {new Date().getFullYear()} Dancing with Lions. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.rail }}>
              © Dancing with Lions
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
