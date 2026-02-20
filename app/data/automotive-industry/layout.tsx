import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morocco\'s Automotive Revolution — Africa\'s #1 Producer | Dancing with Lions',
  description: 'Renault Tangier, Stellantis Kenitra, SOMACA Casablanca. How Morocco became Africa\'s largest car producer and the EU\'s top automotive exporter. Production data, supplier ecosystem, export markets, EV investments.',
  openGraph: {
    title: 'Morocco\'s Automotive Revolution | Dancing with Lions',
    description: 'From 35 suppliers in 2000 to 270+ in 2025. $17B in exports. 1M+ vehicle capacity. The data behind Africa\'s automotive powerhouse.',
    siteName: 'Dancing with Lions',
  },
}

export default function AutomotiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
