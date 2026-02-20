import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morocco\'s Port Strategy — Tanger Med, Nador West Med, Dakhla | Dancing with Lions',
  description: '11.1M TEUs. 17th globally. From Tanger Med to Dakhla Atlantique. The infrastructure behind Morocco\'s transformation into Africa\'s trade gateway.',
  openGraph: {
    title: 'Morocco\'s Port Strategy | Dancing with Lions',
    description: 'Tanger Med, Nador West Med, Dakhla Atlantique, Casablanca, Jorf Lasfar. Container throughput and trade routes.',
    siteName: 'Dancing with Lions',
  },
}

export default function PortStrategyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
