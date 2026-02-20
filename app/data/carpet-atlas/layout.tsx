import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Carpet Atlas — Regional Rug Traditions of Morocco | Dancing with Lions',
  description: '12 weaving traditions mapped. Beni Ourain, Azilal, Boujaad, Boucherouite, Kilim, Zanafi, Taznakht. Amazigh symbols, natural dyes, tribal origins.',
  openGraph: {
    title: 'The Carpet Atlas | Dancing with Lions',
    description: 'Every diamond is a womb. Every zigzag is water. Every rug is a diary. The complete map of Moroccan weaving traditions.',
    siteName: 'Dancing with Lions',
  },
}

export default function CarpetAtlasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
