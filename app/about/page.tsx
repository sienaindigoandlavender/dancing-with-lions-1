import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Dancing with Lions',
  description: 'Dancing with Lions publishes interactive data stories about Morocco — history, food, architecture, music, textiles, language, and economy. Founded by Jacqueline Ng. Based in Marrakech.',
}

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="max-w-wide mx-auto px-6 md:px-10 pt-section pb-16">
        <p className="micro-label mb-4">About</p>
        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] text-dwl-black leading-[0.95]">
          Dancing <em>with</em> Lions
        </h1>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* What We Do */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label">What We Do</p>
          </div>
          <div className="md:col-span-8 max-w-[580px] space-y-6">
            <p className="text-body text-dwl-black leading-relaxed">
              We publish interactive data stories about Morocco — its history, food,
              architecture, music, textiles, language, economy, and the cultural systems
              that hold it all together.
            </p>
            <p className="text-body text-dwl-black leading-relaxed">
              Each story takes a subject — the geometry of zellige, the economics of a
              Moroccan wedding, the 315,000-year human timeline, the route of every
              spice in the souk — and turns it into something you can explore. Maps you
              can drag. Timelines you can scroll. Numbers that move.
            </p>
            <p className="text-body text-dwl-black leading-relaxed">
              There are {'>'}100 data stories published so far, with more every week.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* Why */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label">Why</p>
          </div>
          <div className="md:col-span-8 max-w-[580px] space-y-6">
            <p className="font-serif text-[28px] md:text-[34px] leading-[1.4] text-dwl-black italic">
              Morocco is one of the most documented countries on earth and one of the
              least understood.
            </p>
            <p className="text-body text-dwl-black leading-relaxed">
              There are millions of photographs of tagines and riads. There is almost
              nothing that explains how a hammam heating system works, why Moroccan
              geometric patterns use only five families of stars, or what happened in
              this country for 300,000 years before Islam arrived.
            </p>
            <p className="text-body text-dwl-black leading-relaxed">
              That deeper layer — the structures, the systems, the data underneath
              the beauty — is what we publish.
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
            <p className="text-body text-dwl-black leading-relaxed mb-8 max-w-[580px]">
              Dancing with Lions is the publisher. Each title below covers a
              different layer of Morocco.
            </p>
            <div className="max-w-[580px]">
              {[
                { title: 'Slow Morocco', domain: 'slowmorocco.com', type: 'Cultural journeys' },
                { title: 'House of Weaves', domain: 'houseofweaves.com', type: 'Textile archive' },
                { title: 'Cuisines of Morocco', domain: 'cuisinesofmorocco.com', type: 'Food intelligence' },
                { title: 'Darija', domain: 'dharija.space', type: 'Language' },
                { title: 'Derb 37', domain: 'derb37.com', type: 'Street-level Marrakech' },
                { title: 'Amazigh Online', domain: 'amazigh.online', type: 'Amazigh culture' },
                { title: 'Architecture of Morocco', domain: 'architectureofmorocco.com', type: 'Built heritage' },
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
                    <p className="text-[13px] text-dwl-black">{site.type}</p>
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

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* Geography */}
      <section className="bg-dwl-offwhite">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
          <p className="micro-label mb-4">Geography</p>
          <p className="text-body text-dwl-black max-w-[580px] leading-relaxed">
            Based in Marrakech, Morocco. Everything we publish starts here — then follows
            the routes outward through the Maghreb, the Trans-Saharan corridor, and
            the Andalusi bridge to southern Spain.
          </p>
        </div>
      </section>
    </div>
  )
}
