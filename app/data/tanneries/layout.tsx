import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Tanneries — 900 Years of Leather in Fez | Dancing with Lions',
  description: 'Chouara tannery. 1,200 stone basins. 500 master craftsmen. Natural dyes, manual process, medieval methods. The craft, the cost, the colour.',
  openGraph: {
    title: 'The Tanneries | Dancing with Lions',
    description: 'Fez Chouara. 86 workshops became 3. The leather that dressed the Islamic world.',
    siteName: 'Dancing with Lions',
  },
}

export default function TanneriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
