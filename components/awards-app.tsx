"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Trophy, 
  Medal, 
  Award, 
  Star, 
  MapPin, 
  Building2, 
  Gift, 
  ExternalLink, 
  X, 
  Calendar,
  Sparkles,
  Crown,
  Target
} from 'lucide-react'

interface AwardItem {
  id: string
  name: string
  organizer: string
  description: string
  place: string
  prize?: string
  location: string
  date: string
  articleUrl?: string
  credentialUrl?: string // For certification verification
  image?: string // Placeholder for award/cert image
  category: 'competition' | 'certification' | 'bugbounty'
  featured?: boolean
  role?: string
  keyAchievement?: string
}

const awards: AwardItem[] = [
  // ============ COMPETITIONS ============
  {
    id: '1',
    name: 'Bug Bounty Competition 2025',
    organizer: 'Pusdatin, Kemendikdasmen (Indonesia Ministry of Education)',
    description: 'Secured the championship title by identifying and responsibly reporting five critical web application vulnerabilities categorized under the OWASP Top 10.',
    place: '1st Place',
    prize: 'Champion Title & Recognition',
    location: 'Indonesia',
    date: '2025',
    category: 'competition',
    featured: true,
    role: 'Security Researcher / Bug Hunter',
    keyAchievement: 'Demonstrated technical expertise and strong communication skills through a rigorous two-phase process: a month-long intensive bug-hunting period followed by a final technical presentation to a panel of judges.',
    image: '/images/awards/bugbounty-2025.png' // TODO: Replace with actual image
  },
  {
    id: '2',
    name: 'BPJS Healthkathon: Security Competition',
    organizer: 'BPJS Kesehatan (Indonesia Public Healthcare)',
    description: 'Achieved runner-up status in a comprehensive healthcare security hackathon involving three distinct phases: Capture The Flag (CTF), live Penetration Testing, and Executive Reporting.',
    place: '2nd Place',
    prize: 'Runner-up Award',
    location: 'Indonesia',
    date: '2025',
    category: 'competition',
    featured: true,
    role: 'Team Member (Team of 3)',
    keyAchievement: 'Successfully executed an end-to-end security assessment, transitioning from solving rapid-fire CTF challenges to performing deep-dive penetration testing on infrastructure, culminating in a professional report presentation.',
    image: '/images/awards/bpjs-healthkathon.png' // TODO: Replace with actual image
  },
  {
    id: '3',
    name: 'University CTF 2025',
    organizer: 'Hack The Box',
    description: 'Competed against top university teams from around the globe, achieving a Top 5 international ranking.',
    place: '4th Place Worldwide',
    prize: 'International Recognition',
    location: 'Online (Global)',
    date: '2025',
    category: 'competition',
    featured: true,
    role: 'Team Member (RISTEK NetSOS Fasilkom UI)',
    keyAchievement: 'Collaborated with the RISTEK NetSOS team to solve complex cybersecurity challenges, demonstrating advanced problem-solving capabilities in a high-pressure, competitive global environment.',
    image: '/images/awards/htb-uni-ctf.png' // TODO: Replace with actual image
  },
  // ============ CERTIFICATIONS ============
  {
    id: '4',
    name: 'eJPT (eLearnSecurity Junior Penetration Tester)',
    organizer: 'INE',
    description: 'Validates practical, hands-on penetration testing skills, including assessment methodologies, host-based attacks, and network security auditing.',
    place: 'Certified',
    location: 'Online',
    date: '2025',
    category: 'certification',
    credentialUrl: 'https://certs.ine.com/', // TODO: Replace with actual credential URL
    image: '/images/certs/ejpt.png' // TODO: Replace with actual image
  },
  {
    id: '5',
    name: 'Saviynt Certified IGA Professional',
    organizer: 'Saviynt',
    description: 'Demonstrates specialized expertise in Identity Governance and Administration (IGA), focusing on identity lifecycle management and access governance.',
    place: 'Certified',
    location: 'Online',
    date: '2025',
    category: 'certification',
    credentialUrl: 'https://saviynt.com/', // TODO: Replace with actual credential URL
    image: '/images/certs/saviynt.png' // TODO: Replace with actual image
  },
  {
    id: '6',
    name: 'Forescout Accredited Engineer',
    organizer: 'Forescout',
    description: 'Certifies technical proficiency in Network Access Control (NAC), device visibility, and automated security control implementation.',
    place: 'Certified',
    location: 'Online',
    date: '2025',
    category: 'certification',
    credentialUrl: 'https://forescout.com/', // TODO: Replace with actual credential URL
    image: '/images/certs/forescout.png' // TODO: Replace with actual image
  },
  {
    id: '7',
    name: 'ICCA (INE Certified Cybersecurity Associate)',
    organizer: 'INE',
    description: 'Validates foundational knowledge in cybersecurity concepts, network defense, and protocol analysis.',
    place: 'Certified',
    location: 'Online',
    date: '2025',
    category: 'certification',
    credentialUrl: 'https://certs.ine.com/', // TODO: Replace with actual credential URL
    image: '/images/certs/icca.png' // TODO: Replace with actual image
  }
]

const categories = [
  { id: 'all', name: 'All', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'competition', name: 'Competitions', icon: <Trophy className="w-4 h-4" /> },
  { id: 'certification', name: 'Certifications', icon: <Award className="w-4 h-4" /> },
  { id: 'bugbounty', name: 'Bug Bounty', icon: <Target className="w-4 h-4" /> }
]

export default function AwardsApp() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null)

  const filteredAwards = selectedCategory === 'all'
    ? awards
    : awards.filter(award => award.category === selectedCategory)

  const featuredAwards = filteredAwards.filter(award => award.featured)
  const regularAwards = filteredAwards.filter(award => !award.featured)

  const getCategoryConfig = (category: AwardItem['category']) => {
    switch (category) {
      case 'competition':
        return { 
          icon: <Trophy className="w-4 h-4" />,
          color: 'text-aurora-orange',
          bg: 'bg-aurora-orange/10 border-aurora-orange/30'
        }
      case 'certification':
        return { 
          icon: <Award className="w-4 h-4" />,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10 border-emerald-500/30'
        }
      case 'bugbounty':
        return { 
          icon: <Target className="w-4 h-4" />,
          color: 'text-aurora-coral',
          bg: 'bg-aurora-coral/10 border-aurora-coral/30'
        }
      default:
        return { 
          icon: <Award className="w-4 h-4" />,
          color: 'text-gray-400',
          bg: 'bg-gray-500/10 border-gray-500/30'
        }
    }
  }

  const getPlaceIcon = (place: string, category?: AwardItem['category']) => {
    const lowerPlace = place.toLowerCase()
    if (category === 'certification') {
      return <Award className="w-5 h-5 text-emerald-400" />
    }
    if (lowerPlace.includes('1st') || lowerPlace.includes('first') || lowerPlace.includes('best')) {
      return <Crown className="w-5 h-5 text-yellow-400" />
    }
    if (lowerPlace.includes('2nd') || lowerPlace.includes('second')) {
      return <Medal className="w-5 h-5 text-gray-300" />
    }
    if (lowerPlace.includes('3rd') || lowerPlace.includes('third')) {
      return <Medal className="w-5 h-5 text-amber-600" />
    }
    if (lowerPlace.includes('4th') || lowerPlace.includes('fourth') || lowerPlace.includes('top')) {
      return <Target className="w-5 h-5 text-aurora-orange" />
    }
    return <Trophy className="w-5 h-5 text-aurora-coral" />
  }

  const AwardCard = ({ award, isFeatured = false }: { award: AwardItem; isFeatured?: boolean }) => {
    const categoryConfig = getCategoryConfig(award.category)
    const isCertification = award.category === 'certification'

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className={`group relative bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black/95 rounded-2xl overflow-hidden border border-gray-800 hover:border-aurora-orange/50 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-aurora-orange/10 ${isFeatured ? 'ring-1 ring-aurora-orange/20' : ''}`}
        onClick={() => setSelectedAward(award)}
      >
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-aurora-orange to-aurora-coral rounded-full">
            <Star className="w-3 h-3 text-black fill-current" />
            <span className="text-xs font-bold text-black">Featured</span>
          </div>
        )}

        {/* Award/Cert Image */}
        {award.image && (
          <div className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
            <img 
              src={award.image} 
              alt={award.name}
              className="w-full h-full object-contain p-4 opacity-90 group-hover:opacity-100 transition-opacity"
              onError={(e) => {
                // Hide image on error, show placeholder
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-xl border ${categoryConfig.bg}`}>
              <div className={categoryConfig.color}>
                {getPlaceIcon(award.place, award.category)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-aurora-white group-hover:text-aurora-orange transition-colors">
                {award.name}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{award.organizer}</span>
              </div>
            </div>
          </div>

          {/* Role (if exists) */}
          {award.role && (
            <div className="mb-3">
              <span className="text-xs text-gray-500">Role: </span>
              <span className="text-sm text-gray-300">{award.role}</span>
            </div>
          )}

          {/* Place Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm border ${
              isCertification 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-aurora-orange/10 text-aurora-orange border-aurora-orange/20'
            }`}>
              {getPlaceIcon(award.place, award.category)}
              {award.place}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
            {award.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{award.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{award.date}</span>
            </div>
          </div>

          {/* Prize (if exists) - for competitions */}
          {award.prize && !isCertification && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2 text-sm">
                <Gift className="w-4 h-4 text-aurora-coral" />
                <span className="text-gray-300">{award.prize}</span>
              </div>
            </div>
          )}

          {/* Verify Credential Button - for certifications */}
          {isCertification && award.credentialUrl && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(award.credentialUrl, '_blank')
                }}
                className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Verify Credential</span>
              </button>
            </div>
          )}

          {/* Category Badge */}
          <div className="mt-4 flex justify-end">
            <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${categoryConfig.bg} ${categoryConfig.color}`}>
              {categoryConfig.icon}
              <span className="capitalize">{award.category}</span>
            </span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="h-full bg-gradient-to-br from-black via-gray-950 to-gray-900 text-aurora-white overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' as const }}>
      <div className="p-4 sm:p-6 md:p-8 pb-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-aurora-orange/10 rounded-xl border border-aurora-orange/30">
              <Trophy className="w-6 h-6 text-aurora-orange" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-aurora-orange via-aurora-coral to-aurora-white bg-clip-text text-transparent">
              Awards & Achievements
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Recognition from competitions, certifications, and bug bounty programs
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { value: awards.length, label: 'Total', icon: <Trophy className="w-5 h-5" /> },
            { value: awards.filter(a => a.category === 'competition').length, label: 'Competitions', icon: <Target className="w-5 h-5" /> },
            { value: awards.filter(a => a.category === 'certification').length, label: 'Certifications', icon: <Award className="w-5 h-5" /> },
            { value: awards.filter(a => a.category === 'bugbounty').length, label: 'Bug Bounty', icon: <Star className="w-5 h-5" /> },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              className="bg-gray-900/80 rounded-xl p-4 border border-gray-800 hover:border-aurora-orange/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-aurora-orange/10 rounded-lg text-aurora-orange">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-aurora-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
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
            Showing <span className="text-aurora-orange font-semibold">{filteredAwards.length}</span> award{filteredAwards.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Featured Awards */}
        {featuredAwards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-5">
              <Star className="w-5 h-5 text-aurora-orange" />
              <h2 className="text-xl font-bold text-aurora-white">Featured Achievements</h2>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {featuredAwards.map((award) => (
                  <AwardCard key={award.id} award={award} isFeatured />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* All Awards */}
        {regularAwards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {featuredAwards.length > 0 && (
              <div className="flex items-center gap-2 mb-5">
                <Trophy className="w-5 h-5 text-aurora-coral" />
                <h2 className="text-xl font-bold text-aurora-white">More Awards</h2>
              </div>
            )}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {regularAwards.map((award) => (
                  <AwardCard key={award.id} award={award} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>

      {/* Award Detail Modal */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAward(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-aurora-orange/30 shadow-2xl shadow-black/50"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative p-6 border-b border-gray-800">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedAward(null)}
                  className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors border border-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-start gap-4 pr-12">
                  <div className={`p-4 rounded-xl border ${getCategoryConfig(selectedAward.category).bg}`}>
                    <div className={getCategoryConfig(selectedAward.category).color}>
                      {getPlaceIcon(selectedAward.place, selectedAward.category)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {selectedAward.featured && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-aurora-orange to-aurora-coral rounded-full text-xs font-bold text-black">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </span>
                      )}
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryConfig(selectedAward.category).bg} ${getCategoryConfig(selectedAward.category).color}`}>
                        {getCategoryConfig(selectedAward.category).icon}
                        <span className="capitalize">{selectedAward.category}</span>
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-aurora-white">{selectedAward.name}</h2>
                    <p className="text-gray-400 flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4" />
                      {selectedAward.organizer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Award/Cert Image */}
                {selectedAward.image && (
                  <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                    <img 
                      src={selectedAward.image} 
                      alt={selectedAward.name}
                      className="w-full h-48 object-contain p-4"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                )}

                {/* Place Badge */}
                <div className="mb-6">
                  <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl border ${
                    selectedAward.category === 'certification'
                      ? 'bg-emerald-500/10 border-emerald-500/20'
                      : 'bg-aurora-orange/10 border-aurora-orange/20'
                  }`}>
                    {getPlaceIcon(selectedAward.place, selectedAward.category)}
                    <div>
                      <div className="text-sm text-gray-400">Achievement</div>
                      <div className={`text-lg font-bold ${
                        selectedAward.category === 'certification' ? 'text-emerald-400' : 'text-aurora-orange'
                      }`}>{selectedAward.place}</div>
                    </div>
                  </div>
                </div>

                {/* Role (if exists) */}
                {selectedAward.role && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-aurora-orange mb-2">Role</h3>
                    <p className="text-gray-300">{selectedAward.role}</p>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold text-aurora-orange mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedAward.description}</p>
                </div>

                {/* Key Achievement (if exists) */}
                {selectedAward.keyAchievement && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-aurora-orange mb-2">Key Achievement</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedAward.keyAchievement}</p>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <MapPin className="w-4 h-4" />
                      Location
                    </div>
                    <div className="text-aurora-white font-medium">{selectedAward.location}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      Date
                    </div>
                    <div className="text-aurora-white font-medium">{selectedAward.date}</div>
                  </div>
                  {selectedAward.prize && selectedAward.category !== 'certification' && (
                    <div className="col-span-2 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <Gift className="w-4 h-4" />
                        Prize / Reward
                      </div>
                      <div className="text-aurora-coral font-medium">{selectedAward.prize}</div>
                    </div>
                  )}
                </div>

                {/* Credential Verification Button - for certifications */}
                {selectedAward.category === 'certification' && selectedAward.credentialUrl && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(selectedAward.credentialUrl, '_blank')}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all mb-4"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Verify Credential
                  </motion.button>
                )}

                {/* Article Link */}
                {selectedAward.articleUrl && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(selectedAward.articleUrl, '_blank')}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-aurora-orange to-aurora-coral text-black font-bold rounded-xl hover:shadow-lg hover:shadow-aurora-orange/25 transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Article / Learn More
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
