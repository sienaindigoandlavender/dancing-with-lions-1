import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '2030 World Cup Infrastructure Map — Morocco, Spain, Portugal — Dancing with Lions',
  description: 'Every stadium, highway, rail line, airport, and hotel project for the 2030 FIFA World Cup across Morocco, Spain, and Portugal. 20 stadiums, 17 cities, $41B in infrastructure. Construction status, budgets, timelines. Updated quarterly.',
  openGraph: {
    title: '2030 World Cup Infrastructure Map',
    description: '20 stadiums across 17 cities. $41B in Moroccan infrastructure. The complete picture of the first World Cup across two continents.',
    siteName: 'Dancing with Lions',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
