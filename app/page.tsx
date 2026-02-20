import Link from 'next/link'

const FEATURED = [
  {
    label: 'Currency Intelligence',
    title: 'The Dirham\u2019s Journey',
    desc: 'Twenty-one years of exchange rates annotated with every crisis, reform, and turning point. The line barely moves \u2014 and that\u2019s the story.',
    href: '/data/dirhams-journey',
  },
  {
    label: 'Competitive Intelligence',
    title: 'Africa Rising',
    desc: 'Morocco\u2019s rank among 54 nations across six metrics, animated year by year. Watch the lines climb. The trajectory is the argument.',
    href: '/data/africa-rising',
  },
  {
    label: 'Religious & Cultural Geography',
    title: 'The Jewish Atlas of Morocco',
    desc: 'Two communities, separate synagogues for 300 years, 300,000 at their peak, roughly 2,500 today. Fourteen cities mapped.',
    href: '/data/jewish-atlas',
  },
]

const LATEST = [
  { title: 'The Ottoman Empire in North Africa', cat: 'Imperial History', href: '/data/ottoman-north-africa' },
  { title: 'The Reconquista & the Exodus', cat: 'Migration History', href: '/data/reconquista-exodus' },
  { title: 'The Gates of Marrakech', cat: 'Architectural Heritage', href: '/data/gates-of-marrakech' },
  { title: 'The 14km Gap', cat: 'Comparative Data', href: '/data/14km-gap' },
  { title: 'Where 17.4 Million Tourists Go', cat: 'Tourism Intelligence', href: '/data/tourism-flow' },
  { title: 'The Al-Andalus Corridor', cat: 'Cultural Geography', href: '/data/al-andalus' },
]

const CATEGORIES = [
  { name: 'Economic Intelligence', count: 8, examples: 'GDP, agriculture, trade, real estate, currency, phosphates' },
  { name: 'Cultural Geography', count: 14, examples: 'Al-Andalus, spice routes, zellige, Gnawa, Amazigh symbols' },
  { name: 'Imperial History', count: 9, examples: 'Roman, Phoenician, Ottoman, Almohad, dynasty timelines' },
  { name: 'Tourism & Infrastructure', count: 7, examples: 'Arrivals, World Cup, Tangier Med, Al Boraq, airports' },
  { name: 'Religious & Natural Heritage', count: 8, examples: 'Jewish atlas, seven saints, bird atlas, water, scent' },
  { name: 'Comparative & Demographic', count: 7, examples: '14km gap, Africa Rising, population, Maghreb compared' },
]

const NETWORK = [
  { title: 'Slow Morocco', type: 'Cultural journeys & travel intelligence', domain: 'slowmorocco.com' },
  { title: 'House of Weaves', type: 'Textile archive \u2014 88+ traditions', domain: 'houseofweaves.com' },
  { title: 'Cuisines of Morocco', type: 'Food intelligence \u2014 regional, historical', domain: 'cuisinesofmorocco.com' },
  { title: 'Darija', type: 'Language data \u2014 8,640+ words', domain: 'dharija.space' },
  { title: 'Riad di Siena', type: 'Sanctuary guesthouse, Marrakech', domain: 'riadofsiena.com' },
]

export default function HomePage() {
  return (
    <div className="pt-16">

      {/* ═══ HERO ═══ */}
      <section className="min-h-[85vh] flex flex-col justify-end px-6 md:px-10 pb-16 max-w-wide mx-auto">
        <div className="animate-fade-up">
          <p className="micro-label mb-6 delay-1 animate-fade-up">Data Stories · Cultural Intelligence · Morocco & the Maghreb</p>
          <h1 className="font-serif text-[clamp(3.5rem,10vw,8rem)] text-dwl-black leading-[0.95] tracking-[-0.01em] delay-2 animate-fade-up">
            Dancing<br />
            <em>with Lions</em>
          </h1>
        </div>
        <div className="mt-12 max-w-[520px] delay-3 animate-fade-up">
          <p className="text-body text-dwl-body leading-relaxed">
            A guide to Morocco told through data. Interactive maps, animated timelines,
            and layered visualizations that reveal the patterns underneath &mdash;
            the trade routes still shaping commerce, the dynasties still echoing
            in architecture, the numbers behind the country Africa chose to watch.
          </p>
        </div>
        <div className="mt-8 flex items-center gap-6 delay-4 animate-fade-up">
          <Link
            href="/data"
            className="text-meta uppercase tracking-[0.08em] font-medium text-dwl-black border-b border-dwl-black pb-1 hover:opacity-60 transition-opacity"
          >
            Explore 67 Data Stories
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

      {/* ═══ FEATURED STORIES ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <p className="micro-label mb-12">Featured Stories</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-dwl-border">
          {FEATURED.map((story) => (
            <Link
              key={story.href}
              href={story.href}
              className="bg-white p-8 md:p-10 group hover:bg-dwl-offwhite transition-colors"
            >
              <p className="text-meta uppercase tracking-[0.08em] text-dwl-gray mb-4">{story.label}</p>
              <p className="font-serif text-[22px] md:text-[26px] text-dwl-black leading-[1.15] italic group-hover:opacity-70 transition-opacity">
                {story.title}
              </p>
              <p className="text-[13px] text-dwl-body mt-4 leading-relaxed">{story.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* ═══ LATEST ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label mb-4">Latest</p>
            <p className="font-serif text-[28px] md:text-[32px] leading-[1.25] text-dwl-black italic">
              67 data stories published.
            </p>
            <p className="text-[13px] text-dwl-body mt-4 leading-relaxed">
              Each one is an interactive exploration &mdash; maps you can fly through,
              timelines you can expand, charts that animate the argument.
              Not essays with a chart on top. The visualization is the story.
            </p>
            <Link
              href="/data"
              className="text-meta uppercase tracking-[0.08em] font-medium text-dwl-black border-b border-dwl-black pb-1 mt-6 inline-block hover:opacity-60 transition-opacity"
            >
              View All Data Stories
            </Link>
          </div>
          <div className="md:col-span-8">
            {LATEST.map((item, i) => (
              <Link key={i} href={item.href} className="block py-4 border-b border-dwl-border group hover:pl-2 transition-all">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-dwl-muted font-medium tabular-nums mr-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] text-dwl-black font-medium group-hover:opacity-70 transition-opacity">{item.title}</span>
                  </div>
                  <span className="text-[12px] text-dwl-gray shrink-0">{item.cat}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* ═══ CATEGORIES ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <p className="micro-label mb-12">Browse by Category</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dwl-border">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href="/data"
              className="bg-white p-6 group hover:bg-dwl-offwhite transition-colors"
            >
              <div className="flex items-baseline justify-between mb-2">
                <p className="text-[14px] text-dwl-black font-semibold">{cat.name}</p>
                <span className="text-[11px] text-dwl-muted tabular-nums">{cat.count} stories</span>
              </div>
              <p className="text-[12px] text-dwl-gray leading-relaxed">{cat.examples}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* ═══ THE NETWORK ═══ */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <p className="micro-label mb-12">The Network</p>
        <div className="max-w-[640px]">
          {NETWORK.map((site, i) => (
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

      {/* ═══ DATA & LICENSING ═══ */}
      <section className="bg-dwl-offwhite">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
          <div className="max-w-[640px]">
            <p className="micro-label mb-4">Data & Licensing</p>
            <p className="text-[15px] text-dwl-black leading-relaxed">
              All data stories, visualizations, and original datasets published by
              Dancing with Lions are available for licensing. Institutional access,
              editorial syndication, and custom data packages available on request.
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
