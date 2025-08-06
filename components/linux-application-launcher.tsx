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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl w-full max-w-4xl h-full max-h-[80vh] overflow-hidden border border-gray-700 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Applications</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Search */}
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

            <div className="flex h-full">
              {/* Categories Sidebar */}
              <div className="w-48 bg-gray-800 border-r border-gray-700 p-4">
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === null
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    All Applications
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
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
                      className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-800 transition-colors group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAppClick(app.id)}
                    >
                      <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-orange-500 transition-colors">
                        <div className="text-gray-300 group-hover:text-white transition-colors">
                          {app.icon}
                        </div>
                      </div>
                      <span className="text-white text-sm font-medium text-center leading-tight">
                        {app.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
                
                {filteredApps.length === 0 && (
                  <div className="text-center text-gray-400 mt-12">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No applications found</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
