'use client'

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    quote: "I love each session because it is highly interactive and allows us to give answers which Dr Waleed gives feedback on which is very helpful",
    name: "Arooj",
    role: "Year 13 Student",
  },
  {
    id: 2,
    quote: "The lessons were interactive with well explained concepts, easy to follow and very informative. We got good points to research and the feedback on ourselves was great, even the best students had something to improve on",
    name: "Jay",
    role: "Year 12 Student",
  },
  {
    id: 3,
    quote: "I really liked the wide range of examples used and discussed throughout the session. This made the session very interactive because there was more active learning",
    name: "Catherine",
    role: "Year 13 Student",
  },
  {
    id: 4,
    quote: "All the information provided was clear and understandable. It was really helpful and improved my confidence!",
    name: "Biju",
    role: "Gap Year Student",
  },
  {
    id: 5,
    quote: "I appreciated the chance to give my own answer and received really valuable feedback! The topics were really hard to approach while researching alone so seeing it broken down into manageable points was useful to apply it even better",
    name: "Delicia",
    role: "Year 13 Student",
  },
  {
    id: 6,
    quote: "There was a constant link/explanation as to how we can use this information ourselves, great examples and feedback given",
    name: "Reanna",
    role: "Year 12 Student",
  },
]

const N = TESTIMONIALS.length // 6

// Triple the array: [set1 | set2 (real) | set3]
// We start in set2 and silently jump back to set2 when we drift into set1 or set3
const EXTENDED = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

const getVisible = (w: number): number => {
  if (w >= 1280) return 3
  if (w >= 768) return 2
  return 1
}

// Slide duration in ms — must match the transition.duration below (in seconds)
const SLIDE_MS = 450

const TestimonialSlider: React.FC = () => {
  const [idx, setIdx] = useState(N)
  const [animate, setAnimate] = useState(true)
  const [winW, setWinW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const [userPaused, setUserPaused] = useState(false)

  // Keep a ref that's always the latest idx, updated synchronously before paint.
  // onAnimationComplete (fires via rAF after paint) will read this safely.
  const idxRef = useRef(N)
  useLayoutEffect(() => { idxRef.current = idx }, [idx])

  // Whether a silent wrap-around jump is in progress.
  // Prevents step() from advancing during the jump and prevents double-jumps.
  const jumping = useRef(false)

  const pauseTimer = useRef<NodeJS.Timeout | null>(null)

  // Track window width for responsive visible count
  useEffect(() => {
    if (typeof window === 'undefined') return
    setWinW(window.innerWidth)
    const onResize = () => setWinW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Re-enable animation after a silent jump (duration: 0)
  useEffect(() => {
    if (!animate) {
      const t = setTimeout(() => {
        setAnimate(true)
        jumping.current = false
      }, 50)
      return () => clearTimeout(t)
    }
  }, [animate])

  // Called by framer-motion once the slide animation finishes.
  // Using onAnimationComplete instead of a fixed setTimeout means we only
  // trigger the wrap-around jump after the tween has truly completed —
  // no more mid-flight interruptions.
  const handleAnimComplete = useCallback(() => {
    const cur = idxRef.current

    // If jumping.current is already true we're inside the silent jump itself
    // (the duration:0 "animation" also fires this callback). Ignore it.
    if (jumping.current) return

    // If the animation landed outside the middle set, do the silent teleport
    if (cur < N || cur >= N * 2) {
      jumping.current = true
      setAnimate(false)
      setIdx(prev => {
        if (prev < N) return prev + N
        if (prev >= N * 2) return prev - N
        return prev
      })
    }
  }, [])

  const step = useCallback((delta: number) => {
    if (jumping.current) return
    setAnimate(true)
    setIdx(prev => prev + delta)
  }, [])

  const pauseAutoPlay = useCallback(() => {
    setUserPaused(true)
    if (pauseTimer.current) clearTimeout(pauseTimer.current)
    pauseTimer.current = setTimeout(() => setUserPaused(false), 8000)
  }, [])

  const goNext = useCallback(() => { step(1); pauseAutoPlay() }, [step, pauseAutoPlay])
  const goPrev = useCallback(() => { step(-1); pauseAutoPlay() }, [step, pauseAutoPlay])

  // Auto-advance every 3.5 s unless user recently interacted
  useEffect(() => {
    if (userPaused) return
    const t = setInterval(() => step(1), 3500)
    return () => clearInterval(t)
  }, [userPaused, step])

  // Swipe / drag support
  const handleDragEnd = useCallback((_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -40) goNext()
    else if (info.offset.x > 40) goPrev()
  }, [goNext, goPrev])

  const visible = getVisible(winW)
  const translateX = `-${idx * (100 / visible)}%`
  const activeDot = ((idx % N) + N) % N

  return (
    <div className="py-12 sm:py-16 bg-gradient-to-b from-brand-light-gray to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand-purple/10 text-brand-purple font-medium text-xs sm:text-sm uppercase tracking-wider">
            Success Stories
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-purple to-brand-purple/70 bg-clip-text text-transparent mt-3 sm:mt-4">
            Hear From Our Students
          </h3>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-gold mx-auto mt-4 sm:mt-6" />
        </motion.div>

        {/* Carousel */}
        <div className="relative">

          {/* Navigation buttons */}
          <div className="flex justify-center sm:justify-end sm:absolute sm:-top-16 right-0 gap-2 mb-4 sm:mb-0">
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

          {/* Track */}
          <div className="overflow-hidden px-2 sm:px-0">
            <motion.div
              className="flex"
              animate={{ x: translateX }}
              transition={
                animate
                  ? { type: 'tween', duration: SLIDE_MS / 1000, ease: 'easeInOut' }
                  : { duration: 0 }
              }
              onAnimationComplete={handleAnimComplete}
            >
              {EXTENDED.map((t, i) => (
                <motion.div
                  key={i}
                  className={`flex-shrink-0 p-2 w-full ${
                    visible === 3 ? 'md:w-1/3' :
                    visible === 2 ? 'md:w-1/2' :
                    ''
                  }`}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={handleDragEnd}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ cursor: 'grab' }}
                >
                  <motion.div
                    className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full bg-white border border-gray-100 shadow-lg shadow-brand-purple/5"
                    whileHover={{
                      boxShadow: '0 10px 15px -3px rgba(46,37,87,0.12), 0 4px 6px -2px rgba(46,37,87,0.06)',
                    }}
                  >
                    {/* Background quote mark */}
                    <div className="absolute -top-4 -left-4 opacity-10 pointer-events-none">
                      <Quote size={winW < 640 ? 40 : 60} className="text-brand-purple" />
                    </div>

                    <div className="relative z-10 h-full flex flex-col">
                      <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed flex-1 mb-4 sm:mb-6">
                        &ldquo;{t.quote}&rdquo;
                      </p>

                      <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100">
                        <p className="font-bold text-sm sm:text-base text-gray-900">{t.name}</p>
                        <p className="text-xs sm:text-sm font-semibold text-brand-gold mt-0.5">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dot indicators — always N dots, one per real testimonial */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {TESTIMONIALS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  if (jumping.current) return
                  setAnimate(true)
                  setIdx(N + i)
                  pauseAutoPlay()
                }}
                className="relative focus:outline-none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <motion.div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i === activeDot ? 'bg-brand-purple' : 'bg-gray-300'
                  }`}
                  animate={{ scale: i === activeDot ? [1, 1.2, 1] : 1 }}
                  transition={{
                    duration: 1.5,
                    repeat: i === activeDot ? Infinity : 0,
                    repeatDelay: 1,
                  }}
                />
                {i === activeDot && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-brand-purple/30"
                    animate={{ scale: [1, 1.8], opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default TestimonialSlider
