import Link from 'next/link'

const LIVE_MODULES = [
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
          <p className="micro-label mb-6 delay-1 animate-fade-up">Morocco · The Maghreb · North Africa</p>
          <h1 className="font-serif text-[clamp(3.5rem,10vw,8rem)] text-dwl-black leading-[0.95] tracking-[-0.01em] delay-2 animate-fade-up">
            Dancing<br />
            <em>with Lions</em>
          </h1>
        </div>
        <div className="mt-12 max-w-[520px] delay-3 animate-fade-up">
          <p className="text-body text-dwl-body leading-relaxed">
            Research, data, and cultural intelligence about Morocco —
            published as interactive visualizations, structured archives,
            and living maps. The depth that doesn&apos;t exist anywhere else.
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
          Seven interactive modules live.
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

      {/* ═══ THE QUOTE / BIG STATEMENT ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="max-w-[700px]">
          <p className="font-serif text-[28px] md:text-[34px] leading-[1.4] text-dwl-black italic">
            In 2030, Morocco will co-host the World Cup. 26 million visitors will arrive.
            The stadiums are being built. The highways are being paved. But when the world asks
            &ldquo;what is this place?&rdquo; — the answer needs to already exist, and it needs
            to be extraordinary.
          </p>
          <p className="text-body text-dwl-body mt-6">
            That answer is what we build.
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
