import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yennayer — The Berber Pharaoh and the 3,000-Year Calendar | Dancing with Lions',
  description: 'In 943 BC, a Meshwesh Libyan named Sheshonq became Pharaoh of Egypt. He founded the 22nd Dynasty, invaded Jerusalem, and carved his victories at Karnak. The Amazigh calendar counts from his throne. Yennayer 2976 was January 13, 2026.',
  openGraph: {
    title: 'Yennayer',
    description: 'The Berber pharaoh. The 3,000-year calendar. The oldest New Year still celebrated.',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
