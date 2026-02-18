import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Dancing with Lions — Cultural Intelligence for Al Maghrib',
  description: 'Data, research, and structured intelligence about Morocco and the Maghreb. The Bloomberg of North Africa.',
  metadataBase: new URL('https://dancingwithlions.com'),
  openGraph: {
    title: 'Dancing with Lions',
    description: 'Cultural intelligence for Al Maghrib and its connected worlds.',
    url: 'https://dancingwithlions.com',
    siteName: 'Dancing with Lions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dancing with Lions',
    description: 'Cultural intelligence for Al Maghrib and its connected worlds.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
