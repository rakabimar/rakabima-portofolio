"use client"

import { useSystemTime } from '../hooks/useSystemTime'
import { Clock } from 'lucide-react'

interface TimeDisplayProps {
  format?: 'minimal' | 'standard' | 'detailed'
  showIcon?: boolean
  showDate?: boolean
  className?: string
  timezone?: string
}

export default function TimeDisplay({ 
  format = 'standard',
  showIcon = true,
  showDate = true,
  className = '',
  timezone
}: TimeDisplayProps) {
  const { currentTime, getTime, getDate } = useSystemTime()

  // If timezone is specified, create a new date with that timezone
  const displayTime = timezone 
    ? new Date(currentTime.toLocaleString("en-US", { timeZone: timezone }))
    : currentTime

  const formatTime = (time: Date) => {
    switch (format) {
      case 'minimal':
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      case 'detailed':
        return time.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
          hour12: true 
        })
      default:
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }

  const formatDate = (time: Date) => {
    switch (format) {
      case 'minimal':
        return time.toLocaleDateString([], { month: 'numeric', day: 'numeric' })
      case 'detailed':
        return time.toLocaleDateString([], { 
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      default:
        return time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showIcon && <Clock className="w-4 h-4" />}
      <div className="flex flex-col items-end text-right">
        {showDate && (
          <span className="text-xs leading-none opacity-75">
            {formatDate(displayTime)}
          </span>
        )}
        <span className={`font-mono leading-none ${format === 'detailed' ? 'text-lg' : 'text-sm'}`}>
          {formatTime(displayTime)}
        </span>
        {timezone && (
          <span className="text-xs opacity-50">
            {timezone}
          </span>
        )}
      </div>
    </div>
  )
}
