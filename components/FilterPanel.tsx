// components/FilterPanel.tsx
'use client'

import {
  UserIcon,
  LanguageIcon,
  TagIcon,
  CalendarIcon,
  HashtagIcon
} from '@heroicons/react/24/outline'

interface FilterPanelProps {
  filters: any
  setFilters: (f: any) => void
}

export function FilterPanel({ filters, setFilters }: FilterPanelProps) {
  const handleChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-card sticky top-0 border border-gray-200">
      {/* wewnętrzny wrapper odpowiada za spacing między polami */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <TagIcon className="w-5 h-5 text-blue-600" />
          Filtry
        </h2>

        {/* Autor */}
        <div className="relative">
          <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.author || ''}
            onChange={(e) => handleChange('author', e.target.value)}
            placeholder="Autor"
            className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Język */}
        <div className="relative">
          <LanguageIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.language || ''}
            onChange={(e) => handleChange('language', e.target.value)}
            placeholder="Język"
            className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Tagi */}
        <div className="relative">
          <TagIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={(filters.tags || []).join(', ')}
            onChange={(e) => {
              const arr = e.target.value.split(',').map(t => t.trim()).filter(t => t)
              handleChange('tags', arr)
            }}
            placeholder="Tagi (oddziel przecinkiem)"
            className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Data od */}
        <div className="relative">
          <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="date"
            value={filters.dateFrom || ''}
            onChange={(e) => handleChange('dateFrom', e.target.value || null)}
            className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Data do */}
        <div className="relative">
          <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="date"
            value={filters.dateTo || ''}
            onChange={(e) => handleChange('dateTo', e.target.value || null)}
            className="pl-10 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
