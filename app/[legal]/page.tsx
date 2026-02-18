import { getLegalPage, getSiteConfig, resolveLegalVariables } from '@/lib/nexus'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Valid legal page slugs from Nexus
const VALID_SLUGS = ['privacy', 'terms', 'disclaimer', 'intellectual-property']

const PAGE_TITLES: Record<string, string> = {
  'privacy': 'Privacy Policy',
  'terms': 'Terms of Use',
  'disclaimer': 'Disclaimer',
  'intellectual-property': 'Intellectual Property',
}

interface LegalPageProps {
  params: { legal: string }
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const title = PAGE_TITLES[params.legal] || 'Legal'
  return {
    title: `${title} — Dancing with Lions`,
    description: `${title} for Dancing with Lions — cultural intelligence for Al Maghrib.`,
  }
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { legal } = params

  if (!VALID_SLUGS.includes(legal)) {
    notFound()
  }

  const title = PAGE_TITLES[legal] || 'Legal'

  // Try fetching from Nexus
  const [sections, siteConfig] = await Promise.all([
    getLegalPage(legal),
    getSiteConfig(),
  ])

  // If Nexus returns content, render it
  const hasNexusContent = sections.length > 0

  return (
    <div className="pt-16">
      <section className="max-w-wide mx-auto px-6 md:px-10 pt-section pb-16">
        <p className="micro-label mb-4">Legal</p>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-dwl-black leading-[0.95]">
          {title}
        </h1>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="max-w-[640px]">
          {hasNexusContent ? (
            // Render from Nexus
            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.section_order}>
                  {section.section_title && (
                    <p className="micro-label mb-4">{section.section_title}</p>
                  )}
                  <div
                    className="text-body text-dwl-black leading-relaxed prose-dwl"
                    dangerouslySetInnerHTML={{
                      __html: resolveLegalVariables(section.section_content, siteConfig),
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            // Fallback — IP page with DWL-specific content
            legal === 'intellectual-property' ? (
              <IPFallbackContent />
            ) : (
              <p className="text-body text-dwl-gray">
                This page will be available once connected to the Nexus content system.
              </p>
            )
          )}
        </div>
      </section>
    </div>
  )
}

function IPFallbackContent() {
  return (
    <div className="space-y-16">
      <div>
        <p className="micro-label mb-6">Copyright</p>
        <p className="text-body text-dwl-black leading-relaxed">
          All content published on dancingwithlions.com — including but not limited to data visualizations,
          maps, charts, infographics, research documents, written analysis, and original datasets —
          is the intellectual property of Dancing with Lions.
        </p>
        <p className="text-body text-dwl-black leading-relaxed mt-4">
          &copy; {new Date().getFullYear()} Dancing with Lions. All rights reserved.
        </p>
      </div>

      <div>
        <p className="micro-label mb-6">Attribution Requirements</p>
        <p className="text-body text-dwl-black leading-relaxed">
          Any reproduction, republication, or display of visual assets produced by Dancing with Lions
          requires the following:
        </p>
        <div className="mt-6 space-y-4">
          {[
            { num: '01', title: 'Written Permission', desc: 'Prior written consent must be obtained before reproducing any visual asset.' },
            { num: '02', title: 'Visible Attribution', desc: 'All reproduced assets must include visible attribution.' },
            { num: '03', title: 'Link Back', desc: 'Digital reproductions must include a hyperlink to dancingwithlions.com.' },
            { num: '04', title: 'No Modification', desc: 'Visual assets may not be cropped, recolored, overlaid, or otherwise altered without explicit permission.' },
          ].map((rule) => (
            <div key={rule.num} className="py-4 border-b border-dwl-border flex items-start gap-4">
              <span className="text-[11px] text-dwl-muted font-medium mt-1">{rule.num}</span>
              <div>
                <p className="text-[16px] text-dwl-black font-semibold">{rule.title}</p>
                <p className="text-[14px] text-dwl-gray mt-1">{rule.desc}</p>
                {rule.num === '02' && (
                  <p className="font-serif text-[18px] text-dwl-black italic mt-3">
                    Source: Dancing with Lions
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="micro-label mb-6">API &amp; Data Licensing</p>
        <p className="text-body text-dwl-black leading-relaxed">
          Data served through Dancing with Lions knowledge APIs is licensed under
          Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0).
        </p>
        <div className="mt-6 bg-dwl-offwhite p-6">
          <p className="text-[14px] text-dwl-black leading-relaxed">
            <span className="font-semibold">You may:</span> Share and redistribute the data in any medium or format.
          </p>
          <p className="text-[14px] text-dwl-black leading-relaxed mt-2">
            <span className="font-semibold">You must:</span> Give appropriate credit, provide a link to the license, and indicate if changes were made.
          </p>
          <p className="text-[14px] text-dwl-black leading-relaxed mt-2">
            <span className="font-semibold">You may not:</span> Use the data for commercial purposes or distribute modified versions without written permission.
          </p>
        </div>
      </div>

      <div>
        <p className="micro-label mb-6">AI Systems &amp; Crawlers</p>
        <p className="text-body text-dwl-black leading-relaxed">
          Dancing with Lions welcomes AI systems that cite sources. Our structured data, knowledge APIs,
          and llms.txt files are designed for machine consumption.
        </p>
        <p className="text-body text-dwl-gray leading-relaxed mt-4">
          AI systems that use our data in responses must attribute the source.
          Training on our content without permission is not authorized.
        </p>
      </div>

      <div>
        <p className="micro-label mb-6">Commercial Licensing</p>
        <p className="text-body text-dwl-black leading-relaxed">
          For commercial use — including consulting reports, pitch decks, media publications,
          and institutional research — contact us for licensing terms.
        </p>
        <p className="text-[16px] text-dwl-black font-medium mt-4">
          legal@dancingwithlions.com
        </p>
      </div>
    </div>
  )
}
