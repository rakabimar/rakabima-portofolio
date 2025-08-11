"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from 'lucide-react'

interface Application {
  id: string
  title: string
  icon: React.ReactNode
  category: string
}

interface LinuxApplicationLauncherProps {
  isOpen: boolean
  onClose: () => void
  applications: Application[]
  onOpenApp: (appId: string) => void
}

const categoryNames = {
  favorites: 'Favorites',
  development: 'Development',
  office: 'Office',
  multimedia: 'Multimedia',
  system: 'System',
  internet: 'Internet'
}

export default function LinuxApplicationLauncher({
  isOpen,
  onClose,
  applications,
  onOpenApp
}: LinuxApplicationLauncherProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredApps = applications.filter(app =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === null || app.category === selectedCategory)
  )

  const categories = Object.keys(categoryNames).filter(category =>
    applications.some(app => app.category === category)
  )

  const handleAppClick = (appId: string) => {
    onOpenApp(appId)
    onClose()
    setSearchTerm('')
    setSelectedCategory(null)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-black/80 backdrop-blur-md rounded-2xl w-full max-w-4xl h-full max-h-[80vh] overflow-hidden border border-aurora-white/20 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle Aurora Accent Lines */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top accent line */}
              <div 
                className="absolute top-0 left-0 right-0 h-px opacity-30"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, rgba(59, 143, 219, 0.6) 50%, transparent 100%)`
                }} 
              />
              
              {/* Subtle corner gradients */}
              <div 
                className="absolute top-0 left-0 w-32 h-32 opacity-10"
                style={{
                  background: `radial-gradient(circle at 0% 0%, rgba(220, 96, 63, 0.3) 0%, transparent 70%)`
                }} 
              />
              <div 
                className="absolute bottom-0 right-0 w-32 h-32 opacity-10"
                style={{
                  background: `radial-gradient(circle at 100% 100%, rgba(59, 143, 219, 0.3) 0%, transparent 70%)`
                }} 
              />
            </div>

            {/* Content with relative positioning */}
            <div className="relative z-10">
              {/* Header */}
              <div className="p-6 border-b border-aurora-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-aurora-white">Applications</h2>
                  <button
                    onClick={onClose}
                    className="text-aurora-white/60 hover:text-aurora-coral transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-aurora-white/40" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-aurora-white/20 rounded-lg text-aurora-white placeholder-aurora-white/40 focus:outline-none focus:border-aurora-orange focus:ring-2 focus:ring-aurora-orange/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex h-full">
                {/* Categories Sidebar */}
                <div className="w-48 bg-black/40 border-r border-aurora-white/10 p-4">
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                        selectedCategory === null
                          ? 'bg-aurora-orange text-aurora-white border border-aurora-orange/50 shadow-sm'
                          : 'text-aurora-white/80 hover:bg-aurora-orange/20 hover:text-aurora-coral'
                      }`}
                    >
                      All Applications
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                          selectedCategory === category
                            ? 'bg-aurora-orange text-aurora-white border border-aurora-orange/50 shadow-sm'
                            : 'text-aurora-white/80 hover:bg-aurora-orange/20 hover:text-aurora-coral'
                        }`}
                      >
                        {categoryNames[category as keyof typeof categoryNames]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Applications Grid */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="grid grid-cols-4 gap-6">
                    {filteredApps.map((app) => (
                      <motion.button
                        key={app.id}
                        className="flex flex-col items-center p-4 rounded-xl hover:bg-aurora-orange/20 border border-transparent hover:border-aurora-orange/50 transition-all group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAppClick(app.id)}
                      >
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-gradient-to-br group-hover:from-aurora-orange/20 group-hover:to-aurora-coral/20 transition-all duration-300 border border-aurora-white/10">
                          <div className="text-aurora-white group-hover:text-aurora-coral transition-colors">
                            {app.icon}
                          </div>
                        </div>
                        <span className="text-aurora-white text-sm font-medium text-center leading-tight">
                          {app.title}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  
                  {filteredApps.length === 0 && (
                    <div className="text-center text-aurora-white/40 mt-12">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No applications found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}