'use client'

import { Document, Page, pdfjs } from 'react-pdf'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url'
import { useState } from 'react'

// Kierujemy PDF.js na nasz worker zbudowany przez Webpack
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

export function PdfPreview({ fileUrl }: { fileUrl: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="border rounded overflow-hidden w-full max-w-xs">
      <Document
        file={fileUrl}
        onLoadSuccess={() => setLoaded(true)}
        loading={<p className="text-sm text-gray-500 p-2">Ładowanie podglądu…</p>}
        error={<p className="text-sm text-red-500 p-2">Nie można załadować PDF</p>}
      >
        <Page pageNumber={1} width={200} />
      </Document>
    </div>
  )
}