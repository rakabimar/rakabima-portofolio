//  Mock AI Chat API - Will be replaced with actual RAG implementation
// This simulates AI responses based on a knowledge base about Rakabima

import { NextRequest, NextResponse } from 'next/server'

// Knowledge base for RAG simulation
const knowledgeBase = {
  personal: {
    name: "Rakabima Ghaniendra",
    nickname: "Raka",
    title: "Computer Science Student & Cybersecurity Enthusiast",
    university: "University of Indonesia",
    major: "Computer Science",
    interests: ["Cybersecurity", "Ethical Hacking", "Web Development", "CTF Competitions", "Backend Development"]
  },
  skills: {
    programming: ["Python", "JavaScript", "TypeScript", "Java", "C", "Go", "SQL"],
    web: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Django", "FastAPI"],
    security: ["Penetration Testing", "Network Security", "Web Security", "Digital Forensics", "Reverse Engineering"],
    tools: ["Linux", "Docker", "Git", "Wireshark", "Burp Suite", "Nmap", "Metasploit", "Ghidra"],
    cloud: ["AWS", "GCP", "Vercel", "Railway"]
  },
  projects: [
    {
      name: "Riszerve",
      description: "A full-stack restaurant reservation system with real-time availability tracking, user authentication, and admin dashboard",
      technologies: ["React", "Node.js", "PostgreSQL", "Express"],
      type: "Web Application"
    },
    {
      name: "Terminal Portfolio",
      description: "This interactive Linux desktop environment portfolio you're using right now! Built with modern web technologies",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      type: "Portfolio"
    },
    {
      name: "CTF Writeups",
      description: "Collection of CTF challenge writeups and solutions for various competitions",
      technologies: ["Python", "Security Tools", "Markdown"],
      type: "Documentation"
    }
  ],
  achievements: [
    "PicoCTF 2024: Top 15% Global Finish",
    "Active CTF competitor in various national and international competitions",
    "Cybersecurity research and vulnerability assessments"
  ],
  contact: {
    email: "rakabimarusdianto22@gmail.com",
    github: "github.com/rakabima",
    linkedin: "linkedin.com/in/rakabima"
  }
}

// Simple keyword matching for mock responses (will be replaced with actual RAG)
function generateMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|halo|hai)/)) {
    return `Hello! 👋 I'm Raka's AI assistant. I can tell you about his skills, projects, experience, and more. What would you like to know about him?`
  }
  
  // Name/Who questions
  if (lowerMessage.includes('who') && (lowerMessage.includes('raka') || lowerMessage.includes('you'))) {
    return `Rakabima Ghaniendra (Raka) is a Computer Science student at the University of Indonesia with a strong passion for cybersecurity and web development. He's actively involved in CTF competitions and has achieved top 15% globally in PicoCTF 2024! 🎯`
  }
  
  // Skills
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('can do')) {
    return `Raka has a diverse skill set! 🛠️

**Programming Languages:** Python, JavaScript, TypeScript, Java, C, Go, SQL

**Web Development:** React, Next.js, Node.js, Express, Tailwind CSS, Django, FastAPI

**Cybersecurity:** Penetration Testing, Network Security, Web Security, Digital Forensics, Reverse Engineering

**Tools:** Linux, Docker, Git, Wireshark, Burp Suite, Nmap, Metasploit

Would you like to know more about any specific area?`
  }
  
  // Projects
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('built')) {
    return `Here are some of Raka's notable projects! 🚀

**1. Riszerve**
A full-stack restaurant reservation system with real-time availability, user auth, and admin dashboard.
*Tech: React, Node.js, PostgreSQL, Express*

**2. Terminal Portfolio**
This interactive Linux desktop environment you're using right now! 
*Tech: Next.js, TypeScript, Tailwind CSS, Framer Motion*

**3. CTF Writeups**
Collection of CTF challenge writeups and solutions.
*Tech: Python, Security Tools*

Want details about any specific project?`
  }
  
  // CTF/Security
  if (lowerMessage.includes('ctf') || lowerMessage.includes('security') || lowerMessage.includes('hack') || lowerMessage.includes('cyber')) {
    return `Raka is passionate about cybersecurity! 🔐

**Achievements:**
• PicoCTF 2024: Top 15% Global (out of thousands of participants!)
• Active competitor in national and international CTF competitions
• Experienced in web exploitation, cryptography, forensics, and reverse engineering

**Security Skills:**
• Penetration Testing & Vulnerability Assessment
• Network Security Analysis
• Web Application Security
• Digital Forensics
• Tools: Burp Suite, Wireshark, Nmap, Metasploit, Ghidra

He regularly practices on platforms like HackTheBox, TryHackMe, and various CTF competitions!`
  }
  
  // Education
  if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('university') || lowerMessage.includes('college') || lowerMessage.includes('school')) {
    return `Raka is currently pursuing his Bachelor's degree in Computer Science at the **University of Indonesia** 🎓

His studies focus on:
• Data Structures & Algorithms
• Network Security
• Software Engineering
• Database Systems
• Operating Systems

He's also self-taught in many cybersecurity topics and actively participates in CTF competitions to enhance his practical skills!`
  }
  
  // Contact
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('hire') || lowerMessage.includes('email') || lowerMessage.includes('connect')) {
    return `You can reach out to Raka through these channels! 📬

**Email:** rakabimarusdianto22@gmail.com
**GitHub:** github.com/rakabima
**LinkedIn:** linkedin.com/in/rakabima

He's open to opportunities in:
• Cybersecurity roles (Security Analyst, Penetration Tester)
• Software Development positions
• Internships and collaborative projects

Feel free to use the Mail app in this portfolio to send him a message directly! 💌`
  }
  
  // Experience
  if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('history')) {
    return `Here's a summary of Raka's background! 📋

**Education:** Computer Science @ University of Indonesia

**Technical Focus:**
• Full-stack Web Development
• Cybersecurity & Ethical Hacking
• CTF Competitions

**Key Achievements:**
• PicoCTF 2024 Top 15% Global
• Multiple web application projects
• Active open-source contributor

**Current Interests:**
• Cloud Security
• DevSecOps
• Advanced Penetration Testing

Want to know more about any specific aspect?`
  }
  
  // Thanks
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return `You're welcome! 😊 Feel free to ask if you have any other questions about Raka. You can also explore the other apps in this desktop environment to learn more!`
  }
  
  // Default response
  return `That's an interesting question! While I'm still learning, I can tell you about:

• **Skills** - Programming languages, frameworks, and tools
• **Projects** - Web apps, CTF writeups, and more
• **Cybersecurity** - CTF achievements and security expertise
• **Education** - Academic background and learning journey
• **Contact** - How to reach out for opportunities

What would you like to explore? 🤔`
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
    
    const response = generateMockResponse(message)
    
    return NextResponse.json({
      success: true,
      response,
      // Metadata for future RAG implementation
      metadata: {
        model: 'mock-v1',
        tokens: response.length,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}
