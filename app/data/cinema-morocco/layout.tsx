import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cinema Morocco — Ouarzawood, Atlas Studios, Game of Thrones | Dancing with Lions',
  description: 'Six decades. 20+ blockbusters. The world\'s largest film studio. From Lawrence of Arabia to Gladiator II — Morocco\'s cinema economy.',
  openGraph: {
    title: 'Cinema Morocco | Dancing with Lions',
    description: 'Atlas Studios, Ouarzazate. Game of Thrones, Gladiator, Kingdom of Heaven. 30% cash rebate. The Hollywood of Africa.',
    siteName: 'Dancing with Lions',
  },
}

export default function CinemaMoroccoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
