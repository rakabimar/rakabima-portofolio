"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LinuxDesktop from "@/components/linux-desktop"
import { ThemeProvider } from "@/components/theme-provider"
import { User, Lock, Power, Settings, Wifi, Volume2, Battery, ChevronRight } from "lucide-react"

export default function Home() {
  const [bootPhase, setBootPhase] = useState<'booting' | 'login' | 'desktop'>('booting')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Boot sequence simulation
  useEffect(() => {
    const timer = setTimeout(() => setBootPhase('login'), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    setIsLoggingIn(true)
    // Simulate login animation then go to desktop
    setTimeout(() => setBootPhase('desktop'), 800)
  }

  // Boot sequence screen
  if (bootPhase === 'booting') {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        {/* Ubuntu-style boot animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Ubuntu/Linux Logo */}
          <div className="relative mb-8">
            <motion.div
              className="w-24 h-24 rounded-full border-4 border-aurora-orange flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(220, 96, 63, 0.3)',
                  '0 0 40px rgba(220, 96, 63, 0.6)',
                  '0 0 20px rgba(220, 96, 63, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-aurora-orange to-aurora-coral"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-4 border-black/30 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-black/50" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Loading dots */}
          <div className="flex space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-aurora-orange"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15
                }}
              />
            ))}
          </div>

          {/* Boot text */}
          <motion.p
            className="text-gray-500 text-sm font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Starting RakOS...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  // Login screen
  if (bootPhase === 'login') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col overflow-hidden relative"
        >
          {/* Background blur circles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-aurora-orange/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-aurora-coral/10 rounded-full blur-3xl" />
          </div>

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-black/30 backdrop-blur-sm">
            <span className="text-aurora-white/70 text-sm font-medium">RakOS 24.04 LTS</span>
            <div className="flex items-center space-x-4 text-aurora-white/70">
              <Wifi className="w-4 h-4" />
              <Volume2 className="w-4 h-4" />
              <div className="flex items-center space-x-1">
                <Battery className="w-4 h-4" />
                <span className="text-xs">100%</span>
              </div>
              <span className="text-sm">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Main login content */}
          <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* User Avatar */}
              <motion.div
                className="relative mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-aurora-orange to-aurora-coral p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                    <User className="w-16 h-16 text-aurora-white/80" />
                  </div>
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-gray-900" />
              </motion.div>

              {/* Username */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-semibold text-aurora-white mb-2"
              >
                Guest
              </motion.h1>

              {/* Welcome message */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-aurora-white/60 mb-8 text-center"
              >
                Welcome back! Click to enter the desktop.
              </motion.p>

              {/* Login Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={handleLogin}
                disabled={isLoggingIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-aurora-orange to-aurora-coral rounded-full text-white font-medium shadow-lg shadow-aurora-orange/25 hover:shadow-aurora-orange/40 transition-all duration-300 disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Log In</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>

              {/* Hint text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-aurora-white/40 text-sm"
              >
                Press Enter or click the button to continue
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-black/30 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-aurora-white/70 hover:text-aurora-white">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center">
              <p className="text-aurora-white/50 text-xs">
                {currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-aurora-white/70 hover:text-red-400">
                <Power className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Keyboard shortcut listener */}
          <KeyboardListener onEnter={handleLogin} disabled={isLoggingIn} />
        </motion.div>
      </AnimatePresence>
    )
  }

  // Desktop
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LinuxDesktop />
      </motion.div>
    </ThemeProvider>
  )
}

// Keyboard listener component
function KeyboardListener({ onEnter, disabled }: { onEnter: () => void; disabled: boolean }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !disabled) {
        onEnter()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onEnter, disabled])

  return null
}
