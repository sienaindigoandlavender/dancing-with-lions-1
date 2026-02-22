import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Last Lions — The Atlas Lion, from Roman Arena to Royal Zoo | Dancing with Lions',
  description: 'The Barbary lion ruled North Africa for 100,000 years. Romans dragged thousands to the Colosseum. Moroccan kings kept them as symbols of power. By 1942, the last one was shot in the Atlas Mountains. ~90 descendants survive in zoos. This is their map.',
  openGraph: {
    title: 'The Last Lions',
    description: 'The Atlas lion. From the Colosseum to extinction to the royal zoo. A data story.',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
