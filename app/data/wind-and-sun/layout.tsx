import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wind & Sun — Morocco Renewable Energy Radial Map — Dancing with Lions',
  description: 'Morocco\'s renewable energy installations mapped as radial blooms. 14 solar, wind, and hydro plants. 3.8GW installed capacity. Each bloom shows monthly output — the shape tells you when the energy flows. 52% renewable target by 2030.',
  openGraph: {
    title: 'Wind & Sun — Morocco\'s Renewable Energy',
    description: '3,000 hours of sun. 60% wind capacity factor. 14 installations mapped as radial blooms. The shape IS the energy.',
    siteName: 'Dancing with Lions',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
