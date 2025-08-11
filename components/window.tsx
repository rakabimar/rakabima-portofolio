"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Minus, Square } from 'lucide-react'

interface WindowProps {
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

export default function Window({
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
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState(initialSize)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [previousState, setPreviousState] = useState({ position: initialPosition, size: initialSize })
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
        y: Math.max(32, Math.min(window.innerHeight - size.height - 48, prev.y + e.movementY))
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
    if (isMaximized) {
      setPosition(previousState.position)
      setSize(previousState.size)
      setIsMaximized(false)
    } else {
      setPreviousState({ position, size })
      setPosition({ x: 0, y: 32 })
      setSize({ width: window.innerWidth, height: window.innerHeight - 80 }) // Account for top panel and taskbar
      setIsMaximized(true)
    }
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

  // Add event listeners for mouse events
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

  const windowStyle = isMaximized 
    ? { left: 0, top: 32, width: '100vw', height: 'calc(100vh - 80px)' }
    : { left: position.x, top: position.y, width: size.width, height: size.height }

  if (isMinimized) {
    return null
  }

  return (
    <motion.div
      className={`absolute bg-desktop-primary border rounded-lg shadow-aurora overflow-hidden ${
        isActive ? 'ring-2 ring-app-accent border-app-accent/50' : 'border-desktop-border'
      }`}
      style={{ ...windowStyle, zIndex }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onMouseDown={handleMouseDown}
    >
      {/* Window Header - Desktop Theme */}
      <div
        ref={dragRef}
        className={`window-header h-8 flex items-center justify-between px-3 cursor-move select-none ${
          isActive 
            ? 'bg-gradient-to-r from-app-accent to-app-accent/80' 
            : 'bg-gradient-to-r from-desktop-secondary to-desktop-secondary/80'
        }`}
      >
        <div className="flex items-center space-x-2">
          {icon && <div className="w-6 h-6 text-aurora-white flex items-center justify-center flex-shrink-0">{icon}</div>}
          <span className="text-aurora-white text-sm font-medium">{title}</span>
        </div>
        <div className="flex space-x-1">
          <button
            className="w-5 h-5 bg-desktop-muted hover:bg-aurora-orange rounded-full flex items-center justify-center transition-colors"
            onClick={handleMinimize}
          >
            <Minus className="w-3 h-3 text-aurora-white" />
          </button>
          <button
            className="w-5 h-5 bg-desktop-muted hover:bg-aurora-orange rounded-full flex items-center justify-center transition-colors"
            onClick={toggleMaximize}
          >
            <Square className="w-2 h-2 text-aurora-white" />
          </button>
          <button
            className="w-5 h-5 bg-aurora-coral hover:bg-aurora-coral/80 rounded-full flex items-center justify-center transition-colors"
            onClick={onClose}
          >
            <X className="w-3 h-3 text-aurora-white" />
          </button>
        </div>
      </div>

      {/* Window Content - App Theme */}
      <div className="h-full bg-gradient-to-br from-app-primary to-app-secondary text-aurora-white overflow-hidden" style={{ height: 'calc(100% - 32px)' }}>
        {children}
      </div>

      {/* Resize Handle - Desktop Theme */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={(e) => {
            e.stopPropagation()
            setIsResizing(true)
            onFocus()
          }}
        >
          <div className="w-full h-full bg-app-accent/30 hover:bg-app-accent/50 transition-colors" />
        </div>
      )}
    </motion.div>
  )
}