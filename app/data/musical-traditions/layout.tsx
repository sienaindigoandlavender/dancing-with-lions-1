import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morocco\'s Musical Traditions — Gnawa, Andalusi, Amazigh, Chaabi, Raï | Dancing with Lions',
  description: 'Five traditions mapped by region and lineage. Gnawa trance, Andalusi nuba, Amazigh ahwash, Chaabi street, Raï rebellion. Instruments, masters, festivals.',
  openGraph: {
    title: 'Morocco\'s Musical Traditions | Dancing with Lions',
    description: 'From Gnawa healing ceremonies to Andalusi court suites. Five musical traditions that map Morocco\'s soul.',
    siteName: 'Dancing with Lions',
  },
}

export default function MusicalTraditionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
