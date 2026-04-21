'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollFadeProps {
  children: React.ReactNode
  delay?: number
}

export function ScrollFade({ children, delay = 0 }: ScrollFadeProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
