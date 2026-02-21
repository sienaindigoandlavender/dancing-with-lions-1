import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waters of Empire — How Rome Exported Bathing Culture | Dancing with Lions',
  description: 'The hammam is not Arab. It is Roman — inherited, transformed, and kept alive while Europe forgot how to wash. From thermae to hammam across 2,600 years.',
  openGraph: {
    title: 'Waters of Empire — How Rome Exported Bathing Culture',
    description: 'From Roman thermae to Islamic hammam. 15 archaeological sites, 6 civilizations, 2,600 years. The three-room sequence never changed.',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
