'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
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
// Triple clone: [set1 | set2 (real start) | set3]
const EXTENDED = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

const getVisible = (w: number): number => {
  if (w >= 1280) return 3
  if (w >= 768) return 2
  return 1
}

const SLIDE_DURATION = 450 // ms

const TestimonialSlider: React.FC = () => {
  // idx into EXTENDED; start at N so the first visible card is TESTIMONIALS[0]
  const [idx, setIdx] = useState(N)
  const [winW, setWinW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const [userPaused, setUserPaused] = useState(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const idxRef = useRef(N)           // always mirrors idx synchronously
  const jumping = useRef(false)      // true while silent wrap-around is in progress
  const pauseTimer = useRef<NodeJS.Timeout | null>(null)

  // ── helpers ────────────────────────────────────────────────────────────────

  // Apply the CSS transform directly so the browser computes % against live width.
  // animated=false means instant (transition:none), used for the silent jump.
  const applyTransform = useCallback((i: number, animated: boolean) => {
    const track = trackRef.current
    if (!track) return
    const vis = getVisible(window.innerWidth)
    track.style.transition = animated ? `transform ${SLIDE_DURATION}ms ease-in-out` : 'none'
    track.style.transform = `translateX(-${(i * 100) / vis}%)`
  }, [])

  // ── window resize ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    setWinW(window.innerWidth)
    const onResize = () => {
      setWinW(window.innerWidth)
      // Re-apply current position instantly so % recalculates for new width
      applyTransform(idxRef.current, false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [applyTransform])

  // ── sync idxRef + DOM whenever idx state changes ───────────────────────────
  useEffect(() => {
    idxRef.current = idx
    // applyTransform is called by whoever triggered the idx change,
    // so we don't call it here (avoids double-apply races)
  }, [idx])

  // ── transitionend: fire the silent wrap-around after CSS transition done ──
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onEnd = () => {
      if (jumping.current) return
      const cur = idxRef.current
      if (cur < N || cur >= N * 2) {
        jumping.current = true
        const next = cur < N ? cur + N : cur - N
        // Silent jump: no transition
        applyTransform(next, false)
        // Update state to stay in sync (does NOT re-trigger applyTransform)
        setIdx(next)
        idxRef.current = next
        // Re-enable stepping after a short frame gap
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            jumping.current = false
          })
        })
      }
    }

    track.addEventListener('transitionend', onEnd)
    return () => track.removeEventListener('transitionend', onEnd)
  }, [applyTransform])

  // ── initial position on mount ──────────────────────────────────────────────
  useEffect(() => {
    applyTransform(N, false)
  }, [applyTransform])

  // ── step (advance one position) ────────────────────────────────────────────
  const step = useCallback((delta: number) => {
    if (jumping.current) return
    const next = idxRef.current + delta
    idxRef.current = next
    setIdx(next)
    applyTransform(next, true)
  }, [applyTransform])

  const pauseAutoPlay = useCallback(() => {
    setUserPaused(true)
    if (pauseTimer.current) clearTimeout(pauseTimer.current)
    pauseTimer.current = setTimeout(() => setUserPaused(false), 8000)
  }, [])

  const goNext = useCallback(() => { step(1); pauseAutoPlay() }, [step, pauseAutoPlay])
  const goPrev = useCallback(() => { step(-1); pauseAutoPlay() }, [step, pauseAutoPlay])

  // ── auto-advance ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (userPaused) return
    const t = setInterval(() => step(1), 3500)
    return () => clearInterval(t)
  }, [userPaused, step])

  // ── swipe detection (pointer events on the overflow container) ─────────────
  const pointerStartX = useRef<number | null>(null)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerStartX.current = e.clientX
  }, [])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (pointerStartX.current === null) return
    const diff = pointerStartX.current - e.clientX
    pointerStartX.current = null
    if (diff > 40) goNext()
    else if (diff < -40) goPrev()
  }, [goNext, goPrev])

  // ── dot nav ────────────────────────────────────────────────────────────────
  const goToSlide = useCallback((i: number) => {
    if (jumping.current) return
    const target = N + i
    idxRef.current = target
    setIdx(target)
    applyTransform(target, true)
    pauseAutoPlay()
  }, [applyTransform, pauseAutoPlay])

  const visible = getVisible(winW)
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

          {/* Overflow container — also handles touch/swipe */}
          <div
            className="overflow-hidden px-2 sm:px-0 cursor-grab active:cursor-grabbing select-none"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerStartX.current = null }}
          >
            {/* Track — CSS transition, NOT framer-motion animate */}
            <div
              ref={trackRef}
              className="flex"
              style={{ willChange: 'transform' }}
            >
              {EXTENDED.map((t, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 p-2 ${
                    visible === 3 ? 'w-1/3' :
                    visible === 2 ? 'w-1/2' :
                    'w-full'
                  }`}
                >
                  <motion.div
                    className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full bg-white border border-gray-100 shadow-lg shadow-brand-purple/5"
                    whileHover={{
                      y: -5,
                      boxShadow: '0 10px 15px -3px rgba(46,37,87,0.12), 0 4px 6px -2px rgba(46,37,87,0.06)',
                    }}
                    transition={{ duration: 0.2 }}
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
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {TESTIMONIALS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goToSlide(i)}
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
