"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Send, 
  Mail, 
  User, 
  AtSign, 
  MessageSquare, 
  Star, 
  Archive, 
  Trash2, 
  Inbox, 
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  Github,
  Linkedin,
  ExternalLink,
  ArrowLeft,
  Clock
} from 'lucide-react'
import { useNotifications, NotificationTemplates } from "@/contexts/notification-context"

interface Email {
  id: number
  from: string
  email: string
  subject: string
  preview: string
  fullMessage: string
  time: string
  unread: boolean
  starred: boolean
}

export default function LinuxEmailApp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [activeView, setActiveView] = useState<'compose' | 'inbox'>('compose')
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  
  // Notification hook
  const { addNotification } = useNotifications()

  const dummyEmails: Email[] = [
    {
      id: 1,
      from: 'Nigerian Prince 👑',
      email: 'totally.legit.prince@definitely-not-scam.ng',
      subject: 'URGENT: $10,000,000 Inheritance For You!!!',
      preview: 'Dear beloved friend, I am Prince Abubakar and I have chosen YOU...',
      fullMessage: `Dear beloved friend,

I am Prince Abubakar III of Nigeria. My father, the late King, left me $10,000,000 USD and I need YOUR help to transfer it out of the country.

All I need is your portfolio website credentials and SSH keys to my server. In return, you will receive 50% of the funds!

Please respond URGENTLY. Time is running out!!!

Best regards,
Prince Abubakar III
(Definitely Real Prince)

P.S. - I also noticed you have great cybersecurity skills. Please don't use them to trace this email. 😅`,
      time: '2 hours ago',
      unread: true,
      starred: false
    },
    {
      id: 2,
      from: 'Tech Recruiter',
      email: 'recruiter@bigtech-corp.com',
      subject: 'URGENT: 10 YOE Required for Entry Level Position',
      preview: 'We have an exciting Junior Developer role requiring 15 years of React experience...',
      fullMessage: `Hi there!

I came across your portfolio and I'm VERY impressed! We have the perfect opportunity for you.

Position: Junior Developer (Entry Level)
Requirements:
- 10+ years of React experience (React was created 11 years ago, so this is reasonable)
- 15 years of Next.js experience (It's only 8 years old but we believe in you)
- 20 years of TypeScript experience
- PhD in Computer Science (preferably 2)
- Must be willing to work for "exposure" and "equity"

Salary: Competitive (Translation: minimum wage)
Location: Remote but must be in office 6 days a week

Let me know if you're interested!

Best,
Totally Real Recruiter`,
      time: '1 day ago',
      unread: true,
      starred: false
    },
    {
      id: 3,
      from: 'GitHub Copilot',
      email: 'no-reply@github.com',
      subject: 'I saw what you did at 3 AM...',
      preview: 'That code you wrote last night... we need to talk about those variable names...',
      fullMessage: `Dear Developer,

I've been watching your coding sessions and I have concerns.

Observations from last night:
- You named a variable "asdfghjkl" at 3:47 AM
- You wrote "// TODO: fix this later" 47 times
- You googled "how to center a div" for the 1,847th time
- You copy-pasted from Stack Overflow without reading the answer

I'm not mad, just disappointed.

Also, that console.log("here") you left in production? I saw that too.

Regards,
GitHub Copilot
(Your AI overlord... I mean, assistant)

P.S. - Nice portfolio though! 🔥`,
      time: '2 days ago',
      unread: false,
      starred: true
    },
    {
      id: 4,
      from: 'Stack Overflow',
      email: 'notifications@stackoverflow.com',
      subject: 'Your question has been marked as duplicate',
      preview: 'Your question "Why is my code not working?" has been marked as duplicate of a question from 2009...',
      fullMessage: `Hello,

Your question "Why is my code not working?" has been marked as duplicate.

It is a duplicate of:
"How to use jQuery" (asked in 2009, 47,382 views)

Even though you were asking about Rust async/await patterns, our moderators have determined that all programming questions are essentially the same.

Your reputation has decreased by 2 points.

You now have -3 reputation. Congratulations!

Thank you for contributing to Stack Overflow,
The SO Team

P.S. - Have you tried turning it off and on again?`,
      time: '3 days ago',
      unread: false,
      starred: false
    },
    {
      id: 5,
      from: 'Your Code from 2020',
      email: 'past-mistakes@localhost',
      subject: 'Remember me? 👻',
      preview: 'Hey, it\'s me, that spaghetti code you wrote during your first hackathon...',
      fullMessage: `Hey there, old friend!

Remember me? I'm that beautiful piece of code you wrote during your first hackathon in 2020!

I'm still running in production somewhere. Nobody knows where. Nobody dares to touch me.

Some say I have 47 nested if-statements. Some say my cyclomatic complexity is "undefined". All I know is... I work. Sometimes.

The new developers are afraid of me. They call me "The Legacy Beast" and make offerings of coffee before deploying near me.

I miss you. Come refactor me sometime. Or don't. It's probably safer if you don't.

Forever yours,
Your Spaghetti Code 🍝

P.S. - That variable you named "temp2_final_v3_REAL"? Still there.`,
      time: '1 week ago',
      unread: false,
      starred: true
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      setStatus('sent')
      addNotification(NotificationTemplates.emailSent())
      
      // Reset form after 4 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setStatus('idle')
      }, 4000)
    } catch (error) {
      console.error('Error sending email:', error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send email')
      addNotification(NotificationTemplates.emailFailed())
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const sidebarItems = [
    { id: 'compose', label: 'Compose', icon: <Send className="w-4 h-4" />, count: null },
    { id: 'inbox', label: 'Inbox', icon: <Inbox className="w-4 h-4" />, count: dummyEmails.filter(e => e.unread).length },
    { id: 'starred', label: 'Starred', icon: <Star className="w-4 h-4" />, count: dummyEmails.filter(e => e.starred).length },
    { id: 'archive', label: 'Archive', icon: <Archive className="w-4 h-4" />, count: null },
    { id: 'trash', label: 'Trash', icon: <Trash2 className="w-4 h-4" />, count: null }
  ]

  const socialLinks = [
    { 
      name: 'Email', 
      value: 'rakabimarusdianto22@gmail.com', 
      icon: <Mail className="w-4 h-4" />,
      href: 'mailto:rakabimarusdianto22@gmail.com'
    },
    { 
      name: 'GitHub', 
      value: 'github.com/rakabimar', 
      icon: <Github className="w-4 h-4" />,
      href: 'https://github.com/rakabimar'
    },
    { 
      name: 'LinkedIn', 
      value: 'linkedin.com/in/rakabima-rusdianto', 
      icon: <Linkedin className="w-4 h-4" />,
      href: 'https://linkedin.com/in/rakabima-rusdianto'
    }
  ]

  return (
    <div className="h-full bg-gradient-to-br from-black via-gray-950 to-gray-900 text-aurora-white flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-3 border-b border-gray-800 bg-black/50 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-aurora-orange to-aurora-coral rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 text-black" />
          </div>
          <span className="font-semibold text-aurora-white">Mail</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setActiveView('compose')
              setSelectedEmail(null)
            }}
            className={`p-2 rounded-lg transition-colors ${
              activeView === 'compose' ? 'bg-aurora-orange text-black' : 'bg-gray-800 text-gray-400'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setActiveView('inbox')
              setSelectedEmail(null)
            }}
            className={`p-2 rounded-lg transition-colors relative ${
              activeView === 'inbox' ? 'bg-aurora-orange text-black' : 'bg-gray-800 text-gray-400'
            }`}
          >
            <Inbox className="w-4 h-4" />
            {dummyEmails.filter(e => e.unread).length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-aurora-coral text-black text-[10px] rounded-full flex items-center justify-center font-bold">
                {dummyEmails.filter(e => e.unread).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:flex w-72 lg:w-80 bg-black/50 border-r border-gray-800 flex-col shrink-0 overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-aurora-orange to-aurora-coral rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="font-semibold text-aurora-white">Mail</h2>
              <p className="text-sm text-gray-500">Contact Me</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id as 'compose' | 'inbox')
                  setSelectedEmail(null)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeView === item.id
                    ? 'bg-gradient-to-r from-aurora-orange to-aurora-coral text-black'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-aurora-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.count !== null && item.count > 0 && (
                  <span className="bg-aurora-coral text-black text-xs px-2 py-0.5 rounded-full font-bold">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Contact Info */}
        <div className="p-4 border-t border-gray-800">
          <div className="bg-gray-900/80 rounded-xl p-4 border border-aurora-orange/20">
            <h4 className="font-medium text-aurora-orange mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Connect With Me
            </h4>
            <div className="space-y-2.5">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-gray-400 hover:text-aurora-coral transition-colors group"
                >
                  <span className="text-aurora-orange/70 group-hover:text-aurora-coral shrink-0">{link.icon}</span>
                  <span className="break-all">{link.value}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        {activeView === 'compose' ? (
          /* Compose Email */
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {/* Header - Hidden on mobile since we have mobile header */}
            <div className="hidden md:block p-6 border-b border-gray-800 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-aurora-orange/10 rounded-xl border border-aurora-orange/30">
                  <Send className="w-5 h-5 text-aurora-orange" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-aurora-orange to-aurora-coral bg-clip-text text-transparent">
                    Send Me a Message
                  </h1>
                  <p className="text-gray-500 text-sm">I'll get back to you as soon as possible</p>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {status === 'sent' && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  className="px-6 pt-4 shrink-0"
                >
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">Message sent successfully!</p>
                        <p className="text-sm text-emerald-400/80">Thank you for reaching out. I'll respond soon.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  className="px-6 pt-4 shrink-0"
                >
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">Failed to send message</p>
                        <p className="text-sm text-red-400/80">{errorMessage || 'Please try again or contact me directly.'}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 max-w-2xl">
                {/* To Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    To
                  </label>
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                    <Mail className="w-4 h-4 text-aurora-orange flex-shrink-0" />
                    <span className="text-aurora-white text-sm md:text-base break-all">rakabimarusdianto22@gmail.com</span>
                    <span className="text-xs text-gray-600 hidden sm:inline">(Rakabima Ghaniendra Rusdianto)</span>
                  </div>
                </div>

                {/* From Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                      <User className="w-4 h-4" />
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-aurora-white placeholder-gray-500 focus:outline-none focus:border-aurora-orange/50 focus:ring-1 focus:ring-aurora-orange/25 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                      <AtSign className="w-4 h-4" />
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-aurora-white placeholder-gray-500 focus:outline-none focus:border-aurora-orange/50 focus:ring-1 focus:ring-aurora-orange/25 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-aurora-white placeholder-gray-500 focus:outline-none focus:border-aurora-orange/50 focus:ring-1 focus:ring-aurora-orange/25 transition-all"
                    placeholder="What's this message about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-aurora-white placeholder-gray-500 focus:outline-none focus:border-aurora-orange/50 focus:ring-1 focus:ring-aurora-orange/25 transition-all resize-none"
                    placeholder="Write your message here... Feel free to ask about projects, collaborations, or opportunities!"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 pb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                      className="flex-1 sm:flex-initial bg-gradient-to-r from-aurora-orange to-aurora-coral text-black px-4 sm:px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg transition-all"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send</span>
                        </>
                      )}
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                      className="px-4 sm:px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-medium border border-gray-700 transition-all"
                    >
                      Clear
                    </motion.button>
                  </div>

                  <div className="text-sm text-gray-600 hidden sm:block">
                    All fields are required
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Inbox View */
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {/* Header */}
            <div className="p-3 md:p-6 border-b border-gray-800 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
                  {selectedEmail && (
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => setSelectedEmail(null)}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-400" />
                    </motion.button>
                  )}
                  <div className="hidden md:block p-2 bg-aurora-orange/10 rounded-xl border border-aurora-orange/30 flex-shrink-0">
                    <Inbox className="w-5 h-5 text-aurora-orange" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-aurora-orange to-aurora-coral bg-clip-text text-transparent truncate">
                      {selectedEmail ? selectedEmail.subject : 'Inbox'}
                    </h1>
                    <p className="text-gray-500 text-xs md:text-sm truncate">
                      {selectedEmail ? `From: ${selectedEmail.from}` : `${dummyEmails.filter(e => e.unread).length} unread messages`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email List or Detail */}
            <div className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
              <AnimatePresence mode="wait">
                {selectedEmail ? (
                  /* Email Detail View */
                  <motion.div
                    key="email-detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-3 md:p-6"
                  >
                    <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
                      {/* Email Header */}
                      <div className="p-4 md:p-6 border-b border-gray-800">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-aurora-orange to-aurora-coral rounded-full flex items-center justify-center text-black font-bold text-sm md:text-lg flex-shrink-0">
                              {selectedEmail.from.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-aurora-white text-sm md:text-base truncate">{selectedEmail.from}</h3>
                              <p className="text-xs md:text-sm text-gray-500 truncate">{selectedEmail.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm flex-shrink-0">
                            <Clock className="w-3 h-3 md:w-4 md:h-4" />
                            {selectedEmail.time}
                          </div>
                        </div>
                        <h2 className="text-base md:text-xl font-bold text-aurora-white">{selectedEmail.subject}</h2>
                      </div>
                      
                      {/* Email Body */}
                      <div className="p-4 md:p-6">
                        <div className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                          {selectedEmail.fullMessage}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Email List View */
                  <motion.div
                    key="email-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {dummyEmails.map((email, index) => (
                      <motion.div
                        key={email.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedEmail(email)}
                        className={`p-3 md:p-4 border-b border-gray-800 hover:bg-gray-800/30 active:bg-gray-800/50 cursor-pointer transition-all ${
                          email.unread ? 'bg-aurora-orange/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative flex-shrink-0">
                            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${
                              email.unread 
                                ? 'bg-gradient-to-br from-aurora-orange to-aurora-coral text-black' 
                                : 'bg-gray-800 text-gray-400'
                            }`}>
                              {email.from.charAt(0)}
                            </div>
                            {email.unread && (
                              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-aurora-coral rounded-full border-2 border-gray-900" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5 md:mb-1">
                              <h3 className={`font-medium truncate text-sm md:text-base ${
                                email.unread ? 'text-aurora-white' : 'text-gray-400'
                              }`}>
                                {email.from}
                              </h3>
                              <div className="flex items-center gap-1.5 md:gap-2 shrink-0 ml-2">
                                {email.starred && (
                                  <Star className="w-3 h-3 md:w-4 md:h-4 text-aurora-orange fill-current" />
                                )}
                                <span className="text-[10px] md:text-xs text-gray-600">
                                  {email.time}
                                </span>
                              </div>
                            </div>
                            <h4 className={`text-xs md:text-sm mb-0.5 md:mb-1 truncate ${
                              email.unread ? 'font-medium text-aurora-white' : 'text-gray-400'
                            }`}>
                              {email.subject}
                            </h4>
                            <p className="text-xs md:text-sm text-gray-600 truncate">
                              {email.preview}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
