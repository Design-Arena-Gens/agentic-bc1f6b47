import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Video Automation Tool',
  description: 'Comprehensive video automation dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
