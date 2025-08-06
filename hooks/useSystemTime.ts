import { useState, useEffect } from 'react'

interface UseSystemTimeOptions {
  updateInterval?: number // in milliseconds, default 1000
  syncOnFocus?: boolean   // sync when window gains focus, default true
  syncOnVisible?: boolean // sync when tab becomes visible, default true
}

export function useSystemTime(options: UseSystemTimeOptions = {}) {
  const {
    updateInterval = 1000,
    syncOnFocus = true,
    syncOnVisible = true
  } = options

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date())
    }

    // Update immediately
    updateTime()

    // Set up interval for regular updates
    const timer = setInterval(updateTime, updateInterval)

    // Set up event listeners for syncing
    const handleFocus = () => {
      if (syncOnFocus) updateTime()
    }

    const handleVisibilityChange = () => {
      if (syncOnVisible && !document.hidden) {
        updateTime()
      }
    }

    // Add event listeners
    if (syncOnFocus) {
      window.addEventListener('focus', handleFocus)
    }
    if (syncOnVisible) {
      document.addEventListener('visibilitychange', handleVisibilityChange)
    }

    // Cleanup function
    return () => {
      clearInterval(timer)
      if (syncOnFocus) {
        window.removeEventListener('focus', handleFocus)
      }
      if (syncOnVisible) {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }
  }, [updateInterval, syncOnFocus, syncOnVisible])

  return {
    currentTime,
    // Helper methods for common time formats
    getTime: (options?: Intl.DateTimeFormatOptions) => 
      currentTime.toLocaleTimeString([], options || { hour: '2-digit', minute: '2-digit' }),
    getDate: (options?: Intl.DateTimeFormatOptions) => 
      currentTime.toLocaleDateString([], options || { weekday: 'short', month: 'short', day: 'numeric' }),
    getFullDateTime: () => currentTime.toLocaleString(),
    getISOString: () => currentTime.toISOString(),
    getTimestamp: () => currentTime.getTime()
  }
}
