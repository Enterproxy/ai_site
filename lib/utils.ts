// lib/utils.ts

export function truncate(text: string, length = 200): string {
  return text.length > length ? text.slice(0, length) + '…' : text
}

export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timeout: NodeJS.Timeout
  return function (...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  } as T
}
