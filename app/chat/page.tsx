'use client'

import { useState } from 'react'
import { ChatMessage } from '@components/ChatMessage'
import { sendChatMessage } from '@lib/api'
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

	const newMessages: Message[] = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const reply = await sendChatMessage(newMessages)
    setMessages([...newMessages, { role: 'assistant', content: reply }])
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2 text-blue-600" />
        Czat z Bazą Wiedzy
      </h1>

      <div className="space-y-2">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
        {loading && <ChatMessage message={{ role: 'assistant', content: 'Piszę odpowiedź...' }} />}
      </div>

      <div className="mt-6 flex gap-2">
        <div className="flex items-center border border-gray-300 rounded px-4 py-2 w-full">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Zadaj pytanie..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          <PaperAirplaneIcon className="w-5 h-5 inline-block mr-2" />
          Wyślij
        </button>
      </div>
    </div>
  )
}
