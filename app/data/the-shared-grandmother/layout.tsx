import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Shared Grandmother — Amazigh & Sámi DNA | Dancing with Lions',
  description: 'The Sahara and the Arctic share a 9,000-year-old maternal DNA branch. Two indigenous peoples at opposite ends of a continent — genetically distinct from everyone around them — connected by a grandmother who sheltered from the ice in southwestern France.',
  openGraph: {
    title: 'The Shared Grandmother',
    description: 'Amazigh & Sámi. Sahara & Arctic. One mitochondrial DNA branch. 9,000 years.',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
