import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
      <head>
        <link 
          rel="stylesheet" 
          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/globals.css`}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 