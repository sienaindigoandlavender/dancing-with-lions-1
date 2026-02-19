import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morocco Population Density — Dancing with Lions',
  description: 'Interactive visualization of Morocco population density by region. 2024 census data. © Dancing with Lions.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
