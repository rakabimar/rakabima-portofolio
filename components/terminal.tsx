"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"

interface TerminalProps {
  initialPath?: string
}

interface FileSystem {
  [key: string]: {
    type: 'directory' | 'file'
    content?: string
    children?: FileSystem
  }
}

const fileSystem: FileSystem = {
  '/': {
    type: 'directory',
    children: {
      'about': {
        type: 'directory',
        children: {
          'bio.txt': {
            type: 'file',
            content: `Name: [Your Name]
Title: Computer Science Student | Cybersecurity Enthusiast
Location: [Your Location]

I'm a passionate Computer Science student with a focus on Cybersecurity and Software Engineering. 
I love solving complex problems, participating in CTF competitions, and building innovative solutions.

Skills: Python, JavaScript, React, Node.js, Linux, Network Security, Penetration Testing
Interests: Ethical Hacking, Web Development, System Administration, Digital Forensics`
          },
          'contact.txt': {
            type: 'file',
            content: `Email: your.email@example.com
LinkedIn: linkedin.com/in/yourprofile
GitHub: github.com/yourusername
Portfolio: yourportfolio.com

Feel free to reach out for collaboration opportunities or just to chat about tech!`
          }
        }
      },
      'projects': {
        type: 'directory',
        children: {
          'riszerve.md': {
            type: 'file',
            content: `# Riszerve - Restaurant Reservation System

## Overview
A full-stack web application for restaurant reservations built with React and Node.js.

## Features
- Real-time table availability
- User authentication
- Admin dashboard
- Email notifications
- Mobile responsive design

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: PostgreSQL
- Authentication: JWT

## GitHub
https://github.com/yourusername/riszerve`
          },
          'portfolio.md': {
            type: 'file',
            content: `# Terminal Portfolio

## Description
An interactive terminal-themed portfolio website that simulates a desktop OS environment.

## Features
- Draggable/resizable windows
- Custom terminal with command parsing
- File system navigation
- Email integration
- Responsive mobile design

## Commands
- ls: list directory contents
- cd: change directory
- cat: display file contents
- help: show available commands
- clear: clear terminal`
          },
          'ctf-writeups': {
            type: 'directory',
            children: {
              'picoctf2023.md': {
                type: 'file',
                content: `# PicoCTF 2023 Writeups

## Web Exploitation
- findme: SQL injection vulnerability
- More Cookies: Session manipulation
- SOAP: XML external entity attack

## Cryptography
- ReadMyCert: Certificate analysis
- HideToSee: Steganography challenge

## Binary Exploitation
- babygame01: Buffer overflow
- two-sum: Integer overflow

Score: 2500 points | Rank: Top 15%`
              }
            }
          }
        }
      },
      'resume': {
        type: 'directory',
        children: {
          'resume.txt': {
            type: 'file',
            content: `[YOUR NAME]
Computer Science Student | Cybersecurity Enthusiast

EDUCATION
Bachelor of Science in Computer Science
[University Name] | Expected Graduation: [Date]
GPA: [Your GPA] | Relevant Coursework: Data Structures, Algorithms, Network Security

EXPERIENCE
Cybersecurity Intern | [Company] | [Dates]
- Conducted vulnerability assessments
- Implemented security monitoring tools
- Assisted in incident response procedures

PROJECTS
- Riszerve: Restaurant reservation system (React, Node.js)
- Network Scanner: Python-based port scanner
- CTF Platform: Web-based capture-the-flag system

SKILLS
Languages: Python, JavaScript, Java, C++, SQL
Frameworks: React, Node.js, Express, Flask
Tools: Wireshark, Nmap, Burp Suite, Git, Docker
Operating Systems: Linux, Windows, macOS

CERTIFICATIONS
- CompTIA Security+ (In Progress)
- Cisco CCNA (Planned)

ACHIEVEMENTS
- PicoCTF 2023: Top 15% finish
- Dean's List: Fall 2022, Spring 2023
- Cybersecurity Club Vice President`
          }
        }
      },
      'security': {
        type: 'directory',
        children: {
          'tools.txt': {
            type: 'file',
            content: `# Security Tools & Knowledge

## Penetration Testing
- Nmap: Network discovery and security auditing
- Burp Suite: Web application security testing
- Metasploit: Exploitation framework
- Wireshark: Network protocol analyzer

## CTF Experience
- PicoCTF 2023: Top 15% finish
- OverTheWire: Completed Bandit series
- TryHackMe: 50+ rooms completed

## Certifications
- CompTIA Security+ (In Progress)
- Ethical Hacker (CEH) - Planned

## Research Areas
- Web Application Security
- Network Security
- Digital Forensics
- Malware Analysis`
          }
        }
      }
    }
  }
}

export default function Terminal({ initialPath = '/' }: TerminalProps) {
  const [currentPath, setCurrentPath] = useState(initialPath)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [output, setOutput] = useState<Array<{ type: 'command' | 'output' | 'error'; content: string }>>([
    { type: 'output', content: 'Welcome to the Terminal Portfolio v1.0' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' }
  ])
  const [currentCommand, setCurrentCommand] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [output, scrollToBottom])

  useEffect(() => {
    if (initialPath !== '/') {
      setCurrentPath(initialPath)
      executeCommand(`cd ${initialPath}`, false)
    }
  }, [initialPath])

  const getCurrentDirectory = useCallback(() => {
    const pathParts = currentPath.split('/').filter(Boolean)
    let current = fileSystem['/']
    
    for (const part of pathParts) {
      if (current.children && current.children[part]) {
        current = current.children[part]
      } else {
        return null
      }
    }
    return current
  }, [currentPath])

  const executeCommand = useCallback((command: string, addToHistory = true) => {
    const trimmedCommand = command.trim()
    if (!trimmedCommand) return

    if (addToHistory) {
      setOutput(prev => [...prev, { type: 'command', content: `${currentPath}$ ${trimmedCommand}` }])
      setCommandHistory(prev => [...prev, trimmedCommand])
    }

    const [cmd, ...args] = trimmedCommand.split(' ')

    switch (cmd.toLowerCase()) {
      case 'help':
        setOutput(prev => [...prev, 
          { type: 'output', content: 'Available commands:' },
          { type: 'output', content: '  ls          - list directory contents' },
          { type: 'output', content: '  cd <dir>    - change directory' },
          { type: 'output', content: '  cat <file>  - display file contents' },
          { type: 'output', content: '  pwd         - print working directory' },
          { type: 'output', content: '  clear       - clear terminal' },
          { type: 'output', content: '  whoami      - display current user' },
          { type: 'output', content: '  date        - display current date' },
          { type: 'output', content: '  open <app>  - open application' },
          { type: 'output', content: '  hack        - ???' },
          { type: 'output', content: '' }
        ])
        break

      case 'ls':
        const currentDir = getCurrentDirectory()
        if (currentDir && currentDir.children) {
          const items = Object.entries(currentDir.children).map(([name, item]) => {
            const prefix = item.type === 'directory' ? 'd' : '-'
            return `${prefix}rwxr-xr-x 1 user user 4096 Jan 1 12:00 ${name}`
          })
          setOutput(prev => [...prev, ...items.map(item => ({ type: 'output' as const, content: item })), { type: 'output', content: '' }])
        } else {
          setOutput(prev => [...prev, { type: 'error', content: 'ls: cannot access directory' }, { type: 'output', content: '' }])
        }
        break

      case 'cd':
        const targetDir = args[0] || '/'
        let newPath: string

        if (targetDir === '/') {
          newPath = '/'
        } else if (targetDir === '..') {
          const pathParts = currentPath.split('/').filter(Boolean)
          pathParts.pop()
          newPath = '/' + pathParts.join('/')
        } else if (targetDir.startsWith('/')) {
          newPath = targetDir
        } else {
          newPath = currentPath === '/' ? `/${targetDir}` : `${currentPath}/${targetDir}`
        }

        // Validate path exists
        const pathParts = newPath.split('/').filter(Boolean)
        let current = fileSystem['/']
        let pathExists = true

        for (const part of pathParts) {
          if (current.children && current.children[part] && current.children[part].type === 'directory') {
            current = current.children[part]
          } else {
            pathExists = false
            break
          }
        }

        if (pathExists) {
          setCurrentPath(newPath)
        } else {
          setOutput(prev => [...prev, { type: 'error', content: `cd: ${targetDir}: No such file or directory` }, { type: 'output', content: '' }])
        }
        break

      case 'cat':
        const filename = args[0]
        if (!filename) {
          setOutput(prev => [...prev, { type: 'error', content: 'cat: missing file operand' }, { type: 'output', content: '' }])
          break
        }

        const dir = getCurrentDirectory()
        if (dir && dir.children && dir.children[filename]) {
          const file = dir.children[filename]
          if (file.type === 'file' && file.content) {
            const lines = file.content.split('\n')
            setOutput(prev => [...prev, ...lines.map(line => ({ type: 'output' as const, content: line })), { type: 'output', content: '' }])
          } else {
            setOutput(prev => [...prev, { type: 'error', content: `cat: ${filename}: Is a directory` }, { type: 'output', content: '' }])
          }
        } else {
          setOutput(prev => [...prev, { type: 'error', content: `cat: ${filename}: No such file or directory` }, { type: 'output', content: '' }])
        }
        break

      case 'pwd':
        setOutput(prev => [...prev, { type: 'output', content: currentPath }, { type: 'output', content: '' }])
        break

      case 'clear':
        setOutput([])
        break

      case 'whoami':
        setOutput(prev => [...prev, { type: 'output', content: 'visitor' }, { type: 'output', content: '' }])
        break

      case 'date':
        setOutput(prev => [...prev, { type: 'output', content: new Date().toString() }, { type: 'output', content: '' }])
        break

      case 'open':
        const app = args[0]
        if (app === 'email') {
          setOutput(prev => [...prev, { type: 'output', content: 'Opening email application...' }, { type: 'output', content: '' }])
        } else {
          setOutput(prev => [...prev, { type: 'error', content: `open: ${app}: Application not found` }, { type: 'output', content: '' }])
        }
        break

      case 'hack':
        setOutput(prev => [...prev, 
          { type: 'output', content: 'Initiating hack sequence...' },
          { type: 'output', content: 'Access denied. Nice try! 😄' },
          { type: 'output', content: 'This is a portfolio, not a real system!' },
          { type: 'output', content: '' }
        ])
        break

      case 'sudo':
        setOutput(prev => [...prev, 
          { type: 'output', content: 'sudo: you are not in the sudoers file. This incident will be reported.' },
          { type: 'output', content: '(Just kidding, this is a demo!)' },
          { type: 'output', content: '' }
        ])
        break

      default:
        setOutput(prev => [...prev, { type: 'error', content: `${cmd}: command not found` }, { type: 'output', content: '' }])
    }
  }, [currentPath, getCurrentDirectory])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand)
      setCurrentCommand('')
      setHistoryIndex(-1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentCommand('')
        } else {
          setHistoryIndex(newIndex)
          setCurrentCommand(commandHistory[newIndex])
        }
      }
    }
  }

  return (
    <div className={`h-full bg-black text-green-400 font-mono overflow-hidden flex flex-col ${
      isMobile ? 'text-xs p-2' : 'text-sm p-4'
    }`}>
      <div ref={terminalRef} className="flex-1 overflow-y-auto space-y-1 terminal-scroll">
        {output.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={
              line.type === 'command' 
                ? 'text-white' 
                : line.type === 'error' 
                ? 'text-red-400' 
                : 'text-green-400'
            }
          >
            {line.content}
          </motion.div>
        ))}
      </div>
      
      <div className="flex items-center mt-2 flex-shrink-0">
        <span className="text-red-400 mr-2 flex-shrink-0">
          {isMobile ? '$' : `${currentPath}$`}
        </span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400 caret-green-400 min-w-0"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  )
}
