import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Bread of Morocco — Khobz, Msemen, Baghrir, Rghaif, Harcha | Dancing with Lions',
  description: 'Eight breads that define a nation. Communal ovens, wheat dependency, bread etiquette. 60%+ of wheat imported. 9.6M tonnes annual demand. The sacred food.',
  openGraph: {
    title: 'The Bread of Morocco | Dancing with Lions',
    description: 'Khobz means bread. Khobz means livelihood. Khobz means life.',
    siteName: 'Dancing with Lions',
  },
}

export default function BreadOfMoroccoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
