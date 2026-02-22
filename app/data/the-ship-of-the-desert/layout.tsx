import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Ship of the Desert — Dancing with Lions',
  description: 'Three camel species. Two trade routes. One animal that built civilisation across the most hostile terrain on earth. Dromedary vs Bactrian vs Wild Bactrian — 46 million years of evolution mapped from Morocco outward.',
  openGraph: {
    title: 'The Ship of the Desert — Dancing with Lions',
    description: 'Three camel species. Two trade routes. 40 million animals. 950 wild survivors. The data story of how a North American emigrant built the Silk Road and the Saharan caravans.',
    type: 'article',
    siteName: 'Dancing with Lions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ship of the Desert — Dancing with Lions',
    description: 'Three camel species. Two trade routes. 40 million animals. 950 wild survivors.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
