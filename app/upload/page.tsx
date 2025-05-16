'use client'

import { useState } from 'react'
import { uploadDocument } from '@lib/api'
import {
  PaperClipIcon,
  UserIcon,
  CalendarIcon,
  LanguageIcon,
  TagIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')
  const [language, setLanguage] = useState('')
  const [tags, setTags] = useState('')
  const [keywords, setKeywords] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const handleUpload = async () => {
    if (!file) return

    setStatus('Przesyłanie...')
    try {
      await uploadDocument(file, {
        title,
        author,
        date,
        language,
        tags: tags.split(',').map((t) => t.trim()),
        keywords: keywords.split(',').map((k) => k.trim()),
        content: ''
      })
      setStatus('Dokument przesłany pomyślnie.')
      setFile(null)
      setTitle('')
      setAuthor('')
      setDate('')
      setLanguage('')
      setTags('')
      setKeywords('')
    } catch (error: any) {
      console.error(error)
      setStatus('Wystąpił błąd podczas przesyłania: ' + error.message)
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 p-6 bg-white rounded-xl shadow-card">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <ArrowUpTrayIcon className="w-6 h-6 text-blue-600" />
        Prześlij Dokument
      </h1>

      {/* File picker */}
      <div className="flex items-center space-x-3">
        <label
          htmlFor="file-upload"
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition"
        >
          <PaperClipIcon className="w-5 h-5 mr-2" />
          Wybierz plik
        </label>
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />
        <span className="text-gray-600 italic">
          {file ? file.name : 'Nie wybrano pliku'}
        </span>
      </div>

      {/* Metadata fields */}
      <div className="flex items-center space-x-2">
        <BookOpenIcon className="w-5 h-5 text-gray-500" />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tytuł"
          className="flex-1 border p-2 rounded-lg"
        />
      </div>

      <div className="flex items-center space-x-2">
        <UserIcon className="w-5 h-5 text-gray-500" />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Autor"
          className="flex-1 border p-2 rounded-lg"
        />
      </div>

      <div className="flex items-center space-x-2">
        <CalendarIcon className="w-5 h-5 text-gray-500" />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 border p-2 rounded-lg"
        />
      </div>

      <div className="flex items-center space-x-2">
        <LanguageIcon className="w-5 h-5 text-gray-500" />
        <input
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Język (np. polski)"
          className="flex-1 border p-2 rounded-lg"
        />
      </div>

      <div className="flex items-center space-x-2">
        <TagIcon className="w-5 h-5 text-gray-500" />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tagi (oddzielone przecinkami)"
          className="flex-1 border p-2 rounded-lg"
        />
      </div>

      <div className="flex items-center space-x-2">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        <input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Słowa kluczowe (oddzielone przecinkami)"
          className="flex-1 border p-2 rounded-lg"
        />
      </div>

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={!file}
        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
      >
        Prześlij
      </button>

      {/* Status */}
      {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
    </div>
  )
}
