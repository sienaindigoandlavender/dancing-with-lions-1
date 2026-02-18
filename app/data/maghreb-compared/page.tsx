import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Maghreb Compared — Dancing with Lions',
  description: 'Morocco, Tunisia, and Algeria side by side. Population, GDP, tourism, investment, and demographics in one structured overview.',
}

// ─── Data sourced from World Bank, IMF, UNWTO (2024) ───

interface CountryData {
  name: string
  flag: string
  capital: string
  population: string
  populationGrowth: string
  medianAge: string
  urbanization: string
  gdp: string
  gdpPerCapita: string
  gdpGrowth: string
  unemployment: string
  inflation: string
  fdiPercent: string
  debtToGdp: string
  touristArrivals: string
  tourismGdp: string
  internet: string
  remittances: string
  topExport: string
  hdi: string
  womenInParliament: string
  co2PerCapita: string
  electricity: string
  languages: string
}

const COUNTRIES: CountryData[] = [
  {
    name: 'Morocco',
    flag: '🇲🇦',
    capital: 'Rabat',
    population: '38.7M',
    populationGrowth: '1.0%',
    medianAge: '30.0',
    urbanization: '65%',
    gdp: '$160.6B',
    gdpPerCapita: '$4,153',
    gdpGrowth: '3.8%',
    unemployment: '13.0%',
    inflation: '1.1%',
    fdiPercent: '1.0%',
    debtToGdp: '67.7%',
    touristArrivals: '14.5M',
    tourismGdp: '~7%',
    internet: '91%',
    remittances: '7.8%',
    topExport: 'Automotive, phosphates',
    hdi: '0.698 (120th)',
    womenInParliament: '24%',
    co2PerCapita: '1.8t',
    electricity: '100%',
    languages: 'Arabic, Amazigh, French, Darija',
  },
  {
    name: 'Tunisia',
    flag: '🇹🇳',
    capital: 'Tunis',
    population: '12.4M',
    populationGrowth: '0.6%',
    medianAge: '33.4',
    urbanization: '70%',
    gdp: '$51.3B',
    gdpPerCapita: '$4,142',
    gdpGrowth: '1.6%',
    unemployment: '16.2%',
    inflation: '7.2%',
    fdiPercent: '1.5%',
    debtToGdp: '80.2%',
    touristArrivals: '10.3M',
    tourismGdp: '~14%',
    internet: '72%',
    remittances: '6.3%',
    topExport: 'Textiles, olive oil',
    hdi: '0.731 (101st)',
    womenInParliament: '16%',
    co2PerCapita: '2.6t',
    electricity: '100%',
    languages: 'Arabic, French, Tunisian Arabic',
  },
  {
    name: 'Algeria',
    flag: '🇩🇿',
    capital: 'Algiers',
    population: '46.8M',
    populationGrowth: '1.4%',
    medianAge: '28.9',
    urbanization: '75%',
    gdp: '$269.3B',
    gdpPerCapita: '$5,753',
    gdpGrowth: '3.7%',
    unemployment: '12.3%',
    inflation: '4.3%',
    fdiPercent: '0.5%',
    debtToGdp: '67.0%',
    touristArrivals: '~0.2M',
    tourismGdp: '~1%',
    internet: '77%',
    remittances: '0.9%',
    topExport: 'Hydrocarbons (89%)',
    hdi: '0.745 (93rd)',
    womenInParliament: '8%',
    co2PerCapita: '3.7t',
    electricity: '99.8%',
    languages: 'Arabic, Amazigh, French',
  },
]

interface RowDef {
  label: string
  key: keyof CountryData
  category: string
}

const ROWS: RowDef[] = [
  { label: 'Capital', key: 'capital', category: 'Basics' },
  { label: 'Population', key: 'population', category: 'Basics' },
  { label: 'Population growth', key: 'populationGrowth', category: 'Basics' },
  { label: 'Median age', key: 'medianAge', category: 'Basics' },
  { label: 'Urbanization', key: 'urbanization', category: 'Basics' },
  { label: 'Languages', key: 'languages', category: 'Basics' },
  { label: 'GDP (nominal)', key: 'gdp', category: 'Economy' },
  { label: 'GDP per capita', key: 'gdpPerCapita', category: 'Economy' },
  { label: 'GDP growth', key: 'gdpGrowth', category: 'Economy' },
  { label: 'Unemployment', key: 'unemployment', category: 'Economy' },
  { label: 'Inflation', key: 'inflation', category: 'Economy' },
  { label: 'FDI (% of GDP)', key: 'fdiPercent', category: 'Economy' },
  { label: 'Debt-to-GDP', key: 'debtToGdp', category: 'Economy' },
  { label: 'Top export', key: 'topExport', category: 'Economy' },
  { label: 'Remittances (% GDP)', key: 'remittances', category: 'Economy' },
  { label: 'Tourist arrivals', key: 'touristArrivals', category: 'Tourism & Openness' },
  { label: 'Tourism (% GDP)', key: 'tourismGdp', category: 'Tourism & Openness' },
  { label: 'Internet users', key: 'internet', category: 'Tourism & Openness' },
  { label: 'HDI', key: 'hdi', category: 'Development' },
  { label: 'Women in parliament', key: 'womenInParliament', category: 'Development' },
  { label: 'CO₂ per capita', key: 'co2PerCapita', category: 'Development' },
  { label: 'Electricity access', key: 'electricity', category: 'Development' },
]

export default function MaghrebComparedPage() {
  let currentCategory = ''

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="max-w-wide mx-auto px-6 md:px-10 pt-section pb-16">
        <p className="micro-label mb-4">Data Module 001</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] text-dwl-black leading-[0.95]">
          The Maghreb<br /><em>Compared</em>
        </h1>
        <p className="text-body text-dwl-body mt-6 max-w-[580px]">
          Morocco, Tunisia, and Algeria — side by side. The overview that doesn&apos;t exist anywhere
          in one clean place. Every number sourced from the World Bank, IMF, and UN data (2024).
        </p>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* Big Numbers */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="grid grid-cols-3 gap-px bg-dwl-border">
          {COUNTRIES.map((country) => (
            <div key={country.name} className="bg-white p-6 md:p-10 text-center">
              <p className="text-[32px] md:text-[40px] mb-2">{country.flag}</p>
              <p className="font-serif text-[28px] md:text-[36px] text-dwl-black italic leading-none">
                {country.name}
              </p>
              <div className="mt-6">
                <p className="font-serif text-[48px] md:text-[64px] text-dwl-black leading-none italic">
                  {country.population}
                </p>
                <p className="text-[11px] uppercase tracking-[0.08em] text-dwl-gray mt-1">Population</p>
              </div>
              <div className="mt-6">
                <p className="font-serif text-[36px] md:text-[48px] text-dwl-black leading-none italic">
                  {country.gdp}
                </p>
                <p className="text-[11px] uppercase tracking-[0.08em] text-dwl-gray mt-1">GDP (nominal)</p>
              </div>
              <div className="mt-6">
                <p className="font-serif text-[28px] md:text-[36px] text-dwl-black leading-none italic">
                  {country.touristArrivals}
                </p>
                <p className="text-[11px] uppercase tracking-[0.08em] text-dwl-gray mt-1">Tourist arrivals</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* Comparison Table */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <p className="micro-label mb-8">Full Comparison</p>

        {/* Header row */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-0 border-b-2 border-dwl-black pb-3 mb-0">
          <div className="text-[11px] uppercase tracking-[0.08em] text-dwl-gray font-medium">Indicator</div>
          {COUNTRIES.map((c) => (
            <div key={c.name} className="text-[13px] font-bold text-dwl-black text-right md:text-left">
              {c.flag} {c.name}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {ROWS.map((row, i) => {
          const showCategory = row.category !== currentCategory
          currentCategory = row.category

          return (
            <div key={row.key}>
              {showCategory && (
                <div className="pt-8 pb-3 border-b border-dwl-black">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-dwl-black font-bold">
                    {row.category}
                  </p>
                </div>
              )}
              <div className={`grid grid-cols-[1fr_1fr_1fr_1fr] gap-0 py-3 border-b border-dwl-border ${
                i % 2 === 0 ? '' : 'bg-dwl-offwhite'
              }`}>
                <div className="text-[13px] text-dwl-gray pr-4">{row.label}</div>
                {COUNTRIES.map((c) => (
                  <div key={c.name} className="text-[13px] text-dwl-black font-medium text-right md:text-left tabular-nums">
                    {c[row.key]}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* Key Insight */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        <div className="max-w-[640px]">
          <p className="micro-label mb-4">The Opportunity</p>
          <p className="font-serif text-[24px] md:text-[28px] text-dwl-black leading-[1.45] italic">
            Nearly 100 million people. Three economies. One region. Almost no structured data infrastructure connecting them.
          </p>
          <p className="text-body text-dwl-body leading-relaxed mt-6">
            The Maghreb represents one of the most data-underserved regions relative to its economic
            weight. Each country has distinct strengths and trajectories. Understanding them individually
            and as a connected region is essential for anyone making decisions about North Africa —
            whether in investment, policy, culture, or technology.
          </p>
        </div>
      </section>

      {/* Sources + Copyright */}
      <section className="bg-dwl-offwhite">
        <div className="max-w-wide mx-auto px-6 md:px-10 py-section-sm">
          <div className="max-w-[640px]">
            <p className="micro-label mb-4">Sources</p>
            <div className="space-y-2">
              {[
                'World Bank Open Data (2024)',
                'IMF World Economic Outlook (October 2025)',
                'UNDP Human Development Report (2024)',
                'UN World Tourism Organization (2024)',
                'UN Population Division — World Population Prospects (2024 Revision)',
              ].map((source, i) => (
                <p key={i} className="text-[12px] text-dwl-gray">{source}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-dwl-border">
              <p className="text-[12px] text-dwl-black font-medium">
                &copy; {new Date().getFullYear()} Dancing with Lions. All rights reserved.
              </p>
              <p className="text-[12px] text-dwl-gray mt-1">
                This data comparison may not be reproduced without visible attribution.
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
