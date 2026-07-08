import Image from 'next/image'

const BOOK_A_CALL_LINK = 'https://scheduler.zoom.us/dr-waleed-ahmad/a-level'

// Shared footer used across all marketing pages so navigation, resources and
// contact details stay identical site-wide.
export default function SiteFooter() {
  return (
    <footer id="contact" className="bg-brand-purple text-brand-cream py-8 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-2">
          <a href="/#hero" className="relative overflow-hidden md:flex-1 h-36 flex justify-center items-center hover:opacity-80 transition">
            <Image
              src="/logo-header.png?v=2"
              alt="A-Level Accelerators"
              width={400}
              height={400}
              className="absolute h-[27rem] w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              unoptimized
            />
          </a>
          <div className="hidden md:block w-px h-36 bg-brand-gold opacity-40 flex-shrink-0"></div>
          <div className="md:hidden h-px w-40 bg-brand-gold opacity-30"></div>
          <div className="md:flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-sm text-white font-bold uppercase tracking-wide mb-3">Programmes</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/#pricing" className="text-brand-gold hover:text-white transition">Summer Accelerator</a></li>
                <li><a href="/subject-accelerators" className="text-brand-gold hover:text-white transition">Subject Accelerators</a></li>
                <li><a href="/study-systems" className="text-brand-gold hover:text-white transition">Study System</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm text-white font-bold uppercase tracking-wide mb-3">Free Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/blog/" className="text-brand-gold hover:text-white transition">