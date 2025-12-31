"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Copy, 
  Check,
  Trash2, 
  Download,
  MessageCircle,
  Zap,
  Brain,
  ChevronRight
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hey there! 👋 I'm **RakAI**, your personal guide to Rakabima's portfolio. Ask me anything about his skills, projects, cybersecurity experience, or how to get in touch!",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content })
      })

      const data = await response.json()

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.response,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Oops! Something went wrong. Please try again! 🔧",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: "Hey there! 👋 I'm **RakAI**, your personal guide to Rakabima's portfolio. Ask me anything about his skills, projects, cybersecurity experience, or how to get in touch!",
        timestamp: new Date()
      }
    ])
  }

  const copyMessage = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `[${msg.timestamp.toLocaleTimeString()}] ${msg.type === 'user' ? 'You' : 'RakAI'}: ${msg.content}`
    ).join('\n\n')
    
    const blob = new Blob([chatContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rakai-chat-export.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const suggestedQuestions = [
    { icon: <Zap className="w-3 h-3" />, text: "What are Raka's skills?" },
    { icon: <Brain className="w-3 h-3" />, text: "Tell me about his CTF experience" },
    { icon: <MessageCircle className="w-3 h-3" />, text: "What projects has he built?" },
    { icon: <User className="w-3 h-3" />, text: "How can I contact him?" }
  ]

  // Simple markdown-like parsing for bold text
  const parseContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-aurora-coral">{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-gray-950 to-black text-aurora-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gray-900/80 border-b border-aurora-orange/20 backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-aurora-orange to-aurora-coral rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-aurora-orange/20">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-gray-900" />
          </div>
          <div>
            <h1 className="font-semibold text-aurora-white flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
              RakAI
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-aurora-coral" />
            </h1>
            <p className="text-[10px] sm:text-xs text-aurora-white/50">Portfolio Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            onClick={exportChat}
            className="p-1.5 sm:p-2 hover:bg-aurora-orange/10 rounded-lg transition-colors text-aurora-white/60 hover:text-aurora-coral"
            title="Export Chat"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={clearChat}
            className="p-1.5 sm:p-2 hover:bg-aurora-orange/10 rounded-lg transition-colors text-aurora-white/60 hover:text-aurora-coral"
            title="Clear Chat"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-aurora-orange/20 scrollbar-track-transparent min-h-0" style={{ WebkitOverflowScrolling: 'touch' as const }}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-aurora-orange/20 text-aurora-coral' 
                    : 'bg-gradient-to-br from-aurora-orange to-aurora-coral text-white'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-aurora-orange to-aurora-coral text-white rounded-tr-md'
                      : 'bg-gray-800/80 text-aurora-white border border-aurora-orange/10 rounded-tl-md'
                  }`}>
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {parseContent(message.content)}
                    </p>
                  </div>
                  
                  {/* Message Meta */}
                  <div className="flex items-center gap-2 mt-1 px-1">
                    <span className="text-[9px] sm:text-[10px] text-aurora-white/40">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.type === 'assistant' && (
                      <button
                        onClick={() => copyMessage(message.content, message.id)}
                        className="p-0.5 sm:p-1 hover:bg-aurora-orange/10 rounded transition-colors text-aurora-white/40 hover:text-aurora-coral"
                        title="Copy message"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[85%]">
              <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-aurora-orange to-aurora-coral flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="bg-gray-800/80 border border-aurora-orange/10 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-tl-md">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-aurora-coral rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions - Show only at start */}
      {messages.length <= 1 && (
        <div className="px-3 sm:px-4 pb-2">
          <p className="text-[10px] sm:text-xs text-aurora-white/40 mb-1.5 sm:mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {suggestedQuestions.map((q, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setInputMessage(q.text)}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-800/60 hover:bg-aurora-orange/10 border border-aurora-orange/20 hover:border-aurora-orange/40 rounded-full text-[10px] sm:text-xs text-aurora-white/70 hover:text-aurora-coral transition-all group"
              >
                <span className="text-aurora-orange/60 group-hover:text-aurora-coral [&>svg]:w-2.5 [&>svg]:h-2.5 sm:[&>svg]:w-3 sm:[&>svg]:h-3">{q.icon}</span>
                <span className="hidden sm:inline">{q.text}</span>
                <span className="sm:hidden">{q.text.split(' ').slice(0, 3).join(' ')}...</span>
                <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 sm:p-4 bg-gray-900/50 border-t border-aurora-orange/20">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about Raka..."
              disabled={isTyping}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/60 border border-aurora-orange/20 rounded-lg sm:rounded-xl text-aurora-white placeholder:text-aurora-white/30 focus:outline-none focus:border-aurora-orange/50 focus:ring-1 focus:ring-aurora-orange/20 transition-all disabled:opacity-50 text-sm sm:text-base"
            />
          </div>
          <motion.button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 sm:p-3 bg-gradient-to-r from-aurora-orange to-aurora-coral rounded-lg sm:rounded-xl text-white shadow-lg shadow-aurora-orange/20 hover:shadow-aurora-orange/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-aurora-orange/20"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
        
        {/* Status Bar */}
        <div className="flex items-center justify-between mt-1.5 sm:mt-2 px-1">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-aurora-white/30">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span>RakAI v1.0 • Mock Mode</span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-aurora-white/30 hidden sm:inline">
            Press Enter to send
          </span>
        </div>
      </div>
    </div>
  )
}
