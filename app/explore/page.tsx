'use client'
// app/explore/page

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { SearchBar } from '@components/SearchBar'
import { FilterPanel } from '@components/FilterPanel'
import { DocumentCard } from '@components/DocumentCard'
import { fetchDocuments, Document } from '@lib/api'
import { useFilters } from '@store/filters'

export default function ExplorePage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const { filters, setFilters, searchQuery } = useFilters()

  useEffect(() => {
    const loadDocs = async () => {
      setLoading(true)
      const docs = await fetchDocuments(filters, searchQuery)
      setDocuments(docs)
      setLoading(false)
    }
    loadDocs()
  }, [filters, searchQuery])

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      <div className="col-span-12 xl:col-span-3">
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      <div className="col-span-12 xl:col-span-9 relative flex flex-col gap-4">
        {/* Logo w tle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <Image
            src="/logo.png"
            alt="Logo"
            width={400}
            height={400}
            className="blur-sm"
          />
        </div>

        {/* Zawartość */}
        <SearchBar
          onSearch={(q: string) =>
            setFilters({
              ...filters,
              searchQuery: q,
            })
          }
        />

        {loading ? (
          <p className="text-center text-gray-500 mt-8">Ładowanie dokumentów...</p>
        ) : documents.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">Brak wyników spełniających kryteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 z-10 relative">
            {documents.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
