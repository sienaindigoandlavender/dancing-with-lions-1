import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Gnawa Atlas — Spiritual Music Tradition | Dancing with Lions',
  description: 'Maalem lineages, lila ceremony, guembri construction, seven spirit colours, UNESCO 2019. From West African slavery to Morocco\'s most powerful spiritual music.',
  openGraph: {
    title: 'The Gnawa Atlas | Dancing with Lions',
    description: 'Seven colours. Seven spirits. One guembri. 500 years of trance, healing, and survival.',
    siteName: 'Dancing with Lions',
  },
}

export default function GnawaAtlasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
