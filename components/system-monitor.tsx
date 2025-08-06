"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Cpu, HardDrive, Zap, Thermometer } from 'lucide-react'

interface SystemStats {
  cpu: number
  memory: number
  disk: number
  temperature: number
}

export default function SystemMonitor() {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    memory: 0,
    disk: 0,
    temperature: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate system stats
      setStats({
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        disk: 65 + Math.floor(Math.random() * 10),
        temperature: 45 + Math.floor(Math.random() * 20)
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const StatCard = ({ 
    title, 
    value, 
    unit, 
    icon, 
    color 
  }: { 
    title: string
    value: number
    unit: string
    icon: React.ReactNode
    color: string 
  }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`text-${color}-400`}>{icon}</div>
          <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        </div>
        <span className="text-lg font-bold text-white">{value}{unit}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div
          className={`bg-${color}-400 h-2 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )

  const processes = [
    { name: 'firefox', cpu: 15.2, memory: 8.5, pid: 1234 },
    { name: 'code', cpu: 8.1, memory: 12.3, pid: 5678 },
    { name: 'terminal', cpu: 2.3, memory: 1.2, pid: 9012 },
    { name: 'system', cpu: 1.8, memory: 3.4, pid: 3456 },
    { name: 'node', cpu: 5.7, memory: 6.8, pid: 7890 }
  ]

  return (
    <div className="h-full bg-gray-900 text-white p-6 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">System Monitor</h1>
        <p className="text-gray-400">Real-time system performance</p>
      </div>

      {/* System Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          title="CPU Usage"
          value={stats.cpu}
          unit="%"
          icon={<Cpu className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Memory"
          value={stats.memory}
          unit="%"
          icon={<Zap className="w-5 h-5" />}
          color="green"
        />
        <StatCard
          title="Disk Usage"
          value={stats.disk}
          unit="%"
          icon={<HardDrive className="w-5 h-5" />}
          color="yellow"
        />
        <StatCard
          title="Temperature"
          value={stats.temperature}
          unit="°C"
          icon={<Thermometer className="w-5 h-5" />}
          color="red"
        />
      </div>

      {/* Process List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Running Processes</h2>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-400 pb-2 border-b border-gray-700">
              <span>Process</span>
              <span>PID</span>
              <span>CPU %</span>
              <span>Memory %</span>
            </div>
            {processes.map((process) => (
              <motion.div
                key={process.pid}
                className="grid grid-cols-4 gap-4 text-sm py-2 hover:bg-gray-700 rounded transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="font-mono">{process.name}</span>
                <span className="text-gray-400">{process.pid}</span>
                <span className="text-blue-400">{process.cpu}%</span>
                <span className="text-green-400">{process.memory}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
