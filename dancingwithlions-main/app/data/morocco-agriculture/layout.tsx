import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morocco Agricultural Exports — Dancing with Lions',
  description: 'What Morocco grows and sends to the world. Tomatoes, berries, citrus, olives, argan oil, seafood — illustrated export data by value.',
  openGraph: {
    title: 'Morocco Agricultural Exports — Dancing with Lions',
    description: 'Illustrated chart: $6.5B in agri-food and seafood exports. Tomatoes, berries, citrus, olives, argan, avocados, sardines. The #1 non-EU supplier to Europe.',
    siteName: 'Dancing with Lions',
  },
}

export default function MoroccoAgricultureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
