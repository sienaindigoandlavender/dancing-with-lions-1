import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'From the Land of the Setting Sun — The Amazigh in the Bible | Dancing with Lions',
  description: 'Before there was Africa, there was the Maghreb — the land where the sun sets. The people who lived there appear in the oldest book in the Western world. They sacked Solomon\'s temple. They carried Christ\'s cross. They built Latin Christianity. Three of them became Pope. This is what the Bible says about the Imazighen.',
  openGraph: {
    title: 'From the Land of the Setting Sun',
    description: 'The Amazigh in the Bible. Warriors, theologians, popes. The story nobody has assembled.',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
