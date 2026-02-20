import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Islamic Spain — 781 Years of Al-Andalus | Dancing with Lions',
  description: 'From Tariq ibn Ziyad\'s 711 crossing to the fall of Granada in 1492. Interactive timeline and map of 781 years of Muslim rule in the Iberian Peninsula.',
  openGraph: {
    title: 'Islamic Spain — 781 Years of Al-Andalus | Dancing with Lions',
    description: 'Interactive timeline and Mapbox map: trace the conquest, golden age, and fall of Al-Andalus across 781 years of history.',
    siteName: 'Dancing with Lions',
  },
}

export default function IslamicSpainLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
