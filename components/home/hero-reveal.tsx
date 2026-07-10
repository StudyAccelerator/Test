'use client'

import { motion } from 'framer-motion'

/* Word-staggered reveal for the homepage hero. Each word rises out of an
   overflow-hidden span; the text itself is server-rendered for crawlers. */

const EASE = [0.22, 1, 0.36, 1] as const

export function HeroHeadline({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.06 }}
      className="inline"
    >
      {children}
    </motion.span>
  )
}

export function HeroWord({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
      <motion.span
        variants={{
          hidden: { y: '0.85em', opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
        }}
        className={`inline-block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function HeroFade({
  children,
  delay = 0.35,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
