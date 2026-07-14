import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Terms and Conditions',
  description:
    'The terms for booking and taking part in A-Level Accelerators programmes, including payment, your right to cancel, refunds and how sessions are delivered.',
  alternates: { canonical: 'https://alevelaccelerators.com/terms/' },
}

/* Effective date shown on the page. Update when the terms change. */
const UPDATED = '13 July 2026'

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl text-brand-purple font-serif mt-12 mb-4">{children}</h2>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-brand-text leading-relaxed mb-5">{children}</p>
)
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="space-y-2 text-lg text-brand-text mb-5 list-disc pl-6">{children}</ul>
)

export default function Terms() {
  return (
    <main className="bg-brand-cream min-h-screen">
      <Header />
      <article className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl md:text-5xl text-brand-purple font-serif font-bold leading-tight mb-4">
          Terms and Conditions
        </h1>
        <p className="text-sm text-brand-muted mb-10">Last updated {UPDATED}</p>

        <P>
          These terms apply when you book a place on any A-Level Accelerators paid programme. Please read them before
          you pay. Our free tools and resources are covered by our privacy policy rather than by these terms.
        </P>

        <H2>Who we are</H2>
        <P>
          A-Level Accelerators (&quot;we&quot;, &quot;us&quot;) provides live online A-level courses, run by Dr Waleed
          Ahmad. You can reach us at <a className="text-brand-purple underline decoration-brand-gold" href="mailto:Waleed@alevelaccelerators.com">Waleed@alevelaccelerators.com</a>.
        </P>
        <P>
          [To confirm before publishing: the legal trading entity (sole trader or limited company, with company number
          if applicable) and the business address.]
        </P>

        <H2>The programmes</H2>
        <P>
          We run live online programmes, including the Summer Accelerator, the Subject Accelerators and the Study
          System. The current content, dates, session times and prices for each are shown on its page on this website
          at the time you book. Sessions are taught live and are also recorded, so you can catch up if you miss one.
        </P>

        <H2>Booking and payment</H2>
        <P>
          You book by paying through the checkout link on the programme page. Payment is handled securely by Stripe.
          Your place is confirmed once payment has gone through and you have received our confirmation email. Prices
          are in pounds sterling and include any tax that applies.
        </P>

        <H2>Your right to cancel and our refund promise</H2>
        <P>
          Every programme starts with a first session that is risk-free: if it is not right for you, tell us within 48
          hours of that first session and we will refund you in full.
        </P>
        <P>
          Separately, under the Consumer Contracts Regulations you have 14 days from booking to change your mind and
          cancel for a full refund. If a programme begins within that 14-day window and you have asked us to start it,
          your refund may be reduced in proportion to the sessions already delivered. Once you have taken part in more
          than the first session, the risk-free promise above no longer applies. To cancel, email us.
        </P>

        <H2>How sessions are delivered</H2>
        <UL>
          <li>Sessions run live on Zoom at the times shown on the programme page. You will get the joining details by email.</li>
          <li>We record sessions and share the recordings with the group, so a missed session is not a lost one.</li>
          <li>
            If we ever have to move or cancel a session, we will give you as much notice as we can and offer a
            replacement or, where that is not possible, a fair refund for that session.
          </li>
        </UL>

        <H2>What we ask of you</H2>
        <P>
          A place is for one named student. Please do not share your joining links, recordings or materials outside the
          programme. Everything we teach and provide stays our intellectual property and is licensed to you for your own
          study only.
        </P>

        <H2>Our responsibility to you</H2>
        <P>
          We teach the method and give you our best work. We cannot guarantee a particular grade, because your result
          depends on your own effort as well as our teaching. Nothing in these terms limits our liability where the law
          does not allow it to be limited.
        </P>

        <H2>Changes and governing law</H2>
        <P>
          We may update these terms from time to time; the version that applies to you is the one published when you
          book. These terms are governed by the law of England and Wales.
        </P>
      </article>
      <Footer />
    </main>
  )
}
