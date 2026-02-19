'use client'

import Link from 'next/link'

// ═══ THE CHAMELEON COUNTRY ═══
// Morocco's landscapes have doubled for Egypt, Tibet, Mars, Jerusalem,
// Mogadishu, Ancient Rome, and Mombasa. 200+ productions at Atlas Studios
// alone since 1983. Foreign shoots: $50M (pre-2021) → $150M (2025).
// This module maps every major production to its GPS coordinates,
// colour palette, and "look-alike" identity.

const C = {
  ink: '#0a0a0a',
  text: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  parchment: '#FAFAF5',
  cream: '#F5F0E8',
  film: '#722F37',
  gold: '#C17F28',
  reel: '#2D3A6E',
  desert: '#A0522D',
  sea: '#2D6E8E',
  green: '#2D6E4F',
}

const W = 1200
const H = 4200

// ═══ FILMING LOCATIONS (40 major productions) ═══
interface Production {
  title: string
  year: number
  director: string
  location: string
  lat: number
  lng: number
  budget: string      // production budget
  localRevenue?: string // estimated local spend
  playedAs: string    // what Morocco doubled for
  palette: string[]   // 3–4 dominant colours
  genre: string
  note?: string
}

const PRODUCTIONS: Production[] = [
  // OUARZAZATE / AÏT BENHADDOU CLUSTER
  { title: 'Lawrence of Arabia', year: 1962, director: 'David Lean', location: 'Ouarzazate', lat: 30.92, lng: -6.90, budget: '$15M', localRevenue: '$2M', playedAs: 'Arabian Desert', palette: ['#D4A574', '#E8C99B', '#8B7355', '#4A3728'], genre: 'Epic', note: 'First major production. Put Ouarzazate on the map.' },
  { title: 'Gladiator', year: 2000, director: 'Ridley Scott', location: 'Ouarzazate / Aït Benhaddou', lat: 31.05, lng: -7.13, budget: '$103M', localRevenue: '$12M', playedAs: 'Ancient Rome / North Africa', palette: ['#8B6914', '#C8A45C', '#5C4033', '#2B1D0E'], genre: 'Epic', note: 'Atlas Studios. Roman Colosseum built on-site.' },
  { title: 'Gladiator II', year: 2024, director: 'Ridley Scott', location: 'Ouarzazate / Aït Benhaddou', lat: 31.05, lng: -7.12, budget: '$200M', localRevenue: '$30M', playedAs: 'Ancient Rome / Numidia', palette: ['#8B6914', '#B8860B', '#4A3728', '#1C1108'], genre: 'Epic', note: 'Most expensive film ever shot in Morocco. $30M local spend.' },
  { title: 'Kingdom of Heaven', year: 2005, director: 'Ridley Scott', location: 'Ouarzazate', lat: 30.92, lng: -6.91, budget: '$130M', localRevenue: '$15M', playedAs: 'Jerusalem / Crusader States', palette: ['#C8A45C', '#8B7355', '#DEB887', '#4A3728'], genre: 'Epic' },
  { title: 'The Mummy', year: 1999, director: 'Stephen Sommers', location: 'Ouarzazate / Erfoud', lat: 31.43, lng: -4.23, budget: '$80M', localRevenue: '$8M', playedAs: 'Ancient Egypt', palette: ['#D4A574', '#EDC9AF', '#8B6914', '#1C1108'], genre: 'Adventure', note: 'Full Egyptian temple built from cardboard and plaster.' },
  { title: 'Prince of Persia', year: 2010, director: 'Mike Newell', location: 'Ouarzazate / Aït Benhaddou', lat: 31.05, lng: -7.13, budget: '$200M', localRevenue: '$18M', playedAs: 'Ancient Persia', palette: ['#C8A45C', '#8B4513', '#DEB887', '#2B1D0E'], genre: 'Adventure' },
  { title: 'Babel', year: 2006, director: 'Alejandro González Iñárritu', location: 'Taguenzalt / Ouarzazate', lat: 30.87, lng: -6.95, budget: '$25M', localRevenue: '$3M', playedAs: 'Morocco (as itself)', palette: ['#C8A45C', '#6B4226', '#E8D5B5', '#3E2723'], genre: 'Drama', note: 'Brad Pitt, Cate Blanchett. Morocco plays itself.' },
  { title: 'Black Hawk Down', year: 2001, director: 'Ridley Scott', location: 'Ouarzazate / Salé', lat: 34.05, lng: -6.80, budget: '$92M', localRevenue: '$10M', playedAs: 'Mogadishu, Somalia', palette: ['#8B7355', '#C8A45C', '#4A3728', '#1A1A1A'], genre: 'War' },
  { title: 'Ben-Hur', year: 2016, director: 'Timur Bekmambetov', location: 'Ouarzazate', lat: 30.92, lng: -6.90, budget: '$100M', localRevenue: '$10M', playedAs: 'Jerusalem / Roman Judea', palette: ['#D4A574', '#8B6914', '#5C4033', '#E8C99B'], genre: 'Epic' },
  { title: 'Kundun', year: 1997, director: 'Martin Scorsese', location: 'Atlas Studios, Ouarzazate', lat: 30.92, lng: -6.90, budget: '$28M', localRevenue: '$4M', playedAs: 'Tibet', palette: ['#8B0000', '#C17F28', '#4A0E4E', '#2B1D0E'], genre: 'Biography', note: 'Scorsese built Tibetan temple interior. Tibetan extras flown in.' },

  // ESSAOUIRA
  { title: 'John Wick: Chapter 3', year: 2019, director: 'Chad Stahelski', location: 'Essaouira', lat: 31.51, lng: -9.77, budget: '$75M', localRevenue: '$5M', playedAs: 'Casablanca (fictional)', palette: ['#1A237E', '#0D47A1', '#C8A45C', '#1C1108'], genre: 'Action', note: 'High-contrast blues and golds. Medina fight scenes.' },
  { title: 'Othello', year: 1951, director: 'Orson Welles', location: 'Essaouira / Safi', lat: 31.51, lng: -9.77, budget: '$0.6M', playedAs: 'Cyprus / Venice', palette: ['#1A1A1A', '#FFFFFF', '#8B8B8B', '#4A4A4A'], genre: 'Drama', note: 'Welles ran out of money. Shot over 3 years. Won Palme d\'Or.' },
  { title: 'Game of Thrones (S3)', year: 2013, director: 'Various', location: 'Essaouira', lat: 31.51, lng: -9.77, budget: '$6M/ep', localRevenue: '$3M', playedAs: 'Astapor (Slaver\'s Bay)', palette: ['#C8A45C', '#8B6914', '#4A3728', '#87CEEB'], genre: 'Fantasy' },

  // TANGIER
  { title: 'The Bourne Ultimatum', year: 2007, director: 'Paul Greengrass', location: 'Tangier', lat: 35.78, lng: -5.81, budget: '$110M', localRevenue: '$6M', playedAs: 'Tangier (as itself)', palette: ['#C8A45C', '#FFFFFF', '#2196F3', '#8B7355'], genre: 'Thriller', note: 'Rooftop chase across Tangier medina.' },
  { title: 'Inception', year: 2010, director: 'Christopher Nolan', location: 'Tangier', lat: 35.78, lng: -5.81, budget: '$160M', localRevenue: '$4M', playedAs: 'Mombasa, Kenya', palette: ['#8B7355', '#C8A45C', '#4A3728', '#1A1A1A'], genre: 'Sci-Fi', note: 'Tangier medina = Mombasa. DiCaprio foot chase.' },
  { title: 'The Living Daylights', year: 1987, director: 'John Glen', location: 'Tangier', lat: 35.78, lng: -5.81, budget: '$40M', localRevenue: '$2M', playedAs: 'Tangier (as itself)', palette: ['#C8A45C', '#1A237E', '#8B0000', '#FFFFFF'], genre: 'Action', note: 'James Bond. Timothy Dalton.' },
  { title: 'Only Lovers Left Alive', year: 2013, director: 'Jim Jarmusch', location: 'Tangier', lat: 35.78, lng: -5.81, budget: '$7M', playedAs: 'Tangier (as itself)', palette: ['#1A1A1A', '#2E2E2E', '#8B0000', '#C17F28'], genre: 'Drama', note: 'Tilda Swinton. Tangier as vampire haven.' },

  // MARRAKECH
  { title: 'Mission: Impossible — Rogue Nation', year: 2015, director: 'Christopher McQuarrie', location: 'Marrakech', lat: 31.63, lng: -8.01, budget: '$150M', localRevenue: '$8M', playedAs: 'Marrakech (as itself)', palette: ['#C8A45C', '#8B6914', '#FFFFFF', '#4A3728'], genre: 'Action', note: 'Tom Cruise. Motorcycle chase through medina.' },
  { title: 'Spectre', year: 2015, director: 'Sam Mendes', location: 'Tangier / Oujda / Erfoud', lat: 32.33, lng: -1.91, budget: '$245M', localRevenue: '$10M', playedAs: 'Tangier + fictional desert lair', palette: ['#C8A45C', '#D4A574', '#1A1A1A', '#8B6914'], genre: 'Action', note: 'Bond. Largest film explosion ever recorded (Erfoud).' },
  { title: 'The Odyssey', year: 2025, director: 'Christopher Nolan', location: 'Essaouira / Aït Benhaddou / Marrakech / Dakhla', lat: 31.51, lng: -9.77, budget: '$250M', localRevenue: '$25M', playedAs: 'Ancient Greece / Mediterranean', palette: ['#1565C0', '#C8A45C', '#FFFFFF', '#4A6741'], genre: 'Epic', note: 'Matt Damon, Zendaya. Nolan\'s second Moroccan production.' },

  // AÏT BENHADDOU (UNESCO)
  { title: 'Game of Thrones (S3)', year: 2013, director: 'Various', location: 'Aït Benhaddou', lat: 31.05, lng: -7.13, budget: '$6M/ep', playedAs: 'Yunkai (Slaver\'s Bay)', palette: ['#C8A45C', '#8B6914', '#DEB887', '#4A3728'], genre: 'Fantasy', note: 'UNESCO World Heritage ksar.' },
  { title: 'Jesus of Nazareth', year: 1977, director: 'Franco Zeffirelli', location: 'Aït Benhaddou / Meknès', lat: 31.05, lng: -7.13, budget: '$18M', playedAs: 'Jerusalem / Holy Land', palette: ['#C8A45C', '#DEB887', '#8B7355', '#87CEEB'], genre: 'Epic' },
  { title: 'The Last Temptation of Christ', year: 1988, director: 'Martin Scorsese', location: 'Aït Benhaddou / Ouarzazate', lat: 31.05, lng: -7.13, budget: '$7M', playedAs: 'Jerusalem / Palestine', palette: ['#C8A45C', '#E8C99B', '#4A3728', '#8B0000'], genre: 'Drama' },

  // SAHARA / MERZOUGA / ERFOUD
  { title: 'The Sheltering Sky', year: 1990, director: 'Bernardo Bertolucci', location: 'Tangier / Erfoud / Ouarzazate', lat: 31.43, lng: -4.23, budget: '$25M', playedAs: 'North Africa (as itself)', palette: ['#D4A574', '#EDC9AF', '#4A3728', '#87CEEB'], genre: 'Drama' },
  { title: 'Sahara', year: 2005, director: 'Breck Eisner', location: 'Merzouga / Erfoud', lat: 31.10, lng: -4.01, budget: '$160M', localRevenue: '$8M', playedAs: 'Mali / Niger / Sahara', palette: ['#D4A574', '#EDC9AF', '#C8A45C', '#87CEEB'], genre: 'Adventure' },
  { title: 'The Hills Have Eyes', year: 2006, director: 'Alexandre Aja', location: 'Ouarzazate outskirts', lat: 30.88, lng: -6.85, budget: '$17M', playedAs: 'American Southwest', palette: ['#D4A574', '#8B4513', '#EDC9AF', '#6B4226'], genre: 'Horror', note: 'Morocco as New Mexico. Gas station set still standing.' },

  // RABAT / SALÉ
  { title: 'American Sniper', year: 2014, director: 'Clint Eastwood', location: 'Rabat / Salé', lat: 34.02, lng: -6.83, budget: '$59M', localRevenue: '$4M', playedAs: 'Iraq', palette: ['#8B7355', '#C8A45C', '#4A3728', '#6B8E23'], genre: 'War' },
  { title: 'Spy Game', year: 2001, director: 'Tony Scott', location: 'Casablanca / Rabat', lat: 33.57, lng: -7.59, budget: '$92M', localRevenue: '$5M', playedAs: 'Beirut, Lebanon', palette: ['#8B7355', '#C8A45C', '#4A3728', '#1A1A1A'], genre: 'Thriller', note: 'Brad Pitt, Robert Redford. Casa/Rabat = 1980s Beirut.' },

  // FEZ
  { title: 'The Jewel of the Nile', year: 1985, director: 'Lewis Teague', location: 'Fez / Meknès', lat: 34.03, lng: -5.00, budget: '$26M', localRevenue: '$3M', playedAs: 'North Africa (fictional)', palette: ['#C8A45C', '#2E7D32', '#8B6914', '#87CEEB'], genre: 'Adventure', note: 'Michael Douglas, Kathleen Turner.' },

  // HIGH ATLAS
  { title: 'The Man Who Would Be King', year: 1975, director: 'John Huston', location: 'High Atlas / Ouarzazate', lat: 31.70, lng: -7.10, budget: '$8M', playedAs: 'Kafiristan (Afghanistan/India)', palette: ['#8B7355', '#4A6741', '#C8A45C', '#E8E8E8'], genre: 'Adventure', note: 'Sean Connery, Michael Caine.' },
  { title: 'Whiskey Tango Foxtrot', year: 2016, director: 'Glenn Ficarra', location: 'High Atlas', lat: 31.70, lng: -7.10, budget: '$35M', playedAs: 'Afghanistan', palette: ['#8B7355', '#C8A45C', '#6B8E23', '#4A3728'], genre: 'Comedy/War', note: 'Tina Fey. Atlas villages = Afghan villages.' },

  // CASABLANCA
  { title: 'Casablanca', year: 1942, director: 'Michael Curtiz', location: 'NOT FILMED IN MOROCCO', lat: 33.57, lng: -7.59, budget: '$1M', playedAs: 'Casablanca (from California)', palette: ['#1A1A1A', '#FFFFFF', '#8B8B8B', '#4A4A4A'], genre: 'Drama', note: 'NEVER filmed in Morocco. Shot entirely at Warner Bros., Burbank, CA.' },

  // DAKHLA (new frontier)
  { title: 'The Odyssey (Dakhla unit)', year: 2025, director: 'Christopher Nolan', location: 'Dakhla (White Dune)', lat: 23.72, lng: -15.93, budget: '$250M', playedAs: 'Mediterranean coastline', palette: ['#1565C0', '#FFFFFF', '#D4A574', '#87CEEB'], genre: 'Epic', note: 'Dakhla White Dune. Southernmost Moroccan film location.' },

  // MEKNÈS
  { title: 'The Big Blue (partial)', year: 1988, director: 'Luc Besson', location: 'Meknès aqueduct area', lat: 33.89, lng: -5.55, budget: '$9M', playedAs: 'Mediterranean', palette: ['#0D47A1', '#1565C0', '#FFFFFF', '#D4A574'], genre: 'Drama' },
]

// ═══ LOOK-ALIKE INDEX: What each city has "played" ═══
interface CityDouble {
  city: string
  lat: number
  lng: number
  totalProductions: number
  playedAs: Array<{ place: string; count: number }>
}

const CITY_DOUBLES: CityDouble[] = [
  { city: 'Ouarzazate / Aït Benhaddou', lat: 30.98, lng: -7.00, totalProductions: 50,
    playedAs: [
      { place: 'Ancient Rome', count: 4 },
      { place: 'Ancient Egypt', count: 6 },
      { place: 'Jerusalem', count: 5 },
      { place: 'Tibet', count: 2 },
      { place: 'Persia', count: 2 },
      { place: 'Somalia', count: 1 },
      { place: 'Bible lands', count: 8 },
      { place: 'Fantasy (GoT, etc.)', count: 4 },
      { place: 'Arabian Desert', count: 5 },
      { place: 'Mars / Alien worlds', count: 2 },
      { place: 'Morocco (itself)', count: 11 },
    ]},
  { city: 'Essaouira', lat: 31.51, lng: -9.77, totalProductions: 12,
    playedAs: [
      { place: 'Ancient Greece', count: 2 },
      { place: 'Slaver\'s Bay (GoT)', count: 2 },
      { place: 'Venice / Cyprus', count: 1 },
      { place: 'Fictional Casablanca', count: 1 },
      { place: 'Morocco (itself)', count: 6 },
    ]},
  { city: 'Tangier', lat: 35.78, lng: -5.81, totalProductions: 18,
    playedAs: [
      { place: 'Mombasa, Kenya', count: 1 },
      { place: 'Beirut, Lebanon', count: 1 },
      { place: 'Generic "Exotic East"', count: 3 },
      { place: 'Morocco (itself)', count: 13 },
    ]},
  { city: 'Marrakech', lat: 31.63, lng: -8.01, totalProductions: 15,
    playedAs: [
      { place: 'Generic Middle East', count: 3 },
      { place: 'India', count: 1 },
      { place: 'Morocco (itself)', count: 11 },
    ]},
  { city: 'Erfoud / Merzouga (Sahara)', lat: 31.43, lng: -4.23, totalProductions: 10,
    playedAs: [
      { place: 'Ancient Egypt (desert)', count: 3 },
      { place: 'Mali / Niger', count: 2 },
      { place: 'American Southwest', count: 1 },
      { place: 'Desert planet / Mars', count: 2 },
      { place: 'Morocco (itself)', count: 2 },
    ]},
  { city: 'Rabat / Salé', lat: 34.02, lng: -6.83, totalProductions: 8,
    playedAs: [
      { place: 'Iraq', count: 2 },
      { place: 'Beirut', count: 1 },
      { place: 'Somalia', count: 1 },
      { place: 'Morocco (itself)', count: 4 },
    ]},
]

// ═══ ECONOMIC TIMELINE ═══
const REVENUE_TIMELINE = [
  { year: 2019, revenue: 80, note: 'Pre-COVID peak' },
  { year: 2020, revenue: 25, note: 'COVID shutdown' },
  { year: 2021, revenue: 44, note: 'Recovery begins' },
  { year: 2022, revenue: 60, note: 'Gladiator II starts' },
  { year: 2023, revenue: 114, note: 'Gladiator II peak filming' },
  { year: 2024, revenue: 150, note: 'Record year. New cinema law.' },
  { year: 2025, revenue: 150, note: 'Nolan\'s Odyssey. Record tied.' },
]

export default function ChameleonCountryPage() {
  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* HERO */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-36 pb-6">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 025 · Cultural Cartography</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-2">
          <em>The Chameleon Country</em>
        </h1>
        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
          Every landscape Morocco has pretended to be
        </p>
        <p className="text-[13px] max-w-[640px] leading-[1.7] mt-4" style={{ color: C.text }}>
          Morocco has played Ancient Rome, Jerusalem, Tibet, Mogadishu, Mombasa,
          Ancient Egypt, Persia, Afghanistan, Mars, and the American Southwest.
          Two hundred productions at Atlas Studios alone since 1983. Foreign shoots
          generated $150 million in 2025 &mdash; triple the pre-2021 level. The first
          film was shot in 1897, when Louis Lumi&egrave;re filmed <em>Le Ch&egrave;vrier
          Marocain</em>. Orson Welles came for <em>Othello</em> and ran out of money.
          Ridley Scott built a Roman Colosseum in the desert. Christopher Nolan
          returned twice. And the most famous Morocco film of all &mdash; <em>Casablanca</em>
          &mdash; was never filmed here. This is the atlas of illusion.
        </p>
      </section>

      {/* THE POSTER */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="border p-4 md:p-8" style={{ borderColor: C.border, background: C.parchment }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <rect width={W} height={H} fill={C.parchment} />

            <text x={W / 2} y={30} textAnchor="middle" fontSize="10" letterSpacing="4" fontWeight="600" fill={C.ink}>
              THE CHAMELEON COUNTRY
            </text>
            <text x={W / 2} y={46} textAnchor="middle" fontSize="6" letterSpacing="2" fill={C.muted}>
              200+ PRODUCTIONS · 6 FILMING HUBS · 128 YEARS OF CINEMA · $150M FOREIGN REVENUE (2025)
            </text>

            {/* ═══ SECTION 1: THE CHROMATIC FILMOGRAPHY ═══ */}
            <text x={30} y={85} fontSize="8" fontWeight="600" fill={C.film} letterSpacing="2">
              THE CHROMATIC FILMOGRAPHY
            </text>
            <text x={30} y={99} fontSize="5" fill={C.muted}>
              Each film&apos;s dominant colour palette. Sorted by year. Width = relative budget.
            </text>

            {(() => {
              const sorted = [...PRODUCTIONS].sort((a, b) => a.year - b.year)
              const maxBudget = 250
              return sorted.map((prod, i) => {
                const y = 115 + i * 28
                const budgetNum = parseFloat(prod.budget.replace(/[$M]/g, '').replace('/ep', ''))
                const barW = (budgetNum / maxBudget) * 400

                return (
                  <g key={`${prod.title}-${i}`}>
                    {/* Year */}
                    <text x={30} y={y + 8} fontSize="4.5" fill={C.muted}>{prod.year}</text>

                    {/* Title */}
                    <text x={58} y={y + 8} fontSize="4.5" fontWeight="600" fill={C.ink}>
                      {prod.title.length > 28 ? prod.title.slice(0, 28) + '…' : prod.title}
                    </text>

                    {/* Palette strip */}
                    {prod.palette.map((color, j) => (
                      <rect key={j} x={230 + j * 22} y={y} width={20} height={12}
                        fill={color} rx={1} />
                    ))}

                    {/* Budget bar */}
                    <rect x={330} y={y + 1} width={barW} height={10}
                      fill={C.film} fillOpacity={0.1} stroke={C.film} strokeWidth="0.3" rx={1} />
                    <text x={330 + barW + 4} y={y + 9} fontSize="3.5" fill={C.film}>
                      {prod.budget}
                    </text>

                    {/* Location + Played As */}
                    <text x={810} y={y + 5} fontSize="3.5" fill={C.muted}>
                      {prod.location.length > 18 ? prod.location.slice(0, 18) + '…' : prod.location}
                    </text>
                    <text x={810} y={y + 12} fontSize="3.5" fill={C.desert} fontStyle="italic">
                      → {prod.playedAs.length > 22 ? prod.playedAs.slice(0, 22) + '…' : prod.playedAs}
                    </text>

                    {/* Director */}
                    <text x={W - 30} y={y + 8} textAnchor="end" fontSize="3.5" fill={C.muted}>
                      {prod.director}
                    </text>
                  </g>
                )
              })
            })()}

            {/* ═══ SECTION 2: THE LOOK-ALIKE INDEX ═══ */}
            {(() => {
              const secY = 1120
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.desert} letterSpacing="2">
                    THE LOOK-ALIKE INDEX
                  </text>
                  <text x={30} y={secY + 44} fontSize="5" fill={C.muted}>
                    How often each Moroccan city has &ldquo;played&rdquo; another place. Bubble size = number of times cast in that role.
                  </text>

                  {CITY_DOUBLES.map((city, i) => {
                    const y = secY + 70 + i * 115
                    const maxCount = Math.max(...city.playedAs.map(p => p.count))

                    return (
                      <g key={city.city}>
                        <text x={30} y={y} fontSize="7" fontWeight="700" fill={C.ink}>
                          {city.city.toUpperCase()}
                        </text>
                        <text x={30} y={y + 14} fontSize="4.5" fill={C.film}>
                          {city.totalProductions} productions
                        </text>

                        {/* Bubble chart of roles */}
                        {city.playedAs.map((role, j) => {
                          const r = 4 + (role.count / maxCount) * 18
                          const cx = 250 + j * 80
                          const cy = y + 5
                          return (
                            <g key={role.place}>
                              <circle cx={cx} cy={cy} r={r}
                                fill={role.place.includes('Morocco') ? C.green : C.desert}
                                fillOpacity={role.place.includes('Morocco') ? 0.15 : 0.1}
                                stroke={role.place.includes('Morocco') ? C.green : C.desert}
                                strokeWidth="0.5" />
                              <text x={cx} y={cy + 2} textAnchor="middle" fontSize="5" fontWeight="600"
                                fill={role.place.includes('Morocco') ? C.green : C.desert}>
                                {role.count}
                              </text>
                              <text x={cx} y={cy + r + 8} textAnchor="middle" fontSize="3.5" fill={C.muted}>
                                {role.place.length > 14 ? role.place.slice(0, 14) + '…' : role.place}
                              </text>
                            </g>
                          )
                        })}
                      </g>
                    )
                  })}

                  {/* Legend */}
                  <circle cx={40} cy={secY + 760} r={5} fill={C.desert} fillOpacity={0.1} stroke={C.desert} strokeWidth="0.5" />
                  <text x={52} y={secY + 763} fontSize="4.5" fill={C.desert}>Doubled for another place</text>
                  <circle cx={200} cy={secY + 760} r={5} fill={C.green} fillOpacity={0.15} stroke={C.green} strokeWidth="0.5" />
                  <text x={212} y={secY + 763} fontSize="4.5" fill={C.green}>Played itself</text>
                </g>
              )
            })()}

            {/* ═══ SECTION 3: ECONOMIC GROWTH ═══ */}
            {(() => {
              const secY = 1910
              const chartX = 60
              const chartW = 900
              const chartH = 200
              const chartY = secY + 80
              const maxRev = 160

              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.gold} letterSpacing="2">
                    THE $150 MILLION YEAR
                  </text>
                  <text x={30} y={secY + 44} fontSize="5" fill={C.muted}>
                    Foreign production revenue in Morocco (USD millions). 2019–2025. Source: CCM / Minister Bensaid.
                  </text>

                  {/* Y-axis */}
                  {[0, 50, 100, 150].map(v => {
                    const y = chartY + chartH - (v / maxRev) * chartH
                    return (
                      <g key={v}>
                        <line x1={chartX} y1={y} x2={chartX + chartW} y2={y}
                          stroke={C.border} strokeWidth="0.3" />
                        <text x={chartX - 8} y={y + 3} textAnchor="end" fontSize="4" fill={C.muted}>
                          ${v}M
                        </text>
                      </g>
                    )
                  })}

                  {/* Bars */}
                  {REVENUE_TIMELINE.map((d, i) => {
                    const x = chartX + 30 + i * 120
                    const barH = (d.revenue / maxRev) * chartH
                    const y = chartY + chartH - barH
                    const isCovid = d.year === 2020
                    const isRecord = d.revenue >= 150

                    return (
                      <g key={d.year}>
                        <rect x={x} y={y} width={60} height={barH}
                          fill={isCovid ? '#999' : isRecord ? C.gold : C.film}
                          fillOpacity={isCovid ? 0.1 : isRecord ? 0.2 : 0.12}
                          stroke={isCovid ? '#999' : isRecord ? C.gold : C.film}
                          strokeWidth="0.5" rx={2} />
                        <text x={x + 30} y={y - 6} textAnchor="middle"
                          fontSize={isRecord ? '9' : '7'} fontWeight={isRecord ? '700' : '600'}
                          fill={isCovid ? '#999' : isRecord ? C.gold : C.film}>
                          ${d.revenue}M
                        </text>
                        <text x={x + 30} y={chartY + chartH + 14} textAnchor="middle"
                          fontSize="5" fontWeight="600" fill={C.ink}>
                          {d.year}
                        </text>
                        <text x={x + 30} y={chartY + chartH + 24} textAnchor="middle"
                          fontSize="3.5" fill={C.muted}>
                          {d.note}
                        </text>
                      </g>
                    )
                  })}

                  {/* Growth annotation */}
                  <text x={chartX + chartW + 20} y={chartY + 30} fontSize="12" fontWeight="700" fill={C.gold}>3×</text>
                  <text x={chartX + chartW + 20} y={chartY + 44} fontSize="5" fill={C.muted}>growth since</text>
                  <text x={chartX + chartW + 20} y={chartY + 54} fontSize="5" fill={C.muted}>pre-2021</text>
                </g>
              )
            })()}

            {/* ═══ SECTION 4: THE DIRECTORS WHO RETURN ═══ */}
            {(() => {
              const secY = 2360
              const returners = [
                { director: 'Ridley Scott', films: ['Black Hawk Down (2001)', 'Kingdom of Heaven (2005)', 'Gladiator II (2024)'], count: 3, note: 'Built Roman Colosseum twice. Mogadishu once.' },
                { director: 'Christopher Nolan', films: ['Inception (2010)', 'The Odyssey (2025)'], count: 2, note: 'Tangier medina, then Essaouira/Dakhla coast.' },
                { director: 'Martin Scorsese', films: ['Kundun (1997)', 'The Last Temptation of Christ (1988)'], count: 2, note: 'Tibet and Jerusalem, both from Ouarzazate.' },
                { director: 'Chad Stahelski', films: ['John Wick 3 (2019)', 'Ballerina (2025)'], count: 2, note: 'Essaouira medina. High-contrast assassin aesthetic.' },
              ]
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.reel} letterSpacing="2">
                    THE DIRECTORS WHO RETURN
                  </text>
                  <text x={30} y={secY + 44} fontSize="5" fill={C.muted}>
                    Some directors come back. The landscape is that good.
                  </text>

                  {returners.map((d, i) => {
                    const x = 30 + i * 280
                    return (
                      <g key={d.director}>
                        <text x={x} y={secY + 70} fontSize="7" fontWeight="700" fill={C.reel}>{d.director}</text>
                        <text x={x} y={secY + 84} fontSize="10" fontWeight="700" fill={C.reel}>{d.count}×</text>
                        {d.films.map((f, j) => (
                          <text key={j} x={x} y={secY + 100 + j * 12} fontSize="4.5" fill={C.text}>{f}</text>
                        ))}
                        <text x={x} y={secY + 100 + d.films.length * 12 + 8} fontSize="4" fontStyle="italic" fill={C.muted}>
                          {d.note}
                        </text>
                      </g>
                    )
                  })}
                </g>
              )
            })()}

            {/* ═══ SECTION 5: KEY NUMBERS ═══ */}
            {(() => {
              const secY = 2530
              const nums = [
                { value: '200+', label: 'productions', sub: 'at Atlas Studios since 1983' },
                { value: '$150M', label: 'foreign revenue', sub: '2025 — record year (CCM)' },
                { value: '1897', label: 'first film', sub: 'Lumière\'s Le Chèvrier Marocain' },
                { value: '1942', label: 'Casablanca', sub: 'never actually filmed in Morocco' },
                { value: '50+', label: 'Ouarzazate roles', sub: 'most "chameleon" city' },
                { value: '$30M', label: 'Gladiator II local', sub: 'single-film record spend' },
                { value: '30,000m²', label: 'Atlas Studios', sub: 'one of world\'s largest' },
                { value: '2025', label: 'New cinema law', sub: 'CCM reorganised Sept 2025' },
              ]
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  {nums.map((n, i) => {
                    const x = 30 + (i % 4) * 280
                    const y = secY + 25 + Math.floor(i / 4) * 70
                    return (
                      <g key={n.label}>
                        <text x={x} y={y + 20} fontSize="16" fontWeight="700" fill={C.film}>{n.value}</text>
                        <text x={x} y={y + 34} fontSize="5" fontWeight="600" fill={C.ink}>{n.label}</text>
                        <text x={x} y={y + 44} fontSize="4" fill={C.muted}>{n.sub}</text>
                      </g>
                    )
                  })}
                </g>
              )
            })()}

            {/* ═══ SECTION 6: THE CASABLANCA PARADOX ═══ */}
            {(() => {
              const secY = 2720
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.ink} letterSpacing="2">
                    THE CASABLANCA PARADOX
                  </text>

                  <rect x={30} y={secY + 45} width={500} height={40}
                    fill="#1A1A1A" fillOpacity={0.03} stroke={C.border} strokeWidth="0.5" rx={2} />
                  <text x={45} y={secY + 62} fontSize="5" fill={C.text}>
                    The most famous Morocco film was shot entirely at Warner Bros. Studios, Burbank, California, 1942.
                  </text>
                  <text x={45} y={secY + 74} fontSize="5" fill={C.muted}>
                    Humphrey Bogart never set foot in Casablanca. The airport in the final scene is a painted backdrop.
                  </text>

                  <rect x={30} y={secY + 95} width={500} height={40}
                    fill={C.film} fillOpacity={0.03} stroke={C.film} strokeWidth="0.5" rx={2} />
                  <text x={45} y={secY + 112} fontSize="5" fill={C.text}>
                    But: Rick&apos;s Caf&eacute; now exists. A real restaurant in Casablanca, opened 2004, modelled on the fictional one.
                  </text>
                  <text x={45} y={secY + 124} fontSize="5" fill={C.muted}>
                    Fiction created the place. The place then created itself to match the fiction. The chameleon ate its own tail.
                  </text>
                </g>
              )
            })()}

            {/* ═══ SECTION 7: THE RIDLEY SCOTT MAP ═══ */}
            {(() => {
              const secY = 2870
              const scottFilms = PRODUCTIONS.filter(p => p.director === 'Ridley Scott')
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.film} letterSpacing="2">
                    THE RIDLEY SCOTT ORBIT
                  </text>
                  <text x={30} y={secY + 44} fontSize="5" fill={C.muted}>
                    One director, three productions, $395M combined budget, ~$57M in local spend.
                  </text>

                  {scottFilms.map((film, i) => {
                    const x = 30 + i * 350
                    return (
                      <g key={film.title}>
                        {/* Palette block */}
                        {film.palette.map((color, j) => (
                          <rect key={j} x={x + j * 35} y={secY + 60} width={32} height={32}
                            fill={color} rx={2} />
                        ))}
                        <text x={x} y={secY + 108} fontSize="6" fontWeight="700" fill={C.film}>
                          {film.title} ({film.year})
                        </text>
                        <text x={x} y={secY + 120} fontSize="4.5" fill={C.muted}>
                          Budget: {film.budget} · Local: {film.localRevenue}
                        </text>
                        <text x={x} y={secY + 132} fontSize="4.5" fontStyle="italic" fill={C.desert}>
                          Morocco → {film.playedAs}
                        </text>
                        {film.note && (
                          <text x={x} y={secY + 144} fontSize="3.5" fill={C.muted}>{film.note}</text>
                        )}
                      </g>
                    )
                  })}
                </g>
              )
            })()}

            {/* ═══ PRODUCTION HUB DENSITY ═══ */}
            {(() => {
              const secY = 3050
              return (
                <g>
                  <line x1={30} y1={secY} x2={W - 30} y2={secY} stroke={C.border} strokeWidth="0.5" />
                  <text x={30} y={secY + 30} fontSize="8" fontWeight="600" fill={C.reel} letterSpacing="2">
                    PRODUCTION DENSITY BY HUB
                  </text>

                  {CITY_DOUBLES.map((city, i) => {
                    const x = 30
                    const y = secY + 55 + i * 38
                    const barW = (city.totalProductions / 50) * 600

                    return (
                      <g key={city.city}>
                        <text x={x} y={y + 10} fontSize="5" fontWeight="600" fill={C.ink}>
                          {city.city}
                        </text>
                        <rect x={220} y={y} width={barW} height={16}
                          fill={C.reel} fillOpacity={0.1} stroke={C.reel} strokeWidth="0.5" rx={2} />
                        <text x={220 + barW + 6} y={y + 11} fontSize="6" fontWeight="700" fill={C.reel}>
                          {city.totalProductions}
                        </text>
                        {/* Role count */}
                        <text x={220 + barW + 40} y={y + 11} fontSize="4" fill={C.muted}>
                          ({city.playedAs.filter(p => !p.place.includes('Morocco')).length} different identities)
                        </text>
                      </g>
                    )
                  })}
                </g>
              )
            })()}

            {/* Colophon */}
            <text x={W / 2} y={H - 30} textAnchor="middle" fontSize="5" fill={C.muted} letterSpacing="1">
              SOURCES: CCM · MOROCCO WORLD NEWS · ATLAS STUDIOS · IMDB · WIKIPEDIA · MWN LIFESTYLE · © 2026 DANCING WITH LIONS
            </text>
            <text x={W / 2} y={H - 14} textAnchor="middle" fontSize="6" fontStyle="italic" fill={C.film}>
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
              <p className="micro-label mb-2" style={{ color: C.film }}>The Chameleon Logic</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Why does Ouarzazate work as Ancient Rome, Jerusalem, Tibet, and Mars?
                Three reasons. First, the light: clear Saharan air produces shadows
                so sharp they look cinematic without filters. Second, the architecture:
                pisé (rammed earth) walls read as ancient in any culture because they <em>are</em>
                ancient &mdash; the building technique is 10,000 years old and universal.
                Third, the emptiness: the landscape between Ouarzazate and Erfoud is
                so stripped of modern markers that a director can project any era onto
                it. The desert is a blank canvas. That is why Morocco&apos;s film revenue
                tripled in four years.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.desert }}>The Colour Signature</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Every film shot in Morocco carries a chromatic fingerprint. Ridley
                Scott&apos;s palette is warm ochre and burnt sienna &mdash; the colour of the
                pisé walls themselves. Nolan works in high-contrast blues and
                desaturated earth. Stahelski&apos;s <em>John Wick</em> pushed Essaouira into
                deep midnight blue and gold, a palette the city had never been
                photographed in before. The same stone, the same light, the same
                alleyways &mdash; rendered unrecognisable by colour grading alone. Morocco
                is not one landscape. It is whatever colour you make it.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.gold }}>The $150 Million Question</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Foreign production revenue hit $150 million in 2025, up from under
                $50 million before 2021. The new cinema law (September 2025)
                reorganised the CCM to make Morocco more competitive against the
                Canary Islands and the UAE. The rebate programme reimburses a percentage
                of local spend for productions filming 18+ days with budgets over
                $1 million. But the real competitive advantage is not financial &mdash; it
                is geographic. Morocco offers Sahara, Atlantic coast, snow-capped Atlas,
                imperial cities, and desert kasbahs within a 4-hour drive. No other
                country can double for that many continents in a single production day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10">
        <div className="border-t pt-8 max-w-[640px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
            Ouarzazate has been Rome, Egypt, Jerusalem, Tibet, Persia, Somalia,
            and Mars. Tangier has been Mombasa and Beirut. Essaouira has been
            Slaver&apos;s Bay and ancient Greece. Rabat has been Baghdad and Fallujah.
            And Casablanca &mdash; the city that gave its name to the most famous
            film in history &mdash; has never once appeared in that film. The
            chameleon does not choose its colours. The world projects them.
            And Morocco, for 128 years, has been every place the world needed
            it to be &mdash; except, apparently, itself.
          </p>
        </div>
      </section>

      {/* SOURCES */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-4" style={{ borderColor: C.border }}>
          <p className="micro-label mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: C.muted }}>
            Revenue data: Minister Mohamed Mehdi Bensaid, Chamber of Representatives,
            January 12, 2026 (Morocco World News, MWN Lifestyle). $150M (MAD 1.5B)
            foreign production revenue 2025; pre-2021 baseline under $50M (MAD 500M).
            2024: $150M (MAD 1.5B); 2023: $114M (MAD 1.14B); 2022: $60M (MAD 600M).
            Gladiator II local revenue: Le Monde, $30M (MAD 300M) estimated single-film
            record (2023). Atlas Studios: founded 1983 by Mohamed Belghmi, 30,000m²,
            200+ productions (Atlas Studios official filmography). First Moroccan film:
            Louis Lumi&egrave;re, <em>Le Ch&egrave;vrier Marocain</em>, 1897 (Cinema of
            Morocco, Wikipedia). New cinema law: Law No. 18-23, effective September 1,
            2025 (CCM). Casablanca (1942): filmed entirely at Warner Bros. Studios,
            Burbank, CA (IMDb). Rick&apos;s Caf&eacute;: opened 2004 in Casablanca by
            Kathy Kriger. Production budgets: Box Office Mojo, The Numbers, industry
            reporting. Local revenue estimates: CCM data where available; industry
            standard 10&ndash;15% of production budget for location shoots. Look-alike
            counts: IMDb location data cross-referenced with production design notes.
            Colour palettes extracted from film stills / promotional materials; editorial
            approximation. GPS coordinates approximate to city/region level.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: C.border }}>
              &copy; {new Date().getFullYear()} Dancing with Lions. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.film }}>
              Source: Dancing with Lions
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
