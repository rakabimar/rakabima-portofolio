"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Play, Code, Globe, Database, Shield, Smartphone } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: 'web' | 'security' | 'mobile' | 'ai' | 'other'
  image: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  status: 'completed' | 'in-progress' | 'planned'
}

const projects: Project[] = [
  {
    id: 'riszerve',
    title: 'Riszerve - Restaurant Reservation System',
    description: 'Full-stack restaurant reservation platform with real-time availability',
    longDescription: 'A comprehensive restaurant reservation system built with React and Node.js. Features include real-time table availability, user authentication, admin dashboard, email notifications, and mobile-responsive design. Implemented secure payment processing and automated booking confirmations.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Express', 'JWT', 'Stripe'],
    category: 'web',
    image: '/placeholder.svg?height=300&width=500&text=Riszerve+Dashboard',
    githubUrl: 'https://github.com/yourusername/riszerve',
    liveUrl: 'https://riszerve-demo.vercel.app',
    featured: true,
    status: 'completed'
  },
  {
    id: 'terminal-portfolio',
    title: 'Interactive Terminal Portfolio',
    description: 'Browser-based OS simulation with custom terminal and desktop environment',
    longDescription: 'An innovative portfolio website that simulates a complete desktop operating system in the browser. Features draggable windows, custom terminal with command parsing, file system navigation, and mobile-responsive design. Built to showcase technical skills in an engaging, interactive format.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    category: 'web',
    image: '/placeholder.svg?height=300&width=500&text=Terminal+Portfolio',
    githubUrl: 'https://github.com/yourusername/terminal-portfolio',
    liveUrl: 'https://your-portfolio.com',
    featured: true,
    status: 'completed'
  },
  {
    id: 'network-scanner',
    title: 'Advanced Network Scanner',
    description: 'Python-based network discovery and vulnerability assessment tool',
    longDescription: 'A comprehensive network scanning tool built in Python for cybersecurity professionals. Features port scanning, service detection, vulnerability assessment, and detailed reporting. Includes stealth scanning modes and custom payload generation.',
    technologies: ['Python', 'Scapy', 'Nmap', 'SQLite', 'Tkinter'],
    category: 'security',
    image: '/placeholder.svg?height=300&width=500&text=Network+Scanner',
    githubUrl: 'https://github.com/yourusername/network-scanner',
    featured: true,
    status: 'completed'
  },
  {
    id: 'ctf-platform',
    title: 'CTF Competition Platform',
    description: 'Web-based capture-the-flag platform for cybersecurity competitions',
    longDescription: 'A full-featured CTF platform designed for hosting cybersecurity competitions. Includes challenge management, team registration, real-time scoring, hint systems, and administrative tools. Built with security best practices and scalable architecture.',
    technologies: ['Django', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
    category: 'security',
    image: '/placeholder.svg?height=300&width=500&text=CTF+Platform',
    githubUrl: 'https://github.com/yourusername/ctf-platform',
    featured: false,
    status: 'in-progress'
  },
  {
    id: 'malware-analyzer',
    title: 'Malware Analysis Toolkit',
    description: 'Automated malware analysis and reporting system',
    longDescription: 'A comprehensive toolkit for analyzing malware samples in a controlled environment. Features static and dynamic analysis, behavioral monitoring, network traffic analysis, and automated report generation. Built for cybersecurity researchers and incident response teams.',
    technologies: ['Python', 'Volatility', 'YARA', 'Cuckoo', 'MongoDB'],
    category: 'security',
    image: '/placeholder.svg?height=300&width=500&text=Malware+Analyzer',
    githubUrl: 'https://github.com/yourusername/malware-analyzer',
    featured: false,
    status: 'planned'
  },
  {
    id: 'blockchain-voting',
    title: 'Blockchain Voting System',
    description: 'Secure, transparent voting system using blockchain technology',
    longDescription: 'A decentralized voting system built on Ethereum blockchain ensuring transparency, immutability, and security. Features voter authentication, real-time results, audit trails, and smart contract-based vote counting.',
    technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'MetaMask'],
    category: 'other',
    image: '/placeholder.svg?height=300&width=500&text=Blockchain+Voting',
    githubUrl: 'https://github.com/yourusername/blockchain-voting',
    featured: false,
    status: 'completed'
  }
]

const categories = [
  { id: 'all', name: 'All Projects', icon: <Code className="w-4 h-4" /> },
  { id: 'web', name: 'Web Development', icon: <Globe className="w-4 h-4" /> },
  { id: 'security', name: 'Cybersecurity', icon: <Shield className="w-4 h-4" /> },
  { id: 'mobile', name: 'Mobile Apps', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'ai', name: 'AI/ML', icon: <Database className="w-4 h-4" /> },
  { id: 'other', name: 'Other', icon: <Code className="w-4 h-4" /> }
]

export default function ProjectsGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const featuredProjects = projects.filter(project => project.featured)

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in-progress': return 'bg-yellow-500'
      case 'planned': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'Completed'
      case 'in-progress': return 'In Progress'
      case 'planned': return 'Planned'
      default: return 'Unknown'
    }
  }

  return (
    <div className="h-full bg-gray-900 text-white overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Projects Portfolio</h1>
          <p className="text-gray-400">Showcasing my technical projects and contributions</p>
        </div>

        {/* Featured Projects */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video bg-gray-700 relative overflow-hidden">
                  <img 
                    src={project.image || "/placeholder.svg"} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Live
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video bg-gray-700 relative overflow-hidden">
                  <img 
                    src={project.image || "/placeholder.svg"} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Live
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(selectedProject.status)}`}>
                      {getStatusText(selectedProject.status)}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                
                <img 
                  src={selectedProject.image || "/placeholder.svg"} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                
                <p className="text-gray-300 mb-4">{selectedProject.longDescription}</p>
                
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  {selectedProject.githubUrl && (
                    <Button onClick={() => window.open(selectedProject.githubUrl, '_blank')}>
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                  )}
                  {selectedProject.liveUrl && (
                    <Button onClick={() => window.open(selectedProject.liveUrl, '_blank')}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
