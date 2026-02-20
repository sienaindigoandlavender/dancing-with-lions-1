import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Migration Routes Through Morocco — Human Mobility Intelligence | Dancing with Lions',
  description: 'Sub-Saharan migration, Spain crossings, transit cities, policy, human stories. Strait of Gibraltar. Ceuta and Melilla. SNIA regularisation. Atlantic route.',
  openGraph: {
    title: 'Migration Routes Through Morocco | Dancing with Lions',
    description: '13 kilometres between continents. 40,000 deaths since 2014. The human geography of crossing.',
    siteName: 'Dancing with Lions',
  },
}

export default function MigrationRoutesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
