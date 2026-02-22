import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Dust That Feeds — How the Sahara Keeps the Amazon Alive — Dancing with Lions",
  description: "182 million tons of Saharan dust cross the Atlantic every year. 27.7 million tons fall on the Amazon. 22,000 tons of phosphorus replace exactly what the rainforest loses to rain. The dead life of an ancient African lake feeds the largest living forest on earth.",
  openGraph: {
    title: "The Dust That Feeds — How the Sahara Keeps the Amazon Alive",
    description: "182 million tons. 5,000 km. 22,000 tons of phosphorus. The Sahara and the Amazon are connected by an invisible river of dust.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
