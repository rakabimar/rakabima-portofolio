"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, GraduationCap, Award, Coffee, Code, Shield, Heart } from 'lucide-react'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story')

  const tabs = [
    { id: 'story', label: 'My Story', icon: <Heart className="w-4 h-4" /> },
    { id: 'journey', label: 'Journey', icon: <Calendar className="w-4 h-4" /> },
    { id: 'values', label: 'Values', icon: <Award className="w-4 h-4" /> },
    { id: 'fun', label: 'Fun Facts', icon: <Coffee className="w-4 h-4" /> }
  ]

  const timeline = [
    {
      year: '2020',
      title: 'Started Computer Science',
      description: 'Began my journey in Computer Science, discovering my passion for cybersecurity and ethical hacking.',
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      year: '2021',
      title: 'First CTF Competition',
      description: 'Participated in my first Capture The Flag competition, ranking in top 25% and igniting my cybersecurity passion.',
      icon: <Shield className="w-5 h-5" />
    },
    {
      year: '2022',
      title: 'Web Development Focus',
      description: 'Expanded into full-stack web development, building my first major project - a restaurant reservation system.',
      icon: <Code className="w-5 h-5" />
    },
    {
      year: '2023',
      title: 'Cybersecurity Internship',
      description: 'Landed my first cybersecurity internship, gaining hands-on experience in vulnerability assessment and incident response.',
      icon: <Shield className="w-5 h-5" />
    },
    {
      year: '2024',
      title: 'Portfolio Innovation',
      description: 'Created this interactive terminal portfolio to showcase my skills in a unique, engaging way.',
      icon: <Code className="w-5 h-5" />
    }
  ]

  const values = [
    {
      title: 'Continuous Learning',
      description: 'Technology evolves rapidly, and I believe in staying current with the latest trends, tools, and security practices.',
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      title: 'Ethical Practice',
      description: 'In cybersecurity, ethics are paramount. I\'m committed to using my skills responsibly and protecting others.',
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: 'Innovation',
      description: 'I love finding creative solutions to complex problems and building things that make a difference.',
      icon: <Code className="w-6 h-6" />
    },
    {
      title: 'Collaboration',
      description: 'The best solutions come from diverse perspectives. I value teamwork and knowledge sharing.',
      icon: <Heart className="w-6 h-6" />
    }
  ]

  const funFacts = [
    '🏆 Completed 50+ rooms on TryHackMe',
    '☕ Powered by coffee and curiosity',
    '🐧 Linux enthusiast since 2020',
    '🎮 Enjoy reverse engineering game mechanics',
    '📚 Read 20+ cybersecurity books this year',
    '🌙 Night owl - best coding happens after midnight',
    '🔐 Can pick basic locks (legally, for learning!)',
    '🎯 Goal: Contribute to open-source security tools'
  ]

  return (
    <div className="h-full bg-gray-900 text-white overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold">
              [YN]
            </div>
            <h1 className="text-3xl font-bold mb-2">[Your Name]</h1>
            <p className="text-xl text-blue-400 mb-2">Computer Science Student & Cybersecurity Enthusiast</p>
            <div className="flex items-center justify-center space-x-4 text-gray-400">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>[Your Location]</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Available for opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'story' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">My Story</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Hi! I'm a passionate Computer Science student with a deep fascination for cybersecurity and software engineering. 
                    My journey into tech began with curiosity about how things work under the hood, which naturally led me to 
                    cybersecurity - the art of understanding systems so well that you can both protect and ethically test them.
                  </p>
                  <p>
                    What drives me is the constant challenge of staying ahead in an ever-evolving field. Every day brings new 
                    vulnerabilities to understand, new tools to master, and new ways to build more secure systems. I love the 
                    puzzle-solving aspect of cybersecurity and the satisfaction of building robust, user-friendly applications.
                  </p>
                  <p>
                    When I'm not coding or participating in CTF competitions, you'll find me contributing to open-source projects, 
                    reading the latest security research, or experimenting with new technologies. I believe in learning by doing, 
                    which is why I've built this interactive portfolio - to showcase not just what I know, but how I think and create.
                  </p>
                  <p>
                    I'm currently seeking opportunities where I can apply my skills in cybersecurity and software development 
                    while continuing to learn from experienced professionals. My goal is to contribute to building a more secure 
                    digital world, one line of code at a time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'journey' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-blue-400 text-center">My Journey</h2>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="text-blue-400 font-bold">{item.year}</div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                    <div className="flex-1 bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'values' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-blue-400 text-center">Core Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-blue-400">{value.icon}</div>
                      <h3 className="text-xl font-semibold">{value.title}</h3>
                    </div>
                    <p className="text-gray-300">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'fun' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-blue-400 text-center">Fun Facts About Me</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-colors"
                  >
                    <p className="text-gray-300">{fact}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
