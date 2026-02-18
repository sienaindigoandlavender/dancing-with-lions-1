import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Dynamic import — Mapbox GL needs window
const MoroccoPopulationMap = dynamic(
  () => import('@/components/maps/MoroccoPopulationMap'),
  { ssr: false }
)

export const metadata: Metadata = {
  title: 'Morocco Population Density — Dancing with Lions',
  description: 'Interactive population density map of Morocco. 12 administrative regions visualized by population, density, urbanization, and area.',
}

const REGIONS = [
  { name: 'Casablanca-Settat', pop: '7.71M', density: 397, urban: 73.6, capital: 'Casablanca' },
  { name: 'Rabat-Salé-Kénitra', pop: '4.92M', density: 280, urban: 69.3, capital: 'Rabat' },
  { name: 'Marrakech-Safi', pop: '4.86M', density: 124, urban: 42.3, capital: 'Marrakech' },
  { name: 'Fès-Meknès', pop: '4.46M', density: 111, urban: 52.8, capital: 'Fès' },
  { name: 'Tanger-Tétouan-Al Hoceïma', pop: '3.82M', density: 253, urban: 61.5, capital: 'Tanger' },
  { name: 'Souss-Massa', pop: '2.92M', density: 57, urban: 48.2, capital: 'Agadir' },
  { name: 'Béni Mellal-Khénifra', pop: '2.59M', density: 91, urban: 40.1, capital: 'Béni Mellal' },
  { name: 'Oriental', pop: '2.43M', density: 29, urban: 63.4, capital: 'Oujda' },
  { name: 'Drâa-Tafilalet', pop: '1.78M', density: 20, urban: 31.6, capital: 'Errachidia' },
  { name: 'Guelmim-Oued Noun', pop: '0.53M', density: 11, urban: 55.8, capital: 'Guelmim' },
  { name: 'Laâyoune-Sakia El Hamra', pop: '0.42M', density: 3, urban: 93.2, capital: 'Laâyoune' },
  { name: 'Dakhla-Oued Ed-Dahab', pop: '0.21M', density: 1, urban: 82.7, capital: 'Dakhla' },
]

export default function MoroccoPopulationPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="max-w-wide mx-auto px-6 md:px-10 pt-section pb-12">
        <p className="micro-label mb-4">Data Module 002</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] text-dwl-black leading-[0.95]">
          Morocco<br /><em>Population Density</em>
        </h1>
        <p className="text-body text-dwl-body mt-6 max-w-[580px]">
          37.4 million people across 12 administrative regions. The majority concentrated
          along the Atlantic coast between Casablanca and Tanger. Hover or tap any region
          for detail.
        </p>
      </section>

      {/* Map — full width */}
      <section className="w-full">
        <MoroccoPopulationMap />
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10 mt-section"><div className="border-t border-dwl-border" /></div>

      {/* Big Numbers */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-dwl-border">
          {[
            { number: '37.4M', label: 'Total population' },
            { number: '84', label: 'People per km²' },
            { number: '68%', label: 'Urban population' },
            { number: '30.1', label: 'Median age' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 md:p-8 text-center">
              <p className="font-serif text-[36px] md:text-[48px] text-dwl-black leading-none italic">
                {stat.number}
              </p>
              <p className="text-[11px] uppercase tracking-[0.08em] text-dwl-gray mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* Regional Breakdown */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <p className="micro-label mb-8">By Region</p>

        {/* Header */}
        <div className="hidden md:grid grid-cols-[1fr_100px_100px_100px_120px] gap-4 border-b-2 border-dwl-black pb-3">
          <span className="text-[11px] uppercase tracking-[0.08em] text-dwl-gray font-medium">Region</span>
          <span className="text-[11px] uppercase tracking-[0.08em] text-dwl-gray font-medium text-right">Population</span>
          <span className="text-[11px] uppercase tracking-[0.08em] text-dwl-gray font-medium text-right">Density</span>
          <span className="text-[11px] uppercase tracking-[0.08em] text-dwl-gray font-medium text-right">Urban %</span>
          <span className="text-[11px] uppercase tracking-[0.08em] text-dwl-gray font-medium text-right">Capital</span>
        </div>

        {/* Rows */}
        {REGIONS.map((region, i) => (
          <div key={region.name} className={`grid grid-cols-1 md:grid-cols-[1fr_100px_100px_100px_120px] gap-2 md:gap-4 py-4 border-b border-dwl-border ${i % 2 !== 0 ? 'bg-dwl-offwhite md:bg-transparent' : ''}`}>
            <div className="flex items-baseline gap-3">
              <span className="text-[11px] text-dwl-muted font-medium tabular-nums w-5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[14px] text-dwl-black font-semibold">{region.name}</span>
            </div>
            <span className="text-[14px] text-dwl-black tabular-nums md:text-right pl-8 md:pl-0">{region.pop}</span>
            <div className="md:text-right pl-8 md:pl-0 flex items-center md:justify-end gap-2">
              <span className="text-[14px] text-dwl-black tabular-nums">{region.density}/km²</span>
              {/* Mini density bar */}
              <div className="w-[60px] h-[4px] bg-dwl-light overflow-hidden hidden md:block">
                <div
                  className="h-full bg-dwl-black"
                  style={{ width: `${Math.min((region.density / 400) * 100, 100)}%` }}
                />
              </div>
            </div>
            <span className="text-[14px] text-dwl-black tabular-nums md:text-right pl-8 md:pl-0">{region.urban}%</span>
            <span className="text-[13px] text-dwl-gray md:text-right pl-8 md:pl-0">{region.capital}</span>
          </div>
        ))}
      </section>

      {/* Sources + Copyright */}
      <section className="bg-dwl-offwhite">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
          <div className="max-w-[640px]">
            <p className="micro-label mb-4">Sources</p>
            <div className="space-y-2">
              <p className="text-[12px] text-dwl-gray">Haut-Commissariat au Plan du Maroc — Recensement Général de la Population et de l&apos;Habitat (2024)</p>
              <p className="text-[12px] text-dwl-gray">World Bank — World Development Indicators (2024)</p>
              <p className="text-[12px] text-dwl-gray">UN Population Division — World Population Prospects: The 2024 Revision</p>
            </div>

            <div className="mt-8 pt-6 border-t border-dwl-border">
              <p className="text-[12px] text-dwl-black font-medium">
                &copy; {new Date().getFullYear()} Dancing with Lions. All rights reserved.
              </p>
              <p className="text-[12px] text-dwl-gray mt-1">
                Map and data visualization may not be reproduced without visible attribution.
              </p>
              <p className="font-serif text-[16px] text-dwl-black italic mt-2">
                Source: Dancing with Lions
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="/data"
                className="text-meta uppercase tracking-[0.08em] font-medium text-dwl-black border-b border-dwl-black pb-1 hover:opacity-60 transition-opacity"
              >
                ← All Data Modules
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
