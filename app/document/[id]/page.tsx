'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { fetchDocument, deleteDocument } from '@lib/api'
import { baseDocuments } from '../../../premade_db/baseDocuments'
import { Badge } from '@components/ui/badge'

export default function DocumentDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [doc, setDoc] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!id) return
    ;(async () => {
      setLoading(true)

      // Spróbuj pobrać dokument z API
      let data = await fetchDocument(id as string)

      // Jeśli nie znaleziono, spróbuj znaleźć w baseDocuments
      if (!data) {
        const fallback = baseDocuments.find((d) => d.id === id)
        if (fallback) {
          data = fallback
        }
      }

      setDoc(data)
      setLoading(false)
    })()
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Na pewno usunąć ten dokument?')) return
    setDeleting(true)
    try {
      await deleteDocument(id as string)
      router.push('/explore')
    } catch (err) {
      console.error(err)
      alert('Nie udało się usunąć dokumentu.')
      setDeleting(false)
    }
  }

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Ładowanie dokumentu…</p>
  }
  if (!doc) {
    return <p className="text-center mt-10 text-red-500">Nie znaleziono dokumentu.</p>
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full items-start">
        {/* Left column wrapper (transparent) */}
        <div className="lg:col-span-1 self-start">
          {/* Tylko ten wewnętrzny div ma białe tło i padding */}
          <div className="bg-white px-6 py-4 space-y-2 rounded shadow">
            <header className="space-y-2">
              <h1 className="text-2xl font-bold">{doc.title}</h1>
              <div className="text-sm text-gray-600">
                {doc.author && <div>Autor: {doc.author}</div>}
                {doc.language && <div>Język: {doc.language}</div>}
                {doc.date && (
                  <div>Data: {new Date(doc.date).toLocaleDateString()}</div>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Link
                  href={`/edit/${id}`}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edytuj
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting ? 'Usuwanie…' : 'Usuń'}
                </button>
              </div>
            </header>

            <section>
              <h2 className="font-semibold text-lg mb-1">Podsumowanie</h2>
              <p className="text-gray-800 whitespace-pre-line text-sm">
                {doc.summary || doc.content || 'Brak treści dokumentu.'}
              </p>
            </section>

            {doc.keywords?.length > 0 && (
              <section>
                <h2 className="font-semibold text-lg mb-1">Słowa kluczowe</h2>
                <div className="flex flex-wrap gap-2">
                  {doc.keywords.map((kw: string) => (
                    <Badge key={kw} variant="secondary">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {doc.tags?.length > 0 && (
              <section>
                <h2 className="font-semibold text-lg mb-1">Tagi użytkownika</h2>
                <div className="flex flex-wrap gap-2">
                  {doc.tags.map((tag: string) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Right column: PDF preview */}
        <div className="lg:col-span-2 h-full">
          {doc.fileUrl ? (
            <object
              data={`${doc.fileUrl}#page=1&view=FitH`}
              type="application/pdf"
              width="100%"
              height="100%"
              className="w-full h-full"
            >
              <p>Podgląd PDF niedostępny</p>
            </object>
          ) : (
            <div className="text-gray-500 p-4">Brak pliku PDF</div>
          )}
        </div>
      </div>
    </div>
  )
}
