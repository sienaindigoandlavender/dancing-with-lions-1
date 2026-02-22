import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Churches That Swallowed the Mountain — Lalibela | Dancing with Lions',
  description: 'Eleven churches carved downward into living rock by the dynasty the Solomonic myth was written to erase. 800 years later, they are still holding services.',
  openGraph: {
    title: 'The Churches That Swallowed the Mountain',
    description: 'Lalibela, the Zagwe Dynasty, and the architecture that survived its own erasure.',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
