import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '37.8 Million People — Morocco Population Density 3D — Dancing with Lions',
  description: 'Morocco population density as a 3D bar map. Each grid cell extruded by people per square kilometre. The Atlantic corridor, the empty Sahara, the Casablanca megacity. Interactive, draggable.',
  openGraph: {
    title: '37.8 Million People — Morocco 3D Population Density',
    description: 'Every grid cell of Morocco extruded by population density. The Atlantic corridor vs. the empty south.',
    siteName: 'Dancing with Lions',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
