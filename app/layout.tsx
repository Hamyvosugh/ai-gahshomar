// app/layout.tsx
import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'سیستم ورود',
  description: 'سیستم احراز هویت با Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}