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
