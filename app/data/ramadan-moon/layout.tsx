import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ramadan & the Moon — Dancing with Lions',
  description: 'How the lunar calendar shapes Ramadan. 30 moon phases, the 33-year seasonal rotation, and fasting hours across decades — visualized for Marrakech.',
  openGraph: {
    title: 'Ramadan & the Moon — Dancing with Lions',
    description: 'The Islamic calendar is purely lunar. Ramadan drifts backward through the seasons, completing a full rotation every 33 years.',
    type: 'article',
  },
}

export default function RamadanMoonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
