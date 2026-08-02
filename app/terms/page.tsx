import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Terms and Conditions',
  description:
    'The terms and conditions for booking and taking part in A-Level Accelerators programmes, including payment, cancellation, refunds and delivery of sessions.',
  alternates: { canonical: 'https://alevelaccelerators.com/terms/' },
}

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
        <h1 className="text-4xl md:text-5xl text-brand-purple font-serif font-bold leading-tight mb-10">
          Terms and Conditions
        </h1>

        <H2>1. Introduction</H2>
        <P>
          1.1 These terms and conditions (&quot;these Terms&quot;) govern the booking of, payment for and
          participation in the paid programmes (&quot;Programmes&quot;) provided by A-Level Accelerators
          (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) through our website at alevelaccelerators.com
          (&quot;the Site&quot;).
        </P>
        <P>
          1.2 By booking a place on a Programme you agree to these Terms. Please read them before you pay.
          Our free tools and resources are governed by our Privacy Policy rather than by these Terms.
        </P>

        <H2>2. About us and how to contact us</H2>
        <P>
          2.1 A-Level Accelerators provides live online A-level courses, run by Dr Waleed Ahmad. You can
          contact us at{' '}
          <a
            className="text-brand-purple underline decoration-brand-gold"
            href="mailto:Waleed@alevelaccelerators.com"
          >
            Waleed@alevelaccelerators.com
          </a>
          .
        </P>

        <H2>3. The Programmes</H2>
        <P>
          3.1 The content, dates, session times and prices of each Programme are as shown on its page on the
          Site at the time you book.
        </P>
        <P>
          3.2 Sessions are taught live and are also recorded. Recordings are made available to enrolled
          students for the duration of the Programme, so a missed session can be caught up.
        </P>

        <H2>4. Booking and payment</H2>
        <P>
          4.1 You book a place by completing payment through the checkout link on the relevant Programme
          page. Payment is processed securely by a third party payment provider; we do not see or store your
          full card details.
        </P>
        <P>
          4.2 Your place is confirmed when payment has been received and we have sent you a confirmation
          email.
        </P>
        <P>4.3 All prices are stated in pounds sterling and include any applicable tax.</P>

        <H2>5. Cancellation and refunds</H2>
        <P>
          5.1 Every Programme begins with a risk-free first session. If, within 48 hours of that first
          session, you tell us the Programme is not right for you, we will refund your payment in full.
        </P>
        <P>
          5.2 In addition, under the Consumer Contracts Regulations 2013 you have 14 days from booking in
          which to cancel for a full refund. If the Programme begins within that period and you have asked us
          to start providing it, any refund may be reduced in proportion to the sessions already delivered.
        </P>
        <P>
          5.3 Once you have taken part in more than the first session, the promise in clause 5.1 no longer
          applies. To cancel at any time, contact us by email.
        </P>

        <H2>6. Delivery of sessions</H2>
        <P>
          6.1 Sessions are delivered live online at the times shown on the relevant Programme page. Joining
          details are provided by email.
        </P>
        <P>
          6.2 If we need to reschedule or cancel a session, we will give you as much notice as reasonably
          possible and will offer a replacement session or, where that is not possible, a proportionate
          refund for the affected session.
        </P>

        <H2>7. Your obligations</H2>
        <P>
          7.1 A place on a Programme is for one named student. You agree not to share joining links,
          recordings or materials with anyone outside the Programme.
        </P>
        <P>
          7.2 You agree to behave respectfully towards teaching staff and other students in live sessions. We
          reserve the right to remove, without refund, any student whose conduct seriously or repeatedly
          disrupts sessions for others; we will always raise concerns with you before it comes to that.
        </P>

        <H2>8. Intellectual property</H2>
        <P>
          8.1 All teaching materials, recordings, worksheets and other content we provide remain our
          intellectual property. They are licensed to the enrolled student for personal study only and may
          not be copied, shared or republished.
        </P>

        <H2>9. Our responsibility to you</H2>
        <P>
          9.1 We will provide the Programmes with reasonable care and skill. We cannot and do not guarantee
          any particular grade or result, as outcomes depend on each student&apos;s own work as well as our
          teaching.
        </P>
        <P>
          9.2 Nothing in these Terms excludes or limits our liability where it would be unlawful to do so,
          including liability for death or personal injury caused by negligence.
        </P>

        <H2>10. Changes to these Terms</H2>
        <P>
          10.1 We may update these Terms from time to time. The version that applies to your booking is the
          version published on the Site at the time you book.
        </P>

        <H2>11. Governing law</H2>
        <P>
          11.1 These Terms are governed by the law of England and Wales, and the courts of England and Wales
          have jurisdiction over any dispute arising from them.
        </P>
      </article>
      <Footer />
    </main>
  )
}
