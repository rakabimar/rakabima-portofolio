"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Calendar,
  Code,
  Mail,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  ChevronRight,
  ExternalLink,
  ChevronLeft,
} from "lucide-react"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("summary")
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [currentTechIndex, setCurrentTechIndex] = useState(0)

  const tabs = [
    { id: "summary", label: "Summary", icon: <User className="w-4 h-4" /> },
    { id: "journey", label: "Journey", icon: <Calendar className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <Code className="w-4 h-4" /> },
    { id: "resume", label: "Resume", icon: <FileText className="w-4 h-4" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ]

  const skillsets = [
    {
      title: "Cybersecurity Specialist",
      description:
        "Penetration testing, vulnerability assessment, and security analysis. Active in CTF competitions and ethical hacking.",
      icon: "🛡️",
      highlights: ["Penetration Testing", "Vulnerability Assessment", "CTF Competitions", "Ethical Hacking"],
    },
    {
      title: "Software Engineer",
      description:
        "Full-stack development with modern frameworks. Building scalable, secure applications with clean architecture.",
      icon: "💻",
      highlights: ["Full-Stack Development", "System Architecture", "API Design", "Database Design"],
    },
    {
      title: "DevOps & Cloud Engineer",
      description:
        "Infrastructure automation, CI/CD pipelines, and cloud deployment. Focus on security-first DevOps practices.",
      icon: "☁️",
      highlights: ["CI/CD Pipelines", "Infrastructure as Code", "Container Orchestration", "Cloud Security"],
    },
    {
      title: "Digital Forensics Analyst",
      description:
        "Network traffic analysis, incident response, and digital evidence collection for comprehensive security solutions.",
      icon: "🔍",
      highlights: ["Network Analysis", "Incident Response", "Digital Forensics", "Malware Analysis"],
    },
  ]

  const techStackCategories = [
    {
      category: "Programming Languages",
      tools: [
        { name: "Python", logo: "🐍" },
        { name: "JavaScript", logo: "⚡" },
        { name: "TypeScript", logo: "📘" },
        { name: "Java", logo: "☕" },
        { name: "C++", logo: "⚙️" },
        { name: "Go", logo: "🐹" },
      ],
    },
    {
      category: "Web Technologies",
      tools: [
        { name: "React", logo: "⚛️" },
        { name: "Node.js", logo: "🟢" },
        { name: "Next.js", logo: "▲" },
        { name: "Express", logo: "🚀" },
        { name: "FastAPI", logo: "⚡" },
        { name: "Django", logo: "🎸" },
      ],
    },
    {
      category: "Security Tools",
      tools: [
        { name: "Wireshark", logo: "🦈" },
        { name: "Burp Suite", logo: "🔍" },
        { name: "Metasploit", logo: "💥" },
        { name: "Nmap", logo: "🗺️" },
        { name: "Kali Linux", logo: "🔓" },
        { name: "OWASP ZAP", logo: "⚡" },
      ],
    },
    {
      category: "DevOps & Cloud",
      tools: [
        { name: "Docker", logo: "🐳" },
        { name: "Kubernetes", logo: "☸️" },
        { name: "AWS", logo: "☁️" },
        { name: "Linux", logo: "🐧" },
        { name: "Git", logo: "📝" },
        { name: "PostgreSQL", logo: "🐘" },
      ],
    },
  ]

  const journey = [
    {
      id: 1,
      organization: "Universitas Indonesia",
      type: "education",
      period: "2022 - Present",
      positions: [
        {
          title: "Computer Science Student",
          timeline: "2022 - Present",
          description: "Specializing in cybersecurity and software engineering",
          achievements: ["Dean's List: 3 semesters", "Cybersecurity Club VP", "PicoCTF Top 15%"],
        },
      ],
    },
    {
      id: 2,
      organization: "Tech Corp",
      type: "work",
      period: "2023 - 2024",
      positions: [
        {
          title: "Security Intern",
          timeline: "Summer 2023",
          description: "Hands-on experience in penetration testing and security analysis",
          achievements: ["Discovered critical vulnerabilities", "Automated security testing", "Security documentation"],
        },
        {
          title: "Junior Security Analyst",
          timeline: "2023 - 2024",
          description: "Leading security assessments and implementing defense mechanisms",
          achievements: ["50+ vulnerability assessments", "40% reduction in incidents", "Led incident response"],
        },
      ],
    },
    {
      id: 3,
      organization: "Self-Learning Journey",
      type: "milestone",
      period: "2019 - Present",
      positions: [
        {
          title: "Programming & Cybersecurity",
          timeline: "2019 - Present",
          description: "Continuous learning and skill development in technology",
          achievements: ["First Python script", "Built first web app", "Joined first CTF competition"],
        },
      ],
    },
  ]

  // Auto-advance skillsets carousel
  useEffect(() => {
    if (activeTab === "summary") {
      const interval = setInterval(() => {
        setCurrentSkillIndex((prev) => (prev + 1) % skillsets.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [activeTab, skillsets.length])

  // Auto-advance tech stack carousel
  useEffect(() => {
    if (activeTab === "summary") {
      const interval = setInterval(() => {
        setCurrentTechIndex((prev) => (prev + 1) % techStackCategories.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [activeTab, techStackCategories.length])

  const getJourneyIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase className="w-5 h-5" />
      case "education":
        return <GraduationCap className="w-5 h-5" />
      case "milestone":
        return <Award className="w-5 h-5" />
      default:
        return <Calendar className="w-5 h-5" />
    }
  }

  return (
    <div className="h-full bg-redteam-gradient text-cyber-white overflow-hidden flex flex-col">
      {/* Header - Red Team Theme */}
      <div className="bg-redteam-secondary/50 backdrop-blur-sm border-b border-redteam-accent/20 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyber-cyan to-desktop-accent rounded-xl flex items-center justify-center">
            <img
              src="images/profile/profile_picture.jpg"
              alt="Profile Picture"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-cyber-white">Rakabima Ghaniendra Rusdianto</h1>
            <p className="text-cyber-cyan text-sm">CS @ UI</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Red Team Theme */}
      <div className="bg-redteam-secondary/30 backdrop-blur-sm border-b border-redteam-accent/20 px-6 py-4">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-redteam-accent/30 text-cyber-white border border-redteam-accent/50"
                  : "text-desktop-muted hover:bg-redteam-secondary/50 hover:text-cyber-white"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8"
          >
            {activeTab === "summary" && (
              <div className="max-w-6xl mx-auto space-y-12">
                {/* Hero Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center space-y-6"
                >
                  <h1 className="text-4xl md:text-6xl font-serif leading-tight bg-gradient-to-r from-redteam-primary via-cyber-cyan to-desktop-accent bg-clip-text text-transparent">
                    Engineering with a hacker's mindset.
                    <br />
                  </h1>
                  <p className="text-xl text-desktop-muted max-w-4xl mx-auto leading-relaxed">
                    Building software worth protecting & protecting software worth building.
                  </p>
                </motion.div>

                {/* Skills and Tech Stack */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* My Skillsets - Red Team Theme */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-redteam-background/60 backdrop-blur-sm rounded-2xl p-8 border border-redteam-accent/40 app-pattern"
                  >
                    <div className="flex items-center space-x-2 mb-6">
                      <span className="text-sm font-mono text-cyber-cyan">⚡ My skillsets</span>
                    </div>

                    <div className="relative h-80 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSkillIndex}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 space-y-4"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl">{skillsets[currentSkillIndex].icon}</span>
                            <h3 className="text-xl font-bold text-cyber-white">{skillsets[currentSkillIndex].title}</h3>
                          </div>
                          <p className="text-desktop-muted leading-relaxed">{skillsets[currentSkillIndex].description}</p>
                          <div className="flex flex-wrap gap-2">
                            {skillsets[currentSkillIndex].highlights.map((highlight, index) => (
                              <span
                                key={index}
                                className="text-xs px-3 py-1 bg-redteam-primary/20 text-redteam-accent rounded-full border border-redteam-accent/30"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Progress indicators */}
                    <div className="flex justify-center space-x-2 mt-4">
                      {skillsets.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSkillIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentSkillIndex ? "bg-redteam-accent" : "bg-desktop-muted"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-redteam-accent/30">
                      <p className="text-desktop-muted">
                        Expert in <span className="text-redteam-primary font-semibold">Cybersecurity</span>,{" "}
                        <span className="text-desktop-accent font-semibold">Penetration Testing</span>, and{" "}
                        <span className="text-cyber-cyan font-semibold">Secure Development</span>.
                        <br />
                        Regularly competing in <span className="text-cyber-blue font-semibold">CTF competitions</span>.
                      </p>
                    </div>
                  </motion.div>

                  {/* My Tech Stack & Tools - Mixed Theme for contrast */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-redteam-secondary/40 backdrop-blur-sm rounded-2xl p-8 border border-redteam-accent/30 app-pattern"
                  >
                    <div className="flex items-center space-x-2 mb-6">
                      <span className="text-sm font-mono text-cyber-cyan">🛠️ My tech stack & tools</span>
                    </div>

                    <div className="relative h-80 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentTechIndex}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                        >
                          <h3 className="text-lg font-bold text-cyber-white mb-6 text-center">
                            {techStackCategories[currentTechIndex].category}
                          </h3>
                          <div className="grid grid-cols-3 gap-4">
                            {techStackCategories[currentTechIndex].tools.map((tech, index) => (
                              <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-redteam-background/60 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-redteam-accent/20 transition-all duration-200 cursor-pointer border border-redteam-accent/20 hover:border-redteam-accent/50"
                                title={tech.name}
                              >
                                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                                  {tech.logo}
                                </span>
                                <span className="text-xs text-desktop-muted text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  {tech.name}
                                </span>
                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-redteam-secondary text-cyber-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                  {tech.name}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Progress indicators */}
                    <div className="flex justify-center space-x-2 mt-4">
                      {techStackCategories.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTechIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentTechIndex ? "bg-cyber-cyan" : "bg-desktop-muted"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-redteam-accent/30">
                      <p className="text-desktop-muted">
                        Achieving peak <em className="text-cyber-cyan">efficiency</em> and{" "}
                        <em className="text-desktop-accent">performance</em> through careful
                        <br />
                        <em className="text-redteam-accent">attention to detail</em>, ensuring{" "}
                        <span className="text-cyber-blue font-semibold">perfection</span> in every project.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {activeTab === "journey" && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center text-cyber-white">My Professional Journey</h2>
                <div className="space-y-8">
                  {journey.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-redteam-background/60 backdrop-blur-sm rounded-2xl p-6 border border-redteam-accent/30"
                    >
                      {/* Organization Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-redteam-accent/20 flex items-center justify-center border border-redteam-accent/30">
                            {getJourneyIcon(item.type)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-cyber-white">{item.organization}</h3>
                            <p className="text-cyber-cyan text-sm">{item.period}</p>
                          </div>
                        </div>
                      </div>

                      {/* Positions */}
                      <div className="space-y-4">
                        {item.positions.map((position, posIndex) => (
                          <motion.div
                            key={posIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 + posIndex * 0.1 }}
                            className="bg-redteam-secondary/40 rounded-xl p-4 border border-redteam-accent/20"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-cyber-white">{position.title}</h4>
                              <span className="text-xs text-desktop-muted bg-redteam-background/40 px-2 py-1 rounded">
                                {position.timeline}
                              </span>
                            </div>
                            <p className="text-desktop-muted text-sm mb-3">{position.description}</p>
                            <div className="space-y-1">
                              {position.achievements.map((achievement, achIndex) => (
                                <div key={achIndex} className="flex items-center space-x-2 text-sm text-desktop-muted">
                                  <div className="w-1 h-1 bg-cyber-cyan rounded-full"></div>
                                  <span>{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-redteam-background/60 rounded-3xl p-12 text-cyber-white shadow-redteam border border-redteam-accent/30">
                  <Code className="w-20 h-20 mx-auto mb-6 text-cyber-cyan" />
                  <h2 className="text-3xl font-bold mb-4">Explore My Projects</h2>
                  <p className="text-lg text-desktop-muted mb-8">
                    Discover the innovative solutions I've built, from cybersecurity tools to full-stack applications.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-redteam-accent to-redteam-primary text-cyber-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <span>View Projects</span>
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === "resume" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-redteam-background/60 rounded-3xl p-12 text-cyber-white shadow-redteam border border-redteam-accent/30">
                  <FileText className="w-20 h-20 mx-auto mb-6 text-redteam-accent" />
                  <h2 className="text-3xl font-bold mb-4">Download My Resume</h2>
                  <p className="text-lg text-desktop-muted mb-8">
                    Get a comprehensive overview of my experience, skills, and achievements in a professional format.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-redteam-accent to-redteam-primary text-cyber-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <span>View Resume</span>
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === "contact" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-redteam-background/60 rounded-3xl p-12 text-cyber-white shadow-redteam border border-redteam-accent/30">
                  <Mail className="w-20 h-20 mx-auto mb-6 text-cyber-cyan" />
                  <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
                  <p className="text-lg text-desktop-muted mb-8">
                    Ready to discuss opportunities, collaborations, or just chat about technology and cybersecurity.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cyber-cyan to-cyber-blue text-redteam-background px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <span>Send Message</span>
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
