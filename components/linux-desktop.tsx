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
    { id: "about", title: "About Me", icon: <User className="w-8 h-8" />, category: "favorites" },
    { id: "projects", title: "Projects", icon: <Code className="w-12 h-12" />, category: "development" },
    { id: "email", title: "Mail", icon: <Mail className="w-12 h-12" />, category: "internet" },
    { id: "file-manager", title: "Files", icon: <Folder className="w-12 h-12" />, category: "system" },
    { id: "terminal", title: "Terminal", icon: <TerminalIcon className="w-12 h-12" />, category: "development" },
    { id: "ai-chat", title: "AI Chat", icon: <Bot className="w-12 h-12" />, category: "internet" }
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
    <div className="h-screen w-full relative overflow-hidden desktop-background">
      {/* Animated Aurora Background */}
      <div className="absolute inset-0">
        {/* Base aurora gradient with animation */}
        <div 
          className="absolute inset-0 animate-aurora-pulse"
          style={{
            background: `
              radial-gradient(ellipse at 30% 70%, rgba(220, 96, 63, 0.15) 0%, transparent 70%),
              radial-gradient(ellipse at 70% 30%, rgba(59, 143, 219, 0.12) 0%, transparent 70%)
            `
          }} 
        />
        
        {/* Moving aurora waves */}
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: `
              radial-gradient(ellipse at 40% 80%, rgba(220, 96, 63, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(59, 143, 219, 0.06) 0%, transparent 60%)
            `,
            animationDuration: '6s',
            animationDelay: '2s'
          }} 
        />
      </div>

      {/* Animated dot pattern */}
      <div 
        className="absolute inset-0 opacity-20 animate-fade-in" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 143, 219, 0.1) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          animation: 'drift 20s ease-in-out infinite'
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
          <div className="flex flex-col items-center p-3 rounded-lg hover:bg-aurora-orange/20 hover:border hover:border-aurora-orange/50 transition-all duration-200 min-w-[80px]">
            <div className="text-aurora-white mb-2 group-hover:text-aurora-coral transition-colors drop-shadow-lg">
              {icon.icon}
            </div>
            <span className="text-aurora-white text-xs font-medium group-hover:text-aurora-coral transition-colors text-center drop-shadow-lg max-w-[80px] leading-tight">
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

      {/* Ubuntu-style Top Panel - Desktop Theme */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-desktop-secondary/90 backdrop-blur-sm border-b border-desktop-border flex items-center justify-between px-4 text-aurora-white text-sm">
        {/* Left side - Activities and App Menu */}
        <div className="flex items-center space-x-4">
          <button 
            className="px-3 py-1 hover:bg-aurora-orange/20 hover:text-aurora-coral rounded transition-colors font-medium"
            onClick={() => setShowLauncher(true)}
          >
            Activities
          </button>
          <div className="text-desktop-muted">
            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* Center - Current app title */}
        <div className="flex-1 text-center text-aurora-white">
          {activeApp && openApps.find(app => app.id === activeApp)?.title}
        </div>

        {/* Right side - System indicators */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-desktop-muted hover:text-aurora-white transition-colors">
            <Wifi className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </div>
          <button 
            className="hover:bg-aurora-orange/20 hover:text-aurora-coral px-2 py-1 rounded transition-colors"
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

      {/* Ubuntu-style Bottom Dock/Panel - Desktop Theme */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
        <motion.div 
          className="bg-desktop-secondary/90 backdrop-blur-sm rounded-2xl px-3 py-2 border border-desktop-border shadow-desktop"
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex items-center space-x-1">
            {/* App launcher */}
            <motion.button
              className="w-12 h-12 bg-app-accent hover:bg-aurora-orange rounded-xl flex items-center justify-center transition-all shadow-lg"
              onClick={() => setShowLauncher(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              <Grid3X3 className="w-6 h-6 text-aurora-white" />
            </motion.button>
            
            {/* Open apps in dock */}
            <AnimatePresence mode="popLayout">
              {openApps.map((app) => (
                <motion.button
                  key={app.id}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg ${
                    activeApp === app.id 
                      ? 'bg-app-accent text-aurora-white scale-110' 
                      : 'bg-desktop-primary hover:bg-aurora-orange/20 hover:scale-105 text-desktop-muted hover:text-aurora-coral'
                  }`}
                  onClick={() => bringToFront(app.id)}
                  title={app.title}
                  initial={{ opacity: 0, scale: 0.3, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: activeApp === app.id ? 1.1 : 1, 
                    x: 0 
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.3, 
                    x: -20,
                    transition: { duration: 0.2 }
                  }}
                  whileHover={{ scale: activeApp === app.id ? 1.15 : 1.05 }}
                  whileTap={{ scale: activeApp === app.id ? 1.05 : 0.95 }}
                  layout
                  transition={{ 
                    layout: { duration: 0.3, ease: "easeInOut" },
                    default: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <motion.div 
                    className="w-6 h-6 flex items-center justify-center"
                    initial={{ rotate: -180 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {app.icon}
                  </motion.div>
                </motion.button>
              ))}
            </AnimatePresence>
            
            {/* Separator with animation */}
            <AnimatePresence>
              {(openApps.length > 0 || !openApps.some(app => ['about', 'projects', 'file-manager', 'email', 'terminal', 'ai-chat'].includes(app.id))) && (
                <motion.div 
                  className="w-px h-8 bg-desktop-border mx-1"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  layout
                />
              )}
            </AnimatePresence>
            
            {/* Quick Access Favorites - Only show if app is not open */}
            <AnimatePresence mode="popLayout">
              {!openApps.some(app => app.id === 'about') && (
                <motion.button
                  className="w-12 h-12 bg-desktop-primary hover:bg-aurora-orange/20 rounded-xl flex items-center justify-center transition-all shadow-lg group"
                  onClick={() => openApp('about')}
                  title="About Me"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.3, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.3, x: -20, transition: { duration: 0.2 } }}
                  layout
                  transition={{ 
                    layout: { duration: 0.3, ease: "easeInOut" },
                    default: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <User className="w-6 h-6 text-desktop-muted group-hover:text-aurora-coral transition-colors" />
                </motion.button>
              )}
              
              {!openApps.some(app => app.id === 'projects') && (
                <motion.button
                  className="w-12 h-12 bg-desktop-primary hover:bg-aurora-orange/20 rounded-xl flex items-center justify-center transition-all shadow-lg group"
                  onClick={() => openApp('projects')}
                  title="Projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.3, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.3, x: -20, transition: { duration: 0.2 } }}
                  layout
                  transition={{ 
                    layout: { duration: 0.3, ease: "easeInOut" },
                    default: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <Code className="w-6 h-6 text-desktop-muted group-hover:text-aurora-coral transition-colors" />
                </motion.button>
              )}
              
              {!openApps.some(app => app.id === 'file-manager') && (
                <motion.button
                  className="w-12 h-12 bg-desktop-primary hover:bg-aurora-orange/20 rounded-xl flex items-center justify-center transition-all shadow-lg group"
                  onClick={() => openApp('file-manager')}
                  title="Files"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.3, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.3, x: -20, transition: { duration: 0.2 } }}
                  layout
                  transition={{ 
                    layout: { duration: 0.3, ease: "easeInOut" },
                    default: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <Folder className="w-6 h-6 text-desktop-muted group-hover:text-aurora-coral transition-colors" />
                </motion.button>
              )}
              
              {!openApps.some(app => app.id === 'email') && (
                <motion.button
                  className="w-12 h-12 bg-desktop-primary hover:bg-aurora-orange/20 rounded-xl flex items-center justify-center transition-all shadow-lg group"
                  onClick={() => openApp('email')}
                  title="Mail"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.3, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.3, x: -20, transition: { duration: 0.2 } }}
                  layout
                  transition={{ 
                    layout: { duration: 0.3, ease: "easeInOut" },
                    default: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <Mail className="w-6 h-6 text-desktop-muted group-hover:text-aurora-coral transition-colors" />
                </motion.button>
              )}
              
              {!openApps.some(app => app.id === 'terminal') && (
                <motion.button
                  className="w-12 h-12 bg-desktop-primary hover:bg-aurora-orange/20 rounded-xl flex items-center justify-center transition-all shadow-lg group"
                  onClick={() => openApp('terminal')}
                  title="Terminal"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.3, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.3, x: -20, transition: { duration: 0.2 } }}
                  layout
                  transition={{ 
                    layout: { duration: 0.3, ease: "easeInOut" },
                    default: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <TerminalIcon className="w-6 h-6 text-desktop-muted group-hover:text-aurora-coral transition-colors" />
                </motion.button>
              )}
              
              {!openApps.some(app => app.id === 'ai-chat') && (
                <motion.button
                  className="w-12 h-12 bg-desktop-primary hover:bg-aurora-orange/20 rounded-xl flex items-center justify-center transition-all shadow-lg group"
                  onClick={() => openApp('ai-chat')}
                  title="AI Chat"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.3, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.3, x: -20, transition: { duration: 0.2 } }}
                  layout
                  transition={{ 
                    layout: { duration: 0.3, ease: "easeInOut" },
                    default: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <Bot className="w-6 h-6 text-desktop-muted group-hover:text-aurora-coral transition-colors" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
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