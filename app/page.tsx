import PricingSection from '@/components/ui/pricing-section'

export const metadata = {
  title: 'Top 1% Study System - A-Level Excellence Programme',
  description: 'Master your A-Levels with our proven system. Choose from Series, Accelerator, or System tiers.',
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Master Your A-Levels</h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">
            Three proven tiers of support. One guaranteed transformation.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            View Programmes
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">A-Level Accelerators</h3>
              <p className="text-gray-400">Helping A-Level students become the top of their class.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Series</a></li>
                <li><a href="#" className="hover:text-white transition">Accelerator</a></li>
                <li><a href="#" className="hover:text-white transition">System</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 A-Level Accelerators. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
