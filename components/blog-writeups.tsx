"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Tag, Eye, ThumbsUp, Share2 } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: 'ctf' | 'tutorial' | 'research' | 'news'
  tags: string[]
  publishDate: string
  readTime: number
  views: number
  likes: number
  featured: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: 'picoctf-2023-writeup',
    title: 'PicoCTF 2023: Complete Writeup - Top 15% Finish',
    excerpt: 'Detailed walkthrough of my PicoCTF 2023 solutions, covering web exploitation, cryptography, and binary exploitation challenges.',
    content: `# PicoCTF 2023: Complete Writeup

## Overview
This year's PicoCTF was incredibly challenging and rewarding. I managed to finish in the top 15% with 2500+ points across multiple categories.

## Web Exploitation

### findme - SQL Injection
The challenge presented a login form vulnerable to SQL injection...

### More Cookies - Session Manipulation  
This challenge involved manipulating session cookies to gain unauthorized access...

## Cryptography

### ReadMyCert - Certificate Analysis
We were given a certificate file and needed to extract hidden information...

### HideToSee - Steganography
A classic steganography challenge where data was hidden in an image file...

## Binary Exploitation

### babygame01 - Buffer Overflow
This was a straightforward buffer overflow challenge...

### two-sum - Integer Overflow
An interesting challenge involving integer overflow vulnerabilities...

## Key Takeaways
- Always check for common vulnerabilities first
- Read the source code carefully
- Use multiple tools for verification
- Document your methodology

## Tools Used
- Burp Suite for web challenges
- Ghidra for reverse engineering
- Python for automation scripts
- Wireshark for network analysis`,
    category: 'ctf',
    tags: ['CTF', 'PicoCTF', 'Web Exploitation', 'Cryptography', 'Binary Exploitation'],
    publishDate: '2023-04-15',
    readTime: 12,
    views: 1250,
    likes: 89,
    featured: true
  },
  {
    id: 'web-app-security-guide',
    title: 'Complete Guide to Web Application Security Testing',
    excerpt: 'A comprehensive guide covering OWASP Top 10 vulnerabilities and how to test for them using modern tools and techniques.',
    content: `# Complete Guide to Web Application Security Testing

## Introduction
Web application security is crucial in today's digital landscape. This guide covers the essential vulnerabilities and testing methodologies.

## OWASP Top 10 Overview

### 1. Injection Attacks
SQL injection remains one of the most critical vulnerabilities...

### 2. Broken Authentication
Authentication flaws can lead to account takeover...

### 3. Sensitive Data Exposure
Protecting sensitive data in transit and at rest...

## Testing Methodology

### Reconnaissance
- Information gathering
- Technology stack identification
- Attack surface mapping

### Vulnerability Assessment
- Automated scanning
- Manual testing
- Code review

### Exploitation
- Proof of concept development
- Impact assessment
- Risk rating

## Tools and Techniques
- Burp Suite Professional
- OWASP ZAP
- Nmap for reconnaissance
- Custom Python scripts

## Best Practices
- Follow a structured methodology
- Document everything
- Verify findings
- Provide clear remediation steps`,
    category: 'tutorial',
    tags: ['Web Security', 'OWASP', 'Penetration Testing', 'Tutorial'],
    publishDate: '2023-03-20',
    readTime: 15,
    views: 2100,
    likes: 156,
    featured: true
  },
  {
    id: 'malware-analysis-basics',
    title: 'Malware Analysis Fundamentals: Static vs Dynamic Analysis',
    excerpt: 'Learn the fundamentals of malware analysis, including static and dynamic analysis techniques, tools, and best practices.',
    content: `# Malware Analysis Fundamentals

## Introduction
Malware analysis is a critical skill for cybersecurity professionals. This post covers the basics of both static and dynamic analysis.

## Static Analysis
Static analysis involves examining malware without executing it...

### Tools for Static Analysis
- PE Explorer for Windows executables
- Strings utility for text extraction
- Hex editors for binary analysis
- Disassemblers like IDA Pro or Ghidra

## Dynamic Analysis
Dynamic analysis involves running malware in a controlled environment...

### Sandbox Environments
- Virtual machines with snapshots
- Isolated network environments
- Monitoring tools for behavior analysis

## Analysis Workflow
1. Initial triage and classification
2. Static analysis for quick insights
3. Dynamic analysis for behavior
4. Report generation and IOCs

## Safety Considerations
- Always use isolated environments
- Never analyze malware on production systems
- Keep detailed logs of all activities
- Follow legal and ethical guidelines`,
    category: 'tutorial',
    tags: ['Malware Analysis', 'Cybersecurity', 'Digital Forensics', 'Tutorial'],
    publishDate: '2023-02-10',
    readTime: 10,
    views: 1800,
    likes: 134,
    featured: false
  },
  {
    id: 'linux-privilege-escalation',
    title: 'Linux Privilege Escalation Techniques and Prevention',
    excerpt: 'Comprehensive overview of common Linux privilege escalation techniques and how to defend against them.',
    content: `# Linux Privilege Escalation Techniques

## Introduction
Understanding privilege escalation is crucial for both attackers and defenders...

## Common Techniques

### SUID/SGID Binaries
Misconfigured SUID binaries can lead to privilege escalation...

### Kernel Exploits
Outdated kernels may contain exploitable vulnerabilities...

### Cron Jobs
Misconfigured cron jobs running as root...

### Sudo Misconfigurations
Common sudo misconfigurations that can be exploited...

## Detection and Prevention
- Regular security audits
- Proper file permissions
- Kernel updates
- Sudo configuration review
- Monitoring and logging

## Tools for Testing
- LinEnum for enumeration
- Linux Exploit Suggester
- GTFOBins for binary exploitation
- Custom scripts for automation`,
    category: 'research',
    tags: ['Linux', 'Privilege Escalation', 'System Security', 'Research'],
    publishDate: '2023-01-25',
    readTime: 8,
    views: 1450,
    likes: 98,
    featured: false
  }
]

const categories = [
  { id: 'all', name: 'All Posts', count: blogPosts.length },
  { id: 'ctf', name: 'CTF Writeups', count: blogPosts.filter(p => p.category === 'ctf').length },
  { id: 'tutorial', name: 'Tutorials', count: blogPosts.filter(p => p.category === 'tutorial').length },
  { id: 'research', name: 'Research', count: blogPosts.filter(p => p.category === 'research').length },
  { id: 'news', name: 'News', count: blogPosts.filter(p => p.category === 'news').length }
]

export default function BlogWriteups() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const featuredPosts = blogPosts.filter(post => post.featured)

  const getCategoryColor = (category: BlogPost['category']) => {
    switch (category) {
      case 'ctf': return 'bg-red-500'
      case 'tutorial': return 'bg-blue-500'
      case 'research': return 'bg-green-500'
      case 'news': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryName = (category: BlogPost['category']) => {
    switch (category) {
      case 'ctf': return 'CTF'
      case 'tutorial': return 'Tutorial'
      case 'research': return 'Research'
      case 'news': return 'News'
      default: return 'Other'
    }
  }

  return (
    <div className="h-full bg-gray-900 text-white overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Blog & Writeups</h1>
          <p className="text-gray-400">Sharing knowledge through detailed writeups and tutorials</p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Featured Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(post.category)}`}>
                        {getCategoryName(post.category)}
                      </span>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

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
                <span>{category.name}</span>
                <span className="bg-gray-600 text-xs px-2 py-1 rounded-full">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
              whileHover={{ x: 5 }}
              onClick={() => setSelectedPost(post)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(post.category)}`}>
                  {getCategoryName(post.category)}
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{post.likes}</span>
                  </div>
                  <button className="hover:text-white transition-colors">
                    <Share2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Post Detail Modal */}
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
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
                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(selectedPost.category)} mb-2 inline-block`}>
                      {getCategoryName(selectedPost.category)}
                    </span>
                    <h1 className="text-2xl font-bold mb-2">{selectedPost.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(selectedPost.publishDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{selectedPost.readTime} min read</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{selectedPost.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{selectedPost.likes} likes</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                    {selectedPost.content}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
