import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Islamic Spain — 781 Years of Al-Andalus | Dancing with Lions',
  description: 'From the Umayyad crossing at Gibraltar to the fall of Granada — 781 years of Muslim rule on the Iberian Peninsula, mapped and measured.',
  openGraph: {
    title: 'Islamic Spain — 781 Years of Al-Andalus',
    description: '25 events, 22 cities, 8 key figures, and the territory chart of Muslim-held Iberia from 90% to zero. Interactive data story.',
    siteName: 'Dancing with Lions',
  },
}

export default function IslamicSpainLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
