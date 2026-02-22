import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Gnawa Road — From West Africa to Morocco to the World — Dancing with Lions",
  description: "Trans-Saharan slavery. Guembri. Seven spirit colours. Lila ceremony. Maalem lineages. The road from Timbuktu to Essaouira — and its parallels in Haiti, Brazil, Tunisia, and Nigeria.",
  openGraph: {
    title: "The Gnawa Road — Dancing with Lions",
    description: "One spiritual technology — music-driven possession trance — left West Africa through forced migration and produced distinct traditions on three continents. Gnawa is one branch.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
