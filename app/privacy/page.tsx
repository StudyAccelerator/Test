import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How A-Level Accelerators collects, uses and protects personal information, and the rights you have over your data under UK data protection law.',
  alternates: { canonical: 'https://alevelaccelerators.com/privacy/' },
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

export default function PrivacyPolicy() {
  return (
    <main className="bg-brand-cream min-h-screen">
      <Header />
      <article className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl md:text-5xl text-brand-purple font-serif font-bold leading-tight mb-10">
          Privacy Policy
        </h1>

        <H2>1. This policy</H2>
        <P>
          The privacy and protection of your personal information is important to us. This policy explains
          what personal information A-Level Accelerators (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
          collects, how it is used, who has access to it, and the rights you have over it under UK data
          protection law. It applies to our website at alevelaccelerators.com (&quot;the Site&quot;), our
          free study tools and resources, and our paid programmes.
        </P>

        <H2>2. Who we are</H2>
        <P>
          A-Level Accelerators provides live online A-level courses and free revision tools, and is run by
          Dr Waleed Ahmad. For any question about this policy, or to exercise any of the rights described in
          it, contact{' '}
          <a
            className="text-brand-purple underline decoration-brand-gold"
            href="mailto:Waleed@alevelaccelerators.com"
          >
            Waleed@alevelaccelerators.com
          </a>
          .
        </P>

        <H2>3. What information is collected?</H2>
        <P>
          We collect personal information only when you provide it to us. Depending on how you use the Site,
          this may include:
        </P>
        <UL>
          <li>Your name and email address, when you sign up to a free tool, guide or newsletter.</li>
          <li>Your year group, subjects and exam boards, where a tool or form asks for them.</li>
          <li>
            The answers you submit to our study tools, together with the results those tools generate for
            you.
          </li>
          <li>
            Billing information, when you purchase a programme. Card payments are handled by a third party
            payment provider; we do not see or store your full card details.
          </li>
          <li>Any information you choose to provide in correspondence with us, by email or on a call.</li>
        </UL>

        <H2>4. How is the information used?</H2>
        <P>We use personal information to:</P>
        <UL>
          <li>Provide the tool, resource or report you have requested.</li>
          <li>
            Send you the emails you have signed up for. Every marketing email we send includes an unsubscribe
            link, and you can leave the list at any time.
          </li>
          <li>Deliver the programmes you have purchased, and handle payments, refunds and support.</li>
          <li>Understand how the Site is used, so that we can improve it.</li>
        </UL>
        <P>
          Our legal bases for this processing under UK data protection law are: your consent (which you may
          withdraw at any time); the performance of our contract with you; and our legitimate interest in
          operating and improving our services.
        </P>

        <H2>5. Who else has access to this information?</H2>
        <P>
          We do not sell personal information, and we do not share it with third parties for their own
          marketing. Access is limited to the categories of service provider we rely on to operate, each of
          which processes information on our instructions:
        </P>
        <UL>
          <li>Our email marketing platform, which stores our mailing lists and sends our emails.</li>
          <li>Our payment provider, which processes card transactions securely.</li>
          <li>Our video conferencing provider, which hosts live sessions and call bookings.</li>
          <li>Our website hosting provider.</li>
          <li>Analytics and advertising measurement services, as described in section 6.</li>
        </UL>
        <P>
          We may also disclose personal information where we are required to do so by law or by a competent
          authority.
        </P>

        <H2>6. Cookies and similar technologies</H2>
        <P>
          The Site uses a small number of cookies and similar technologies. They fall into three categories:
        </P>
        <UL>
          <li>
            Analytics cookies, which help us understand how visitors use the Site: which pages are visited
            and how visitors arrive. This information is reported to us in aggregate and is not used to build
            individual profiles.
          </li>
          <li>
            Advertising measurement cookies, which tell us whether our advertising led to a visit or a
            sign-up, so that we can judge whether it is working.
          </li>
          <li>
            Local storage, which our free study tools use to save your progress in your own browser so that
            your work is still there when you return. This information stays on your device unless you submit
            a form that sends it to us.
          </li>
        </UL>
        <P>
          Most web browsers allow you to block or delete cookies through their settings. The Site will
          continue to work if you do, although we will understand less about how it is being used.
        </P>

        <H2>7. Students under 18</H2>
        <P>
          Our tools and programmes are used by A-level students, many of whom are 16 or 17. We collect only
          the information a student needs to provide to receive their result, plan or programme, and we never
          sell it. If you are a parent or guardian and would like a child&apos;s information removed, contact
          us and we will remove it.
        </P>

        <H2>8. How long do we keep your information for?</H2>
        <P>
          We keep personal information for as long as you remain subscribed to our emails or remain a
          customer, and for as long as we are legally required to keep records of a purchase. If you
          unsubscribe or ask us to delete your information, we remove it from our active systems, retaining
          only what the law requires us to keep.
        </P>

        <H2>9. Your rights</H2>
        <P>Under UK data protection law, you have the right to:</P>
        <UL>
          <li>Be informed about how your personal information is used.</li>
          <li>Request access to the personal information we hold about you.</li>
          <li>Have inaccurate or incomplete information corrected.</li>
          <li>Have your personal information deleted.</li>
          <li>Object to, or request that we restrict, our processing of your information.</li>
          <li>Receive a copy of your information in a portable format.</li>
          <li>Withdraw your consent at any time, where our processing is based on consent.</li>
        </UL>
        <P>
          To exercise any of these rights, contact us at the address in section 2. We will respond within one
          month.
        </P>

        <H2>10. Complaints or queries</H2>
        <P>
          If you are unhappy with how we have handled your personal information, you have the right to
          complain to the Information Commissioner&apos;s Office (ico.org.uk). We would welcome the chance to
          resolve any concern directly first.
        </P>

        <H2>11. Changes to this policy</H2>
        <P>
          We keep this policy under review and may update it from time to time. Any significant change will
          be communicated to our email list.
        </P>
      </article>
      <Footer />
    </main>
  )
}
