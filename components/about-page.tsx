"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Marquee from './ui/marquee';
import { GlowingEffect } from "./ui/glowing-effect";
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
  icons,
  Trophy,
} from "lucide-react"

interface AboutPageProps {
  onOpenApp?: (appId: string) => void
}

export default function AboutPage({ onOpenApp }: AboutPageProps) {
  const [activeTab, setActiveTab] = useState("summary")
  const [journeyFilter, setJourneyFilter] = useState<"all" | "education" | "work" | "milestone">("all")

  const tabs = [
    { id: "summary", label: "Summary", icon: <User className="w-4 h-4" /> },
    { id: "journey", label: "Journey", icon: <Calendar className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <Code className="w-4 h-4" /> },
    { id: "awards", label: "Awards", icon: <Trophy className="w-4 h-4" /> },
    { id: "resume", label: "Resume", icon: <FileText className="w-4 h-4" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ]

  const skillsets = [
    {
      title: "Offensive Security & Red Team Operations",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" 
          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: "Back-End Software Development",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" 
          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      title: "DevOps, DevSecOps & CI/CD Automation",
      icon: (
        <svg width="24" height="24" fill="currentColor" stroke="none" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M7 7.75c-2.34721 0 -4.25 1.90279 -4.25 4.25 0 2.3472 1.90279 4.25 4.25 4.25 0.59689 0 1.04496 -0.1073 1.40677 -0.2836 0.36246 -0.1766 0.67926 -0.4424 0.98626 -0.8169 0.54003 -0.6587 0.98317 -1.557 1.56717 -2.7405 0.1167 -0.2366 0.2391 -0.4846 0.369 -0.7444 0.1163 -0.2326 0.2297 -0.4633 0.3415 -0.6905 0.5807 -1.1804 1.1166 -2.26995 1.7763 -3.07459 0.4103 -0.50052 0.8896 -0.92222 1.4892 -1.21436C15.5364 6.3927 16.2162 6.25 17 6.25c3.1756 0 5.75 2.57436 5.75 5.75 0 3.1756 -2.5744 5.75 -5.75 5.75 -1.2938 0 -2.4895 -0.4284 -3.4505 -1.1503 -0.3311 -0.2488 -0.3979 -0.719 -0.1492 -1.0502 0.2488 -0.3311 0.719 -0.3979 1.0502 -0.1492 0.7103 0.5337 1.5919 0.8497 2.5495 0.8497 2.3472 0 4.25 -1.9028 4.25 -4.25 0 -2.34721 -1.9028 -4.25 -4.25 -4.25 -0.5969 0 -1.045 0.1073 -1.4068 0.2836 -0.3624 0.17661 -0.6792 0.44241 -0.9862 0.81689 -0.5401 0.65875 -0.9832 1.55701 -1.5672 2.74051 -0.1167 0.2366 -0.2391 0.4846 -0.369 0.7444 -0.1163 0.2326 -0.2297 0.4633 -0.3415 0.6905 -0.5807 1.1804 -1.1166 2.27 -1.7763 3.0746 -0.4103 0.5005 -0.88965 0.9222 -1.48919 1.2143C8.4636 17.6073 7.78382 17.75 7 17.75c-3.17564 0 -5.75 -2.5744 -5.75 -5.75 0 -3.17564 2.57436 -5.75 5.75 -5.75 1.29384 0 2.48982 0.42823 3.451 1.15038 0.3312 0.24881 0.3979 0.71897 0.1491 1.05013 -0.2488 0.33116 -0.71896 0.39792 -1.05012 0.14911C8.83967 8.06595 7.95781 7.75 7 7.75Z" />
        </svg>
      ),
    },
    {
      title: "AI-Powered Application Development",
      icon: (
        <svg width="24" height="24" fill="currentColor" stroke="none" viewBox="0 0 256 256">
          <path d="M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124ZM88,208a32,32,0,0,1-31.81-28.56A55.87,55.87,0,0,0,64,180h8a8,8,0,0,0,0-16H64A40,40,0,0,1,50.67,86.27A8,8,0,0,0,56,78.73V72a32,32,0,0,1,64,0v68.26A47.8,47.8,0,0,0,88,128a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a55.87,55.87,0,0,0,7.81-.56A32,32,0,1,1,168,144a8,8,0,0,0,0-16,47.8,47.8,0,0,0-32,12.26V72a32,32,0,0,1,64,0v6.73a8,8,0,0,0,5.33,7.54A40,40,0,0,1,192,164Zm16-52a8,8,0,0,1-8,8h-4a36,36,0,0,1-36-36V80a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4A8,8,0,0,1,208,112ZM60,120H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,84V80a8,8,0,0,1,16,0v4A36,36,0,0,1,60,120Z"/>
        </svg>
      ),
    },
    {
      title: "Software Quality Assurance & Testing",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" 
          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      ),
    },
    {
      title: "Security Operations & Threat Detection",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" 
          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 1l3 5.5L21 7l-4 4 1 6-6-3.5L6 17l1-6-4-4 6-.5L12 1z" />
        </svg>
      ),
    },
    {
      title: "Secure Database Architecture & Optimization",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z"></path></svg>
      )
    }
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
      category: "DevOps & CI/CD",
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

  const SkillCard = ({
    title,
    icon,
  }: {
    title: string,
    icon: React.ReactNode
  }) => {
    return (
      <div className="relative w-36 h-36 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-aurora-orange/30 p-5 bg-gray-800 hover:bg-gray-700/50 transition-all duration-200">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-aurora-orange mb-2 flex items-center justify-center">
              {icon}
            </div>
            <h3 className="text-xs font-semibold text-aurora-white text-center leading-tight">
              {title}
            </h3>
          </div>
      </div>
    );
  };

  // Enhanced Skills Carousel Component with proper infinite marquee
  const SkillsCarousel = () => {
    return (
      <div className="relative w-full flex items-center justify-center overflow-hidden rounded-lg">
        <Marquee pauseOnHover className="[--duration:25s] [--gap:1rem]">
          {skillsets.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </Marquee>
        
        {/* Enhanced gradient masks for seamless fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-900 via-gray-900/90 to-transparent z-10"></div>
      </div>
    );
  };

  // Tech Stack Tool Card Component
  const TechToolCard = ({ name, logo }: { name: string; logo: string }) => {
    return (
      <div className="group/card relative bg-gray-700/80 rounded-xl flex items-center justify-center hover:bg-aurora-coral/20 transition-all duration-300 cursor-pointer border border-gray-600 hover:border-aurora-coral/50 w-20 h-20 shrink-0 overflow-hidden">
        {/* Logo - fades on hover */}
        <span className="text-3xl transition-all duration-300 group-hover/card:opacity-20 group-hover/card:scale-110">
          {logo}
        </span>
        {/* Name overlay - appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <span className="text-[11px] text-aurora-white text-center font-semibold leading-tight px-1">
            {name}
          </span>
        </div>
      </div>
    );
  };

  // All tech tools flattened for marquee display
  const allTechTools = techStackCategories.flatMap(category => category.tools);

  // Tech Stack Marquee Component with infinite scroll
  const TechStackMarquee = () => {
    return (
      <div className="relative w-full flex flex-col gap-3 overflow-hidden rounded-lg">
        {/* First row - scrolls left */}
        <Marquee pauseOnHover className="[--duration:30s] [--gap:0.75rem]">
          {allTechTools.slice(0, Math.ceil(allTechTools.length / 2)).map((tech) => (
            <TechToolCard key={tech.name} name={tech.name} logo={tech.logo} />
          ))}
        </Marquee>
        
        {/* Second row - scrolls right (reverse) */}
        <Marquee pauseOnHover reverse className="[--duration:35s] [--gap:0.75rem]">
          {allTechTools.slice(Math.ceil(allTechTools.length / 2)).map((tech) => (
            <TechToolCard key={tech.name} name={tech.name} logo={tech.logo} />
          ))}
        </Marquee>
        
        {/* Enhanced gradient masks for seamless fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-900 via-gray-900/90 to-transparent z-10"></div>
      </div>
    );
  };

  return (
    <div className="h-full bg-gradient-to-br from-black via-gray-950 to-gray-900 text-aurora-white overflow-hidden flex flex-col">
      {/* Header - Enhanced Contrast */}
      <div className="bg-gradient-to-r from-black/90 via-gray-950/90 to-black/90 backdrop-blur-sm border-b border-aurora-orange/30 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-aurora-orange to-aurora-coral rounded-xl flex items-center justify-center ring-2 ring-aurora-orange/50">
            <img
              src="images/profile/profile_picture.jpg"
              alt="Profile Picture"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-aurora-white">Rakabima Ghaniendra Rusdianto</h1>
            <p className="text-aurora-orange text-sm font-medium">CS @ UI</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Enhanced Contrast */}
      <div className="bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 backdrop-blur-sm border-b border-aurora-orange/20 px-6 py-4">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-aurora-orange to-aurora-coral text-black border border-aurora-orange/50 shadow-lg"
                  : "text-gray-300 hover:bg-gray-800/50 hover:text-aurora-white border border-transparent"
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
                {/* Status Indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/60 border border-aurora-orange/30"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-sm text-gray-300">Available for opportunities</span>
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-serif leading-tight bg-gradient-to-r from-aurora-orange via-aurora-coral to-aurora-white bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] bg-clip-text text-transparent">
                  Engineering with a hacker's mindset.
                </h1>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Building software worth protecting & protecting software worth building.
                </p>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap justify-center gap-6 pt-4"
                >
                  {[
                    { value: "3+", label: "Years Coding" },
                    { value: "15+", label: "Projects Built" },
                    { value: "20+", label: "CTFs Competed" },
                    { value: "Top 15%", label: "PicoCTF Rank" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-center px-4"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-aurora-orange">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap justify-center gap-4 pt-2"
                >
                  <button
                    onClick={() => setActiveTab("projects")}
                    className="px-6 py-3 bg-gradient-to-r from-aurora-orange to-aurora-coral text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-aurora-orange/25 transition-all duration-300 flex items-center gap-2"
                  >
                    <Code className="w-4 h-4" />
                    View Projects
                  </button>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className="px-6 py-3 bg-gray-800 text-aurora-white font-semibold rounded-xl border border-aurora-orange/30 hover:border-aurora-orange/60 hover:bg-gray-700/50 transition-all duration-300 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </button>
                </motion.div>
              </motion.div>

              {/* Skills and Tech Stack - Side by Side */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* My Expertise Card*/}
                <motion.div
                  initial={{ opacity: 0, x: -60, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ 
                    delay: 0.3,
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="bg-gray-900 backdrop-blur-sm rounded-2xl p-1 border border-transparent shadow-2xl"
                >
                  <div className="relative h-full rounded-2xl p-2">
                    <GlowingEffect
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      spread={40}
                    />
                    <div className="relative bg-gray-900 rounded-xl p-8 h-full overflow-hidden">
                      <motion.div 
                        className="flex items-center space-x-3 mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/60 rounded-xl border border-aurora-orange/40">
                          <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
                            fill="currentColor" 
                            viewBox="0 0 256 256" 
                            className="text-aurora-orange"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 200 }}
                          >
                            <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path>
                          </motion.svg>
                          <motion.span 
                            className="text-base font-mono font-medium text-aurora-coral"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.4 }}
                          >
                            My expertise
                          </motion.span>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="relative h-48 overflow-hidden flex items-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9, duration: 0.7 }}
                      >
                        <SkillsCarousel/>
                      </motion.div>

                      <motion.div 
                        className="mt-6 pt-4 border-t border-aurora-orange/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                      >
                        <p className="text-gray-300">
                          Expert in <span className="text-aurora-orange font-semibold">Cybersecurity</span>,{" "}
                          <span className="text-aurora-coral font-semibold">Penetration Testing</span>, and{" "}
                          <span className="text-aurora-white font-semibold">Secure Development</span>.
                          <br />
                          Regularly competing in <span className="text-aurora-orange font-semibold">CTF competitions</span>.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Tech Stack Card*/}
                <motion.div
                  initial={{ opacity: 0, x: 60, rotateY: 15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ 
                    delay: 0.5,
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="bg-gray-900 backdrop-blur-sm rounded-2xl p-1 border border-transparent shadow-2xl"
                >
                  <div className="relative h-full rounded-2xl p-2">
                    <GlowingEffect
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      spread={40}
                    />
                    <div className="relative bg-gray-900 rounded-xl p-8 h-full overflow-hidden">
                      <motion.div 
                        className="flex items-center space-x-3 mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      >
                        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/60 rounded-xl border border-aurora-coral/40">
                          <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
                            fill="currentColor" 
                            viewBox="0 0 256 256" 
                            className="text-aurora-coral"
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 1.0, duration: 0.5, type: "spring", stiffness: 200 }}
                          >
                            <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A112.1,112.1,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.62a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.08,8.08,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8.08,8.08,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z"></path>
                          </motion.svg>
                          <motion.span 
                            className="text-base font-mono font-medium text-aurora-coral"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2, duration: 0.4 }}
                          >
                            My tech stack & tools
                          </motion.span>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="relative h-48 overflow-hidden flex items-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1, duration: 0.7 }}
                      >
                        <TechStackMarquee />
                      </motion.div>

                      <motion.div 
                        className="mt-6 pt-4 border-t border-aurora-coral/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                      >
                        <p className="text-gray-300">
                          Achieving peak <em className="text-aurora-coral">efficiency</em> and{" "}
                          <em className="text-aurora-orange">performance</em> through careful
                          <br />
                          <em className="text-aurora-white">attention to detail</em>, ensuring{" "}
                          <span className="text-aurora-coral font-semibold">perfection</span> in every project.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

            {activeTab === "journey" && (
              <div className="max-w-4xl mx-auto">
                {/* Header with Filter */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-10"
                >
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-aurora-orange via-aurora-coral to-aurora-white bg-clip-text text-transparent">
                    My Professional Journey
                  </h2>
                  <p className="text-gray-400 mb-6">The path that shaped who I am today</p>
                  
                  {/* Journey Type Filter */}
                  <div className="flex justify-center gap-2 flex-wrap">
                    {[
                      { type: "all" as const, label: "All", icon: <Calendar className="w-3.5 h-3.5" /> },
                      { type: "education" as const, label: "Education", icon: <GraduationCap className="w-3.5 h-3.5" /> },
                      { type: "work" as const, label: "Work", icon: <Briefcase className="w-3.5 h-3.5" /> },
                      { type: "milestone" as const, label: "Milestones", icon: <Award className="w-3.5 h-3.5" /> },
                    ].map((filter) => (
                      <button
                        key={filter.type}
                        onClick={() => setJourneyFilter(filter.type)}
                        className={`group flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                          journeyFilter === filter.type
                            ? "bg-gradient-to-r from-aurora-orange to-aurora-coral text-black border-aurora-orange/50 shadow-lg shadow-aurora-orange/20"
                            : "bg-gray-800/60 text-gray-300 border-gray-700 hover:border-aurora-orange/50 hover:text-aurora-orange hover:bg-gray-800"
                        }`}
                      >
                        {filter.icon}
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                  {/* Vertical Timeline Line */}
                  <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-aurora-orange via-aurora-coral to-aurora-orange/20"></div>

                  <AnimatePresence mode="popLayout">
                  <div className="space-y-8">
                    {journey
                      .filter(item => journeyFilter === "all" || item.type === journeyFilter)
                      .map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ delay: index * 0.15, duration: 0.4 }}
                        layout
                        className="relative pl-16 md:pl-20"
                      >
                        {/* Timeline Node */}
                        <motion.div 
                          className="absolute left-4 md:left-6 top-6 z-10"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.2, type: "spring", stiffness: 200 }}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 shadow-lg ${
                            item.type === "education" 
                              ? "bg-aurora-coral border-aurora-coral/60" 
                              : item.type === "work" 
                              ? "bg-aurora-orange border-aurora-orange/60" 
                              : "bg-amber-500 border-amber-400"
                          }`}>
                            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current"></div>
                          </div>
                        </motion.div>

                        {/* Year Badge */}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 + 0.1 }}
                          className="mb-2"
                        >
                          <span className="text-xs font-mono text-gray-500">{item.period}</span>
                        </motion.div>

                        {/* Card */}
                        <motion.div
                          whileHover={{ scale: 1.01, x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="group bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-black/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-aurora-orange/40 shadow-xl hover:shadow-aurora-orange/10 transition-all duration-300"
                        >
                          {/* Organization Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                                item.type === "education"
                                  ? "bg-aurora-coral/10 border-aurora-coral/30 text-aurora-coral group-hover:bg-aurora-coral/20 group-hover:border-aurora-coral/50"
                                  : item.type === "work"
                                  ? "bg-aurora-orange/10 border-aurora-orange/30 text-aurora-orange group-hover:bg-aurora-orange/20 group-hover:border-aurora-orange/50"
                                  : "bg-amber-500/10 border-amber-500/30 text-amber-400 group-hover:bg-amber-500/20 group-hover:border-amber-500/50"
                              }`}>
                                {getJourneyIcon(item.type)}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-aurora-white group-hover:text-aurora-orange transition-colors duration-300">
                                  {item.organization}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                    item.type === "education"
                                      ? "bg-aurora-coral/20 text-aurora-coral"
                                      : item.type === "work"
                                      ? "bg-aurora-orange/20 text-aurora-orange"
                                      : "bg-amber-500/20 text-amber-400"
                                  }`}>
                                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-aurora-orange group-hover:translate-x-1 transition-all duration-300" />
                          </div>

                          {/* Positions */}
                          <div className="space-y-3 mt-4">
                            {item.positions.map((position, posIndex) => (
                              <motion.div
                                key={posIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 + posIndex * 0.1 + 0.3 }}
                                className="group/pos relative bg-gray-800/40 hover:bg-gray-800/70 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-pointer"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-aurora-white group-hover/pos:text-aurora-coral transition-colors">
                                    {position.title}
                                  </h4>
                                  <span className="text-xs text-gray-400 bg-gray-900/60 px-2.5 py-1 rounded-full border border-gray-700">
                                    {position.timeline}
                                  </span>
                                </div>
                                <p className="text-gray-400 text-sm mb-3">{position.description}</p>
                                
                                {/* Achievements with hover reveal */}
                                <div className="space-y-1.5">
                                  {position.achievements.map((achievement, achIndex) => (
                                    <motion.div 
                                      key={achIndex} 
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.2 + posIndex * 0.1 + achIndex * 0.05 + 0.4 }}
                                      className="flex items-center gap-2 text-sm text-gray-300 group-hover/pos:text-gray-200 transition-colors"
                                    >
                                      <div className="w-1.5 h-1.5 bg-aurora-coral rounded-full shrink-0"></div>
                                      <span>{achievement}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                  </AnimatePresence>

                  {/* Timeline End Marker */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: journey.length * 0.2 + 0.3 }}
                    className="absolute left-4 md:left-6 bottom-0 translate-y-4"
                  >
                    <div className="w-4 h-4 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                    </div>
                  </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: journey.length * 0.2 + 0.5 }}
                  className="mt-12 text-center"
                >
                  <p className="text-gray-400 mb-4">Want to be part of my journey?</p>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-aurora-orange to-aurora-coral text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-aurora-orange/25 transition-all duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    Let's Connect
                  </button>
                </motion.div>
              </div>
            )}

            {activeTab === "projects" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 rounded-3xl p-12 text-aurora-white shadow-2xl border border-aurora-orange/40">
                  <Code className="w-20 h-20 mx-auto mb-6 text-aurora-orange" />
                  <h2 className="text-3xl font-bold mb-4">Explore My Projects</h2>
                  <p className="text-lg text-gray-300 mb-8">
                    Discover the innovative solutions I've built, from cybersecurity tools to full-stack applications.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-aurora-orange to-aurora-coral text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 mx-auto border border-aurora-orange/50"
                  >
                    <span>View Projects</span>
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === "awards" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 rounded-3xl p-12 text-aurora-white shadow-2xl border border-aurora-coral/40">
                  <Trophy className="w-20 h-20 mx-auto mb-6 text-aurora-orange" />
                  <h2 className="text-3xl font-bold mb-4">Awards & Achievements</h2>
                  <p className="text-lg text-gray-300 mb-8">
                    Explore my awards, certifications, and recognitions from competitions, academics, and professional development.
                  </p>
                  <motion.button
                    onClick={() => onOpenApp?.("awards")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-aurora-orange to-aurora-coral text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 mx-auto border border-aurora-orange/50"
                  >
                    <span>View Awards</span>
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
                <div className="bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 rounded-3xl p-12 text-aurora-white shadow-2xl border border-aurora-coral/40">
                  <FileText className="w-20 h-20 mx-auto mb-6 text-aurora-orange" />
                  <h2 className="text-3xl font-bold mb-4">Download My Resume</h2>
                  <p className="text-lg text-gray-300 mb-8">
                    Get a comprehensive overview of my experience, skills, and achievements in a professional format.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      onClick={() => onOpenApp?.("resume")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-aurora-orange to-aurora-coral text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 justify-center border border-aurora-orange/50"
                    >
                      <span>View Resume</span>
                      <ExternalLink className="w-5 h-5" />
                    </motion.button>
                    <motion.a
                      href="/documents/CV.pdf"
                      download="Rakabima_CV.pdf"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-800 text-aurora-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 justify-center border border-aurora-orange/30 hover:border-aurora-orange/60"
                    >
                      <FileText className="w-5 h-5" />
                      <span>Download PDF</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "contact" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 rounded-3xl p-12 text-aurora-white shadow-2xl border border-aurora-orange/40">
                  <Mail className="w-20 h-20 mx-auto mb-6 text-aurora-orange" />
                  <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
                  <p className="text-lg text-gray-300 mb-8">
                    Ready to discuss opportunities, collaborations, or just chat about technology and cybersecurity.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-aurora-orange to-aurora-coral text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 mx-auto border border-aurora-orange/50"
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