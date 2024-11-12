import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Success Prediction',
  description: 'Real-time student success prediction system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 