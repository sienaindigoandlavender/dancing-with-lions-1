import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Date Palm Oases — Draa, Ziz, Tafilalet | Dancing with Lions',
  description: 'Oasis ecology, 453 cultivars, Bayoud disease, khettara irrigation. 4.8 million palms, 10 million lost. The three-tier system that feeds the desert.',
  openGraph: {
    title: 'The Date Palm Oases | Dancing with Lions',
    description: 'Draa Valley, Ziz Valley, Tafilalet. The ecology, the threat, the resistance.',
    siteName: 'Dancing with Lions',
  },
}

export default function DatePalmOasesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
