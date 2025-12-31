"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion"
import { 
  ArrowLeft, 
  Wifi, 
  Battery, 
  Signal, 
  Grid3X3, 
  Search, 
  X, 
  ChevronUp,
  ChevronDown,
  Bell,
  Trash2,
  CheckCircle,
  Home
} from 'lucide-react'
import { useNotifications, Notification } from "@/contexts/notification-context"

interface App {
  id: string
  title: string
  icon: React.ReactNode
  category: string
}

interface OpenApp {
  id: string
  title: string
  icon: React.ReactNode
  component: React.ReactNode
}

interface LinuxMobileInterfaceProps {
  apps: App[]
  openApp: (appId: string) => void
  openApps: OpenApp[]
  activeApp: string | null
  closeApp: (appId: string) => void
  bringToFront: (appId: string) => void
}

export default function LinuxMobileInterface({
  apps,
  openApp,
  openApps,
  activeApp,
  closeApp,
  bringToFront
}: LinuxMobileInterfaceProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showNotificationCenter, setShowNotificationCenter] = useState(false)
  const [showAppSwitcher, setShowAppSwitcher] = useState(false)
  const [showAppDrawer, setShowAppDrawer] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  
  // Dock visibility state for when app is open
  const [showDockInApp, setShowDockInApp] = useState(false)
  const dockTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const appContentRef = useRef<HTMLDivElement | null>(null)
  
  // Gesture tracking
  const notificationPullY = useMotionValue(0)
  const appSwitcherY = useMotionValue(0)
  
  // Notifications
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll, removeNotification, onNotificationAdded } = useNotifications()
  
  // Dynamic Island state
  const [dynamicIslandExpanded, setDynamicIslandExpanded] = useState(false)
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null)
  const dynamicIslandTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  
  // Handle scroll to show dock when at bottom
  const handleAppScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    const isAtBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 50
    
    if (isAtBottom && activeApp) {
      // Show dock
      setShowDockInApp(true)
      
      // Clear existing timeout
      if (dockTimeoutRef.current) {
        clearTimeout(dockTimeoutRef.current)
      }
      
      // Auto-hide after 2 seconds
      dockTimeoutRef.current = setTimeout(() => {
        setShowDockInApp(false)
      }, 2000)
    }
  }
  
  // Handle swipe up from bottom edge to show dock
  const handleBottomSwipe = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    const screenHeight = window.innerHeight
    const touchY = touch.clientY
    
    // If touch is in bottom 60px of screen, show dock
    if (touchY > screenHeight - 60 && activeApp) {
      setShowDockInApp(true)
      
      // Clear existing timeout
      if (dockTimeoutRef.current) {
        clearTimeout(dockTimeoutRef.current)
      }
      
      // Auto-hide after 2.5 seconds
      dockTimeoutRef.current = setTimeout(() => {
        setShowDockInApp(false)
      }, 2500)
    }
  }
  
  // Clean up dock timeout on unmount or app change
  useEffect(() => {
    return () => {
      if (dockTimeoutRef.current) {
        clearTimeout(dockTimeoutRef.current)
      }
    }
  }, [])
  
  // Hide dock when switching apps
  useEffect(() => {
    setShowDockInApp(false)
    if (dockTimeoutRef.current) {
      clearTimeout(dockTimeoutRef.current)
    }
  }, [activeApp])

  // Subscribe to new notifications for Dynamic Island animation
  useEffect(() => {
    const unsubscribe = onNotificationAdded((notification: Notification) => {
      // Clear any existing timeout
      if (dynamicIslandTimeoutRef.current) {
        clearTimeout(dynamicIslandTimeoutRef.current)
      }
      
      // Show the notification in Dynamic Island
      setCurrentNotification(notification)
      setDynamicIslandExpanded(true)
      
      // Auto-collapse after 4 seconds
      dynamicIslandTimeoutRef.current = setTimeout(() => {
        setDynamicIslandExpanded(false)
        // Clear notification after collapse animation
        setTimeout(() => setCurrentNotification(null), 300)
      }, 4000)
    })
    
    return () => {
      unsubscribe()
      if (dynamicIslandTimeoutRef.current) {
        clearTimeout(dynamicIslandTimeoutRef.current)
      }
    }
  }, [onNotificationAdded])

  const activeAppData = openApps.find(app => app.id === activeApp)
  const filteredApps = apps.filter(app =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Dock apps - matching desktop shortcuts
  const dockApps = [
    apps.find(app => app.id === 'about'),
    apps.find(app => app.id === 'projects'),
    apps.find(app => app.id === 'terminal'),
    apps.find(app => app.id === 'ai-chat')
  ].filter((app): app is App => app !== undefined)

  // Home grid apps - specific order: About Me, Projects, Resume, Mail, Files, AI Chat
  const homeGridIds = ['about', 'projects', 'resume', 'email', 'file-manager', 'ai-chat']
  
  // Home apps - ordered list for the home screen grid
  const homeApps = homeGridIds
    .map(id => apps.find(app => app.id === id))
    .filter((app): app is App => app !== undefined)
  const appsPerPage = 12
  const totalPages = Math.ceil(homeApps.length / appsPerPage)
  const currentPageApps = homeApps.slice(currentPage * appsPerPage, (currentPage + 1) * appsPerPage)

  // Handle notification center pull down
  const handleNotificationPanStart = () => {
    // Reset motion value
  }

  const handleNotificationPan = (event: TouchEvent | MouseEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 0 && !showAppSwitcher) {
      notificationPullY.set(Math.min(info.offset.y, 400))
    }
  }

  const handleNotificationPanEnd = (event: TouchEvent | MouseEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 && !showAppSwitcher) {
      setShowNotificationCenter(true)
    }
    notificationPullY.set(0)
  }

  // Handle app switcher pull up
  const handleAppSwitcherPan = (event: TouchEvent | MouseEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < 0 && !showNotificationCenter) {
      appSwitcherY.set(Math.max(info.offset.y, -300))
    }
  }

  const handleAppSwitcherPanEnd = (event: TouchEvent | MouseEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -80 && !showNotificationCenter && openApps.length > 0) {
      setShowAppSwitcher(true)
    }
    appSwitcherY.set(0)
  }

  // Close app with swipe
  const handleAppSwipeClose = (appId: string) => {
    closeApp(appId)
    if (openApps.length <= 1) {
      setShowAppSwitcher(false)
    }
  }

  // Format date for lock screen style
  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="h-[100dvh] w-full relative overflow-hidden flex flex-col bg-[#0a0a0f]">
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 animate-aurora-pulse"
          style={{
            background: `
              radial-gradient(ellipse at 30% 70%, rgba(220, 96, 63, 0.2) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(59, 143, 219, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 50%, rgba(255, 127, 92, 0.1) 0%, transparent 70%)
            `
          }}
        />
        {/* Floating orbs */}
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(220, 96, 63, 0.3) 0%, transparent 70%)',
            top: '20%',
            left: '10%'
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 143, 219, 0.25) 0%, transparent 70%)',
            bottom: '30%',
            right: '5%'
          }}
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Status Bar - iOS Style */}
      <motion.div 
        className="h-11 flex items-center justify-between px-6 text-aurora-white text-sm font-medium z-50 relative"
        onPanStart={handleNotificationPanStart}
        onPan={handleNotificationPan}
        onPanEnd={handleNotificationPanEnd}
      >
        <div className="flex items-center space-x-1">
          <span className="font-semibold">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {/* Dynamic Island */}
        <motion.div 
          className="absolute left-1/2 flex items-center justify-center cursor-pointer z-50"
          style={{ x: "-50%" }}
          onClick={() => {
            if (dynamicIslandExpanded) {
              // If expanded with notification, tap to open notification center
              setDynamicIslandExpanded(false)
              setCurrentNotification(null)
              if (dynamicIslandTimeoutRef.current) {
                clearTimeout(dynamicIslandTimeoutRef.current)
              }
              setShowNotificationCenter(true)
            } else {
              setShowNotificationCenter(true)
            }
          }}
          initial={false}
          animate={{
            y: dynamicIslandExpanded ? 28 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        >
          <motion.div 
            className="bg-black flex items-center justify-center overflow-hidden"
            initial={false}
            animate={{
              width: dynamicIslandExpanded ? 280 : 112,
              height: dynamicIslandExpanded ? 72 : 28,
              borderRadius: dynamicIslandExpanded ? 24 : 14,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          >
            <AnimatePresence mode="wait">
              {dynamicIslandExpanded && currentNotification ? (
                <motion.div
                  key="expanded"
                  className="flex items-center gap-3 px-4 w-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Notification Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    currentNotification.type === 'success' ? 'bg-green-500/20 text-green-400' :
                    currentNotification.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    currentNotification.type === 'error' ? 'bg-red-500/20 text-red-400' :
                    'bg-aurora-orange/20 text-aurora-orange'
                  }`}>
                    <div className="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5">
                      {currentNotification.icon}
                    </div>
                  </div>
                  
                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-aurora-white text-sm font-semibold truncate">
                      {currentNotification.title}
                    </p>
                    <p className="text-aurora-white/60 text-xs truncate">
                      {currentNotification.message}
                    </p>
                  </div>
                  
                  {/* Progress indicator */}
                  <motion.div
                    className="absolute bottom-2 left-4 right-4 h-0.5 bg-aurora-white/10 rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-aurora-orange"
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 4, ease: "linear" }}
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  className="flex items-center space-x-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  {unreadCount > 0 ? (
                    <>
                      <Bell className="w-3.5 h-3.5 text-aurora-orange" />
                      <span className="text-xs text-aurora-orange font-medium">{unreadCount}</span>
                    </>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <div className="flex items-center space-x-1.5">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <div className="flex items-center">
            <Battery className="w-5 h-5" />
          </div>
        </div>
      </motion.div>

      {/* Pull indicator for notification center */}
      <motion.div
        className="absolute top-11 left-1/2 -translate-x-1/2 z-40"
        style={{ y: useTransform(notificationPullY, [0, 100], [0, 50]) }}
      >
        <motion.div
          className="w-10 h-1 bg-aurora-white/30 rounded-full"
          style={{ 
            opacity: useTransform(notificationPullY, [0, 50, 100], [0, 0.5, 1]),
            scaleX: useTransform(notificationPullY, [0, 100], [0.5, 1])
          }}
        />
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 min-h-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeAppData ? (
            /* Full-screen app view */
            <motion.div 
              key="app-view"
              className="h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              {/* App Header */}
              <div className="h-14 bg-[#0d0d14]/90 backdrop-blur-xl border-b border-aurora-orange/20 flex items-center justify-between px-4">
                <motion.button
                  onClick={() => closeApp(activeApp!)}
                  className="p-2 hover:bg-aurora-orange/20 rounded-xl transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeft className="w-5 h-5 text-aurora-white" />
                </motion.button>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 text-aurora-orange flex items-center justify-center">
                    {activeAppData.icon}
                  </div>
                  <span className="text-aurora-white font-medium">{activeAppData.title}</span>
                </div>
                <motion.button
                  onClick={() => setShowAppDrawer(true)}
                  className="p-2 hover:bg-aurora-orange/20 rounded-xl transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <Grid3X3 className="w-5 h-5 text-aurora-white" />
                </motion.button>
              </div>
              
              {/* App Content */}
              <div 
                ref={appContentRef}
                onScroll={handleAppScroll}
                onTouchMove={handleBottomSwipe}
                className="flex-1 overflow-y-auto overscroll-contain bg-gradient-to-b from-[#0d0d14] to-[#0a0a0f] relative" 
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {activeAppData.component}
                
                {/* Bottom swipe area indicator - always visible when dock is hidden */}
                {!showDockInApp && (
                  <div 
                    className="sticky bottom-0 left-0 right-0 h-8 flex justify-center items-end pb-1 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9), transparent)' }}
                  >
                    <div className="w-32 h-1 bg-aurora-white/30 rounded-full" />
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Home Screen */
            <motion.div 
              key="home-screen"
              className="h-full flex flex-col pt-4 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Date & Time Display */}
              <div className="text-center mb-4 sm:mb-6 px-6 flex-shrink-0">
                <motion.p 
                  className="text-aurora-white/60 text-xs sm:text-sm mb-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {formatDate()}
                </motion.p>
                <motion.h1 
                  className="text-4xl sm:text-5xl font-light text-aurora-white"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </motion.h1>
              </div>

              {/* Notification Preview Widget */}
              {unreadCount > 0 && (
                <motion.div 
                  className="mx-6 mb-4 sm:mb-6 flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    className="w-full p-3 sm:p-4 bg-[#1a1a24]/80 backdrop-blur-xl rounded-2xl border border-aurora-orange/20 text-left"
                    onClick={() => setShowNotificationCenter(true)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-aurora-orange/20 rounded-full flex items-center justify-center">
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-aurora-orange" />
                      </div>
                      <div className="flex-1">
                        <p className="text-aurora-white font-medium text-xs sm:text-sm">
                          {unreadCount} new notification{unreadCount > 1 ? 's' : ''}
                        </p>
                        <p className="text-aurora-white/50 text-[10px] sm:text-xs">
                          Tap to view
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-aurora-white/40" />
                    </div>
                  </motion.button>
                </motion.div>
              )}

              {/* App Grid */}
              <div className="flex-1 px-4 sm:px-6 pb-2 overflow-y-auto min-h-0" style={{ WebkitOverflowScrolling: 'touch' as const }}>
                <div className="grid grid-cols-4 gap-3 sm:gap-4">
                  {currentPageApps.map((app, index) => (
                    <motion.button
                      key={app.id}
                      className="flex flex-col items-center space-y-1 sm:space-y-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * index }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openApp(app.id)}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#1a1a24] to-[#0d0d14] rounded-xl sm:rounded-2xl flex items-center justify-center text-aurora-orange border border-aurora-orange/30 shadow-lg shadow-aurora-orange/10">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                          {app.icon}
                        </div>
                      </div>
                      <span className="text-aurora-white text-[10px] sm:text-[11px] font-medium text-center leading-tight max-w-[56px] sm:max-w-[60px] truncate">
                        {app.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Page Indicator */}
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2 py-2 flex-shrink-0">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <motion.button
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentPage ? 'bg-aurora-orange' : 'bg-aurora-white/30'
                      }`}
                      onClick={() => setCurrentPage(i)}
                      whileTap={{ scale: 0.8 }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dock - Fixed at bottom, overlay when app is open */}
      <AnimatePresence>
        {(!activeApp || showDockInApp) && (
          <motion.div 
            className={`${activeApp ? 'absolute bottom-0 left-0 right-0' : 'relative'} z-20 pb-2 px-4 flex-shrink-0`}
            initial={activeApp ? { y: 100, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onPan={handleAppSwitcherPan}
            onPanEnd={handleAppSwitcherPanEnd}
          >
            {/* Swipe up indicator */}
            {openApps.length > 0 && !activeApp && (
              <motion.div 
                className="flex justify-center mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex flex-col items-center">
                  <ChevronUp className="w-4 h-4 text-aurora-white/30 animate-bounce" />
                  <span className="text-[10px] text-aurora-white/30">Swipe for recent apps</span>
                </div>
              </motion.div>
            )}
            
            <div className="bg-[#1a1a24]/80 backdrop-blur-xl rounded-3xl border border-aurora-orange/20 p-3 shadow-2xl">
              <div className="flex justify-around items-center">
                {dockApps.map((app) => (
                  <motion.button
                    key={app.id}
                    className="flex flex-col items-center"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => openApp(app.id)}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      openApps.find(o => o.id === app.id)
                        ? 'bg-aurora-orange text-white shadow-lg shadow-aurora-orange/40'
                        : 'bg-gradient-to-br from-[#252530] to-[#1a1a24] text-aurora-orange border border-aurora-orange/30'
                    }`}>
                      <div className="w-7 h-7 flex items-center justify-center">
                        {app.icon}
                      </div>
                    </div>
                    {/* Running indicator dot */}
                    {openApps.find(o => o.id === app.id) && (
                      <motion.div 
                        className="w-1.5 h-1.5 bg-aurora-orange rounded-full mt-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </motion.button>
                ))}
                
                {/* App drawer button */}
                <motion.button
                  className="flex flex-col items-center"
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setShowAppDrawer(true)}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#252530] to-[#1a1a24] rounded-2xl flex items-center justify-center text-aurora-white/70 border border-aurora-white/10">
                    <Grid3X3 className="w-6 h-6" />
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Home Indicator Bar */}
            <div className="flex justify-center mt-2">
              <div className="w-32 h-1 bg-aurora-white/30 rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== NOTIFICATION CENTER ===== */}
      <AnimatePresence>
        {showNotificationCenter && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Blur Background */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />
            
            <div className="relative flex flex-col h-full">
              {/* Header */}
              <div className="pt-12 pb-4 px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-aurora-white text-2xl font-light">
                      {formatDate()}
                    </h2>
                    <p className="text-aurora-white/50 text-sm mt-1">
                      {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setShowNotificationCenter(false)}
                    className="p-3 bg-aurora-orange/20 rounded-full"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-aurora-orange" />
                  </motion.button>
                </div>
                
                {/* Quick Actions */}
                {notifications.length > 0 && (
                  <div className="flex space-x-2 mt-4">
                    <motion.button
                      onClick={markAllAsRead}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#1a1a24]/80 rounded-full text-aurora-white/70 text-sm"
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark all read</span>
                    </motion.button>
                    <motion.button
                      onClick={clearAll}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#1a1a24]/80 rounded-full text-aurora-white/70 text-sm"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear all</span>
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Notification List */}
              <div className="flex-1 overflow-y-auto px-4 pb-8">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 bg-aurora-orange/10 rounded-full flex items-center justify-center mb-4">
                      <Bell className="w-10 h-10 text-aurora-orange/50" />
                    </div>
                    <p className="text-aurora-white/50 text-lg">No notifications</p>
                    <p className="text-aurora-white/30 text-sm mt-1">You&apos;re all caught up!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 bg-[#1a1a24]/90 backdrop-blur-sm rounded-2xl border ${
                          notification.read 
                            ? 'border-aurora-white/10' 
                            : 'border-aurora-orange/30'
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            notification.type === 'success' ? 'bg-green-500/20 text-green-400' :
                            notification.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                            notification.type === 'error' ? 'bg-red-500/20 text-red-400' :
                            'bg-aurora-orange/20 text-aurora-orange'
                          }`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <p className="text-aurora-white font-medium text-sm">
                                {notification.title}
                              </p>
                              <span className="text-aurora-white/40 text-xs ml-2 flex-shrink-0">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-aurora-white/60 text-sm mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                        
                        {/* Swipe to dismiss hint */}
                        <motion.button
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeNotification(notification.id)
                          }}
                        >
                          <X className="w-4 h-4 text-aurora-white/40" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Close hint */}
              <div className="pb-8 flex justify-center">
                <motion.div 
                  className="flex flex-col items-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <ChevronUp className="w-5 h-5 text-aurora-white/30" />
                  <span className="text-aurora-white/30 text-xs">Swipe up to close</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== APP SWITCHER ===== */}
      <AnimatePresence>
        {showAppSwitcher && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Blur Background */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            
            <div className="relative flex flex-col h-full">
              {/* Header */}
              <div className="pt-14 pb-4 px-6 flex items-center justify-between">
                <h2 className="text-aurora-white text-xl font-medium">Recent Apps</h2>
                <motion.button
                  onClick={() => setShowAppSwitcher(false)}
                  className="p-3 bg-aurora-orange/20 rounded-full"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-aurora-orange" />
                </motion.button>
              </div>

              {/* App Cards */}
              <div className="flex-1 px-4 overflow-x-auto overflow-y-hidden">
                {openApps.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 bg-aurora-orange/10 rounded-full flex items-center justify-center mb-4">
                      <Grid3X3 className="w-10 h-10 text-aurora-orange/50" />
                    </div>
                    <p className="text-aurora-white/50 text-lg">No recent apps</p>
                    <p className="text-aurora-white/30 text-sm mt-1">Open an app to see it here</p>
                  </div>
                ) : (
                  <div className="flex space-x-4 h-full items-center pb-20">
                    {openApps.map((app, index) => (
                      <motion.div
                        key={app.id}
                        className="flex-shrink-0 w-64"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ delay: index * 0.1 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        onDragEnd={(e, info) => {
                          if (info.offset.y < -100) {
                            handleAppSwipeClose(app.id)
                          }
                        }}
                      >
                        {/* App Preview Card */}
                        <motion.button
                          className="w-full"
                          onClick={() => {
                            bringToFront(app.id)
                            setShowAppSwitcher(false)
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="bg-[#1a1a24] rounded-3xl overflow-hidden border border-aurora-orange/20 shadow-2xl">
                            {/* App Header in card */}
                            <div className="h-10 bg-[#0d0d14] flex items-center px-3 space-x-2">
                              <div className="w-5 h-5 text-aurora-orange">
                                {app.icon}
                              </div>
                              <span className="text-aurora-white text-sm font-medium truncate">
                                {app.title}
                              </span>
                            </div>
                            
                            {/* Preview placeholder */}
                            <div className="h-80 bg-gradient-to-b from-[#0d0d14] to-[#0a0a0f] flex items-center justify-center">
                              <div className="w-16 h-16 text-aurora-orange/30">
                                {app.icon}
                              </div>
                            </div>
                          </div>
                        </motion.button>

                        {/* Close button */}
                        <motion.button
                          className="mt-3 mx-auto flex items-center space-x-2 px-4 py-2 bg-red-500/20 rounded-full"
                          onClick={() => handleAppSwipeClose(app.id)}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-4 h-4 text-red-400" />
                          <span className="text-red-400 text-sm">Close</span>
                        </motion.button>

                        {/* Swipe hint */}
                        <p className="text-center text-aurora-white/30 text-xs mt-2">
                          Swipe up to close
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Close All Button */}
              {openApps.length > 1 && (
                <div className="pb-8 px-6">
                  <motion.button
                    className="w-full py-3 bg-red-500/20 rounded-2xl text-red-400 font-medium"
                    onClick={() => {
                      openApps.forEach(app => closeApp(app.id))
                      setShowAppSwitcher(false)
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close All Apps
                  </motion.button>
                </div>
              )}

              {/* Home button */}
              <div className="pb-6 flex justify-center">
                <motion.button
                  className="w-14 h-14 bg-aurora-orange/20 rounded-full flex items-center justify-center"
                  onClick={() => setShowAppSwitcher(false)}
                  whileTap={{ scale: 0.9 }}
                >
                  <Home className="w-6 h-6 text-aurora-orange" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== APP DRAWER ===== */}
      <AnimatePresence>
        {showAppDrawer && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Blur Background */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            
            <div className="relative flex flex-col h-full">
              {/* Handle */}
              <div className="pt-4 flex justify-center">
                <div className="w-10 h-1 bg-aurora-white/30 rounded-full" />
              </div>

              {/* Header */}
              <div className="pt-6 pb-4 px-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-aurora-white text-2xl font-light">All Apps</h2>
                  <motion.button
                    onClick={() => setShowAppDrawer(false)}
                    className="p-3 bg-aurora-orange/20 rounded-full"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-aurora-orange" />
                  </motion.button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-aurora-white/40" />
                  <input
                    type="text"
                    placeholder="Search apps..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#1a1a24]/80 border border-aurora-orange/20 rounded-2xl text-aurora-white placeholder-aurora-white/40 focus:outline-none focus:border-aurora-orange/50 transition-colors"
                  />
                </div>
              </div>

              {/* App Grid */}
              <div className="flex-1 overflow-y-auto px-4 pb-8">
                <div className="grid grid-cols-4 gap-4">
                  {filteredApps.map((app, index) => (
                    <motion.button
                      key={app.id}
                      className="flex flex-col items-center space-y-2 p-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        openApp(app.id)
                        setShowAppDrawer(false)
                        setSearchTerm('')
                      }}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-[#1a1a24] to-[#0d0d14] rounded-2xl flex items-center justify-center text-aurora-orange border border-aurora-orange/30 shadow-lg">
                        <div className="w-7 h-7 flex items-center justify-center">
                          {app.icon}
                        </div>
                      </div>
                      <span className="text-aurora-white text-[11px] font-medium text-center leading-tight max-w-[60px]">
                        {app.title}
                      </span>
                      
                      {/* Running indicator */}
                      {openApps.find(o => o.id === app.id) && (
                        <div className="w-1.5 h-1.5 bg-aurora-orange rounded-full -mt-1" />
                      )}
                    </motion.button>
                  ))}
                </div>

                {filteredApps.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Search className="w-12 h-12 text-aurora-white/20 mb-4" />
                    <p className="text-aurora-white/50">No apps found</p>
                  </div>
                )}
              </div>

              {/* Running Apps Section */}
              {openApps.length > 0 && (
                <div className="border-t border-aurora-orange/20 p-4 bg-[#0d0d14]/80 flex-shrink-0">
                  <h3 className="text-aurora-white/50 text-xs font-medium mb-3 px-2">RUNNING</h3>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' as const }}>
                    {openApps.map((app) => (
                      <motion.button
                        key={app.id}
                        onClick={() => {
                          bringToFront(app.id)
                          setShowAppDrawer(false)
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
                          activeApp === app.id 
                            ? 'bg-aurora-orange text-white' 
                            : 'bg-[#1a1a24] text-aurora-white/80 border border-aurora-orange/20'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-4 h-4 flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4">{app.icon}</div>
                        <span className="truncate max-w-[100px]">{app.title}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
