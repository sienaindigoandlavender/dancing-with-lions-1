import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Moroccan Wedding — A Multi-Day Atlas | Dancing with Lions',
  description: 'Seven days, seven outfits. The khotba, hammam, henna night, hdiyya, contract, amariya entrance, and the feast. Regional variations, key roles, bridal wardrobe, and cost breakdown.',
  openGraph: {
    title: 'The Moroccan Wedding | Dancing with Lions',
    description: 'A multi-day ceremony mapped: henna night to dawn feast. 7 bridal outfits, 6 regional traditions, the negafa, the amariya, and what it all costs.',
    siteName: 'Dancing with Lions',
  },
}

export default function WeddingAtlasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
