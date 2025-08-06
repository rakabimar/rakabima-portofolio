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
    <div className="h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex flex-col">
      {/* Mobile Status Bar */}
      <div className="h-6 bg-black/50 backdrop-blur-sm flex items-center justify-between px-4 text-white text-xs font-medium">
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
          /* Full-screen app view */
          <div className="h-full flex flex-col">
            {/* App Header */}
            <div className="h-14 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 flex items-center justify-between px-4">
              <button
                onClick={() => closeApp(activeApp!)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 text-white flex items-center justify-center flex-shrink-0">{activeAppData.icon}</div>
                <span className="text-white font-medium">{activeAppData.title}</span>
              </div>
              <button
                onClick={() => setShowAppDrawer(true)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Grid3X3 className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* App Content */}
            <div className="flex-1 overflow-hidden">
              {activeAppData.component}
            </div>
          </div>
        ) : (
          /* Home screen */
          <div className="h-full flex flex-col">
            {/* Home Header */}
            <div className="h-16 flex items-center justify-center px-4">
              <h1 className="text-2xl font-bold text-white">Linux Portfolio</h1>
            </div>

            {/* Quick Access */}
            <div className="px-6 mb-6">
              <h2 className="text-white font-semibold mb-3">Quick Access</h2>
              <div className="grid grid-cols-4 gap-4">
                {favoriteApps.map((app) => (
                  <motion.button
                    key={app.id}
                    className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white/10 transition-colors"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openApp(app.id)}
                  >
                    <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
                      <div className="w-6 h-6 flex items-center justify-center">{app.icon}</div>
                    </div>
                    <span className="text-white text-xs font-medium text-center">
                      {app.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* App Grid */}
            <div className="flex-1 px-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold">All Applications</h2>
                <button
                  onClick={() => setShowAppDrawer(true)}
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {apps.slice(0, 12).map((app) => (
                  <motion.button
                    key={app.id}
                    className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white/10 transition-colors"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openApp(app.id)}
                  >
                    <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-white border border-gray-600">
                      {app.icon}
                    </div>
                    <span className="text-white text-xs font-medium text-center">
                      {app.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation Bar */}
      <div className="h-16 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 flex items-center justify-around px-4">
        <button
          onClick={() => {
            if (activeApp) closeApp(activeApp)
            setShowAppDrawer(false)
          }}
          className={`p-3 rounded-lg transition-colors ${
            !activeApp ? 'bg-orange-500' : 'hover:bg-gray-700'
          }`}
        >
          <div className="w-6 h-6 bg-white rounded-sm"></div>
        </button>
        
        <button
          onClick={() => setShowAppDrawer(true)}
          className="p-3 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Grid3X3 className="w-6 h-6 text-white" />
        </button>

        {/* Recent apps indicator */}
        {openApps.length > 0 && (
          <div className="flex space-x-1">
            {openApps.slice(0, 3).map((app) => (
              <button
                key={app.id}
                onClick={() => bringToFront(app.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  activeApp === app.id ? 'bg-orange-500' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div className="w-4 h-4 text-white">{app.icon}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* App Drawer Overlay */}
      <AnimatePresence>
        {showAppDrawer && (
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Drawer Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
              <h2 className="text-white text-lg font-semibold">Applications</h2>
              <button
                onClick={() => setShowAppDrawer(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* App List */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="grid grid-cols-4 gap-4">
                {filteredApps.map((app) => (
                  <motion.button
                    key={app.id}
                    className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-white/10 transition-colors"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      openApp(app.id)
                      setShowAppDrawer(false)
                      setSearchTerm('')
                    }}
                  >
                    <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-white border border-gray-600">
                      {app.icon}
                    </div>
                    <span className="text-white text-xs font-medium text-center">
                      {app.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Running Apps */}
            {openApps.length > 0 && (
              <div className="border-t border-gray-700 p-4">
                <h3 className="text-gray-400 text-sm font-medium mb-3">Running Apps</h3>
                <div className="flex space-x-2">
                  {openApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        bringToFront(app.id)
                        setShowAppDrawer(false)
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeApp === app.id 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
