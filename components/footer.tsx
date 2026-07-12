import Image from 'next/image'

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#241d47] text-brand-cream py-8 px-8 border-t-2 border-brand-gold/50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-2">
          <a href="/#hero" className="relative overflow-hidden w-full md:w-auto md:flex-1 h-32 md:h-36 flex justify-center items-center hover:opacity-80 transition">
            <Image
              src="/logo-header.png?v=2"
              alt="A-Level Accelerators"
              width={400}
              height={400}
              className="absolute h-[24rem] md:h-[27rem] w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              unoptimized
            />
          </a>
          <div className="hidden md:block w-px h-36 bg-brand-gold opacity-40 flex-shrink-0"></div>
          <div className="md:hidden h-px w-40 bg-brand-gold opacity-30"></div>
          <div className="md:flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-sm text-white font-bold uppercase tracking-wide mb-3">Programmes</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/summer-accelerators" className="text-brand-gold hover:text-white transition">Summer Accelerator</a></li>
                <li><a href="/subject-accelerators" className="text-brand-gold hover:text-white transition">Subject Accelerators</a></li>
                <li><a href="/study-systems" className="text-brand-gold hover:text-white transition">Study System</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm text-white font-bold uppercase tracking-wide mb-3">Free Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/revision-diagnostic" className="text-brand-gold hover:text-white transition">Revision Diagnostic</a></li>
                <li><a href="/revision-tracker" className="text-brand-gold hover:text-white transition">Revision Tracker</a></li>
                <li><a href="/blog/" className="text-brand-gold hover:text-white transition">Revision Blog</a></li>
                <li><a href="/A-Level-Accelerators-Blurting-Template.pdf" className="text-brand-gold hover:text-white transition">Blurting Template</a></li>
                <li><a href="/newsletter" className="text-brand-gold hover:text-white transition">The Sunday Session</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm text-white font-bold uppercase tracking-wide mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/faqs" className="text-brand-gold hover:text-white transition">FAQs</a></li>
                <li><a href="mailto:Waleed@alevelaccelerators.com" className="text-brand-gold hover:text-white transition">Email</a></li>
                <li><a href={BOOK_A_CALL_LINK} className="text-brand-gold hover:text-white transition">Book a Free Call</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="h-px bg-brand-gold opacity-20 my-4"></div>
        <p className="text-center text-xs opacity-60">
          &copy; 2026 A-Level Accelerators. All rights reserved. | Helping A-Level students become the top of their class.
        </p>
      </div>
    </footer>
  )
}
