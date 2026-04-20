"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HorizontalArrowScrollerProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  ariaLabel: string
  scrollStep?: number
}

export default function HorizontalArrowScroller({
  children,
  className = "",
  contentClassName = "",
  ariaLabel,
  scrollStep,
}: HorizontalArrowScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth
    setCanScrollLeft(scroller.scrollLeft > 2)
    setCanScrollRight(scroller.scrollLeft < maxScrollLeft - 2)
  }, [])

  const scrollByDirection = useCallback((direction: "left" | "right") => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const amount = scrollStep ?? Math.max(scroller.clientWidth * 0.72, 160)
    scroller.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }, [scrollStep])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    updateScrollState()
    scroller.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)

    const observer = new MutationObserver(updateScrollState)
    observer.observe(scroller, {
      childList: true,
      subtree: true,
      attributes: true,
    })

    return () => {
      scroller.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
      observer.disconnect()
    }
  }, [updateScrollState])

  return (
    <div className={`relative min-w-0 ${className}`}>
      <div
        ref={scrollerRef}
        role="group"
        aria-label={ariaLabel}
        className={`overflow-x-auto scrollbar-none mobile-scrollbar-hidden ${contentClassName}`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </div>

      <button
        type="button"
        aria-label={`Scroll ${ariaLabel} left`}
        onClick={() => scrollByDirection("left")}
        className={`md:hidden absolute left-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md border border-aurora-orange/30 bg-black/80 text-aurora-orange shadow-lg backdrop-blur transition-all ${
          canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        type="button"
        aria-label={`Scroll ${ariaLabel} right`}
        onClick={() => scrollByDirection("right")}
        className={`md:hidden absolute right-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md border border-aurora-orange/30 bg-black/80 text-aurora-orange shadow-lg backdrop-blur transition-all ${
          canScrollRight ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
