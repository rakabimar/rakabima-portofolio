"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, Trash2, CheckCheck } from 'lucide-react'
import { useNotifications } from '@/contexts/notification-context'

interface LinuxNotificationsProps {
  isOpen: boolean
  onClose: () => void
}

export default function LinuxNotifications({ isOpen, onClose }: LinuxNotificationsProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll, removeNotification } = useNotifications()

  const getNotificationColor = (type: string, read: boolean) => {
    const opacity = read ? '0.5' : '1'
    switch (type) {
      case 'success': return `border-emerald-500 bg-emerald-500/10`
      case 'warning': return `border-aurora-orange bg-aurora-orange/10`
      case 'error': return `border-red-500 bg-red-500/10`
      default: return `border-aurora-coral bg-aurora-coral/10`
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-emerald-400'
      case 'warning': return 'text-aurora-orange'
      case 'error': return 'text-red-400'
      default: return 'text-aurora-coral'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Notification Panel */}
          <motion.div
            className="fixed top-10 right-4 w-96 bg-gray-900/95 backdrop-blur-md rounded-2xl border border-aurora-orange/30 shadow-2xl shadow-black/50 z-50 overflow-hidden"
            initial={{ opacity: 0, x: 50, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-black/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-aurora-orange/10 rounded-lg border border-aurora-orange/30">
                  <Bell className="w-4 h-4 text-aurora-orange" />
                </div>
                <div>
                  <h3 className="text-aurora-white font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <p className="text-xs text-gray-500">{unreadCount} unread</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {notifications.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="p-2 text-gray-500 hover:text-aurora-coral hover:bg-gray-800 rounded-lg transition-colors"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-aurora-coral hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[400px] overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {notifications.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                      <Bell className="w-8 h-8 text-gray-600" />
                    </div>
                    <p className="text-gray-500 text-sm">No notifications yet</p>
                    <p className="text-gray-600 text-xs mt-1">You're all caught up!</p>
                  </motion.div>
                ) : (
                  notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50, height: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 border-l-4 ${getNotificationColor(notification.type, notification.read)} hover:bg-gray-800/30 transition-colors cursor-pointer group ${notification.read ? 'opacity-60' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${getIconColor(notification.type)}`}>
                          {notification.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-aurora-white font-medium text-sm">
                              {notification.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-400 transition-all"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <p className="text-gray-600 text-xs">
                              {notification.time}
                            </p>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-aurora-coral rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-800 bg-black/30">
                <button 
                  onClick={clearAll}
                  className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-aurora-coral transition-colors py-2 hover:bg-gray-800/50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear all notifications
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}