'use client'

import { useState } from 'react'
import { ACADEMY } from '@/lib/academy'

/* The VSL under the headline. A "click to play" facade (31 October 2026):
   the page loads only Waleed's thumbnail (a 53 KB image) with a play
   button, and the Loom player is created the moment someone presses play,
   with autoplay on. Before this the Loom iframe loaded on page open, which
   showed a black box for a few seconds and slowed the whole page on phones.
   The thumbnail is his own design (public/academy/vsl-thumbnail.*). With no
   embed URL set, the thumbnail still shows, without a play button. */

export default function Vsl() {
  const [playing, setPlaying] = useState(false)
  const src = ACADEMY.vslEmbedUrl
    ? `${ACADEMY.vslEmbedUrl}${ACADEMY.vslEmbedUrl.includes('?') ? '&' : '?'}autoplay=1`
    : ''

  const warm = () => {
    /* Open the connection to Loom as soon as a finger or cursor heads for the
       button, so the player starts faster once pressed. */
    if (typeof document === 'undefined' || document.getElementById('loom-preconnect')) return
    const l = document.createElement('link')
    l.id = 'loom-preconnect'
    l.rel = 'preconnect'
    l.href = 'https://www.loom.com'
    document.head.appendChild(l)
  }

  return (
    <div>
    {src && !playing && (
      <p className="mb-3 text-center text-sm font-semibold text-brand-purple sm:text-base">
        <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-red-500 align-middle" aria-hidden="true" />
        Watch this first: Dr Waleed explains the Academy in 10 minutes
      </p>
    )}
    <div className="overflow-hidden rounded-3xl bg-brand-purple shadow-2xl ring-1 ring-brand-purple/15">
      <div className="relative aspect-video">
        {playing && src ? (
          <iframe
            src={src}
            title="Dr Waleed explains the Top 1% Academy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => src && setPlaying(true)}
            onPointerEnter={warm}
            onFocus={warm}
            onTouchStart={warm}
            disabled={!src}
            aria-label="Play the video: Dr Waleed explains the Top 1% Academy, 10 minutes"
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <picture>
              <source srcSet="/academy/vsl-thumbnail.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/academy/vsl-thumbnail.jpg"
                alt=""
                width={1600}
                height={900}
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
            {src && (
              <>
                <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                {/* Big centred play button with a pulsing ring (Waleed, 31 October:
                    the corner pill did not read as a video). */}
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand-gold/50 [animation-duration:1.8s]" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold text-brand-purple shadow-2xl ring-2 ring-white/80 sm:ring-4 transition-transform group-hover:scale-110 sm:h-28 sm:w-28">
                    <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current sm:h-12 sm:w-12" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
                <span className="absolute bottom-5 left-5 hidden rounded-full bg-black/65 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur sm:block sm:px-4 sm:py-1.5 sm:text-xs">
                  Press play · 10 minutes
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
    </div>
  )
}
