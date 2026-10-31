import Image from 'next/image'
import { ACADEMY } from '@/lib/academy'

/* The video slot under the headline. With ACADEMY.vslEmbedUrl set it embeds
   the Loom or YouTube player; until then it shows the poster photo with a
   play badge and a caption, so the page reads as finished while Waleed
   records. */

export default function Vsl() {
  if (ACADEMY.vslEmbedUrl) {
    return (
      <div className="overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-brand-purple/15">
        <div className="relative aspect-video">
          <iframe
            src={ACADEMY.vslEmbedUrl}
            title="Dr Waleed explains the Top 1% Academy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="eager"
            style={{ border: 0 }}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    )
  }
  return (
    <div className="group relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-brand-purple/15">
      <Image
        src="/photos/waleed-pointing.jpg"
        alt="Dr Waleed Ahmad at his desk, about to explain the Top 1% Academy"
        width={1200}
        height={675}
        unoptimized
        priority
        className="aspect-video h-auto w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/80 via-brand-purple/10 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-gold text-brand-purple shadow-xl transition-transform group-hover:scale-105 sm:h-24 sm:w-24">
          <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9 fill-current" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-gold">Watch first · 6 minutes</p>
        <p className="mt-1 font-serif text-xl font-bold text-brand-cream sm:text-2xl">
          Dr Waleed explains exactly what happens inside the Academy
        </p>
      </div>
    </div>
  )
}
