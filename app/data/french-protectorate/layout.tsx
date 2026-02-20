import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The French Protectorate — 1912–1956 | Dancing with Lions',
  description: 'Treaty of Fez to independence. Lyautey, Henri Prost, the dual city. Abd el-Krim, Istiqlal, Mohammed V\'s exile. 44 years that shaped modern Morocco.',
  openGraph: {
    title: 'The French Protectorate | Dancing with Lions',
    description: '1912–1956. How France built the villes nouvelles, how Morocco won them back.',
    siteName: 'Dancing with Lions',
  },
}

export default function FrenchProtectorateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
