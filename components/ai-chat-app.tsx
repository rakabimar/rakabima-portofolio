"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Sparkles, MessageCircle, Settings, RefreshCw, Copy, ThumbsUp, ThumbsDown, Trash2, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  isTyping?: boolean
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  timestamp: Date
}

export default function AIChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI chat assistant here to help you learn more about [Your Name]'s background, skills, and projects. Feel free to ask me anything about their experience in cybersecurity, programming, or their portfolio projects!",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Knowledge base about you (this will be used when AI API is connected)
  const knowledgeBase = {
    personal: {
      name: "[Your Name]",
      title: "Computer Science Student & Cybersecurity Enthusiast",
      location: "[Your Location]",
      education: "Bachelor of Science in Computer Science",
      interests: ["Cybersecurity", "Ethical Hacking", "Web Development", "CTF Competitions"]
    },
    skills: {
      programming: ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL"],
      web: ["React", "Node.js", "Next.js", "Express", "Tailwind CSS"],
      security: ["Penetration Testing", "Network Security", "Malware Analysis", "Digital Forensics"],
      tools: ["Linux", "Docker", "Git", "Wireshark", "Burp Suite", "Nmap"]
    },
    projects: [
      {
        name: "Riszerve",
        description: "Restaurant reservation system with real-time availability",
        technologies: ["React", "Node.js", "PostgreSQL"]
      },
      {
        name: "Terminal Portfolio",
        description: "Interactive Linux desktop environment portfolio",
        technologies: ["React", "TypeScript", "Tailwind CSS"]
      },
      {
        name: "Network Scanner",
        description: "Python-based network discovery and vulnerability assessment tool",
        technologies: ["Python", "Scapy", "Nmap"]
      }
    ],
    achievements: [
      "PicoCTF 2023: Top 15% finish",
      "Dean's List: Fall 2022, Spring 2023",
      "Cybersecurity Club Vice President",
      "CompTIA Security+ (In Progress)"
    ],
    contact: {
      email: "your.email@example.com",
      linkedin: "linkedin.com/in/yourprofile",
      github: "github.com/yourusername"
    }
  }

  // Sample responses for demonstration (will be replaced with AI API)
  const getSampleResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('skill') || message.includes('technology')) {
      return `I'd be happy to tell you about their technical skills! They're proficient in programming languages like Python, JavaScript, and TypeScript, with strong experience in web development using React and Node.js. In cybersecurity, they specialize in penetration testing, network security, and malware analysis. They're also skilled with tools like Linux, Docker, Wireshark, and Burp Suite. Is there a specific skill area you'd like to know more about?`
    }
    
    if (message.includes('project')) {
      return `They have several impressive projects! Their featured work includes Riszerve (a restaurant reservation system), this interactive Terminal Portfolio you're using right now, and a Network Scanner for cybersecurity assessments. Each project demonstrates different aspects of their skills - from full-stack web development to security tools. Would you like details about any specific project?`
    }
    
    if (message.includes('experience') || message.includes('background')) {
      return `They're a Computer Science student with a strong focus on cybersecurity. They've completed a cybersecurity internship where they conducted vulnerability assessments and assisted with incident response. They're also active in CTF competitions, finishing in the top 15% of PicoCTF 2023, and serve as Vice President of their Cybersecurity Club. They're currently working toward their CompTIA Security+ certification.`
    }
    
    if (message.includes('education') || message.includes('study')) {
      return `They're pursuing a Bachelor of Science in Computer Science with coursework in Data Structures, Algorithms, Network Security, Database Systems, and Software Engineering. They've maintained Dean's List status and are actively involved in cybersecurity research and competitions.`
    }
    
    if (message.includes('contact') || message.includes('reach') || message.includes('hire')) {
      return `You can reach them through several channels! Their email is your.email@example.com, you can connect on LinkedIn at linkedin.com/in/yourprofile, or check out their code on GitHub at github.com/yourusername. They're currently open to internship and entry-level opportunities in cybersecurity and software development.`
    }
    
    if (message.includes('ctf') || message.includes('competition')) {
      return `They're very active in CTF competitions! Their notable achievement includes finishing in the top 15% of PicoCTF 2023 with over 2500 points. They regularly participate in challenges covering web exploitation, cryptography, binary exploitation, and forensics. They also contribute writeups and solutions to help the cybersecurity community learn.`
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `Hello! I'm here to help you learn about [Your Name]'s background and experience. They're a passionate cybersecurity enthusiast and developer with experience in both security research and full-stack development. What would you like to know about them?`
    }
    
    return `That's an interesting question! While I don't have specific information about that topic, I can tell you about their skills in cybersecurity, programming projects, educational background, or professional experience. What aspect of their profile would you like to explore?`
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getSampleResponse(userMessage.content),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000) // Random delay between 1.5-2.5 seconds
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
        content: "Hi! I'm your AI chat assistant here to help you learn more about [Your Name]'s background, skills, and projects. Feel free to ask me anything about their experience in cybersecurity, programming, or their portfolio projects!",
        timestamp: new Date()
      }
    ])
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.type === 'user' ? 'You' : 'AI Assistant'}: ${msg.content}`
    ).join('\n\n')
    
    const blob = new Blob([chatContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-chat.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const suggestedQuestions = [
    "What are their main technical skills?",
    "Tell me about their cybersecurity experience",
    "What projects have they worked on?",
    "How can I contact them?",
    "What's their educational background?",
    "Tell me about their CTF achievements"
  ]

  return (
    <div className="h-full bg-white text-gray-900 flex flex-col md:flex-row">
      {/* Sidebar - hide on mobile, show as drawer */}
      <div className="hidden md:flex w-64 bg-gray-50 border-r border-gray-200 flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">AI Chat</h2>
              <p className="text-sm text-gray-500">Portfolio Guide</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 space-y-2">
          <Button
            onClick={clearChat}
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Chat
          </Button>
          <Button
            onClick={exportChat}
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Chat
          </Button>
          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Suggested Questions */}
        <div className="flex-1 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Suggested Questions</h3>
          <div className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* AI Status */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-900">AI Status</span>
            </div>
            <p className="text-xs text-blue-700">
              Ready to help you learn about the portfolio owner's background and experience.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Note: AI API integration pending
            </p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Portfolio AI Chat</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Ask me anything about [Your Name]'s background and experience</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-5 h-5 text-gray-500" />
              </button>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="hidden sm:inline">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-orange-500' 
                      : 'bg-gradient-to-br from-purple-500 to-blue-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    
                    {/* Message Actions */}
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.type === 'assistant' && (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => copyMessage(message.content)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Copy message"
                          >
                            <Copy className="w-3 h-3 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Like">
                            <ThumbsUp className="w-3 h-3 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 rounded transition-colors" title="Dislike">
                            <ThumbsDown className="w-3 h-3 text-gray-400" />
                          </button>
                        </div>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex space-x-3 max-w-3xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about [Your Name]..."
                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Quick Suggestions - only show on larger screens or when no messages */}
          {messages.length <= 1 && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, window.innerWidth < 768 ? 2 : 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-600 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Panel - mobile overlay */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 md:relative md:bg-transparent md:inset-auto"
          onClick={() => setShowSettings(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-80 bg-white border-l border-gray-200 p-4 md:relative md:w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">AI Model</h4>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>GPT-4 (Coming Soon)</option>
                  <option>Claude (Coming Soon)</option>
                  <option>Local Model (Coming Soon)</option>
                </select>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Response Style</h4>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Technical</option>
                </select>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Knowledge Base</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <p>• Personal background</p>
                  <p>• Technical skills</p>
                  <p>• Project portfolio</p>
                  <p>• Education & achievements</p>
                  <p>• Contact information</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
