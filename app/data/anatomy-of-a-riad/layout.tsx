import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Anatomy of a Riad — Deconstructing the Moroccan House Form | Dancing with Lions',
  description: 'Courtyard, fountain, zellige, tadelakt, moucharabieh, cedar, gebs. 12 architectural elements, 6 climate systems, 8 vocabulary terms. How a Moroccan riad works.',
  openGraph: {
    title: 'The Anatomy of a Riad | Dancing with Lions',
    description: '12 elements, 6 passive climate systems, 0 street-facing windows. The architecture of privacy, paradise, and thermal engineering.',
    siteName: 'Dancing with Lions',
  },
}

export default function AnatomyOfARiadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
