"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Bell, Mail, Code, Shield, Trophy, CheckCircle, AlertCircle, Info, Sparkles, User } from 'lucide-react'

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  icon: ReactNode
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  timestamp: number
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now()
    const diff = now - timestamp
    
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (seconds < 5) return 'Just now'
    if (seconds < 60) return `${seconds} sec ago`
    if (minutes < 60) return `${minutes} min ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'time' | 'read' | 'timestamp'>) => {
    const timestamp = Date.now()
    const newNotification: Notification = {
      ...notification,
      id: `notification-${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
      time: formatTimeAgo(timestamp),
      read: false,
      timestamp
    }
    
    setNotifications(prev => [newNotification, ...prev])
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  // Update times periodically
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => 
        prev.map(n => ({ ...n, time: formatTimeAgo(n.timestamp) }))
      )
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      removeNotification,
      markAsRead,
      markAllAsRead,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Helper functions to create common notifications
export const NotificationTemplates = {
  welcome: () => ({
    title: 'Welcome to My Portfolio! 👋',
    message: 'Thanks for visiting! Feel free to explore my projects, skills, and experience. Click on any app to get started.',
    icon: <Sparkles className="w-5 h-5" />,
    type: 'info' as const
  }),
  
  emailSent: (recipientName?: string) => ({
    title: 'Email Sent Successfully! ✉️',
    message: recipientName 
      ? `Your message to ${recipientName} has been delivered. I'll get back to you soon!`
      : 'Your message has been delivered successfully. I\'ll get back to you soon!',
    icon: <Mail className="w-5 h-5" />,
    type: 'success' as const
  }),
  
  emailFailed: () => ({
    title: 'Email Failed to Send',
    message: 'There was an error sending your message. Please try again or contact me directly.',
    icon: <AlertCircle className="w-5 h-5" />,
    type: 'error' as const
  }),
  
  appOpened: (appName: string) => ({
    title: `${appName} Opened`,
    message: `You're now viewing ${appName}. Enjoy exploring!`,
    icon: <Info className="w-5 h-5" />,
    type: 'info' as const
  }),
  
  projectViewed: (projectName: string) => ({
    title: 'Project Details',
    message: `You're viewing "${projectName}". Check out the tech stack and live demo!`,
    icon: <Code className="w-5 h-5" />,
    type: 'info' as const
  }),
  
  awardViewed: (awardName: string) => ({
    title: 'Achievement Unlocked! 🏆',
    message: `You discovered the "${awardName}" award. Pretty cool, right?`,
    icon: <Trophy className="w-5 h-5" />,
    type: 'success' as const
  }),
  
  resumeDownloaded: () => ({
    title: 'Resume Downloaded',
    message: 'Thanks for your interest! Feel free to reach out if you have any questions.',
    icon: <CheckCircle className="w-5 h-5" />,
    type: 'success' as const
  }),
  
  terminalCommand: (command: string) => ({
    title: 'Terminal Activity',
    message: `Command executed: ${command}`,
    icon: <Code className="w-5 h-5" />,
    type: 'info' as const
  }),
  
  securityAlert: (message: string) => ({
    title: 'Security Notice',
    message: message,
    icon: <Shield className="w-5 h-5" />,
    type: 'warning' as const
  }),
  
  aboutMeViewed: () => ({
    title: 'Nice to Meet You! 👤',
    message: 'Thanks for checking out my profile. Feel free to explore my journey and projects!',
    icon: <User className="w-5 h-5" />,
    type: 'info' as const
  })
}
