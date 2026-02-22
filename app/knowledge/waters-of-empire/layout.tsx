import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waters of Empire — How Rome Exported Bathing Culture',
  description: 'The hammam is not Arab. It is Roman — inherited, transformed, and kept alive while Europe forgot how to wash. From thermae to hammam across 2,600 years.',
  robots: 'noindex, nofollow',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
