import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Data — Dancing with Lions',
  description: 'Structured intelligence about Morocco and the Maghreb. Real estate, demographics, tourism, language, textiles, and cultural data.',
}

const MODULES = [
  {
    id: 'maghreb-compared',
    category: 'Comparative Analysis',
    title: 'The Maghreb Compared',
    entries: '3 countries',
    status: 'Live',
    description: 'Morocco, Tunisia, and Algeria side by side. Population, GDP, tourism, investment, demographics, and development indicators in one structured overview.',
    fields: ['Population', 'GDP', 'Tourism', 'FDI', 'Unemployment', 'HDI', 'Internet', 'Languages'],
    href: '/data/maghreb-compared',
  },
  {
    id: 'morocco-population',
    category: 'Interactive Map',
    title: 'Morocco Population Density',
    entries: '12 regions',
    status: 'Live',
    description: 'Interactive Mapbox heatmap of Morocco\'s 12 administrative regions. Population, density, urbanization rate, and area — hover for detail.',
    fields: ['Population', 'Density', 'Area', 'Urban %', 'Capital', 'Arabic Name'],
    href: '/data/morocco-population',
  },
  {
    id: 'morocco-agriculture',
    category: 'Illustrated Data',
    title: 'What Morocco Grows & Sends to the World',
    entries: '8 exports',
    status: 'Live',
    description: 'Illustrated agricultural and seafood export chart. Tomatoes, berries, citrus, olives, argan oil, avocados, green beans, sardines — ranked by value with hand-drawn SVG illustrations.',
    fields: ['Tomatoes', 'Berries', 'Citrus', 'Olives', 'Argan', 'Seafood', 'Avocados', 'Green Beans'],
    href: '/data/morocco-agriculture',
  },
  {
    id: 'morocco-economy',
    category: 'Economic Intelligence',
    title: 'Morocco Economy in One Page',
    entries: '8 indicators',
    status: 'Live',
    description: 'GDP, exports, FDI, tourism, remittances, key sectors. The essential economic snapshot every journalist grabs. Updated annually with IMF, World Bank, and Office des Changes data.',
    fields: ['GDP', 'Exports', 'FDI Sources', 'Tourism Revenue', 'Remittances', 'Sector Breakdown'],
    href: '/data/morocco-economy',
  },
  {
    id: 'al-andalus',
    category: 'Cultural Geography',
    title: 'The Al-Andalus Corridor',
    entries: '30+ points',
    status: 'Live',
    description: 'One continuous cultural bridge from Seville to Fes. Architecture, music, food, language — four layers of shared DNA across 800 years. Interactive Mapbox map with toggle layers.',
    fields: ['Architecture', 'Music', 'Food', 'Language', 'Trade Routes', 'Loanwords'],
    href: '/data/al-andalus',
  },
  {
    id: 'ramadan-moon',
    category: 'Cultural Intelligence',
    title: 'Ramadan & the Moon',
    entries: '30 nights + 33-year cycle',
    status: 'Live',
    description: 'How the lunar calendar shapes Ramadan. 30 moon phases from crescent to crescent, the 33-year seasonal rotation, and fasting hours across decades — visualized for Marrakech.',
    fields: ['Moon Phases', 'Seasonal Drift', 'Fasting Hours', 'Laylat al-Qadr', 'Temperature'],
    href: '/data/ramadan-moon',
  },
  {
    id: 'tourism-flow',
    category: 'Tourism Intelligence',
    title: 'Where 17.4 Million Tourists Go',
    entries: '10 source markets',
    status: 'Live',
    description: 'Follow the flow. Source countries → gateway airports → destination cities → spending categories. Morocco became Africa\'s most-visited nation in 2024, surpassing Egypt. 112 billion MAD in revenue.',
    fields: ['Source Countries', 'Gateways', 'Destinations', 'Revenue', 'Overnight Stays', 'Growth'],
    href: '/data/tourism-flow',
  },
  {
    id: 'seasonal-produce',
    category: 'Food Intelligence',
    title: 'What Grows When',
    entries: '32 crops',
    status: 'Live',
    description: 'Seasonal calendar of Moroccan fruits and vegetables. Radial wheel + illustrated month-by-month guide with Darija names, growing regions, and peak seasons.',
    fields: ['Fruits', 'Vegetables', 'Darija Names', 'Growing Regions', 'Peak Seasons', 'Categories'],
    href: '/data/seasonal-produce',
  },
  {
    id: 'morocco-3d-population',
    category: 'Demographics',
    title: '37.8 Million People',
    entries: '240+ grid cells',
    status: 'Live',
    description: 'Morocco population density as a 3D isometric bar map. Each grid cell extruded by people per square kilometre. Drag to rotate. The Atlantic corridor vs. the empty south.',
    fields: ['Population Density', 'Grid Cells', 'City Labels', 'Density Scale', '2024 Census'],
    href: '/data/morocco-3d-population',
  },
  {
    id: 'world-cup-2030',
    category: 'Infrastructure Intelligence',
    title: '2030 World Cup Infrastructure Map',
    entries: '20 stadiums + 12 infrastructure projects',
    status: 'Live',
    description: 'Every stadium, highway, rail line, airport, and hotel project across Morocco, Spain, and Portugal. Construction status, budgets, timelines. Updated quarterly.',
    fields: ['Stadiums', 'Capacity', 'Construction Status', 'Budgets', 'Rail', 'Highways', 'Airports', 'Hotels'],
    href: '/data/world-cup-2030',
  },
  {
    id: '14km-gap',
    category: 'Comparative Intelligence',
    title: 'The 14km Gap',
    entries: '18 metrics compared',
    status: 'Live',
    description: 'Morocco and Spain separated by 14 kilometres of water. GDP, life expectancy, tourism, infrastructure, education — the gap between the two World Cup co-hosts, visualized as tension threads.',
    fields: ['GDP', 'Demographics', 'Healthcare', 'Education', 'Tourism', 'Infrastructure', 'Employment'],
    href: '/data/14km-gap',
  },
  {
    id: 'wind-and-sun',
    category: 'Energy Intelligence',
    title: 'Wind & Sun',
    entries: '14 installations mapped',
    status: 'Live',
    description: 'Morocco\'s renewable energy installations mapped as radial blooms. Solar, wind, and hydro — each shape tells you when and where the energy flows. 52% renewable target by 2030.',
    fields: ['Solar MW', 'Wind MW', 'Hydro MW', 'Monthly Output', 'Capacity Factor', 'Seasonal Complementarity'],
    href: '/data/wind-and-sun',
  },
  {
    id: 'the-build',
    category: 'Infrastructure + Economic Timeline',
    title: 'The Build',
    entries: '27 years × 9 metrics',
    status: 'Live',
    description: 'Morocco\'s transformation from 2004 to 2030 — infrastructure AND economy. GDP tripling, FDI surging, 10,000 MW renewable energy, urbanisation in real time. Plus highways, railways, airports, hotels, tourism. Animated year by year with tabbed panels.',
    fields: ['Highway km', 'Railway km', 'Airport Capacity', 'Hotel Rooms', 'Tourist Arrivals', 'GDP $B', 'FDI $B', 'Renewable MW', 'Urbanization %'],
    href: '/data/the-build',
  },
  {
    id: 'medina-atlas',
    category: 'Cartographic Atlas',
    title: 'The Medina Atlas',
    entries: '100+ mapped features',
    status: 'Live',
    description: 'A dense SVG poster-map of Marrakech\'s medina. Every souk, mosque, fountain, hammam, gate, and craft zone plotted on a single plate. 19 gates, 18 souks, 8 mosques, 7 fountains, 16 quarters. Founded 1070 CE. Print it.',
    fields: ['Gates', 'Souks', 'Mosques', 'Fountains', 'Hammams', 'Palaces', 'Quarters', 'Craft Zones'],
    href: '/data/medina-atlas',
  },
  {
    id: 'calendar-of-light',
    category: 'Astronomical Chart',
    title: 'The Calendar of Light',
    entries: '6 cities × 12 months',
    status: 'Live',
    description: 'A radial astronomical illustration — sunrise, sunset, and daylight hours across twelve months for Morocco\'s six World Cup host cities. Each city gets a ring. Tangier swings nearly 5 hours between solstices. Agadir barely moves. The shape is the latitude.',
    fields: ['Daylight Hours', 'Sunrise', 'Sunset', 'Latitude', 'Seasonal Swing'],
    href: '/data/calendar-of-light',
  },
  {
    id: 'alphabet-of-craft',
    category: 'Illustrated Taxonomy',
    title: 'The Moroccan Alphabet of Craft',
    entries: '60 crafts × 10 categories',
    status: 'Live',
    description: 'Every major craft tradition in Morocco — zellige to rammed earth — arranged as specimens on a single illustrated plate. Each entry: name, region, technique, materials. Tile, textile, leather, metal, wood, pottery, stone, fibre, body, architecture. Print it at A1.',
    fields: ['Name', 'Category', 'Region', 'Technique', 'Materials', 'Period'],
    href: '/data/alphabet-of-craft',
  },
  {
    id: 'dynasty-timeline',
    category: 'Historical Timeline',
    title: 'The Dynasty Timeline',
    entries: '7 dynasties × 1,237 years',
    status: 'Live',
    description: 'Every ruling dynasty from the Idrisids (789 AD) to the Alaouites (present) on a single horizontal timeline. Architectural illustrations for each era. Capitals tracked. Berber vs. Arab Sharifian origins mapped. 1,200 years of history in one composition.',
    fields: ['Dynasty', 'Dates', 'Capital', 'Origin', 'Key Ruler', 'Monument', 'Legacy'],
    href: '/data/dynasty-timeline',
  },
  {
    id: 'languages-of-morocco',
    category: 'Linguistic Cartography',
    title: 'Languages of Morocco',
    entries: '12 regions × 9 languages × 5 census years',
    status: 'Live',
    description: 'Who speaks what where — choropleth map of Amazigh mother-tongue by region, three Amazigh language zones mapped, plus French, Spanish, Hassaniya overlays. Timeline of Amazigh decline from 43% (1912) to 24.8% (2024). The data existed in census records. Nobody had made it visual.',
    fields: ['Region', 'Amazigh %', 'Primary Variety', 'Darija %', 'Population', 'Urbanization'],
    href: '/data/languages-of-morocco',
  },
  {
    id: 'moroccan-calendar',
    category: 'Temporal Cartography',
    title: 'The Moroccan Calendar',
    entries: '4 calendars × 12 months × 30+ events',
    status: 'Live',
    description: 'Four overlapping time systems on a single radial year-wheel. Gregorian for business, Islamic lunar for religion, Amazigh agricultural for seasons, French school calendar for family life. When they align (Ramadan + harvest + exams) = chaos. Nobody has ever visualised this.',
    fields: ['Calendar System', 'Month', 'Event', 'Fixed/Shifting', 'What It Governs'],
    href: '/data/moroccan-calendar',
  },
  {
    id: 'spice-routes',
    category: 'Supply Chain Cartography',
    title: 'The Spice Routes',
    entries: '14 spices × 5 supply chain stages × 3 price points',
    status: 'Live',
    description: 'Origin → Hub → Souk → Dish → Export. Fourteen spices flowing through Morocco as coloured rivers. Price escalation from field ($4/kg cumin in Alnif) to Paris jar ($25/kg). Ras el hanout deconstructed into 17 components. 60,000 tons visualised.',
    fields: ['Spice', 'Origin', 'Volume', 'Price (Origin/Souk/Paris)', 'Season', 'Dishes'],
    href: '/data/spice-routes',
  },
  {
    id: 'medina-data',
    category: 'Urban Anatomy',
    title: 'The Medina as Data',
    entries: '18 feature types × 6 concentric zones × 20 souks × 17 gates',
    status: 'Live',
    description: 'Marrakech\'s medina as a data organism. Concentric rings from Friday mosque outward showing how Islamic urbanism organizes a city: sacred → commercial → residential → industrial → defensive. 186 mosques, 97 foundouks, 82 fountains, 25 hammams, 19 gates, 400 derbs — all counted and diagrammed.',
    fields: ['Feature', 'Category', 'Count', 'Ring', 'Function', 'Note'],
    href: '/data/medina-data',
  },
  {
    id: 'darija',
    category: 'Language',
    title: 'Darija Structured Lexicon',
    entries: '8,640+',
    status: 'Live',
    description: 'The most comprehensive structured Moroccan Arabic dataset. Each entry: Arabic root, Amazigh substrate, French overlay, regional variations, cultural context, pronunciation.',
    fields: ['Word', 'Translation', 'Arabic Root', 'Category', 'Cultural Context', 'Regional Variant', 'Example Sentence'],
  },
  {
    id: 'textiles',
    category: 'Ethnographic Archive',
    title: 'North & West African Textiles',
    entries: '88+',
    status: 'Live',
    description: 'Source-documented textile traditions. Each story includes technique, region, motif lineage, spiritual significance, and practitioner documentation.',
    fields: ['Tradition', 'Region', 'Technique', 'Materials', 'Motif Lineage', 'Source Type', 'Practitioner'],
  },
  {
    id: 'cultural',
    category: 'Cultural Documentation',
    title: 'Morocco Cultural Index',
    entries: '97+',
    status: 'Live',
    description: 'Deep cultural documentation — architecture, music, food systems, craft traditions, seasonal practices. Each entry with academic citations and first-person verification.',
    fields: ['Topic', 'Region', 'Category', 'Sources', 'Date Verified', 'Related Entries'],
  },
  {
    id: 'real-estate',
    category: 'Market Intelligence',
    title: 'Moroccan Property Investment Tracker',
    entries: '—',
    status: 'Coming Q2 2026',
    description: 'Foreign direct investment flows, pricing trends by city, regulatory framework mapping, developer activity, and market condition indicators.',
    fields: ['City', 'Property Type', 'Price/m²', 'YoY Change', 'Foreign Investment %', 'Regulatory Status'],
  },
  {
    id: 'demographics',
    category: 'Population Data',
    title: 'Maghreb Demographics',
    entries: '—',
    status: 'Coming Q2 2026',
    description: 'Population distribution, urbanization rates, youth demographics, migration patterns, and diaspora mapping across Morocco, Tunisia, and Algeria.',
    fields: ['Region', 'Population', 'Urban %', 'Median Age', 'Growth Rate', 'Diaspora Size'],
  },
  {
    id: 'tourism',
    category: 'Tourism Intelligence',
    title: 'Visitor Flow Analysis',
    entries: '—',
    status: 'Coming Q3 2026',
    description: 'Arrival data, seasonal patterns, spending analysis by source market, accommodation trends, and destination-level intelligence.',
    fields: ['Source Market', 'Arrivals', 'Avg Stay', 'Spend/Day', 'Destination', 'Season'],
  },
]

export default function DataPage() {
  return (
    <div className="pt-16">
      <section className="max-w-wide mx-auto px-6 md:px-10 pt-section pb-16">
        <p className="micro-label mb-4">Data Modules</p>
        <h1 className="font-serif text-[clamp(3rem,8vw,5rem)] text-dwl-black leading-[0.95]">
          The <em>Intelligence</em>
        </h1>
        <p className="text-body text-dwl-body mt-6 max-w-[580px]">
          Structured, current, machine-readable data about Morocco and the Maghreb.
          Each module is built for analysts, researchers, AI systems, and decision-makers
          who need depth, not summaries.
        </p>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        {MODULES.map((mod, i) => (
          <div key={mod.id} className="border-b border-dwl-border py-10 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <span className="text-[11px] text-dwl-muted font-medium tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-meta uppercase tracking-[0.08em] text-dwl-gray mt-2">{mod.category}</p>
                <div className="mt-3">
                  <span className={`text-[11px] uppercase tracking-[0.08em] font-medium px-3 py-1 inline-block ${
                    mod.status === 'Live' ? 'bg-dwl-black text-white' : 'bg-dwl-light text-dwl-gray'
                  }`}>
                    {mod.status}
                  </span>
                </div>
              </div>
              <div className="md:col-span-9">
                <div className="flex items-baseline gap-4 mb-4">
                  {'href' in mod && mod.href ? (
                    <Link href={mod.href} className="font-serif text-[30px] md:text-[36px] text-dwl-black leading-[1.1] hover:opacity-60 transition-opacity">
                      {mod.title}
                    </Link>
                  ) : (
                    <h2 className="font-serif text-[30px] md:text-[36px] text-dwl-black leading-[1.1]">
                      {mod.title}
                    </h2>
                  )}
                  {mod.entries !== '—' && (
                    <span className="font-serif text-[30px] md:text-[36px] text-dwl-muted italic">
                      {mod.entries}
                    </span>
                  )}
                </div>
                <p className="text-[16px] text-dwl-gray leading-relaxed max-w-[580px] mb-6">
                  {mod.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {mod.fields.map((field) => (
                    <span key={field}
                      className="text-[11px] uppercase tracking-[0.06em] text-dwl-muted border border-dwl-border px-3 py-1">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-dwl-offwhite">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
          <div className="max-w-[640px]">
            <p className="micro-label mb-4">For Developers &amp; AI Systems</p>
            <p className="text-[15px] text-dwl-black leading-relaxed">
              Knowledge APIs are available at <code className="text-[14px] bg-dwl-light px-2 py-0.5">/api/knowledge/</code> for
              structured access. Machine-readable formats include JSON-LD, CSV exports, and Schema.org
              structured data. See <code className="text-[14px] bg-dwl-light px-2 py-0.5">/llms.txt</code> for AI discovery.
            </p>
            <p className="text-[14px] text-dwl-gray mt-4">
              All API outputs are licensed under CC BY-NC-ND 4.0. Attribution required.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
