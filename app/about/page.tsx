import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Dancing with Lions',
  description: 'Dancing with Lions is a cultural intelligence publisher and data platform focused on Morocco and the Maghreb. Founded by Jacqueline Ng.',
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

      {/* Mission */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="max-w-[680px]">
          <p className="font-serif text-[28px] md:text-[36px] leading-[1.35] text-dwl-black italic">
            In 2030, Morocco will host the World Cup. The world will arrive.
            We are building the depth so they find more than stadiums.
          </p>
          <p className="text-body text-dwl-body leading-relaxed mt-8">
            Morocco has thousands of years of civilization. Amazigh, Phoenician, Roman, Arab,
            Andalusi, Saharan, French, and now global. The infrastructure is being built —
            stadiums, highways, high-speed rail, luxury hotels.
            But infrastructure without cultural intelligence is just another Dubai.
          </p>
          <p className="text-body text-dwl-body leading-relaxed mt-4">
            Dancing with Lions exists to make sure the story is told with the depth it deserves.
            Not as a travel brochure. As structured data, interactive visualizations, living
            archives, and cultural research that journalists, architects, investors, researchers,
            and AI systems can cite, reference, and build upon.
          </p>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* What We Publish */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label">What We Publish</p>
          </div>
          <div className="md:col-span-8 max-w-[580px] space-y-6">
            <p className="text-body text-dwl-body leading-relaxed">
              Interactive data visualizations that make economic, demographic, and cultural
              data about Morocco and the Maghreb visible, beautiful, and usable. Each one
              designed to be the definitive visual reference for its subject.
            </p>
            <div className="space-y-4 mt-6">
              {[
                { n: '8,640+', what: 'Darija words structured with cultural context, pronunciation, and regional variation' },
                { n: '88+', what: 'textile traditions documented across North and West Africa with ethnographic depth' },
                { n: '97+', what: 'cultural essays on architecture, music, food, and craft — source-verified' },
                { n: '7', what: 'interactive data modules live — economy, agriculture, demographics, tourism, cultural geography' },
              ].map((item) => (
                <div key={item.n} className="flex gap-4 items-baseline border-b border-dwl-border pb-3">
                  <span className="font-serif italic text-[24px] text-dwl-black min-w-[80px]">{item.n}</span>
                  <span className="text-[14px] text-dwl-gray leading-relaxed">{item.what}</span>
                </div>
              ))}
            </div>
            <p className="mt-6">
              <Link href="/data" className="text-[13px] text-dwl-gray hover:text-dwl-black transition-colors underline underline-offset-4">
                View all data modules →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* The Approach */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label">The Approach</p>
          </div>
          <div className="md:col-span-8 max-w-[580px] space-y-6">
            <p className="font-serif text-[20px] text-dwl-black italic">
              Data as art. Data as experience. Data as organism.
            </p>
            <p className="text-body text-dwl-body leading-relaxed">
              We don&apos;t publish static tables or PDF reports.
              Every dataset gets the visual form that best reveals its story —
              radial harvest wheels for agricultural exports, Sankey flows for tourism patterns,
              interactive Mapbox corridors for cultural geography, illustrated SVG
              charts where hand-drawn tomatoes and sardines sit inside their data arcs.
            </p>
            <p className="text-body text-dwl-body leading-relaxed">
              The cultural depth makes the data credible. Anyone can compile statistics
              about Morocco. We compile statistics and explain why they mean what they mean —
              because we understand the culture underneath the numbers.
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
                { title: 'Slow Morocco', domain: 'slowmorocco.com', type: 'Cultural travel intelligence' },
                { title: 'Riad di Siena', domain: 'riadofsiena.com', type: 'A 300-year-old sanctuary in Marrakech' },
                { title: 'House of Weaves', domain: 'houseofweaves.com', type: 'Ethnographic textile archive' },
                { title: 'Cuisines of Morocco', domain: 'cuisinesofmorocco.com', type: 'Food intelligence' },
                { title: 'Darija', domain: 'dharija.space', type: 'Language data' },
                { title: 'Derb 37', domain: 'derb37.com', type: 'Life in the medina' },
                { title: 'Architecture of Morocco', domain: 'architectureofmorocco.com', type: 'Built heritage' },
                { title: 'Amazigh Online', domain: 'amazigh.online', type: 'Amazigh culture & language' },
                { title: 'Festivals in Morocco', domain: 'festivalsinmorocco.com', type: 'Cultural calendar' },
                { title: 'Music in Morocco', domain: 'musicinmorocco.com', type: 'Musical traditions' },
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

      {/* Geography */}
      <section className="bg-dwl-offwhite">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
          <p className="micro-label mb-4">Geography</p>
          <p className="font-serif text-[24px] text-dwl-black italic max-w-[600px] leading-[1.4]">
            The architecture expands along routes, not borders.
          </p>
          <p className="text-body text-dwl-body mt-4 max-w-[600px]">
            Until 2030, the focus is Morocco — full depth, the definitive reference.
            The structure is designed to follow cultural corridors: Al Maghrib across to Tunisia
            and Algeria, the Trans-Saharan route south to Mali and Senegal,
            the Andalusi bridge north to Spain and Portugal.
            Routes that existed for centuries before anyone drew a border.
          </p>
          <p className="text-[14px] text-dwl-muted mt-6">Marrakech, Morocco</p>
        </div>
      </section>
    </div>
  )
}
