"use client"

import { motion } from "framer-motion"
import { Download, ExternalLink, Mail, Github, Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function ResumeApp() {
  const handleDownload = () => {
    // In a real app, this would download your actual resume PDF
    const link = document.createElement('a')
    link.href = '/resume-document.png'
    link.download = 'resume.pdf'
    link.click()
  }

  return (
    <div className="h-full bg-white text-gray-900 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-start"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">[Your Name]</h1>
              <p className="text-xl text-red-100">Computer Science Student | Cybersecurity Enthusiast</p>
              <p className="text-red-200 mt-1">[Your Location]</p>
            </div>
            <Button
              onClick={handleDownload}
              className="bg-white text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </Button>
          </motion.div>
          
          <div className="flex space-x-4 mt-4">
            <a href="mailto:your.email@example.com" className="flex items-center space-x-1 text-red-100 hover:text-white">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
            <a href="https://github.com/yourusername" className="flex items-center space-x-1 text-red-100 hover:text-white">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/yourprofile" className="flex items-center space-x-1 text-red-100 hover:text-white">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-200 pb-2">Education</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Bachelor of Science in Computer Science</h3>
            <p className="text-gray-600">[University Name] | Expected Graduation: [Date]</p>
            <p className="text-gray-600">GPA: [Your GPA]</p>
            <p className="mt-2"><strong>Relevant Coursework:</strong> Data Structures, Algorithms, Network Security, Database Systems, Software Engineering</p>
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-200 pb-2">Experience</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Cybersecurity Intern</h3>
              <p className="text-gray-600">[Company Name] | [Dates]</p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                <li>Conducted vulnerability assessments on web applications</li>
                <li>Implemented security monitoring tools and procedures</li>
                <li>Assisted in incident response and forensic analysis</li>
                <li>Documented security findings and recommendations</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-200 pb-2">Projects</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold flex items-center">
                Riszerve
                <ExternalLink className="w-4 h-4 ml-2 text-gray-500" />
              </h3>
              <p className="text-gray-600 text-sm">Restaurant Reservation System</p>
              <p className="mt-2 text-gray-700">Full-stack web application built with React and Node.js featuring real-time table availability and admin dashboard.</p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">React</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Node.js</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">PostgreSQL</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Terminal Portfolio</h3>
              <p className="text-gray-600 text-sm">Interactive Desktop Environment</p>
              <p className="mt-2 text-gray-700">Browser-based OS simulation with draggable windows, custom terminal, and file system navigation.</p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">React</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">TypeScript</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Tailwind</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-200 pb-2">Skills</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript', 'Java', 'C++', 'SQL', 'Bash'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Frameworks & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Express', 'Flask', 'Git', 'Docker'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Cybersecurity</h3>
              <div className="flex flex-wrap gap-2">
                {['Wireshark', 'Nmap', 'Burp Suite', 'Metasploit', 'OWASP', 'Penetration Testing'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Operating Systems</h3>
              <div className="flex flex-wrap gap-2">
                {['Linux', 'Windows', 'macOS', 'Kali Linux'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-200 pb-2">Achievements</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>PicoCTF 2023: Top 15% finish with 2500+ points</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Dean's List: Fall 2022, Spring 2023</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Cybersecurity Club Vice President</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>CompTIA Security+ (In Progress)</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
