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
        y: Math.max(0, Math.min(window.innerHeight - size.height - 48, prev.y + e.movementY))
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
      setPosition({ x: 0, y: 0 })
      setSize({ width: window.innerWidth, height: window.innerHeight - 56 }) // Account for taskbar
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

  const windowStyle = isMaximized 
    ? { left: 0, top: 0, width: '100vw', height: 'calc(100vh - 56px)' }
    : { left: position.x, top: position.y, width: size.width, height: size.height }

  if (isMinimized) {
    return null
  }

  return (
    <motion.div
      className={`absolute bg-gray-900 border border-red-500/50 rounded-lg shadow-2xl overflow-hidden ${
        isActive ? 'ring-2 ring-red-500' : ''
      }`}
      style={{ ...windowStyle, zIndex }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onMouseDown={handleMouseDown}
    >
      {/* Window Header */}
      <div
        ref={dragRef}
        className="window-header h-8 bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-between px-3 cursor-move select-none"
      >
        <div className="flex items-center space-x-2">
          {icon && <div className="w-6 h-6 text-white flex items-center justify-center flex-shrink-0">{icon}</div>}
          <span className="text-white text-sm font-mono">{title}</span>
        </div>
        <div className="flex space-x-1">
          <button
            className="w-5 h-5 bg-yellow-500 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-colors"
            onClick={handleMinimize}
          >
            <Minus className="w-3 h-3 text-black" />
          </button>
          <button
            className="w-5 h-5 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center transition-colors"
            onClick={toggleMaximize}
          >
            <Square className="w-2 h-2 text-black" />
          </button>
          <button
            className="w-5 h-5 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center transition-colors"
            onClick={onClose}
          >
            <X className="w-3 h-3 text-black" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full bg-black text-white overflow-hidden" style={{ height: 'calc(100% - 32px)' }}>
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
          <div className="w-full h-full bg-red-500/30 hover:bg-red-500/50 transition-colors" />
        </div>
      )}
    </motion.div>
  )
}
