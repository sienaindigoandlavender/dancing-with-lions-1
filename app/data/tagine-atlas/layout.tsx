import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Tagine Atlas — Regional Variations Mapped | Dancing with Lions',
  description: 'Marrakech lamb-prune, Fes chicken-olive, coastal fish chermoula, Berber mountain, kefta mkaouara. 10 regional tagine styles, 8 essential spices, the vessel, the rules.',
  openGraph: {
    title: 'The Tagine Atlas | Dancing with Lions',
    description: '10 regional tagine styles mapped across Morocco. Spice pantry, vessel science, cultural rules of the communal pot.',
    siteName: 'Dancing with Lions',
  },
}

export default function TagineAtlasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
