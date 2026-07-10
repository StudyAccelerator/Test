'use client'

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
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
  {
    id: 7,
    quote: "I liked how we worked together to get the answers instead of the tutor doing it for us. We go straight into exam practice instead of spending ages on content, and it works. Could we please get more homework, especially harder exam questions!",
    name: 'Maahil',
    year: 'A-Level Chemistry Student',
  },
  {
    id: 8,
    quote: 'The content was explained really well and there was a brilliant range of questions. I love the way everything is taught',
    name: 'Menahil',
    year: 'Year 13 Student',
  },
  {
    id: 9,
    quote: 'Well structured and informative walkthroughs, with lots of hard questions and worked solutions',
    name: 'Ahreen',
    year: 'A-Level Chemistry Student',
  },
  {
    id: 10,
    quote: 'It was really useful having the breakdown of exam questions gone through step by step, then explaining the answers after we had attempted them',
    name: 'Vernon',
    year: 'Year 12 Student',
  },
  {
    id: 11,
    quote: 'The whole session was interactive and the tutor was really helpful and informative. Honestly there was nothing I would change',
    name: 'Rayanna',
    year: 'A-Level Biology Student',
  },
  {
    id: 12,
    quote: 'The exam question walk-throughs were brilliant, really focused on applying what we know rather than just repeating content',
    name: 'Naysa',
    year: 'A-Level Biology Student',
  },
  {
    id: 13,
    quote: 'I liked how the session was so exam-technique focused, with a great balance of exam questions and the content behind them',
    name: 'Furkan',
    year: 'Year 13 Student',
  },
]

// Slides are looped seamlessly by rendering several copies of the testimonials
// back to back and silently snapping the index back into the middle copy once
// it drifts into a neighbouring copy, so the carousel can scroll forever in
// either direction without ever hitting a visible end.
const LOOP_COPIES = 3
const total = testimonials.length
// Only the middle copy is exposed to assistive tech and crawlers; the outer
// copies exist purely for the seamless-loop illusion, so they're aria-hidden
// (otherwise every student name would appear three times in the document).
const MIDDLE_COPY = Math.floor(LOOP_COPIES / 2)
const extendedTestimonials = Array.from({ length: LOOP_COPIES }, (_, copy) =>
  testimonials.map((t) => ({ ...t, key: `${t.id}-${copy}`, isDecoy: copy !== MIDDLE_COPY }))
).flat()

const getVisibleCount = (width: number): number => {
  if (width >= 1280) return 3
  if (width >= 768) return 2
  return 1
}

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(total)
  // Always start from the same fixed value the static export uses at build
  // time. Reading the real window.innerWidth here would make the client's
  // first render already match it, so the mount effect's setWindowWidth call
  // below would be a no-op (same value -> no re-render) and the layout would
  // stay stuck on whatever the server happened to bake in.
  const [windowWidth, setWindowWidth] = useState(1024)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isJumping, setIsJumping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => setWindowWidth(window.innerWidth)

    // Sync immediately on mount: the static export bakes in a build-time
    // fallback width, so without this the card layout stays wrong until the
    // visitor happens to resize their window.
    handleResize()

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

  // Reset synchronously before paint so the instant jump and the resumed
  // spring transition can never land on the same frame.
  useLayoutEffect(() => {
    if (!isJumping) return
    setIsJumping(false)
  }, [isJumping])

  const visibleCount = getVisibleCount(windowWidth)

  const resumeAutoPlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    if (resumeAutoPlayTimeoutRef.current) clearTimeout(resumeAutoPlayTimeoutRef.current)
    resumeAutoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  useEffect(() => {
    return () => {
      if (resumeAutoPlayTimeoutRef.current) clearTimeout(resumeAutoPlayTimeoutRef.current)
    }
  }, [])

  const goNext = () => {
    setCurrentIndex((prev) => prev + 1)
    pauseAutoPlay()
  }

  const goPrev = () => {
    setCurrentIndex((prev) => prev - 1)
    pauseAutoPlay()
  }

  const swipeStartXRef = useRef<number | null>(null)

  const handleSwipeStart = (event: React.PointerEvent) => {
    swipeStartXRef.current = event.clientX
  }

  const handleSwipeEnd = (event: React.PointerEvent) => {
    if (swipeStartXRef.current === null) return
    const deltaX = event.clientX - swipeStartXRef.current
    swipeStartXRef.current = null

    const swipeThreshold = 40
    if (deltaX < -swipeThreshold) {
      goNext()
    } else if (deltaX > swipeThreshold) {
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
          <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-2xl mx-auto px-4">
            Real feedback from students on our recent 12-week Biology and Chemistry Accelerators.
          </p>
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

          <div
            className="overflow-hidden relative px-2 sm:px-0"
            style={{ touchAction: 'pan-y' }}
            onPointerDown={handleSwipeStart}
            onPointerUp={handleSwipeEnd}
            onPointerCancel={() => { swipeStartXRef.current = null }}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={isJumping ? { duration: 0 } : { duration: 0.7, ease: 'easeInOut' }}
              onAnimationComplete={handleSlideAnimationComplete}
            >
              {extendedTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.key}
                  aria-hidden={testimonial.isDecoy || undefined}
                  className={`flex-shrink-0 w-full ${
                    visibleCount === 3 ? 'md:w-1/3' : visibleCount === 2 ? 'md:w-1/2' : 'w-full'
                  } p-2`}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -5 }}
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
                        <p className="font-bold text-sm sm:text-base text-gray-900">
                          {testimonial.name}
                        </p>
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
            <div className="w-32 sm:w-48 h-1.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-gold opacity-70" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSlider
