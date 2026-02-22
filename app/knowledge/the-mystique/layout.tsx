import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Mystique — A Map of the Luminous In-Between',
  description: 'Thin places, synchronicity, baraka, the unicorn frequency. The invisible architecture beneath Dancing with Lions.',
  robots: 'noindex, nofollow',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
