import '../styles/globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Sidebar } from '@components/Sidebar'
import { Header } from '@components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IBW – Inteligentna Baza Wiedzy',
  description: 'System do inteligentnego zarządzania dokumentami i wiedzą organizacyjną',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Header nad całą szerokością */}
          <Header />

          {/* pod header’em: sidebar + główny content */}
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />

            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
