import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Phosphate Kingdom — Morocco\'s Geological Empire | Dancing with Lions',
  description: 'Morocco holds 70% of world phosphate reserves. OCP Group, Khouribga mines, Jorf Lasfar processing, global fertilizer flows. $9.76B revenue. The geology that feeds the planet.',
  openGraph: {
    title: 'The Phosphate Kingdom | Dancing with Lions',
    description: '5 mines, 2 processing hubs, 50 billion tonnes of reserves. How Morocco controls the mineral that feeds the world.',
    siteName: 'Dancing with Lions',
  },
}

export default function PhosphateKingdomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
