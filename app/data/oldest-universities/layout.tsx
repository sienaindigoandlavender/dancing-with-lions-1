import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The World\'s Oldest Universities — Al-Qarawiyyin, Ibn Yusuf, Bologna, Oxford | Dancing with Lions',
  description: 'Morocco\'s claim to the oldest continuously operating university. Al-Qarawiyyin (859 CE). Founded by Fatima al-Fihri. 229 years before Bologna. 4,000+ manuscripts.',
  openGraph: {
    title: 'The World\'s Oldest Universities | Dancing with Lions',
    description: 'Al-Qarawiyyin. 859 CE. Founded by a woman. 229 years before Bologna, 237 before Oxford.',
    siteName: 'Dancing with Lions',
  },
}

export default function OldestUniversitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
