import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Son Who Took the Fire — Menelik I and the Kebra Nagast | Dancing with Lions',
  description: 'How a boy\'s journey to Jerusalem became the constitutional basis for 700 years of Ethiopian monarchy. The Kebra Nagast, the Ark of the Covenant, and the most successful political myth in human history.',
  openGraph: {
    title: 'The Son Who Took the Fire',
    description: 'Menelik I, the Ark of the Covenant, and 704 years of Solomonic dynasty.',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
