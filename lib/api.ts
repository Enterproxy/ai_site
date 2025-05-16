const LOCAL_STORAGE_KEY = 'uploadedDocs'

export interface Document {
  id: string
  title: string
  author?: string
  date?: string
  language?: string
  tags?: string[]
  keywords?: string[]
  content?: string
  fileUrl?: string
  thumbnailUrl?: string
}

function loadUploadedDocs(): Document[] {
  if (typeof window === 'undefined') return []
  try {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY)
    return json ? JSON.parse(json) : []
  } catch (e) {
    console.error('loadUploadedDocs error', e)
    return []
  }
}

function saveUploadedDocs(docs: Document[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(docs))
  } catch (e) {
    console.error('saveUploadedDocs error', e)
  }
}

export async function saveEditedDocument(id: string, data: Partial<Document>): Promise<Document> {
  const res = await fetch(`/api/documents/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    console.error('❌ Błąd zapisu edytowanego dokumentu:', await res.text())
    throw new Error('Nie udało się zapisać zmian')
  }

  return res.json()
}

export const baseDocuments: Document[] = [
  { id: '1', title: 'Raport z analizy danych', author: 'Jan Kowalski', date: '2024-12-01', keywords: ['dane','analiza'], tags: ['raport'] },
  { id: '2', title: 'Strategia komunikacyjna', author: 'Anna Nowak', date: '2025-01-15', keywords: ['komunikacja','strategia'], tags: ['strategia'] },
]

export async function fetchDocuments(filters?: any, query?: string): Promise<Document[]> {
  const res = await fetch('/api/documents')
  const text = await res.text()

  if (!res.ok) {
    let errMsg = text
    try {
      const json = JSON.parse(text)
      errMsg = json.error || JSON.stringify(json)
    } catch {}
    console.error('Błąd pobierania dokumentów:', res.status, errMsg)
    return []
  }

  const all: Document[] = JSON.parse(text)

  return all.filter((doc) => {
    const matchesQuery =
      !query ||
      doc.title.toLowerCase().includes(query.toLowerCase())

    const matchesAuthor =
      !filters?.author ||
      doc.author?.toLowerCase().includes(filters.author.toLowerCase())

    const matchesLanguage =
      !filters?.language ||
      doc.language
        ?.toLowerCase()
        .includes(filters.language.toLowerCase())

    const tagFilter = (filters?.tags || []).filter((t: string) => t)
    const matchesTags =
      tagFilter.length === 0 ||
      tagFilter.every((t: string) => doc.tags?.includes(t))

    const docDate = new Date(doc.date || '')
    const matchesDateFrom =
      !filters?.dateFrom ||
      docDate >= new Date(filters.dateFrom)

    const matchesDateTo =
      !filters?.dateTo ||
      docDate <= new Date(filters.dateTo)

    return (
      matchesQuery &&
      matchesAuthor &&
      matchesLanguage &&
      matchesTags &&
      matchesDateFrom &&
      matchesDateTo
    )
  })
}

export async function fetchDocument(id: string): Promise<Document | null> {
  const res = await fetch(`/api/documents/${id}`)
  if (!res.ok) return null
  return res.json()
}

export async function askChat(prompt: string): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  if (!res.ok) {
    console.error('❌ Błąd czatu:', await res.text())
    return 'Nie udało się uzyskać odpowiedzi.'
  }

  const json = await res.json()
  return json.reply || 'Brak odpowiedzi.'
}

export async function sendChatMessage(messages: { role: 'user' | 'assistant'; content: string }[]): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  if (!res.ok) {
    console.error('❌ Błąd czatu:', await res.text())
    return 'Nie udało się uzyskać odpowiedzi.'
  }

  const json = await res.json()
  return json.reply || 'Brak odpowiedzi.'
}

export async function fetchDocumentById(id: string) {
  const res = await fetch(`/api/documents/${id}`)
  if (!res.ok) return null
  return res.json()
}

export async function updateDocument(id: string, data: Partial<Document>) {
  const docs = loadUploadedDocs()
  const idx = docs.findIndex((d) => d.id === id)
  if (idx !== -1) {
    docs[idx] = { ...docs[idx], ...data }
    saveUploadedDocs(docs)
  }
}

export async function deleteDocument(id: string): Promise<void> {
  const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const txt = await res.text().catch(() => res.statusText)
    console.error('❌ deleteDocument error:', res.status, txt)
    throw new Error('Usuwanie dokumentu nie powiodło się')
  }
}

export async function uploadDocument(
  file: File,
  metadata: { title?: string; author?: string; date?: string; language?: string; tags?: string[]; keywords?: string[]; content?: string }
): Promise<Document> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('title', metadata.title || file.name)
  formData.append('author', metadata.author||'')
  formData.append('date', metadata.date||new Date().toISOString())
  formData.append('language', metadata.language||'')
  formData.append('tags', JSON.stringify(metadata.tags||[]))
  formData.append('keywords', JSON.stringify(metadata.keywords||[]))
  formData.append('content', metadata.content||'')
  
  if (metadata.thumbnail) {
	formData.append('thumbnail', metadata.thumbnail)
  }

  const res = await fetch('/api/documents', { method: 'POST', body: formData })
  const text = await res.text()
  console.log('uploadDocument status', res.status, 'body', text)
  if (!res.ok) throw new Error(text||res.statusText)
  return JSON.parse(text)
}
