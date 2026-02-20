import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Argan Triangle — UNESCO Biosphere, Cooperatives, Oil Economy | Dancing with Lions',
  description: '830,000 hectares. 20 million trees. The only place on earth argan grows. Cooperatives, cosmetics, cooking — the women-led economy of liquid gold.',
  openGraph: {
    title: 'The Argan Triangle | Dancing with Lions',
    description: 'UNESCO biosphere reserve. 20 million trees. 688 women\'s cooperatives. Morocco\'s liquid gold economy.',
    siteName: 'Dancing with Lions',
  },
}

export default function ArganTriangleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
