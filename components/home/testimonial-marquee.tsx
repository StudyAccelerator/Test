'use client'

/* Auto-scrolling testimonial columns. Each column loops vertically on its own
   timing; hovering pauses the column. Content is duplicated for the seamless
   loop, with the duplicate hidden from assistive tech and crawlers. */

type Quote = { quote: string; name: string; role: string }

const CARD =
  'rounded-2xl bg-white [box-shadow:0_0_0_1px_rgba(46,37,87,.05),0_2px_4px_rgba(46,37,87,.05),0_12px_24px_rgba(46,37,87,.06)]'

function QuoteCard({ t }: { t: Quote }) {
  return (
    <figure className={`${CARD} p-7`}>
      <span aria-hidden="true" className="font-serif text-5xl leading-none text-brand-gold/70 block">
        &ldquo;
      </span>
      <blockquote className="mt-2 text-brand-text/85 leading-relaxed">{t.quote}</blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="font-bold text-brand-purple">{t.name}</span>
        <span className="text-brand-text/60"> · {t.role}</span>
      </figcaption>
    </figure>
  )
}

function Column({ quotes, duration, reverse }: { quotes: Quote[]; duration: number; reverse?: boolean }) {
  return (
    <div className="marquee-col relative overflow-hidden">
      <div
        className="marquee-track flex flex-col gap-6"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {quotes.map((t) => (
          <QuoteCard key={t.name} t={t} />
        ))}
        <div aria-hidden="true" className="flex flex-col gap-6">
          {quotes.map((t) => (
            <QuoteCard key={`${t.name}-loop`} t={t} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TestimonialMarquee({ quotes }: { quotes: Quote[] }) {
  const third = Math.ceil(quotes.length / 3)
  const cols = [quotes.slice(0, third), quotes.slice(third, third * 2), quotes.slice(third * 2)]
  return (
    <div className="relative">
      <style>{`
        @keyframes marquee-y {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-50% - 12px)); }
        }
        .marquee-track { animation: marquee-y linear infinite; }
        .marquee-col:hover .marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[30rem] md:h-[34rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
        <div className="md:hidden">
          <Column quotes={quotes} duration={60} />
        </div>
        <div className="hidden md:block">
          <Column quotes={cols[0]} duration={38} />
        </div>
        <div className="hidden md:block">
          <Column quotes={cols[1]} duration={50} reverse />
        </div>
        <div className="hidden md:block">
          <Column quotes={cols[2]} duration={44} />
        </div>
      </div>
    </div>
  )
}
