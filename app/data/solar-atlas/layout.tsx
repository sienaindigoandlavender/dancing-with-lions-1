import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morocco\'s Solar Atlas — Noor Ouarzazate, MASEN, Renewable Ambition | Dancing with Lions',
  description: 'The world\'s largest CSP complex. Solar irradiance data. MASEN projects from Ouarzazate to Midelt. Morocco\'s path to 52% renewable energy by 2030.',
  openGraph: {
    title: 'Morocco\'s Solar Atlas | Dancing with Lions',
    description: '580 MW at Noor Ouarzazate. 2,500+ kWh/m²/yr DNI. The data behind Morocco\'s solar revolution.',
    siteName: 'Dancing with Lions',
  },
}

export default function SolarAtlasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
