"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, User, AtSign, MessageSquare, Paperclip, Star, Archive, Trash2, Inbox, DraftingCompassIcon as Drafts } from 'lucide-react'

export default function LinuxEmailApp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [activeView, setActiveView] = useState<'compose' | 'inbox'>('compose')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create mailto link with form data
      const mailtoLink = `mailto:your.email@example.com?subject=${encodeURIComponent(
        `Portfolio Contact: ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from Portfolio Contact Form`
      )}`
      
      // Open default email client
      window.open(mailtoLink)
      setStatus('sent')
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setStatus('idle')
      }, 3000)
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
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
    { id: 'inbox', label: 'Inbox', icon: <Inbox className="w-4 h-4" />, count: 3 },
    { id: 'starred', label: 'Starred', icon: <Star className="w-4 h-4" />, count: null },
    { id: 'drafts', label: 'Drafts', icon: <Drafts className="w-4 h-4" />, count: 1 },
    { id: 'archive', label: 'Archive', icon: <Archive className="w-4 h-4" />, count: null },
    { id: 'trash', label: 'Trash', icon: <Trash2 className="w-4 h-4" />, count: null }
  ]

  const mockEmails = [
    {
      id: 1,
      from: 'Portfolio Visitor',
      subject: 'Interested in your cybersecurity projects',
      preview: 'Hi! I saw your portfolio and I\'m really impressed with your work...',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      from: 'Tech Recruiter',
      subject: 'Job Opportunity - Security Engineer',
      preview: 'We have an exciting opportunity that matches your skills...',
      time: '1 day ago',
      unread: true
    },
    {
      id: 3,
      from: 'GitHub',
      subject: 'New star on your repository',
      preview: 'Someone starred your terminal-portfolio repository...',
      time: '2 days ago',
      unread: false
    }
  ]

  return (
    <div className="h-full bg-white text-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Mail</h2>
              <p className="text-sm text-gray-500">Portfolio Contact</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as 'compose' | 'inbox')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === item.id
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Contact Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-3">
            <h4 className="font-medium text-blue-900 mb-2">Contact Information</h4>
            <div className="space-y-1 text-sm text-blue-700">
              <div className="flex items-center space-x-2">
                <Mail className="w-3 h-3" />
                <span>your.email@example.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-3 h-3" />
                <span>LinkedIn: /in/yourprofile</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-3 h-3" />
                <span>GitHub: /yourusername</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeView === 'compose' ? (
          /* Compose Email */
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Send className="w-6 h-6 text-orange-500" />
                <h1 className="text-2xl font-bold text-gray-900">Compose Message</h1>
              </div>
              <p className="text-gray-600 mt-1">Send me a message directly through this form</p>
            </div>

            {/* Status Messages */}
            <div className="px-6">
              {status === 'sent' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mt-4"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <p className="font-medium">Message sent successfully!</p>
                      <p className="text-sm">Your default email client should open with the message.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mt-4"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <div>
                      <p className="font-medium">Failed to send message</p>
                      <p className="text-sm">Please try again or contact me directly.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Form */}
            <div className="flex-1 p-6">
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                {/* To Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">your.email@example.com</span>
                  </div>
                </div>

                {/* From Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      <AtSign className="w-4 h-4 inline mr-1" />
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="What's this message about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                    placeholder="Write your message here..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Feel free to ask about my projects, experience, or potential opportunities.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      type="submit"
                      disabled={status === 'sending'}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 flex items-center space-x-2"
                    >
                      {status === 'sending' ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                    >
                      Clear
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Paperclip className="w-4 h-4" />
                    <span>Attachments not supported</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Inbox View */
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Inbox className="w-6 h-6 text-orange-500" />
                  <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
                </div>
                <div className="text-sm text-gray-500">
                  {mockEmails.filter(e => e.unread).length} unread
                </div>
              </div>
            </div>

            {/* Email List */}
            <div className="flex-1 overflow-y-auto">
              {mockEmails.map((email) => (
                <div
                  key={email.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    email.unread ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      email.unread ? 'bg-orange-500' : 'bg-transparent'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium truncate ${
                          email.unread ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {email.from}
                        </h3>
                        <span className="text-sm text-gray-500 flex-shrink-0">
                          {email.time}
                        </span>
                      </div>
                      <h4 className={`text-sm mb-1 truncate ${
                        email.unread ? 'font-medium text-gray-900' : 'text-gray-700'
                      }`}>
                        {email.subject}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {email.preview}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
