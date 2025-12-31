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
  category: 'competition' | 'academic' | 'certification' | 'recognition'
  featured?: boolean
}

const awards: AwardItem[] = [
  {
    id: '1',
    name: 'PicoCTF 2024',
    organizer: 'Carnegie Mellon University',
    description: 'Achieved top 15% placement in the world\'s largest cybersecurity competition for students, demonstrating strong skills in cryptography, forensics, web exploitation, and reverse engineering.',
    place: 'Top 15% Global',
    prize: 'Certificate of Achievement',
    location: 'Online (Global)',
    date: 'March 2024',
    articleUrl: 'https://picoctf.org',
    category: 'competition',
    featured: true
  },
  {
    id: '2',
    name: 'Dean\'s List Award',
    organizer: 'Universitas Indonesia',
    description: 'Recognized for outstanding academic performance with a GPA in the top percentile of the Computer Science program for three consecutive semesters.',
    place: 'Academic Excellence',
    prize: 'Academic Recognition',
    location: 'Depok, Indonesia',
    date: '2022 - 2024',
    category: 'academic',
    featured: true
  },
  {
    id: '3',
    name: 'Hackathon UI 2023',
    organizer: 'CSUI',
    description: 'Developed an innovative security solution for IoT devices, implementing real-time threat detection and automated response mechanisms.',
    place: '2nd Place',
    prize: 'IDR 5,000,000',
    location: 'Jakarta, Indonesia',
    date: 'October 2023',
    category: 'competition',
    featured: true
  },
  {
    id: '4',
    name: 'Best Security Project',
    organizer: 'Software Engineering Course - UI',
    description: 'Awarded for developing the most comprehensive security implementation in the semester project, featuring secure authentication, encryption, and vulnerability scanning.',
    place: 'Best Project',
    prize: 'A+ Grade & Recognition',
    location: 'Universitas Indonesia',
    date: 'December 2023',
    category: 'academic'
  },
  {
    id: '5',
    name: 'CTF National Competition',
    organizer: 'Cyber Security Indonesia',
    description: 'Competed against top university teams nationwide in various cybersecurity challenges including binary exploitation, cryptography, and network security.',
    place: '5th Place',
    prize: 'Certificate & Swag',
    location: 'Bandung, Indonesia',
    date: 'August 2023',
    category: 'competition'
  },
  {
    id: '6',
    name: 'Cybersecurity Club Leadership',
    organizer: 'CSUI Student Organization',
    description: 'Elected as Vice President of the Cybersecurity Club, organizing workshops, CTF practice sessions, and guest speaker events for 200+ members.',
    place: 'Vice President',
    prize: 'Leadership Role',
    location: 'Universitas Indonesia',
    date: '2023 - Present',
    category: 'recognition'
  }
]

const categories = [
  { id: 'all', name: 'All Awards', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'competition', name: 'Competitions', icon: <Trophy className="w-4 h-4" /> },
  { id: 'academic', name: 'Academic', icon: <Medal className="w-4 h-4" /> },
  { id: 'certification', name: 'Certifications', icon: <Award className="w-4 h-4" /> },
  { id: 'recognition', name: 'Recognition', icon: <Star className="w-4 h-4" /> }
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
      case 'academic':
        return { 
          icon: <Medal className="w-4 h-4" />,
          color: 'text-aurora-coral',
          bg: 'bg-aurora-coral/10 border-aurora-coral/30'
        }
      case 'certification':
        return { 
          icon: <Award className="w-4 h-4" />,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10 border-emerald-500/30'
        }
      case 'recognition':
        return { 
          icon: <Star className="w-4 h-4" />,
          color: 'text-amber-400',
          bg: 'bg-amber-500/10 border-amber-500/30'
        }
      default:
        return { 
          icon: <Award className="w-4 h-4" />,
          color: 'text-gray-400',
          bg: 'bg-gray-500/10 border-gray-500/30'
        }
    }
  }

  const getPlaceIcon = (place: string) => {
    const lowerPlace = place.toLowerCase()
    if (lowerPlace.includes('1st') || lowerPlace.includes('first') || lowerPlace.includes('best')) {
      return <Crown className="w-5 h-5 text-yellow-400" />
    }
    if (lowerPlace.includes('2nd') || lowerPlace.includes('second')) {
      return <Medal className="w-5 h-5 text-gray-300" />
    }
    if (lowerPlace.includes('3rd') || lowerPlace.includes('third')) {
      return <Medal className="w-5 h-5 text-amber-600" />
    }
    if (lowerPlace.includes('top')) {
      return <Target className="w-5 h-5 text-aurora-orange" />
    }
    return <Trophy className="w-5 h-5 text-aurora-coral" />
  }

  const AwardCard = ({ award, isFeatured = false }: { award: AwardItem; isFeatured?: boolean }) => {
    const categoryConfig = getCategoryConfig(award.category)

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

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-xl border ${categoryConfig.bg}`}>
              <div className={categoryConfig.color}>
                {getPlaceIcon(award.place)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-aurora-white group-hover:text-aurora-orange transition-colors line-clamp-1">
                {award.name}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{award.organizer}</span>
              </div>
            </div>
          </div>

          {/* Place Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-aurora-orange/10 text-aurora-orange rounded-lg border border-aurora-orange/20 font-semibold text-sm">
              {getPlaceIcon(award.place)}
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

          {/* Prize (if exists) */}
          {award.prize && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2 text-sm">
                <Gift className="w-4 h-4 text-aurora-coral" />
                <span className="text-gray-300">{award.prize}</span>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute bottom-6 right-6">
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
            Recognition for excellence in competitions, academics, and leadership
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
            { value: awards.length, label: 'Total Awards', icon: <Trophy className="w-5 h-5" /> },
            { value: awards.filter(a => a.category === 'competition').length, label: 'Competitions', icon: <Target className="w-5 h-5" /> },
            { value: awards.filter(a => a.category === 'academic').length, label: 'Academic', icon: <Medal className="w-5 h-5" /> },
            { value: featuredAwards.length, label: 'Featured', icon: <Star className="w-5 h-5" /> },
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
                      {getPlaceIcon(selectedAward.place)}
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
                {/* Place Badge */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 px-4 py-3 bg-aurora-orange/10 rounded-xl border border-aurora-orange/20">
                    {getPlaceIcon(selectedAward.place)}
                    <div>
                      <div className="text-sm text-gray-400">Achievement</div>
                      <div className="text-lg font-bold text-aurora-orange">{selectedAward.place}</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold text-aurora-orange mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedAward.description}</p>
                </div>

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
                  {selectedAward.prize && (
                    <div className="col-span-2 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <Gift className="w-4 h-4" />
                        Prize / Reward
                      </div>
                      <div className="text-aurora-coral font-medium">{selectedAward.prize}</div>
                    </div>
                  )}
                </div>

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
