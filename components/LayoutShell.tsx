import Link from 'next/link';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f]">
      {/* Navigation */}
      <nav className="bg-[#0f0f0f] border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="text-xl font-semibold text-white">
                Buraq X
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                About
              </Link>
              <Link
                href="/chat"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Search
              </Link>
              <Link
                href="/join"
                className="bg-white hover:bg-gray-200 text-black px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Become a Provider
              </Link>
              <Link
                href="/admin"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="text-white font-semibold mb-4">Buraq X</h3>
              <p className="text-sm">
                Your trusted Muslim community concierge. Connecting you with verified providers,
                freelancers, and community services.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/chat" className="hover:text-white transition-colors">
                    Start a Request
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="hover:text-white transition-colors">
                    Become a Provider
                  </Link>
                </li>
                <li>
                  <Link href="/#categories" className="hover:text-white transition-colors">
                    Browse Categories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-sm">
                Questions or feedback?<br />
                Email: hello@buraqx.com
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Buraq X. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
