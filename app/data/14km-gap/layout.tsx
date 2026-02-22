import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The 14km Gap — Morocco vs Spain Across the Strait — Dancing with Lions',
  description: 'Morocco and Spain separated by 14 kilometres of water. 18 metrics compared side by side — GDP, life expectancy, tourism, infrastructure, education. The gap between the two shores visualized as tension threads. The wider the space, the deeper the divide.',
  openGraph: {
    title: 'The 14km Gap — Morocco vs Spain',
    description: '14km of water. 5.3× GDP per capita gap. 18 metrics. The inequality between two World Cup co-hosts, visualized.',
    siteName: 'Dancing with Lions',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
