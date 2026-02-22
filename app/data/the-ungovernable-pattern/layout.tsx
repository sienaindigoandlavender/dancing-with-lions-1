import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Ungovernable Pattern — Why Peoples Who Refuse Empires Keep Inventing the Same Structure | Dancing with Lions',
  description: 'Amazigh. Kurds. Mongols. Haudenosaunee. Sámi. Pashtun. Mapuche. Roma. Tuareg. Nine peoples across five continents who never built centralised states — and independently invented the same political architecture: tribal confederations, rotating leadership, customary law, decentralised governance. Not a connection. Convergent political evolution. The terrain that resists empires produces the same answer every time.',
  openGraph: {
    title: 'The Ungovernable Pattern — Dancing with Lions',
    description: 'Nine peoples, five continents, one political architecture. Why the peoples who refuse empires keep inventing the same governance structure.',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
