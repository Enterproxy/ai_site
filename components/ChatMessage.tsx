// components/ChatMessage.tsx
'use client'

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant'
    content: string
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`p-3 rounded-md max-w-xl ${
        message.role === 'user'
          ? 'bg-blue-100 text-right self-end'
          : 'bg-gray-100 text-left self-start'
      }`}
    >
      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
    </div>
  )
}
