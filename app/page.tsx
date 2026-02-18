import Link from 'next/link'

const DATA_MODULES = [
  {
    id: 'real-estate',
    label: 'Real Estate',
    metric: '€2.4B',
    metricLabel: 'Foreign direct investment in Moroccan real estate, 2024',
    status: 'Coming Q2 2026',
    description: 'Structured data on property investment flows, pricing trends, and market conditions across Morocco\'s key cities.',
  },
  {
    id: 'demographics',
    label: 'Demographics',
    metric: '37.8M',
    metricLabel: 'Morocco population, 2025 estimate',
    status: 'Coming Q2 2026',
    description: 'Migration patterns, urbanization rates, youth demographics, and diaspora mapping across the Maghreb.',
  },
  {
    id: 'tourism',
    label: 'Tourism Intelligence',
    metric: '14.5M',
    metricLabel: 'Tourist arrivals, Morocco 2024',
    status: 'Coming Q3 2026',
    description: 'Arrival data, seasonal patterns, spending analysis, source markets, and accommodation trends.',
  },
  {
    id: 'language',
    label: 'Language Data',
    metric: '8,640+',
    metricLabel: 'Words with cultural context, pronunciation, and etymology',
    status: 'Live',
    description: 'The most comprehensive structured Darija dataset available. Each entry includes Arabic roots, Amazigh substrates, French overlays, and regional variations.',
  },
  {
    id: 'textiles',
    label: 'Textile Intelligence',
    metric: '88+',
    metricLabel: 'Documented textile traditions with ethnographic depth',
    status: 'Live',
    description: 'Source-documented archive of weaving traditions, motif lineages, and craft techniques across North and West Africa.',
  },
  {
    id: 'cultural',
    label: 'Cultural Index',
    metric: '97+',
    metricLabel: 'Source-documented essays on Moroccan culture',
    status: 'Live',
    description: 'Deep cultural documentation — architecture, music, food systems, craft traditions, seasonal practices.',
  },
]

const BUYERS = [
  'Investment groups evaluating North African markets',
  'Consulting firms building Maghreb pitch decks',
  'AI companies needing structured regional data',
  '2030 World Cup media operations',
  'Architecture firms designing luxury properties',
  'Universities and cultural researchers',
]

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="min-h-[90vh] flex flex-col justify-end px-6 md:px-10 pb-16 max-w-wide mx-auto">
        <div className="animate-fade-up">
          <p className="micro-label mb-6 delay-1 animate-fade-up">Cultural Intelligence</p>
          <h1 className="font-serif text-[clamp(3.5rem,10vw,8rem)] text-dwl-black leading-[0.95] tracking-[-0.01em] delay-2 animate-fade-up">
            Dancing<br />
            <em>with Lions</em>
          </h1>
        </div>
        <div className="mt-12 max-w-[580px] delay-3 animate-fade-up">
          <p className="text-body text-dwl-gray leading-relaxed">
            Dancing with Lions builds structured intelligence about Morocco and the Maghreb.
            Data, research, maps, timelines — made alive and made beautiful.
            The depth that doesn&apos;t exist anywhere else.
          </p>
        </div>
        <div className="mt-8 flex items-center gap-6 delay-4 animate-fade-up">
          <Link
            href="/data"
            className="text-meta uppercase tracking-[0.08em] font-medium text-dwl-black border-b border-dwl-black pb-1 hover:opacity-60 transition-opacity"
          >
            Explore the Data
          </Link>
          <Link
            href="/about"
            className="text-meta uppercase tracking-[0.08em] text-dwl-gray hover:text-dwl-black transition-colors"
          >
            About
          </Link>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* THE THESIS */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label mb-4">The Problem</p>
            <p className="font-serif text-[72px] md:text-[96px] text-dwl-black leading-none italic">0</p>
            <p className="text-meta uppercase tracking-[0.08em] text-dwl-gray mt-2">
              Structured, current, machine-readable data platforms covering the Maghreb
            </p>
          </div>
          <div className="md:col-span-8 md:pt-8">
            <p className="font-serif text-[24px] md:text-[30px] leading-[1.45] text-dwl-black max-w-[640px]">
              Who&apos;s polling Moroccan consumer sentiment? Who has structured data on Algerian market conditions
              that isn&apos;t five years old? Who&apos;s tracking real estate investment patterns across the Maghreb
              in a format a fund manager in London can use?
            </p>
            <p className="text-body text-dwl-gray mt-6 max-w-[640px]">
              Almost nobody. And the little that exists is ugly, fragmented, outdated,
              and locked in PDFs written by people who&apos;ve never lived in the region.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* DATA MODULES */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <p className="micro-label mb-12">Data Modules</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dwl-border">
          {DATA_MODULES.map((mod) => (
            <div key={mod.id} className="bg-white p-8 md:p-10">
              <div className="flex items-start justify-between mb-6">
                <p className="text-meta uppercase tracking-[0.08em] text-dwl-gray">{mod.label}</p>
                <span className={`text-[11px] uppercase tracking-[0.08em] font-medium px-3 py-1 ${
                  mod.status === 'Live' ? 'bg-dwl-black text-white' : 'bg-dwl-light text-dwl-gray'
                }`}>
                  {mod.status}
                </span>
              </div>
              <p className="font-serif text-[48px] md:text-[56px] text-dwl-black leading-none italic">
                {mod.metric}
              </p>
              <p className="text-[13px] text-dwl-gray mt-2 mb-6">{mod.metricLabel}</p>
              <p className="text-[15px] text-dwl-gray leading-relaxed">{mod.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* THE FORMULA */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <p className="micro-label mb-12">The Formula</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-dwl-border">
          {[
            { pillar: 'Data', detail: '11 years of accumulated knowledge. Not scraped. Not aggregated. Lived.' },
            { pillar: 'AI', detail: 'Autonomous agents that index, automate, and scale what one person produces to what would normally take a studio of twenty.' },
            { pillar: 'Technology', detail: 'Next.js, Supabase, Vercel, interactive visualizations, structured APIs. Architect and engineer in one.' },
            { pillar: 'Design', detail: '25 years of brand building. The refusal to ship anything ugly. The instinct that makes the same data worth ten times more.' },
          ].map((item) => (
            <div key={item.pillar} className="bg-white p-6 md:p-8">
              <p className="font-serif text-[36px] md:text-[44px] text-dwl-black leading-none italic mb-4">
                {item.pillar}
              </p>
              <p className="text-[14px] text-dwl-gray leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-[14px] text-dwl-muted mt-6">
          Any data company has one or two of these. Nobody has all four applied to North Africa.
        </p>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* 2030 */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="micro-label mb-4">The Horizon</p>
            <p className="font-serif text-[80px] md:text-[120px] text-dwl-black leading-none italic">2030</p>
            <p className="text-meta uppercase tracking-[0.08em] text-dwl-gray mt-2">
              FIFA World Cup — Morocco, Spain, Portugal
            </p>
          </div>
          <div className="md:col-span-7 md:pt-8">
            <p className="font-serif text-[24px] md:text-[28px] leading-[1.45] text-dwl-black max-w-[580px]">
              When the cameras come, someone needs to make sure the world sees more than stadiums and bling.
            </p>
            <p className="text-body text-dwl-gray mt-6 max-w-[580px]">
              Morocco has thousands of years of civilization. The story didn&apos;t start when the
              Arabs arrived. It started with the Amazigh, the Phoenicians at Lixus, the Romans at Volubilis,
              trade routes that connected sub-Saharan gold to Mediterranean silver long before anyone drew a border.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* WHO THIS IS FOR */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <p className="micro-label mb-12">Who This Is For</p>
        <div className="max-w-[640px]">
          {BUYERS.map((buyer, i) => (
            <div key={i} className="py-4 border-b border-dwl-border flex items-baseline gap-4">
              <span className="text-[11px] text-dwl-muted font-medium tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[16px] text-dwl-black">{buyer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COPYRIGHT — pulled from Nexus in production */}
      <section className="bg-dwl-offwhite">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
          <div className="max-w-[640px]">
            <p className="micro-label mb-4">Intellectual Property</p>
            <p className="text-[15px] text-dwl-black leading-relaxed">
              All data visualizations, maps, charts, infographics, and original research published by
              Dancing with Lions are protected by copyright. Reproduction, distribution, or republication
              of any visual asset requires written permission and visible attribution:
            </p>
            <p className="font-serif text-[22px] text-dwl-black italic mt-4">
              &ldquo;Source: Dancing with Lions&rdquo;
            </p>
            <p className="text-[14px] text-dwl-gray mt-4">
              For licensing inquiries, contact us with details of intended use.
            </p>
            <Link
              href="/intellectual-property"
              className="text-meta uppercase tracking-[0.08em] font-medium text-dwl-black border-b border-dwl-black pb-1 mt-6 inline-block hover:opacity-60 transition-opacity"
            >
              Full Terms &amp; Licensing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
