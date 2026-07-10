import { ScrollFade } from '@/components/ui/scroll-fade'
import TestimonialMarquee from '@/components/home/testimonial-marquee'
import { WALL_QUOTES } from '@/lib/testimonials'

/* The one testimonial section used across the site, so social proof looks
   identical on the homepage and every programme page. */
export default function TestimonialWall({ className = 'py-20 md:py-24' }: { className?: string }) {
  return (
    <ScrollFade>
      <section className={`px-6 bg-brand-cream ${className}`}>
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-purple/60 mb-4 text-center">
            From real feedback forms
          </p>
          <h2 className="text-center font-serif tracking-tight text-3xl md:text-5xl text-brand-purple leading-tight">
            What students <span className="italic text-brand-gold">actually</span> say
          </h2>
          <div className="mt-14">
            <TestimonialMarquee quotes={WALL_QUOTES} />
          </div>
        </div>
      </section>
    </ScrollFade>
  )
}
