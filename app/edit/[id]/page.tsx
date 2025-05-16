'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { fetchDocumentById, saveEditedDocument } from '@lib/api'
import {
  BookOpenIcon,
  UserIcon,
  CalendarIcon,
  LanguageIcon,
  TagIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline'

export default function EditDocumentPage() {
  const router = useRouter()
  const { id } = useParams()
  const [document, setDocument] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    ;(async () => {
      setLoading(true)
      let data = await fetchDocumentById(id as string)
      if (data) {
        data = {
          ...data,
          tags: data.tags ?? [],
          keywords: data.keywords ?? [],
          language: data.language ?? ''
        }
        setDocument(data)
      }
      setLoading(false)
    })()
  }, [id])

  const handleChange = (key: string, value: any) => {
    setDocument({ ...document, [key]: value })
  }

  const handleSave = async () => {
    try {
      await saveEditedDocument(document.id, document)
      router.push('/explore')
    } catch (err) {
      console.error('❌ Błąd przy zapisie:', err)
      alert('Nie udało się zapisać zmian')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSave()
  }

  if (loading) return <p>Ładowanie...</p>
  if (!document) return <p>Nie znaleziono dokumentu.</p>

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <PencilSquareIcon className="w-6 h-6 text-blue-600" />
        Edytuj dokument
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tytuł */}
        <div className="flex items-center space-x-2">
          <BookOpenIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={document.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="flex-1 border px-4 py-2 rounded-lg"
            placeholder="Tytuł"
          />
        </div>

        {/* Autor */}
        <div className="flex items-center space-x-2">
          <UserIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={document.author}
            onChange={(e) => handleChange('author', e.target.value)}
            className="flex-1 border px-4 py-2 rounded-lg"
            placeholder="Autor"
          />
        </div>

        {/* Data */}
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-gray-500" />
          <input
            type="date"
            value={document.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="flex-1 border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Tagi */}
        <div className="flex items-center space-x-2">
          <TagIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={document.tags.join(', ')}
            onChange={(e) =>
              handleChange(
                'tags',
                e.target.value.split(',').map((tag) => tag.trim())
              )
            }
            className="flex-1 border px-4 py-2 rounded-lg"
            placeholder="Tagi (oddzielone przecinkiem)"
          />
        </div>

        {/* Słowa kluczowe */}
        <div className="flex items-center space-x-2">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={document.keywords.join(', ')}
            onChange={(e) =>
              handleChange(
                'keywords',
                e.target.value.split(',').map((kw) => kw.trim())
              )
            }
            className="flex-1 border px-4 py-2 rounded-lg"
            placeholder="Słowa kluczowe (oddzielone przecinkami)"
          />
        </div>

        {/* Język */}
        <div className="flex items-center space-x-2">
          <LanguageIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={document.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="flex-1 border px-4 py-2 rounded-lg"
            placeholder="Język"
          />
        </div>

        {/* Zapisz */}
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <PencilSquareIcon className="w-5 h-5 mr-2" />
          Zapisz
        </button>
      </form>
    </div>
  )
}
