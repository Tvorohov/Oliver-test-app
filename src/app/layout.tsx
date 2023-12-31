import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes';
import { Providers } from '@/store/providers'
import '@radix-ui/themes/styles.css';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ui Builder',
  description: 'A tool to build ui components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Theme >
            {children}
          </Theme>
        </body>
      </html>
    </Providers>
  )
}
