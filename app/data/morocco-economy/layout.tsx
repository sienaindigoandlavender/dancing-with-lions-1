import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morocco Economy in One Page — Dancing with Lions',
  description: 'GDP, exports, FDI, tourism, remittances, key sectors. The essential economic snapshot of Morocco, updated annually. Data from IMF, World Bank, HCP, Office des Changes.',
  openGraph: {
    title: 'Morocco Economy in One Page — Dancing with Lions',
    description: 'The essential economic snapshot every journalist grabs. GDP $183B, automotive exports #1, 17.4M tourists, $12.4B tourism revenue, $11.9B diaspora remittances.',
    siteName: 'Dancing with Lions',
  },
}

export default function MoroccoEconomyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
