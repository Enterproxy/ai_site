'use client'

import workerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url'
import { useState, useEffect } from 'react'
import { uploadDocument } from '@lib/api'
import {
  PaperClipIcon,
  UserIcon,
  CalendarIcon,
  LanguageIcon,
  TagIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
  BookOpenIcon,
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

	useEffect(() => {
	  import('pdfjs-dist/build/pdf').then((pdfjsLib) => {
		pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl
	  })
	}, [])

  const handleUpload = async () => {
    if (!file) return

    setStatus('Przetwarzanie miniatury...')

    let thumbnail: File | null = null

    try {
      const pdfjsLib = await import('pdfjs-dist/build/pdf')
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise
      const page = await pdf.getPage(1)

      const viewport = page.getViewport({ scale: 1.5 })
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      canvas.width = viewport.width
      canvas.height = viewport.height
      await page.render({ canvasContext: ctx, viewport }).promise

      const blob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b!), 'image/png')
      )
      thumbnail = new File([blob], 'thumbnail.png', { type: 'image/png' })
    } catch (e) {
      console.error('Błąd generowania miniatury:', e)
      setStatus('Błąd generowania miniatury — kontynuuję bez niej...')
    }

    setStatus('Przesyłanie...')

    try {
      await uploadDocument(file, {
        title,
        author,
        date,
        language,
        tags: tags.split(',').map((t) => t.trim()),
        keywords: keywords.split(',').map((k) => k.trim()),
        content: '',
        thumbnail,
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

      {/* picker pliku */}
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

      {/* Pola metadanych */}
      {[
        { icon: BookOpenIcon, value: title, setter: setTitle, placeholder: 'Tytuł' },
        { icon: UserIcon, value: author, setter: setAuthor, placeholder: 'Autor' },
        { icon: LanguageIcon, value: language, setter: setLanguage, placeholder: 'Język' },
        { icon: TagIcon, value: tags, setter: setTags, placeholder: 'Tagi (oddzielone przecinkami)' },
        { icon: MagnifyingGlassIcon, value: keywords, setter: setKeywords, placeholder: 'Słowa kluczowe (oddzielone przecinkami)' },
      ].map(({ icon: Icon, value, setter, placeholder }) => (
        <div key={placeholder} className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-gray-500" />
          <input
            value={value}
            onChange={(e) => setter(e.target.value)}
            placeholder={placeholder}
            className="flex-1 border p-2 rounded-lg"
          />
        </div>
      ))}

      {/* Pole daty */}
      <div className="flex items-center space-x-2">
        <CalendarIcon className="w-5 h-5 text-gray-500" />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value || '')}
          className="flex-1 border p-2 rounded-lg"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={!file}
        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
      >
        Prześlij
      </button>

      {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
    </div>
  )
}
