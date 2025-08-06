"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Minus, Square, MoreHorizontal } from 'lucide-react'

interface LinuxWindowProps {
  id: string
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  initialPosition: { x: number; y: number }
  initialSize: { width: number; height: number }
  isActive: boolean
  onClose: () => void
  onFocus: () => void
  onMinimize?: (appId: string) => void
  zIndex: number
}

export default function LinuxWindow({
  id,
  title,
  icon,
  children,
  initialPosition,
  initialSize,
  isActive,
  onClose,
  onFocus,
  onMinimize,
  zIndex
}: LinuxWindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState(initialSize)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === dragRef.current || (e.target as Element).closest('.window-header')) {
      setIsDragging(true)
      onFocus()
    }
  }, [onFocus])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      setPosition(prev => ({
        x: Math.max(0, Math.min(window.innerWidth - size.width, prev.x + e.movementX)),
        y: Math.max(32, Math.min(window.innerHeight - size.height - 48, prev.y + e.movementY)) // Account for top panel
      }))
    }
    if (isResizing && !isMaximized) {
      setSize(prev => ({
        width: Math.max(300, Math.min(window.innerWidth - position.x, prev.width + e.movementX)),
        height: Math.max(200, Math.min(window.innerHeight - position.y, prev.height + e.movementY))
      }))
    }
  }, [isDragging, isResizing, size, position, isMaximized])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
  }, [])

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
    if (onMinimize) {
      onMinimize(id)
    }
  }

  const handleRestore = useCallback(() => {
    setIsMinimized(false)
    // Small delay to ensure the window is visible before focusing
    setTimeout(() => {
      onFocus()
    }, 0)
  }, [onFocus])

  // Fix: Use useEffect instead of useState for event listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp])

  // Expose restore function to parent component
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.restoreWindow) {
        window.restoreWindow = {}
      }
      window.restoreWindow[id] = handleRestore
      
      return () => {
        if (window.restoreWindow) {
          delete window.restoreWindow[id]
        }
      }
    }
  }, [id, handleRestore])

  if (isMinimized) {
    return null
  }

  const windowStyle = isMaximized 
    ? { left: 0, top: 32, width: '100vw', height: 'calc(100vh - 80px)' } // Account for panels
    : { left: position.x, top: position.y, width: size.width, height: size.height }

  return (
    <motion.div
      className={`absolute bg-white border border-gray-300 rounded-lg shadow-2xl overflow-hidden ${
        isActive ? 'ring-2 ring-orange-500' : ''
      }`}
      style={{ ...windowStyle, zIndex }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onMouseDown={handleMouseDown}
    >
      {/* Linux-style Window Header */}
      <div
        ref={dragRef}
        className={`window-header h-10 flex items-center justify-between px-4 cursor-move select-none ${
          isActive 
            ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
            : 'bg-gradient-to-r from-gray-400 to-gray-500'
        }`}
      >
        <div className="flex items-center space-x-3">
          {icon && <div className="w-6 h-6 text-white flex items-center justify-center flex-shrink-0">{icon}</div>}
          <span className="text-white text-sm font-medium">{title}</span>
        </div>
        
        {/* Linux-style window controls */}
        <div className="flex items-center space-x-1">
          <button
            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
            onClick={handleMinimize}
            title="Minimize"
          >
            <Minus className="w-3 h-3 text-gray-700" />
          </button>
          <button
            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
            onClick={toggleMaximize}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <Square className="w-2 h-2 text-gray-700" />
          </button>
          <button
            className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
            onClick={onClose}
            title="Close"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full bg-white text-gray-900 overflow-hidden" style={{ height: 'calc(100% - 40px)' }}>
        {children}
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={(e) => {
            e.stopPropagation()
            setIsResizing(true)
            onFocus()
          }}
        >
          <div className="w-full h-full bg-orange-500/30 hover:bg-orange-500/50 transition-colors" />
        </div>
      )}
    </motion.div>
  )
}
