import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Before the Crescent — Morocco Before Islam | Dancing with Lions',
  description: '315,000 years of Morocco before Islam. Homo sapiens, Amazigh, Phoenicians, Carthage, Rome, Vandals, Byzantines. Six civilizations. The Amazigh outlasted them all.',
  openGraph: {
    title: 'Before the Crescent — Morocco Before Islam',
    description: '315,000 years. Six civilizations. Each one left a layer. The Amazigh outlasted them all.',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
