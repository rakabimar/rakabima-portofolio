"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code, Shield, Database, Globe, Server, Terminal, Cpu, Network } from 'lucide-react'

interface Skill {
  name: string
  level: number
  category: string
  icon: React.ReactNode
  experience: string
  projects: string[]
}

const skills: Skill[] = [
  // Programming Languages
  { name: 'Python', level: 90, category: 'Programming', icon: <Code className="w-5 h-5" />, experience: '3+ years', projects: ['Network Scanner', 'Malware Analyzer'] },
  { name: 'JavaScript', level: 85, category: 'Programming', icon: <Code className="w-5 h-5" />, experience: '2+ years', projects: ['Terminal Portfolio', 'Riszerve'] },
  { name: 'TypeScript', level: 80, category: 'Programming', icon: <Code className="w-5 h-5" />, experience: '1+ years', projects: ['Terminal Portfolio'] },
  { name: 'Java', level: 75, category: 'Programming', icon: <Code className="w-5 h-5" />, experience: '2+ years', projects: ['University Projects'] },
  { name: 'C++', level: 70, category: 'Programming', icon: <Code className="w-5 h-5" />, experience: '1+ years', projects: ['System Programming'] },
  { name: 'SQL', level: 85, category: 'Programming', icon: <Database className="w-5 h-5" />, experience: '2+ years', projects: ['Riszerve', 'CTF Platform'] },

  // Web Technologies
  { name: 'React', level: 88, category: 'Web Development', icon: <Globe className="w-5 h-5" />, experience: '2+ years', projects: ['Terminal Portfolio', 'Riszerve'] },
  { name: 'Node.js', level: 82, category: 'Web Development', icon: <Server className="w-5 h-5" />, experience: '2+ years', projects: ['Riszerve', 'CTF Platform'] },
  { name: 'Express', level: 80, category: 'Web Development', icon: <Server className="w-5 h-5" />, experience: '2+ years', projects: ['Riszerve'] },
  { name: 'Next.js', level: 85, category: 'Web Development', icon: <Globe className="w-5 h-5" />, experience: '1+ years', projects: ['Terminal Portfolio'] },
  { name: 'Tailwind CSS', level: 90, category: 'Web Development', icon: <Globe className="w-5 h-5" />, experience: '1+ years', projects: ['Terminal Portfolio'] },

  // Cybersecurity
  { name: 'Penetration Testing', level: 85, category: 'Cybersecurity', icon: <Shield className="w-5 h-5" />, experience: '2+ years', projects: ['CTF Competitions'] },
  { name: 'Network Security', level: 80, category: 'Cybersecurity', icon: <Network className="w-5 h-5" />, experience: '2+ years', projects: ['Network Scanner'] },
  { name: 'Malware Analysis', level: 75, category: 'Cybersecurity', icon: <Shield className="w-5 h-5" />, experience: '1+ years', projects: ['Malware Analyzer'] },
  { name: 'Digital Forensics', level: 70, category: 'Cybersecurity', icon: <Shield className="w-5 h-5" />, experience: '1+ years', projects: ['University Research'] },
  { name: 'Vulnerability Assessment', level: 82, category: 'Cybersecurity', icon: <Shield className="w-5 h-5" />, experience: '2+ years', projects: ['Internship Work'] },

  // Tools & Technologies
  { name: 'Linux', level: 88, category: 'Systems', icon: <Terminal className="w-5 h-5" />, experience: '3+ years', projects: ['Daily Use', 'Server Management'] },
  { name: 'Docker', level: 75, category: 'Systems', icon: <Cpu className="w-5 h-5" />, experience: '1+ years', projects: ['CTF Platform'] },
  { name: 'Git', level: 90, category: 'Systems', icon: <Code className="w-5 h-5" />, experience: '3+ years', projects: ['All Projects'] },
  { name: 'PostgreSQL', level: 80, category: 'Systems', icon: <Database className="w-5 h-5" />, experience: '2+ years', projects: ['Riszerve', 'CTF Platform'] },
  { name: 'MongoDB', level: 75, category: 'Systems', icon: <Database className="w-5 h-5" />, experience: '1+ years', projects: ['Malware Analyzer'] }
]

const categories = ['All', 'Programming', 'Web Development', 'Cybersecurity', 'Systems']

export default function SkillsVisualization() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [animatedLevels, setAnimatedLevels] = useState<{[key: string]: number}>({})

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  useEffect(() => {
    // Animate skill levels on mount
    const timer = setTimeout(() => {
      const levels: {[key: string]: number} = {}
      skills.forEach(skill => {
        levels[skill.name] = skill.level
      })
      setAnimatedLevels(levels)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const getSkillColor = (level: number) => {
    if (level >= 85) return 'from-green-500 to-green-600'
    if (level >= 70) return 'from-blue-500 to-blue-600'
    if (level >= 50) return 'from-yellow-500 to-yellow-600'
    return 'from-red-500 to-red-600'
  }

  const getSkillLabel = (level: number) => {
    if (level >= 85) return 'Expert'
    if (level >= 70) return 'Advanced'
    if (level >= 50) return 'Intermediate'
    return 'Beginner'
  }

  return (
    <div className="h-full bg-gray-900 text-white overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Technical Skills</h1>
          <p className="text-gray-400">Interactive visualization of my technical competencies</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">{skills.length}</div>
            <div className="text-gray-400">Total Skills</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-2xl font-bold text-green-400">{skills.filter(s => s.level >= 85).length}</div>
            <div className="text-gray-400">Expert Level</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-2xl font-bold text-yellow-400">{skills.filter(s => s.category === 'Cybersecurity').length}</div>
            <div className="text-gray-400">Security Skills</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-2xl font-bold text-purple-400">3+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedSkill(skill)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-blue-400">{skill.icon}</div>
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-sm text-gray-400">{skill.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{skill.level}%</div>
                  <div className="text-xs text-gray-400">{getSkillLabel(skill.level)}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
                <motion.div
                  className={`h-3 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${animatedLevels[skill.name] || 0}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>

              <div className="flex justify-between text-sm text-gray-400">
                <span>{skill.experience}</span>
                <span>{skill.projects.length} projects</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Detail Modal */}
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className="bg-gray-800 rounded-lg max-w-2xl w-full p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-blue-400">{selectedSkill.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedSkill.name}</h2>
                    <p className="text-gray-400">{selectedSkill.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Proficiency Level</span>
                  <span className="font-bold">{selectedSkill.level}% - {getSkillLabel(selectedSkill.level)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full bg-gradient-to-r ${getSkillColor(selectedSkill.level)}`}
                    style={{ width: `${selectedSkill.level}%` }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Experience</h3>
                <p className="text-gray-300">{selectedSkill.experience}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Projects Using This Skill</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.projects.map((project) => (
                    <span key={project} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded">
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
