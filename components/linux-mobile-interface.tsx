"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowLeft, Wifi, Battery, Signal, MoreHorizontal, Grid3X3, Search } from 'lucide-react'

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
  const [showAppDrawer, setShowAppDrawer] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const activeAppData = openApps.find(app => app.id === activeApp)
  const filteredApps = apps.filter(app =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const favoriteApps = [
    apps.find(app => app.id === 'terminal'),
    apps.find(app => app.id === 'ai-chat'),
    apps.find(app => app.id === 'projects'),
    apps.find(app => app.id === 'email')
  ].filter((app): app is App => app !== undefined).slice(0, 4)

  return (
    <div className="h-screen w-full bg-desktop-gradient relative overflow-hidden flex flex-col">
      {/* Mobile Status Bar */}
      <div className="h-6 bg-redteam-secondary/90 backdrop-blur-sm flex items-center justify-between px-4 text-cyber-white text-xs font-medium border-b border-redteam-accent/20">
        <div className="flex items-center space-x-1">
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-3 h-3" />
          <span>100%</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {activeAppData ? (
          /* Full-screen app view - Red Team Theme */
          <div className="h-full flex flex-col">
            {/* App Header */}
            <div className="h-14 bg-redteam-secondary/95 backdrop-blur-sm border-b border-redteam-accent/30 flex items-center justify-between px-4">
              <button
                onClick={() => closeApp(activeApp!)}
                className="p-2 hover:bg-redteam-accent/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-cyber-white" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 text-cyber-white flex items-center justify-center flex-shrink-0">{activeAppData.icon}</div>
                <span className="text-cyber-white font-medium">{activeAppData.title}</span>
              </div>
              <button
                onClick={() => setShowAppDrawer(true)}
                className="p-2 hover:bg-redteam-accent/20 rounded-lg transition-colors"
              >
                <Grid3X3 className="w-5 h-5 text-cyber-white" />
              </button>
            </div>
            
            {/* App Content */}
            <div className="flex-1 overflow-hidden bg-gradient-to-br from-redteam-background to-redteam-secondary">
              {activeAppData.component}
            </div>
          </div>
        ) : (
          /* Home screen */
          <div className="h-full flex flex-col">
            {/* Home Header */}
            <div className="h-16 flex items-center justify-center px-4">
              <h1 className="text-2xl font-bold text-cyber-white">Linux Portfolio</h1>
            </div>

            {/* Quick Access */}
            <div className="px-6 mb-6">
              <h2 className="text-cyber-white font-semibold mb-3">Quick Access</h2>
              <div className="grid grid-cols-4 gap-4">
                {favoriteApps.map((app) => (
                  <motion.button
                    key={app.id}
                    className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-redteam-background/30 border border-transparent hover:border-redteam-accent/30 transition-all"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openApp(app.id)}
                  >
                    <div className="w-12 h-12 bg-redteam-accent rounded-2xl flex items-center justify-center text-cyber-white">
                      <div className="w-6 h-6 flex items-center justify-center">{app.icon}</div>
                    </div>
                    <span className="text-cyber-white text-xs font-medium text-center">
                      {app.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* App Grid */}
            <div className="flex-1 px-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-cyber-white font-semibold">All Applications</h2>
                <button
                  onClick={() => setShowAppDrawer(true)}
                  className="text-redteam-accent hover:text-redteam-primary transition-colors"
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {apps.slice(0, 12).map((app) => (
                  <motion.button
                    key={app.id}
                    className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-redteam-background/30 border border-transparent hover:border-redteam-accent/30 transition-all"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openApp(app.id)}
                  >
                    <div className="w-12 h-12 bg-redteam-background rounded-2xl flex items-center justify-center text-cyber-white border border-redteam-accent/40">
                      {app.icon}
                    </div>
                    <span className="text-cyber-white text-xs font-medium text-center">
                      {app.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation Bar - Red Team Theme */}
      <div className="h-16 bg-redteam-secondary/95 backdrop-blur-sm border-t border-redteam-accent/30 flex items-center justify-around px-4">
        <button
          onClick={() => {
            if (activeApp) closeApp(activeApp)
            setShowAppDrawer(false)
          }}
          className={`p-3 rounded-lg transition-colors ${
            !activeApp ? 'bg-redteam-accent' : 'hover:bg-redteam-background'
          }`}
        >
          <div className="w-6 h-6 bg-cyber-white rounded-sm"></div>
        </button>
        
        <button
          onClick={() => setShowAppDrawer(true)}
          className="p-3 hover:bg-redteam-background rounded-lg transition-colors"
        >
          <Grid3X3 className="w-6 h-6 text-cyber-white" />
        </button>

        {/* Recent apps indicator */}
        {openApps.length > 0 && (
          <div className="flex space-x-1">
            {openApps.slice(0, 3).map((app) => (
              <button
                key={app.id}
                onClick={() => bringToFront(app.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  activeApp === app.id ? 'bg-redteam-accent' : 'bg-redteam-background hover:bg-redteam-secondary'
                }`}
              >
                <div className="w-4 h-4 text-cyber-white">{app.icon}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* App Drawer Overlay - Red Team Theme */}
      <AnimatePresence>
        {showAppDrawer && (
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Drawer Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-redteam-accent/30 bg-redteam-secondary/90">
              <h2 className="text-cyber-white text-lg font-semibold">Applications</h2>
              <button
                onClick={() => setShowAppDrawer(false)}
                className="p-2 hover:bg-redteam-accent/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-cyber-white" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-desktop-muted" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-redteam-background border border-redteam-accent/30 rounded-lg text-cyber-white placeholder-desktop-muted focus:outline-none focus:border-redteam-accent"
                />
              </div>
            </div>

            {/* App List */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-br from-redteam-background to-redteam-secondary">
              <div className="grid grid-cols-4 gap-4">
                {filteredApps.map((app) => (
                  <motion.button
                    key={app.id}
                    className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-redteam-background/50 border border-transparent hover:border-redteam-accent/30 transition-all"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      openApp(app.id)
                      setShowAppDrawer(false)
                      setSearchTerm('')
                    }}
                  >
                    <div className="w-12 h-12 bg-redteam-background rounded-2xl flex items-center justify-center text-cyber-white border border-redteam-accent/40">
                      {app.icon}
                    </div>
                    <span className="text-cyber-white text-xs font-medium text-center">
                      {app.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Running Apps */}
            {openApps.length > 0 && (
              <div className="border-t border-redteam-accent/30 p-4 bg-redteam-secondary/50">
                <h3 className="text-desktop-muted text-sm font-medium mb-3">Running Apps</h3>
                <div className="flex space-x-2">
                  {openApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        bringToFront(app.id)
                        setShowAppDrawer(false)
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors border ${
                        activeApp === app.id 
                          ? 'bg-redteam-accent text-cyber-white border-redteam-primary' 
                          : 'bg-redteam-background text-cyber-white/80 hover:bg-redteam-accent/20 border-redteam-accent/30'
                      }`}
                    >
                      <div className="w-4 h-4">{app.icon}</div>
                      <span>{app.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
