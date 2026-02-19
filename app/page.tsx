import Link from 'next/link'

const LIVE_MODULES = [
  {
    id: 'world-cup-2030',
    label: 'Infrastructure Intelligence',
    title: '2030 World Cup Infrastructure Map',
    metric: '$41B',
    metricLabel: 'Morocco infrastructure — 20 stadiums, 17 cities',
    href: '/data/world-cup-2030',
  },
  {
    id: 'tourism-flow',
    label: 'Tourism Intelligence',
    title: 'Where 17.4 Million Tourists Go',
    metric: '17.4M',
    metricLabel: 'visitors in 2024 — Africa\'s most visited nation',
    href: '/data/tourism-flow',
  },
  {
    id: 'economy',
    label: 'Economic Intelligence',
    title: 'Morocco Economy in One Page',
    metric: '$183B',
    metricLabel: 'GDP — automotive, phosphates, tourism, remittances',
    href: '/data/morocco-economy',
  },
  {
    id: 'agriculture',
    label: 'Agricultural Intelligence',
    title: 'What Morocco Grows',
    metric: '$6.5B',
    metricLabel: 'agricultural exports — radial harvest wheel',
    href: '/data/morocco-agriculture',
  },
  {
    id: 'al-andalus',
    label: 'Cultural Geography',
    title: 'The Al-Andalus Corridor',
    metric: '800',
    metricLabel: 'years of shared DNA — Seville to Fes',
    href: '/data/al-andalus',
  },
  {
    id: 'ramadan',
    label: 'Cultural Intelligence',
    title: 'Ramadan & the Moon',
    metric: '33',
    metricLabel: 'year lunar cycle — fasting hours, seasonal drift',
    href: '/data/ramadan-moon',
  },
  {
    id: 'population',
    label: 'Demographics',
    title: 'Morocco Population Density',
    metric: '37.8M',
    metricLabel: 'people — 7-section density infographic',
    href: '/data/morocco-population',
  },
]

const NETWORK_SITES = [
  { title: 'Slow Morocco', type: 'Cultural journeys', domain: 'slowmorocco.com' },
  { title: 'Riad di Siena', type: 'Sanctuary guesthouse, Marrakech', domain: 'riadofsiena.com' },
  { title: 'House of Weaves', type: 'Textile archive — 88+ traditions', domain: 'houseofweaves.com' },
  { title: 'Darija', type: 'Language data — 8,640+ words', domain: 'dharija.space' },
  { title: 'Cuisines of Morocco', type: 'Food intelligence', domain: 'cuisinesofmorocco.com' },
]

export default function HomePage() {
  return (
    <div className="pt-16">

      {/* ═══ HERO ═══ */}
      <section className="min-h-[85vh] flex flex-col justify-end px-6 md:px-10 pb-16 max-w-wide mx-auto">
        <div className="animate-fade-up">
          <p className="micro-label mb-6 delay-1 animate-fade-up">Business Intelligence · Cultural Depth · Morocco</p>
          <h1 className="font-serif text-[clamp(3.5rem,10vw,8rem)] text-dwl-black leading-[0.95] tracking-[-0.01em] delay-2 animate-fade-up">
            Dancing<br />
            <em>with Lions</em>
          </h1>
        </div>
        <div className="mt-12 max-w-[520px] delay-3 animate-fade-up">
          <p className="text-body text-dwl-body leading-relaxed">
            When the decision matters, you need more than numbers.
            Business intelligence and a deep understanding of Morocco&apos;s
            history, culture, and how things actually work on the ground.
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

      {/* ═══ LIVE DATA MODULES ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <p className="micro-label mb-4">Published Research</p>
        <p className="font-serif text-[24px] text-dwl-black italic mb-12">
          Twelve interactive modules live.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dwl-border">
          {LIVE_MODULES.map((mod) => (
            <Link
              key={mod.id}
              href={mod.href}
              className="bg-white p-8 md:p-10 group hover:bg-dwl-offwhite transition-colors"
            >
              <p className="text-meta uppercase tracking-[0.08em] text-dwl-gray mb-4">{mod.label}</p>
              <p className="font-serif text-[48px] md:text-[56px] text-dwl-black leading-none italic group-hover:opacity-70 transition-opacity">
                {mod.metric}
              </p>
              <p className="text-[13px] text-dwl-gray mt-2 mb-4">{mod.metricLabel}</p>
              <p className="text-[15px] text-dwl-black font-medium">{mod.title}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <Link
            href="/data"
            className="text-meta uppercase tracking-[0.08em] font-medium text-dwl-black border-b border-dwl-black pb-1 hover:opacity-60 transition-opacity"
          >
            View All Modules
          </Link>
          <p className="text-[13px] text-dwl-muted">
            + The Maghreb Compared · Seasonal Produce · Real Estate · Trade Partners
          </p>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* ═══ THE POSITIONING ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="max-w-[700px]">
          <p className="font-serif text-[28px] md:text-[34px] leading-[1.4] text-dwl-black italic">
            What made Apple a trillion-dollar company wasn&apos;t the chip.
            It was the design eye — the insistence that technology without
            culture is just a box.
          </p>
          <p className="text-body text-dwl-body mt-6 leading-relaxed">
            The same is true for doing business in the Maghreb.
            A GDP figure is a number. A tourism forecast is a spreadsheet.
            But understanding why Marrakech commands the premium it does —
            the 800 years of trade routes underneath the medina, the diaspora
            that drives half the tourism, the Ramadan calendar that reshapes
            every quarter, the geometry in the zellige that predates anything
            in a European textbook — that&apos;s what turns data into decisions.
          </p>
          <p className="text-body text-dwl-body mt-4 leading-relaxed">
            Business intelligence without cultural intelligence is just
            a spreadsheet. We publish both.
          </p>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* ═══ THE NETWORK ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <p className="micro-label mb-12">The Network</p>
        <div className="max-w-[640px]">
          {NETWORK_SITES.map((site, i) => (
            <div key={i} className="py-4 border-b border-dwl-border grid grid-cols-12 gap-4 items-baseline">
              <span className="col-span-1 text-[11px] text-dwl-muted font-medium tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="col-span-5">
                <p className="text-[15px] text-dwl-black font-semibold">{site.title}</p>
              </div>
              <div className="col-span-3">
                <p className="text-[13px] text-dwl-gray">{site.type}</p>
              </div>
              <div className="col-span-3 text-right">
                <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer"
                  className="text-[12px] text-dwl-muted hover:text-dwl-black transition-colors">
                  {site.domain}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ IP ═══ */}
      <section className="bg-dwl-offwhite">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
          <div className="max-w-[640px]">
            <p className="micro-label mb-4">Intellectual Property</p>
            <p className="text-[15px] text-dwl-black leading-relaxed">
              All data visualizations, maps, charts, infographics, and original research published by
              Dancing with Lions are protected by copyright. Reproduction requires written permission
              and visible attribution.
            </p>
            <p className="font-serif text-[22px] text-dwl-black italic mt-4">
              &ldquo;Source: Dancing with Lions&rdquo;
            </p>
            <Link
              href="/intellectual-property"
              className="text-meta uppercase tracking-[0.08em] font-medium text-dwl-black border-b border-dwl-black pb-1 mt-6 inline-block hover:opacity-60 transition-opacity"
            >
              Licensing &amp; Terms
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
