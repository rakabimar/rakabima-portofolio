"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LinuxDesktop from "@/components/linux-desktop"
import { ThemeProvider } from "@/components/theme-provider"
import { User, Power, Settings, Wifi, Volume2, Battery } from "lucide-react"

export default function Home() {
  const [bootPhase, setBootPhase] = useState<'login' | 'desktop'>('login')
  const [currentTime, setCurrentTime] = useState(new Date())
  const isLoggingIn = true

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (bootPhase !== 'login') return

    const timer = setTimeout(() => setBootPhase('desktop'), 1800)
    return () => clearTimeout(timer)
  }, [bootPhase])

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

              {/* Auto login progress */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center justify-center gap-4"
              >
                <motion.div
                  className="flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full border-4 border-aurora-white/15 border-t-aurora-orange border-r-aurora-coral"
                  />
                </motion.div>
                <span className="text-sm text-aurora-white/60">Entering desktop</span>
              </motion.div>

              {/* Hint text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-2 text-aurora-white/30 text-xs"
              >
                Please wait
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
