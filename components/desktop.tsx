"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Window from "./window"
import Terminal from "./terminal"
import EmailApp from "./email-app"
import ResumeApp from "./resume-app"
import FileManager from "./file-manager"
import SystemMonitor from "./system-monitor"
import MobileInterface from "./mobile-interface"
import { TerminalIcon, Mail, FileText, Github, Folder, User, Settings, Activity, Code, Shield, Wifi, Volume2, Battery, Clock, Menu } from 'lucide-react'
import AboutPage from "./about-page"
import ProjectsGallery from "./projects-gallery"
import SkillsVisualization from "./skills-visualization"
import BlogWriteups from "./blog-writeups"

interface App {
  id: string
  title: string
  icon: React.ReactNode
  component: React.ReactNode
  position: { x: number; y: number }
  size: { width: number; height: number }
}

interface DesktopIcon {
  id: string
  title: string
  icon: React.ReactNode
  position: { x: number; y: number }
}

export default function Desktop() {
  const [openApps, setOpenApps] = useState<App[]>([])
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showAppDrawer, setShowAppDrawer] = useState(false)
  const [minimizedApps, setMinimizedApps] = useState<Set<string>>(new Set())
  const [currentTime, setCurrentTime] = useState(new Date())

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
    window.addEventListener('focus', handleFocus)

    return () => {
      clearInterval(timer)
      window.removeEventListener('focus', handleFocus)
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

  // Grid-based icon positioning (4 columns, proper spacing)
  const iconGrid = {
    cols: 4,
    startX: 60,
    startY: 60,
    spacingX: 120,
    spacingY: 100
  }

  const getIconPosition = (index: number) => {
    const row = Math.floor(index / iconGrid.cols)
    const col = index % iconGrid.cols
    return {
      x: iconGrid.startX + (col * iconGrid.spacingX),
      y: iconGrid.startY + (row * iconGrid.spacingY)
    }
  }

  const desktopIcons: Omit<DesktopIcon, 'position'>[] = [
    { id: "terminal", title: "Terminal", icon: <TerminalIcon className="w-8 h-8" /> },
    { id: "file-manager", title: "Files", icon: <Folder className="w-8 h-8" /> },
    { id: "about", title: "About Me", icon: <User className="w-8 h-8" /> },
    { id: "projects", title: "Projects", icon: <Code className="w-8 h-8" /> },
    { id: "skills", title: "Skills", icon: <Activity className="w-8 h-8" /> },
    { id: "blog", title: "Blog", icon: <FileText className="w-8 h-8" /> },
    { id: "email", title: "Contact", icon: <Mail className="w-8 h-8" /> },
    { id: "resume", title: "Resume", icon: <FileText className="w-8 h-8" /> },
    { id: "security", title: "Security", icon: <Shield className="w-8 h-8" /> },
    { id: "system-monitor", title: "System Monitor", icon: <Activity className="w-8 h-8" /> },
    { id: "settings", title: "Settings", icon: <Settings className="w-8 h-8" /> },
    { id: "github", title: "GitHub", icon: <Github className="w-8 h-8" /> }
  ]

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

    switch (appId) {
      case "terminal":
        component = <Terminal />
        size = { width: 900, height: 650 }
        break
      case "file-manager":
        component = <FileManager />
        size = { width: 800, height: 600 }
        break
      case "about":
        component = <AboutPage />
        size = { width: 900, height: 700 }
        break
      case "projects":
        component = <ProjectsGallery />
        size = { width: 1000, height: 750 }
        break
      case "skills":
        component = <SkillsVisualization />
        size = { width: 900, height: 700 }
        break
      case "blog":
        component = <BlogWriteups />
        size = { width: 1000, height: 750 }
        break
      case "email":
        component = <EmailApp />
        size = { width: 700, height: 500 }
        break
      case "resume":
        component = <ResumeApp />
        size = { width: 800, height: 700 }
        break
      case "system-monitor":
        component = <SystemMonitor />
        size = { width: 700, height: 500 }
        break
      case "security":
        component = <Terminal initialPath="/security" />
        size = { width: 900, height: 650 }
        break
      case "settings":
        component = <div className="p-6 text-white">Settings panel coming soon...</div>
        size = { width: 600, height: 400 }
        break
      case "github":
        window.open('https://github.com/yourusername', '_blank')
        return
      default:
        return
    }

    const icon = desktopIconsWithPositions.find(icon => icon.id === appId)?.icon
    const title = desktopIconsWithPositions.find(icon => icon.id === appId)?.title || appId

    const newApp: App = {
      id: appId,
      title,
      icon,
      component,
      position,
      size
    }

    setOpenApps(prev => [...prev, newApp])
    setActiveApp(appId)
    setShowAppDrawer(false) // Close app drawer on mobile
  }, [openApps, desktopIconsWithPositions])

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

  // Track minimized state
  useEffect(() => {
    const handleWindowMinimize = (appId: string) => {
      setMinimizedApps(prev => new Set(prev).add(appId))
    }

    // Listen for minimize events (you'll need to implement this in window components)
    return () => {}
  }, [])

  // Mobile interface
  if (isMobile) {
    return (
      <MobileInterface
        apps={desktopIcons}
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
    <div className="h-screen w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
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
            <div className="text-white mb-2 group-hover:text-blue-400 transition-colors drop-shadow-lg">
              {icon.icon}
            </div>
            <span className="text-white text-xs font-medium group-hover:text-blue-400 transition-colors text-center drop-shadow-lg">
              {icon.title}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Open Applications */}
      {openApps.map((app) => (
        <Window
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
        </Window>
      ))}

      {/* Linux-style Panel/Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 flex items-center justify-between px-4">
        {/* Left side - App launcher and open apps */}
        <div className="flex items-center space-x-2">
          {/* App launcher button */}
          <button className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
            </div>
          </button>
          
          {/* Open apps */}
          {openApps.map((app) => (
            <button
              key={app.id}
              className={`flex items-center space-x-2 px-3 py-2 rounded text-sm font-medium transition-all ${
                activeApp === app.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => bringToFront(app.id)}
            >
              <div className="w-4 h-4">{app.icon}</div>
              <span className="max-w-[100px] truncate">{app.title}</span>
            </button>
          ))}
        </div>

        {/* Right side - System tray */}
        <div className="flex items-center space-x-3 text-gray-300">
          <div className="flex items-center space-x-2 text-sm">
            <Wifi className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </div>
          <div className="h-6 w-px bg-gray-600"></div>
          <div className="flex items-center space-x-1 text-sm font-mono">
            <Clock className="w-4 h-4" />
            <div className="flex flex-col items-end">
              <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="text-xs text-gray-400">
                {currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
