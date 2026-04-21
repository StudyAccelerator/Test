'use client'

import { TimelineContent } from './timeline-animation'

export default function PricingSection() {
  const tiers = [
    {
      name: 'Top 1% Study Series',
      price: '£119',
      description: 'The core system delivered live. Perfect for students who want to implement immediately.',
      features: [
        '4 live sessions (2 hours each, twice weekly)',
        'Session 1: Mastering Your Week (80/20 Study Plan)',
        'Session 2: Overcoming Procrastination',
        'Session 3: Preventing Burnout',
        'Session 4: Revising That Works (Active Recall & Spaced Repetition)',
        'Fortnightly group Q&A (1 hour)',
        'Money-back guarantee',
      ],
      cta: 'Enrol Now',
      ctaLink: 'STRIPE_LINK_SERIES',
      popular: false,
      highlight: false,
    },
    {
      name: 'Top 1% Study Accelerator',
      price: '£499',
      description: 'Everything in Series plus direct access and personal accountability.',
      features: [
        'All Series content & sessions',
        'Private WhatsApp group',
        'Direct answers from me (48-hour turnaround)',
        'Fortnightly 30-min 1:1 calls',
        'Personalised onboarding call',
        'Coaching community access',
        'Access to A-Level Biology & Chemistry resources',
      ],
      cta: 'Enrol Now',
      ctaLink: 'STRIPE_LINK_ACCELERATOR',
      popular: true,
      highlight: true,
    },
    {
      name: 'Top 1% Study System',
      price: 'From £2,000/year',
      description: 'Complete 1:1 transformation. For serious students. Invite-only (5 spaces).',
      features: [
        'Comprehensive diagnostic breakdown session',
        'Personalised analysis report & custom roadmap',
        'Weekly 1:1 coaching calls (1-2 hours each)',
        'Monthly deep-dive review meetings',
        '24/7 WhatsApp access to me',
        'Subject-specific support tailored to you',
        'Custom AI tutors for your subjects',
        'Discounted access to A-Level programmes',
      ],
      cta: 'Book Free Consultation',
      ctaLink: 'ZOOM_BOOKING_LINK',
      popular: false,
      highlight: true,
    },
  ]

  return (
    <section className="py-16 px-4 bg-brand-purple">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-end">
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
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-brand-gold text-brand-purple px-6 py-2 rounded-full text-sm font-bold shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-3xl font-serif font-bold text-brand-purple mb-3 text-center">
                  {tier.name}
                </h3>
                <div className="text-4xl font-bold text-brand-gold my-4 text-center">
                  {tier.price}
                </div>
                <p className="text-sm text-brand-text mb-6 opacity-90">{tier.description}</p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`font-bold text-lg flex-shrink-0 ${
                        tier.highlight ? 'text-brand-gold' : 'text-brand-gold'
                      }`}>
                        ✓
                      </span>
                      <span className="text-brand-text text-sm leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.ctaLink}
                  className={`block text-center w-full py-4 px-6 font-semibold rounded-lg transition-all transform hover:-translate-y-1 ${
                    tier.highlight
                      ? 'bg-brand-gold text-brand-purple hover:bg-brand-gold-light shadow-lg hover:shadow-xl'
                      : 'bg-brand-cream-dark text-brand-purple hover:bg-brand-gold shadow-md hover:shadow-lg'
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
