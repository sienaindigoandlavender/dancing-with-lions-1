import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morocco\'s Musical Traditions — Gnawa, Andalusi, Amazigh, Chaabi, Raï | Dancing with Lions',
  description: 'Five traditions mapped by region and lineage. Gnawa trance, Andalusi nuba, Amazigh ahwash, Chaabi protest, Raï rebellion. Instruments, artists, rituals.',
  openGraph: {
    title: 'Morocco\'s Musical Traditions | Dancing with Lions',
    description: 'From the guembri of Essaouira to the oud of Fez to the bendir of the Atlas. The complete sound map.',
    siteName: 'Dancing with Lions',
  },
}

export default function MusicalTraditionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
