import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trans-Saharan Trade Routes — Salt, Gold, Slaves, Manuscripts | Dancing with Lions',
  description: 'The ancient trade networks that built Timbuktu and Marrakech. Five routes, six commodities, ten cities mapped across 1,200 years of desert commerce.',
  openGraph: {
    title: 'Trans-Saharan Trade Routes | Dancing with Lions',
    description: 'Salt south, gold north. The desert economy that funded dynasties and spread Islam across Africa.',
    siteName: 'Dancing with Lions',
  },
}

export default function TransSaharanTradeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
