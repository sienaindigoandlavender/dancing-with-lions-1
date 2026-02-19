import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Dancing with Lions',
  description: 'Dancing with Lions is a cultural intelligence guide to Morocco and the Maghreb — told through interactive data stories, maps, and visualizations. Founded by Jacqueline Ng.',
}

export default function AboutPage() {
  return (
    <div className="pt-16">

      {/* Title */}
      <section className="max-w-wide mx-auto px-6 md:px-10 pt-section pb-16">
        <p className="micro-label mb-4">About</p>
        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] text-dwl-black leading-[0.95]">
          Dancing <em>with</em> Lions
        </h1>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* What It Is */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="max-w-[680px]">
          <p className="font-serif text-[28px] md:text-[36px] leading-[1.35] text-dwl-black italic">
            A guide to Morocco told through data.
          </p>
          <p className="text-body text-dwl-body leading-relaxed mt-8">
            Dancing with Lions publishes interactive data stories about Morocco
            and the Maghreb. Not essays with a chart on top &mdash; stories where
            the visualization is the editorial language. Maps you fly through.
            Timelines you expand. Charts that animate the argument. Each one
            designed to be the definitive visual reference on its subject.
          </p>
          <p className="text-body text-dwl-body leading-relaxed mt-4">
            The archive is permanent and compounding. Sixty-seven data stories
            published and growing &mdash; covering economic intelligence, imperial
            history, cultural geography, religious heritage, natural systems,
            and architectural documentation. Every story deepens the map.
          </p>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* What Makes It Different */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label">What Makes It Different</p>
          </div>
          <div className="md:col-span-8 max-w-[580px]">
            <p className="font-serif text-[20px] text-dwl-black italic">
              Nobody else is doing this.
            </p>
            <p className="text-body text-dwl-body leading-relaxed mt-6">
              Travel guides tell you where to go. Data platforms sell you a PDF.
              News outlets run a feature and move on. Nobody is building a permanent,
              deepening archive of interactive data stories about a single region &mdash;
              where the visualization is the storytelling form and every piece compounds
              on the last.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { gap: 'Monocle, Atlas Obscura', miss: 'Beautiful editorial. No data visualization. No structured intelligence underneath.' },
                { gap: 'McKinsey, Skift Research, Oxford Business Group', miss: 'Sell reports as locked PDFs. No interactive depth. No cultural context. No design eye.' },
                { gap: 'NYT Graphics, FiveThirtyEight, The Guardian Datablog', miss: 'Individual data stories about current events. No permanent regional archive. Not Morocco.' },
                { gap: 'Travel bloggers, Instagram, Booking.com', miss: 'Recommendations. Not research. No data. No permanence.' },
              ].map((item, i) => (
                <div key={i} className="border-b border-dwl-border pb-3">
                  <p className="text-[13px] text-dwl-black font-medium">{item.gap}</p>
                  <p className="text-[12px] text-dwl-gray mt-1">{item.miss}</p>
                </div>
              ))}
            </div>
            <p className="text-body text-dwl-body leading-relaxed mt-6">
              Dancing with Lions sits at the intersection &mdash; the editorial sensibility of
              a cultural guide, the rigour of a research desk, the craft of a data
              visualization studio. Applied to one region by someone who has lived
              inside it for eleven years.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* The Archive */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label">The Archive</p>
          </div>
          <div className="md:col-span-8 max-w-[580px]">
            <div className="space-y-4">
              {[
                { n: '67', what: 'interactive data stories \u2014 maps, timelines, charts, animated visualizations' },
                { n: '8,640+', what: 'Darija words structured with cultural context, pronunciation, and regional variation' },
                { n: '88+', what: 'textile traditions documented across North and West Africa with ethnographic depth' },
                { n: '97+', what: 'cultural essays on architecture, music, food, and craft \u2014 source-verified' },
              ].map((item) => (
                <div key={item.n} className="flex gap-4 items-baseline border-b border-dwl-border pb-3">
                  <span className="font-serif italic text-[24px] text-dwl-black min-w-[80px]">{item.n}</span>
                  <span className="text-[14px] text-dwl-gray leading-relaxed">{item.what}</span>
                </div>
              ))}
            </div>
            <p className="mt-6">
              <Link href="/data" className="text-meta uppercase tracking-[0.08em] font-medium text-dwl-black border-b border-dwl-black pb-1 hover:opacity-60 transition-opacity">
                Explore All Data Stories
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* The Perspective */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label">The Perspective</p>
          </div>
          <div className="md:col-span-8 max-w-[580px]">
            <p className="font-serif text-[20px] text-dwl-black italic">
              Eleven years in Morocco. Not visiting. Living.
            </p>
            <p className="text-body text-dwl-body leading-relaxed mt-6">
              Dancing with Lions is founded by Jacqueline Ng &mdash; Hakka Chinese,
              born in Mauritius, trained in Canada, rooted in Marrakech. Twenty-five
              years building brands. Eleven years inside Morocco running a riad,
              studying textiles, learning Darija, documenting food traditions,
              and building the databases that underpin everything published here.
            </p>
            <p className="text-body text-dwl-body leading-relaxed mt-4">
              Anyone can compile statistics. We explain why they mean what they
              mean &mdash; because we understand the culture underneath the numbers.
              The economic data is credible because we know the souk. The cultural
              archive has depth because we know the academic record. The language
              data is accurate because we speak Darija at the corner shop,
              not in a classroom.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* The Network */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label">The Network</p>
          </div>
          <div className="md:col-span-8">
            <p className="font-serif text-[22px] text-dwl-black italic mb-8 max-w-[580px]">
              Dancing with Lions is the publisher. Everything else is a title in the catalogue.
            </p>
            <div className="max-w-[580px]">
              {[
                { title: 'Slow Morocco', domain: 'slowmorocco.com', type: 'Cultural journeys & travel intelligence' },
                { title: 'House of Weaves', domain: 'houseofweaves.com', type: 'Ethnographic textile archive' },
                { title: 'Cuisines of Morocco', domain: 'cuisinesofmorocco.com', type: 'Food intelligence' },
                { title: 'Darija', domain: 'dharija.space', type: 'Language data' },
                { title: 'Derb 37', domain: 'derb37.com', type: 'Life in the medina' },
                { title: 'Architecture of Morocco', domain: 'architectureofmorocco.com', type: 'Built heritage' },
                { title: 'Amazigh Online', domain: 'amazigh.online', type: 'Amazigh culture & language' },
                { title: 'Festivals in Morocco', domain: 'festivalsinmorocco.com', type: 'Cultural calendar' },
                { title: 'Music in Morocco', domain: 'musicinmorocco.com', type: 'Musical traditions' },
                { title: 'Riad di Siena', domain: 'riadofsiena.com', type: 'Sanctuary guesthouse, Marrakech' },
              ].map((site, i) => (
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
          </div>
        </div>
      </section>

      {/* Data & Licensing */}
      <section className="bg-dwl-offwhite">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="micro-label mb-4">Data & Licensing</p>
            </div>
            <div className="md:col-span-8 max-w-[580px]">
              <p className="text-body text-dwl-body leading-relaxed">
                All data stories, visualizations, and original datasets published
                by Dancing with Lions are available for licensing. Institutional access,
                editorial syndication, custom data packages, and print reproductions
                available on request.
              </p>
              <p className="text-body text-dwl-body leading-relaxed mt-4">
                The data underneath the stories &mdash; structured, sourced, current &mdash;
                is the asset. The visualizations are how we publish it. Both are licensable.
              </p>
              <Link
                href="/intellectual-property"
                className="text-meta uppercase tracking-[0.08em] font-medium text-dwl-black border-b border-dwl-black pb-1 mt-6 inline-block hover:opacity-60 transition-opacity"
              >
                Licensing &amp; Terms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Geography */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
        <p className="font-serif text-[24px] text-dwl-black italic max-w-[600px] leading-[1.4]">
          The architecture expands along routes, not borders.
        </p>
        <p className="text-body text-dwl-body mt-4 max-w-[600px]">
          Until 2030, the focus is Morocco &mdash; full depth, the definitive reference.
          The structure follows cultural corridors: Al Maghrib across to Tunisia
          and Algeria, the Trans-Saharan route south to Mali and Senegal,
          the Andalusi bridge north to Spain and Portugal.
          Routes that existed for centuries before anyone drew a border.
        </p>
        <p className="text-[14px] text-dwl-muted mt-6">Marrakech, Morocco</p>
      </section>
    </div>
  )
}
