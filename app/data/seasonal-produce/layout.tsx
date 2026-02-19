import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Grows When — Dancing with Lions',
  description: 'Seasonal calendar of Moroccan fruits and vegetables. 32 crops mapped across 12 months with Darija names, growing regions, and peak seasons. Interactive radial wheel + illustrated guide.',
  openGraph: {
    title: 'What Grows When — Dancing with Lions',
    description: 'The souk calendar. 32 Moroccan fruits and vegetables by season with Darija names and growing regions.',
    siteName: 'Dancing with Lions',
  },
}

export default function SeasonalProduceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
