'use client'

import Link from 'next/link'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'
import { Document as DocumentType } from '../lib/api'

// jeżeli nadal używasz PdfPreview, inaczej usuń ten import
const PdfPreview = dynamic(
  () => import('./PdfPreview').then((mod) => mod.PdfPreview),
  { ssr: false }
)

interface DocumentCardProps {
  document: DocumentType
}

export function DocumentCard({ document }: DocumentCardProps) {
  const { id, title, author, date, keywords = [], tags = [], fileUrl } = document

  return (
    <Link href={`/document/${id}`}>
      <div className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition-all cursor-pointer space-y-2">
        {/* header */}
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>

        {/* meta */}
        <p className="text-sm text-muted">
          {author && <span>Autor: {author} • </span>}
          {date && <span>Data: {new Date(date).toLocaleDateString()}</span>}
        </p>

        {/* podgląd PDF wyśrodkowany */}
        {fileUrl && (
          <div className="flex justify-center">
            <object
              data={`${fileUrl}#page=1&view=FitH`}
              type="application/pdf"
              width="200"
              height="260"
              className="border rounded mx-auto"
            >
              <p>Podgląd PDF niedostępny</p>
            </object>
          </div>
        )}

        {/* tagi i słowa kluczowe */}
        <div className="flex flex-wrap gap-2 mt-2">
          {keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium"
            >
              {kw}
            </span>
          ))}
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
