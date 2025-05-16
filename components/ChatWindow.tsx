'use client'

import { ChatMessage } from './ChatMessage'

interface ChatWindowProps {
  messages: { role: 'user' | 'assistant'; content: string }[]
  loading: boolean
}

export function ChatWindow({ messages, loading }: ChatWindowProps) {
  return (
    <div className="space-y-2">
      {messages.map((msg, i) => (
        <ChatMessage key={i} message={msg} />
      ))}
      {loading && <ChatMessage message={{ role: 'assistant', content: 'Piszę odpowiedź...' }} />}
    </div>
  )
}
