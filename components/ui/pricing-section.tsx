'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { TimelineContent } from './timeline-animation'
import { VerticalCutReveal } from './vertical-cut-reveal'
import { Check } from 'lucide-react'

export default function PricingSection() {
  const tiers = [
    {
      name: 'Series',
      price: '£119',
      description: 'Single programme',
      features: [
        'Access to full video series',
        'Q&A support',
        '4 video sessions',
        '30-day money-back guarantee'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Accelerator',
      price: '£499',
      description: 'Everything in Series, plus:',
      features: [
        'All Series features',
        'WhatsApp access',
        'Fortnightly 1:1 sessions',
        'Custom feedback',
        'Priority support'
      ],
      cta: 'Choose Plan',
      popular: true
    },
    {
      name: 'System',
      price: '£2,000+',
      description: 'Invite-only (5 spots)',
      features: [
        'Full 1:1 support',
        '24/7 access',
        'Custom curriculum',
        'Weekly deep-work sessions',
        'University guidance'
      ],
      cta: 'Apply Now',
      popular: false
    }
  ]

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <TimelineContent animationNum={0} className="mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Choose Your Programme
            </h2>
          </TimelineContent>
          <TimelineContent animationNum={1} className="mt-4">
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the tier that matches your needs and commitment level
            </p>
          </TimelineContent>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <TimelineContent
              key={tier.name}
              animationNum={index + 2}
              className="h-full"
            >
              <Card className={`relative h-full flex flex-col ${tier.popular ? 'border-indigo-500 border-2 shadow-lg scale-105' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-gray-900">
                      {tier.price}
                      {tier.name !== 'System' && <span className="text-lg text-gray-600 ml-2">one-time</span>}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    {tier.features.map((feature, i) => (
                      <VerticalCutReveal
                        key={i}
                        splitBy="words"
                        staggerDuration={0.05}
                        autoStart={false}
                      >
                        <div className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      </VerticalCutReveal>
                    ))}
                  </div>
                </CardContent>

                <CardContent className="pt-0">
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
                      tier.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </CardContent>
              </Card>
            </TimelineContent>
          ))}
        </div>
      </div>
    </section>
  )
}
