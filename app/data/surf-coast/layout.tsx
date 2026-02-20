import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morocco\'s Surf Coast — 15 Breaks Mapped | Dancing with Lions',
  description: 'Anchor Point, Killer Point, The Bay, Sidi Kaouki, Safi. 15 surf breaks mapped with swell data, season guide, and the economics of Morocco\'s surf boom.',
  openGraph: {
    title: 'Morocco\'s Surf Coast | Dancing with Lions',
    description: 'From Safi to Sidi Kaouki — 15 surf spots, swell conditions, seasonal guide, and the $50K-guest-per-year surf economy of Taghazout.',
    siteName: 'Dancing with Lions',
  },
}

export default function SurfCoastLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
