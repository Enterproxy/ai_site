// components/Header.tsx
'use client'

import Image from 'next/image'
import { BookOpenIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export function Header() {
  const userLoggedIn = true;  // Zmienna, którą należy zaktualizować w zależności od stanu logowania
  const userName = "Jan Kowalski";  // Przykładowa nazwa użytkownika, zaktualizuj w zależności od danych

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
	  <Link href="/" className="flex items-center gap-3">
		<Image src="/logo.png" alt="Logo" width={32} height={32} />
		<span className="text-2xl font-bold text-gray-800">Interfejs Bazy Wiedzy</span>
	</Link>
	{/*
      <Link href="/" className="flex items-center gap-3">
        <BookOpenIcon className="w-7 h-7 text-blue-600" />
        <span className="text-2xl font-bold text-gray-800">Interfejs Bazy Wiedzy</span>
      </Link>
	*/}
      <div className="text-sm text-gray-600">
        {userLoggedIn ? (
          <span>Zalogowano jako: {userName}</span>
        ) : (
          <Link href="/login" className="text-blue-600">Zaloguj się</Link>
        )}
      </div>
    </header>
  )
}
