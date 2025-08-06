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
      case 'success': return 'border-green-500 bg-green-500/10'
      case 'warning': return 'border-yellow-500 bg-yellow-500/10'
      case 'error': return 'border-red-500 bg-red-500/10'
      default: return 'border-blue-500 bg-blue-500/10'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-8 right-4 w-80 bg-gray-900 rounded-lg border border-gray-700 shadow-2xl z-50 overflow-hidden"
          initial={{ opacity: 0, x: 300, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 300, y: -20 }}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-white font-semibold">Notifications</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                className={`p-4 border-l-4 ${getNotificationColor(notification.type)} hover:bg-gray-800/50 transition-colors cursor-pointer`}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-gray-400 mt-1">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm">
                      {notification.title}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-700 bg-gray-800/50">
            <button className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors">
              Clear all notifications
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
