import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Green Sahara — When the Desert Was a Garden | Dancing with Lions',
  description: '11,000 years ago the Sahara was green. Rivers ran through it. Hippos swam in it. Lake Mega-Chad covered 400,000 km² — larger than all the Great Lakes combined. Then the earth wobbled, the monsoon shifted, and the garden became a desert. The diatoms that lived in Mega-Chad are now dust. That dust feeds the Amazon.',
  openGraph: {
    title: 'The Green Sahara',
    description: 'The world before the dust. 9 million km² of rivers, lakes, and grasslands — gone in centuries.',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
