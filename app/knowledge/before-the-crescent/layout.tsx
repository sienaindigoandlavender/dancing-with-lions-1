import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Before the Crescent — Morocco Before Islam',
  description: '315,000 years of Morocco before Islam. Homo sapiens, Amazigh, Phoenicians, Carthage, Rome, Vandals, Byzantines. Six civilizations. The Amazigh outlasted them all.',
  robots: 'noindex, nofollow',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
