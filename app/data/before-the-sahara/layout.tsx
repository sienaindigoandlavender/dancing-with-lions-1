import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Before the Sahara — Desertification & the Green Frontier | Dancing with Lions',
  description: 'Two-thirds of Morocco\'s oases have vanished. 93% of territory affected by desertification. NDVI vegetation data, climate zones, oasis collapse, and green belt projects mapped.',
  openGraph: {
    title: 'Before the Sahara | Dancing with Lions',
    description: 'The land between Atlas and sand. NDVI data 1984–2025, 6 threatened oases, 6 green projects, and a $2.1 billion annual cost.',
    siteName: 'Dancing with Lions',
  },
}

export default function BeforeTheSaharaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
