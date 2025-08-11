"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, Calendar, Mail, Shield, Code } from 'lucide-react'

interface LinuxNotificationsProps {
  isOpen: boolean
  onClose: () => void
}

const notifications = [
  {
    id: 1,
    title: 'Welcome to Portfolio',
    message: 'Thanks for visiting my interactive Linux desktop portfolio!',
    time: '2 min ago',
    icon: <Bell className="w-5 h-5" />,
    type: 'info'
  },
  {
    id: 2,
    title: 'New Project Added',
    message: 'Check out my latest cybersecurity project in the Projects app.',
    time: '1 hour ago',
    icon: <Code className="w-5 h-5" />,
    type: 'success'
  },
  {
    id: 3,
    title: 'Security Update',
    message: 'System security tools have been updated with new features.',
    time: '3 hours ago',
    icon: <Shield className="w-5 h-5" />,
    type: 'warning'
  },
  {
    id: 4,
    title: 'Contact Request',
    message: 'Someone viewed your contact information. Check the email app.',
    time: '1 day ago',
    icon: <Mail className="w-5 h-5" />,
    type: 'info'
  }
]

export default function LinuxNotifications({ isOpen, onClose }: LinuxNotificationsProps) {
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-aurora-green bg-aurora-green/10'
      case 'warning': return 'border-aurora-orange bg-aurora-orange/10'
      case 'error': return 'border-aurora-coral bg-aurora-coral/10'
      default: return 'border-app-accent bg-app-accent/10'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-8 right-4 w-80 bg-desktop-secondary/95 backdrop-blur-sm rounded-lg border border-desktop-border shadow-aurora z-50 overflow-hidden"
          initial={{ opacity: 0, x: 300, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 300, y: -20 }}
        >
          {/* Header - Desktop Theme */}
          <div className="p-4 border-b border-desktop-border flex items-center justify-between">
            <h3 className="text-aurora-white font-semibold">Notifications</h3>
            <button
              onClick={onClose}
              className="text-desktop-muted hover:text-aurora-coral transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                className={`p-4 border-l-4 ${getNotificationColor(notification.type)} hover:bg-aurora-orange/10 transition-colors cursor-pointer`}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-desktop-muted mt-1">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-aurora-white font-medium text-sm">
                      {notification.title}
                    </h4>
                    <p className="text-aurora-white text-sm mt-1 leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-aurora-white/70 text-xs mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer - Desktop Theme */}
          <div className="p-3 border-t border-desktop-border bg-desktop-secondary/50">
            <button className="w-full text-center text-sm text-aurora-white hover:text-aurora-coral transition-colors">
              Clear all notifications
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}