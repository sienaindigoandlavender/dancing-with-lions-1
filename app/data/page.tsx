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
    description: 'Morocco, Tunisia, and Algeria side by side. Population, GDP, tourism, investment, demographics, and development indicators in one structured overview.',
    fields: ['Population', 'GDP', 'Tourism', 'FDI', 'Unemployment', 'HDI', 'Internet', 'Languages'],
    href: '/data/maghreb-compared',
  },
  {
    id: 'morocco-population',
    category: 'Interactive Map',
    title: 'Morocco Population Density',
    description: 'Interactive Mapbox heatmap of Morocco\'s 12 administrative regions. Population, density, urbanization rate, and area — hover for detail.',
    fields: ['Population', 'Density', 'Area', 'Urban %', 'Capital', 'Arabic Name'],
    href: '/data/morocco-population',
  },
  {
    id: 'morocco-agriculture',
    category: 'Illustrated Data',
    title: 'What Morocco Grows & Sends to the World',
    description: 'Illustrated agricultural and seafood export chart. Tomatoes, berries, citrus, olives, argan oil, avocados, green beans, sardines — ranked by value with hand-drawn SVG illustrations.',
    fields: ['Tomatoes', 'Berries', 'Citrus', 'Olives', 'Argan', 'Seafood', 'Avocados', 'Green Beans'],
    href: '/data/morocco-agriculture',
  },
  {
    id: 'morocco-economy',
    category: 'Economic Intelligence',
    title: 'Morocco Economy in One Page',
    description: 'GDP, exports, FDI, tourism, remittances, key sectors. The essential economic snapshot every journalist grabs. Updated annually with IMF, World Bank, and Office des Changes data.',
    fields: ['GDP', 'Exports', 'FDI Sources', 'Tourism Revenue', 'Remittances', 'Sector Breakdown'],
    href: '/data/morocco-economy',
  },
  {
    id: 'al-andalus',
    category: 'Cultural Geography',
    title: 'The Al-Andalus Corridor',
    description: 'One continuous cultural bridge from Seville to Fes. Architecture, music, food, language — four layers of shared DNA across 800 years. Interactive Mapbox map with toggle layers.',
    fields: ['Architecture', 'Music', 'Food', 'Language', 'Trade Routes', 'Loanwords'],
    href: '/data/al-andalus',
  },
  {
    id: 'islamic-spain',
    category: 'Historical Timeline',
    title: 'Islamic Spain — 781 Years of Al-Andalus',
    description: 'From Tariq ibn Ziyad\'s 711 crossing to the fall of Granada in 1492. Vertical timeline synced with an interactive Mapbox map, territory decline chart, and key historical figures.',
    fields: ['Conquest', 'Emirate', 'Caliphate', 'Taifas', 'Reconquista', 'Territory', 'Figures'],
    href: '/data/islamic-spain',
  },
  {
    id: 'darija',
    category: 'Language',
    title: 'Darija Structured Lexicon',
    description: 'The most comprehensive structured Moroccan Arabic dataset. Each entry: Arabic root, Amazigh substrate, French overlay, regional variations, cultural context, pronunciation.',
    fields: ['Word', 'Translation', 'Arabic Root', 'Category', 'Cultural Context', 'Regional Variant', 'Example Sentence'],
  },
  {
    id: 'textiles',
    category: 'Ethnographic Archive',
    title: 'North & West African Textiles',
    description: 'Source-documented textile traditions. Each story includes technique, region, motif lineage, spiritual significance, and practitioner documentation.',
    fields: ['Tradition', 'Region', 'Technique', 'Materials', 'Motif Lineage', 'Source Type', 'Practitioner'],
  },
  {
    id: 'cultural',
    category: 'Cultural Documentation',
    title: 'Morocco Cultural Index',
    description: 'Deep cultural documentation — architecture, music, food systems, craft traditions, seasonal practices. Each entry with academic citations and first-person verification.',
    fields: ['Topic', 'Region', 'Category', 'Sources', 'Date Verified', 'Related Entries'],
  },
  {
    id: 'real-estate',
    category: 'Market Intelligence',
    title: 'Moroccan Property Investment Tracker',
    description: 'Foreign direct investment flows, pricing trends by city, regulatory framework mapping, developer activity, and market condition indicators.',
    fields: ['City', 'Property Type', 'Price/m²', 'YoY Change', 'Foreign Investment %', 'Regulatory Status'],
  },
  {
    id: 'demographics',
    category: 'Population Data',
    title: 'Maghreb Demographics',
    description: 'Population distribution, urbanization rates, youth demographics, migration patterns, and diaspora mapping across Morocco, Tunisia, and Algeria.',
    fields: ['Region', 'Population', 'Urban %', 'Median Age', 'Growth Rate', 'Diaspora Size'],
  },
  {
    id: 'tourism',
    category: 'Tourism Intelligence',
    title: 'Visitor Flow Analysis',
    description: 'Arrival data, seasonal patterns, spending analysis by source market, accommodation trends, and destination-level intelligence.',
    fields: ['Source Market', 'Arrivals', 'Avg Stay', 'Spend/Day', 'Destination', 'Season'],
  },
]

export default function DataPage() {
  const total = MODULES.length
  const pageNum = (n: number) => `${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}`

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
        {MODULES.map((mod, i) => {
          const num = pageNum(i + 1)
          return (
            <div key={mod.id} className="border-b border-dwl-border py-10 md:py-12">
              {/* Page number — top */}
              <p className="text-[11px] text-dwl-muted font-medium tabular-nums mb-8">
                {num}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-3">
                  <p className="text-meta uppercase tracking-[0.08em] text-dwl-gray">{mod.category}</p>
                </div>
                <div className="md:col-span-9">
                  {'href' in mod && mod.href ? (
                    <Link href={mod.href} className="font-serif text-[30px] md:text-[36px] text-dwl-black leading-[1.1] hover:opacity-60 transition-opacity mb-4 block">
                      {mod.title}
                    </Link>
                  ) : (
                    <h2 className="font-serif text-[30px] md:text-[36px] text-dwl-black leading-[1.1] mb-4">
                      {mod.title}
                    </h2>
                  )}
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

              {/* Page number — bottom */}
              <p className="text-[11px] text-dwl-muted font-medium tabular-nums mt-8 text-right">
                {num}
              </p>
            </div>
          )
        })}
      </section>
    </div>
  )
}
