import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How A-Level Accelerators collects, uses and protects your personal data, including the data from our free tools and course sign-ups, and your rights under UK GDPR.',
  alternates: { canonical: 'https://alevelaccelerators.com/privacy/' },
}

/* Effective date shown on the page. Update when the policy changes. */
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

export default function PrivacyPolicy() {
  return (
    <main className="bg-brand-cream min-h-screen">
      <Header />
      <article className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl md:text-5xl text-brand-purple font-serif font-bold leading-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-brand-muted mb-10">Last updated {UPDATED}</p>

        <P>
          This policy explains what personal data A-Level Accelerators collects, why we collect it, who we share it
          with and the rights you have over it. It covers our website, our free tools (the Revision Diagnostic, the
          Revision Tracker, the parents guide, the Sunday Session newsletter and the free workshop) and our paid
          programmes.
        </P>

        <H2>Who we are</H2>
        <P>
          A-Level Accelerators (&quot;we&quot;, &quot;us&quot;) provides live online A-level courses and free revision
          tools, and is run by Dr Waleed Ahmad. For any privacy question, or to exercise any of the rights below,
          email <a className="text-brand-purple underline decoration-brand-gold" href="mailto:Waleed@alevelaccelerators.com">Waleed@alevelaccelerators.com</a>.
        </P>
        <P>
          [To confirm before publishing: the legal trading entity (sole trader or limited company, with company
          number if applicable), the registered or business address, and our ICO registration number.]
        </P>

        <H2>What we collect and when</H2>
        <P>We only collect what you give us through a form or a purchase. Depending on what you use, that includes:</P>
        <UL>
          <li>Your name and email address, whenever you sign up to any free tool, the newsletter or a workshop.</li>
          <li>Your year group, subjects and exam boards, when a tool asks for them.</li>
          <li>
            Your answers to the Revision Diagnostic and Revision Tracker: current and target grades, study hours, the
            areas you find hardest, and the revision profile and recommended route the tool works out from them.
          </li>
          <li>
            Payment information, when you buy a programme. Card payments are taken by Stripe. We do not see or store
            your full card number; we receive a confirmation of payment and your billing details.
          </li>
          <li>Anything you choose to tell us in an email or on a call.</li>
        </UL>

        <H2>How we use it, and our legal basis</H2>
        <UL>
          <li>To deliver the free tool, report or workshop you asked for (consent, and our agreement with you).</li>
          <li>
            To send you the follow-up emails and newsletter you signed up for, which you can leave at any time using
            the unsubscribe link in every email (consent).
          </li>
          <li>To provide and run a programme you have paid for, and to handle refunds and support (contract).</li>
          <li>
            To understand how the site is used and to improve it, using privacy-friendly analytics (our legitimate
            interest in running the site well).
          </li>
        </UL>

        <H2>Who we share it with</H2>
        <P>
          We do not sell your data. We share it only with the service providers that make the business run, each
          acting on our instructions:
        </P>
        <UL>
          <li>MailerLite, which stores our email list and sends our emails.</li>
          <li>Stripe, which processes card payments.</li>
          <li>Zoom, which hosts the live sessions and the booking scheduler.</li>
          <li>Vercel, which hosts this website and provides its analytics.</li>
          <li>Meta (Facebook), if and when advertising measurement is switched on. See cookies below.</li>
        </UL>

        <H2>Cookies and analytics</H2>
        <P>
          The site uses Vercel Web Analytics, which counts visits without cookies and without identifying you. If we
          later run advertising, we may use the Meta pixel, which does set a cookie to measure whether an advert led to
          a sign-up. Where that applies, we will make it clear and, where the law requires it, ask for your consent
          first.
        </P>

        <H2>Students under 18</H2>
        <P>
          Our tools are used by A-level students, many of whom are 16 or 17. We ask only for what a student needs to
          get their result or their timetable, and we never sell it. If you are a parent or guardian and want a
          child&apos;s data removed, email us and we will do it.
        </P>

        <H2>How long we keep it</H2>
        <P>
          We keep your data for as long as you stay on our list or remain a customer, and for as long as we are legally
          required to keep records of a purchase. If you unsubscribe or ask us to delete your data, we remove it from
          our active systems, keeping only what the law requires us to.
        </P>

        <H2>Your rights</H2>
        <P>Under UK data protection law you can ask us to:</P>
        <UL>
          <li>Show you the data we hold about you.</li>
          <li>Correct anything that is wrong.</li>
          <li>Delete your data, or stop using it for marketing.</li>
          <li>Send you a copy in a portable format.</li>
        </UL>
        <P>
          To do any of these, email <a className="text-brand-purple underline decoration-brand-gold" href="mailto:Waleed@alevelaccelerators.com">Waleed@alevelaccelerators.com</a>. We
          will respond within one month.
        </P>

        <H2>Complaints</H2>
        <P>
          If you are unhappy with how we have handled your data, you can complain to the Information Commissioner&apos;s
          Office at ico.org.uk. We would rather you came to us first so we can put it right.
        </P>

        <H2>Changes to this policy</H2>
        <P>
          If we change this policy we will update the date at the top. Significant changes will be flagged to our email
          list.
        </P>
      </article>
      <Footer />
    </main>
  )
}
