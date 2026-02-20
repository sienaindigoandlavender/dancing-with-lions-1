import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Couscous Friday — The Sacred Meal | Dancing with Lions',
  description: 'Morocco\'s Friday ritual. Seven variations, six-step technique, the communal platter, life events, Maghreb styles. UNESCO 2020. Kseksu. Tfaya. Lben.',
  openGraph: {
    title: 'Couscous Friday | Dancing with Lions',
    description: 'The sacred Friday meal. Regional variations, three-steam technique, and the social contract around a shared dish.',
    siteName: 'Dancing with Lions',
  },
}

export default function CouscousFridayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
