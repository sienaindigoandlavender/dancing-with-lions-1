import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Solomon Knew — The Unified Knowledge System Before the Disciplines Fractured | Dancing with Lions',
  description: 'The Wisdom of Solomon contains a nine-domain syllabus: cosmology, chronology, astronomy, zoology, the invisible layer, psychology, botany, and pharmacology. One system. Root to star. Before the disciplines forgot they were one.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
