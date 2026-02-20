import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Geometry of Zellige — Mathematics of Moroccan Tilework | Dancing with Lions',
  description: 'Star patterns, tessellation, 17 wallpaper groups, compass-and-straightedge construction. The mathematics behind Morocco\'s most iconic craft.',
  openGraph: {
    title: 'The Geometry of Zellige | Dancing with Lions',
    description: '5 star families, 4 symmetry types, 17 wallpaper groups. How Islamic geometry becomes Moroccan tilework.',
    siteName: 'Dancing with Lions',
  },
}

export default function GeometryZelligeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
