'use client'

import { TimelineContent } from './timeline-animation'

export default function PricingSection() {
  const tiers = [
    {
      name: 'Study Series',
      tagline: 'Learn the System',
      price: '£119',
      description: 'Best for: Students who want clarity and structure',
      features: [
        '4 live sessions (2 hours each)',
        'Full Top 1% Study System',
        'Worksheets + templates',
        'Fortnightly group Q&A',
      ],
      cta: 'Join Study Series',
      ctaLink: 'https://buy.stripe.com/9B6fZid5Egyq6fwazac3m03',
      popular: false,
      highlight: false,
      extraNote: '',
    },
    {
      name: 'Study Accelerator',
      tagline: 'Implement the System',
      price: '£499',
      description: 'Best for: Students who want results, not just information',
      highlightLine: 'Includes full 12-week implementation support',
      subLine: 'Not just learning the system — actually applying it with guidance and feedback',
      features: [
        '12 weekly live sessions — 3 full months of support',
        'Full Top 1% Study System',
        'Worksheets + templates',
        'Fortnightly group Q&A',
        'Personalised guidance',
        'Direct feedback on your progress',
        'Community support',
      ],
      cta: 'Join Study Accelerator',
      ctaLink: 'https://buy.stripe.com/bJe14o8Po1DweM27mYc3m04',
      popular: true,
      highlight: true,
      extraNote: '',
      badge: 'Most Popular',
    },
    {
      name: 'Top 1% Mentorship',
      tagline: 'Optimise and Accelerate',
      price: '£2,000/year',
      description: 'Best for: Serious students aiming for top grades and competitive universities',
      features: [
        'Personalised performance plan',
        'Fortnightly calls, year-round',
        'Monthly performance reviews',
        'Priority support',
        'Full access to all systems',
      ],
      cta: 'Book Free Consultation',
      ctaLink: 'https://scheduler.zoom.us/dr-waleed-ahmad/top-1-mentorship-meeting',
      popular: false,
      highlight: true,
      extraNote: 'Invite only · limited to 5 spaces',
    },
  ]

  return (
    <section className="py-16 px-4 bg-brand-purple">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4 items-end">
          {tiers.map((tier, index) => (
            <TimelineContent
              key={tier.name}
              animationNum={index}
              className="h-full"
            >
              <div
                className={`relative h-full flex flex-col rounded-xl transition-all hover:shadow-2xl hover:-translate-y-2 ${
                  tier.highlight
                    ? 'border-4 border-brand-gold shadow-2xl bg-brand-cream'
                    : 'border-2 border-brand-cream-dark shadow-lg bg-brand-cream'
                } ${tier.popular ? 'md:scale-105 md:-mt-8' : ''} p-10`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-max">
                    <span className="bg-brand-gold text-brand-purple px-6 py-2 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
                      {tier.badge || 'Most Popular'}
                    </span>
                  </div>
                )}

                <h3 className="text-3xl font-serif font-bold text-brand-purple mb-1 text-center">
                  {tier.name}
                </h3>
                <p className="text-sm text-brand-gold font-semibold uppercase tracking-wide text-center mb-3">
                  {tier.tagline}
                </p>
                <div className="text-4xl font-bold text-brand-gold my-4 text-center">
                  {tier.price}
                </div>
                <p className="text-sm text-brand-text mb-4 opacity-90 text-center font-bold">{tier.description}</p>

                {tier.highlightLine && (
                  <div className="mb-6 mx-auto bg-brand-gold/15 border border-brand-gold/40 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-brand-purple">{tier.highlightLine}</p>
                    {tier.subLine && (
                      <p className="text-xs text-brand-text mt-1 italic">{tier.subLine}</p>
                    )}
                  </div>
                )}

                <ul className="space-y-3 mb-6 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-bold text-lg flex-shrink-0 text-brand-gold">
                        ✓
                      </span>
                      <span className="text-brand-text text-sm leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {tier.extraNote && (
                  <p className="text-sm text-brand-gold italic font-semibold mb-6 text-center">
                    {tier.extraNote}
                  </p>
                )}

                <a
                  href={tier.ctaLink}
                  className={`block text-center w-full py-4 px-6 font-semibold rounded-lg transition-all transform hover:-translate-y-1 ${
                    tier.highlight
                      ? 'bg-brand-gold text-brand-purple hover:bg-brand-gold-light shadow-lg hover:shadow-xl'
                      : 'bg-brand-gold bg-opacity-70 text-brand-purple hover:bg-brand-gold shadow-md hover:shadow-lg'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </TimelineContent>
          ))}
        </div>
      </div>
    </section>
  )
}
