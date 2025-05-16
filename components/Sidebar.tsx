'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ComputerDesktopIcon,
  ChatBubbleLeftRightIcon,
  ArrowUpTrayIcon,
  UserIcon,
  InformationCircleIcon,
  PhoneIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

const mainLinks = [
  { href: '/explore', label: 'Eksploruj', icon: ComputerDesktopIcon },
  { href: '/chat', label: 'Czat z bazą', icon: ChatBubbleLeftRightIcon },
  { href: '/upload', label: 'Prześlij', icon: ArrowUpTrayIcon },
]

const footerLinks = [
  { href: '/', label: 'O nas', icon: InformationCircleIcon },
  { href: '/', label: 'Kontakt', icon: PhoneIcon },
  { href: '/', label: 'Copyright', icon: DocumentTextIcon },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 flex-shrink-0 h-full flex flex-col justify-between p-4 bg-white border-r">
      {/* Główny panel */}
      <div className="space-y-6">
	  	  <div className="flex justify-center">
			<Image src="/logo.png" alt="Logo" width={80} height={80} />
		  </div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <UserIcon className="w-6 h-6 text-blue-600" />
          Panel użytkownika
        </h2>

        <nav className="space-y-2">
          {mainLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 transition ${
                pathname === href ? 'bg-gray-100 font-medium' : ''
              }`}
            >
              <Icon className="w-5 h-5 text-gray-500" />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Stopka z dodatkowymi linkami */}
      <div className="border-t pt-4">
        <nav className="space-y-2">
          {footerLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
