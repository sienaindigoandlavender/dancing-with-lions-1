import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data — Dancing with Lions',
  description: 'Structured intelligence about Morocco and the Maghreb. Real estate, demographics, tourism, language, textiles, and cultural data.',
}

const MODULES = [
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
        <p className="text-body text-dwl-gray mt-6 max-w-[580px]">
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
                  <h2 className="font-serif text-[30px] md:text-[36px] text-dwl-black leading-[1.1]">
                    {mod.title}
                  </h2>
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
