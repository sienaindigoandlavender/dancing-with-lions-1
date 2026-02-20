import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cannabis & the Rif — Morocco\'s Other Cash Crop | Dancing with Lions',
  description: 'The Rif Mountains produce 70% of Europe\'s hashish. 400,000+ people in the trade. Five centuries of cultivation. Law 13-21 legalization. History, economics, geography.',
  openGraph: {
    title: 'Cannabis & the Rif | Dancing with Lions',
    description: 'From Sultan Hassan I\'s 1890 tribal privileges to Law 13-21. The economics, history, and politics of Morocco\'s most controversial crop.',
    siteName: 'Dancing with Lions',
  },
}

export default function CannabisRifLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
