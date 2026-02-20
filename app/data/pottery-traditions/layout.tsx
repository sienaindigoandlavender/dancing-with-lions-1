import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Pottery Traditions — Regional Ceramics of Morocco | Dancing with Lions',
  description: 'Fes blue, Safi polychrome, Tamegroute green, Rif Berber, Salé contemporary, Meknes zellige. Six regional pottery traditions mapped with production data, technique documentation, and interactive Mapbox.',
  openGraph: {
    title: 'The Pottery Traditions — Regional Ceramics of Morocco | Dancing with Lions',
    description: 'Six regional pottery traditions of Morocco mapped and documented. From 6,000-year-old Berber ceramics to the zellige masters of Meknes.',
    siteName: 'Dancing with Lions',
  },
}

export default function PotteryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
