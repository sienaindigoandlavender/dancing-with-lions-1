import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not All Desert Is Sand — Erg, Reg, Hammada, Oued | Dancing with Lions',
  description: 'Only 25% of the Sahara is sand. Four desert types: erg (dune sea), reg (gravel plain), hammada (rocky plateau), oued (dry valley). Morocco\'s Saharan margin.',
  openGraph: {
    title: 'Not All Desert Is Sand | Dancing with Lions',
    description: 'Erg, reg, hammada, oued. The four desert types. Only 25% of the Sahara is sand.',
    siteName: 'Dancing with Lions',
  },
}

export default function NotAllDesertIsSandLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
