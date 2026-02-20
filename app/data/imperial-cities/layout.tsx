import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Four Imperial Cities — Fez, Marrakech, Meknès, Rabat | Dancing with Lions',
  description: 'Each dynasty chose its capital. Seven dynasties, four cities, 1,233 years of power shifts mapped. The political architecture of Morocco.',
  openGraph: {
    title: 'The Four Imperial Cities | Dancing with Lions',
    description: 'Fez, Marrakech, Meknès, Rabat. Each dynasty chose its capital. The power map of Morocco.',
    siteName: 'Dancing with Lions',
  },
}

export default function ImperialCitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
