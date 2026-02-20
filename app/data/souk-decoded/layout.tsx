import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Souk Decoded — How a Moroccan Market Works | Dancing with Lions',
  description: 'Guilds, spatial logic, negotiation patterns, the Amine, the Mohtasib. 18 named souks mapped. 40,000 artisans. How a medina market is really organized.',
  openGraph: {
    title: 'The Souk Decoded | Dancing with Lions',
    description: '18 souks, 5 guild ranks, 7 negotiation steps, 6 spatial rules. The operating system of a Moroccan market.',
    siteName: 'Dancing with Lions',
  },
}

export default function SoukDecodedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
