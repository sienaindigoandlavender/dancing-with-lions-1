import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Dancing with Lions',
  description: 'Dancing with Lions is a sovereign business intelligence operation focused on Morocco and the Maghreb. Founded by J. Ng.',
}

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="max-w-wide mx-auto px-6 md:px-10 pt-section pb-16">
        <p className="micro-label mb-4">About</p>
        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] text-dwl-black leading-[0.95]">
          Dancing <em>with</em> Lions
        </h1>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* Mission */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="max-w-[640px]">
          <p className="font-serif text-[28px] md:text-[34px] leading-[1.4] text-dwl-black italic">
            Making sure that in 2030, Morocco is not perceived as just the Dubai of Africa.
          </p>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* What It Is */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label">What It Is</p>
          </div>
          <div className="md:col-span-8 max-w-[580px] space-y-6">
            <p className="text-body text-dwl-black leading-relaxed">
              Dancing with Lions is a sovereign business intelligence operation — data, research,
              structured intelligence — about Al Maghrib and its connected worlds.
            </p>
            <p className="text-body text-dwl-gray leading-relaxed">
              It publishes. It builds digital tools and interactive data experiences. It holds
              deep, structured intelligence that institutions, investors, AI systems, consultants,
              and brands need — and delivers it in forms that are both rigorous and beautiful.
            </p>
            <p className="font-serif text-[20px] text-dwl-black italic">
              The aesthetic says Monocle. The architecture says Bloomberg. The soul is something new.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* What It Is Not */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label">What It Is Not</p>
          </div>
          <div className="md:col-span-8 max-w-[580px]">
            {[
              'Not a hospitality company',
              'Not a tour operator',
              'Not a travel magazine',
              'Not an NGO saving dying traditions',
              'Not a startup pitching to committees',
            ].map((item, i) => (
              <div key={i} className="py-3 border-b border-dwl-border">
                <p className="text-[16px] text-dwl-gray">{item}</p>
              </div>
            ))}
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
                { title: 'House of Weaves', domain: 'houseofweaves.com', type: 'Ethnographic textile archive' },
                { title: 'Cuisines of Morocco', domain: 'cuisinesofmorocco.com', type: 'Food intelligence' },
                { title: 'Darija', domain: 'dharija.space', type: 'Language data' },
                { title: 'Derb 37', domain: 'derb37.com', type: 'Street-level Marrakech' },
                { title: 'Amazigh Online', domain: 'amazigh.online', type: 'Amazigh culture & language' },
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

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* Founder */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="micro-label">Founder</p>
          </div>
          <div className="md:col-span-8 max-w-[580px]">
            <p className="font-serif text-[32px] text-dwl-black italic mb-6">J. Ng</p>
            <p className="text-body text-dwl-gray leading-relaxed">
              Hakka Chinese, born in Mauritius, trained in Canada, rooted in Morocco.
              11 years living in Marrakech. 25 years building brands.
            </p>
            <p className="text-body text-dwl-gray leading-relaxed mt-4">
              The riad is the credential, not the definition. Cultural intelligence —
              the building, the mapping, the connecting, the making-data-alive —
              that&apos;s where the brain lives.
            </p>
          </div>
        </div>
      </section>

      {/* Geography */}
      <section className="bg-dwl-offwhite">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
          <p className="micro-label mb-4">Geography</p>
          <p className="font-serif text-[24px] text-dwl-black italic max-w-[580px] leading-[1.4]">
            Until 2030: Morocco. Full depth. The proof of concept.
          </p>
          <p className="text-body text-dwl-gray mt-4 max-w-[580px]">
            The architecture expands along routes, not borders — Al Maghrib, the Trans-Saharan corridor,
            the Andalusi bridge to southern Spain and Portugal.
          </p>
          <p className="text-[14px] text-dwl-muted mt-6">Marrakech, Morocco</p>
        </div>
      </section>
    </div>
  )
}
