import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Medellin',
  description: 'AI-powered event platform for Medellin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased dark:bg-slate-950">
      <body>{children}</body>
    </html>
  )
}