import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Where 17.4 Million Tourists Go — Dancing with Lions',
  description: 'Morocco tourism flow visualization: source countries → airports → destinations → spending categories. 17.4 million visitors in 2024, 112 billion MAD revenue.',
  openGraph: {
    title: 'Where 17.4 Million Tourists Go — Dancing with Lions',
    description: 'Follow the flow of 17.4 million visitors through Morocco. From Paris and Madrid to Marrakech and Agadir. From landing to spending.',
    siteName: 'Dancing with Lions',
  },
}

export default function TourismFlowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
