import { useState, useRef, useEffect } from 'react'
import { useAppStore } from '@/stores/useAppStore'
import { chatCompletion } from '@/lib/ai'
import { FiSend } from 'react-icons/fi'

export default function ChatPanel({ systemPrompt }) {
  const { selectedModel, chatHistory, addMessage } = useAppStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    addMessage(userMsg)
    setInput('')
    setLoading(true)

    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        ...chatHistory,
        userMsg,
      ]
      const reply = await chatCompletion(selectedModel, messages)
      addMessage({ role: 'assistant', content: reply })
    } catch (err) {
      addMessage({
        role: 'assistant',
        content: `오류가 발생했습니다: ${err.message}`,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white">
      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {chatHistory.length === 0 && (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            AI와 대화를 시작하세요
          </div>
        )}
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-500">
              생각 중...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            rows={1}
            className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition hover:bg-primary-dark disabled:opacity-40"
          >
            <FiSend className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
