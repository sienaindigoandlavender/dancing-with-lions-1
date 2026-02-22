import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Apothecary — Morocco's Living Pharmacopoeia — Dancing with Lions',
  description: '7,000 plant species. 800 medicinal. 1,118 remedies catalogued. Morocco is the second-richest country for biodiversity in the Mediterranean basin. The attar still prescribes what Ibn al-Baytar wrote in the 13th century. The data behind 1,000 years of herbalism.',
  openGraph: {
    title: 'The Apothecary — Morocco's Living Pharmacopoeia',
    description: '7,000 plant species. 800 medicinal. 1,118 remedies catalogued. The data behind 1,000 years of Moroccan herbalism.',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
