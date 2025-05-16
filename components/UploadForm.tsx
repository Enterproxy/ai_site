'use client'

import { useState } from 'react'
import { uploadDocument } from '../lib/api'

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const handleUpload = async () => {
    if (!file) return
    setStatus('Przesyłanie...')
    try {
      await uploadDocument(file)
      setStatus('Sukces! Dokument przesłany.')
      setFile(null)
    } catch (err) {
      setStatus('Błąd podczas przesyłania.')
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Prześlij dokument
      </button>
      {status && <p className="text-sm text-gray-600">{status}</p>}
    </div>
  )
}
