import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Sardine Current — From Galicia to Senegal, One Upwelling Feeds Eight Nations — Dancing with Lions",
  description: "The Canary Current runs 5,000km from Portugal to Senegal. One of four major upwelling systems on earth. Morocco is the world's largest sardine exporter. Portugal's stocks collapsed 80%. Eight nations share one current, one fish, one crisis.",
  openGraph: {
    title: "The Sardine Current — One Upwelling Feeds Eight Nations",
    description: "5,000km of cold, nutrient-rich water. Four upwelling systems on earth. This is the one that feeds West Africa and Europe.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
