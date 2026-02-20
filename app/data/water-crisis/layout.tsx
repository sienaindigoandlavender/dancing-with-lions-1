import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morocco\'s Water Crisis — & the Rains That Broke It | Dancing with Lions',
  description: 'Seven years of drought (2018–2025), then the rains came. Dam fill rates, basin-by-basin recovery, desalination mega-projects, and the structural crisis that remains.',
  openGraph: {
    title: 'Morocco\'s Water Crisis | Dancing with Lions',
    description: 'From 28% to 70.7% — Morocco\'s dam recovery in 12 months. But the water crisis isn\'t over.',
    siteName: 'Dancing with Lions',
  },
}

export default function WaterCrisisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
