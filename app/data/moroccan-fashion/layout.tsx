import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Moroccan Fashion Intelligence — Caftan, Djellaba, Babouche | Dancing with Lions',
  description: 'Eight centuries of dress. Caftan (UNESCO 2025), djellaba, takchita, babouche. Sfifa, aakad, three embroidery schools. Contemporary designers. $4.25B textile industry.',
  openGraph: {
    title: 'Moroccan Fashion Intelligence | Dancing with Lions',
    description: 'The garments that dressed dynasties. Caftan to couture. Tradition to runway.',
    siteName: 'Dancing with Lions',
  },
}

export default function MoroccanFashionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
