import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Lion\'s Road — How an Animal That Never Lived in China Became Its Guardian | Dancing with Lions',
  description: 'The Asiatic lion once ranged from Greece to India. It never reached China. But through the Silk Road, Buddhism, and 2,000 years of reimagining, China built the most prolific lion culture on earth — from an animal it had never seen. A data story.',
  openGraph: {
    title: 'The Lion\'s Road',
    description: 'How an animal that never lived in China became the guardian of its civilisation.',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
