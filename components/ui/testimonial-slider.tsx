'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  quote: string
  name: string
  year: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'I love each session because it is highly interactive and allows us to give answers which Dr Waleed gives feedback on which is very helpful',
    name: 'Arooj',
    year: 'Year 13 Student',
  },
  {
    id: 2,
    quote: 'The lessons were interactive with well explained concepts, easy to follow and very informative. We got good points to research and the feedback on ourselves was great, even the best students had something to improve on',
    name: 'Jay',
    year: 'Year 12 Student',
  },
  {
    id: 3,
    quote: 'I really liked the wide range of examples used and discussed throughout the session. This made the session very interactive because there was more active learning',
    name: 'Catherine',
    year: 'Year 13 Student',
  },
  {
    id: 4,
    quote: 'All the information provided was clear and understandable. It was really helpful and improved my confidence!',
    name: 'Biju',
    year: 'Gap Year Student',
  },
  {
    id: 5,
    quote: 'I appreciated the chance to give my own answer and received really valuable feedback! The topics were really hard to approach while researching alone so seeing it broken down into manageable points was useful to apply it even better',
    name: 'Delicia',
    year: 'Year 13 Student',
  },
  {
    id: 6,
    quote: 'There was a constant link/explanation as to how we can use this information ourselves, great examples and feedback given',
    name: 'Reanna',
    year: 'Year 12 Student',
  },
]

// Slides are looped seamlessly by rendering several copies of the testimonials
// back to back and silently snapping the index back into the middle copy once
// it drifts into a neighbouring copy, so the carousel can scroll forever in
// either direction without ever hitting a visible end.
const LOOP_COPIES = 3
const total = testimonials.length
const extendedTestimonials = Array.from({ length: LOOP_COPIES }, (_, copy) =>
  testimonials.map((t) => ({ ...t, key: `${t.id}-${copy}` }))
).flat()

const getVisibleCount = (width: number): number => {
  if (width >= 1280) return 3
  if (width >= 768) return 2
  return 1
}

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(total)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isJumping, setIsJumping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const autoPlayId = setInterval(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 4000)

    return () => clearInterval(autoPlayId)
  }, [isAutoPlaying])

  // After the slide animation settles just outside the middle copy, snap back
  // into the middle copy without animating. The copies are identical, so the
  // jump is invisible and the loop feels endless.
  const handleSlideAnimationComplete = () => {
    if (currentIndex >= total * 2) {
      setIsJumping(true)
      setCurrentIndex((prev) => prev - total)
    } else if (currentIndex < total) {
      setIsJumping(true)
      setCurrentIndex((prev) => prev + total)
    }
  }

  useEffect(() => {
    if (!isJumping) return
    const id = requestAnimationFrame(() => setIsJumping(false))
    return () => cancelAnimationFrame(id)
  }, [isJumping])

  const visibleCount = getVisibleCount(windowWidth)

  const goNext = () => {
    setCurrentIndex((prev) => prev + 1)
    pauseAutoPlay()
  }

  const goPrev = () => {
    setCurrentIndex((prev) => prev - 1)
    pauseAutoPlay()
  }

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const handleDragEnd = (event: any, info: any) => {
    const { offset } = info
    const swipeThreshold = 30

    if (offset.x < -swipeThreshold) {
      goNext()
    } else if (offset.x > swipeThreshold) {
      goPrev()
    }
  }

  return (
    <div className="px-4 py-8 sm:py-16 bg-gradient-to-b from-brand-light-gray to-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-brand-purple font-medium text-xs sm:text-sm uppercase tracking-wider">
            Success Stories
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-purple to-brand-purple/70 bg-clip-text text-transparent mt-3 sm:mt-4 px-4">
            Hear From Our Students
          </h3>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-gold mx-auto mt-4 sm:mt-6"></div>
        </motion.div>

        <div className="relative" ref={containerRef}>
          <div className="flex justify-center sm:justify-end sm:absolute sm:-top-16 right-0 space-x-2 mb-4 sm:mb-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goPrev}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 text-brand-purple transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goNext}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 text-brand-purple transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          <div className="overflow-hidden relative px-2 sm:px-0">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={isJumping ? { duration: 0 } : { type: 'spring', stiffness: 70, damping: 20 }}
              onAnimationComplete={handleSlideAnimationComplete}
            >
              {extendedTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.key}
                  className={`flex-shrink-0 w-full ${
                    visibleCount === 3 ? 'md:w-1/3' : visibleCount === 2 ? 'md:w-1/2' : 'w-full'
                  } p-2`}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98, cursor: 'grabbing' }}
                  style={{ cursor: 'grab' }}
                >
                  <motion.div
                    className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full bg-white border border-gray-100 shadow-lg shadow-brand-purple/5"
                    whileHover={{
                      boxShadow:
                        '0 10px 15px -3px rgba(46, 37, 87, 0.1), 0 4px 6px -2px rgba(46, 37, 87, 0.05)',
                    }}
                  >
                    <div className="absolute -top-4 -left-4 opacity-10">
                      <Quote
                        size={windowWidth < 640 ? 40 : 60}
                        className="text-brand-purple"
                      />
                    </div>

                    <div className="relative z-10 h-full flex flex-col">
                      <p className="text-sm sm:text-base text-gray-700 font-medium mb-4 sm:mb-6 leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>

                      <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100">
                        <h4 className="font-bold text-sm sm:text-base text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs sm:text-sm font-semibold text-brand-gold mt-0.5">
                          {testimonial.year}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-6 sm:mt-8">
            <div className="relative w-32 sm:w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full w-1/3 rounded-full bg-gradient-to-r from-brand-purple to-brand-gold"
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSlider
