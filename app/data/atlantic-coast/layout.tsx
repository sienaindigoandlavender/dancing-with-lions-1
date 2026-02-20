import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Atlantic Coast — Tangier to Dakhla | Dancing with Lions',
  description: '3,500 km of Atlantic coastline. 12 cities mapped. Africa\'s largest fishing industry, wind energy corridor, surf breaks, and a $1.6B port under construction.',
  openGraph: {
    title: 'The Atlantic Coast | Dancing with Lions',
    description: 'Tangier to Dakhla. Fishing ports, wind farms, surf breaks, and Morocco\'s gateway to West Africa.',
    siteName: 'Dancing with Lions',
  },
}

export default function AtlanticCoastLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
