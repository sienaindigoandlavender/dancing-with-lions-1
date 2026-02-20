import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Olive Oil Economy — Regions, Production, Cooperatives & Export Markets | Dancing with Lions',
  description: 'Morocco\'s 1.2 million hectares of olive trees mapped. Production data, Picholine Marocaine dominance, women-led cooperatives, US tariff advantage, and drought resilience.',
  openGraph: {
    title: 'The Olive Oil Economy | Dancing with Lions',
    description: 'From Volubilis to global markets. Six olive regions, four cultivars, and the data behind Morocco\'s green gold.',
    siteName: 'Dancing with Lions',
  },
}

export default function OliveOilEconomyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
