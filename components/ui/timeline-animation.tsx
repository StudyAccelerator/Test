'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TimelineContentProps {
  as?: 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3'
  children: React.ReactNode
  animationNum: number
  timelineRef?: React.RefObject<HTMLDivElement | null>
  customVariants?: {
    visible: (i: number) => any
    hidden: any
  }
  className?: string
  [key: string]: any
}

export function TimelineContent({
  as: Component = 'div',
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  ...props
}: TimelineContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  const defaultVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: 'blur(10px)',
      y: -20,
      opacity: 0,
    },
  }

  const variants = customVariants || defaultVariants

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={animationNum}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
