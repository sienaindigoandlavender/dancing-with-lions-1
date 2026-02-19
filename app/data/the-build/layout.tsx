import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Build — Morocco Infrastructure Timeline 2004–2030 — Dancing with Lions',
  description: 'Watch Morocco construct itself. 27 years of infrastructure: highways from 560km to 3,000km, Africa\'s first high-speed rail, airport capacity doubled, hotel rooms tripled, tourist arrivals from 5.5M to 26M. Animated timeline. Press play.',
  openGraph: {
    title: 'The Build — Watch Morocco Construct Itself',
    description: 'Highway km. Rail km. Airport capacity. Hotel rooms. Tourist arrivals. 27 years, animated. Then the World Cup ramp goes vertical.',
    siteName: 'Dancing with Lions',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
