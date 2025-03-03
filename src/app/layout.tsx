import './globals.css'
import type { Metadata } from 'next'
import { Navbar } from '@/components/ui/Navbar'

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
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
      </body>
    </html>
  )
}