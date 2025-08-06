"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Folder, File, ArrowLeft, Home, HardDrive, User, Settings, Download, Image, FileText, Code } from 'lucide-react'

interface FileItem {
  name: string
  type: 'folder' | 'file'
  size?: string
  modified: string
  icon: React.ReactNode
}

export default function FileManager() {
  const [currentPath, setCurrentPath] = useState('/home/user')
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const files: FileItem[] = [
    { name: 'Documents', type: 'folder', modified: '2024-01-15', icon: <Folder className="w-5 h-5 text-blue-400" /> },
    { name: 'Downloads', type: 'folder', modified: '2024-01-14', icon: <Download className="w-5 h-5 text-green-400" /> },
    { name: 'Pictures', type: 'folder', modified: '2024-01-13', icon: <Image className="w-5 h-5 text-purple-400" /> },
    { name: 'Projects', type: 'folder', modified: '2024-01-12', icon: <Code className="w-5 h-5 text-yellow-400" /> },
    { name: 'resume.pdf', type: 'file', size: '245 KB', modified: '2024-01-10', icon: <FileText className="w-5 h-5 text-red-400" /> },
    { name: 'portfolio.md', type: 'file', size: '12 KB', modified: '2024-01-09', icon: <FileText className="w-5 h-5 text-green-400" /> },
    { name: 'config.json', type: 'file', size: '2 KB', modified: '2024-01-08', icon: <File className="w-5 h-5 text-gray-400" /> }
  ]

  const sidebarItems = [
    { name: 'Home', icon: <Home className="w-4 h-4" />, path: '/home/user' },
    { name: 'Documents', icon: <FileText className="w-4 h-4" />, path: '/home/user/Documents' },
    { name: 'Downloads', icon: <Download className="w-4 h-4" />, path: '/home/user/Downloads' },
    { name: 'Pictures', icon: <Image className="w-4 h-4" />, path: '/home/user/Pictures' },
    { name: 'Projects', icon: <Code className="w-4 h-4" />, path: '/home/user/Projects' }
  ]

  return (
    <div className="h-full bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-48 bg-gray-800 border-r border-gray-700 p-4">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">PLACES</h3>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-sm transition-colors ${
                  currentPath === item.path 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setCurrentPath(item.path)}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-2">DEVICES</h3>
          <div className="flex items-center space-x-2 px-2 py-1.5 text-sm text-gray-300">
            <HardDrive className="w-4 h-4" />
            <span>System Drive</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 space-x-4">
          <button className="p-1 hover:bg-gray-700 rounded">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-sm font-mono">
            {currentPath}
          </div>
        </div>

        {/* File list */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 gap-1">
            {files.map((file) => (
              <motion.div
                key={file.name}
                className={`flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors ${
                  selectedItem === file.name 
                    ? 'bg-blue-600' 
                    : 'hover:bg-gray-700'
                }`}
                onClick={() => setSelectedItem(file.name)}
                whileHover={{ x: 2 }}
              >
                {file.icon}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{file.name}</div>
                </div>
                <div className="text-xs text-gray-400 w-20 text-right">
                  {file.size}
                </div>
                <div className="text-xs text-gray-400 w-24 text-right">
                  {file.modified}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div className="h-8 bg-gray-800 border-t border-gray-700 flex items-center px-4 text-xs text-gray-400">
          {files.length} items
          {selectedItem && ` • ${selectedItem} selected`}
        </div>
      </div>
    </div>
  )
}
