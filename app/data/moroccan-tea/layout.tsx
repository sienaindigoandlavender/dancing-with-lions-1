import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Anatomy of Moroccan Tea — Gunpowder, Mint, Sugar | Dancing with Lions',
  description: 'Chinese gunpowder green tea, fresh nanah mint, colonial sugar. How it arrived, how it\'s made, why it matters. Morocco imports 60,000 tonnes of tea a year and grows none.',
  openGraph: {
    title: 'The Anatomy of Moroccan Tea | Dancing with Lions',
    description: 'Three ingredients from three continents. How a diplomatic gift became a national ritual.',
    siteName: 'Dancing with Lions',
  },
}

export default function MoroccanTeaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
