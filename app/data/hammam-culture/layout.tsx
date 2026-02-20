import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hammam Culture — The Social Architecture of the Bathhouse | Dancing with Lions',
  description: 'Three rooms, six steps, five neighbourhood elements. How the Moroccan hammam works, what it means, and why it persists.',
  openGraph: {
    title: 'Hammam Culture | Dancing with Lions',
    description: 'The social architecture of the Moroccan bathhouse. Design, ritual, products, neighbourhood role.',
    siteName: 'Dancing with Lions',
  },
}

export default function HammamCultureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
