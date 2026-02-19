import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Maghreb Compared — Dancing with Lions',
  description: 'Morocco, Tunisia, and Algeria side by side. Population, GDP, tourism, investment, and demographics visualized. © Dancing with Lions.',
}

export default function MaghrebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
