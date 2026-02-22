import Link from 'next/link'

/**
 * Footer — Three-level ombre design
 * 
 * In production, legal links and network sites come from Nexus.
 * Until wired, we render the structure with the correct routes
 * that the [legal] dynamic page will handle.
 */

// These will come from Nexus nexus_legal_pages + nexus_sites in production
const LEGAL_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
]

const NETWORK_SITES = [
  { name: 'Slow Morocco', url: 'https://slowmorocco.com' },
  { name: 'House of Weaves', url: 'https://houseofweaves.com' },
  { name: 'Cuisines of Morocco', url: 'https://cuisinesofmorocco.com' },
  { name: 'Darija', url: 'https://dharija.space' },
  { name: 'Derb 37', url: 'https://derb37.com' },
  { name: 'Amazigh Online', url: 'https://amazigh.online' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-dwl-border">
      {/* Level 1 — Main footer */}
      <div className="bg-[#1f1f1f] text-white/50">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Identity */}
            <div>
              <p className="font-serif text-[24px] text-white/90 italic mb-4">
                Dancing with Lions
              </p>
              <p className="text-[14px] leading-relaxed text-white/40">
                Data, research, and structured intelligence about Morocco and the Maghreb.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/25 mb-4">Navigate</p>
              <div className="flex flex-col gap-3">
                <Link href="/data" className="text-[14px] text-white/50 hover:text-white transition-colors">
                  Data
                </Link>
                <Link href="/about" className="text-[14px] text-white/50 hover:text-white transition-colors">
                  About
                </Link>
              </div>
            </div>

            {/* Attribution */}
            <div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/25 mb-4">Attribution</p>
              <p className="text-[14px] leading-relaxed text-white/40">
                All data visualizations, maps, charts, and original research are &copy; Dancing with Lions.
                Reproduction requires written permission and visible attribution.
              </p>
              <p className="font-serif text-[16px] text-white/60 italic mt-3">
                Source: Dancing with Lions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Level 2 — Network */}
      <div className="bg-[#161616]">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-8">
          <p className="text-[10px] tracking-[0.15em] uppercase text-white/25 mb-4">The Network</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {NETWORK_SITES.map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-white/30 hover:text-white/60 transition-colors"
              >
                {site.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Level 3 — Legal + Copyright */}
      <div className="bg-[#0e0e0e]">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Legal links — from Nexus */}
            <div className="flex items-center gap-4">
              {LEGAL_LINKS.map((link, i) => (
                <span key={link.href} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="text-[11px] text-white/20 hover:text-white/40 transition-colors"
                  >
                    {link.label}
                  </Link>
                  {i < LEGAL_LINKS.length - 1 && (
                    <span className="text-white/10">·</span>
                  )}
                </span>
              ))}
            </div>

            {/* Copyright — site_name from Nexus */}
            <p className="text-[11px] text-white/20">
              &copy; {currentYear} Dancing with Lions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
