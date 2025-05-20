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