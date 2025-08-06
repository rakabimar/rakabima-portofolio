"use client"

import { useState, useEffect } from "react"
import LinuxDesktop from "@/components/linux-desktop"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Boot sequence simulation
    const timer = setTimeout(() => setIsLoaded(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 font-mono text-center">
          <div className="text-2xl mb-4">BOOTING LINUX SYSTEM...</div>
          <div className="flex space-x-1 justify-center">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-green-400 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <div className="mt-4 text-sm">Loading Ubuntu 22.04 LTS...</div>
          <div className="mt-2 text-xs text-gray-500">Welcome to Portfolio Desktop Environment</div>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LinuxDesktop />
    </ThemeProvider>
  )
}
