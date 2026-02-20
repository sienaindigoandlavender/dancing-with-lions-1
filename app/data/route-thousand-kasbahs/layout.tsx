import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Route of a Thousand Kasbahs — Aït Benhaddou to Skoura | Dancing with Lions',
  description: 'Fortified mud-brick architecture of the Drâa-Tafilalet. 4,000+ earthen settlements. Aït Benhaddou, Telouet, Taourirt, Amridil. The Glaoui dynasty. 370km from Atlas to Sahara.',
  openGraph: {
    title: 'The Route of a Thousand Kasbahs | Dancing with Lions',
    description: 'The architecture that rises from the earth it stands on. Rammed earth, Amazigh geometry, Glaoui power, Hollywood\'s desert.',
    siteName: 'Dancing with Lions',
  },
}

export default function RouteThousandKasbahsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
