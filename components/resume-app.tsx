"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, ZoomIn, ZoomOut, RotateCw, Maximize2, FileText, ExternalLink } from 'lucide-react'
import { useNotifications, NotificationTemplates } from "@/contexts/notification-context"

// PDF file path - place your CV.pdf in public/documents/
const PDF_PATH = "/documents/CV.pdf"

export default function ResumeApp() {
  const [scale, setScale] = useState(100)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const { addNotification } = useNotifications()

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = PDF_PATH
    link.download = 'Rakabima_Ghaniendra_CV.pdf'
    link.click()
    addNotification(NotificationTemplates.resumeDownloaded())
  }

  const handleOpenInNewTab = () => {
    window.open(PDF_PATH, '_blank')
  }

  const zoomIn = () => setScale(prev => Math.min(prev + 25, 200))
  const zoomOut = () => setScale(prev => Math.max(prev - 25, 50))
  const resetZoom = () => setScale(100)

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 bg-gray-900/80 border-b border-aurora-orange/20 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-aurora-orange" />
          <span className="text-aurora-white font-medium text-xs sm:text-base truncate">CV</span>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Zoom Controls - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1 bg-gray-800 rounded-lg px-2 py-1 border border-gray-700">
            <button
              onClick={zoomOut}
              className="p-1.5 text-gray-400 hover:text-aurora-orange transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-300 min-w-[3rem] text-center">{scale}%</span>
            <button
              onClick={zoomIn}
              className="p-1.5 text-gray-400 hover:text-aurora-orange transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={resetZoom}
              className="p-1.5 text-gray-400 hover:text-aurora-orange transition-colors"
              title="Reset Zoom"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Open in New Tab */}
          <button
            onClick={handleOpenInNewTab}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-aurora-white rounded-lg border border-gray-700 transition-colors"
            title="Open in New Tab"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="text-xs sm:text-sm hidden sm:inline">Fullscreen</span>
          </button>

          {/* Download Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 bg-gradient-to-r from-aurora-orange to-aurora-coral text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-aurora-orange/25 transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Download</span>
          </motion.button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto overscroll-contain p-2 sm:p-4 flex items-start justify-center min-h-0" style={{ WebkitOverflowScrolling: 'touch' as const }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-lg shadow-2xl shadow-black/50 overflow-hidden w-full sm:w-auto"
          style={{
            maxWidth: `${Math.min(800 * (scale / 100), 1200)}px`,
            minHeight: '400px',
          }}
        >
          {/* Loading State */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
              <div className="w-12 h-12 border-4 border-aurora-orange/30 border-t-aurora-orange rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading PDF...</p>
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-8">
              <FileText className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">PDF Not Found</h3>
              <p className="text-gray-500 text-center mb-6">
                Please place your CV.pdf file in the<br />
                <code className="bg-gray-200 px-2 py-1 rounded text-sm">public/documents/</code> folder
              </p>
              <button
                onClick={() => {
                  setHasError(false)
                  setIsLoading(true)
                }}
                className="px-4 py-2 bg-aurora-orange text-white rounded-lg hover:bg-aurora-coral transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* PDF Embed */}
          <iframe
            src={`${PDF_PATH}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full border-0"
            style={{
              height: `${Math.max(500, 700 * (scale / 100))}px`,
              display: hasError ? 'none' : 'block',
            }}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
            title="Resume PDF Viewer"
          />
        </motion.div>
      </div>

      {/* Footer with download prompt */}
      <div className="px-2 sm:px-4 py-2 sm:py-3 bg-gray-900/80 border-t border-aurora-orange/20 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
          <span>Want a copy?</span>
          <button
            onClick={handleDownload}
            className="text-aurora-orange hover:text-aurora-coral transition-colors underline"
          >
            Download my CV
          </button>
        </div>
      </div>
    </div>
  )
}
