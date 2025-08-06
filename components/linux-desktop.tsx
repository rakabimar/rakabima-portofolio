"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LinuxWindow from "./linux-window"
import Terminal from "./terminal"
import LinuxEmailApp from "./linux-email-app"
import ResumeApp from "./resume-app"
import FileManager from "./file-manager"
import SystemMonitor from "./system-monitor"
import LinuxMobileInterface from "./linux-mobile-interface"
import AboutPage from "./about-page"
import ProjectsGallery from "./projects-gallery"
import SkillsVisualization from "./skills-visualization"
import BlogWriteups from "./blog-writeups"
import LinuxApplicationLauncher from "./linux-application-launcher"
import LinuxNotifications from "./linux-notifications"
import AIChatApp from "./ai-chat-app"
import { TerminalIcon, Mail, FileText, Github, Folder, User, Settings, Activity, Code, Shield, Wifi, Volume2, Battery, Clock, Menu, Grid3X3, Search, Calendar, Calculator, Image, Music, Video, Globe, Bot } from 'lucide-react'

interface App {
  id: string
  title: string
  icon: React.ReactNode
  component: React.ReactNode
  position: { x: number; y: number }
  size: { width: number; height: number }
  category: 'favorites' | 'development' | 'office' | 'multimedia' | 'system' | 'internet'
}

interface DesktopIcon {
  id: string
  title: string
  icon: React.ReactNode
  position: { x: number; y: number }
  category: string
}

export default function LinuxDesktop() {
  const [openApps, setOpenApps] = useState<App[]>([])
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showLauncher, setShowLauncher] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [minimizedApps, setMinimizedApps] = useState<Set<string>>(new Set())

  // Initialize restore window functions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.restoreWindow = {}
    }
  }, [])

  // Update time every second and sync with user's system time
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date())
    }

    // Update immediately
    updateTime()

    // Update every second
    const timer = setInterval(updateTime, 1000)

    // Also update when window gains focus (in case system time changed)
    const handleFocus = () => updateTime()
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateTime()
      }
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(timer)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Desktop icons (fewer on desktop, more in launcher)
  const desktopIcons: Omit<DesktopIcon, 'position'>[] = [
    { id: "file-manager", title: "Files", icon: <Folder className="w-12 h-12" />, category: "system" },
    { id: "terminal", title: "Terminal", icon: <TerminalIcon className="w-12 h-12" />, category: "development" },
    { id: "ai-chat", title: "AI Chat", icon: <Bot className="w-12 h-12" />, category: "internet" },
    { id: "projects", title: "Projects", icon: <Code className="w-12 h-12" />, category: "development" },
    { id: "email", title: "Mail", icon: <Mail className="w-12 h-12" />, category: "internet" }
  ]

  // All applications for launcher
  const allApplications = [
    { id: "about", title: "About Me", icon: <User className="w-8 h-8" />, category: "favorites" },
    { id: "projects", title: "Projects", icon: <Code className="w-8 h-8" />, category: "development" },
    { id: "skills", title: "Skills", icon: <Activity className="w-8 h-8" />, category: "development" },
    { id: "blog", title: "Blog & Writeups", icon: <FileText className="w-8 h-8" />, category: "office" },
    { id: "terminal", title: "Terminal", icon: <TerminalIcon className="w-8 h-8" />, category: "development" },
    { id: "file-manager", title: "Files", icon: <Folder className="w-8 h-8" />, category: "system" },
    { id: "email", title: "Mail", icon: <Mail className="w-8 h-8" />, category: "internet" },
    { id: "resume", title: "Resume", icon: <FileText className="w-8 h-8" />, category: "office" },
    { id: "security", title: "Security Tools", icon: <Shield className="w-8 h-8" />, category: "system" },
    { id: "system-monitor", title: "System Monitor", icon: <Activity className="w-8 h-8" />, category: "system" },
    { id: "settings", title: "Settings", icon: <Settings className="w-8 h-8" />, category: "system" },
    { id: "github", title: "GitHub", icon: <Github className="w-8 h-8" />, category: "internet" },
    { id: "calculator", title: "Calculator", icon: <Calculator className="w-8 h-8" />, category: "office" },
    { id: "calendar", title: "Calendar", icon: <Calendar className="w-8 h-8" />, category: "office" },
    { id: "image-viewer", title: "Image Viewer", icon: <Image className="w-8 h-8" />, category: "multimedia" },
    { id: "music", title: "Music Player", icon: <Music className="w-8 h-8" />, category: "multimedia" },
    { id: "video", title: "Video Player", icon: <Video className="w-8 h-8" />, category: "multimedia" },
    { id: "browser", title: "Web Browser", icon: <Globe className="w-8 h-8" />, category: "internet" },
    { id: "ai-chat", title: "AI Chat", icon: <Bot className="w-8 h-8" />, category: "internet" },
  ]

  const getIconPosition = (index: number) => {
    const startX = 40
    const startY = 60  // Increased top margin to avoid top panel
    const spacingY = 110  // Reduced spacing for better fit
    
    return {
      x: startX,
      y: startY + (index * spacingY)
    }
  }

  const desktopIconsWithPositions: DesktopIcon[] = desktopIcons.map((icon, index) => ({
    ...icon,
    position: getIconPosition(index)
  }))

  const openApp = useCallback((appId: string) => {
    if (openApps.find(app => app.id === appId)) {
      setActiveApp(appId)
      return
    }

    let component: React.ReactNode
    let size = { width: 800, height: 600 }
    let position = { x: 100 + openApps.length * 50, y: 100 + openApps.length * 50 }
    let category: App['category'] = 'system'

    switch (appId) {
      case "terminal":
        component = <Terminal />
        size = { width: 900, height: 650 }
        category = 'development'
        break
      case "file-manager":
        component = <FileManager />
        size = { width: 800, height: 600 }
        category = 'system'
        break
      case "about":
        component = <AboutPage />
        size = { width: 900, height: 700 }
        category = 'favorites'
        break
      case "projects":
        component = <ProjectsGallery />
        size = { width: 1000, height: 750 }
        category = 'development'
        break
      case "skills":
        component = <SkillsVisualization />
        size = { width: 900, height: 700 }
        category = 'development'
        break
      case "blog":
        component = <BlogWriteups />
        size = { width: 1000, height: 750 }
        category = 'office'
        break
      case "email":
        component = <LinuxEmailApp />
        size = { width: 1000, height: 700 }
        category = 'internet'
        break
      case "resume":
        component = <ResumeApp />
        size = { width: 800, height: 700 }
        category = 'office'
        break
      case "system-monitor":
        component = <SystemMonitor />
        size = { width: 700, height: 500 }
        category = 'system'
        break
      case "security":
        component = <Terminal initialPath="/security" />
        size = { width: 900, height: 650 }
        category = 'system'
        break
      case "settings":
        component = <div className="p-6 text-gray-800">
          <h2 className="text-2xl font-bold mb-4">System Settings</h2>
          <p>Settings panel coming soon...</p>
        </div>
        size = { width: 600, height: 400 }
        category = 'system'
        break
      case "calculator":
        component = <div className="p-6 text-gray-800">
          <h2 className="text-2xl font-bold mb-4">Calculator</h2>
          <p>Calculator app coming soon...</p>
        </div>
        size = { width: 400, height: 500 }
        category = 'office'
        break
      case "github":
        window.open('https://github.com/yourusername', '_blank')
        return
      case "browser":
        window.open('https://www.google.com', '_blank')
        return
      case "ai-chat":
        component = <AIChatApp />
        size = { width: 1200, height: 800 }
        category = 'internet'
        break
      default:
        component = <div className="p-6 text-gray-800">
          <h2 className="text-2xl font-bold mb-4">{appId}</h2>
          <p>Application coming soon...</p>
        </div>
    }

    const appData = allApplications.find(app => app.id === appId)
    const icon = appData?.icon
    const title = appData?.title || appId

    const newApp: App = {
      id: appId,
      title,
      icon,
      component,
      position,
      size,
      category
    }

    setOpenApps(prev => [...prev, newApp])
    setActiveApp(appId)
    setShowLauncher(false)
  }, [openApps, allApplications])

  const closeApp = useCallback((appId: string) => {
    setOpenApps(prev => prev.filter(app => app.id !== appId))
    if (activeApp === appId) {
      const remainingApps = openApps.filter(app => app.id !== appId)
      setActiveApp(remainingApps.length > 0 ? remainingApps[remainingApps.length - 1].id : null)
    }
  }, [openApps, activeApp])

  const minimizeApp = useCallback((appId: string) => {
    setMinimizedApps(prev => new Set(prev).add(appId))
    if (activeApp === appId) {
      // Find another app to focus or set to null
      const otherApps = openApps.filter(app => app.id !== appId)
      setActiveApp(otherApps.length > 0 ? otherApps[otherApps.length - 1].id : null)
    }
  }, [openApps, activeApp])

  const bringToFront = useCallback((appId: string) => {
    // If app is minimized, restore it first
    if (minimizedApps.has(appId)) {
      if (window.restoreWindow && window.restoreWindow[appId]) {
        setMinimizedApps(prev => {
          const newSet = new Set(prev)
          newSet.delete(appId)
          return newSet
        })
        window.restoreWindow[appId]()
        // Set active app after restore
        setTimeout(() => {
          setActiveApp(appId)
        }, 10)
      }
    } else {
      setActiveApp(appId)
    }
  }, [minimizedApps])

  // Mobile interface
  if (isMobile) {
    return (
      <LinuxMobileInterface
        apps={allApplications}
        openApp={openApp}
        openApps={openApps}
        activeApp={activeApp}
        closeApp={closeApp}
        bringToFront={bringToFront}
      />
    )
  }

  // Desktop interface
  return (
    <div className="h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Ubuntu-style wallpaper pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Desktop Icons */}
      {desktopIconsWithPositions.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute cursor-pointer group"
          style={{ left: icon.position.x, top: icon.position.y }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onDoubleClick={() => openApp(icon.id)}
        >
          <div className="flex flex-col items-center p-3 rounded-lg hover:bg-white/10 transition-all duration-200 min-w-[80px]">
            <div className="text-white mb-2 group-hover:text-orange-300 transition-colors drop-shadow-lg">
              {icon.icon}
            </div>
            <span className="text-white text-xs font-medium group-hover:text-orange-300 transition-colors text-center drop-shadow-lg max-w-[80px] leading-tight">
              {icon.title}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Open Applications */}
      {openApps.map((app) => (
        <LinuxWindow
          key={app.id}
          id={app.id}
          title={app.title}
          icon={app.icon}
          initialPosition={app.position}
          initialSize={app.size}
          isActive={activeApp === app.id}
          onClose={() => closeApp(app.id)}
          onFocus={() => bringToFront(app.id)}
          onMinimize={minimizeApp}
          zIndex={activeApp === app.id ? 50 : 10}
        >
          {app.component}
        </LinuxWindow>
      ))}

      {/* Ubuntu-style Top Panel */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700/50 flex items-center justify-between px-4 text-white text-sm">
        {/* Left side - Activities and App Menu */}
        <div className="flex items-center space-x-4">
          <button 
            className="px-3 py-1 hover:bg-white/10 rounded transition-colors font-medium"
            onClick={() => setShowLauncher(true)}
          >
            Activities
          </button>
          <div className="text-gray-300">
            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* Center - Current app title */}
        <div className="flex-1 text-center">
          {activeApp && openApps.find(app => app.id === activeApp)?.title}
        </div>

        {/* Right side - System indicators */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </div>
          <button 
            className="hover:bg-white/10 px-2 py-1 rounded transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
            title={`${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`}
          >
            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-end text-right">
                <span className="text-xs leading-none">
                  {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                <span className="text-sm font-mono leading-none">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Ubuntu-style Bottom Dock/Panel */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl px-3 py-2 border border-gray-600/50 shadow-2xl">
          <div className="flex items-center space-x-1">
            {/* App launcher */}
            <button
              className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-xl flex items-center justify-center transition-colors shadow-lg"
              onClick={() => setShowLauncher(true)}
            >
              <Grid3X3 className="w-6 h-6 text-white" />
            </button>
            
            {/* Open apps in dock */}
            {openApps.map((app) => (
              <button
                key={app.id}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg ${
                  activeApp === app.id 
                    ? 'bg-orange-500 text-white scale-110' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
                }`}
                onClick={() => bringToFront(app.id)}
                title={app.title}
              >
                <div className="w-6 h-6 flex items-center justify-center">{app.icon}</div>
              </button>
            ))}
            
            {/* Separator only if there are open apps */}
            {openApps.length > 0 && <div className="w-px h-8 bg-gray-600 mx-1"></div>}
            
            {/* Favorites */}
            <button
              className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors shadow-lg"
              onClick={() => openApp('file-manager')}
              title="Files"
            >
              <Folder className="w-6 h-6 text-gray-300" />
            </button>
            <button
              className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors shadow-lg"
              onClick={() => openApp('email')}
              title="Mail"
            >
              <Mail className="w-6 h-6 text-gray-300" />
            </button>
            <button
              className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors shadow-lg"
              onClick={() => openApp('terminal')}
              title="Terminal"
            >
              <TerminalIcon className="w-6 h-6 text-gray-300" />
            </button>
            <button
              className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors shadow-lg"
              onClick={() => openApp('ai-chat')}
              title="AI Chat"
            >
              <Bot className="w-6 h-6 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Application Launcher */}
      <LinuxApplicationLauncher
        isOpen={showLauncher}
        onClose={() => setShowLauncher(false)}
        applications={allApplications}
        onOpenApp={openApp}
      />

      {/* Notifications */}
      <LinuxNotifications
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  )
}