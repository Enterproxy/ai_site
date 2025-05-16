'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
      <input
        type="text"
        placeholder="Wyszukaj dokumenty, słowa, frazy..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
    </div>
  )
}
