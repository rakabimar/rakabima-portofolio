"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Code, Globe, Shield, Smartphone, Database, X, Search, Star, Clock, CheckCircle, Sparkles } from 'lucide-react'

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
  { id: 'all', name: 'All', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'web', name: 'Web', icon: <Globe className="w-4 h-4" /> },
  { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
  { id: 'mobile', name: 'Mobile', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'ai', name: 'AI/ML', icon: <Database className="w-4 h-4" /> },
  { id: 'other', name: 'Other', icon: <Code className="w-4 h-4" /> }
]

export default function ProjectsGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredProjects = filteredProjects.filter(project => project.featured)
  const regularProjects = filteredProjects.filter(project => !project.featured)

  const getStatusConfig = (status: Project['status']) => {
    switch (status) {
      case 'completed': 
        return { 
          color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          icon: <CheckCircle className="w-3 h-3" />,
          text: 'Completed'
        }
      case 'in-progress': 
        return { 
          color: 'bg-aurora-orange/20 text-aurora-orange border-aurora-orange/30',
          icon: <Clock className="w-3 h-3" />,
          text: 'In Progress'
        }
      case 'planned': 
        return { 
          color: 'bg-aurora-coral/20 text-aurora-coral border-aurora-coral/30',
          icon: <Sparkles className="w-3 h-3" />,
          text: 'Planned'
        }
      default: 
        return { 
          color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          icon: null,
          text: 'Unknown'
        }
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return <Globe className="w-4 h-4" />
      case 'security': return <Shield className="w-4 h-4" />
      case 'mobile': return <Smartphone className="w-4 h-4" />
      case 'ai': return <Database className="w-4 h-4" />
      default: return <Code className="w-4 h-4" />
    }
  }

  const ProjectCard = ({ project, isFeatured = false }: { project: Project; isFeatured?: boolean }) => {
    const statusConfig = getStatusConfig(project.status)
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className={`group relative bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black/95 rounded-2xl overflow-hidden border border-gray-800 hover:border-aurora-orange/50 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-aurora-orange/10 ${isFeatured ? 'ring-1 ring-aurora-orange/20' : ''}`}
        onClick={() => setSelectedProject(project)}
      >
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-aurora-orange to-aurora-coral rounded-full">
            <Star className="w-3 h-3 text-black fill-current" />
            <span className="text-xs font-bold text-black">Featured</span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
          <img 
            src={project.image || "/placeholder.svg"} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
              {statusConfig.icon}
              {statusConfig.text}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-gray-300 border border-gray-700">
              {getCategoryIcon(project.category)}
              <span className="capitalize">{project.category}</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-lg text-aurora-white mb-2 group-hover:text-aurora-orange transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span 
                key={tech} 
                className="px-2 py-1 bg-aurora-orange/10 text-aurora-coral text-xs rounded-md border border-aurora-orange/20 font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-md border border-gray-700">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            {project.githubUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.githubUrl, '_blank')
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-aurora-white rounded-lg border border-gray-700 hover:border-gray-600 transition-all text-sm font-medium"
              >
                <Github className="w-4 h-4" />
                Code
              </button>
            )}
            {project.liveUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.liveUrl, '_blank')
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-aurora-orange to-aurora-coral text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-aurora-orange/25 transition-all text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </button>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="h-full bg-gradient-to-br from-black via-gray-950 to-gray-900 text-aurora-white overflow-y-auto">
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-aurora-orange/10 rounded-xl border border-aurora-orange/30">
              <Code className="w-6 h-6 text-aurora-orange" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-aurora-orange via-aurora-coral to-aurora-white bg-clip-text text-transparent">
              Projects Portfolio
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Showcasing my technical projects and contributions
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-aurora-white placeholder-gray-500 focus:outline-none focus:border-aurora-orange/50 focus:ring-1 focus:ring-aurora-orange/25 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 border ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-aurora-orange to-aurora-coral text-black border-aurora-orange/50 shadow-lg shadow-aurora-orange/20'
                    : 'bg-gray-900/80 text-gray-300 border-gray-700 hover:border-aurora-orange/40 hover:text-aurora-orange'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-gray-500 text-sm">
            Showing <span className="text-aurora-orange font-semibold">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
            {searchQuery && <span> for "<span className="text-aurora-coral">{searchQuery}</span>"</span>}
          </p>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-5">
              <Star className="w-5 h-5 text-aurora-orange" />
              <h2 className="text-xl font-bold text-aurora-white">Featured Projects</h2>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} isFeatured />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* All Projects Section */}
        {regularProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {featuredProjects.length > 0 && (
              <div className="flex items-center gap-2 mb-5">
                <Code className="w-5 h-5 text-aurora-coral" />
                <h2 className="text-xl font-bold text-aurora-white">More Projects</h2>
              </div>
            )}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {regularProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-aurora-orange/30 shadow-2xl shadow-black/50"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Image */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img 
                  src={selectedProject.image || "/placeholder.svg"} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-gray-400 hover:text-white transition-colors border border-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {selectedProject.featured && (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-aurora-orange to-aurora-coral rounded-full text-xs font-bold text-black">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusConfig(selectedProject.status).color}`}>
                      {getStatusConfig(selectedProject.status).icon}
                      {getStatusConfig(selectedProject.status).text}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-aurora-white">{selectedProject.title}</h2>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-18rem)]">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {selectedProject.longDescription}
                </p>
                
                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="font-semibold text-aurora-orange mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1.5 bg-aurora-orange/10 text-aurora-coral rounded-lg border border-aurora-orange/20 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-800">
                  {selectedProject.githubUrl && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-aurora-white font-semibold rounded-xl border border-gray-700 hover:border-gray-600 transition-all"
                    >
                      <Github className="w-5 h-5" />
                      View Source Code
                    </motion.button>
                  )}
                  {selectedProject.liveUrl && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-aurora-orange to-aurora-coral text-black font-bold rounded-xl hover:shadow-lg hover:shadow-aurora-orange/25 transition-all"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Live Demo
                    </motion.button>
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
