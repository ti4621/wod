import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Workout App',
  description: 'Create workouts and track your progress.',
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
