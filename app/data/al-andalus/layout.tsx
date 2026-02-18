import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Al-Andalus Corridor — Dancing with Lions',
  description: 'One continuous cultural bridge from Seville to Fes. Architecture, music, food, language — four layers of shared DNA across 800 years.',
  openGraph: {
    title: 'Al-Andalus Corridor — Dancing with Lions',
    description: 'Interactive cultural DNA map: trace the horseshoe arch, the Andalusi nuba, the Arabic loanwords, and the shared cuisine from Seville to Fes.',
    siteName: 'Dancing with Lions',
  },
}

export default function AlAndalusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
