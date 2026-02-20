import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Gardens of Morocco — Landscape & Water Intelligence | Dancing with Lions',
  description: 'Majorelle, Agdal, Menara, Jnan Sbil. Islamic garden design principles. Khettara water systems. Almohad engineering. UNESCO heritage. 500 hectares of productive paradise.',
  openGraph: {
    title: 'The Gardens of Morocco | Dancing with Lions',
    description: 'Four gardens, nine centuries. Water as sacred element. Geometry as divine order. The garden as earthly paradise.',
    siteName: 'Dancing with Lions',
  },
}

export default function GardensOfMoroccoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
