import { atom, useAtom } from 'jotai'

// Typy dla przejrzystości (opcjonalnie możesz przenieść to do pliku types.ts)
export interface Filters {
  tags: string[]
  keywords: string[]
  author: string
  language: string
  dateFrom: string | null
  dateTo: string | null
  searchQuery: string
}

// Domyślne wartości filtrów
const filtersAtom = atom({
  tags: [] as string[],
  keywords: [] as string[],
  dateFrom: null as string | null,
  dateTo: null as string | null,
  searchQuery: '',
  author: '', // Dodanie nowego filtra 'author'
  language: '' // Dodanie nowego filtra 'language'
})

export function useFilters() {
  const [filters, setFilters] = useAtom(filtersAtom)

  return {
    filters,
    searchQuery: filters.searchQuery,
    setFilters,
  }
}